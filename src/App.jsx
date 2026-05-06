import { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowDown } from 'lucide-react';

const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f9fafb; color: #111827; }
    .serif { font-family: 'DM Serif Display', serif; }
    input, textarea, select, button { font-family: inherit; }
    input:focus, textarea:focus { outline: none; border-color: #2563eb !important; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }
    @keyframes dash { from { stroke-dashoffset: 264; } to { stroke-dashoffset: 0; } }

    .fade-up { animation: fadeUp .5s ease both; }
    .d1 { animation-delay:.1s; } .d2 { animation-delay:.2s; } .d3 { animation-delay:.3s; } .d4 { animation-delay:.4s; }

    .upload-box { transition: all .2s; border: 2px dashed #d1d5db; border-radius: 12px; padding: 20px; text-align: center; cursor: pointer; background: #f9fafb; }
    .upload-box:hover { border-color: #2563eb; background: #eff6ff; }
    .upload-box.done { border-color: #10b981; background: #f0fdf4; }

    .plan-card { background: white; border: 2px solid #e5e7eb; border-radius: 20px; padding: 28px; transition: all .2s; cursor: pointer; }
    .plan-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.1); }
    .plan-card.active { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,.12); }

    .btn-primary { background: linear-gradient(135deg,#1d4ed8,#4f46e5); color: white; border: none; border-radius: 12px; padding: 15px 24px; font-size: 16px; font-weight: 700; cursor: pointer; transition: all .2s; width: 100%; }
    .btn-primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(37,99,235,.35); }
    .btn-primary:disabled { opacity: .5; cursor: not-allowed; }

    .score-circle { animation: dash 1.2s ease .3s both; }

    /* Mobile */
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .plans-grid { grid-template-columns: 1fr !important; }
      .steps-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

// ── MOCK SCREENSHOT del resultado ─────────────────────────────────────────────
const ResultPreview = ({ lang }) => (
  <div style={{ background:'white', borderRadius:16, boxShadow:'0 24px 64px rgba(0,0,0,.15)', overflow:'hidden', border:'1px solid #e5e7eb' }}>
    {/* Header mock email */}
    <div style={{ background:'#f3f4f6', padding:'10px 16px', display:'flex', alignItems:'center', gap:8, borderBottom:'1px solid #e5e7eb' }}>
      <div style={{ width:10, height:10, borderRadius:'50%', background:'#ef4444' }} />
      <div style={{ width:10, height:10, borderRadius:'50%', background:'#f59e0b' }} />
      <div style={{ width:10, height:10, borderRadius:'50%', background:'#10b981' }} />
      <span style={{ fontSize:11, color:'#9ca3af', marginLeft:8 }}>✅ {lang==='es'?'Tu Análisis de CV — Nocodia IA':'Your Resume Analysis — Nocodia AI'}</span>
    </div>

    <div style={{ padding:'24px 24px 20px' }}>
      {/* Brand */}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
        <div style={{ width:6, height:6, borderRadius:'50%', background:'#2563eb' }} />
        <span style={{ fontSize:13, fontWeight:700, color:'#2563eb' }}>Nocodia CV</span>
        <span style={{ fontSize:12, color:'#9ca3af' }}>· {lang==='es'?'Análisis IA':'AI Analysis'}</span>
      </div>

      {/* Score row */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20, padding:'16px', background:'#f8fafc', borderRadius:12 }}>
        <div style={{ position:'relative', width:64, height:64, flexShrink:0 }}>
          <svg viewBox="0 0 100 100" style={{ transform:'rotate(-90deg)', width:64, height:64 }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
            <circle className="score-circle" cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" strokeDasharray="200 264"/>
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:18, fontWeight:800, color:'#0c1220', lineHeight:1 }}>72</span>
            <span style={{ fontSize:9, color:'#9ca3af' }}>/100</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>ATS Score</div>
          <div style={{ fontSize:13, fontWeight:600, color:'#0c1220', marginBottom:2 }}>{lang==='es'?'"CV competitivo con mejoras clave"':'"Competitive resume with key improvements"'}</div>
          <div style={{ fontSize:11, color:'#6b7280' }}>{lang==='es'?'3 errores críticos detectados':'3 critical issues detected'}</div>
        </div>
      </div>

      {/* Fortalezas */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#0c1220', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>💪 {lang==='es'?'Puntos fuertes':'Strengths'}</div>
        {['Experiencia cuantificada con métricas reales (+38% FTTH, 99.8% uptime)', 'Progresión de carrera clara y coherente'].map((t,i) => (
          <div key={i} style={{ display:'flex', gap:6, alignItems:'flex-start', marginBottom:5 }}>
            <span style={{ color:'#10b981', fontSize:12, flexShrink:0, marginTop:1 }}>✓</span>
            <span style={{ fontSize:12, color:'#374151' }}>{lang==='es'?t:t}</span>
          </div>
        ))}
      </div>

      {/* Errores */}
      <div style={{ marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#0c1220', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>⚠️ {lang==='es'?'Errores críticos':'Critical issues'}</div>
        {[
          lang==='es'?'Perfil profesional genérico — no comunica tu propuesta de valor':'Generic professional profile — doesn\'t communicate your value proposition',
          lang==='es'?'Faltan keywords ATS del sector (NOC, FTTH, SLA, backbone)':'Missing sector ATS keywords (NOC, FTTH, SLA, backbone)',
        ].map((t,i) => (
          <div key={i} style={{ display:'flex', gap:6, alignItems:'flex-start', marginBottom:5 }}>
            <span style={{ color:'#ef4444', fontSize:12, flexShrink:0, marginTop:1 }}>✕</span>
            <span style={{ fontSize:12, color:'#374151' }}>{t}</span>
          </div>
        ))}
      </div>

      {/* CTA upsell en el email */}
      <div style={{ background:'linear-gradient(135deg,#eff6ff,#eef2ff)', borderRadius:10, padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ fontSize:12, color:'#1e40af', fontWeight:600 }}>
          {lang==='es'?'¿Quieres el CV optimizado?':'Want the optimized resume?'}
        </div>
        <div style={{ fontSize:13, fontWeight:800, color:'#2563eb' }}>$12 →</div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [lang, setLang] = useState('es');
  const plansRef = useRef(null);
  const paidRef  = useRef(null);

  // Free form
  const [free, setFree] = useState({ nombre:'', email:'', cvFile:null });
  const [freeOk, setFreeOk]     = useState(null);
  const [freeSending, setFreeSending] = useState(false);
  const [freeLimits, setFreeLimits]   = useState(false);
  const [freeTerms, setFreeTerms]     = useState(false);

  // Paid form
  const [plan, setPlan] = useState(null);
  const [paid, setPaid] = useState({
    nombre:'', email:'', telefono:'', tieneCV:'si', tipoRevision:'',
    tipoCV:'', puesto:'', empresa:'', industria:'', linkOferta:'',
    requisitosOferta:'', infoAdicional:'', cvFile:null, linkedinFile:null
  });
  const [paidOk, setPaidOk]       = useState(null);
  const [paidSending, setPaidSending] = useState(false);
  const [paidLimits, setPaidLimits]   = useState(false);
  const [paidTerms, setPaidTerms]     = useState(false);
  const [infoWords, setInfoWords] = useState(0);
  const [reqWords, setReqWords]   = useState(0);

  const es = lang === 'es';

  // ── Submit free ────────────────────────────────────────────────────────────
  const submitFree = async e => {
    e.preventDefault();
    setFreeSending(true); setFreeOk(null);
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
      setFreeOk(r.ok ? { ok:true, msg:j.message } : { ok:false, msg:j.error });
      if (r.ok) { setFree({ nombre:'', email:'', cvFile:null }); setFreeLimits(false); setFreeTerms(false); }
    } catch { setFreeOk({ ok:false, msg:'Error de conexión.' }); }
    finally { setFreeSending(false); }
  };

  // ── Submit paid ────────────────────────────────────────────────────────────
  const submitPaid = async e => {
    e.preventDefault();
    setPaidSending(true); setPaidOk(null);
    try {
      const fd = new FormData();
      Object.keys(paid).forEach(k => { if (paid[k]) fd.append(k, paid[k]); });
      fd.append('formLanguage', lang);
      const r = await fetch('https://nocodia-cv-worker.jraul-garcia.workers.dev/api/submit', { method:'POST', body:fd });
      const j = await r.json();
      setPaidOk(r.ok ? { ok:true, msg:j.message } : { ok:false, msg:j.error });
      if (r.ok) {
        setPaid({ nombre:'', email:'', telefono:'', tieneCV:'si', tipoRevision:plan, tipoCV:'', puesto:'', empresa:'', industria:'', linkOferta:'', requisitosOferta:'', infoAdicional:'', cvFile:null, linkedinFile:null });
        setInfoWords(0); setReqWords(0); setPaidLimits(false); setPaidTerms(false);
      }
    } catch { setPaidOk({ ok:false, msg:'Error de conexión.' }); }
    finally { setPaidSending(false); }
  };

  const choosePlan = id => {
    setPlan(id);
    setPaid(p => ({ ...p, tipoRevision: id, tipoCV:'', cvFile:null, linkedinFile:null }));
    setPaidOk(null);
    setTimeout(() => paidRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 80);
  };

  const onInfo = e => {
    const txt = e.target.value;
    const limit = paid.tieneCV==='no' ? 1000 : 500;
    const w = txt.trim().split(/\s+/).filter(Boolean).length;
    if (w <= limit) { setPaid(p=>({...p,infoAdicional:txt})); setInfoWords(w); }
  };
  const onReq = e => {
    const txt = e.target.value;
    setPaid(p=>({...p,requisitosOferta:txt}));
    setReqWords(txt.trim().split(/\s+/).filter(Boolean).length);
  };

  const plans = [
    { id:'especializada', price:'$12', badge:null,
      title: es?'Especializada':'Specialized',
      headline: es?'CV adaptado a una vacante real':'Resume tailored to a real job posting',
      items: es
        ? ['CV reescrito y optimizado ATS','Análisis de compatibilidad con la oferta','Carta de presentación personalizada','Keywords ATS integradas','Tips LinkedIn']
        : ['Rewritten ATS-optimized resume','Compatibility analysis with the job','Personalized cover letter','ATS keywords integrated','LinkedIn tips'],
      color:'#4f46e5' },
    { id:'basico', price:'$15', badge:null,
      title: es?'Básico':'Basic',
      headline: es?'Te construimos el CV desde cero':'We build your resume from scratch',
      items: es
        ? ['CV profesional completo','Redactado con tu experiencia','Formato ATS optimizado','Listo para postular']
        : ['Complete professional resume','Written with your experience','ATS-optimized format','Ready to apply'],
      color:'#7c3aed' },
    { id:'premium', price:'$20', badge: es?'⭐ RECOMENDADO':'⭐ RECOMMENDED',
      title:'Premium',
      headline: es?'Postulación bilingüe completa':'Complete bilingual application',
      items: es
        ? ['Todo lo de Especializada','CV en Español + Inglés','Carta en Español + Inglés','LinkedIn PDF analizado','Headline + About LinkedIn ES & EN']
        : ['Everything in Specialized','Resume in Spanish + English','Cover letter in Spanish + English','LinkedIn PDF analyzed','Headline + About LinkedIn ES & EN'],
      color:'#2563eb' },
  ];

  const showTipoCV  = ['especializada','premium'].includes(paid.tipoRevision);
  const showPuesto  = paid.tipoCV === 'especifico';
  const isPremium   = paid.tipoRevision === 'premium';
  const isBasico    = paid.tipoRevision === 'basico';
  const planLabel   = { especializada: es?'Especializada $12':'Specialized $12', basico: es?'Básico $15':'Basic $15', premium:'Premium $20' };

  const field = (label, key, type='text', req=true, placeholder='') => (
    <div>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:5 }}>{label}</label>
      <input required={req} type={type} value={paid[key]} placeholder={placeholder}
        onChange={e => setPaid(p=>({...p,[key]:e.target.value}))}
        style={{ width:'100%', padding:'11px 14px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14, background:'white' }} />
    </div>
  );

  const uploadBox = (label, key, req=true, purple=false) => (
    <div>
      <label style={{ display:'block', fontSize:11, fontWeight:700, color: purple?'#6d28d9':'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:5 }}>{label}</label>
      <label className={`upload-box ${paid[key]?'done':''}`}
        style={{ borderColor: paid[key]?'#10b981': purple?'#c4b5fd':'#d1d5db', background: paid[key]?'#f0fdf4': purple?'#faf5ff':'#f9fafb' }}>
        <Upload size={18} color={paid[key]?'#10b981':purple?'#8b5cf6':'#9ca3af'} style={{ margin:'0 auto 6px', display:'block' }} />
        <div style={{ fontSize:13, fontWeight:600, color: paid[key]?'#059669':purple?'#7c3aed':'#2563eb' }}>
          {paid[key] ? `✓ ${paid[key].name}` : (es?'Haz click o arrastra aquí':'Click or drag here')}
        </div>
        <div style={{ fontSize:11, color:'#9ca3af', marginTop:2 }}>PDF · Max 5MB</div>
        <input required={req} type="file" accept=".pdf" style={{ display:'none' }}
          onChange={e => { if(e.target.files[0]) setPaid(p=>({...p,[key]:e.target.files[0]})); }} />
      </label>
    </div>
  );

  const checks = (limits, setLimits, terms, setTerms) => (
    <div style={{ display:'flex', flexDirection:'column', gap:8, paddingTop:12, borderTop:'1px solid #f3f4f6' }}>
      {[
        { v:limits, fn:setLimits,
          text: es
            ? 'Entiendo que Nocodia CV optimiza documentos y no garantiza entrevistas ni resultados laborales.'
            : 'I understand Nocodia CV optimizes documents and does not guarantee interviews or employment results.' },
        { v:terms, fn:setTerms,
          text: null, link: true },
      ].map((c,i) => (
        <label key={i} style={{ display:'flex', gap:8, cursor:'pointer', alignItems:'flex-start' }}>
          <input type="checkbox" required checked={c.v} onChange={e=>c.fn(e.target.checked)} style={{ marginTop:2, flexShrink:0 }} />
          <span style={{ fontSize:11, color:'#6b7280', lineHeight:1.5 }}>
            {c.link
              ? <>{es?'Acepto la ':'I accept the '}<a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ color:'#2563eb' }}>{es?'Política de Privacidad':'Privacy Policy'}</a>{es?' y el tratamiento de mis datos conforme a la LOPDP Ecuador.':' and the processing of my data in accordance with Ecuador\'s LOPDP.'}</>
              : c.text}
          </span>
        </label>
      ))}
    </div>
  );

  const statusBox = s => s && (
    <div style={{ padding:'11px 14px', borderRadius:10, background:s.ok?'#f0fdf4':'#fef2f2', border:`1px solid ${s.ok?'#bbf7d0':'#fecaca'}`, fontSize:13, color:s.ok?'#065f46':'#991b1b', display:'flex', gap:8, alignItems:'flex-start' }}>
      {s.ok ? <CheckCircle size={14} style={{ flexShrink:0, marginTop:1 }} /> : <AlertCircle size={14} style={{ flexShrink:0, marginTop:1 }} />}
      {s.msg}
    </div>
  );

  return (
    <>
      <FontLink />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(255,255,255,0.95)', backdropFilter:'blur(10px)', borderBottom:'1px solid #f3f4f6' }}>
        <div style={{ maxWidth:1080, margin:'0 auto', padding:'0 20px', height:56, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span className="serif" style={{ fontSize:18, color:'#111827', letterSpacing:'-0.02em' }}>Nocodia CV</span>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'flex', gap:4 }}>
              {['es','en'].map(l=>(
                <button key={l} onClick={()=>setLang(l)}
                  style={{ padding:'4px 10px', borderRadius:6, border:'none', cursor:'pointer', fontSize:12, fontWeight:600, fontFamily:'inherit', background:lang===l?'#2563eb':'#f3f4f6', color:lang===l?'white':'#6b7280', transition:'all .15s' }}>
                  {l==='es'?'🇪🇸 ES':'🇬🇧 EN'}
                </button>
              ))}
            </div>
            <a href="mailto:jrgarcia@nocodia.net" style={{ fontSize:12, color:'#6b7280', textDecoration:'none' }}>jrgarcia@nocodia.net</a>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section style={{ background:'linear-gradient(160deg,#0f172a 0%,#1e3a5f 60%,#0f172a 100%)', padding:'64px 20px 80px' }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>

          {/* Headline */}
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="fade-up" style={{ display:'inline-block', background:'rgba(59,130,246,0.15)', border:'1px solid rgba(59,130,246,0.3)', borderRadius:20, padding:'5px 14px', fontSize:11, fontWeight:700, color:'#93c5fd', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:20 }}>
              IA · {es?'Análisis profesional':'Professional analysis'}
            </div>
            <h1 className="serif fade-up d1" style={{ fontSize:'clamp(32px,5vw,52px)', color:'white', margin:'0 0 16px', lineHeight:1.1, letterSpacing:'-0.03em' }}>
              {es?<>¿Tu CV está siendo<br/><span style={{color:'#60a5fa'}}>ignorado?</span></>:<>Is your resume being<br/><span style={{color:'#60a5fa'}}>ignored?</span></>}
            </h1>
            <p className="fade-up d2" style={{ fontSize:16, color:'rgba(255,255,255,0.65)', maxWidth:440, margin:'0 auto 24px', lineHeight:1.7 }}>
              {es
                ? 'Analízalo gratis con IA y descubre exactamente qué está frenando tus oportunidades.'
                : 'Analyze it free with AI and discover exactly what\'s holding back your opportunities.'}
            </p>
            <div className="fade-up d3" style={{ display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap' }}>
              {(es
                ? ['Errores ATS que te dejan fuera','Keywords faltantes en tu sector','Compatibilidad con vacantes reales','Acciones concretas para mejorar hoy']
                : ['ATS errors keeping you out','Missing keywords in your field','Compatibility with real job postings','Concrete actions to improve today']
              ).map((b,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'rgba(255,255,255,0.75)' }}>
                  <span style={{ width:18, height:18, borderRadius:'50%', background:'rgba(16,185,129,0.25)', border:'1px solid rgba(16,185,129,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, flexShrink:0 }}>✓</span>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* 2-col: screenshot + form */}
          <div className="hero-grid fade-up d3" style={{ display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:32, alignItems:'start' }}>

            {/* Screenshot */}
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>
                👇 {es?'Esto es lo que recibes':'This is what you receive'}
              </div>
              <ResultPreview lang={lang} />
            </div>

            {/* Free form */}
            <div>
              <form onSubmit={submitFree} style={{ background:'white', borderRadius:20, padding:28, boxShadow:'0 24px 48px rgba(0,0,0,.3)' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#10b981', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>
                  {es?'Gratis · Sin costo':'Free · No cost'}
                </div>
                <h2 className="serif" style={{ fontSize:22, color:'#111827', margin:'0 0 20px', letterSpacing:'-0.02em' }}>
                  {es?'Analiza tu CV gratis':'Analyze your resume free'}
                </h2>

                <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                  {[
                    { key:'nombre', label:es?'Tu nombre':'Your name', placeholder:es?'Juan Pérez':'John Smith', type:'text' },
                    { key:'email',  label:'Email', placeholder:es?'tu@email.com':'you@email.com', type:'email' },
                  ].map(f=>(
                    <div key={f.key}>
                      <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:5 }}>{f.label}</label>
                      <input required type={f.type} value={free[f.key]} placeholder={f.placeholder}
                        onChange={e=>setFree(p=>({...p,[f.key]:e.target.value}))}
                        style={{ width:'100%', padding:'11px 14px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:14 }} />
                    </div>
                  ))}

                  <div>
                    <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:5 }}>
                      {es?'Sube tu CV (PDF)':'Upload your resume (PDF)'}
                    </label>
                    <label className={`upload-box ${free.cvFile?'done':''}`}>
                      <Upload size={18} color={free.cvFile?'#10b981':'#9ca3af'} style={{ margin:'0 auto 5px', display:'block' }} />
                      <div style={{ fontSize:13, fontWeight:600, color:free.cvFile?'#059669':'#2563eb' }}>
                        {free.cvFile?`✓ ${free.cvFile.name}`:(es?'Haz click aquí':'Click here')}
                      </div>
                      <div style={{ fontSize:11, color:'#9ca3af', marginTop:1 }}>PDF · {es?'Máx 5MB':'Max 5MB'}</div>
                      <input required type="file" accept=".pdf" style={{ display:'none' }}
                        onChange={e=>{ if(e.target.files[0]) setFree(p=>({...p,cvFile:e.target.files[0]})); }} />
                    </label>
                  </div>

                  {checks(freeLimits, setFreeLimits, freeTerms, setFreeTerms)}
                  {statusBox(freeOk)}

                  <button type="submit" className="btn-primary" disabled={freeSending||!freeTerms||!freeLimits}>
                    {freeSending?(es?'Analizando...':'Analyzing...'):(es?'Analizar mi CV gratis →':'Analyze my resume free →')}
                  </button>

                  <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', margin:0 }}>
                    {es?'Sin costo · Entrega por email · 100% confidencial':'No cost · Email delivery · 100% confidential'}
                  </p>
                </div>
              </form>

              {/* Arrow to plans */}
              <button onClick={()=>plansRef.current?.scrollIntoView({behavior:'smooth'})}
                style={{ display:'flex', alignItems:'center', gap:6, margin:'16px auto 0', background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(255,255,255,0.5)' }}>
                <ArrowDown size={14}/> {es?'Ver servicios pagados':'See paid services'}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── PLANS ──────────────────────────────────────────────────────────── */}
      <section ref={plansRef} style={{ background:'#f9fafb', padding:'72px 20px' }}>
        <div style={{ maxWidth:1080, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-block', background:'#fef3c7', color:'#92400e', borderRadius:20, padding:'4px 12px', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:12 }}>
              {es?'¿Quieres ir más allá?':'Want to go further?'}
            </div>
            <h2 className="serif" style={{ fontSize:'clamp(26px,4vw,38px)', color:'#111827', margin:'0 0 10px', letterSpacing:'-0.02em' }}>
              {es?'Para una postulación más fuerte':'For a stronger application'}
            </h2>
            <p style={{ fontSize:15, color:'#6b7280', maxWidth:480, margin:'0 auto' }}>
              {es
                ? 'Servicios diseñados para candidatos que quieren resultados reales.'
                : 'Services designed for candidates who want real results.'}
            </p>
          </div>

          <div className="plans-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {plans.map(p=>(
              <div key={p.id} className={`plan-card ${plan===p.id?'active':''}`} onClick={()=>choosePlan(p.id)}
                style={{ borderColor: plan===p.id?p.color:'#e5e7eb', position:'relative' }}>
                {p.badge && (
                  <div style={{ position:'absolute', top:14, right:14, background:'#fbbf24', color:'#78350f', fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:6 }}>{p.badge}</div>
                )}
                <div style={{ fontSize:10, fontWeight:700, color:p.color, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{p.title}</div>
                <div className="serif" style={{ fontSize:36, color:'#111827', marginBottom:6 }}>{p.price}</div>
                <p style={{ fontSize:14, fontWeight:600, color:'#374151', margin:'0 0 16px', lineHeight:1.4 }}>{p.headline}</p>
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:7, marginBottom:20 }}>
                  {p.items.map((item,i)=>(
                    <li key={i} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13, color:'#4b5563' }}>
                      <span style={{ color:p.color, flexShrink:0, marginTop:1 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <button style={{ width:'100%', padding:'11px', borderRadius:10, border:`1.5px solid ${p.color}`, background:plan===p.id?p.color:'transparent', color:plan===p.id?'white':p.color, fontSize:13, fontWeight:700, cursor:'pointer', transition:'all .2s', fontFamily:'inherit' }}>
                  {plan===p.id?(es?'✓ Seleccionado':'✓ Selected'):(es?'Solicitar este →':'Request this →')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAID FORM ──────────────────────────────────────────────────────── */}
      {plan && (
        <section ref={paidRef} style={{ background:'white', padding:'56px 20px', borderTop:`3px solid ${plans.find(p=>p.id===plan)?.color||'#2563eb'}` }}>
          <div style={{ maxWidth:640, margin:'0 auto' }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:6 }}>{es?'Completa tu solicitud':'Complete your request'}</div>
              <h2 className="serif" style={{ fontSize:26, color:'#111827', letterSpacing:'-0.02em' }}>{planLabel[plan]}</h2>
            </div>

            <form onSubmit={submitPaid} style={{ display:'flex', flexDirection:'column', gap:18 }}>

              {/* Datos básicos */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {field(es?'Nombre completo *':'Full name *','nombre','text',true,es?'Juan Pérez':'John Smith')}
                {field('Email *','email','email',true,es?'tu@email.com':'you@email.com')}
              </div>
              {field(es?'Teléfono':'Phone','telefono','tel',false,es?'+593 99 123 4567':'+1 555 123 4567')}

              {/* ¿Tiene CV? solo para no-basico */}
              {!isBasico && (
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8 }}>{es?'¿Tienes CV actual?':'Do you have a resume?'}</label>
                  <div style={{ display:'flex', gap:10 }}>
                    {[{v:'si',l:es?'Sí, tengo CV':'Yes'},{v:'no',l:es?'No, necesito crearlo':'No, create from scratch'}].map(o=>(
                      <label key={o.v} style={{ flex:1, display:'flex', alignItems:'center', gap:8, padding:'11px 14px', border:`1.5px solid ${paid.tieneCV===o.v?'#2563eb':'#e5e7eb'}`, borderRadius:10, cursor:'pointer', fontSize:13, fontWeight:500, background:paid.tieneCV===o.v?'#eff6ff':'white' }}>
                        <input type="radio" name="tieneCV" value={o.v} checked={paid.tieneCV===o.v} onChange={e=>setPaid(p=>({...p,tieneCV:e.target.value,cvFile:null}))} />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload CV */}
              {paid.tieneCV==='si' && !isBasico && uploadBox(es?'Sube tu CV (PDF) *':'Upload resume (PDF) *','cvFile')}

              {/* Upload LinkedIn */}
              {isPremium && (
                <div>
                  <div style={{ background:'#faf5ff', border:'1px solid #ddd6fe', borderRadius:10, padding:'12px 14px', marginBottom:10 }}>
                    <p style={{ fontSize:12, fontWeight:600, color:'#6d28d9', margin:'0 0 6px' }}>📱 {es?'Cómo descargar tu LinkedIn:':'How to download your LinkedIn:'}</p>
                    <ol style={{ fontSize:12, color:'#64748b', paddingLeft:16, margin:0, lineHeight:1.8 }}>
                      {(es
                        ?['Abre LinkedIn en tu navegador','Ve a tu perfil → click en "Más"','Selecciona "Guardar en PDF"','Sube el archivo aquí ⬇️']
                        :['Open LinkedIn in your browser','Go to your profile → click "More"','Select "Save to PDF"','Upload the file here ⬇️']
                      ).map((s,i)=><li key={i}>{s}</li>)}
                    </ol>
                  </div>
                  {uploadBox(es?'LinkedIn PDF *':'LinkedIn PDF *','linkedinFile',true,true)}
                </div>
              )}

              {/* Tipo CV */}
              {showTipoCV && (
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:8 }}>{es?'¿Para qué postulación?':'What type of application?'}</label>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {[
                      {v:'especifico',l:es?'Para un puesto específico':'For a specific position',d:es?'CV + análisis de compatibilidad + carta personalizada':'Resume + compatibility analysis + personalized cover letter'},
                      {v:'general',   l:es?'General (mejorado)':'General (improved)',          d:es?'CV optimizado para múltiples posiciones':'Optimized resume for multiple positions'},
                    ].map(o=>(
                      <label key={o.v} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'13px 15px', border:`1.5px solid ${paid.tipoCV===o.v?'#2563eb':'#e5e7eb'}`, borderRadius:10, cursor:'pointer', background:paid.tipoCV===o.v?'#eff6ff':'white' }}>
                        <input required type="radio" name="tipoCV" value={o.v} checked={paid.tipoCV===o.v} onChange={e=>setPaid(p=>({...p,tipoCV:e.target.value}))} style={{ marginTop:2 }} />
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:'#111827' }}>{o.l}</div>
                          <div style={{ fontSize:12, color:'#6b7280', marginTop:2 }}>{o.d}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Puesto + requisitos */}
              {showPuesto && (
                <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:12, padding:20, display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#0369a1', textTransform:'uppercase', letterSpacing:'0.06em' }}>📌 {es?'Información del puesto':'Position info'}</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {[
                      {key:'puesto',    label:es?'Puesto *':'Position *',   placeholder:es?'ej: Gerente de Ventas':'ex: Sales Manager',  req:true},
                      {key:'industria', label:es?'Industria *':'Industry *', placeholder:es?'ej: Telecomunicaciones':'ex: Telecom',        req:true},
                      {key:'empresa',   label:es?'Empresa (opcional)':'Company (optional)', placeholder:'ej: Claro',                       req:false},
                      {key:'linkOferta',label:es?'Link oferta (opcional)':'Job link (optional)', placeholder:'https://...',               req:false, type:'url'},
                    ].map(f=>(
                      <div key={f.key}>
                        <label style={{ display:'block', fontSize:11, fontWeight:600, color:'#0369a1', marginBottom:4 }}>{f.label}</label>
                        <input required={f.req} type={f.type||'text'} value={paid[f.key]} placeholder={f.placeholder}
                          onChange={e=>setPaid(p=>({...p,[f.key]:e.target.value}))}
                          style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #bae6fd', borderRadius:8, fontSize:13, background:'white', boxSizing:'border-box' }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:11, fontWeight:600, color:'#0369a1', marginBottom:4 }}>{es?'Requisitos del puesto *':'Job requirements *'}</label>
                    <div style={{ background:'#fef3c7', border:'1px solid #fde68a', borderRadius:8, padding:'9px 12px', marginBottom:8, fontSize:12, color:'#92400e' }}>
                      📋 {es?'Pega aquí la descripción — activa el análisis de compatibilidad y la carta personalizada.':'Paste the job description — activates compatibility analysis and personalized cover letter.'}
                    </div>
                    <textarea required value={paid.requisitosOferta} onChange={onReq} rows={6}
                      placeholder={es?'Copia los requisitos, responsabilidades y skills de la oferta...':'Copy the requirements, responsibilities and skills from the job posting...'}
                      style={{ width:'100%', padding:'10px 12px', border:'1.5px solid #bae6fd', borderRadius:8, fontSize:13, background:'white', resize:'vertical', boxSizing:'border-box', fontFamily:'inherit' }} />
                    <div style={{ fontSize:11, color:'#6b7280', marginTop:3 }}>{es?'Palabras:':'Words:'} {reqWords}</div>
                  </div>
                </div>
              )}

              {/* Info adicional / desde cero */}
              {paid.tipoRevision && (
                <div>
                  <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:6 }}>
                    {paid.tieneCV==='no'
                      ? (es?'Tu experiencia profesional (max 1000 palabras) *':'Your professional experience (max 1000 words) *')
                      : (es?'Información adicional (max 500 palabras)':'Additional information (max 500 words)')}
                  </label>
                  <div style={{ background:paid.tieneCV==='no'?'#f0fdf4':'#f8fafc', border:`1px solid ${paid.tieneCV==='no'?'#bbf7d0':'#e5e7eb'}`, borderRadius:8, padding:'9px 12px', marginBottom:8, fontSize:12, color:paid.tieneCV==='no'?'#065f46':'#6b7280' }}>
                    {paid.tieneCV==='no'
                      ? (es?'📝 Incluye: empresas donde trabajaste, puestos, fechas, logros, estudios y habilidades. Sé lo más detallado posible.':'📝 Include: companies, positions, dates, achievements, education and skills. Be as detailed as possible.')
                      : (es?'💡 Agrega logros recientes, proyectos o habilidades que no están en tu CV.':'💡 Add recent achievements, projects or skills not in your resume.')}
                  </div>
                  <textarea value={paid.infoAdicional} onChange={onInfo}
                    rows={paid.tieneCV==='no'?10:5}
                    required={paid.tieneCV==='no'}
                    placeholder={paid.tieneCV==='no'
                      ?(es?'Ejemplo:\n\nEXPERIENCIA:\n- Gerente de Ventas en Empresa ABC (2020-2024)\n  • Lideré equipo de 8 personas\n  • Aumenté ventas en 35%\n\nFORMACIÓN:\n- Ingeniería Comercial, ESPOL, 2016\n\nHABILIDADES:\n- Excel, Salesforce, Inglés B2':'Example:\n\nEXPERIENCE:\n- Sales Manager, ABC Corp (2020-2024)\n  • Led team of 8\n  • Increased sales 35%\n\nEDUCATION:\n- Business Eng, 2016\n\nSKILLS:\n- Excel, Salesforce, English C1')
                      :(es?'Ejemplo: Actualmente lidero equipo de 12 personas, aumenté ventas B2B en 38% en Q1 2026...':'Example: Currently leading team of 12, increased B2B sales by 38% in Q1 2026...')}
                    style={{ width:'100%', padding:'11px 14px', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:13, resize:'vertical', fontFamily:'inherit', boxSizing:'border-box' }} />
                  <div style={{ fontSize:11, color:'#9ca3af', marginTop:3 }}>{es?'Palabras:':'Words:'} {infoWords}/{paid.tieneCV==='no'?1000:500}</div>
                </div>
              )}

              {checks(paidLimits, setPaidLimits, paidTerms, setPaidTerms)}
              {statusBox(paidOk)}

              <button type="submit" className="btn-primary" disabled={paidSending||!paidTerms||!paidLimits}>
                {paidSending?(es?'Enviando...':'Sending...'):`${es?'Solicitar':'Request'} ${planLabel[plan]}`}
              </button>

              <p style={{ fontSize:11, color:'#9ca3af', textAlign:'center', margin:0 }}>
                {es?'Recibirás el link de pago en tu email en las próximas horas.':'You\'ll receive the payment link in your email within the next few hours.'}
              </p>
            </form>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section style={{ background:'#0f172a', padding:'64px 20px' }}>
        <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center' }}>
          <h2 className="serif" style={{ fontSize:'clamp(24px,4vw,36px)', color:'white', margin:'0 0 40px', letterSpacing:'-0.02em' }}>
            {es?'Simple, rápido, profesional':'Simple, fast, professional'}
          </h2>
          <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
            {(es
              ?[{n:'01',t:'Sube tu CV',d:'Gratis o elige un servicio. Menos de 2 minutos.'},{n:'02',t:'IA analiza tu perfil',d:'Claude lee tu CV real y genera un diagnóstico personalizado.'},{n:'03',t:'Recibe el resultado',d:'En tu email. Análisis, CV optimizado, carta y más.'}]
              :[{n:'01',t:'Upload your resume',d:'Free or choose a service. Less than 2 minutes.'},{n:'02',t:'AI analyzes your profile',d:'Claude reads your real resume and generates a personalized diagnosis.'},{n:'03',t:'Receive the result',d:'In your email. Analysis, optimized resume, cover letter and more.'}]
            ).map((s,i)=>(
              <div key={i}>
                <div className="serif" style={{ fontSize:32, color:'rgba(59,130,246,0.3)', marginBottom:10 }}>{s.n}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:'white', margin:'0 0 8px' }}>{s.t}</h3>
                <p style={{ fontSize:13, color:'rgba(255,255,255,0.45)', margin:0, lineHeight:1.6 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background:'linear-gradient(135deg,#1d4ed8,#4f46e5)', padding:'60px 20px', textAlign:'center' }}>
        <h2 className="serif" style={{ fontSize:'clamp(24px,4vw,36px)', color:'white', margin:'0 0 12px', letterSpacing:'-0.02em' }}>
          {es?'Empieza gratis hoy':'Start free today'}
        </h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,0.75)', margin:'0 0 24px' }}>
          {es?'Descubre qué está frenando tus oportunidades — en minutos.':'Find out what\'s holding back your opportunities — in minutes.'}
        </p>
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}
          style={{ padding:'13px 32px', borderRadius:12, border:'2px solid white', background:'white', color:'#1d4ed8', fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
          {es?'Analizar mi CV gratis ↑':'Analyze my resume free ↑'}
        </button>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background:'#080d18', padding:'28px 20px' }}>
        <div style={{ maxWidth:1080, margin:'0 auto', display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:12 }}>
          <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>© 2026 Nocodia CV · Guayaquil, Ecuador</span>
          <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
            <a href="/politica-privacidad.html" target="_blank" rel="noopener noreferrer" style={{ fontSize:12, color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>{es?'Política de Privacidad':'Privacy Policy'}</a>
            <a href="mailto:jrgarcia@nocodia.net" style={{ fontSize:12, color:'rgba(255,255,255,0.35)', textDecoration:'none' }}>jrgarcia@nocodia.net</a>
          </div>
        </div>
        <p style={{ fontSize:10, color:'rgba(255,255,255,0.18)', textAlign:'center', maxWidth:700, margin:'16px auto 0', lineHeight:1.6 }}>
          {es
            ?'Nocodia CV cumple con la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP, R.O. 459 — 26/05/2021). El servicio no garantiza resultados laborales específicos.'
            :"Nocodia CV complies with Ecuador's Organic Law on Personal Data Protection (LOPDP). The service does not guarantee specific employment results."}
        </p>
      </footer>
    </>
  );
}
