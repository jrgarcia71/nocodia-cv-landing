import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState('es');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tieneCV: 'si',
    tipoRevision: 'generica',
    tipoCV: '',
    puesto: '',
    empresa: '',
    industria: '',
    linkOferta: '',
    requisitosOferta: '',
    infoAdicional: '',
    cvFile: null,
    linkedinFile: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [reqWordCount, setReqWordCount] = useState(0);

  const t = {
    es: {
      header: {
        title: 'Nocodia CV',
        subtitle: 'Optimizado con Inteligencia Artificial',
        contact: 'Consultas'
      },
      hero: {
        title1: 'Tu CV Profesional',
        title2: 'Potenciado por IA',
        subtitle: 'Análisis automático, optimización ATS, y CVs personalizados para destacar en tu industria'
      },
      pricing: {
        revision: 'Revisión',
        free: 'GRATIS*',
        freeDesc: 'Análisis genérico de tu CV actual',
        specialized: 'Especializada',
        specializedDesc: 'CV reescrito para:',
        specializedBullets: '• Puesto específico\n• Mejora general',
        specializedNote: '(Tú eliges)',
        basic: 'Básico',
        basicDesc: 'CV nuevo desde cero con formulario',
        premium: 'Premium',
        premiumDesc: 'Con LinkedIn PDF',
        premiumBullets: '• Puesto específico\n• Mejora general',
        premiumNote: '(Tú eliges)',
        recommended: '⭐ RECOMENDADO'
      },
      form: {
        title: 'Solicita tu CV',
        subtitle: 'Completa el formulario y recibe tu análisis',
        section1: '1. Información Básica',
        nombre: 'Nombre completo',
        nombrePlaceholder: 'Juan Pérez',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        telefono: 'Teléfono',
        telefonoPlaceholder: '+593 99 123 4567',
        section2: '2. ¿Tienes CV actual?',
        tienesSi: 'Sí, tengo CV para revisar',
        tienesNo: 'No, necesito crear uno desde cero',
        section3Upload: '3. Sube tu CV actual',
        selectCV: 'Selecciona tu CV',
        pdfMax: 'PDF, máximo 5MB',
        section3LinkedIn: 'Sube tu LinkedIn PDF',
        section4LinkedIn: '4. Sube tu LinkedIn PDF',
        linkedinInstructions: '📱 Cómo descargar tu LinkedIn:',
        linkedinStep1: 'Abre LinkedIn en tu navegador (no en la app)',
        linkedinStep2: 'Ve a tu perfil (click en tu foto arriba)',
        linkedinStep3: 'Click en "Más" (botón con 3 puntos)',
        linkedinStep4: 'Selecciona "Guardar en PDF"',
        linkedinStep5: 'Descarga el archivo y súbelo aquí ⬇️',
        selectLinkedIn: 'Selecciona tu LinkedIn PDF',
        tipoRevisionSection: 'Tipo de',
        revision: 'revisión',
        servicio: 'servicio',
        revisionGenerica: 'Genérica',
        revisionGenericaDesc: 'Análisis y recomendaciones generales',
        revisionEspecializada: 'Especializada',
        revisionEspecializadaDesc: 'CV optimizado (específico o general)',
        revisionBasica: 'Básico',
        revisionBasicaDesc: 'CV desde cero con formulario',
        revisionPremium: 'Premium',
        revisionPremiumDesc: 'Con LinkedIn + optimización (específico o general)',
        tipoCVSection: '¿Qué tipo de CV necesitas?',
        especifico: 'Para un puesto específico',
        especificoDesc: 'CV optimizado para una oferta de trabajo concreta',
        especificoBullet1: '✓ Keywords específicas del puesto',
        especificoBullet2: '✓ Análisis de compatibilidad CV vs oferta',
        especificoBullet3: '✓ Carta de presentación personalizada',
        especificoBullet4: '✓ Mayor probabilidad de entrevista',
        general: 'General (mejorado)',
        generalDesc: 'CV optimizado para aplicar a múltiples puestos',
        generalBullet1: '✓ Formato profesional moderno',
        generalBullet2: '✓ Optimización ATS general',
        generalBullet3: '✓ Logros cuantificables destacados',
        generalBullet4: '⚠️ No enfocado en puesto específico',
        puestoSection: 'Información del puesto',
        puestoNote: '📌 Optimizaremos tu CV para este puesto específico',
        puestoNoteDesc: 'Mientras más detalles proporciones, mejor será la optimización',
        puesto: '¿A qué puesto aplicas?',
        puestoPlaceholder: 'ej: Gerente de Ventas',
        industria: 'Industria/Sector',
        industriaPlaceholder: 'ej: Tecnología, Finanzas',
        empresa: 'Empresa (opcional)',
        empresaPlaceholder: 'ej: Nocodia',
        linkOferta: 'Link de la oferta (opcional)',
        linkOfertaPlaceholder: 'https://...',
        requisitosLabel: 'Requisitos del puesto *',
        requisitosNote: '📋 Pega aquí la descripción de la oferta',
        requisitosNoteDesc: 'Copia los requisitos, responsabilidades y habilidades solicitadas. Esto permite generar un análisis de compatibilidad preciso y una carta de presentación personalizada.',
        requisitosPlaceholder: 'Ejemplo:\n\nRequisitos:\n- 5+ años de experiencia en gestión de equipos\n- Conocimiento en metodologías ágiles\n- Experiencia en presupuestos operativos\n\nResponsabilidades:\n- Liderar equipo de 20+ personas\n- Reportar a Gerencia General\n- Gestionar presupuesto de $500K...',
        requisitosWordCount: 'Palabras:',
        infoSection: 'Información adicional',
        infoNote: '💡 Agrega lo que NO está en tu',
        infoCV: 'CV actual',
        infoLinkedIn: 'LinkedIn',
        infoMax: '(máx 500 palabras):',
        infoBullet1: 'Logros recientes no actualizados',
        infoBullet2: 'Proyectos actuales en desarrollo',
        infoBullet3: 'Resultados cuantificables específicos',
        infoBullet4: 'Habilidades técnicas nuevas',
        infoBullet5: 'Certificaciones en proceso',
        infoPlaceholder: 'Ejemplo: En mi rol actual como Gerente de Ventas aumenté las ventas B2B en 42% durante Q1 2026. Implementé un nuevo CRM que redujo el tiempo de cierre en 30%. Actualmente lidero un equipo de 8 personas...',
        palabras: 'Palabras:',
        palabrasRestantes: 'palabras restantes',
        submit: 'Solicitar análisis',
        processing: 'Procesando...',
        disclaimer: '* Primera revisión genérica gratuita por email. Servicios pagados requieren confirmación de pago.'
      },
      features: {
        ats: 'Optimización ATS',
        atsDesc: 'Keywords y formato para pasar filtros automáticos',
        compatibility: 'Análisis de Compatibilidad',
        compatibilityDesc: 'Tu perfil comparado contra los requisitos reales del puesto',
        coverLetter: 'Carta de Presentación',
        coverLetterDesc: 'Personalizada para cada puesto, lista para enviar'
      },
      footer: {
        rights: '© 2026 Nocodia CV - Todos los derechos reservados',
        contact: 'Consultas:'
      }
    },
    en: {
      header: {
        title: 'Nocodia CV',
        subtitle: 'AI-Powered Optimization',
        contact: 'Contact'
      },
      hero: {
        title1: 'Your Professional Resume',
        title2: 'AI-Powered',
        subtitle: 'Automatic analysis, ATS optimization, and personalized resumes to stand out in your industry'
      },
      pricing: {
        revision: 'Review',
        free: 'FREE*',
        freeDesc: 'Generic analysis of your current resume',
        specialized: 'Specialized',
        specializedDesc: 'Resume rewritten for:',
        specializedBullets: '• Specific position\n• General improvement',
        specializedNote: '(You choose)',
        basic: 'Basic',
        basicDesc: 'New resume from scratch with form',
        premium: 'Premium',
        premiumDesc: 'With LinkedIn PDF',
        premiumBullets: '• Specific position\n• General improvement',
        premiumNote: '(You choose)',
        recommended: '⭐ RECOMMENDED'
      },
      form: {
        title: 'Request Your Resume',
        subtitle: 'Complete the form and receive your analysis',
        section1: '1. Basic Information',
        nombre: 'Full name',
        nombrePlaceholder: 'John Smith',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        telefono: 'Phone',
        telefonoPlaceholder: '+1 555 123 4567',
        section2: '2. Do you have a current resume?',
        tienesSi: 'Yes, I have a resume to review',
        tienesNo: 'No, I need to create one from scratch',
        section3Upload: '3. Upload your current resume',
        selectCV: 'Select your resume',
        pdfMax: 'PDF, max 5MB',
        section3LinkedIn: 'Upload your LinkedIn PDF',
        section4LinkedIn: '4. Upload your LinkedIn PDF',
        linkedinInstructions: '📱 How to download your LinkedIn:',
        linkedinStep1: 'Open LinkedIn in your browser (not the app)',
        linkedinStep2: 'Go to your profile (click your photo)',
        linkedinStep3: 'Click "More" (3 dots button)',
        linkedinStep4: 'Select "Save to PDF"',
        linkedinStep5: 'Download the file and upload it here ⬇️',
        selectLinkedIn: 'Select your LinkedIn PDF',
        tipoRevisionSection: 'Type of',
        revision: 'review',
        servicio: 'service',
        revisionGenerica: 'Generic',
        revisionGenericaDesc: 'Analysis and general recommendations',
        revisionEspecializada: 'Specialized',
        revisionEspecializadaDesc: 'Optimized resume (specific or general)',
        revisionBasica: 'Basic',
        revisionBasicaDesc: 'Resume from scratch with form',
        revisionPremium: 'Premium',
        revisionPremiumDesc: 'With LinkedIn + optimization (specific or general)',
        tipoCVSection: 'What type of resume do you need?',
        especifico: 'For a specific position',
        especificoDesc: 'Resume optimized for a specific job posting',
        especificoBullet1: '✓ Position-specific keywords',
        especificoBullet2: '✓ Compatibility analysis: your profile vs. job requirements',
        especificoBullet3: '✓ Personalized cover letter',
        especificoBullet4: '✓ Higher interview probability',
        general: 'General (improved)',
        generalDesc: 'Optimized resume for multiple positions',
        generalBullet1: '✓ Modern professional format',
        generalBullet2: '✓ General ATS optimization',
        generalBullet3: '✓ Quantifiable achievements highlighted',
        generalBullet4: '⚠️ Not focused on specific position',
        puestoSection: 'Position Information',
        puestoNote: '📌 We will optimize your resume for this specific position',
        puestoNoteDesc: 'The more details you provide, the better the optimization',
        puesto: 'What position are you applying for?',
        puestoPlaceholder: 'ex: Sales Manager',
        industria: 'Industry/Sector',
        industriaPlaceholder: 'ex: Technology, Finance',
        empresa: 'Company (optional)',
        empresaPlaceholder: 'ex: Nocodia',
        linkOferta: 'Job posting link (optional)',
        linkOfertaPlaceholder: 'https://...',
        requisitosLabel: 'Job requirements *',
        requisitosNote: '📋 Paste the job description here',
        requisitosNoteDesc: 'Copy the requirements, responsibilities and skills requested. This enables an accurate compatibility analysis and a personalized cover letter.',
        requisitosPlaceholder: 'Example:\n\nRequirements:\n- 5+ years of team management experience\n- Knowledge of agile methodologies\n- Experience with operational budgets\n\nResponsibilities:\n- Lead a team of 20+ people\n- Report to General Management\n- Manage $500K budget...',
        requisitosWordCount: 'Words:',
        infoSection: 'Additional Information',
        infoNote: '💡 Add what is NOT in your',
        infoCV: 'current resume',
        infoLinkedIn: 'LinkedIn',
        infoMax: '(max 500 words):',
        infoBullet1: 'Recent achievements not updated',
        infoBullet2: 'Current projects in development',
        infoBullet3: 'Specific quantifiable results',
        infoBullet4: 'New technical skills',
        infoBullet5: 'Certifications in progress',
        infoPlaceholder: 'Example: In my current role as Sales Manager I increased B2B sales by 42% during Q1 2026. I implemented a new CRM that reduced closing time by 30%. Currently leading a team of 8 people...',
        palabras: 'Words:',
        palabrasRestantes: 'words remaining',
        submit: 'Request analysis',
        processing: 'Processing...',
        disclaimer: '* First generic review free by email. Paid services require payment confirmation.'
      },
      features: {
        ats: 'ATS Optimization',
        atsDesc: 'Keywords and format to pass automatic filters',
        compatibility: 'Compatibility Analysis',
        compatibilityDesc: 'Your profile compared against the real job requirements',
        coverLetter: 'Cover Letter',
        coverLetterDesc: 'Personalized for each position, ready to send'
      },
      footer: {
        rights: '© 2026 Nocodia CV - All rights reserved',
        contact: 'Contact:'
      }
    }
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) setFormData(prev => ({ ...prev, [fileType]: file }));
  };

  const handleInfoChange = (e) => {
    const text  = e.target.value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    if (words <= 500) { setFormData(prev => ({ ...prev, infoAdicional: text })); setWordCount(words); }
  };

  const handleRequisitosChange = (e) => {
    const text  = e.target.value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    setFormData(prev => ({ ...prev, requisitosOferta: text }));
    setReqWordCount(words);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const fd = new FormData();
      Object.keys(formData).forEach(key => { if (formData[key]) fd.append(key, formData[key]); });
      fd.append('formLanguage', language);

      const response = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', {
        method: 'POST', body: fd
      });
      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({
          nombre: '', email: '', telefono: '', tieneCV: 'si',
          tipoRevision: 'generica', tipoCV: '', puesto: '', empresa: '',
          industria: '', linkOferta: '', requisitosOferta: '',
          infoAdicional: '', cvFile: null, linkedinFile: null
        });
        setWordCount(0); setReqWordCount(0);
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Error al procesar tu solicitud' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPrice = () => {
    if (formData.tipoRevision === 'generica')     return t[language].pricing.free;
    if (formData.tipoRevision === 'especializada') return '$12';
    if (formData.tipoRevision === 'basico')        return '$15';
    if (formData.tipoRevision === 'premium')       return '$20';
    return '';
  };

  const showTipoCVOption = formData.tipoRevision === 'especializada' || formData.tipoRevision === 'premium';
  const showPuestoFields = formData.tipoCV === 'especifico';

  // Número de sección dinámico
  const getSectionNumber = (base) => {
    let n = base;
    if (formData.tieneCV === 'si') n++;               // sección subir CV
    if (formData.tipoRevision === 'premium') n++;      // sección subir LinkedIn
    return n;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">{t[language].header.title}</h1>
              <p className="text-sm text-slate-600 mt-1">{t[language].header.subtitle}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button onClick={() => setLanguage('es')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${language === 'es' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  🇪🇸 ES
                </button>
                <button onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${language === 'en' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  🇬🇧 EN
                </button>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-slate-600">{t[language].header.contact}</p>
                <a href="mailto:jrgarcia@nocodia.net" className="text-sm font-medium text-blue-700 hover:text-blue-800">jrgarcia@nocodia.net</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16">
        {/* HERO */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            {t[language].hero.title1}<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t[language].hero.title2}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">{t[language].hero.subtitle}</p>
        </div>

        {/* PRICING */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">{t[language].pricing.revision}</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">{t[language].pricing.free}</div>
            <p className="text-sm text-slate-600">{t[language].pricing.freeDesc}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">{t[language].pricing.specialized}</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">$12</div>
            <p className="text-sm text-slate-600 mb-2">{t[language].pricing.specializedDesc}</p>
            <p className="text-xs text-slate-500 whitespace-pre-line">{t[language].pricing.specializedBullets}</p>
            <p className="text-xs text-slate-400 mt-2">{t[language].pricing.specializedNote}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">{t[language].pricing.basic}</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">$15</div>
            <p className="text-sm text-slate-600">{t[language].pricing.basicDesc}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg border-2 border-blue-700 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">{t[language].pricing.recommended}</div>
            <div className="text-sm font-semibold text-blue-100 uppercase tracking-wide mb-2">{t[language].pricing.premium}</div>
            <div className="text-3xl font-bold text-white mb-2">$20</div>
            <p className="text-sm text-blue-100 mb-2">{t[language].pricing.premiumDesc}</p>
            <p className="text-xs text-blue-200 whitespace-pre-line">{t[language].pricing.premiumBullets}</p>
            <p className="text-xs text-blue-300 mt-2">{t[language].pricing.premiumNote}</p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
            <h3 className="text-2xl font-serif font-bold text-white">{t[language].form.title}</h3>
            <p className="text-slate-300 mt-1">{t[language].form.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* SECCIÓN 1 — Datos básicos */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">{t[language].form.section1}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.nombre} *</label>
                  <input type="text" required value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t[language].form.nombrePlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.email} *</label>
                  <input type="email" required value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t[language].form.emailPlaceholder} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.telefono}</label>
                  <input type="tel" value={formData.telefono}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder={t[language].form.telefonoPlaceholder} />
                </div>
              </div>
            </section>

            {/* SECCIÓN 2 — ¿Tienes CV? */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">{t[language].form.section2}</h4>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="tieneCV" value="si" checked={formData.tieneCV === 'si'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tieneCV: e.target.value, tipoRevision: 'generica', tipoCV: '' }))}
                    className="w-4 h-4 text-blue-600" />
                  <span className="ml-3 text-slate-900 font-medium">{t[language].form.tienesSi}</span>
                </label>
                <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="tieneCV" value="no" checked={formData.tieneCV === 'no'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tieneCV: e.target.value, tipoRevision: 'basico', tipoCV: '' }))}
                    className="w-4 h-4 text-blue-600" />
                  <span className="ml-3 text-slate-900 font-medium">{t[language].form.tienesNo}</span>
                </label>
              </div>
            </section>

            {/* SECCIÓN 3 — Subir CV */}
            {formData.tieneCV === 'si' && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">{t[language].form.section3Upload}</h4>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-medium hover:text-blue-700">{t[language].form.selectCV}</span>
                    <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'cvFile')} className="hidden" required={formData.tieneCV === 'si'} />
                  </label>
                  <p className="text-sm text-slate-500 mt-2">{t[language].form.pdfMax}</p>
                  {formData.cvFile && <p className="text-sm text-green-600 mt-3 font-medium">✓ {formData.cvFile.name}</p>}
                </div>
              </section>
            )}

            {/* SECCIÓN LinkedIn (Premium) */}
            {formData.tipoRevision === 'premium' && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' ? '4' : '3'}. {t[language].form.section3LinkedIn}
                </h4>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg p-6">
                  <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                    <p className="font-semibold text-purple-900 mb-2 text-sm">{t[language].form.linkedinInstructions}</p>
                    <ol className="text-sm text-slate-700 space-y-1 list-decimal list-inside">
                      <li>{t[language].form.linkedinStep1}</li>
                      <li>{t[language].form.linkedinStep2}</li>
                      <li>{t[language].form.linkedinStep3}</li>
                      <li>{t[language].form.linkedinStep4}</li>
                      <li>{t[language].form.linkedinStep5}</li>
                    </ol>
                  </div>
                  <div className="border-2 border-dashed border-purple-400 rounded-lg p-6 text-center hover:border-purple-600 transition-colors bg-white">
                    <Upload className="w-10 h-10 text-purple-500 mx-auto mb-3" />
                    <label className="cursor-pointer">
                      <span className="text-purple-600 font-medium hover:text-purple-700 text-lg">{t[language].form.selectLinkedIn}</span>
                      <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, 'linkedinFile')} className="hidden" required={formData.tipoRevision === 'premium'} />
                    </label>
                    <p className="text-sm text-slate-500 mt-2">{t[language].form.pdfMax}</p>
                    {formData.linkedinFile && <p className="text-sm text-purple-600 mt-3 font-medium">✓ {formData.linkedinFile.name}</p>}
                  </div>
                </div>
              </section>
            )}

            {/* SECCIÓN — Tipo de revisión */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                {formData.tieneCV === 'si' ? (formData.tipoRevision === 'premium' ? '5' : '4') : (formData.tipoRevision === 'premium' ? '4' : '3')}. {t[language].form.tipoRevisionSection} {formData.tieneCV === 'si' ? t[language].form.revision : t[language].form.servicio}
              </h4>
              <div className="space-y-3">
                {formData.tieneCV === 'si' && (
                  <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="radio" name="tipoRevision" value="generica" checked={formData.tipoRevision === 'generica'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value, tipoCV: '' }))}
                      className="w-4 h-4 text-blue-600 mt-1" />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">{t[language].form.revisionGenerica}</span>
                        <span className="text-green-600 font-bold text-sm">{t[language].pricing.free}</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{t[language].form.revisionGenericaDesc}</p>
                    </div>
                  </label>
                )}
                <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="tipoRevision" value="especializada" checked={formData.tipoRevision === 'especializada'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value, tipoCV: '' }))}
                    className="w-4 h-4 text-blue-600 mt-1" />
                  <div className="ml-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-medium">{t[language].form.revisionEspecializada}</span>
                      <span className="text-blue-600 font-bold text-sm">$12</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{t[language].form.revisionEspecializadaDesc}</p>
                  </div>
                </label>
                <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="tipoRevision" value="basico" checked={formData.tipoRevision === 'basico'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value, tipoCV: '' }))}
                    className="w-4 h-4 text-blue-600 mt-1" />
                  <div className="ml-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-medium">{t[language].form.revisionBasica}</span>
                      <span className="text-purple-600 font-bold text-sm">$15</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{t[language].form.revisionBasicaDesc}</p>
                  </div>
                </label>
                <label className="flex items-start p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                  <input type="radio" name="tipoRevision" value="premium" checked={formData.tipoRevision === 'premium'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value, tipoCV: '' }))}
                    className="w-4 h-4 text-blue-600 mt-1" />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-medium">{t[language].form.revisionPremium}</span>
                      <span className="text-blue-600 font-bold text-sm">$20</span>
                      <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold">{t[language].pricing.recommended}</span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1">{t[language].form.revisionPremiumDesc}</p>
                  </div>
                </label>
              </div>
            </section>

            {/* SECCIÓN — Tipo CV (específico vs general) */}
            {showTipoCVOption && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' && formData.tipoRevision === 'premium' ? '6' :
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' ? '5' :
                   formData.tieneCV === 'si' ? '5' : '4'}. {t[language].form.tipoCVSection}
                </h4>
                <div className="space-y-3">
                  <label className="flex items-start p-5 border-2 border-blue-300 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <input type="radio" name="tipoCV" value="especifico" checked={formData.tipoCV === 'especifico'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoCV: e.target.value }))}
                      required={showTipoCVOption} className="w-4 h-4 text-blue-600 mt-1" />
                    <div className="ml-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-900 font-bold">{t[language].form.especifico}</span>
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded font-semibold">{t[language].pricing.recommended}</span>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{t[language].form.especificoDesc}</p>
                      <div className="bg-white rounded p-3 text-xs text-slate-600 space-y-1">
                        <p>{t[language].form.especificoBullet1}</p>
                        <p>{t[language].form.especificoBullet2}</p>
                        <p>{t[language].form.especificoBullet3}</p>
                        <p>{t[language].form.especificoBullet4}</p>
                      </div>
                    </div>
                  </label>
                  <label className="flex items-start p-5 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="radio" name="tipoCV" value="general" checked={formData.tipoCV === 'general'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoCV: e.target.value }))}
                      required={showTipoCVOption} className="w-4 h-4 text-blue-600 mt-1" />
                    <div className="ml-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-slate-900 font-bold">{t[language].form.general}</span>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{t[language].form.generalDesc}</p>
                      <div className="bg-slate-50 rounded p-3 text-xs text-slate-600 space-y-1">
                        <p>{t[language].form.generalBullet1}</p>
                        <p>{t[language].form.generalBullet2}</p>
                        <p>{t[language].form.generalBullet3}</p>
                        <p>{t[language].form.generalBullet4}</p>
                      </div>
                    </div>
                  </label>
                </div>
              </section>
            )}

            {/* SECCIÓN — Información del puesto */}
            {showPuestoFields && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' && formData.tipoRevision === 'premium' ? '7' :
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' ? '6' :
                   formData.tieneCV === 'si' ? '6' : '5'}. {t[language].form.puestoSection}
                </h4>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-1">{t[language].form.puestoNote}</p>
                  <p className="text-xs text-blue-700">{t[language].form.puestoNoteDesc}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.puesto} *</label>
                    <input type="text" required value={formData.puesto}
                      onChange={(e) => setFormData(prev => ({ ...prev, puesto: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t[language].form.puestoPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.industria} *</label>
                    <input type="text" required value={formData.industria}
                      onChange={(e) => setFormData(prev => ({ ...prev, industria: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t[language].form.industriaPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.empresa}</label>
                    <input type="text" value={formData.empresa}
                      onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t[language].form.empresaPlaceholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.linkOferta}</label>
                    <input type="url" value={formData.linkOferta}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkOferta: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t[language].form.linkOfertaPlaceholder} />
                  </div>
                </div>

                {/* CAMPO NUEVO — Requisitos del puesto */}
                <div className="mt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.requisitosLabel}</label>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-amber-800 mb-1">{t[language].form.requisitosNote}</p>
                    <p className="text-xs text-amber-700">{t[language].form.requisitosNoteDesc}</p>
                  </div>
                  <textarea
                    required
                    value={formData.requisitosOferta}
                    onChange={handleRequisitosChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder={t[language].form.requisitosPlaceholder}
                  />
                  <p className="text-sm text-slate-500 mt-1">{t[language].form.requisitosWordCount} {reqWordCount}</p>
                </div>
              </section>
            )}

            {/* SECCIÓN — Información adicional */}
            {(formData.tipoRevision === 'especializada' || formData.tipoRevision === 'premium') && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' && formData.tipoRevision === 'premium' && formData.tipoCV === 'especifico' ? '9' :
                   formData.tieneCV === 'si' && formData.tipoRevision === 'premium' && formData.tipoCV === 'general' ? '8' :
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' && formData.tipoCV === 'especifico' ? '8' :
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' && formData.tipoCV === 'general' ? '7' :
                   formData.tieneCV === 'si' && formData.tipoCV === 'especifico' ? '8' :
                   formData.tieneCV === 'si' && formData.tipoCV === 'general' ? '7' :
                   formData.tipoCV === 'especifico' ? '7' : '6'}. {t[language].form.infoSection}
                </h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    {t[language].form.infoNote} {formData.tieneCV === 'si' ? t[language].form.infoCV : t[language].form.infoLinkedIn} {t[language].form.infoMax}
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                    <li>{t[language].form.infoBullet1}</li>
                    <li>{t[language].form.infoBullet2}</li>
                    <li>{t[language].form.infoBullet3}</li>
                    <li>{t[language].form.infoBullet4}</li>
                    <li>{t[language].form.infoBullet5}</li>
                  </ul>
                </div>
                <textarea value={formData.infoAdicional} onChange={handleInfoChange} rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder={t[language].form.infoPlaceholder} />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-600">{t[language].form.palabras} {wordCount}/500</p>
                  {wordCount > 450 && (
                    <p className="text-sm text-amber-600 font-medium">{500 - wordCount} {t[language].form.palabrasRestantes}</p>
                  )}
                </div>
              </section>
            )}

            {/* SUBMIT */}
            <div className="pt-6 border-t border-slate-200">
              {submitStatus && (
                <div className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  {submitStatus.type === 'success'
                    ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                  <p className={`text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {submitStatus.message}
                  </p>
                </div>
              )}
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg">
                {isSubmitting
                  ? <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t[language].form.processing}
                    </span>
                  : `${t[language].form.submit} — ${getPrice()}`}
              </button>
              <p className="text-xs text-slate-500 text-center mt-4">{t[language].form.disclaimer}</p>
            </div>
          </form>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t[language].features.ats}</h3>
            <p className="text-sm text-slate-600">{t[language].features.atsDesc}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t[language].features.compatibility}</h3>
            <p className="text-sm text-slate-600">{t[language].features.compatibilityDesc}</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t[language].features.coverLetter}</h3>
            <p className="text-sm text-slate-600">{t[language].features.coverLetterDesc}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-slate-600">
            <p>{t[language].footer.rights}</p>
            <p className="mt-2">{t[language].footer.contact} <a href="mailto:jrgarcia@nocodia.net" className="text-blue-600 hover:text-blue-700 font-medium">jrgarcia@nocodia.net</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
