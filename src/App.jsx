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
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [aceptaLimitaciones, setAceptaLimitaciones] = useState(false);

  const infoWordLimit = formData.tieneCV === 'no' ? 1000 : 500;

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
        freeTitle: 'Revisión',
        free: 'GRATIS*',
        freeDesc: 'Análisis profesional de tu CV con puntuación ATS y retroalimentación específica basada en tu documento real',
        specialized: 'Especializada',
        specializedPrice: '$12',
        specializedItems: [
          '✓ CV optimizado ATS',
          '✓ Análisis compatibilidad CV vs oferta',
          '✓ Carta de presentación',
          '✓ Keywords ATS integradas',
          '✓ Optimización LinkedIn',
        ],
        specializedNote: '(Puesto específico o mejora general)',
        basic: 'Básico',
        basicPrice: '$15',
        basicDesc: 'CV profesional creado desde cero. Tú nos cuentas tu experiencia y nosotros lo construimos',
        premium: 'Premium',
        premiumPrice: '$20',
        premiumItems: [
          '✓ Todo lo de Especializada',
          '✓ CV en Español e Inglés',
          '✓ LinkedIn PDF analizado',
          '✓ Headline + About LinkedIn ES & EN',
          '✓ Carta de presentación ES & EN',
        ],
        premiumNote: '(Puesto específico o mejora general)',
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
        revisionGenericaDesc: 'Análisis profesional con puntuación ATS y recomendaciones específicas',
        revisionEspecializada: 'Especializada',
        revisionEspecializadaDesc: 'CV optimizado + análisis de compatibilidad + carta de presentación',
        revisionBasica: 'Básico',
        revisionBasicaDesc: 'CV creado desde cero con tu experiencia',
        revisionPremium: 'Premium',
        revisionPremiumDesc: 'Especializada + versión en inglés + LinkedIn PDF + cartas ES & EN',
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
        generalBullet4: '⚠️ Sin análisis de compatibilidad',
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
        requisitosNote: '📋 Pega aquí la descripción de la oferta de trabajo',
        requisitosNoteDesc: 'Copia los requisitos, responsabilidades y habilidades solicitadas. Esto nos permite generar un análisis de compatibilidad preciso y una carta de presentación personalizada.',
        requisitosPlaceholder: 'Ejemplo:\n\nRequisitos:\n- 5+ años de experiencia en gestión de equipos\n- Conocimiento en metodologías ágiles\n- Manejo de presupuestos operativos\n\nResponsabilidades:\n- Liderar equipo de 20+ personas\n- Reportar a Gerencia General\n- Gestionar presupuesto operativo...',
        infoSectionWithCV: 'Información adicional',
        infoNoteWithCV: '💡 Agrega lo que NO está en tu CV actual (máx 500 palabras):',
        infoDescWithCV: 'Esta información tiene la misma importancia que tu CV para optimizarlo.',
        infoBulletsWithCV: [
          'Logros recientes no actualizados en tu CV',
          'Proyectos actuales en desarrollo',
          'Resultados cuantificables específicos',
          'Habilidades técnicas nuevas',
          'Certificaciones en proceso',
        ],
        infoPlaceholderWithCV: 'Ejemplo: En mi rol actual como Gerente de Ventas aumenté las ventas B2B en 42% durante Q1 2026. Implementé un nuevo CRM que redujo el tiempo de cierre en 30%...',
        infoSectionNoCV: 'Tu experiencia profesional',
        infoNoteNoCV: '📝 Cuéntanos tu experiencia para crear tu CV desde cero (máx 1000 palabras):',
        infoDescNoCV: 'Esta información es todo lo que tenemos para crear tu CV. Sé lo más detallado posible.',
        infoBulletsNoCV: [
          'Empresas donde trabajaste, tu puesto y fechas (ej: Gerente de Ventas en Empresa X, 2020-2024)',
          'Principales responsabilidades y logros en cada puesto (con números si los tienes)',
          'Formación académica: título, universidad y año de graduación',
          'Habilidades técnicas y herramientas que manejas',
          'Certificaciones, cursos e idiomas con nivel',
          'Proyectos relevantes o logros destacados',
        ],
        infoPlaceholderNoCV: 'Ejemplo:\n\nEXPERIENCIA:\n- Gerente de Ventas en Empresa ABC (2020-2024)\n  • Lideré equipo de 8 vendedores\n  • Aumenté ventas en 35% en 2 años\n\nFORMACIÓN:\n- Ingeniería Comercial, Universidad Particular, 2016\n\nHABILIDADES:\n- Excel avanzado, Salesforce\n- Inglés B2',
        palabras: 'Palabras:',
        palabrasRestantes: 'palabras restantes',
        submit: 'Solicitar análisis',
        processing: 'Procesando...',
        checkLimitaciones: 'Entiendo y acepto que Nocodia CV es un servicio de optimización de documentos profesionales. El servicio no garantiza que sea contactado para entrevistas de trabajo, que obtenga el empleo al que aplica, ni ningún resultado laboral específico. Los resultados dependen de múltiples factores externos ajenos a Nocodia CV.',
        checkTerminos: 'He leído y acepto la Política de Privacidad, incluyendo el tratamiento de mis datos personales y su transferencia a servidores internacionales para la prestación del servicio, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP).',
        politicaLink: 'Política de Privacidad',
        legalNote: '* Primera revisión genérica gratuita por email. Servicios pagados requieren confirmación de pago. Nocodia CV cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021). El servicio no garantiza resultados laborales específicos.',
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
        contact: 'Consultas:',
        privacy: 'Política de Privacidad'
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
        freeTitle: 'Review',
        free: 'FREE*',
        freeDesc: 'Professional analysis of your resume with ATS score and specific feedback based on your actual document',
        specialized: 'Specialized',
        specializedPrice: '$12',
        specializedItems: [
          '✓ ATS-optimized resume',
          '✓ Compatibility analysis CV vs job',
          '✓ Cover letter',
          '✓ ATS keywords integrated',
          '✓ LinkedIn optimization',
        ],
        specializedNote: '(Specific position or general improvement)',
        basic: 'Basic',
        basicPrice: '$15',
        basicDesc: 'Professional resume created from scratch. You tell us your experience and we build it',
        premium: 'Premium',
        premiumPrice: '$20',
        premiumItems: [
          '✓ Everything in Specialized',
          '✓ Resume in Spanish & English',
          '✓ LinkedIn PDF analyzed',
          '✓ LinkedIn Headline + About ES & EN',
          '✓ Cover letter in Spanish & English',
        ],
        premiumNote: '(Specific position or general improvement)',
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
        revisionGenericaDesc: 'Professional analysis with ATS score and specific recommendations',
        revisionEspecializada: 'Specialized',
        revisionEspecializadaDesc: 'Optimized resume + compatibility analysis + cover letter',
        revisionBasica: 'Basic',
        revisionBasicaDesc: 'Resume created from scratch with your experience',
        revisionPremium: 'Premium',
        revisionPremiumDesc: 'Specialized + English version + LinkedIn PDF + cover letters ES & EN',
        tipoCVSection: 'What type of resume do you need?',
        especifico: 'For a specific position',
        especificoDesc: 'Resume optimized for a specific job posting',
        especificoBullet1: '✓ Position-specific keywords',
        especificoBullet2: '✓ Compatibility analysis CV vs job requirements',
        especificoBullet3: '✓ Personalized cover letter',
        especificoBullet4: '✓ Higher interview probability',
        general: 'General (improved)',
        generalDesc: 'Optimized resume for multiple positions',
        generalBullet1: '✓ Modern professional format',
        generalBullet2: '✓ General ATS optimization',
        generalBullet3: '✓ Quantifiable achievements highlighted',
        generalBullet4: '⚠️ No compatibility analysis',
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
        requisitosPlaceholder: 'Example:\n\nRequirements:\n- 5+ years of team management experience\n- Knowledge of agile methodologies\n- Operational budget management\n\nResponsibilities:\n- Lead a team of 20+ people\n- Report to General Management...',
        infoSectionWithCV: 'Additional Information',
        infoNoteWithCV: '💡 Add what is NOT in your current resume (max 500 words):',
        infoDescWithCV: 'This information is as important as your resume for optimization.',
        infoBulletsWithCV: [
          'Recent achievements not updated in your resume',
          'Current projects in development',
          'Specific quantifiable results',
          'New technical skills',
          'Certifications in progress',
        ],
        infoPlaceholderWithCV: 'Example: In my current role as Sales Manager I increased B2B sales by 42% during Q1 2026...',
        infoSectionNoCV: 'Your professional experience',
        infoNoteNoCV: '📝 Tell us your experience so we can create your resume from scratch (max 1000 words):',
        infoDescNoCV: 'This information is everything we have to create your resume. Be as detailed as possible.',
        infoBulletsNoCV: [
          'Companies you worked at, your position and dates (ex: Sales Manager at Company X, 2020-2024)',
          'Main responsibilities and achievements in each role (with numbers if you have them)',
          'Academic background: degree, university and graduation year',
          'Technical skills and tools you use',
          'Certifications, courses and languages with level',
          'Relevant projects or notable achievements',
        ],
        infoPlaceholderNoCV: 'Example:\n\nEXPERIENCE:\n- Sales Manager at Company ABC (2020-2024)\n  • Led team of 8 sales reps\n  • Increased sales by 35%\n\nEDUCATION:\n- Business Administration, University, 2016\n\nSKILLS:\n- Salesforce, Excel\n- English C1',
        palabras: 'Words:',
        palabrasRestantes: 'words remaining',
        submit: 'Request analysis',
        processing: 'Processing...',
        checkLimitaciones: 'I understand and accept that Nocodia CV is a professional document optimization service. The service does not guarantee that I will be contacted for job interviews, that I will obtain the position I am applying for, or any specific employment outcome. Results depend on multiple external factors beyond Nocodia CV\'s control.',
        checkTerminos: 'I have read and accept the Privacy Policy, including the processing of my personal data and its transfer to international servers for service delivery, in accordance with Ecuador\'s Organic Law on Personal Data Protection (LOPDP).',
        politicaLink: 'Privacy Policy',
        legalNote: '* First generic review free by email. Paid services require payment confirmation. Nocodia CV complies with Ecuador\'s Organic Law on Personal Data Protection (LOPDP, R.O. 459 — 26/05/2021). The service does not guarantee specific employment results.',
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
        contact: 'Contact:',
        privacy: 'Privacy Policy'
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
    const limit = formData.tieneCV === 'no' ? 1000 : 500;
    if (words <= limit) { setFormData(prev => ({ ...prev, infoAdicional: text })); setWordCount(words); }
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
        setWordCount(0);
        setReqWordCount(0);
        setAceptaTerminos(false);
        setAceptaLimitaciones(false);
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
  const showInfoSection  = formData.tipoRevision !== 'generica';
  const hasCV = formData.tieneCV === 'si';

  const infoSection    = hasCV ? t[language].form.infoSectionWithCV   : t[language].form.infoSectionNoCV;
  const infoNote       = hasCV ? t[language].form.infoNoteWithCV      : t[language].form.infoNoteNoCV;
  const infoDesc       = hasCV ? t[language].form.infoDescWithCV      : t[language].form.infoDescNoCV;
  const infoBullets    = hasCV ? t[language].form.infoBulletsWithCV   : t[language].form.infoBulletsNoCV;
  const infoPlaceholder = hasCV ? t[language].form.infoPlaceholderWithCV : t[language].form.infoPlaceholderNoCV;

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
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">{t[language].pricing.freeTitle}</div>
            <div className="text-3xl font-bold text-slate-900 mb-3">{t[language].pricing.free}</div>
            <p className="text-sm text-slate-600 flex-1">{t[language].pricing.freeDesc}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">{t[language].pricing.specialized}</div>
            <div className="text-3xl font-bold text-slate-900 mb-3">{t[language].pricing.specializedPrice}</div>
            <ul className="flex-1 space-y-1.5 mb-3">
              {t[language].pricing.specializedItems.map((item, i) => (
                <li key={i} className="text-xs text-slate-600">{item}</li>
              ))}
            </ul>
            <p className="text-xs text-slate-400">{t[language].pricing.specializedNote}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col">
            <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">{t[language].pricing.basic}</div>
            <div className="text-3xl font-bold text-slate-900 mb-3">{t[language].pricing.basicPrice}</div>
            <p className="text-sm text-slate-600 flex-1">{t[language].pricing.basicDesc}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg border-2 border-blue-700 relative overflow-hidden flex flex-col">
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">{t[language].pricing.recommended}</div>
            <div className="text-sm font-semibold text-blue-100 uppercase tracking-wide mb-2">{t[language].pricing.premium}</div>
            <div className="text-3xl font-bold text-white mb-3">{t[language].pricing.premiumPrice}</div>
            <ul className="flex-1 space-y-1.5 mb-3">
              {t[language].pricing.premiumItems.map((item, i) => (
                <li key={i} className="text-xs text-blue-100">{item}</li>
              ))}
            </ul>
            <p className="text-xs text-blue-300">{t[language].pricing.premiumNote}</p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
            <h3 className="text-2xl font-serif font-bold text-white">{t[language].form.title}</h3>
            <p className="text-slate-300 mt-1">{t[language].form.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* S1 — Datos básicos */}
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

            {/* S2 — ¿Tienes CV? */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">{t[language].form.section2}</h4>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="tieneCV" value="si" checked={formData.tieneCV === 'si'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tieneCV: e.target.value, tipoRevision: 'generica', tipoCV: '', infoAdicional: '' }))}
                    className="w-4 h-4 text-blue-600" />
                  <span className="ml-3 text-slate-900 font-medium">{t[language].form.tienesSi}</span>
                </label>
                <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input type="radio" name="tieneCV" value="no" checked={formData.tieneCV === 'no'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tieneCV: e.target.value, tipoRevision: 'basico', tipoCV: '', infoAdicional: '' }))}
                    className="w-4 h-4 text-blue-600" />
                  <span className="ml-3 text-slate-900 font-medium">{t[language].form.tienesNo}</span>
                </label>
              </div>
            </section>

            {/* S3 — Subir CV */}
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

            {/* LinkedIn (Premium) */}
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

            {/* Tipo de revisión */}
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

            {/* Tipo CV */}
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

            {/* Puesto + Requisitos */}
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
                <div className="grid md:grid-cols-2 gap-4 mb-6">
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t[language].form.requisitosLabel}</label>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-amber-800 mb-1">{t[language].form.requisitosNote}</p>
                    <p className="text-xs text-amber-700">{t[language].form.requisitosNoteDesc}</p>
                  </div>
                  <textarea required value={formData.requisitosOferta} onChange={handleRequisitosChange} rows={8}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder={t[language].form.requisitosPlaceholder} />
                  <p className="text-sm text-slate-500 mt-1">{t[language].form.requisitosWordCount || 'Palabras:'} {reqWordCount}</p>
                </div>
              </section>
            )}

            {/* Info adicional / desde cero */}
            {showInfoSection && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' && formData.tipoRevision === 'premium' && formData.tipoCV === 'especifico' ? '9' :
                   formData.tieneCV === 'si' && formData.tipoRevision === 'premium' && formData.tipoCV === 'general'   ? '8' :
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' && formData.tipoCV === 'especifico' ? '8' :
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' && formData.tipoCV === 'general'   ? '7' :
                   formData.tieneCV === 'si' && formData.tipoCV === 'especifico' ? '8' :
                   formData.tieneCV === 'si' && formData.tipoCV === 'general'    ? '7' :
                   formData.tieneCV === 'no' ? '4' :
                   formData.tipoCV === 'especifico' ? '7' : '6'}. {infoSection}
                </h4>
                <div className={`border rounded-lg p-4 mb-4 ${formData.tieneCV === 'no' ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`text-sm font-semibold mb-2 ${formData.tieneCV === 'no' ? 'text-green-800' : 'text-slate-700'}`}>{infoNote}</p>
                  <p className={`text-xs mb-2 ${formData.tieneCV === 'no' ? 'text-green-700' : 'text-slate-600'}`}>{infoDesc}</p>
                  <ul className={`text-sm space-y-1 ml-4 list-disc ${formData.tieneCV === 'no' ? 'text-green-700' : 'text-slate-600'}`}>
                    {infoBullets.map((bullet, i) => (<li key={i}>{bullet}</li>))}
                  </ul>
                </div>
                <textarea value={formData.infoAdicional} onChange={handleInfoChange}
                  rows={formData.tieneCV === 'no' ? 12 : 6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder={infoPlaceholder}
                  required={formData.tieneCV === 'no'} />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-600">{t[language].form.palabras} {wordCount}/{infoWordLimit}</p>
                  {wordCount > infoWordLimit * 0.9 && (
                    <p className="text-sm text-amber-600 font-medium">{infoWordLimit - wordCount} {t[language].form.palabrasRestantes}</p>
                  )}
                </div>
              </section>
            )}

            {/* TÉRMINOS, CHECKBOXES Y SUBMIT */}
            <div className="pt-6 border-t border-slate-200 space-y-4">

              {/* CHECKBOX 1 — Limitaciones del servicio */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={aceptaLimitaciones}
                  onChange={(e) => setAceptaLimitaciones(e.target.checked)}
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0 rounded"
                  required
                />
                <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {t[language].form.checkLimitaciones}
                </span>
              </label>

              {/* CHECKBOX 2 — Privacidad y LOPDP */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0 rounded"
                  required
                />
                <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {language === 'es' ? (
                    <>He leído y acepto la{' '}
                      <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-700 font-medium">
                        {t[language].form.politicaLink}
                      </a>
                      , incluyendo el tratamiento de mis datos personales y su transferencia a servidores internacionales para la prestación del servicio, conforme a la <strong>Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP)</strong>.
                    </>
                  ) : (
                    <>I have read and accept the{' '}
                      <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-700 font-medium">
                        {t[language].form.politicaLink}
                      </a>
                      , including the processing of my personal data and its transfer to international servers for service delivery, in accordance with <strong>Ecuador's Organic Law on Personal Data Protection (LOPDP)</strong>.
                    </>
                  )}
                </span>
              </label>

              {/* MENSAJE ÉXITO / ERROR */}
              {submitStatus && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  submitStatus.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  {submitStatus.type === 'success'
                    ? <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    : <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                  <p className={`text-sm font-medium ${submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                    {submitStatus.message}
                  </p>
                </div>
              )}

              {/* BOTÓN */}
              <button
                type="submit"
                disabled={isSubmitting || !aceptaTerminos || !aceptaLimitaciones}
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

              {/* TEXTO LEGAL PIE */}
              <p className="text-xs text-slate-400 text-center leading-relaxed px-2">
                {t[language].form.legalNote}
              </p>

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
            <p className="mt-2">
              {t[language].footer.contact}{' '}
              <a href="mailto:jrgarcia@nocodia.net" className="text-blue-600 hover:text-blue-700 font-medium">jrgarcia@nocodia.net</a>
              {' · '}
              <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                {t[language].footer.privacy}
              </a>
            </p>
            <p className="mt-2 text-xs text-slate-400">
              {language === 'es'
                ? 'Cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021)'
                : 'Compliant with Ecuador\'s Organic Law on Personal Data Protection (LOPDP, R.O. 459 — 26/05/2021)'}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
