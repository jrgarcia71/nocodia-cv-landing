import { useState } from 'react';
import './App.css';

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
    cvFile: null,
    linkedinFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const data = new FormData();
      data.append('nombre', formData.nombre);
      data.append('email', formData.email);
      data.append('telefono', formData.telefono);
      data.append('tieneCV', formData.tieneCV);
      data.append('tipoRevision', formData.tipoRevision);
      data.append('puesto', formData.puesto);
      data.append('empresa', formData.empresa);
      data.append('industria', formData.industria);
      data.append('linkOferta', formData.linkOferta);
      data.append('infoAdicional', formData.infoAdicional);
      
      if (formData.cvFile) {
        data.append('cvFile', formData.cvFile);
      }
      
      if (formData.linkedinFile) {
        data.append('linkedinFile', formData.linkedinFile);
      }

      const response = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message || '✅ Solicitud enviada exitosamente');
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
          cvFile: null,
          linkedinFile: null,
        });
        document.getElementById('cvFile').value = '';
        const linkedinInput = document.getElementById('linkedinFile');
        if (linkedinInput) linkedinInput.value = '';
      } else {
        setMessage(result.error || 'Error al enviar la solicitud');
      }
    } catch (error) {
      setMessage('Error de conexión. Intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const showPuestoFields = formData.tipoRevision && formData.tipoRevision !== 'basico';
  const showCVUpload = formData.tieneCV === 'si';
  const showLinkedInUpload = formData.tipoRevision === 'premium';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Nocodia CV</h1>
          <p className="text-gray-600">Tu CV Profesional con IA</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">Información Personal</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Juan García"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0999999999"
              />
            </div>
          </div>

          {/* ¿Tienes CV? */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Tienes un CV actual? *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tieneCV"
                  value="si"
                  checked={formData.tieneCV === 'si'}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                Sí
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tieneCV"
                  value="no"
                  checked={formData.tieneCV === 'no'}
                  onChange={handleInputChange}
                  required
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>

          {/* Tipo de Revisión */}
          {formData.tieneCV && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de revisión *
              </label>
              <select
                name="tipoRevision"
                value={formData.tipoRevision}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una opción</option>
                {formData.tieneCV === 'si' && (
                  <>
                    <option value="generica">Genérica - GRATIS (primera vez)</option>
                    <option value="especializada">Especializada para puesto - $12</option>
                    <option value="premium">Premium con LinkedIn - $20</option>
                  </>
                )}
                {formData.tieneCV === 'no' && (
                  <>
                    <option value="basico">CV Básico desde cero - $15</option>
                    <option value="premium">Premium con LinkedIn - $20</option>
                  </>
                )}
              </select>
            </div>
          )}

          {/* Subir CV */}
          {showCVUpload && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sube tu CV actual (PDF) *
              </label>
              <input
                type="file"
                id="cvFile"
                name="cvFile"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Subir LinkedIn - NUEVO */}
          {showLinkedInUpload && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <label className="block text-sm font-medium text-purple-900 mb-1">
                Sube tu LinkedIn PDF *
              </label>
              <p className="text-xs text-purple-700 mb-2">
                Descarga tu perfil de LinkedIn como PDF desde: Perfil → Más → Guardar en PDF
              </p>
              <input
                type="file"
                id="linkedinFile"
                name="linkedinFile"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              />
            </div>
          )}

          {/* Información del Puesto */}
          {showPuestoFields && (
            <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">Información del Puesto</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Puesto objetivo *
                </label>
                <input
                  type="text"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Gerente de Ventas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industria *
                </label>
                <input
                  type="text"
                  name="industria"
                  value={formData.industria}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Tecnología, Salud, Finanzas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Google, Amazon"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link de la oferta (opcional)
                </label>
                <input
                  type="url"
                  name="linkOferta"
                  value={formData.linkOferta}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logros destacados o información adicional
                </label>
                <textarea
                  name="infoAdicional"
                  value={formData.infoAdicional}
                  onChange={handleInputChange}
                  rows="4"
                  maxLength="500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Incrementé ventas 40%, lideré equipo de 15 personas..."
                />
                <p className="text-xs text-gray-500 mt-1">{formData.infoAdicional.length}/500 caracteres</p>
              </div>
            </div>
          )}

          {/* Mensaje de respuesta */}
          {message && (
            <div className={`p-4 rounded-lg ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar análisis'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>¿Dudas? Contacta a <a href="mailto:jrgarcia@nocodia.net" className="text-blue-600 hover:underline">jrgarcia@nocodia.net</a></p>
        </div>
      </div>
    </div>
  );
}

export default App;
