import { useState } from 'react'
import './index.css'

function App() {
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

  const shouldShowCVFile = formData.tieneCV === 'si'
  const shouldShowTipoCV = formData.tipoRevision === 'especializada' || formData.tipoRevision === 'premium'
  const shouldShowPuestoEspecifico = formData.tipoCV === 'especifico'
  const shouldShowIndustriaGeneral = formData.tipoCV === 'general'
  const shouldShowLinkedInFile = formData.tipoRevision === 'premium'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 p-5">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-2">🚀 Nocodia CV</h1>
          <p className="text-lg opacity-95">Optimización de CV con Inteligencia Artificial</p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {/* Spam Warning */}
          <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ IMPORTANTE:</strong> Revisa tu carpeta de SPAM después de enviar. Los emails automáticos a veces caen ahí.
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
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="Juan García"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="juan@ejemplo.com"
              />
              <p className="text-sm text-gray-500 mt-1">Te enviaremos tu CV optimizado a este email</p>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Teléfono (opcional)
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
                ¿Tienes CV actual? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tieneCV"
                    value="si"
                    checked={formData.tieneCV === 'si'}
                    onChange={handleInputChange}
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="font-medium">✅ Sí, tengo CV</span>
                </label>
                <label className="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tieneCV"
                    value="no"
                    checked={formData.tieneCV === 'no'}
                    onChange={handleInputChange}
                    className="mt-1 mr-3"
                  />
                  <span className="font-medium">❌ No tengo CV, necesito crearlo</span>
                </label>
              </div>
            </div>

            {/* Tipo de Revisión */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                ¿Qué tipo de revisión necesitas? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {/* Genérica */}
                <label className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tipoRevision"
                    value="generica"
                    checked={formData.tipoRevision === 'generica'}
                    onChange={handleInputChange}
                    required
                    className="mr-3"
                  />
                  <div className="inline-flex items-center justify-between w-full">
                    <span className="font-semibold">📋 Revisión Genérica</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm font-semibold">GRATIS</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-6">Análisis general de tu CV con recomendaciones básicas. Una sola vez por persona.</p>
                </label>

                {/* Especializada */}
                <label className="block p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="tipoRevision"
                    value="especializada"
                    checked={formData.tipoRevision === 'especializada'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <div className="inline-flex items-center justify-between w-full">
                    <span className="font-semibold">🎯 CV Especializado</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-semibold">$12</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-6">CV optimizado para ATS y reclutadores. Formato profesional con logros cuantificables.</p>
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
                    <span className="font-semibold">⭐ CV Premium Bilingüe</span>
                    <span className="bg-yellow-500 text-white px-4 py-1 rounded-md text-base font-bold">$20</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 mt-2 ml-6">
                    🌎 CV + LinkedIn en ESPAÑOL E INGLÉS
                  </p>
                  <p className="text-sm text-gray-600 mt-1 ml-6">
                    ¿Aplicando a multinacionales? ¿Remote work? Este es tu servicio.<br/>
                    ✅ CV optimizado completo (ambos idiomas)<br/>
                    ✅ Perfil LinkedIn mejorado (ambos idiomas)<br/>
                    ✅ Elevator pitch + mensajes de conexión<br/>
                    ✅ Estrategia de posicionamiento internacional
                  </p>
                  <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mt-3 ml-6 rounded">
                    <p className="text-xs text-yellow-900">
                      💡 <strong>El único servicio que entrega CVs nativos profesionales en ambos idiomas.</strong> No traducciones automáticas de Google.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Subir CV */}
            {shouldShowCVFile && (
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Sube tu CV actual <span className="text-red-500">*</span>
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
                      <p className="text-green-600 font-medium">✅ {cvFile.name}</p>
                    ) : (
                      <p className="text-gray-600">📄 Click para seleccionar archivo PDF</p>
                    )}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">Solo archivos PDF, máximo 10MB</p>
              </div>
            )}

            {/* Tipo de CV */}
            {shouldShowTipoCV && (
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                <label className="block font-semibold mb-3 text-gray-700">
                  ¿Para qué tipo de búsqueda? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <label className="flex items-start p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition">
                    <input
                      type="radio"
                      name="tipoCV"
                      value="especifico"
                      checked={formData.tipoCV === 'especifico'}
                      onChange={handleInputChange}
                      required={shouldShowTipoCV}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <span className="font-medium">🎯 Puesto específico</span>
                      <p className="text-sm text-gray-600 mt-1">Tengo una oferta o empresa objetivo clara</p>
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
                      <span className="font-medium">📄 Búsqueda general</span>
                      <p className="text-sm text-gray-600 mt-1">Quiero estar preparado para varias oportunidades</p>
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
                    ¿A qué puesto aplicarás? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="puesto"
                    value={formData.puesto}
                    onChange={handleInputChange}
                    required={shouldShowPuestoEspecifico}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Ej: Product Manager"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    Empresa objetivo (opcional)
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Ej: Google, Amazon"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    ¿En qué industria? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="industria"
                    value={formData.industria}
                    onChange={handleInputChange}
                    required={shouldShowPuestoEspecifico}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Ej: Tecnología, Finanzas, Marketing"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    Link de la oferta (opcional)
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
                  ¿En qué industria buscas? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="industria"
                  value={formData.industria}
                  onChange={handleInputChange}
                  required={shouldShowIndustriaGeneral}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Ej: Tecnología, Marketing, Ventas"
                />
              </div>
            )}

            {/* LinkedIn File (Premium) */}
            {shouldShowLinkedInFile && (
              <div>
                <label className="block font-semibold mb-2 text-gray-700">
                  Sube PDF de tu perfil LinkedIn <span className="text-red-500">*</span>
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
                      <p className="text-green-600 font-medium">✅ {linkedinFile.name}</p>
                    ) : (
                      <p className="text-gray-600">📄 Click para seleccionar archivo PDF</p>
                    )}
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1">Exporta tu LinkedIn como PDF desde tu perfil</p>
              </div>
            )}

            {/* Información Adicional */}
            <div>
              <label className="block font-semibold mb-2 text-gray-700">
                Información adicional (logros, certificaciones, contexto)
              </label>
              <textarea
                name="infoAdicional"
                value={formData.infoAdicional}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-y"
                placeholder="Ej: Lideré equipo de 15 personas, aumenté ventas en 40%, certificado PMP, etc."
              />
              <p className="text-sm text-gray-500 mt-1">Esta información es CLAVE para generar un CV impactante. Mientras más detalles, mejor.</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? '⏳ Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
