import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tieneCV: 'si',
    tipoRevision: 'generica',
    puesto: '',
    empresa: '',
    industria: '',
    linkOferta: '',
    infoAdicional: '',
    cvFile: null,
    linkedinFile: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, [fileType]: file }));
    }
  };

  const handleInfoChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    
    if (words <= 500) {
      setFormData(prev => ({ ...prev, infoAdicional: text }));
      setWordCount(words);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tieneCV: 'si',
          tipoRevision: 'generica',
          puesto: '',
          empresa: '',
          industria: '',
          linkOferta: '',
          infoAdicional: '',
          cvFile: null,
          linkedinFile: null
        });
        setWordCount(0);
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
    if (formData.tipoRevision === 'generica') return 'GRATIS*';
    if (formData.tipoRevision === 'especializada') return '$12';
    if (formData.tipoRevision === 'basico') return '$15';
    if (formData.tipoRevision === 'premium') return '$20';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Nocodia CV</h1>
              <p className="text-sm text-slate-600 mt-1">Optimizado con Inteligencia Artificial</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-600">Consultas</p>
              <a href="mailto:jrgarcia@nocodia.net" className="text-sm font-medium text-blue-700 hover:text-blue-800">
                jrgarcia@nocodia.net
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
            Tu CV Profesional<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Potenciado por IA
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Análisis automático, optimización ATS, y CVs personalizados para destacar en tu industria
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">Revisión</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">GRATIS*</div>
            <p className="text-sm text-slate-600">Análisis genérico de tu CV actual</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">Especializado</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">$12</div>
            <p className="text-sm text-slate-600">CV reescrito para puesto específico</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-2">Básico</div>
            <div className="text-3xl font-bold text-slate-900 mb-2">$15</div>
            <p className="text-sm text-slate-600">CV nuevo desde formulario</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg border-2 border-blue-700 relative overflow-hidden">
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
              ⭐ RECOMENDADO
            </div>
            <div className="text-sm font-semibold text-blue-100 uppercase tracking-wide mb-2">Premium</div>
            <div className="text-3xl font-bold text-white mb-2">$20</div>
            <p className="text-sm text-blue-100">Con LinkedIn + optimización completa</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
            <h3 className="text-2xl font-serif font-bold text-white">Solicita tu CV</h3>
            <p className="text-slate-300 mt-1">Completa el formulario y recibe tu análisis</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Sección 1: Información Básica */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                1. Información Básica
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+593 99 123 4567"
                  />
                </div>
              </div>
            </section>

            {/* Sección 2: ¿Tienes CV? */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                2. ¿Tienes CV actual?
              </h4>
              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="tieneCV"
                    value="si"
                    checked={formData.tieneCV === 'si'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tieneCV: e.target.value, tipoRevision: 'generica' }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-slate-900 font-medium">Sí, tengo CV para revisar</span>
                </label>
                <label className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
                    type="radio"
                    name="tieneCV"
                    value="no"
                    checked={formData.tieneCV === 'no'}
                    onChange={(e) => setFormData(prev => ({ ...prev, tieneCV: e.target.value, tipoRevision: 'basico' }))}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="ml-3 text-slate-900 font-medium">No, necesito crear uno desde cero</span>
                </label>
              </div>
            </section>

            {/* Sección 3: Upload CV (si tiene CV) */}
            {formData.tieneCV === 'si' && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  3. Sube tu CV actual
                </h4>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-medium hover:text-blue-700">
                      Selecciona tu CV
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'cvFile')}
                      className="hidden"
                      required={formData.tieneCV === 'si'}
                    />
                  </label>
                  <p className="text-sm text-slate-500 mt-2">PDF, máximo 5MB</p>
                  {formData.cvFile && (
                    <p className="text-sm text-green-600 mt-3 font-medium">
                      ✓ {formData.cvFile.name}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Sección 4: Tipo de revisión/creación */}
            <section>
              <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                {formData.tieneCV === 'si' ? '4. Tipo de revisión' : '3. ¿Cómo prefieres crearlo?'}
              </h4>
              
              {formData.tieneCV === 'si' ? (
                <div className="space-y-3">
                  <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="tipoRevision"
                      value="generica"
                      checked={formData.tipoRevision === 'generica'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">Genérica</span>
                        <span className="text-green-600 font-bold text-sm">GRATIS*</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Análisis y recomendaciones generales</p>
                    </div>
                  </label>
                  <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="tipoRevision"
                      value="especializada"
                      checked={formData.tipoRevision === 'especializada'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">Especializada</span>
                        <span className="text-blue-600 font-bold text-sm">$12</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">CV reescrito y optimizado para puesto específico</p>
                    </div>
                  </label>
                  <label className="flex items-start p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <input
                      type="radio"
                      name="tipoRevision"
                      value="premium"
                      checked={formData.tipoRevision === 'premium'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">Premium - Con LinkedIn</span>
                        <span className="text-blue-600 font-bold text-sm">$20</span>
                        <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold">
                          ⭐ RECOMENDADO
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 mt-1">Combina tu CV + LinkedIn para optimización completa</p>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="flex items-start p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input
                      type="radio"
                      name="tipoRevision"
                      value="basico"
                      checked={formData.tipoRevision === 'basico'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">Básico - Manual</span>
                        <span className="text-purple-600 font-bold text-sm">$15</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">Llenas formulario completo con tu información</p>
                    </div>
                  </label>
                  <label className="flex items-start p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <input
                      type="radio"
                      name="tipoRevision"
                      value="premium"
                      checked={formData.tipoRevision === 'premium'}
                      onChange={(e) => setFormData(prev => ({ ...prev, tipoRevision: e.target.value }))}
                      className="w-4 h-4 text-blue-600 mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-900 font-medium">Premium - Con LinkedIn</span>
                        <span className="text-blue-600 font-bold text-sm">$20</span>
                        <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded font-bold">
                          ⭐ RECOMENDADO
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 mt-1">Exporta tu LinkedIn + info adicional</p>
                    </div>
                  </label>
                </div>
              )}
            </section>

            {/* LinkedIn PDF Upload (para premium) */}
            {formData.tipoRevision === 'premium' && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' ? '5' : '4'}. Tu perfil de LinkedIn (PDF)
                </h4>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">📌 Cómo exportar tu LinkedIn a PDF:</p>
                  <ol className="text-sm text-blue-800 space-y-1 ml-4 list-decimal">
                    <li>Ve a tu perfil de LinkedIn</li>
                    <li>Haz clic en "Más" (tres puntos)</li>
                    <li>Selecciona "Guardar en PDF"</li>
                    <li>Descarga el archivo</li>
                  </ol>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-medium hover:text-blue-700">
                      Selecciona LinkedIn.pdf
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => handleFileChange(e, 'linkedinFile')}
                      className="hidden"
                      required={formData.tipoRevision === 'premium'}
                    />
                  </label>
                  <p className="text-sm text-slate-500 mt-2">PDF, máximo 10MB</p>
                  {formData.linkedinFile && (
                    <p className="text-sm text-green-600 mt-3 font-medium">
                      ✓ {formData.linkedinFile.name}
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Información del puesto (para especializada y premium) */}
            {(formData.tipoRevision === 'especializada' || formData.tipoRevision === 'premium') && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' && formData.tipoRevision === 'premium' ? '6' : 
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' ? '5' : 
                   formData.tieneCV === 'si' ? '5' : '4'}. Puesto objetivo
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ¿A qué puesto aplicas? *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.puesto}
                      onChange={(e) => setFormData(prev => ({ ...prev, puesto: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="ej: Gerente de Ventas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Industria/Sector *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.industria}
                      onChange={(e) => setFormData(prev => ({ ...prev, industria: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="ej: Tecnología, Finanzas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Empresa (opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="ej: Nocodia"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Link de la oferta (opcional)
                    </label>
                    <input
                      type="url"
                      value={formData.linkOferta}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkOferta: e.target.value }))}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Información adicional */}
            {(formData.tipoRevision === 'especializada' || formData.tipoRevision === 'premium') && (
              <section>
                <h4 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  {formData.tieneCV === 'si' && formData.tipoRevision === 'premium' ? '7' : 
                   formData.tieneCV === 'no' && formData.tipoRevision === 'premium' ? '6' : 
                   formData.tieneCV === 'si' ? '6' : '5'}. Información adicional
                </h4>
                
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">
                    💡 Agrega lo que NO está en tu {formData.tieneCV === 'si' ? 'CV actual' : 'LinkedIn'} (máx 500 palabras):
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1 ml-4 list-disc">
                    <li>Logros recientes no actualizados</li>
                    <li>Proyectos actuales en desarrollo</li>
                    <li>Resultados cuantificables específicos</li>
                    <li>Habilidades técnicas nuevas</li>
                    <li>Certificaciones en proceso</li>
                  </ul>
                </div>

                <textarea
                  value={formData.infoAdicional}
                  onChange={handleInfoChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Ejemplo: En mi rol actual como Gerente de Ventas aumenté las ventas B2B en 42% durante Q1 2026. Implementé un nuevo CRM que redujo el tiempo de cierre en 30%. Actualmente lidero un equipo de 8 personas..."
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-slate-600">
                    Palabras: {wordCount}/500
                  </p>
                  {wordCount > 450 && (
                    <p className="text-sm text-amber-600 font-medium">
                      {500 - wordCount} palabras restantes
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Submit */}
            <div className="pt-6 border-t border-slate-200">
              {submitStatus && (
                <div className={`mb-4 p-4 rounded-lg flex items-start gap-3 ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {submitStatus.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm font-medium ${
                    submitStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {submitStatus.message}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  `Solicitar análisis - ${getPrice()}`
                )}
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                * Primera revisión genérica gratuita por email. Servicios pagados requieren confirmación de pago.
              </p>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Optimización ATS</h3>
            <p className="text-sm text-slate-600">Keywords y formato para pasar filtros automáticos</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Análisis IA</h3>
            <p className="text-sm text-slate-600">Revisión automática con inteligencia artificial</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Entrega Rápida</h3>
            <p className="text-sm text-slate-600">Revisión genérica inmediata, otros en 24hrs</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-slate-600">
            <p>© 2026 Nocodia CV - Todos los derechos reservados</p>
            <p className="mt-2">
              Consultas: <a href="mailto:jrgarcia@nocodia.net" className="text-blue-600 hover:text-blue-700 font-medium">jrgarcia@nocodia.net</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
