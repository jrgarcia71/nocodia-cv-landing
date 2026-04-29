// Cloudflare Worker - Nocodia CV con R2 Storage y Logging mejorado
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      return handleSubmit(request, env);
    }
    
    if (url.pathname.startsWith('/download/') && request.method === 'GET') {
      return handleDownload(request, env);
    }

    return new Response('Nocodia CV API', { status: 200 });
  }
};

async function handleSubmit(request, env) {
  try {
    const formData = await request.formData();
    
    const data = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono') || '',
      tieneCV: formData.get('tieneCV'),
      tipoRevision: formData.get('tipoRevision'),
      puesto: formData.get('puesto') || '',
      empresa: formData.get('empresa') || '',
      industria: formData.get('industria') || '',
      linkOferta: formData.get('linkOferta') || '',
      infoAdicional: formData.get('infoAdicional') || '',
      cvFile: formData.get('cvFile'),
      linkedinFile: formData.get('linkedinFile'),
    };

    console.log('=== NUEVA SOLICITUD ===');
    console.log('Tipo:', data.tipoRevision);
    console.log('Email:', data.email);

    if (!data.nombre || !data.email) {
      return jsonResponse({ error: 'Nombre y email son requeridos' }, 400);
    }

    // Rate limiting
    const clientIP = request.headers.get('CF-Connecting-IP');
    const rateLimitKey = `ratelimit:${clientIP}`;
    const rateLimitCount = await env.KV.get(rateLimitKey);
    
    if (rateLimitCount && parseInt(rateLimitCount) >= 10) {
      return jsonResponse({ error: 'Demasiadas solicitudes. Intenta nuevamente en 1 hora.' }, 429);
    }

    await env.KV.put(rateLimitKey, (parseInt(rateLimitCount || 0) + 1).toString(), { expirationTtl: 3600 });

    // Verificar si ya usó servicio gratuito
    const hasUsedFree = await checkFreeUsage(data.email, env);

    if (data.tipoRevision === 'generica' && !hasUsedFree) {
      return await processFreeReview(data, env);
    } else if (data.tipoRevision === 'generica' && hasUsedFree) {
      return jsonResponse({ error: 'Ya utilizaste tu revisión gratuita. Para nueva revisión: $12. Contacta a jrgarcia@nocodia.net' }, 400);
    } else {
      return await processPaidRequest(data, env);
    }

  } catch (error) {
    console.error('❌ Error processing request:', error);
    return jsonResponse({ error: 'Error al procesar tu solicitud. Intenta nuevamente.' }, 500);
  }
}

async function checkFreeUsage(email, env) {
  try {
    const response = await fetch(`${env.SUPABASE_URL}/rest/v1/cv_requests?email=eq.${email}&select=free_generic_used`, {
      headers: {
        'apikey': env.SUPABASE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_KEY}`
      }
    });
    const data = await response.json();
    return data.length > 0 && data[0].free_generic_used === true;
  } catch (error) {
    console.error('Error checking free usage:', error);
    return false;
  }
}

async function processFreeReview(data, env) {
  try {
    console.log('=== PROCESANDO REVISION GRATIS ===');
    const cvText = "Análisis genérico de CV";
    const analysis = await analyzeCV(cvText, data.infoAdicional, env);
    
    await sendEmailToClient(data.email, data.nombre, analysis, 'free', env);
    await recordRequest(data, true, env);

    return jsonResponse({ message: '✅ ¡Listo! Tu análisis ha sido enviado a ' + data.email + '. Revisa tu bandeja (y spam).' });
  } catch (error) {
    console.error('❌ Error processing free review:', error);
    return jsonResponse({ error: 'Error al procesar tu CV. Contacta a jrgarcia@nocodia.net' }, 500);
  }
}

async function processPaidRequest(data, env) {
  try {
    console.log('=== PROCESANDO SOLICITUD PAGA ===');
    let cvUrl = null;
    let linkedinUrl = null;
    
    // Guardar archivos en R2
    if (data.cvFile) {
      console.log('Guardando CV en R2...');
      const fileName = await saveCVToR2(data.cvFile, data.email, 'cv', env);
      if (fileName) {
        cvUrl = `https://nocodia-cv-worker.jraul-garcia.workers.dev/download/${fileName}`;
        console.log('✅ CV guardado:', fileName);
      }
    }
    
    if (data.linkedinFile) {
      console.log('Guardando LinkedIn en R2...');
      const fileName = await saveCVToR2(data.linkedinFile, data.email, 'linkedin', env);
      if (fileName) {
        linkedinUrl = `https://nocodia-cv-worker.jraul-garcia.workers.dev/download/${fileName}`;
        console.log('✅ LinkedIn guardado:', fileName);
      }
    }

    console.log('Enviando emails...');
    await sendEmailToJuan(data, cvUrl, linkedinUrl, env);
    await sendPaymentInstructionsToClient(data, env);
    await recordRequest(data, false, env);

    return jsonResponse({ message: '✅ Solicitud recibida. Te enviaremos el link de pago por email.' });
  } catch (error) {
    console.error('❌ Error processing paid request:', error);
    return jsonResponse({ error: 'Error al enviar solicitud. Contacta a jrgarcia@nocodia.net' }, 500);
  }
}

