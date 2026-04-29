import { useState } from 'react'

export default function CVForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tieneCV: '',
    tipoRevision: '',
    puesto: '',
    empresa: '',
    industria: '',
    linkOferta: '',
    infoAdicional: '',
  })

  const [cvFile, setCvFile] = useState(null)
  const [linkedinFile, setLinkedinFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    if (e.target.name === 'cvFile') {
      setCvFile(e.target.files[0])
    } else if (e.target.name === 'linkedinFile') {
      setLinkedinFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const data = new FormData()
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key])
    })
    if (cvFile) data.append('cvFile', cvFile)
    if (linkedinFile) data.append('linkedinFile', linkedinFile)

    try {
      const res = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', {
        method: 'POST',
        body: data,
      })
      const result = await res.json()
      setMessage(result.message || result.error || 'Solicitud procesada')
      if (res.ok) {
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tieneCV: '',
          tipoRevision: '',
          puesto: '',
          empresa: '',
          industria: '',
          linkOferta: '',
          infoAdicional: '',
        })
        setCvFile(null)
        setLinkedinFile(null)
      }
    } catch (err) {
      setMessage('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  const showPuestoFields = formData.tipoRevision && formData.tipoRevision !== 'basico'
  const showCVUpload = formData.tieneCV === 'si'
  const showLinkedInUpload = formData.tipoRevision === 'premium'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Nocodia CV</h1>
          <p className="text-xl text-blue-100">Tu CV Profesional con IA</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Juan García"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0999999999"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">¿Tienes un CV actual? *</label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tieneCV"
                    value="si"
                    checked={formData.tieneCV === 'si'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Sí</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tieneCV"
                    value="no"
                    checked={formData.tieneCV === 'no'}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>

            {formData.tieneCV && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de revisión *</label>
                <select
                  name="tipoRevision"
                  value={formData.tipoRevision}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una opción</option>
                  {formData.tieneCV === 'si' ? (
                    <>
                      <option value="generica">Genérica - GRATIS (primera vez)</option>
                      <option value="especializada">Especializada para puesto - $12</option>
                      <option value="premium">Premium con LinkedIn - $20</option>
                    </>
                  ) : (
                    <>
                      <option value="basico">CV Básico desde cero - $15</option>
                      <option value="premium">Premium con LinkedIn - $20</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {showCVUpload && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sube tu CV actual (PDF) *</label>
                <input
                  type="file"
                  name="cvFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {showLinkedInUpload && (
              <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-300">
                <label className="block text-lg font-bold text-purple-900 mb-3">📄 Sube tu Perfil de LinkedIn (PDF) *</label>
                <div className="bg-white p-4 rounded mb-4 text-sm text-gray-700">
                  <p className="font-semibold mb-2">Cómo descargar:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Abre LinkedIn en navegador</li>
                    <li>Ve a tu perfil</li>
                    <li>Click "Más" (3 puntos)</li>
                    <li>"Guardar en PDF"</li>
                  </ol>
                </div>
                <input
                  type="file"
                  name="linkedinFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            {showPuestoFields && (
              <div className="bg-blue-50 p-6 rounded-lg space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Información del Puesto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Puesto objetivo *</label>
                    <input
                      type="text"
                      name="puesto"
                      value={formData.puesto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Gerente de Ventas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industria *</label>
                    <input
                      type="text"
                      name="industria"
                      value={formData.industria}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Tecnología"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Empresa (opcional)</label>
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link oferta (opcional)</label>
                  <input
                    type="url"
                    name="linkOferta"
                    value={formData.linkOferta}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logros destacados</label>
                  <textarea
                    name="infoAdicional"
                    value={formData.infoAdicional}
                    onChange={handleChange}
                    maxLength="500"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Incrementé ventas 40%, lideré equipo de 15 personas..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.infoAdicional.length}/500</p>
                </div>
              </div>
            )}

            {message && (
              <div className={`p-4 rounded-lg ${message.includes('✅') || message.includes('éxito') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Solicitar análisis'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Dudas? <a href="mailto:jrgarcia@nocodia.net" className="text-blue-600 hover:underline">jrgarcia@nocodia.net</a>
          </p>
        </div>
      </div>
    </div>
  )
}
