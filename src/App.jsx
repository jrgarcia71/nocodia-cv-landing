import { useState } from 'react'
import './index.css'

function App() {
  const [language, setLanguage] = useState('es')
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tieneCV: '',
    tipoRevision: '',
    tipoCV: '',
    puesto: '',
    empresa: '',
    industria: '',
    linkOferta: '',
    infoAdicional: ''
  })

  const [cvFile, setCvFile] = useState(null)
  const [linkedinFile, setLinkedinFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const t = {
    es: {
      title: '🚀 Nocodia CV',
      subtitle: 'Optimización de CV con Inteligencia Artificial',
      spamWarning: 'IMPORTANTE: Revisa tu carpeta de SPAM después de enviar. Los emails automáticos a veces caen ahí.',
      nombre: 'Nombre completo',
      email: 'Email',
      emailHelper: 'Te enviaremos tu CV optimizado a este email',
      telefono: 'Teléfono (opcional)',
      tieneCV: '¿Tienes CV actual?',
      tieneCVSi: 'Sí, tengo CV',
      tieneCVNo: 'No tengo CV, necesito crearlo',
      tipoRevision: '¿Qué tipo de revisión necesitas?',
      generica: 'Revisión Genérica',
      genericaDesc: 'Análisis general de tu CV con recomendaciones básicas. Una sola vez por persona.',
      especializada: 'CV Especializado',
      especializadaDesc: 'CV optimizado para ATS y reclutadores. Formato profesional con logros cuantificables.',
      premium: 'CV Premium Bilingüe',
      premiumDesc: '🌎 CV + LinkedIn en ESPAÑOL E INGLÉS',
      premiumBullets: '¿Aplicando a multinacionales? ¿Remote work? Este es tu servicio.\n✅ CV optimizado completo (ambos idiomas)\n✅ Perfil LinkedIn mejorado (ambos idiomas)\n✅ Elevator pitch + mensajes de conexión\n✅ Estrategia de posicionamiento internacional',
      premiumHighlight: '💡 El único servicio que entrega CVs nativos profesionales en ambos idiomas. No traducciones automáticas de Google.',
      uploadCV: 'Sube tu CV actual',
      uploadCVLabel: 'Click para seleccionar archivo PDF',
      uploadCVHelper: 'Solo archivos PDF, máximo 10MB',
      tipoBusqueda: '¿Para qué tipo de búsqueda?',
      especifico: 'Puesto específico',
      especificoDesc: 'Tengo una oferta o empresa objetivo clara',
      general: 'Búsqueda general',
      generalDesc: 'Quiero estar preparado para varias oportunidades',
      puesto: '¿A qué puesto aplicarás?',
      empresa: 'Empresa objetivo (opcional)',
      industria: '¿En qué industria?',
      linkOferta: 'Link de la oferta (opcional)',
      industriaGeneral: '¿En qué industria buscas?',
      uploadLinkedIn: 'Sube PDF de tu perfil LinkedIn',
      uploadLinkedInHelper: 'Exporta tu LinkedIn como PDF desde tu perfil',
      infoAdicional: 'Información adicional (logros, certificaciones, contexto)',
      infoAdicionalPlaceholder: 'Ej: Lideré equipo de 15 personas, aumenté ventas en 40%, certificado PMP, etc.',
      infoAdicionalHelper: 'Esta información es CLAVE para generar un CV impactante. Mientras más detalles, mejor.',
      submit: 'Enviar Solicitud',
      submitting: '⏳ Enviando...',
      free: 'GRATIS',
      fileSelected: '✅'
    },
    en: {
      title: '🚀 Nocodia CV',
      subtitle: 'AI-Powered Resume Optimization',
      spamWarning: 'IMPORTANT: Check your SPAM folder after submitting. Automated emails sometimes end up there.',
      nombre: 'Full name',
      email: 'Email',
      emailHelper: "We'll send your optimized resume to this email",
      telefono: 'Phone (optional)',
      tieneCV: 'Do you have a current resume?',
      tieneCVSi: 'Yes, I have a resume',
      tieneCVNo: "No, I need to create one",
      tipoRevision: 'What type of review do you need?',
      generica: 'Generic Review',
      genericaDesc: 'General resume analysis with basic recommendations. One time per person.',
      especializada: 'Specialized Resume',
      especializadaDesc: 'ATS-optimized resume for recruiters. Professional format with quantifiable achievements.',
      premium: 'Bilingual Premium Resume',
      premiumDesc: '🌎 Resume + LinkedIn in SPANISH AND ENGLISH',
      premiumBullets: 'Applying to multinationals? Remote work? This is your service.\n✅ Complete optimized resume (both languages)\n✅ Enhanced LinkedIn profile (both languages)\n✅ Elevator pitch + connection messages\n✅ International positioning strategy',
      premiumHighlight: "💡 The only service delivering native professional resumes in both languages. Not Google's automatic translations.",
      uploadCV: 'Upload your current resume',
      uploadCVLabel: 'Click to select PDF file',
      uploadCVHelper: 'PDF files only, max 10MB',
      tipoBusqueda: 'What type of job search?',
      especifico: 'Specific position',
      especificoDesc: 'I have a clear job offer or target company',
      general: 'General search',
      generalDesc: 'I want to be ready for various opportunities',
      puesto: 'What position are you applying for?',
      empresa: 'Target company (optional)',
      industria: 'What industry?',
      linkOferta: 'Job posting link (optional)',
      industriaGeneral: 'What industry are you targeting?',
      uploadLinkedIn: 'Upload your LinkedIn profile PDF',
      uploadLinkedInHelper: 'Export your LinkedIn as PDF from your profile',
      infoAdicional: 'Additional information (achievements, certifications, context)',
      infoAdicionalPlaceholder: 'Ex: Led team of 15 people, increased sales by 40%, PMP certified, etc.',
      infoAdicionalHelper: 'This information is KEY to generating an impactful resume. The more details, the better.',
      submit: 'Submit Request',
      submitting: '⏳ Submitting...',
      free: 'FREE',
      fileSelected: '✅'
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0]
    if (fileType === 'cv') {
      setCvFile(file)
    } else {
      setLinkedinFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    const submitData = new FormData()
    Object.keys(formData).forEach(key => {
      if (formData[key]) submitData.append(key, formData[key])
    })
    
    submitData.append('formLanguage', language)
    
    if (cvFile) submitData.append('cvFile', cvFile)
    if (linkedinFile) submitData.append('linkedinFile', linkedinFile)

    try {
      const response = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', {
        method: 'POST',
        body: submitData
      })

      const result = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: result.message })
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tieneCV: '',
          tipoRevision: '',
          tipoCV: '',
          puesto: '',
          empresa: '',
          industria: '',
          linkOferta: '',
          infoAdicional: ''
        })
        setCvFile(null)
        setLinkedinFile(null)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setMessage({ type: 'error', text: result.error || 'Error al enviar. Intenta nuevamente.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión. Verifica tu internet e intenta nuevamente.' })
    } finally {
      setLoading(false)
    }
  }

  const shouldShowCVFile = formData.tieneCV === (language === 'es' ? 'si' : 'yes')
  const shouldShowTipoCV = formData.tipoRevision === (language === 'es' ? 'especializada' : 'specialized') || formData.tipoRevision === 'premium'
  const shouldShowPuestoEspecifico = formData.tipoCV === (language === 'es' ? 'especifico' : 'specific')
  const shouldShowIndustriaGeneral = formData.tipoCV === (language === 'es' ? 'general' : 'general')
  const shouldShowLinkedInFile = formData.tipoRevision === 'premium'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 p-5">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with Language Selector */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 text-center relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-1 rounded ${language === 'es' ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 hover:bg-blue-400'}`}
            >
              🇪🇸 ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded ${language === 'en' ? 'bg-white text-blue-600 font-bold' : 'bg-blue-500 hover:bg-blue-400'}`}
            >
              🇬🇧 EN
            </button>
          </div>
          <h1 className="text-4xl font-bold mb-2">{t[language].title}</h1>
          <p className="text-lg opacity-95">{t[language].subtitle}</p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {/* Spam Warning */}
          <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ {t[language].spamWarning.split(':')[0]}:</strong> {t[language].spamWarning.split(':')[1]}
            </p>
          </div>

          {/* Messages */}
          {message.text && (
            <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                {t[language].nombre} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder={language === 'es' ? 'Juan García' : 'John Smith'}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                {t[language].email} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder={language === 'es' ? 'juan@ejemplo.com' : 'john@example.com'}
              />
              <p className="text-sm text-gray-500 mt-1">{t[language].emailHelper}</p>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                {t[language].telefono}
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="+593 99 123 4567"
              />
            </div>

            {/* ¿Tienes CV? */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                {t[language].tieneCV} <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tieneCV"
                    value={language === 'es' ? 'si' : 'yes'}
                    checked={formData.tieneCV === (language === 'es' ? 'si' : 'yes')}
                    onChange={handleInputChange}
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="font-medium">✅ {t[language].tieneCVSi}</span>
                </label>
                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tieneCV"
                    value={language === 'es' ? 'no' : 'no'}
                    checked={formData.tieneCV === 'no'}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="font-medium">❌ {t[language].tieneCVNo}</span>
                </label>
              </div>
            </div>

            {/* Tipo de Revisión */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                {t[language].tipoRevision} <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {/* Genérica */}
                <label className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tipoRevision"
                    value={language === 'es' ? 'generica' : 'generic'}
                    checked={formData.tipoRevision === (language === 'es' ? 'generica' : 'generic')}
                    onChange={handleInputChange}
                    required
                    className="mr-3"
                  />
                  <div className="inline-flex items-center justify-between w-full">
                    <span className="font-semibold">📋 {t[language].generica}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-semibold">{t[language].free}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-6">{t[language].genericaDesc}</p>
                </label>

                {/* Especializada */}
                <label className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tipoRevision"
                    value={language === 'es' ? 'especializada' : 'specialized'}
                    checked={formData.tipoRevision === (language === 'es' ? 'especializada' : 'specialized')}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="inline-flex items-center justify-between w-full">
                    <span className="font-semibold">🎯 {t[language].especializada}</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">$12</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-6">{t[language].especializadaDesc}</p>
                </label>

                {/* Premium */}
                <label className="block p-4 border-2 border-yellow-400 rounded-lg cursor-pointer bg-gradient-to-r from-yellow-50 to-blue-50 hover:shadow-lg transition">
                  <input
                    type="radio"
                    name="tipoRevision"
                    value="premium"
                    checked={formData.tipoRevision === 'premium'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="inline-flex items-center justify-between w-full">
                    <span className="font-semibold">⭐ {t[language].premium}</span>
                    <span className="bg-yellow-500 text-white px-4 py-1 rounded-md text-base font-bold">$20</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mt-2 ml-6">
                    {t[language].premiumDesc}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 ml-6 whitespace-pre-line">
                    {t[language].premiumBullets}
                  </p>
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mt-3 ml-6 rounded">
                    <p className="text-xs text-yellow-900">
                      {t[language].premiumHighlight}
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Subir CV */}
            {shouldShowCVFile && (
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  {t[language].uploadCV} <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'cv')}
                    required={shouldShowCVFile}
                    className="hidden"
                    id="cvFile"
                  />
                  <label htmlFor="cvFile" className="cursor-pointer">
                    {cvFile ? (
                      <p className="text-green-600 font-medium">{t[language].fileSelected} {cvFile.name}</p>
                    ) : (
                      <p className="text-gray-600">📄 {t[language].uploadCVLabel}</p>
                    )}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">{t[language].uploadCVHelper}</p>
              </div>
            )}

            {/* Tipo de CV */}
            {shouldShowTipoCV && (
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <label className="block font-semibold mb-3 text-gray-700">
                  {t[language].tipoBusqueda} <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-start p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition">
                    <input
                      type="radio"
                      name="tipoCV"
                      value={language === 'es' ? 'especifico' : 'specific'}
                      checked={formData.tipoCV === (language === 'es' ? 'especifico' : 'specific')}
                      onChange={handleInputChange}
                      required={shouldShowTipoCV}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <span className="font-medium">🎯 {t[language].especifico}</span>
                      <p className="text-sm text-gray-600 mt-1">{t[language].especificoDesc}</p>
                    </div>
                  </label>
                  <label className="flex items-start p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition">
                    <input
                      type="radio"
                      name="tipoCV"
                      value="general"
                      checked={formData.tipoCV === 'general'}
                      onChange={handleInputChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <span className="font-medium">📄 {t[language].general}</span>
                      <p className="text-sm text-gray-600 mt-1">{t[language].generalDesc}</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Campos Puesto Específico */}
            {shouldShowPuestoEspecifico && (
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 space-y-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    {t[language].puesto} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="puesto"
                    value={formData.puesto}
                    onChange={handleInputChange}
                    required={shouldShowPuestoEspecifico}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'es' ? 'Ej: Product Manager' : 'Ex: Product Manager'}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    {t[language].empresa}
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'es' ? 'Ej: Google, Amazon' : 'Ex: Google, Amazon'}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    {t[language].industria} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="industria"
                    value={formData.industria}
                    onChange={handleInputChange}
                    required={shouldShowPuestoEspecifico}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'es' ? 'Ej: Tecnología, Finanzas, Marketing' : 'Ex: Technology, Finance, Marketing'}
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    {t[language].linkOferta}
                  </label>
                  <input
                    type="url"
                    name="linkOferta"
                    value={formData.linkOferta}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}

            {/* Industria General */}
            {shouldShowIndustriaGeneral && (
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <label className="block font-semibold mb-2 text-gray-700">
                  {t[language].industriaGeneral} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="industria"
                  value={formData.industria}
                  onChange={handleInputChange}
                  required={shouldShowIndustriaGeneral}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder={language === 'es' ? 'Ej: Tecnología, Marketing, Ventas' : 'Ex: Technology, Marketing, Sales'}
                />
              </div>
            )}

            {/* LinkedIn File (Premium) */}
            {shouldShowLinkedInFile && (
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  {t[language].uploadLinkedIn} <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'linkedin')}
                    required={shouldShowLinkedInFile}
                    className="hidden"
                    id="linkedinFile"
                  />
                  <label htmlFor="linkedinFile" className="cursor-pointer">
                    {linkedinFile ? (
                      <p className="text-green-600 font-medium">{t[language].fileSelected} {linkedinFile.name}</p>
                    ) : (
                      <p className="text-gray-600">📄 {t[language].uploadCVLabel}</p>
                    )}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">{t[language].uploadLinkedInHelper}</p>
              </div>
            )}

            {/* Información Adicional */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                {t[language].infoAdicional}
              </label>
              <textarea
                name="infoAdicional"
                value={formData.infoAdicional}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-y"
                placeholder={t[language].infoAdicionalPlaceholder}
              />
              <p className="text-sm text-gray-500 mt-1">{t[language].infoAdicionalHelper}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? t[language].submitting : t[language].submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