async function saveCVToR2(file, email, type, env) {
  try {
    const timestamp = Date.now();
    const sanitizedEmail = email.replace(/[^a-z0-9]/gi, '_');
    const fileName = `${sanitizedEmail}_${type}_${timestamp}.pdf`;
    
    const arrayBuffer = await file.arrayBuffer();
    await env.R2.put(fileName, arrayBuffer, {
      httpMetadata: {
        contentType: file.type || 'application/pdf',
      },
    });

    console.log('File saved to R2:', fileName);
    return fileName;
  } catch (error) {
    console.error('❌ Error saving to R2:', error);
    return null;
  }
}

async function handleDownload(request, env) {
  try {
    const url = new URL(request.url);
    const fileName = url.pathname.replace('/download/', '');
    
    console.log('Downloading file:', fileName);
    
    const object = await env.R2.get(fileName);
    
    if (!object) {
      console.error('File not found in R2:', fileName);
      return new Response('Archivo no encontrado', { status: 404 });
    }

    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata.contentType || 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);

    console.log('✅ File downloaded successfully');
    return new Response(object.body, { headers });
  } catch (error) {
    console.error('❌ Error downloading from R2:', error);
    return new Response('Error al descargar archivo', { status: 500 });
  }
}

async function analyzeCV(cvText, additionalInfo, env) {
  const prompt = `Eres un experto en optimización de CVs profesionales.

Genera un análisis GENÉRICO del CV con el siguiente formato:

# ANÁLISIS GENERAL
[Impresión general del CV en 2-3 oraciones]

# PUNTOS FUERTES
1. [Fortaleza principal]
2. [Segunda fortaleza]
3. [Tercera fortaleza]

# ÁREAS DE MEJORA
1. [Primera área de mejora]
2. [Segunda área de mejora]
3. [Tercera área de mejora]

# OPTIMIZACIÓN ATS (Applicant Tracking System)
[Recomendaciones para que el CV pase filtros automáticos]

# RECOMENDACIONES FINALES
1. [Primera recomendación]
2. [Segunda recomendación]
3. [Tercera recomendación]

Información adicional del usuario: ${additionalInfo || 'Ninguna'}`;
  
  try {
    console.log('Llamando a Claude API...');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error('Anthropic API error');
    }

    const result = await response.json();
    console.log('✅ Claude API response received');
    return result.content[0].text;
  } catch (error) {
    console.error('❌ Error calling Anthropic API:', error);
    throw error;
  }
}

