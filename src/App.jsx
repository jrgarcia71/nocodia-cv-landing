import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowDown, Zap, Target, FileText, Globe } from 'lucide-react';

// ── Google Fonts ──────────────────────────────────────────────────────────────
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

    :root {
      --dark: #0c1220;
      --blue: #2563eb;
      --blue-light: #3b82f6;
      --gold: #f59e0b;
      --green: #10b981;
      --surface: #ffffff;
      --muted: #64748b;
      --border: #e2e8f0;
      --warm: #fafaf9;
    }

    * { box-sizing: border-box; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--warm);
      color: var(--dark);
      margin: 0;
    }

    .font-display { font-family: 'DM Serif Display', serif; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: 0.4; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50%      { transform: translateY(-8px); }
    }

    .animate-fade-up { animation: fadeUp 0.6s ease both; }
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }

    .float-card { animation: float 4s ease-in-out infinite; }
    .float-card-2 { animation: float 4s ease-in-out infinite 1s; }
    .float-card-3 { animation: float 4s ease-in-out infinite 2s; }

    /* Score ring pulse */
    .score-ring::after {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 2px solid var(--green);
      animation: pulse-ring 2s ease-out infinite;
    }

    /* Upload zone */
    .upload-zone { transition: all 0.2s; }
    .upload-zone:hover { border-color: var(--blue); background: #eff6ff; }
    .upload-zone.has-file { border-color: var(--green); background: #f0fdf4; }

    /* Service cards */
    .service-card { transition: all 0.25s; cursor: pointer; }
    .service-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .service-card.selected { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(37,99,235,0.15); }

    /* Checkboxes */
    .check-label { cursor: pointer; }
    .check-label:hover span { color: #334155; }

    /* Step connector */
    .step-line { background: linear-gradient(to bottom, var(--blue), var(--green)); }
  `}</style>
);

export default function App() {
  const [lang, setLang] = useState('es');
  const paidFormRef = useRef(null);

  // ── FREE FORM STATE ───────────────────────────────────────────────────────
  const [freeData, setFreeData] = useState({ nombre: '', email: '', cvFile: null });
  const [freeSubmitting, setFreeSubmitting] = useState(false);
  const [freeStatus, setFreeStatus] = useState(null);
  const [freeAcceptedTerms, setFreeAcceptedTerms] = useState(false);
  const [freeAcceptedLimits, setFreeAcceptedLimits] = useState(false);

  // ── PAID FORM STATE ───────────────────────────────────────────────────────
  const [selectedService, setSelectedService] = useState(null);
  const [paidData, setPaidData] = useState({
    nombre: '', email: '', telefono: '', tieneCV: 'si',
    tipoRevision: '', tipoCV: '', puesto: '', empresa: '',
    industria: '', linkOferta: '', requisitosOferta: '',
    infoAdicional: '', cvFile: null, linkedinFile: null
  });
  const [paidSubmitting, setPaidSubmitting] = useState(false);
  const [paidStatus, setPaidStatus] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [reqWordCount, setReqWordCount] = useState(0);
  const [paidAcceptedTerms, setPaidAcceptedTerms] = useState(false);
  const [paidAcceptedLimits, setPaidAcceptedLimits] = useState(false);

  const t = {
    es: {
      nav: { contact: 'Consultas', privacy: 'Privacidad' },
      hero: {
        tag: 'Potenciado por IA',
        h1a: 'Descubre por qué tu CV',
        h1b: 'no genera entrevistas',
        sub: 'Análisis ATS profesional, diagnóstico personalizado y recomendaciones concretas — gratis, en minutos, directo a tu email.',
        bullets: ['Errores que te dejan fuera del proceso', 'Puntuación ATS real de tu documento', 'Pasos concretos para mejorar hoy'],
        cta: 'Analizar mi CV gratis',
        ctaSub: 'Sin costo · Entrega por email · 100% confidencial',
        nameLabel: 'Tu nombre', namePlaceholder: 'Juan Pérez',
        emailLabel: 'Tu email', emailPlaceholder: 'tu@email.com',
        uploadLabel: 'Sube tu CV (PDF)',
        uploadText: 'Haz click o arrastra tu CV aquí',
        uploadSub: 'PDF · Máximo 5MB',
        checkLimits: 'Entiendo que Nocodia CV es un servicio de optimización de documentos y no garantiza entrevistas ni resultados laborales específicos.',
        checkTerms1: 'Acepto la ',
        checkTerms2: 'Política de Privacidad',
        checkTerms3: ' y el tratamiento de mis datos conforme a la LOPDP Ecuador.',
        submitting: 'Analizando...',
        successMsg: '✅ ¡Listo! Revisa tu email — el análisis está en camino.',
        legalNote: 'Nocodia CV cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021). El servicio no garantiza resultados laborales.',
      },
      preview: {
        tag: 'Esto es lo que recibes',
        h2: 'Un análisis real, no un consejo genérico',
        sub: 'Basado en el contenido real de tu CV — no plantillas. Cada análisis es específico para ti.',
        cards: [
          { icon: '🎯', title: 'Puntuación ATS', desc: 'Score preciso de qué tan bien pasa tu CV los filtros automáticos de las empresas.' },
          { icon: '💪', title: 'Puntos fuertes', desc: 'Qué está funcionando bien y por qué eso importa a los reclutadores.' },
          { icon: '⚠️', title: 'Errores críticos', desc: 'Problemas específicos encontrados en tu CV con la corrección exacta.' },
          { icon: '🚀', title: 'Acciones prioritarias', desc: 'Los 3 cambios de mayor impacto que debes hacer primero.' },
        ]
      },
      services: {
        tag: '¿Quieres ir más allá?',
        h2: 'Para una postulación más fuerte',
        sub: 'Servicios diseñados para candidatos que aplican a posiciones específicas o quieren estar completamente preparados.',
        cards: [
          {
            id: 'especializada', price: '$12', label: 'ESPECIALIZADA',
            headline: 'CV adaptado a una vacante real',
            items: ['CV reescrito y optimizado ATS', 'Análisis de compatibilidad con la oferta', 'Carta de presentación personalizada', 'Keywords ATS integradas', 'Tips de optimización LinkedIn'],
            note: 'Puesto específico o mejora general',
            color: '#4f46e5'
          },
          {
            id: 'basico', price: '$15', label: 'BÁSICO',
            headline: 'Te construimos el CV desde cero',
            items: ['CV profesional completo', 'Redactado con tu experiencia', 'Formato ATS optimizado', 'Listo para postular'],
            note: 'Si aún no tienes CV',
            color: '#7c3aed'
          },
          {
            id: 'premium', price: '$20', label: 'PREMIUM', badge: '⭐ RECOMENDADO',
            headline: 'Postulación completa — bilingüe',
            items: ['Todo lo de Especializada', 'CV en Español + Inglés', 'Carta en Español + Inglés', 'LinkedIn PDF analizado', 'Headline + About LinkedIn ES & EN'],
            note: 'Puesto específico o mejora general',
            color: '#2563eb'
          },
        ]
      },
      steps: {
        tag: 'Cómo funciona',
        h2: 'Simple, rápido, profesional',
        items: [
          { n: '01', title: 'Sube tu CV', desc: 'Gratis o elige un servicio. El proceso toma menos de 2 minutos.' },
          { n: '02', title: 'IA analiza tu perfil', desc: 'Claude lee tu CV real y genera un diagnóstico personalizado.' },
          { n: '03', title: 'Recibes el resultado', desc: 'En tu email, listo para usar — análisis, CV optimizado, carta y más.' },
        ]
      },
      paidForm: {
        title: 'Solicitar servicio',
        tieneCV: '¿Tienes CV actual?', si: 'Sí, tengo CV', no: 'No, necesito crearlo desde cero',
        uploadCV: 'Sube tu CV (PDF) *', uploadLinkedIn: 'Sube tu LinkedIn PDF *',
        tipoCV: '¿Para qué tipo de postulación?',
        especifico: 'Para un puesto específico', especificoDesc: 'CV + análisis de compatibilidad + carta personalizada',
        general: 'General (mejorado)', generalDesc: 'CV optimizado para múltiples posiciones',
        puesto: 'Puesto al que aplicas *', puestoP: 'ej: Gerente de Operaciones',
        industria: 'Industria *', industriaP: 'ej: Telecomunicaciones',
        empresa: 'Empresa (opcional)', empresaP: 'ej: Claro Ecuador',
        link: 'Link de la oferta (opcional)',
        reqLabel: 'Requisitos de la oferta *',
        reqNote: '📋 Pega la descripción del puesto — esto activa el análisis de compatibilidad y la carta personalizada.',
        reqP: 'Copia aquí los requisitos, responsabilidades y skills de la oferta...',
        infoLabel: 'Información adicional (max 500 palabras)',
        infoNoCV: 'Tu experiencia profesional completa (max 1000 palabras) *',
        infoNoteCV: '💡 Agrega logros, proyectos o habilidades que no están en tu CV actual.',
        infoNoteNoCV: '📝 Cuéntanos tu experiencia: empresas, puestos, fechas, logros, estudios y habilidades.',
        infoP: 'Ejemplo: Lideré equipo de 12 personas, aumenté ventas B2B en 38%...',
        infoPNoCV: 'Ejemplo:\n\nEXPERIENCIA:\n- Gerente de Ventas, Empresa ABC (2020-2024)\n  • Equipo de 8 personas\n  • Ventas +35%\n\nFORMACIÓN: Ingeniería Comercial, ESPOL, 2015\n\nHABILIDADES: Excel, Salesforce, Inglés B2',
        nombre: 'Nombre completo *', nombreP: 'Juan Pérez',
        email: 'Email *', emailP: 'tu@email.com',
        telefono: 'Teléfono', telefonoP: '+593 99 123 4567',
        checkLimits: 'Entiendo que Nocodia CV es un servicio de optimización de documentos y no garantiza entrevistas ni resultados laborales específicos.',
        checkTerms1: 'Acepto la ', checkTerms2: 'Política de Privacidad', checkTerms3: ' y el tratamiento de mis datos conforme a la LOPDP Ecuador.',
        submit: 'Solicitar',
        submitting: 'Enviando...',
        success: '✅ ¡Solicitud recibida! Te enviaremos el link de pago en las próximas horas.',
        words: 'Palabras:',
        linkedinSteps: ['Abre LinkedIn en tu navegador', 'Ve a tu perfil → click en "Más"', 'Selecciona "Guardar en PDF"', 'Sube el archivo aquí ⬇️'],
      },
      footer: { rights: '© 2026 Nocodia CV · Guayaquil, Ecuador', contact: 'Consultas:', privacy: 'Política de Privacidad', lopdp: 'Cumple con LOPDP Ecuador' }
    },
    en: {
      nav: { contact: 'Contact', privacy: 'Privacy' },
      hero: {
        tag: 'AI-Powered',
        h1a: 'Find out why your resume',
        h1b: "isn't getting interviews",
        sub: 'Professional ATS analysis, personalized diagnosis and concrete recommendations — free, in minutes, delivered to your email.',
        bullets: ['Errors keeping you out of the process', 'Real ATS score of your document', 'Concrete steps to improve today'],
        cta: 'Analyze my resume for free',
        ctaSub: 'No cost · Email delivery · 100% confidential',
        nameLabel: 'Your name', namePlaceholder: 'John Smith',
        emailLabel: 'Your email', emailPlaceholder: 'you@email.com',
        uploadLabel: 'Upload your resume (PDF)',
        uploadText: 'Click or drag your resume here',
        uploadSub: 'PDF · Max 5MB',
        checkLimits: 'I understand that Nocodia CV is a document optimization service and does not guarantee interviews or specific employment results.',
        checkTerms1: 'I accept the ',
        checkTerms2: 'Privacy Policy',
        checkTerms3: ' and the processing of my data in accordance with Ecuador\'s LOPDP.',
        submitting: 'Analyzing...',
        successMsg: '✅ Done! Check your email — your analysis is on its way.',
        legalNote: "Nocodia CV complies with Ecuador's Organic Law on Personal Data Protection (LOPDP). The service does not guarantee employment results.",
      },
      preview: {
        tag: 'What you receive',
        h2: 'A real analysis, not generic advice',
        sub: 'Based on the actual content of your resume — not templates. Every analysis is specific to you.',
        cards: [
          { icon: '🎯', title: 'ATS Score', desc: 'Precise score of how well your resume passes companies\' automatic filters.' },
          { icon: '💪', title: 'Strengths', desc: 'What\'s working well and why it matters to recruiters.' },
          { icon: '⚠️', title: 'Critical issues', desc: 'Specific problems found in your resume with the exact fix.' },
          { icon: '🚀', title: 'Priority actions', desc: 'The 3 highest-impact changes you should make first.' },
        ]
      },
      services: {
        tag: 'Want to go further?',
        h2: 'For a stronger application',
        sub: 'Services designed for candidates applying to specific positions or who want to be fully prepared.',
        cards: [
          {
            id: 'especializada', price: '$12', label: 'SPECIALIZED',
            headline: 'Resume tailored to a real job posting',
            items: ['Rewritten ATS-optimized resume', 'Compatibility analysis with the job', 'Personalized cover letter', 'ATS keywords integrated', 'LinkedIn optimization tips'],
            note: 'Specific position or general improvement',
            color: '#4f46e5'
          },
          {
            id: 'basico', price: '$15', label: 'BASIC',
            headline: 'We build your resume from scratch',
            items: ['Complete professional resume', 'Written with your experience', 'ATS-optimized format', 'Ready to apply'],
            note: 'If you don\'t have a resume yet',
            color: '#7c3aed'
          },
          {
            id: 'premium', price: '$20', label: 'PREMIUM', badge: '⭐ RECOMMENDED',
            headline: 'Complete bilingual application',
            items: ['Everything in Specialized', 'Resume in Spanish + English', 'Cover letter in Spanish + English', 'LinkedIn PDF analyzed', 'Headline + About LinkedIn ES & EN'],
            note: 'Specific position or general improvement',
            color: '#2563eb'
          },
        ]
      },
      steps: {
        tag: 'How it works',
        h2: 'Simple, fast, professional',
        items: [
          { n: '01', title: 'Upload your resume', desc: 'Free or choose a service. The process takes less than 2 minutes.' },
          { n: '02', title: 'AI analyzes your profile', desc: 'Claude reads your real resume and generates a personalized diagnosis.' },
          { n: '03', title: 'Receive the result', desc: 'In your email, ready to use — analysis, optimized resume, cover letter and more.' },
        ]
      },
      paidForm: {
        title: 'Request service',
        tieneCV: 'Do you have a current resume?', si: 'Yes, I have a resume', no: 'No, I need to create one from scratch',
        uploadCV: 'Upload your resume (PDF) *', uploadLinkedIn: 'Upload your LinkedIn PDF *',
        tipoCV: 'What type of application?',
        especifico: 'For a specific position', especificoDesc: 'Resume + compatibility analysis + personalized cover letter',
        general: 'General (improved)', generalDesc: 'Optimized resume for multiple positions',
        puesto: 'Position you\'re applying for *', puestoP: 'ex: Operations Manager',
        industria: 'Industry *', industriaP: 'ex: Telecommunications',
        empresa: 'Company (optional)', empresaP: 'ex: Claro',
        link: 'Job posting link (optional)',
        reqLabel: 'Job requirements *',
        reqNote: '📋 Paste the job description — this activates the compatibility analysis and personalized cover letter.',
        reqP: 'Copy the requirements, responsibilities and skills from the job posting...',
        infoLabel: 'Additional information (max 500 words)',
        infoNoCV: 'Your complete professional experience (max 1000 words) *',
        infoNoteCV: '💡 Add achievements, projects or skills not in your current resume.',
        infoNoteNoCV: '📝 Tell us your experience: companies, positions, dates, achievements, education and skills.',
        infoP: 'Example: Led a team of 12 people, increased B2B sales by 38%...',
        infoPNoCV: 'Example:\n\nEXPERIENCE:\n- Sales Manager, Company ABC (2020-2024)\n  • Team of 8 people\n  • +35% sales\n\nEDUCATION: Business Engineering, 2015\n\nSKILLS: Excel, Salesforce, English C1',
        nombre: 'Full name *', nombreP: 'John Smith',
        email: 'Email *', emailP: 'you@email.com',
        telefono: 'Phone', telefonoP: '+1 555 123 4567',
        checkLimits: 'I understand that Nocodia CV is a document optimization service and does not guarantee interviews or specific employment results.',
        checkTerms1: 'I accept the ', checkTerms2: 'Privacy Policy', checkTerms3: ' and the processing of my data in accordance with Ecuador\'s LOPDP.',
        submit: 'Request',
        submitting: 'Sending...',
        success: '✅ Request received! We will send you the payment link within the next few hours.',
        words: 'Words:',
        linkedinSteps: ['Open LinkedIn in your browser', 'Go to your profile → click "More"', 'Select "Save to PDF"', 'Upload the file here ⬇️'],
      },
      footer: { rights: '© 2026 Nocodia CV · Guayaquil, Ecuador', contact: 'Contact:', privacy: 'Privacy Policy', lopdp: 'Compliant with Ecuador\'s LOPDP' }
    }
  };

  const T = t[lang];

  // ── FREE FORM SUBMIT ──────────────────────────────────────────────────────
  const handleFreeSubmit = async (e) => {
    e.preventDefault();
    setFreeSubmitting(true);
    setFreeStatus(null);
    try {
      const fd = new FormData();
      fd.append('nombre', freeData.nombre);
      fd.append('email', freeData.email);
      if (freeData.cvFile) fd.append('cvFile', freeData.cvFile);
      fd.append('tieneCV', 'si');
      fd.append('tipoRevision', 'generica');
      fd.append('formLanguage', lang);

      const res = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', { method: 'POST', body: fd });
      const result = await res.json();
      if (res.ok) {
        setFreeStatus({ ok: true, msg: result.message });
        setFreeData({ nombre: '', email: '', cvFile: null });
        setFreeAcceptedTerms(false);
        setFreeAcceptedLimits(false);
      } else {
        setFreeStatus({ ok: false, msg: result.error });
      }
    } catch { setFreeStatus({ ok: false, msg: 'Error de conexión.' }); }
    finally { setFreeSubmitting(false); }
  };

  // ── PAID FORM SUBMIT ──────────────────────────────────────────────────────
  const handlePaidSubmit = async (e) => {
    e.preventDefault();
    setPaidSubmitting(true);
    setPaidStatus(null);
    try {
      const fd = new FormData();
      Object.keys(paidData).forEach(k => { if (paidData[k]) fd.append(k, paidData[k]); });
      fd.append('formLanguage', lang);

      const res = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', { method: 'POST', body: fd });
      const result = await res.json();
      if (res.ok) {
        setPaidStatus({ ok: true, msg: result.message });
        setPaidData({ nombre: '', email: '', telefono: '', tieneCV: 'si', tipoRevision: selectedService, tipoCV: '', puesto: '', empresa: '', industria: '', linkOferta: '', requisitosOferta: '', infoAdicional: '', cvFile: null, linkedinFile: null });
        setWordCount(0); setReqWordCount(0);
        setPaidAcceptedTerms(false); setPaidAcceptedLimits(false);
      } else {
        setPaidStatus({ ok: false, msg: result.error });
      }
    } catch { setPaidStatus({ ok: false, msg: 'Error de conexión.' }); }
    finally { setPaidSubmitting(false); }
  };

  const selectService = (id) => {
    setSelectedService(id);
    setPaidData(prev => ({ ...prev, tipoRevision: id, tipoCV: '', cvFile: null, linkedinFile: null }));
    setPaidStatus(null);
    setTimeout(() => paidFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const handlePaidInfo = (e) => {
    const text = e.target.value;
    const limit = paidData.tieneCV === 'no' ? 1000 : 500;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    if (words <= limit) { setPaidData(prev => ({ ...prev, infoAdicional: text })); setWordCount(words); }
  };

  const handleReqChange = (e) => {
    const text = e.target.value;
    setPaidData(prev => ({ ...prev, requisitosOferta: text }));
    setReqWordCount(text.trim().split(/\s+/).filter(Boolean).length);
  };

  const showTipoCV = ['especializada','premium'].includes(paidData.tipoRevision);
  const showPuesto = paidData.tipoCV === 'especifico';
  const showInfoSection = paidData.tipoRevision !== '';
  const isPremium = paidData.tipoRevision === 'premium';
  const isBasico = paidData.tipoRevision === 'basico';

  const serviceLabel = { especializada: lang === 'es' ? 'Especializada $12' : 'Specialized $12', basico: lang === 'es' ? 'Básico $15' : 'Basic $15', premium: 'Premium $20' };

  return (
    <>
      <FontLink />

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(12,18,32,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 12px #3b82f6' }} />
            <span className="font-display" style={{ color: 'white', fontSize: 18, letterSpacing: '-0.02em' }}>Nocodia CV</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {['es','en'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{ padding: '4px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: 'inherit', background: lang === l ? '#2563eb' : 'rgba(255,255,255,0.1)', color: 'white', transition: 'all 0.2s' }}>
                  {l === 'es' ? '🇪🇸 ES' : '🇬🇧 EN'}
                </button>
              ))}
            </div>
            <a href="mailto:jrgarcia@nocodia.net" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>jrgarcia@nocodia.net</a>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(160deg, #0c1220 0%, #0f1f3d 50%, #0c1220 100%)', padding: '80px 24px 100px', overflow: 'hidden', position: 'relative' }}>
        {/* Background texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(79,70,229,0.1) 0%, transparent 50%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', position: 'relative' }}>

          {/* Left: copy */}
          <div>
            <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 20, padding: '6px 14px', marginBottom: 24 }}>
              <Zap size={13} color="#3b82f6" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#93c5fd', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{T.hero.tag}</span>
            </div>

            <h1 className="animate-fade-up delay-1 font-display" style={{ fontSize: 'clamp(36px, 5vw, 54px)', lineHeight: 1.1, color: 'white', margin: '0 0 16px', letterSpacing: '-0.03em' }}>
              {T.hero.h1a}<br />
              <span style={{ color: '#60a5fa' }}>{T.hero.h1b}</span>
            </h1>

            <p className="animate-fade-up delay-2" style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', margin: '0 0 28px', maxWidth: 440 }}>{T.hero.sub}</p>

            <ul className="animate-fade-up delay-3" style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {T.hero.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: free form */}
          <div className="animate-fade-up delay-2">
            <form onSubmit={handleFreeSubmit} style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 20, padding: 32, boxShadow: '0 32px 64px rgba(0,0,0,0.4)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{T.hero.tag}</div>
              <h2 className="font-display" style={{ fontSize: 22, color: '#0c1220', margin: '0 0 20px', letterSpacing: '-0.02em' }}>{T.hero.cta}</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.hero.nameLabel}</label>
                  <input required type="text" value={freeData.nombre} onChange={e => setFreeData(p => ({ ...p, nombre: e.target.value }))}
                    placeholder={T.hero.namePlaceholder}
                    style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.hero.emailLabel}</label>
                  <input required type="email" value={freeData.email} onChange={e => setFreeData(p => ({ ...p, email: e.target.value }))}
                    placeholder={T.hero.emailPlaceholder}
                    style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.hero.uploadLabel}</label>
                  <label className={`upload-zone ${freeData.cvFile ? 'has-file' : ''}`} style={{ display: 'block', border: `2px dashed ${freeData.cvFile ? '#10b981' : '#cbd5e1'}`, borderRadius: 10, padding: '16px', textAlign: 'center', cursor: 'pointer', background: freeData.cvFile ? '#f0fdf4' : '#f8fafc', transition: 'all 0.2s' }}>
                    <Upload size={20} color={freeData.cvFile ? '#10b981' : '#94a3b8'} style={{ margin: '0 auto 6px', display: 'block' }} />
                    <div style={{ fontSize: 13, fontWeight: 600, color: freeData.cvFile ? '#059669' : '#2563eb' }}>
                      {freeData.cvFile ? `✓ ${freeData.cvFile.name}` : T.hero.uploadText}
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{T.hero.uploadSub}</div>
                    <input required type="file" accept=".pdf" className="hidden" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setFreeData(p => ({ ...p, cvFile: e.target.files[0] })); }} />
                  </label>
                </div>

                {/* Checkboxes */}
                <label style={{ display: 'flex', gap: 8, cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" required checked={freeAcceptedLimits} onChange={e => setFreeAcceptedLimits(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{T.hero.checkLimits}</span>
                </label>
                <label style={{ display: 'flex', gap: 8, cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" required checked={freeAcceptedTerms} onChange={e => setFreeAcceptedTerms(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
                    {T.hero.checkTerms1}
                    <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>{T.hero.checkTerms2}</a>
                    {T.hero.checkTerms3}
                  </span>
                </label>

                {freeStatus && (
                  <div style={{ padding: '10px 14px', borderRadius: 8, background: freeStatus.ok ? '#f0fdf4' : '#fef2f2', border: `1px solid ${freeStatus.ok ? '#bbf7d0' : '#fecaca'}`, fontSize: 13, color: freeStatus.ok ? '#065f46' : '#991b1b', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    {freeStatus.ok ? <CheckCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />}
                    {freeStatus.msg}
                  </div>
                )}

                <button type="submit" disabled={freeSubmitting || !freeAcceptedTerms || !freeAcceptedLimits}
                  style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', cursor: freeSubmitting || !freeAcceptedTerms || !freeAcceptedLimits ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', color: 'white', fontSize: 15, fontWeight: 700, fontFamily: 'inherit', opacity: !freeAcceptedTerms || !freeAcceptedLimits ? 0.5 : 1, transition: 'all 0.2s' }}>
                  {freeSubmitting ? T.hero.submitting : T.hero.cta}
                </button>

                <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', margin: 0 }}>{T.hero.ctaSub}</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── PREVIEW ───────────────────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>{T.preview.tag}</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0c1220', margin: '0 0 12px', letterSpacing: '-0.02em' }}>{T.preview.h2}</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 500, margin: '0 auto' }}>{T.preview.sub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {T.preview.cards.map((card, i) => (
              <div key={i} style={{ background: '#f8fafc', borderRadius: 16, padding: 24, border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0c1220', margin: '0 0 8px' }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0, lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Score visual sample */}
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #0c1220, #0f1f3d)', borderRadius: 20, padding: 32, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 100, height: 100, flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: 100, height: 100 }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${0.78 * 264} 264`} style={{ transition: 'stroke-dasharray 1s ease' }} />
              </svg>
              <div className="score-ring" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: 'white', lineHeight: 1 }}>78</span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>/100</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Ejemplo de análisis ATS</div>
              <h3 className="font-display" style={{ fontSize: 22, color: 'white', margin: '0 0 8px' }}>"CV competitivo con áreas clave de mejora"</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>El CV tiene buena estructura pero carece de logros cuantificados. 3 errores críticos detectados que reducen su visibilidad en ATS. Recomendaciones específicas incluidas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#fafaf9', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'inline-block', background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>{T.services.tag}</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#0c1220', margin: '0 0 12px', letterSpacing: '-0.02em' }}>{T.services.h2}</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 520, margin: '0 auto' }}>{T.services.sub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {T.services.cards.map((card) => (
              <div key={card.id} className="service-card" onClick={() => selectService(card.id)}
                style={{ background: 'white', borderRadius: 20, padding: 28, border: `2px solid ${selectedService === card.id ? card.color : '#e2e8f0'}`, position: 'relative', overflow: 'hidden' }}>
                {card.badge && (
                  <div style={{ position: 'absolute', top: 16, right: 16, background: '#fbbf24', color: '#78350f', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>{card.badge}</div>
                )}
                <div style={{ fontSize: 11, fontWeight: 700, color: card.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{card.label}</div>
                <div className="font-display" style={{ fontSize: 40, color: '#0c1220', fontWeight: 400, marginBottom: 4 }}>{card.price}</div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#334155', margin: '0 0 16px' }}>{card.headline}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {card.items.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#475569' }}>
                      <span style={{ color: card.color, flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 11, color: '#94a3b8', margin: '0 0 16px' }}>{card.note}</p>
                <button style={{ width: '100%', padding: '11px', borderRadius: 10, border: `1.5px solid ${card.color}`, background: selectedService === card.id ? card.color : 'transparent', color: selectedService === card.id ? 'white' : card.color, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                  {selectedService === card.id ? '✓ Seleccionado' : (lang === 'es' ? 'Solicitar este servicio' : 'Request this service')} <ArrowDown size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAID FORM ─────────────────────────────────────────────────────── */}
      {selectedService && (
        <section ref={paidFormRef} style={{ background: 'white', padding: '60px 24px', borderTop: '3px solid #2563eb' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{T.paidForm.title}</div>
              <h2 className="font-display" style={{ fontSize: 28, color: '#0c1220', margin: 0, letterSpacing: '-0.02em' }}>{serviceLabel[selectedService]}</h2>
            </div>

            <form onSubmit={handlePaidSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Datos básicos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { key: 'nombre', label: T.paidForm.nombre, placeholder: T.paidForm.nombreP, type: 'text', required: true },
                  { key: 'email', label: T.paidForm.email, placeholder: T.paidForm.emailP, type: 'email', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                    <input required={f.required} type={f.type} value={paidData[f.key]} onChange={e => setPaidData(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.paidForm.telefono}</label>
                <input type="tel" value={paidData.telefono} onChange={e => setPaidData(p => ({ ...p, telefono: e.target.value }))}
                  placeholder={T.paidForm.telefonoP}
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              {/* ¿Tiene CV? — solo para no-basico */}
              {!isBasico && (
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.paidForm.tieneCV}</label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[{ v: 'si', l: T.paidForm.si }, { v: 'no', l: T.paidForm.no }].map(opt => (
                      <label key={opt.v} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', border: `1.5px solid ${paidData.tieneCV === opt.v ? '#2563eb' : '#e2e8f0'}`, borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 500, background: paidData.tieneCV === opt.v ? '#eff6ff' : 'white' }}>
                        <input type="radio" name="tieneCV" value={opt.v} checked={paidData.tieneCV === opt.v} onChange={e => setPaidData(p => ({ ...p, tieneCV: e.target.value, cvFile: null }))} />
                        {opt.l}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload CV */}
              {(paidData.tieneCV === 'si' && !isBasico) && (
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.paidForm.uploadCV}</label>
                  <label className={`upload-zone ${paidData.cvFile ? 'has-file' : ''}`} style={{ display: 'block', border: `2px dashed ${paidData.cvFile ? '#10b981' : '#cbd5e1'}`, borderRadius: 10, padding: 20, textAlign: 'center', cursor: 'pointer', background: paidData.cvFile ? '#f0fdf4' : '#f8fafc' }}>
                    <Upload size={20} color={paidData.cvFile ? '#10b981' : '#94a3b8'} style={{ margin: '0 auto 6px', display: 'block' }} />
                    <div style={{ fontSize: 13, fontWeight: 600, color: paidData.cvFile ? '#059669' : '#2563eb' }}>{paidData.cvFile ? `✓ ${paidData.cvFile.name}` : (lang === 'es' ? 'Selecciona tu CV' : 'Select your resume')}</div>
                    <input required type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setPaidData(p => ({ ...p, cvFile: e.target.files[0] })); }} />
                  </label>
                </div>
              )}

              {/* Upload LinkedIn (Premium) */}
              {isPremium && (
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.paidForm.uploadLinkedIn}</label>
                  <div style={{ background: '#faf5ff', border: '1px solid #ddd6fe', borderRadius: 10, padding: 16, marginBottom: 10 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#6d28d9', margin: '0 0 8px' }}>📱 {lang === 'es' ? 'Cómo descargar tu LinkedIn:' : 'How to download your LinkedIn:'}</p>
                    <ol style={{ fontSize: 12, color: '#64748b', paddingLeft: 16, margin: 0, lineHeight: 1.8 }}>
                      {T.paidForm.linkedinSteps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  </div>
                  <label className={`upload-zone ${paidData.linkedinFile ? 'has-file' : ''}`} style={{ display: 'block', border: `2px dashed ${paidData.linkedinFile ? '#10b981' : '#c4b5fd'}`, borderRadius: 10, padding: 20, textAlign: 'center', cursor: 'pointer', background: paidData.linkedinFile ? '#f0fdf4' : '#faf5ff' }}>
                    <Upload size={20} color={paidData.linkedinFile ? '#10b981' : '#8b5cf6'} style={{ margin: '0 auto 6px', display: 'block' }} />
                    <div style={{ fontSize: 13, fontWeight: 600, color: paidData.linkedinFile ? '#059669' : '#7c3aed' }}>{paidData.linkedinFile ? `✓ ${paidData.linkedinFile.name}` : (lang === 'es' ? 'Selecciona tu LinkedIn PDF' : 'Select your LinkedIn PDF')}</div>
                    <input required type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setPaidData(p => ({ ...p, linkedinFile: e.target.files[0] })); }} />
                  </label>
                </div>
              )}

              {/* Tipo CV */}
              {showTipoCV && (
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{T.paidForm.tipoCV}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[
                      { v: 'especifico', l: T.paidForm.especifico, d: T.paidForm.especificoDesc },
                      { v: 'general',   l: T.paidForm.general,    d: T.paidForm.generalDesc },
                    ].map(opt => (
                      <label key={opt.v} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px 16px', border: `1.5px solid ${paidData.tipoCV === opt.v ? '#2563eb' : '#e2e8f0'}`, borderRadius: 10, cursor: 'pointer', background: paidData.tipoCV === opt.v ? '#eff6ff' : 'white' }}>
                        <input required type="radio" name="tipoCV" value={opt.v} checked={paidData.tipoCV === opt.v} onChange={e => setPaidData(p => ({ ...p, tipoCV: e.target.value }))} style={{ marginTop: 2 }} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: '#0c1220' }}>{opt.l}</div>
                          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{opt.d}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Puesto fields */}
              {showPuesto && (
                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.06em' }}>📌 {lang === 'es' ? 'Información del puesto' : 'Position information'}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { key: 'puesto', label: T.paidForm.puesto, placeholder: T.paidForm.puestoP, required: true },
                      { key: 'industria', label: T.paidForm.industria, placeholder: T.paidForm.industriaP, required: true },
                      { key: 'empresa', label: T.paidForm.empresa, placeholder: T.paidForm.empresaP, required: false },
                      { key: 'linkOferta', label: T.paidForm.link, placeholder: 'https://...', required: false, type: 'url' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#0369a1', marginBottom: 4 }}>{f.label}</label>
                        <input required={f.required} type={f.type || 'text'} value={paidData[f.key]} onChange={e => setPaidData(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #bae6fd', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', background: 'white', boxSizing: 'border-box' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#0369a1', marginBottom: 4 }}>{T.paidForm.reqLabel}</label>
                    <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 8, padding: '10px 12px', marginBottom: 8, fontSize: 12, color: '#92400e' }}>{T.paidForm.reqNote}</div>
                    <textarea required value={paidData.requisitosOferta} onChange={handleReqChange} rows={6} placeholder={T.paidForm.reqP}
                      style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #bae6fd', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical', background: 'white', boxSizing: 'border-box' }} />
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{T.paidForm.words} {reqWordCount}</div>
                  </div>
                </div>
              )}

              {/* Info adicional */}
              {showInfoSection && (
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {paidData.tieneCV === 'no' ? T.paidForm.infoNoCV : T.paidForm.infoLabel}
                  </label>
                  <div style={{ background: paidData.tieneCV === 'no' ? '#f0fdf4' : '#f8fafc', border: `1px solid ${paidData.tieneCV === 'no' ? '#bbf7d0' : '#e2e8f0'}`, borderRadius: 8, padding: '10px 12px', marginBottom: 8, fontSize: 12, color: paidData.tieneCV === 'no' ? '#065f46' : '#64748b' }}>
                    {paidData.tieneCV === 'no' ? T.paidForm.infoNoteNoCV : T.paidForm.infoNoteCV}
                  </div>
                  <textarea value={paidData.infoAdicional} onChange={handlePaidInfo}
                    rows={paidData.tieneCV === 'no' ? 10 : 5}
                    required={paidData.tieneCV === 'no'}
                    placeholder={paidData.tieneCV === 'no' ? T.paidForm.infoPNoCV : T.paidForm.infoP}
                    style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{T.paidForm.words} {wordCount}/{paidData.tieneCV === 'no' ? 1000 : 500}</div>
                </div>
              )}

              {/* Checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
                <label style={{ display: 'flex', gap: 8, cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" required checked={paidAcceptedLimits} onChange={e => setPaidAcceptedLimits(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>{T.paidForm.checkLimits}</span>
                </label>
                <label style={{ display: 'flex', gap: 8, cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" required checked={paidAcceptedTerms} onChange={e => setPaidAcceptedTerms(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
                    {T.paidForm.checkTerms1}
                    <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>{T.paidForm.checkTerms2}</a>
                    {T.paidForm.checkTerms3}
                  </span>
                </label>
              </div>

              {paidStatus && (
                <div style={{ padding: '12px 16px', borderRadius: 10, background: paidStatus.ok ? '#f0fdf4' : '#fef2f2', border: `1px solid ${paidStatus.ok ? '#bbf7d0' : '#fecaca'}`, fontSize: 13, color: paidStatus.ok ? '#065f46' : '#991b1b', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  {paidStatus.ok ? <CheckCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} /> : <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />}
                  {paidStatus.msg}
                </div>
              )}

              <button type="submit" disabled={paidSubmitting || !paidAcceptedTerms || !paidAcceptedLimits}
                style={{ width: '100%', padding: '15px', borderRadius: 12, border: 'none', cursor: paidSubmitting || !paidAcceptedTerms || !paidAcceptedLimits ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg, #2563eb, #4f46e5)', color: 'white', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', opacity: !paidAcceptedTerms || !paidAcceptedLimits ? 0.5 : 1 }}>
                {paidSubmitting ? T.paidForm.submitting : `${T.paidForm.submit} ${serviceLabel[selectedService]}`}
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#0c1220', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: 'rgba(59,130,246,0.15)', color: '#93c5fd', borderRadius: 20, padding: '5px 14px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 16 }}>{T.steps.tag}</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'white', margin: '0 0 48px', letterSpacing: '-0.02em' }}>{T.steps.h2}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {T.steps.items.map((step, i) => (
              <div key={i}>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'rgba(59,130,246,0.3)', fontFamily: 'DM Serif Display, serif', marginBottom: 12 }}>{step.n}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'white', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            {lang === 'es' ? 'Empieza gratis hoy' : 'Start free today'}
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', margin: '0 0 28px' }}>
            {lang === 'es' ? 'Descubre en minutos qué está frenando tus oportunidades laborales.' : 'Find out in minutes what\'s holding back your career opportunities.'}
          </p>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ padding: '14px 36px', borderRadius: 12, border: '2px solid white', background: 'white', color: '#2563eb', fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            {lang === 'es' ? 'Analizar mi CV gratis ↑' : 'Analyze my resume for free ↑'}
          </button>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#080e1a', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{T.footer.rights}</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{T.footer.lopdp}</span>
            <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{T.footer.privacy}</a>
            <a href="mailto:jrgarcia@nocodia.net" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>jrgarcia@nocodia.net</a>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '16px auto 0', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', margin: 0 }}>
            {lang === 'es'
              ? 'Nocodia CV cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021). El servicio no garantiza resultados laborales específicos.'
              : "Nocodia CV complies with Ecuador's Organic Law on Personal Data Protection (LOPDP). The service does not guarantee specific employment results."}
          </p>
        </div>
      </footer>
    </>
  );
}
