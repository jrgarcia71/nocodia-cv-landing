import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowDown } from 'lucide-react';

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f9fafb; color: #111827; }
    .serif { font-family: 'DM Serif Display', serif; }
    input, textarea, select, button { font-family: inherit; }
    input:focus, textarea:focus { outline: 2px solid #2563eb; outline-offset: 0; border-color: #2563eb !important; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes dash72 { from { stroke-dashoffset: 264; } to { stroke-dashoffset: 74; } }

    .fade-up { animation: fadeUp .5s ease both; }
    .d1{animation-delay:.1s;}.d2{animation-delay:.2s;}.d3{animation-delay:.3s;}

    .upload-label {
      display: block;
      border: 2px dashed #d1d5db;
      border-radius: 12px;
      padding: 22px 16px;
      text-align: center;
      cursor: pointer;
      background: #f9fafb;
      transition: all .2s;
      width: 100%;
    }
    .upload-label:hover { border-color: #2563eb; background: #eff6ff; }
    .upload-label.done { border-color: #10b981; background: #f0fdf4; }

    .plan-card { background: white; border: 2px solid #e5e7eb; border-radius: 20px; padding: 28px; transition: all .2s; cursor: pointer; }
    .plan-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.1); }
    .plan-card.selected { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,.12); }

    .btn-primary { background: linear-gradient(135deg,#1d4ed8,#4f46e5); color: white; border: none; border-radius: 12px; padding: 15px 24px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all .2s; width: 100%; display: block; }
    .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,99,235,.35); }
    .btn-primary:disabled { opacity: .5; cursor: not-allowed; }

    .score-arc { animation: dash72 1.2s ease .3s both; }

    @media (max-width: 860px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .plans-grid { grid-template-columns: 1fr !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
    }

    @media (max-width: 560px) {
      .mobile-two-cols { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

const EmailMockup = ({ lang }) => {
  const es = lang === 'es';

  return (
    <div style={{ background:'white', borderRadius:16, boxShadow:'0 20px 56px rgba(0,0,0,.18)', overflow:'hidden', border:'1px solid #e5e7eb' }}>
      <div style={{ background:'#f3f4f6', padding:'10px 14px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ width:10, height:10, borderRadius:'50%', background:'#ef4444' }}/>
        <div style={{ width:10, height:10, borderRadius:'50%', background:'#f59e0b' }}/>
        <div style={{ width:10, height:10, borderRadius:'50%', background:'#10b981' }}/>
        <span style={{ fontSize:11, color:'#9ca3af', marginLeft:6 }}>
          ✅ {es?'Tu Análisis de CV — Nocodia IA':'Your Resume Analysis — Nocodia AI'}
        </span>
      </div>

      <div style={{ padding:'22px 22px 18px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16, paddingBottom:12, borderBottom:'1px solid #f3f4f6' }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background:'#2563eb' }}/>
          <span style={{ fontSize:12, fontWeight:700, color:'#2563eb' }}>Nocodia CV</span>
          <span style={{ fontSize:11, color:'#9ca3af' }}>
            · {es?'Ejemplo ilustrativo':'Illustrative example'}
          </span>
        </div>

        <div style={{ fontSize:12, fontWeight:700, color:'#374151', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>
          📊 {es?'Evaluación General':'Overall Assessment'}
        </div>

        <p style={{ fontSize:13, color:'#4b5563', lineHeight:1.6, marginBottom:14 }}>
          {es
            ? 'CV con buena base profesional. Se detectaron áreas de mejora que podrían reducir su visibilidad frente a filtros ATS y reclutadores.'
            : 'Resume with a solid professional base. Improvement areas were detected that may reduce visibility with ATS filters and recruiters.'}
        </p>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#111827', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:7 }}>
            💪 {es?'Puntos fuertes':'Strengths'}
          </div>
          {[
            es?'Experiencia profesional relevante para el cargo objetivo':'Relevant professional experience for the target role',
            es?'Trayectoria con responsabilidades claras y potencial de mejora en comunicación':'Career path with clear responsibilities and communication improvement potential',
          ].map((txt,i) => (
            <div key={i} style={{ display:'flex', gap:7, marginBottom:5 }}>
              <span style={{ color:'#10b981', fontSize:12, flexShrink:0, marginTop:1 }}>✓</span>
              <span style={{ fontSize:12, color:'#374151' }}>{txt}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#111827', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:7 }}>
            ⚠️ {es?'Errores críticos':'Critical issues'}
          </div>
          {[
            es?'Perfil profesional genérico — no comunica con fuerza la propuesta de valor':'Generic professional profile — does not strongly communicate the value proposition',
            es?'Faltan keywords ATS relevantes para el tipo de vacante':'Missing ATS keywords relevant to the target role',
          ].map((txt,i) => (
            <div key={i} style={{ display:'flex', gap:7, marginBottom:5 }}>
              <span style={{ color:'#ef4444', fontSize:12, flexShrink:0, marginTop:1 }}>✕</span>
              <span style={{ fontSize:12, color:'#374151' }}>{txt}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:11, fontWeight:700, color:'#111827', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:7 }}>
            🎯 {es?'Puntuación ATS':'ATS Score'}
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center', background:'#f8fafc', borderRadius:8, padding:'10px 12px' }}>
            <div style={{ position:'relative', width:48, height:48, flexShrink:0 }}>
              <svg viewBox="0 0 100 100" style={{ transform:'rotate(-90deg)', width:48, height:48 }}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                <circle className="score-arc" cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round" strokeDasharray="264 264"/>
              </svg>
              <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:14, fontWeight:800, color:'#111827', lineHeight:1 }}>72</span>
                <span style={{ fontSize:8, color:'#9ca3af' }}>/100</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'#059669' }}>72/100 — {es?'Competitivo':'Competitive'}</div>
              <div style={{ fontSize:11, color:'#6b7280', marginTop:2 }}>{es?'3 mejoras críticas pendientes':'3 critical improvements pending'}</div>
            </div>
          </div>
        </div>

        <div style={{ background:'linear-gradient(135deg,#eff6ff,#eef2ff)', borderRadius:10, padding:'11px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:12, color:'#1e40af', fontWeight:600 }}>
            {es?'¿Quieres el CV completamente optimizado?':'Want the fully optimized resume?'}
          </span>
          <span style={{ fontSize:13, fontWeight:800, color:'#2563eb', whiteSpace:'nowrap', marginLeft:8 }}>$12 →</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('es');
  const plansRef = useRef(null);
  const paidRef  = useRef(null);

  const [free, setFree] = useState({ nombre:'', email:'', cvFile:null });
  const [freeStatus, setFreeStatus]   = useState(null);
  const [freeSending, setFreeSending] = useState(false);
  const [freeLimits, setFreeLimits]   = useState(false);
  const [freeTerms, setFreeTerms]     = useState(false);

  const [plan, setPlan] = useState(null);
  const [paid, setPaid] = useState({
    nombre:'', email:'', telefono:'', tieneCV:'si', tipoRevision:'',
    tipoCV:'', puesto:'', empresa:'', industria:'', linkOferta:'',
    requisitosOferta:'', infoAdicional:'', cvFile:null, linkedinFile:null
  });
  const [paidStatus, setPaidStatus]   = useState(null);
  const [paidSending, setPaidSending] = useState(false);
  const [paidLimits, setPaidLimits]   = useState(false);
  const [paidTerms, setPaidTerms]     = useState(false);
  const [infoWords, setInfoWords] = useState(0);
  const [reqWords,  setReqWords]  = useState(0);

  const es = lang === 'es';

  const submitFree = async e => {
    e.preventDefault();
    setFreeSending(true); setFreeStatus(null);
    try {
      const fd = new FormData();
      fd.append('nombre', free.nombre);
      fd.append('email',  free.email);
      if (free.cvFile) fd.append('cvFile', free.cvFile);
      fd.append('tieneCV', 'si');
      fd.append('tipoRevision', 'generica');
      fd.append('formLanguage', lang);
      const r = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', { method:'POST', body:fd });
      const j = await r.json();
      setFreeStatus(r.ok ? { ok:true, msg:j.message } : { ok:false, msg:j.error });
      if (r.ok) { setFree({ nombre:'', email:'', cvFile:null }); setFreeLimits(false); setFreeTerms(false); }
    } catch { setFreeStatus({ ok:false, msg:'Error de conexión.' }); }
    finally { setFreeSending(false); }
  };

  const submitPaid = async e => {
    e.preventDefault();
    setPaidSending(true); setPaidStatus(null);
    try {
      const fd = new FormData();
      Object.keys(paid).forEach(k => { if (paid[k]) fd.append(k, paid[k]); });
      fd.append('formLanguage', lang);
      const r = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', { method:'POST', body:fd });
      const j = await r.json();
      setPaidStatus(r.ok ? { ok:true, msg:j.message } : { ok:false, msg:j.error });
      if (r.ok) {
        setPaid({ nombre:'', email:'', telefono:'', tieneCV:'si', tipoRevision:plan, tipoCV:'', puesto:'', empresa:'', industria:'', linkOferta:'', requisitosOferta:'', infoAdicional:'', cvFile:null, linkedinFile:null });
        setInfoWords(0); setReqWords(0); setPaidLimits(false); setPaidTerms(false);
      }
    } catch { setPaidStatus({ ok:false, msg:'Error de conexión.' }); }
    finally { setPaidSending(false); }
  };

  const choosePlan = id => {
    setPlan(id);
    setPaid(p => ({ ...p, tipoRevision:id, tipoCV:'', cvFile:null, linkedinFile:null }));
    setPaidStatus(null);
    setTimeout(() => paidRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 80);
  };

  const onInfo = e => {
    const txt = e.target.value;
    const limit = paid.tieneCV === 'no' ? 1000 : 500;
    const w = txt.trim().split(/\s+/).filter(Boolean).length;
    if (w <= limit) { setPaid(p => ({ ...p, infoAdicional:txt })); setInfoWords(w); }
  };

  const onReq = e => {
    const txt = e.target.value;
    setPaid(p => ({ ...p, requisitosOferta:txt }));
    setReqWords(txt.trim().split(/\s+/).filter(Boolean).length);
  };

  const plans = [
    {
      id:'especializada',
      price:'$12',
      badge:null,
      color:'#4f46e5',
      title: es?'Especializada':'Specialized',
      headline: es?'CV adaptado a una vacante real':'Resume tailored to a real job posting',
      items: es
        ?['CV reescrito y optimizado ATS','Análisis de compatibilidad con la oferta','Carta de presentación personalizada','Keywords ATS integradas','Tips de optimización LinkedIn']
        :['Rewritten ATS-optimized resume','Compatibility analysis with the job','Personalized cover letter','ATS keywords integrated','LinkedIn optimization tips'],
    },
    {
      id:'basico',
      price:'$15',
      badge:null,
      color:'#7c3aed',
      title: es?'Básico':'Basic',
      headline: es?'Para quien no tiene un CV profesional':'For those without a professional resume',
      items: es
        ?['CV creado desde cero','Redacción profesional con tu experiencia','Formato limpio y ATS friendly','Listo para postular']
        :['Resume created from scratch','Professional writing based on your experience','Clean ATS-friendly format','Ready to apply'],
    },
    {
      id:'premium',
      price:'$20',
      badge: es?'⭐ RECOMENDADO':'⭐ RECOMMENDED',
      color:'#2563eb',
      title:'Premium',
      headline: es?'Postulación bilingüe completa':'Complete bilingual application',
      items: es
        ?['Todo lo de Especializada','CV en Español + Inglés','Carta en Español + Inglés','LinkedIn PDF analizado','Headline + About LinkedIn ES & EN']
        :['Everything in Specialized','Resume in Spanish + English','Cover letter in Spanish + English','LinkedIn PDF analyzed','Headline + About LinkedIn ES & EN'],
    },
  ];

  const isPremium = paid.tipoRevision === 'premium';
  const isBasico  = paid.tipoRevision === 'basico';
  const showTipoCV = ['especializada','premium'].includes(paid.tipoRevision);
  const showPuesto = paid.tipoCV === 'especifico';
  const planLabels = { especializada: es?'Especializada $12':'Specialized $12', basico: es?'Básico $15':'Basic $15', premium:'Premium $20' };

  const fldStyle = { width:'100%', padding:'11px 14px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, background:'white', boxSizing:'border-box' };
  const lblStyle = { display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:5 };

  const Checks = ({ limits, setLimits, terms, setTerms }) => (
    <div style={{ display:'flex', flexDirection:'column', gap:8, paddingTop:12, borderTop:'1px solid #f3f4f6' }}>
      <label style={{ display:'flex', gap:8, cursor:'pointer', alignItems:'flex-start' }}>
        <input type="checkbox" required checked={limits} onChange={e => setLimits(e.target.checked)} style={{ marginTop:2, flexShrink:0 }} />
        <span style={{ fontSize:11, color:'#6b7280', lineHeight:1.5 }}>
          {es
            ?'Entiendo que Nocodia CV optimiza documentos y no garantiza entrevistas ni resultados laborales.'
            :'I understand Nocodia CV optimizes documents and does not guarantee interviews or employment results.'}
        </span>
      </label>
      <label style={{ display:'flex', gap:8, cursor:'pointer', alignItems:'flex-start' }}>
        <input type="checkbox" required checked={terms} onChange={e => setTerms(e.target.checked)} style={{ marginTop:2, flexShrink:0 }} />
        <span style={{ fontSize:11, color:'#6b7280', lineHeight:1.5 }}>
          {es?'Acepto la ':'I accept the '}
          <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ color:'#2563eb' }}>
            {es?'Política de Privacidad':'Privacy Policy'}
          </a>
          {es?' y el tratamiento de mis datos conforme a la LOPDP Ecuador.':' and the processing of my data in accordance with Ecuador\'s LOPDP.'}
        </span>
      </label>
    </div>
  );

  const StatusBox = ({ s }) => !s ? null : (
    <div style={{ padding:'11px 14px', borderRadius:10, background:s.ok?'#f0fdf4':'#fef2f2', border:`1px solid ${s.ok?'#bbf7d0':'#fecaca'}`, fontSize:13, color:s.ok?'#065f46':'#991b1b', display:'flex', gap:8, alignItems:'flex-start' }}>
      {s.ok ? <CheckCircle size={14} style={{ flexShrink:0, marginTop:1 }}/> : <AlertCircle size={14} style={{ flexShrink:0, marginTop:1 }}/>}
      {s.msg}
    </div>
  );

  const UploadBox = ({ label, fileKey, required=true, purple=false }) => {
    const hasFile = !!paid[fileKey];
    return (
      <div>
        <label style={{ ...lblStyle, color: purple?'#6d28d9':'#6b7280' }}>{label}</label>
        <label className={`upload-label${hasFile?' done':''}`}
          style={{ borderColor: hasFile?'#10b981': purple?'#c4b5fd':'#d1d5db', background: hasFile?'#f0fdf4': purple?'#faf5ff':'#f9fafb' }}>
          <Upload size={18} color={hasFile?'#10b981':purple?'#8b5cf6':'#9ca3af'} style={{ margin:'0 auto 6px', display:'block' }}/>
          <div style={{ fontSize:13, fontWeight:600, color: hasFile?'#059669':purple?'#7c3aed':'#2563eb' }}>
            {hasFile ? `✓ ${paid[fileKey].name}` : (es?'Haz click o arrastra aquí':'Click or drag here')}
          </div>
          <div style={{ fontSize:11, color:'#9ca3af', marginTop:2 }}>PDF · {es?'Máx 5MB':'Max 5MB'}</div>
          <input required={required} type="file" accept=".pdf" style={{ display:'none' }}
            onChange={e => { if (e.target.files[0]) setPaid(p => ({ ...p, [fileKey]: e.target.files[0] })); }}/>
        </label>
      </div>
    );
  };

  return (
    <>
      <FontLink/>

      <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', borderBottom:'1px solid #f3f4f6' }}>
        <div style={{ maxWidth:1080, margin:'0 auto', padding:'0 20px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span className="serif" style={{ fontSize:18, color:'#111827', letterSpacing:'-0.02em' }}>Nocodia CV</span>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex', gap:4 }}>
              {['es','en'].map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding:'4px 10px', borderRadius:6, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'inherit', background:lang===l?'#2563eb':'#f3f4f6', color:lang===l?'white':'#6b7280', transition:'all .15s' }}>
                  {l==='es'?'🇪🇸 ES':'🇬🇧 EN'}
                </button>
              ))}
            </div>
            <a href="mailto:jrgarcia@nocodia.net" style={{ fontSize:12, color:'#6b7280', textDecoration:'none' }}>jrgarcia@nocodia.net</a>
          </div>
        </div>
      </header>

      <section style={{ background:'linear-gradient(160deg,#0f172a 0%,#1e3a5f 55%,#0f172a 100%)', padding:'60px 20px 72px' }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:44 }}>
            <div className="fade-up" style={{ display:'inline-block', background:'rgba(59,130,246,0.15)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:20, padding:'5px 14px', fontSize:11, fontWeight:700, color:'#93c5fd', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:18 }}>
              IA · {es?'Análisis profesional':'Professional analysis'}
            </div>

            <h1 className="serif fade-up d1" style={{ fontSize:'clamp(30px,4.5vw,50px)', color:'white', margin:'0 0 14px', lineHeight:1.1, letterSpacing:'-0.03em' }}>
              {es
                ? <>{`¿Tu CV está siendo `}<span style={{ color:'#60a5fa' }}>ignorado?</span></>
                : <>{'Is your resume being '}<span style={{ color:'#60a5fa' }}>ignored?</span></>}
            </h1>

            <p className="fade-up d2" style={{ fontSize:15, color:'rgba(255,255,255,0.62)', maxWidth:440, margin:'0 auto 20px', lineHeight:1.7 }}>
              {es
                ?'Analízalo gratis con IA — recibe un diagnóstico profesional directo a tu email en minutos.'
                :'Analyze it free with AI — receive a professional diagnosis in your email in minutes.'}
            </p>

            <div className="fade-up d3" style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:'10px 24px' }}>
              {(es
                ?['Errores ATS que te dejan fuera','Keywords faltantes','Compatibilidad con vacantes','Acciones concretas de mejora']
                :['ATS errors keeping you out','Missing keywords','Job compatibility analysis','Concrete improvement actions']
              ).map((b,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:7, fontSize:13, color:'rgba(255,255,255,0.72)' }}>
                  <span style={{ width:17, height:17, borderRadius:'50%', background:'rgba(16,185,129,0.2)', border:'1px solid rgba(16,185,129,0.45)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, flexShrink:0 }}>✓</span>
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-grid fade-up d3" style={{ display:'grid', gridTemplateColumns:'1.05fr 1fr', gap:28, alignItems:'start' }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>
                👇 {es?'Así se ve el resultado que recibes':'This is what the result looks like'}
              </div>
              <EmailMockup lang={lang}/>
            </div>

            <div>
              <form onSubmit={submitFree} style={{ background:'white', borderRadius:20, padding:28, boxShadow:'0 20px 48px rgba(0,0,0,.28)' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>
                  {es?'Gratis · Sin costo':'Free · No cost'}
                </div>

                <h2 className="serif" style={{ fontSize:22, color:'#111827', margin:'0 0 8px', letterSpacing:'-0.02em' }}>
                  {es?'Analiza tu CV gratis':'Analyze your resume free'}
                </h2>

                <p style={{ fontSize:12, color:'#6b7280', lineHeight:1.5, margin:'0 0 18px' }}>
                  {es
                    ?'Tu CV no se publica ni se comparte. Solo se usa para generar tu análisis.'
                    :'Your resume is not published or shared. It is only used to generate your analysis.'}
                </p>

                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div>
                    <label style={lblStyle}>{es?'Tu nombre':'Your name'}</label>
                    <input required type="text" value={free.nombre} placeholder={es?'Juan Pérez':'John Smith'}
                      onChange={e => setFree(p => ({ ...p, nombre:e.target.value }))}
                      style={{ ...fldStyle }}/>
                  </div>

                  <div>
                    <label style={lblStyle}>Email</label>
                    <input required type="email" value={free.email} placeholder={es?'tu@email.com':'you@email.com'}
                      onChange={e => setFree(p => ({ ...p, email:e.target.value }))}
                      style={{ ...fldStyle }}/>
                  </div>

                  <div>
                    <label style={lblStyle}>{es?'Sube tu CV (PDF)':'Upload your resume (PDF)'}</label>
                    <label className={`upload-label${free.cvFile?' done':''}`}>
                      <Upload size={18} color={free.cvFile?'#10b981':'#9ca3af'} style={{ margin:'0 auto 6px', display:'block' }}/>
                      <div style={{ fontSize:13, fontWeight:600, color:free.cvFile?'#059669':'#2563eb' }}>
                        {free.cvFile ? `✓ ${free.cvFile.name}` : (es?'Haz click aquí':'Click here')}
                      </div>
                      <div style={{ fontSize:11, color:'#9ca3af', marginTop:2 }}>PDF · {es?'Máx 5MB':'Max 5MB'}</div>
                      <input required type="file" accept=".pdf" style={{ display:'none' }}
                        onChange={e => { if (e.target.files[0]) setFree(p => ({ ...p, cvFile:e.target.files[0] })); }}/>
                    </label>
                  </div>

                  <Checks limits={freeLimits} setLimits={setFreeLimits} terms={freeTerms} setTerms={setFreeTerms}/>

                  <StatusBox s={freeStatus}/>

                  <button type="submit" className="btn-primary" disabled={freeSending||!freeTerms||!freeLimits}>
                    {freeSending ? (es?'Analizando...':'Analyzing...') : (es?'Analizar mi CV gratis →':'Analyze my resume free →')}
                  </button>

                  <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', margin:0 }}>
                    {es?'Sin costo · Entrega por email · 100% confidencial':'No cost · Email delivery · 100% confidential'}
                  </p>
                </div>
              </form>

              <button onClick={() => plansRef.current?.scrollIntoView({ behavior:'smooth' })}
                style={{ display:'flex', alignItems:'center', gap:6, margin:'14px auto 0', background:'none', border:'none', cursor:'pointer', fontSize:12, color:'rgba(255,255,255,0.45)', fontFamily:'inherit' }}>
                <ArrowDown size={13}/>{es?'Ver servicios pagados':'See paid services'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section ref={plansRef} style={{ background:'#f9fafb', padding:'72px 20px' }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-block', background:'#fef3c7', color:'#92400e', borderRadius:20, padding:'4px 12px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:12 }}>
              {es?'¿Quieres ir más allá?':'Want to go further?'}
            </div>

            <h2 className="serif" style={{ fontSize:'clamp(24px,3.5vw,36px)', color:'#111827', margin:'0 0 10px', letterSpacing:'-0.02em' }}>
              {es?'Elige el servicio según tu situación':'Choose the service based on your situation'}
            </h2>

            <p style={{ fontSize:15, color:'#6b7280', maxWidth:520, margin:'0 auto' }}>
              {es
                ?'Puedes adaptar tu CV a una vacante, crearlo desde cero o preparar una versión bilingüe completa.'
                :'You can tailor your resume to a job posting, create it from scratch, or prepare a full bilingual version.'}
            </p>
          </div>

          <div className="plans-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {plans.map(p => (
              <div key={p.id} className={`plan-card${plan===p.id?' selected':''}`} onClick={() => choosePlan(p.id)}
                style={{ borderColor: plan===p.id?p.color:'#e5e7eb', position:'relative' }}>
                {p.badge && (
                  <div style={{ position:'absolute', top:14, right:14, background:'#fbbf24', color:'#78350f', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:6 }}>{p.badge}</div>
                )}

                <div style={{ fontSize:10, fontWeight:700, color:p.color, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{p.title}</div>
                <div className="serif" style={{ fontSize:36, color:'#111827', marginBottom:6 }}>{p.price}</div>
                <p style={{ fontSize:14, fontWeight:600, color:'#374151', margin:'0 0 16px', lineHeight:1.4 }}>{p.headline}</p>

                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
                  {p.items.map((item,i) => (
                    <li key={i} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13, color:'#4b5563' }}>
                      <span style={{ color:p.color, flexShrink:0, marginTop:1 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>

                <button style={{ width:'100%', padding:'11px', borderRadius:10, border:`1.5px solid ${p.color}`, background:plan===p.id?p.color:'transparent', color:plan===p.id?'white':p.color, fontSize:13, fontWeight:700, cursor:'pointer', transition:'all .2s', fontFamily:'inherit' }}>
                  {plan===p.id ? (es?'✓ Seleccionado':'✓ Selected') : (es?'Solicitar este →':'Request this →')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {plan && (
        <section ref={paidRef} style={{ background:'white', padding:'56px 20px', borderTop:`3px solid ${plans.find(p=>p.id===plan)?.color||'#2563eb'}` }}>
          <div style={{ maxWidth:640, margin:'0 auto' }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>
                {es?'Completa tu solicitud':'Complete your request'}
              </div>
              <h2 className="serif" style={{ fontSize:26, color:'#111827', letterSpacing:'-0.02em' }}>{planLabels[plan]}</h2>
            </div>

            <form onSubmit={submitPaid} style={{ display:'flex', flexDirection:'column', gap:18 }}>
              <div className="mobile-two-cols" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={lblStyle}>{es?'Nombre completo *':'Full name *'}</label>
                  <input required type="text" value={paid.nombre} placeholder={es?'Juan Pérez':'John Smith'}
                    onChange={e => setPaid(p=>({...p,nombre:e.target.value}))} style={fldStyle}/>
                </div>
                <div>
                  <label style={lblStyle}>Email *</label>
                  <input required type="email" value={paid.email} placeholder={es?'tu@email.com':'you@email.com'}
                    onChange={e => setPaid(p=>({...p,email:e.target.value}))} style={fldStyle}/>
                </div>
              </div>

              <div>
                <label style={lblStyle}>{es?'Teléfono':'Phone'}</label>
                <input type="tel" value={paid.telefono} placeholder={es?'+593 99 123 4567':'+1 555 123 4567'}
                  onChange={e => setPaid(p=>({...p,telefono:e.target.value}))} style={fldStyle}/>
              </div>

              {!isBasico && (
                <div>
                  <label style={lblStyle}>{es?'¿Tienes CV actual?':'Do you have a resume?'}</label>
                  <div style={{ display:'flex', gap:10 }}>
                    {[{v:'si',l:es?'Sí, tengo CV':'Yes'},{v:'no',l:es?'No, crear desde cero':'No, create from scratch'}].map(o=>(
                      <label key={o.v} style={{ flex:1, display:'flex', alignItems:'center', gap:8, padding:'11px 14px', border:`1.5px solid ${paid.tieneCV===o.v?'#2563eb':'#e5e7eb'}`, borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:500, background:paid.tieneCV===o.v?'#eff6ff':'white' }}>
                        <input type="radio" name="tieneCV" value={o.v} checked={paid.tieneCV===o.v}
                          onChange={e => setPaid(p=>({...p,tieneCV:e.target.value,cvFile:null}))}/>
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {paid.tieneCV==='si' && !isBasico && (
                <UploadBox label={es?'Sube tu CV (PDF) *':'Upload resume (PDF) *'} fileKey="cvFile"/>
              )}

              {isPremium && (
                <div>
                  <div style={{ background:'#faf5ff', border:'1px solid #ddd6fe', borderRadius:10, padding:'12px 14px', marginBottom:10 }}>
                    <p style={{ fontSize:12, fontWeight:600, color:'#6d28d9', margin:'0 0 6px' }}>
                      📱 {es?'Cómo descargar tu LinkedIn:':'How to download your LinkedIn:'}
                    </p>
                    <ol style={{ fontSize:12, color:'#64748b', paddingLeft:16, margin:0, lineHeight:1.8 }}>
                      {(es
                        ?['Abre LinkedIn en tu navegador','Ve a tu perfil → click en "Más"','Selecciona "Guardar en PDF"','Sube el archivo aquí ⬇️']
                        :['Open LinkedIn in your browser','Go to your profile → click "More"','Select "Save to PDF"','Upload the file here ⬇️']
                      ).map((s,i)=><li key={i}>{s}</li>)}
                    </ol>
                  </div>
                  <UploadBox label={es?'LinkedIn PDF *':'LinkedIn PDF *'} fileKey="linkedinFile" purple/>
                </div>
              )}

              {showTipoCV && (
                <div>
                  <label style={lblStyle}>{es?'¿Para qué postulación?':'What type of application?'}</label>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {[
                      {v:'especifico',l:es?'Para un puesto específico':'For a specific position',d:es?'CV + análisis de compatibilidad + carta personalizada':'Resume + compatibility analysis + personalized cover letter'},
                      {v:'general',   l:es?'General (mejorado)':'General (improved)',           d:es?'CV optimizado para múltiples posiciones':'Optimized resume for multiple positions'},
                    ].map(o=>(
                      <label key={o.v} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'13px 15px', border:`1.5px solid ${paid.tipoCV===o.v?'#2563eb':'#e5e7eb'}`, borderRadius:10, cursor:'pointer', background:paid.tipoCV===o.v?'#eff6ff':'white' }}>
                        <input required type="radio" name="tipoCV" value={o.v} checked={paid.tipoCV===o.v}
                          onChange={e => setPaid(p=>({...p,tipoCV:e.target.value}))} style={{ marginTop:2 }}/>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:'#111827' }}>{o.l}</div>
                          <div style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>{o.d}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {showPuesto && (
                <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#0369a1', textTransform:'uppercase', letterSpacing:'0.06em' }}>
                    📌 {es?'Información del puesto':'Position info'}
                  </div>
                  <div className="mobile-two-cols" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {[
                      {key:'puesto',    label:es?'Puesto *':'Position *',      placeholder:es?'ej: Gerente de Ventas':'ex: Sales Manager', req:true},
                      {key:'industria', label:es?'Industria *':'Industry *',   placeholder:es?'ej: Telecomunicaciones':'ex: Telecom',       req:true},
                      {key:'empresa',   label:es?'Empresa (opcional)':'Company', placeholder:'ej: Claro',                                   req:false},
                      {key:'linkOferta',label:es?'Link oferta (opcional)':'Job link', placeholder:'https://...',                            req:false, type:'url'},
                    ].map(f=>(
                      <div key={f.key}>
                        <label style={{ ...lblStyle, color:'#0369a1' }}>{f.label}</label>
                        <input required={f.req} type={f.type||'text'} value={paid[f.key]} placeholder={f.placeholder}
                          onChange={e => setPaid(p=>({...p,[f.key]:e.target.value}))}
                          style={{ ...fldStyle, border:'1.5px solid #bae6fd' }}/>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ ...lblStyle, color:'#0369a1' }}>{es?'Requisitos del puesto *':'Job requirements *'}</label>
                    <div style={{ background:'#fef3c7', border:'1px solid #fde68a', borderRadius:8, padding:'9px 12px', marginBottom:8, fontSize:12, color:'#92400e' }}>
                      📋 {es
                        ?'Pega aquí la descripción — activa el análisis de compatibilidad y la carta personalizada.'
                        :'Paste the job description — activates compatibility analysis and personalized cover letter.'}
                    </div>
                    <textarea required value={paid.requisitosOferta} onChange={onReq} rows={6}
                      placeholder={es?'Copia los requisitos, responsabilidades y skills de la oferta...':'Copy the requirements, responsibilities and skills from the job posting...'}
                      style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #bae6fd', borderRadius:8, fontSize:13, background:'white', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit' }}/>
                    <div style={{ fontSize:11, color:'#6b7280', marginTop:3 }}>{es?'Palabras:':'Words:'} {reqWords}</div>
                  </div>
                </div>
              )}

              {paid.tipoRevision && (
                <div>
                  <label style={lblStyle}>
                    {paid.tieneCV==='no'
                      ?(es?'Tu experiencia profesional (max 1000 palabras) *':'Your professional experience (max 1000 words) *')
                      :(es?'Información adicional (max 500 palabras)':'Additional information (max 500 words)')}
                  </label>
                  <div style={{ background:paid.tieneCV==='no'?'#f0fdf4':'#f8fafc', border:`1px solid ${paid.tieneCV==='no'?'#bbf7d0':'#e5e7eb'}`, borderRadius:8, padding:'9px 12px', marginBottom:8, fontSize:12, color:paid.tieneCV==='no'?'#065f46':'#6b7280' }}>
                    {paid.tieneCV==='no'
                      ?(es?'📝 Incluye: empresas, puestos, fechas, logros, estudios y habilidades. Sé detallado.':'📝 Include: companies, positions, dates, achievements, education and skills. Be detailed.')
                      :(es?'💡 Agrega logros recientes, proyectos o habilidades no actualizados en tu CV.':'💡 Add recent achievements, projects or skills not in your resume.')}
                  </div>
                  <textarea value={paid.infoAdicional} onChange={onInfo}
                    rows={paid.tieneCV==='no'?10:5}
                    required={paid.tieneCV==='no'}
                    placeholder={paid.tieneCV==='no'
                      ?(es?'Ejemplo:\n\nEXPERIENCIA:\n- Gerente de Ventas, Empresa ABC (2020-2024)\n  • Lideré equipo de 8 personas\n  • Aumenté ventas en 35%\n\nFORMACIÓN:\n- Ingeniería Comercial, ESPOL, 2016\n\nHABILIDADES:\n- Excel, Salesforce, Inglés B2':'Example:\n\nEXPERIENCE:\n- Sales Manager, ABC Corp (2020-2024)\n  • Led team of 8\n  • Increased sales 35%\n\nEDUCATION:\n- Business Eng, 2016\n\nSKILLS:\n- Excel, Salesforce, English C1')
                      :(es?'Ejemplo: Actualmente lidero equipo de 12 personas, aumenté ventas B2B en 38%...':'Example: Currently leading team of 12, increased B2B sales by 38%...')}
                    style={{ width:'100%', padding:'11px 14px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:13, resize:'vertical', fontFamily:'inherit', boxSizing:'border-box' }}/>
                  <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>
                    {es?'Palabras:':'Words:'} {infoWords}/{paid.tieneCV==='no'?1000:500}
                  </div>
                </div>
              )}

              <Checks limits={paidLimits} setLimits={setPaidLimits} terms={paidTerms} setTerms={setPaidTerms}/>
              <StatusBox s={paidStatus}/>

              <button type="submit" className="btn-primary" disabled={paidSending||!paidTerms||!paidLimits}>
                {paidSending?(es?'Enviando...':'Sending...'):`${es?'Solicitar':'Request'} ${planLabels[plan]}`}
              </button>

              <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', margin:0 }}>
                {es?'Recibirás el link de pago en tu email en las próximas horas.':'You\'ll receive the payment link within the next few hours.'}
              </p>
            </form>
          </div>
        </section>
      )}

      <section style={{ background:'#0f172a', padding:'64px 20px' }}>
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center' }}>
          <h2 className="serif" style={{ fontSize:'clamp(22px,3.5vw,34px)', color:'white', margin:'0 0 40px', letterSpacing:'-0.02em' }}>
            {es?'Simple, rápido, profesional':'Simple, fast, professional'}
          </h2>

          <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28 }}>
            {(es
              ?[{n:'01',t:'Sube tu CV',d:'Gratis o con un servicio. Menos de 2 minutos.'},{n:'02',t:'IA analiza tu perfil',d:'Claude lee tu documento real y genera un diagnóstico específico.'},{n:'03',t:'Recibes el resultado',d:'En tu email. Análisis, CV optimizado, carta y más.'}]
              :[{n:'01',t:'Upload your resume',d:'Free or with a service. Less than 2 minutes.'},{n:'02',t:'AI analyzes your profile',d:'Claude reads your real document and generates a specific diagnosis.'},{n:'03',t:'Receive the result',d:'In your email. Analysis, optimized resume, cover letter and more.'}]
            ).map((s,i) => (
              <div key={i}>
                <div className="serif" style={{ fontSize:30, color:'rgba(59,130,246,0.28)', marginBottom:10 }}>{s.n}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'white', margin:'0 0 8px' }}>{s.t}</h3>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.42)', margin:0, lineHeight:1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background:'linear-gradient(135deg,#1d4ed8,#4f46e5)', padding:'56px 20px', textAlign:'center' }}>
        <h2 className="serif" style={{ fontSize:'clamp(22px,3.5vw,34px)', color:'white', margin:'0 0 12px', letterSpacing:'-0.02em' }}>
          {es?'Empieza gratis hoy':'Start free today'}
        </h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,0.72)', margin:'0 0 22px' }}>
          {es?'Descubre qué está frenando tus oportunidades — en minutos.':'Find out what\'s holding back your opportunities — in minutes.'}
        </p>
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          style={{ padding:'12px 30px', borderRadius:12, border:'2px solid white', background:'white', color:'#1d4ed8', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
          {es?'Analizar mi CV gratis ↑':'Analyze my resume free ↑'}
        </button>
      </section>

      <footer style={{ background:'#080d18', padding:'24px 20px' }}>
        <div style={{ maxWidth:1080, margin:'0 auto', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.28)' }}>© 2026 Nocodia CV · Guayaquil, Ecuador</span>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer"
              style={{ fontSize:12, color:'rgba(255,255,255,0.32)', textDecoration:'none' }}>
              {es?'Política de Privacidad':'Privacy Policy'}
            </a>
            <a href="mailto:jrgarcia@nocodia.net" style={{ fontSize:12, color:'rgba(255,255,255,0.32)', textDecoration:'none' }}>
              jrgarcia@nocodia.net
            </a>
          </div>
        </div>
        <p style={{ fontSize:10, color:'rgba(255,255,255,0.16)', textAlign:'center', maxWidth:680, margin:'14px auto 0', lineHeight:1.6 }}>
          {es
            ?'Nocodia CV cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021). El servicio no garantiza resultados laborales específicos.'
            :"Nocodia CV complies with Ecuador's Organic Law on Personal Data Protection (LOPDP). The service does not guarantee specific employment results."}
        </p>
      </footer>
    </>
  );
}