async function sendEmailToClient(email, nombre, analysis, type, env) {
  console.log('=== ENVIANDO EMAIL AL CLIENTE ===');
  console.log('Email destino:', email);
  
  const subject = '✅ Tu CV revisado - Nocodia IA';
  const html = `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0;">Nocodia CV</h1>
    <p style="margin: 10px 0 0 0;">Análisis potenciado por Inteligencia Artificial</p>
  </div>
  
  <div style="padding: 30px;">
    <p>Hola <strong>${nombre}</strong>,</p>
    <p>Aquí está el análisis de tu CV:</p>
    
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb;">
      <pre style="white-space: pre-wrap; font-family: sans-serif; margin: 0;">${analysis}</pre>
    </div>
    
    ${type === 'free' ? `
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
    
    <h3 style="color: #2563eb;">¿Necesitas más?</h3>
    <p><strong>📌 CV ESPECIALIZADO</strong> optimizado para un puesto específico: <strong>$12</strong></p>
    <p><strong>⭐ CV PREMIUM</strong> con LinkedIn + optimización completa: <strong>$20</strong></p>
    <p>Solicítalo en <a href="https://cv.nocodia.net" style="color: #2563eb;">cv.nocodia.net</a></p>
    ` : ''}
    
    <p style="margin-top: 30px;">
      Saludos,<br>
      <strong>Juan - Nocodia CV</strong><br>
      <a href="mailto:jrgarcia@nocodia.net" style="color: #2563eb;">jrgarcia@nocodia.net</a>
    </p>
  </div>
</body>
</html>`;

  try {
    await sendEmail(email, subject, html, env);
    console.log('✅ Email al cliente enviado');
  } catch (error) {
    console.error('❌ Error enviando email al cliente:', error);
    throw error;
  }
}

async function sendPaymentInstructionsToClient(data, env) {
  console.log('=== ENVIANDO INSTRUCCIONES DE PAGO ===');
  console.log('Email destino:', data.email);
  
  const price = data.tipoRevision === 'premium' ? '$20' : data.tipoRevision === 'especializada' ? '$12' : '$15';
  const serviceName = data.tipoRevision === 'premium' ? 'CV Premium con LinkedIn' : 
                      data.tipoRevision === 'especializada' ? 'CV Especializado' : 'CV Básico';
  
  const subject = `Solicitud recibida - ${serviceName}`;
  const html = `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center;">
    <h1 style="margin: 0;">Solicitud Recibida</h1>
  </div>
  
  <div style="padding: 30px;">
    <p>Hola <strong>${data.nombre}</strong>,</p>
    <p>Recibimos tu solicitud de <strong>${serviceName}</strong>.</p>
    
    <div style="background: #f8fafc; border: 2px solid #2563eb; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
      <p style="margin: 0 0 10px 0; color: #64748b;">Costo del servicio:</p>
      <div style="font-size: 32px; font-weight: bold; color: #2563eb;">${price}</div>
    </div>
    
    <h3 style="color: #2563eb;">Próximos pasos:</h3>
    <p>Te enviaremos el link de pago por email en las próximas horas.</p>
    <p>Una vez confirmado el pago, recibirás tu CV optimizado en 24 horas.</p>
    
    <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:jrgarcia@nocodia.net" style="color: #2563eb;">jrgarcia@nocodia.net</a></p>
    
    <p style="margin-top: 30px;">
      Saludos,<br>
      <strong>Juan - Nocodia CV</strong><br>
      <a href="mailto:jrgarcia@nocodia.net" style="color: #2563eb;">jrgarcia@nocodia.net</a>
    </p>
  </div>
</body>
</html>`;

  try {
    await sendEmail(data.email, subject, html, env);
    console.log('✅ Instrucciones de pago enviadas');
  } catch (error) {
    console.error('❌ Error enviando instrucciones:', error);
    throw error;
  }
}

