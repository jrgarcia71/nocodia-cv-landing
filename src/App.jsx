import { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --ink:#0d1117; --ink2:#1c2534; --slate:#64748b; --border:#e2e8f0;
      --blue:#1d4ed8; --blue-l:#3b82f6; --red:#dc2626; --green:#059669;
      --gold:#d97706; --bg:#f8fafc; --white:#ffffff; --r:12px; --rL:20px;
    }
    html { scroll-behavior: smooth; }
    body { font-family:'DM Sans',sans-serif; background:var(--bg); color:var(--ink); line-height:1.5; }
    h1,h2,h3 { font-family:'Bricolage Grotesque',sans-serif; line-height:1.1; }
    input,textarea,button,select { font-family:inherit; }
    a { color:var(--blue); }
    .container { max-width:1080px; margin:0 auto; padding:0 20px; }
    @keyframes up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    .anim-up { animation:up .55s ease both }
    .d1{animation-delay:.08s}.d2{animation-delay:.18s}.d3{animation-delay:.28s}
    .hero { background:var(--ink); padding:40px 0 52px; position:relative; overflow:hidden; }
    .hero::before { content:''; position:absolute; inset:0;
      background:radial-gradient(ellipse 70% 50% at 20% 50%,rgba(29,78,216,.18) 0%,transparent 70%),
                  radial-gradient(ellipse 50% 60% at 80% 30%,rgba(220,38,38,.08) 0%,transparent 60%);
      pointer-events:none; }
    .hero-grid { display:grid; grid-template-columns:1fr; gap:36px; position:relative; }
    @media(min-width:860px){ .hero-grid{grid-template-columns:1fr 420px;gap:48px;align-items:start;} }
    .form-card { background:var(--white); border-radius:var(--rL); padding:28px; box-shadow:0 24px 64px rgba(0,0,0,.35); }
    .field-label { display:block; font-size:11px; font-weight:600; color:var(--slate); text-transform:uppercase; letter-spacing:.06em; margin-bottom:6px; }
    .field-input { width:100%; padding:12px 14px; border:1.5px solid var(--border); border-radius:var(--r); font-size:15px; color:var(--ink); background:var(--white); transition:border-color .15s; }
    .field-input:focus { outline:none; border-color:var(--blue); }
    .upload-wrap { display:block; width:100%; border:2px dashed #cbd5e1; border-radius:var(--r); padding:20px 16px; text-align:center; cursor:pointer; background:#f8fafc; transition:border-color .15s,background .15s; }
    .upload-wrap:hover { border-color:var(--blue); background:#eff6ff; }
    .upload-wrap.has-file { border-color:var(--green); background:#f0fdf4; }
    .check-row { display:flex; gap:8px; align-items:flex-start; cursor:pointer; }
    .check-row input[type=checkbox] { margin-top:2px; flex-shrink:0; accent-color:var(--blue); }
    .check-row span { font-size:11px; color:var(--slate); line-height:1.5; }
    .btn { display:block; width:100%; padding:15px 20px; border:none; border-radius:var(--r); font-size:16px; font-weight:700; cursor:pointer; transition:all .2s; text-align:center; }
    .btn-blue { background:linear-gradient(135deg,var(--blue),#4f46e5); color:white; }
    .btn-blue:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 20px rgba(29,78,216,.35); }
    .btn-blue:disabled { opacity:.45; cursor:not-allowed; transform:none; }
    .proof-strip { background:var(--white); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:18px 0; }
    .proof-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:16px; }
    @media(min-width:600px){ .proof-grid{grid-template-columns:repeat(4,1fr);} }
    .proof-item { text-align:center; }
    .proof-num { font-family:'Bricolage Grotesque',sans-serif; font-size:20px; font-weight:800; color:var(--ink); }
    .proof-label { font-size:11px; color:var(--slate); margin-top:2px; }
    .mockup { background:var(--white); border-radius:14px; border:1px solid var(--border); overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,.08); }
    .mockup-bar { background:#f3f4f6; padding:10px 14px; display:flex; align-items:center; gap:7px; border-bottom:1px solid var(--border); }
    .mockup-dot { width:10px; height:10px; border-radius:50%; }
    .mockup-body { padding:20px; }
    .before-after-grid { display:grid; grid-template-columns:1fr 1fr; gap:0; border-radius:16px; overflow:hidden; border:1px solid var(--border); box-shadow:0 8px 32px rgba(0,0,0,.08); }
    .ba-col { padding:24px; }
    .ba-before { background:#fff5f5; border-right:1px solid var(--border); }
    .ba-after { background:#f0fdf4; }
    .plans-grid { display:grid; grid-template-columns:1fr; gap:16px; }
    @media(min-width:680px){ .plans-grid{grid-template-columns:repeat(3,1fr);} }
    .plan { background:var(--white); border:2px solid var(--border); border-radius:var(--rL); padding:24px; cursor:pointer; transition:all .2s; position:relative; }
    .plan:hover { transform:translateY(-3px); box-shadow:0 12px 28px rgba(0,0,0,.09); }
    .plan.on { box-shadow:0 0 0 3px rgba(29,78,216,.2); }
    .steps-grid { display:grid; grid-template-columns:1fr; gap:24px; }
    @media(min-width:680px){ .steps-grid{grid-template-columns:repeat(3,1fr);} }
    .status { display:flex; gap:8px; align-items:flex-start; padding:11px 14px; border-radius:var(--r); font-size:13px; }
    .status.ok  { background:#f0fdf4; border:1px solid #bbf7d0; color:#065f46; }
    .status.err { background:#fef2f2; border:1px solid #fecaca; color:#991b1b; }
    .paid-section { background:var(--white); border-top:3px solid var(--blue); padding:56px 0; }
    .section      { padding:64px 0; }
    .section-dark { background:var(--ink2); padding:64px 0; }
    .section-bg   { background:var(--bg); padding:64px 0; }
    .section-tag { display:inline-block; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; border-radius:20px; padding:4px 12px; margin-bottom:14px; }
    .tag-red   { background:#fef2f2; color:#991b1b; }
    .tag-blue  { background:#eff6ff; color:#1e40af; }
    .tag-gold  { background:#fef3c7; color:#92400e; }
    .tag-green { background:#f0fdf4; color:#065f46; }
    .tag-dark  { background:rgba(255,255,255,.1); color:rgba(255,255,255,.7); }
    .section-h { font-size:clamp(24px,4vw,36px); letter-spacing:-.025em; }
    .tension-list { display:flex; flex-direction:column; gap:8px; }
    .tension-item { display:flex; align-items:center; gap:10px; }
    .tension-icon { width:20px; height:20px; border-radius:50%; background:rgba(220,38,38,.15); border:1px solid rgba(220,38,38,.3); display:flex; align-items:center; justify-content:center; font-size:10px; flex-shrink:0; }
    .header-badge { display:flex; flex-direction:column; align-items:flex-end; cursor:pointer; background:none; border:none; padding:4px 10px; border-radius:8px; transition:background .15s; font-family:inherit; text-align:right; }
    .header-badge:hover { background:#fef2f2; }
    .header-badge-line1 { font-size:10px; font-weight:600; color:var(--red); letter-spacing:.02em; line-height:1.2; }
    .header-badge-line2 { font-size:11px; font-weight:700; color:var(--ink); letter-spacing:-.01em; line-height:1.2; }
    @media(max-width:400px){ .header-badge{display:none;} }
    .micro-trust { display:flex; justify-content:center; gap:12px; flex-wrap:wrap; font-size:11px; color:#64748b; font-weight:500; }
    .micro-trust span { display:flex; align-items:center; gap:4px; }
    .radio-row { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
    .radio-card { display:flex; align-items:flex-start; gap:8px; padding:12px 14px; border:1.5px solid var(--border); border-radius:var(--r); cursor:pointer; transition:border-color .15s,background .15s; }
    .radio-card.on { border-color:var(--blue); background:#eff6ff; }
    .radio-card input { margin-top:2px; flex-shrink:0; accent-color:var(--blue); }
    .linkedin-hint { background:#faf5ff; border:1px solid #e9d5ff; border-radius:var(--r); padding:14px; margin-bottom:10px; }
    footer { background:#080d18; padding:28px 0; }
  `}</style>
);

const EmailMockup = ({ es }) => (
  <div className="mockup">
    <div className="mockup-bar">
      <div className="mockup-dot" style={{background:'#ef4444'}}/>
      <div className="mockup-dot" style={{background:'#f59e0b'}}/>
      <div className="mockup-dot" style={{background:'#10b981'}}/>
      <span style={{fontSize:11,color:'#9ca3af',marginLeft:6}}>✅ {es?'Tu Diagnóstico de CV — Nocodia':'Your Resume Diagnosis — Nocodia'}</span>
    </div>
    <div className="mockup-body">
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,paddingBottom:14,borderBottom:'1px solid #f3f4f6'}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#1d4ed8'}}/>
        <span style={{fontSize:12,fontWeight:700,color:'#1d4ed8'}}>Nocodia CV</span>
        <span style={{fontSize:11,color:'#9ca3af'}}>· {es?'Diagnóstico IA':'AI Diagnosis'}</span>
      </div>
      <p style={{fontSize:13,color:'#374151',lineHeight:1.6,marginBottom:16}}>
        {es?'Analizamos tu CV. Encontramos 3 problemas críticos que están reduciendo tus posibilidades de entrevista.'
           :'We analyzed your resume. Found 3 critical issues reducing your interview chances.'}
      </p>
      <div style={{marginBottom:14}}>
        <p style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.06em',color:'#374151',marginBottom:8}}>⚠️ {es?'Errores críticos detectados':'Critical issues detected'}</p>
        {(es
          ?['Perfil profesional genérico — no comunica tu propuesta de valor','Faltan keywords ATS del sector','Logros sin cuantificar']
          :['Generic professional profile — no clear value','Missing sector ATS keywords','Achievements not quantified']
        ).map((t,i)=>(
          <div key={i} style={{display:'flex',gap:7,marginBottom:6}}>
            <span style={{color:'#ef4444',flexShrink:0}}>✕</span>
            <span style={{fontSize:12,color:'#374151'}}>{t}</span>
          </div>
        ))}
      </div>
      <div style={{background:'linear-gradient(135deg,#eff6ff,#eef2ff)',borderRadius:10,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:12,color:'#1e40af',fontWeight:600}}>{es?'¿Quieres el CV completamente optimizado?':'Want the fully optimized resume?'}</span>
        <span style={{fontSize:14,fontWeight:800,color:'#1d4ed8',whiteSpace:'nowrap',marginLeft:8}}>$12 →</span>
      </div>
    </div>
  </div>
);

const BeforeAfter = ({ es }) => {
  const before = es
    ? [{icon:'📄',t:'Score ATS: 38/100'},{icon:'❌',t:'Perfil genérico sin valor diferencial'},{icon:'❌',t:'Keywords del sector ausentes'},{icon:'❌',t:'Logros sin cuantificar'},{icon:'📭',t:'0 respuestas en 3 meses'}]
    : [{icon:'📄',t:'ATS Score: 38/100'},{icon:'❌',t:'Generic profile, no clear value'},{icon:'❌',t:'Missing sector keywords'},{icon:'❌',t:'Achievements not quantified'},{icon:'📭',t:'0 responses in 3 months'}];
  const after = es
    ? [{icon:'📄',t:'Score ATS: 91/100'},{icon:'✅',t:'Propuesta de valor clara y diferenciada'},{icon:'✅',t:'12 keywords ATS integradas'},{icon:'✅',t:'Logros con impacto y números'},{icon:'📬',t:'Entrevista a los 5 días'}]
    : [{icon:'📄',t:'ATS Score: 91/100'},{icon:'✅',t:'Clear, differentiated value proposition'},{icon:'✅',t:'12 ATS keywords integrated'},{icon:'✅',t:'Quantified achievements'},{icon:'📬',t:'Interview in 5 days'}];
  return (
    <div className="before-after-grid">
      <div className="ba-col ba-before">
        <p style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.07em',color:'#ef4444',marginBottom:14}}>{es?'ANTES — CV sin optimizar':'BEFORE — Unoptimized'}</p>
        {before.map((item,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:10}}>
            <span style={{fontSize:13,flexShrink:0}}>{item.icon}</span>
            <span style={{fontSize:13,color:'#6b7280',lineHeight:1.4}}>{item.t}</span>
          </div>
        ))}
      </div>
      <div className="ba-col ba-after">
        <p style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.07em',color:'#059669',marginBottom:14}}>{es?'DESPUÉS — CV Nocodia':'AFTER — Nocodia'}</p>
        {after.map((item,i)=>(
          <div key={i} style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:10}}>
            <span style={{fontSize:13,flexShrink:0}}>{item.icon}</span>
            <span style={{fontSize:13,color:'#374151',fontWeight:i===4?700:400,lineHeight:1.4}}>{item.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('es');
  const plansRef = useRef(null);
  const paidRef  = useRef(null);

  const [free, setFree]         = useState({ nombre:'', email:'', cvFile:null });
  const [freeOk, setFreeOk]     = useState(null);
  const [freeBusy, setFreeBusy] = useState(false);
  const [freeLim, setFreeLim]   = useState(false);
  const [freeTerm, setFreeTerm] = useState(false);

  const [plan, setPlan]         = useState(null);
  const [paid, setPaid]         = useState({
    nombre:'', email:'', telefono:'', tieneCV:'si', tipoRevision:'',
    tipoCV:'', puesto:'', empresa:'', industria:'', linkOferta:'',
    requisitosOferta:'', infoAdicional:'', cvFile:null, linkedinFile:null,
  });
  const [paidOk, setPaidOk]     = useState(null);
  const [paidBusy, setPaidBusy] = useState(false);
  const [paidLim, setPaidLim]   = useState(false);
  const [paidTerm, setPaidTerm] = useState(false);
  const [iWords, setIWords]     = useState(0);
  const [rWords, setRWords]     = useState(0);

  const es = lang === 'es';

  // FIX 1: useEffect para scroll — el ref no existe hasta que React renderiza la sección
  useEffect(() => {
    if (plan && paidRef.current) {
      paidRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [plan]);

  const submitFree = async e => {
    e.preventDefault();
    setFreeBusy(true); setFreeOk(null);
    try {
      const fd = new FormData();
      fd.append('nombre', free.nombre);
      fd.append('email',  free.email);
      if (free.cvFile) fd.append('cvFile', free.cvFile);
      fd.append('tieneCV','si');
      fd.append('tipoRevision','generica');
      fd.append('formLanguage', lang);
      const r = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit',{ method:'POST', body:fd });
      const j = await r.json();
      setFreeOk(r.ok?{ok:true,msg:j.message}:{ok:false,msg:j.error||'Error desconocido'});
      if(r.ok){ setFree({nombre:'',email:'',cvFile:null}); setFreeLim(false); setFreeTerm(false); }
    } catch { setFreeOk({ok:false,msg:es?'Error de conexión.':'Connection error.'}); }
    finally  { setFreeBusy(false); }
  };

  const submitPaid = async e => {
    e.preventDefault();

    // FIX 2: toda la validación en JS — sin depender del browser
    // Esto evita bloqueos silenciosos por inputs hidden o required en radios
    if (!paid.nombre?.trim() || !paid.email?.trim()) {
      setPaidOk({ok:false, msg: es?'Nombre y email son requeridos.':'Name and email are required.'});
      return;
    }
    if (!paidLim || !paidTerm) {
      setPaidOk({ok:false, msg: es?'Debes aceptar ambas condiciones.':'You must accept both conditions.'});
      return;
    }
    const isPrem   = paid.tipoRevision === 'premium';
    const isBasic  = paid.tipoRevision === 'basico';
    const needsTC  = ['especializada','premium'].includes(paid.tipoRevision);

    if (needsTC && !paid.tipoCV) {
      setPaidOk({ok:false, msg: es?'Selecciona el tipo de postulación (específica o general).':'Select the application type (specific or general).'});
      return;
    }
    if (paid.tieneCV === 'si' && !isBasic && !paid.cvFile) {
      setPaidOk({ok:false, msg: es?'Sube tu CV en PDF.':'Upload your resume as PDF.'});
      return;
    }
    if (isPrem && !paid.linkedinFile) {
      setPaidOk({ok:false, msg: es?'Postulación Ejecutiva requiere tu LinkedIn PDF.':'Executive Application requires your LinkedIn PDF.'});
      return;
    }
    if (isBasic && !paid.infoAdicional?.trim()) {
      setPaidOk({ok:false, msg: es?'Describe tu experiencia profesional en el campo de texto.':'Describe your professional experience in the text field.'});
      return;
    }

    setPaidBusy(true); setPaidOk(null);
    try {
      const fd = new FormData();
      Object.keys(paid).forEach(k => { if(paid[k]) fd.append(k, paid[k]); });
      fd.append('formLanguage', lang);
      const r = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit',{ method:'POST', body:fd });
      const j = await r.json();
      setPaidOk(r.ok?{ok:true,msg:j.message}:{ok:false,msg:j.error||'Error al enviar. Intenta nuevamente.'});
      if(r.ok){
        setPaid({nombre:'',email:'',telefono:'',tieneCV:'si',tipoRevision:plan,tipoCV:'',puesto:'',empresa:'',industria:'',linkOferta:'',requisitosOferta:'',infoAdicional:'',cvFile:null,linkedinFile:null});
        setIWords(0); setRWords(0); setPaidLim(false); setPaidTerm(false);
      }
    } catch { setPaidOk({ok:false,msg:es?'Error de conexión. Verifica tu internet.':'Connection error. Check your internet.'}); }
    finally  { setPaidBusy(false); }
  };

  // FIX 3: pickPlan sin setTimeout — el scroll lo maneja useEffect
  const pickPlan = id => {
    setPlan(id);
    setPaid(p=>({...p, tipoRevision:id, tipoCV:'', cvFile:null, linkedinFile:null}));
    setPaidOk(null);
  };

  const onInfo = e => {
    const t=e.target.value;
    const lim = paid.tipoRevision==='basico' ? 1000 : 500;
    const w=t.trim().split(/\s+/).filter(Boolean).length;
    if(w<=lim){ setPaid(p=>({...p,infoAdicional:t})); setIWords(w); }
  };
  const onReq = e => {
    const t=e.target.value;
    setPaid(p=>({...p,requisitosOferta:t}));
    setRWords(t.trim().split(/\s+/).filter(Boolean).length);
  };

  const plans = [
    { id:'especializada', color:'#4f46e5', price:'$12', badge:null,
      title: es?'Especializada':'Specialized',
      sub:   es?'Para una vacante real':'For a specific job posting',
      items: es
        ?['Tu CV listo para pasar filtros ATS','Análisis de compatibilidad con la oferta','Carta de presentación personalizada']
        :['Resume ready to pass ATS filters','Compatibility analysis with the job','Personalized cover letter'],
    },
    { id:'basico', color:'#7c3aed', price:'$15', badge:null,
      title: es?'Básico':'Basic',
      sub:   es?'CV desde cero':'Resume from scratch',
      items: es
        ?['Tu CV profesional completo, listo para postular','Redactado con tu experiencia real','Formato ATS optimizado']
        :['Complete professional resume, ready to apply','Written with your real experience','ATS-optimized format'],
    },
    { id:'premium', color:'#1d4ed8', price:'$20', badge:es?'⭐ RECOMENDADO':'⭐ RECOMMENDED',
      title: es?'Postulación Ejecutiva':'Executive Application',
      sub:   es?'Máxima ventaja · Bilingüe':'Maximum advantage · Bilingual',
      items: es
        ?['CV + carta en Español e Inglés','LinkedIn PDF analizado + optimización completa','Análisis de compatibilidad con la oferta']
        :['Resume + cover letter in Spanish & English','LinkedIn PDF analyzed + full optimization','Compatibility analysis with the job'],
    },
  ];

  const isPremium  = paid.tipoRevision==='premium';
  const isBasico   = paid.tipoRevision==='basico';
  const showTC     = ['especializada','premium'].includes(paid.tipoRevision);
  const showPuesto = paid.tipoCV==='especifico';
  const pLabel     = {
    especializada: es?'Especializada $12':'Specialized $12',
    basico:        es?'Básico $15':'Basic $15',
    premium:       es?'Postulación Ejecutiva $20':'Executive Application $20',
  };

  const Lbl = ({t}) => <label className="field-label">{t}</label>;

  // FIX 4: UpBox sin required HTML — validación por JS en submitPaid
  const UpBox = ({label, fileKey, purple=false}) => {
    const has = !!paid[fileKey];
    return (
      <div>
        <Lbl t={label}/>
        <label className={`upload-wrap${has?' has-file':''}`}
          style={{borderColor:has?'#10b981':purple?'#c4b5fd':'#cbd5e1',background:has?'#f0fdf4':purple?'#faf5ff':'#f8fafc'}}>
          <Upload size={18} color={has?'#059669':purple?'#8b5cf6':'#94a3b8'} style={{display:'block',margin:'0 auto 6px'}}/>
          <p style={{fontSize:13,fontWeight:600,color:has?'#059669':purple?'#7c3aed':'#1d4ed8',margin:0}}>
            {has?`✓ ${paid[fileKey].name}`:(es?'Haz click o arrastra aquí':'Click or drag here')}
          </p>
          <p style={{fontSize:11,color:'#94a3b8',margin:'2px 0 0'}}>PDF / DOCX · {es?'Máx 5MB':'Max 5MB'}</p>
          <input type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{display:'none'}}
            onChange={e=>{if(e.target.files[0]) setPaid(p=>({...p,[fileKey]:e.target.files[0]}));}}/>
        </label>
      </div>
    );
  };

  const Checks = ({lim,setLim,term,setTerm}) => (
    <div style={{display:'flex',flexDirection:'column',gap:8,paddingTop:10,borderTop:'1px solid #f1f5f9'}}>
      <label className="check-row">
        <input type="checkbox" checked={lim} onChange={e=>setLim(e.target.checked)}/>
        <span>{es?'Entiendo que Nocodia CV optimiza documentos y no garantiza entrevistas ni resultados laborales.':'I understand Nocodia CV optimizes documents and does not guarantee interviews or employment results.'}</span>
      </label>
      <label className="check-row">
        <input type="checkbox" checked={term} onChange={e=>setTerm(e.target.checked)}/>
        <span>{es?'Acepto la ':'I accept the '}<a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer">{es?'Política de Privacidad':'Privacy Policy'}</a>{es?' y el tratamiento de datos conforme a la LOPDP Ecuador.':' and data processing per Ecuador\'s LOPDP.'}</span>
      </label>
    </div>
  );

  const StatusBox = ({s}) => !s?null:(
    <div className={`status ${s.ok?'ok':'err'}`}>
      {s.ok?<CheckCircle size={14} style={{flexShrink:0,marginTop:1}}/>:<AlertCircle size={14} style={{flexShrink:0,marginTop:1}}/>}
      <span>{s.msg}</span>
    </div>
  );

  return (
    <>
      <G/>

      {/* HEADER */}
      <header style={{position:'sticky',top:0,zIndex:50,background:'rgba(255,255,255,.96)',backdropFilter:'blur(10px)',borderBottom:'1px solid var(--border)'}}>
        <div className="container" style={{height:52,display:'flex',alignItems:'center',justifyContent:'space-between',gap:8}}>
          <span style={{fontFamily:'Bricolage Grotesque,sans-serif',fontSize:17,fontWeight:800,letterSpacing:'-.02em',color:'var(--ink)',flexShrink:0}}>Nocodia CV</span>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <button type="button" className="header-badge"
              onClick={()=>plansRef.current?.scrollIntoView({behavior:'smooth',block:'start'})}>
              <span className="header-badge-line1">{es?'No pases desapercibido':'Don\'t go unnoticed'}</span>
              <span className="header-badge-line2">{es?'Optimiza tu CV · desde $12 →':'Optimize your resume · from $12 →'}</span>
            </button>
            <div style={{display:'flex',gap:4,flexShrink:0}}>
              {['es','en'].map(l=>(
                <button type="button" key={l} onClick={()=>setLang(l)}
                  style={{padding:'4px 10px',borderRadius:6,border:'none',cursor:'pointer',fontSize:12,fontWeight:600,fontFamily:'inherit',background:lang===l?'var(--blue)':'#f1f5f9',color:lang===l?'white':'#64748b',transition:'all .15s'}}>
                  {l==='es'?'🇪🇸 ES':'🇬🇧 EN'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="anim-up" style={{display:'inline-block',background:'rgba(220,38,38,.15)',border:'1px solid rgba(220,38,38,.25)',borderRadius:20,padding:'4px 12px',fontSize:11,fontWeight:700,color:'#fca5a5',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:16}}>
                {es?'Diagnóstico IA gratuito':'Free AI Diagnosis'}
              </div>
              <h1 className="anim-up d1" style={{fontSize:'clamp(28px,5.5vw,52px)',color:'white',marginBottom:12,letterSpacing:'-.03em'}}>
                {es?<>Tu CV podría estar siendo<br/><span style={{color:'#f87171'}}>descartado antes de ser leído</span></>
                   :<>Your resume may be getting<br/><span style={{color:'#f87171'}}>rejected before it's even read</span></>}
              </h1>
              <p className="anim-up d2" style={{fontSize:15,color:'rgba(255,255,255,.55)',marginBottom:20,maxWidth:460,lineHeight:1.6}}>
                {es?'Muchas empresas usan filtros ATS automáticos.':'Many companies use automatic ATS filters.'}
              </p>
              <div className="tension-list anim-up d3">
                {(es
                  ?['Tu CV filtrado sin que nadie lo lea','Keywords faltantes = invisible al reclutador','Formato incorrecto descarta candidatos']
                  :['Filtered out before anyone reads it','Missing keywords = invisible to recruiters','Wrong format = instant disqualification']
                ).map((t,i)=>(
                  <div className="tension-item" key={i}>
                    <div className="tension-icon">⚡</div>
                    <span style={{fontSize:14,color:'rgba(255,255,255,.7)'}}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM GRATIS */}
            <div className="anim-up d2">
              <form className="form-card" onSubmit={submitFree}>
                <p style={{fontSize:11,fontWeight:700,color:'#059669',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}}>
                  {es?'Gratis · Sin costo':'Free · No cost'}
                </p>
                <h2 style={{fontFamily:'Bricolage Grotesque,sans-serif',fontSize:21,color:'var(--ink)',marginBottom:4,letterSpacing:'-.02em'}}>
                  {es?'Analiza tu CV ahora':'Analyze your resume now'}
                </h2>
                <p style={{fontSize:13,color:'#64748b',marginBottom:20}}>
                  {es?'Descubre exactamente qué está fallando — en minutos.':'Find out exactly what\'s wrong — in minutes.'}
                </p>
                <div style={{display:'flex',flexDirection:'column',gap:14}}>
                  <div>
                    <Lbl t={es?'Tu nombre':'Your name'}/>
                    <input required type="text" className="field-input" value={free.nombre}
                      placeholder={es?'Juan Pérez':'John Smith'}
                      onChange={e=>setFree(p=>({...p,nombre:e.target.value}))}/>
                  </div>
                  <div>
                    <Lbl t="Email"/>
                    <input required type="email" className="field-input" value={free.email}
                      placeholder={es?'tu@email.com':'you@email.com'}
                      onChange={e=>setFree(p=>({...p,email:e.target.value}))}/>
                  </div>
                  <div>
                    <Lbl t={es?'Sube tu CV (PDF o Word)':'Upload resume (PDF or Word)'}/>
                    <label className={`upload-wrap${free.cvFile?' has-file':''}`}>
                      <Upload size={20} color={free.cvFile?'#059669':'#94a3b8'} style={{display:'block',margin:'0 auto 6px'}}/>
                      <p style={{fontSize:13,fontWeight:600,color:free.cvFile?'#059669':'#1d4ed8',margin:0}}>
                        {free.cvFile?`✓ ${free.cvFile.name}`:(es?'Haz click aquí':'Click here')}
                      </p>
                      <p style={{fontSize:11,color:'#94a3b8',margin:'3px 0 0'}}>PDF / DOCX · {es?'Máx 5MB':'Max 5MB'}</p>
                      <input required type="file" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{display:'none'}}
                        onChange={e=>{if(e.target.files[0]) setFree(p=>({...p,cvFile:e.target.files[0]}));}}/>
                    </label>
                  </div>
                  <Checks lim={freeLim} setLim={setFreeLim} term={freeTerm} setTerm={setFreeTerm}/>
                  <StatusBox s={freeOk}/>
                  <button type="submit" className="btn btn-blue" disabled={freeBusy||!freeTerm||!freeLim}>
                    {freeBusy?(es?'Analizando...':'Analyzing...'):(es?'Recibir mi análisis gratis →':'Get my free analysis →')}
                  </button>
                  <div className="micro-trust">
                    <span>✅ {es?'Confidencial':'Confidential'}</span>
                    <span>✅ {es?'Por email':'By email'}</span>
                    <span>✅ {es?'En minutos':'In minutes'}</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <div className="proof-strip">
        <div className="container">
          <div className="proof-grid">
            {[
              {n:'+100',l:es?'CVs analizados':'Resumes analyzed'},
              {n:'<5min',l:es?'Tiempo de entrega':'Delivery time'},
              {n:'ATS', l:es?'Filtros reales':'Real ATS filters'},
              {n:'100%',l:es?'Confidencial':'Confidential'},
            ].map((p,i)=>(
              <div className="proof-item" key={i}>
                <div className="proof-num">{p.n}</div>
                <div className="proof-label">{p.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOCKUP */}
      <section className="section" style={{background:'white'}}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:32}}>
            <span className="section-tag tag-blue">{es?'Esto es lo que recibes':'What you receive'}</span>
            <h2 className="section-h" style={{color:'var(--ink)'}}>
              {es?'Un diagnóstico real, no consejos genéricos':'A real diagnosis, not generic advice'}
            </h2>
          </div>
          <div style={{maxWidth:520,margin:'0 auto'}}><EmailMockup es={es}/></div>
        </div>
      </section>

      {/* ANTES / DESPUÉS */}
      <section className="section-bg">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:32}}>
            <span className="section-tag tag-red">{es?'El impacto real':'The real impact'}</span>
            <h2 className="section-h" style={{color:'var(--ink)',marginBottom:8}}>
              {es?'La diferencia entre un CV ignorado y uno que genera entrevistas':'The difference between an ignored resume and one that gets interviews'}
            </h2>
            <p style={{fontSize:14,color:'#94a3b8',marginTop:8}}>{es?'Ejemplo ilustrativo basado en casos reales':'Illustrative example based on real cases'}</p>
          </div>
          <div style={{maxWidth:680,margin:'0 auto 28px'}}><BeforeAfter es={es}/></div>
          <div style={{textAlign:'center'}}>
            <button type="button" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
              style={{padding:'12px 28px',borderRadius:12,border:'none',background:'linear-gradient(135deg,#dc2626,#b91c1c)',color:'white',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
              {es?'Analiza mi CV gratis ahora →':'Analyze my resume for free →'}
            </button>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section className="section" style={{background:'white'}} ref={plansRef}>
        <div className="container">
          <div style={{textAlign:'center',marginBottom:36}}>
            <span className="section-tag tag-gold">{es?'¿Quieres ir más allá?':'Want to go further?'}</span>
            <h2 className="section-h" style={{color:'var(--ink)',marginBottom:10}}>
              {es?'Para una postulación más fuerte':'For a stronger application'}
            </h2>
            <p style={{fontSize:15,color:'#64748b',maxWidth:440,margin:'0 auto'}}>
              {es?'Selecciona el servicio y completa el formulario abajo.':'Select the service and complete the form below.'}
            </p>
          </div>
          <div className="plans-grid">
            {plans.map(p=>(
              <div key={p.id} className={`plan${plan===p.id?' on':''}`}
                onClick={()=>pickPlan(p.id)}
                style={{borderColor:plan===p.id?p.color:'var(--border)'}}>
                {p.badge&&(
                  <div style={{position:'absolute',top:14,right:14,background:'#fbbf24',color:'#78350f',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:6}}>{p.badge}</div>
                )}
                <p style={{fontSize:11,fontWeight:700,color:p.color,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:4}}>{p.title}</p>
                <p style={{fontFamily:'Bricolage Grotesque,sans-serif',fontSize:38,color:'var(--ink)',fontWeight:800,marginBottom:4}}>{p.price}</p>
                <p style={{fontSize:13,color:'#64748b',marginBottom:16}}>{p.sub}</p>
                <ul style={{listStyle:'none',display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
                  {p.items.map((item,i)=>(
                    <li key={i} style={{display:'flex',gap:8,alignItems:'flex-start',fontSize:13,color:'#374151'}}>
                      <span style={{color:p.color,flexShrink:0,marginTop:1}}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                {/* FIX 5: type="button" evita submit accidental */}
                <button type="button"
                  style={{width:'100%',padding:'11px',borderRadius:10,border:`1.5px solid ${p.color}`,background:plan===p.id?p.color:'transparent',color:plan===p.id?'white':p.color,fontSize:13,fontWeight:700,cursor:'pointer',transition:'all .2s',fontFamily:'inherit'}}>
                  {plan===p.id?(es?'✓ Seleccionado':'✓ Selected'):(es?'Solicitar →':'Request →')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO PAGADO */}
      {plan&&(
        <section className="paid-section" ref={paidRef}
          style={{borderTopColor:plans.find(p=>p.id===plan)?.color||'var(--blue)'}}>
          <div className="container">
            <div style={{maxWidth:620,margin:'0 auto'}}>
              <p style={{fontSize:11,fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>{es?'Completa tu solicitud':'Complete your request'}</p>
              <h2 style={{fontFamily:'Bricolage Grotesque,sans-serif',fontSize:26,color:'var(--ink)',marginBottom:28,letterSpacing:'-.02em'}}>{pLabel[plan]}</h2>

              <form onSubmit={submitPaid} style={{display:'flex',flexDirection:'column',gap:18}}>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                  <div>
                    <Lbl t={es?'Nombre *':'Full name *'}/>
                    <input type="text" className="field-input" value={paid.nombre}
                      placeholder={es?'Juan Pérez':'John Smith'}
                      onChange={e=>setPaid(p=>({...p,nombre:e.target.value}))}/>
                  </div>
                  <div>
                    <Lbl t="Email *"/>
                    <input type="email" className="field-input" value={paid.email}
                      placeholder={es?'tu@email.com':'you@email.com'}
                      onChange={e=>setPaid(p=>({...p,email:e.target.value}))}/>
                  </div>
                </div>

                <div>
                  <Lbl t={es?'Teléfono':'Phone'}/>
                  <input type="tel" className="field-input" value={paid.telefono}
                    placeholder={es?'+593 99 123 4567':'+1 555 123 4567'}
                    onChange={e=>setPaid(p=>({...p,telefono:e.target.value}))}/>
                </div>

                {!isBasico&&(
                  <div>
                    <Lbl t={es?'¿Tienes CV actual?':'Do you have a resume?'}/>
                    <div className="radio-row">
                      {[{v:'si',l:es?'Sí, tengo CV':'Yes'},{v:'no',l:es?'No, crear desde cero':'No, from scratch'}].map(o=>(
                        <label key={o.v} className={`radio-card${paid.tieneCV===o.v?' on':''}`}>
                          <input type="radio" name="tieneCV" value={o.v} checked={paid.tieneCV===o.v}
                            onChange={e=>setPaid(p=>({...p,tieneCV:e.target.value,cvFile:null}))}/>
                          <span style={{fontSize:13,fontWeight:500}}>{o.l}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {paid.tieneCV==='si'&&!isBasico&&(
                  <UpBox label={es?'Tu CV (PDF) *':'Resume (PDF) *'} fileKey="cvFile"/>
                )}

                {isPremium&&(
                  <div>
                    <div className="linkedin-hint">
                      <p style={{fontSize:12,fontWeight:600,color:'#6d28d9',marginBottom:6}}>📱 {es?'Cómo descargar tu LinkedIn:':'How to download LinkedIn:'}</p>
                      <ol style={{fontSize:12,color:'#64748b',paddingLeft:16,margin:0,lineHeight:1.9}}>
                        {(es
                          ?['Abre LinkedIn en tu navegador','Ve a tu perfil → click en "Más"','Selecciona "Guardar en PDF"','Sube el archivo aquí']
                          :['Open LinkedIn in your browser','Go to your profile → click "More"','Select "Save to PDF"','Upload the file here']
                        ).map((s,i)=><li key={i}>{s}</li>)}
                      </ol>
                    </div>
                    <UpBox label={es?'LinkedIn PDF *':'LinkedIn PDF *'} fileKey="linkedinFile" purple/>
                  </div>
                )}

                {showTC&&(
                  <div>
                    <Lbl t={es?'¿Para qué postulación?':'What type of application?'}/>
                    <div style={{display:'flex',flexDirection:'column',gap:8}}>
                      {[
                        {v:'especifico',l:es?'Para un puesto específico':'For a specific position',d:es?'CV + compatibilidad + carta personalizada':'Resume + compatibility + cover letter'},
                        {v:'general',   l:es?'General (mejorado)':'General (improved)',d:es?'CV optimizado para múltiples posiciones':'Optimized for multiple positions'},
                      ].map(o=>(
                        <label key={o.v} className={`radio-card${paid.tipoCV===o.v?' on':''}`} style={{flexDirection:'column',gap:4}}>
                          <div style={{display:'flex',gap:8,alignItems:'center'}}>
                            <input type="radio" name="tipoCV" value={o.v} checked={paid.tipoCV===o.v}
                              onChange={e=>setPaid(p=>({...p,tipoCV:e.target.value}))}/>
                            <span style={{fontSize:14,fontWeight:600,color:'var(--ink)'}}>{o.l}</span>
                          </div>
                          <p style={{fontSize:12,color:'#64748b',margin:'0 0 0 22px'}}>{o.d}</p>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {showPuesto&&(
                  <div style={{background:'#f0f9ff',border:'1px solid #bae6fd',borderRadius:14,padding:20,display:'flex',flexDirection:'column',gap:12}}>
                    <p style={{fontSize:11,fontWeight:700,color:'#0369a1',textTransform:'uppercase',letterSpacing:'.06em'}}>📌 {es?'Información del puesto':'Position info'}</p>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                      {[
                        {k:'puesto',    l:es?'Puesto *':'Position *',        p:es?'ej: Gerente de Ventas':'ex: Sales Manager',req:true},
                        {k:'industria', l:es?'Industria *':'Industry *',     p:es?'ej: Telecomunicaciones':'ex: Telecom',    req:true},
                        {k:'empresa',   l:es?'Empresa (opcional)':'Company', p:'ej: Claro',                                  req:false},
                        {k:'linkOferta',l:es?'Link oferta (opcional)':'Job link',p:'https://...',                            req:false,type:'url'},
                      ].map(f=>(
                        <div key={f.k}>
                          <label style={{display:'block',fontSize:11,fontWeight:600,color:'#0369a1',marginBottom:4}}>{f.l}</label>
                          <input required={f.req} type={f.type||'text'} value={paid[f.k]} placeholder={f.p}
                            onChange={e=>setPaid(p=>({...p,[f.k]:e.target.value}))}
                            style={{width:'100%',padding:'10px 12px',border:'1.5px solid #bae6fd',borderRadius:10,fontSize:13,background:'white',boxSizing:'border-box'}}/>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label style={{display:'block',fontSize:11,fontWeight:600,color:'#0369a1',marginBottom:4}}>{es?'Requisitos de la oferta *':'Job requirements *'}</label>
                      <div style={{background:'#fef3c7',border:'1px solid #fde68a',borderRadius:8,padding:'9px 12px',marginBottom:8,fontSize:12,color:'#92400e'}}>
                        📋 {es?'Pega la descripción — activa análisis de compatibilidad y carta personalizada.':'Paste the job description — activates compatibility analysis and cover letter.'}
                      </div>
                      <textarea required value={paid.requisitosOferta} onChange={onReq} rows={6}
                        placeholder={es?'Copia requisitos, responsabilidades y skills de la oferta...':'Copy requirements, responsibilities and skills...'}
                        style={{width:'100%',padding:'10px 12px',border:'1.5px solid #bae6fd',borderRadius:10,fontSize:13,background:'white',resize:'vertical',boxSizing:'border-box',fontFamily:'inherit'}}/>
                      <p style={{fontSize:11,color:'#64748b',marginTop:4}}>{es?'Palabras:':'Words:'} {rWords}</p>
                    </div>
                  </div>
                )}

                {paid.tipoRevision&&(
                  <div>
                    <Lbl t={isBasico
                      ?(es?'Tu experiencia profesional (max 1000 palabras) *':'Your professional experience (max 1000 words) *')
                      :(es?'Información adicional (max 500 palabras)':'Additional information (max 500 words)')}/>
                    <div style={{background:isBasico?'#f0fdf4':'#f8fafc',border:`1px solid ${isBasico?'#bbf7d0':'var(--border)'}`,borderRadius:10,padding:'10px 12px',marginBottom:8,fontSize:12,color:isBasico?'#065f46':'#64748b'}}>
                      {isBasico
                        ?(es?'📝 Incluye: empresas, puestos, fechas, logros, formación y habilidades. Sé detallado.':'📝 Include: companies, positions, dates, achievements, education and skills. Be detailed.')
                        :(es?'💡 Agrega logros recientes, proyectos o habilidades no en tu CV.':'💡 Add recent achievements, projects or skills not in your resume.')}
                    </div>
                    <textarea value={paid.infoAdicional} onChange={onInfo}
                      rows={isBasico?10:5}
                      placeholder={isBasico
                        ?(es?'Ejemplo:\n\nEXPERIENCIA:\n- Gerente de Ventas, ABC (2020-2024)\n  • Lideré equipo de 8 personas\n  • Aumenté ventas en 35%\n\nFORMACIÓN:\n- Ingeniería Comercial, ESPOL, 2016\n\nHABILIDADES:\n- Excel avanzado, Salesforce, Inglés B2':'Example:\n\nEXPERIENCE:\n- Sales Manager, ABC (2020-2024)\n  • Led team of 8\n  • Increased sales 35%\n\nEDUCATION:\n- Business Eng, 2016\n\nSKILLS:\n- Advanced Excel, Salesforce, English C1')
                        :(es?'Ejemplo: Actualmente lidero equipo de 12 personas, aumenté ventas B2B en 38%...':'Example: Currently leading team of 12, increased B2B sales 38%...')}
                      style={{width:'100%',padding:'11px 14px',border:'1.5px solid var(--border)',borderRadius:10,fontSize:13,resize:'vertical',fontFamily:'inherit',boxSizing:'border-box'}}/>
                    <p style={{fontSize:11,color:'#94a3b8',marginTop:4}}>
                      {es?'Palabras:':'Words:'} {iWords}/{isBasico?1000:500}
                    </p>
                  </div>
                )}

                <Checks lim={paidLim} setLim={setPaidLim} term={paidTerm} setTerm={setPaidTerm}/>
                <StatusBox s={paidOk}/>

                {/* FIX 6: botón nunca disabled por validación — JS maneja todo */}
                <button type="submit" className="btn btn-blue" disabled={paidBusy}>
                  {paidBusy?(es?'Enviando...':'Sending...'):`${es?'Solicitar':'Request'} ${pLabel[plan]}`}
                </button>

                <p style={{fontSize:11,color:'#94a3b8',textAlign:'center'}}>
                  {es?'Recibirás el link de pago en tu email en las próximas horas.':'You\'ll receive the payment link within the next few hours.'}
                </p>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* CÓMO FUNCIONA */}
      <section className="section-dark">
        <div className="container">
          <div style={{textAlign:'center',marginBottom:40}}>
            <span className="section-tag tag-dark">{es?'Cómo funciona':'How it works'}</span>
            <h2 className="section-h" style={{color:'white'}}>{es?'Simple, rápido, profesional':'Simple, fast, professional'}</h2>
          </div>
          <div className="steps-grid">
            {(es
              ?[{n:'01',t:'Sube tu CV',d:'Gratis o elige un servicio. Menos de 2 minutos.'},{n:'02',t:'IA analiza tu perfil',d:'Claude lee tu documento y genera un diagnóstico específico.'},{n:'03',t:'Recibes el resultado',d:'En tu email. Análisis, CV optimizado, carta y más.'}]
              :[{n:'01',t:'Upload your resume',d:'Free or choose a service. Less than 2 minutes.'},{n:'02',t:'AI analyzes your profile',d:'Claude reads your document and generates a specific diagnosis.'},{n:'03',t:'Receive the result',d:'In your email. Analysis, optimized resume, cover letter and more.'}]
            ).map((s,i)=>(
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:'Bricolage Grotesque,sans-serif',fontSize:32,fontWeight:800,color:'rgba(59,130,246,.25)',marginBottom:12}}>{s.n}</div>
                <h3 style={{fontSize:16,fontWeight:700,color:'white',marginBottom:8}}>{s.t}</h3>
                <p style={{fontSize:14,color:'rgba(255,255,255,.45)',lineHeight:1.6}}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{background:'linear-gradient(135deg,#1d4ed8,#4338ca)',padding:'60px 0',textAlign:'center'}}>
        <div className="container">
          <h2 style={{fontFamily:'Bricolage Grotesque,sans-serif',fontSize:'clamp(22px,4vw,36px)',color:'white',marginBottom:12,letterSpacing:'-.025em'}}>
            {es?'Sube tu CV y descubre qué está frenando tus entrevistas':'Upload your resume and find out what\'s holding back your interviews'}
          </h2>
          <p style={{fontSize:15,color:'rgba(255,255,255,.7)',marginBottom:24}}>
            {es?'Recibe tu análisis ATS gratis en minutos.':'Receive your free ATS analysis in minutes.'}
          </p>
          <button type="button" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
            style={{padding:'13px 32px',borderRadius:12,border:'2px solid white',background:'white',color:'#1d4ed8',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
            {es?'Recibir mi análisis gratis ↑':'Get my free analysis ↑'}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container" style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <span style={{fontSize:12,color:'rgba(255,255,255,.28)'}}>© 2026 Nocodia CV · Guayaquil, Ecuador</span>
          <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
            <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{fontSize:12,color:'rgba(255,255,255,.32)',textDecoration:'none'}}>{es?'Política de Privacidad':'Privacy Policy'}</a>
            <a href="mailto:jrgarcia@nocodia.net" style={{fontSize:12,color:'rgba(255,255,255,.32)',textDecoration:'none'}}>jrgarcia@nocodia.net</a>
          </div>
        </div>
        <div className="container" style={{marginTop:14,paddingTop:14,borderTop:'1px solid rgba(255,255,255,.06)'}}>
          <p style={{fontSize:10,color:'rgba(255,255,255,.18)',textAlign:'center',maxWidth:680,margin:'0 auto',lineHeight:1.6}}>
            {es?'Nocodia CV cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021). El servicio no garantiza resultados laborales específicos.'
               :"Nocodia CV complies with Ecuador's Organic Law on Personal Data Protection (LOPDP). The service does not guarantee specific employment results."}
          </p>
        </div>
      </footer>
    </>
  );
}
