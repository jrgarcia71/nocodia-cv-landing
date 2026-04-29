import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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
      setMessage('Error al conectar')
    } finally {
      setLoading(false)
    }
  }

  const showPuestoFields = formData.tipoRevision && formData.tipoRevision !== 'basico'
  const showCVUpload = formData.tieneCV === 'si'
  const showLinkedInUpload = formData.tipoRevision === 'premium'

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Nocodia CV</h1>
      
      <form onSubmit={handleSubmit} className="card">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
        
        <div>
          <label><input type="radio" name="tieneCV" value="si" checked={formData.tieneCV==='si'} onChange={handleChange} required /> Sí tengo CV</label>
          <label><input type="radio" name="tieneCV" value="no" checked={formData.tieneCV==='no'} onChange={handleChange} required /> No tengo CV</label>
        </div>

        {formData.tieneCV && (
          <select name="tipoRevision" value={formData.tipoRevision} onChange={handleChange} required>
            <option value="">Tipo de revisión</option>
            {formData.tieneCV==='si' ? (
              <>
                <option value="generica">Genérica GRATIS</option>
                <option value="especializada">Especializada $12</option>
                <option value="premium">Premium $20</option>
              </>
            ) : (
              <>
                <option value="basico">Básico $15</option>
                <option value="premium">Premium $20</option>
              </>
            )}
          </select>
        )}

        {showCVUpload && <input type="file" name="cvFile" accept=".pdf" onChange={handleFileChange} required />}
        
        {showLinkedInUpload && (
          <div style={{background:'#f0f0ff',padding:'10px',borderRadius:'5px'}}>
            <p><strong>LinkedIn PDF</strong></p>
            <small>Ve a tu perfil → Más → Guardar en PDF</small>
            <input type="file" name="linkedinFile" accept=".pdf" onChange={handleFileChange} required />
          </div>
        )}

        {showPuestoFields && (
          <>
            <input type="text" name="puesto" placeholder="Puesto" value={formData.puesto} onChange={handleChange} required />
            <input type="text" name="industria" placeholder="Industria" value={formData.industria} onChange={handleChange} required />
            <input type="text" name="empresa" placeholder="Empresa (opcional)" value={formData.empresa} onChange={handleChange} />
            <input type="url" name="linkOferta" placeholder="Link oferta (opcional)" value={formData.linkOferta} onChange={handleChange} />
            <textarea name="infoAdicional" placeholder="Logros destacados" value={formData.infoAdicional} onChange={handleChange} maxLength="500" rows="3" />
          </>
        )}

        {message && <p style={{color:message.includes('✅')?'green':'red'}}>{message}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
      </form>

      <p className="read-the-docs">Contacto: jrgarcia@nocodia.net</p>
    </>
  )
}

export default App