async function sendEmailToJuan(data, cvUrl, linkedinUrl, env) {
  console.log('=== ENVIANDO EMAIL A JUAN ===');
  console.log('CV URL:', cvUrl);
  console.log('LinkedIn URL:', linkedinUrl);
  
  const price = data.tipoRevision === 'premium' ? '$20' : data.tipoRevision === 'especializada' ? '$12' : '$15';
  const serviceName = data.tipoRevision === 'premium' ? 'CV Premium' : 
                      data.tipoRevision === 'especializada' ? 'CV Especializado' : 'CV Básico';
  const subject = `💰 SOLICITUD ${serviceName} - ${price}`;
  
  let filesSection = '';
  if (cvUrl) {
    filesSection += `<p><strong>📄 CV:</strong> <a href="${cvUrl}" style="color: #2563eb; text-decoration: underline;">Descargar CV</a> (válido 30 días)</p>`;
  }
  if (linkedinUrl) {
    filesSection += `<p><strong>📄 LinkedIn PDF:</strong> <a href="${linkedinUrl}" style="color: #2563eb; text-decoration: underline;">Descargar LinkedIn</a> (válido 30 días)</p>`;
  }
  
  const html = `<!DOCTYPE html>
<html>
<body style="font-family: monospace; background: #f8fafc; padding: 20px;">
  <div style="background: white; padding: 30px; border: 2px solid #2563eb; border-radius: 8px; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb; margin-top: 0;">🔔 NUEVA SOLICITUD DE CV</h2>
    
    <p><strong>SERVICIO:</strong> ${serviceName}</p>
    <p><strong>PRECIO:</strong> <span style="background: #fef3c7; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${price}</span></p>
    
    <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;">
    
    <h3 style="color: #2563eb;">📋 DATOS DEL CLIENTE</h3>
    <p><strong>Nombre:</strong> ${data.nombre}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.telefono || 'No proporcionado'}</p>
    
    ${data.puesto ? `
    <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;">
    <h3 style="color: #2563eb;">🎯 INFORMACIÓN DEL PUESTO</h3>
    <p><strong>Puesto:</strong> ${data.puesto}</p>
    <p><strong>Industria:</strong> ${data.industria}</p>
    ${data.empresa ? `<p><strong>Empresa:</strong> ${data.empresa}</p>` : ''}
    ${data.linkOferta ? `<p><strong>Link Oferta:</strong> <a href="${data.linkOferta}" style="color: #2563eb;">${data.linkOferta}</a></p>` : ''}
    ` : ''}
    
    ${filesSection ? `
    <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;">
    <h3 style="color: #2563eb;">📥 ARCHIVOS GUARDADOS</h3>
    ${filesSection}
    ` : ''}
    
    <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;">
    
    <h3 style="color: #2563eb;">✅ PRÓXIMOS PASOS (MANUAL)</h3>
    <ol style="line-height: 1.8;">
      <li>Genera link de pago PayPhone para <strong>${price}</strong></li>
      <li>Envía link al cliente: <strong>${data.email}</strong></li>
      <li>Espera confirmación de pago del cliente</li>
      <li>Descarga CV usando los links arriba ☝️</li>
      <li>Procesa CV con Claude (claude.ai)</li>
      <li>Envía CV optimizado al cliente</li>
    </ol>
    
    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px;">
      <p style="margin: 0;"><strong>💡 Plantilla email de pago:</strong></p>
      <p style="margin: 10px 0 0 0; font-size: 14px;">
        Hola ${data.nombre}, aquí está tu link de pago: [LINK PAYPHONE]. Una vez confirmado, recibirás tu CV en 24 horas.
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    await sendEmail('jrgarcia@nocodia.net', subject, html, env);
    console.log('✅ Email a Juan enviado exitosamente');
  } catch (error) {
    console.error('❌ ERROR al enviar email a Juan:', error.message);
    throw error;
  }
}

async function sendEmail(to, subject, html, env) {
  try {
    console.log(`Enviando email a: ${to}`);
    console.log(`Subject: ${subject}`);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Nocodia CV <noreply@nocodia.net>',
        to: [to],
        subject: subject,
        html: html,
      })
    });

    const responseText = await response.text();
    console.log('Resend status:', response.status);
    console.log('Resend response:', responseText);

    if (!response.ok) {
      console.error('❌ Resend error:', responseText);
      throw new Error(`Failed to send email: ${responseText}`);
    }

    console.log('✅ Email sent successfully');
    return JSON.parse(responseText);
  } catch (error) {
    console.error('❌ Error in sendEmail:', error);
    throw error;
  }
}

async function recordRequest(data, freeUsed, env) {
  try {
    console.log('Registrando en Supabase...');
    await fetch(`${env.SUPABASE_URL}/rest/v1/cv_requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': env.SUPABASE_KEY,
        'Authorization': `Bearer ${env.SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        email: data.email,
        nombre: data.nombre,
        telefono: data.telefono,
        tipo_revision: data.tipoRevision,
        puesto: data.puesto,
        industria: data.industria,
        free_generic_used: freeUsed,
        created_at: new Date().toISOString()
      })
    });
    console.log('✅ Registro guardado');
  } catch (error) {
    console.error('❌ Error recording request:', error);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  });
}
