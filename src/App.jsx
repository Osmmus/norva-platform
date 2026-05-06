import { useState, useEffect, createContext, useContext } from "react";
import { LayoutDashboard, FileText, Target, BookOpen, Star, Calendar, DollarSign, TrendingUp, Users, Phone, BarChart3, Activity, LogOut, Bell, ArrowUpRight, ArrowDownRight, Clock, Bot, Sun, Moon, UserPlus, Shield, Check, ChevronDown, MessageCircle } from "lucide-react";

const ThemeCtx = createContext({});
const useTheme = () => useContext(ThemeCtx);

function getC(dark) {
  return dark ? {
    bg:"#0a1a10", card:"#0f2318", border:"#1a3d28", accent:"#2D6A4F",
    accentL:"#52B788", accentG:"#C9963A", gold:"#C9963A", green:"#52B788",
    red:"#ef4444", text:"#f1f5f9", muted:"#7d9e8d", sidebar:"#081510",
    purple:"#C9963A", inputBg:"#07120a", cardHover:"#132a1c"
  } : {
    bg:"#f0f7f4", card:"#ffffff", border:"#c8ddd4", accent:"#2D6A4F",
    accentL:"#1B4332", accentG:"#C9963A", gold:"#B87D28", green:"#2D6A4F",
    red:"#dc2626", text:"#1e293b", muted:"#64748b", sidebar:"#e6f4ee",
    purple:"#C9963A", inputBg:"#f8fdf9", cardHover:"#ecf5ef"
  };
}

// ─── PLANOS COM LINKS MERCADO PAGO ─────────────────────────
const PLANS = [
  {
    id: "essencial",
    label: "Essencial",
    price: 19.90,
    link: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=7e92478e255f4f1dab81610e74cbd293",
    features: [
      "Dashboard financeiro completo",
      "Relatório com IA mensal",
      "Conteúdo educacional",
      "Metas financeiras",
    ],
  },
  {
    id: "progresso",
    label: "Progresso",
    price: 59.90,
    popular: true,
    link: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=6b0cb448d52243f3b746831c1add655e",
    features: [
      "Tudo do Essencial",
      "Relatórios ilimitados com IA",
      "Parceiros com descontos exclusivos",
      "1 consultoria por mês",
      "Suporte prioritário",
    ],
  },
  {
    id: "prime",
    label: "Prime",
    price: 119.90,
    link: "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=f6352678153946309699a32c875f6f04",
    features: [
      "Tudo do Progresso",
      "Consultorias quinzenais (2x/mês)",
      "Planejamento financeiro personalizado",
      "Acesso antecipado a novidades",
      "Grupo VIP exclusivo",
      "Atendimento dedicado",
    ],
  },
];

const MOCK_ACCOUNTS = [
  { id:1, email:"joao.silva@gmail.com",    name:"João Silva",    role:"client",     plan:"Prime",     avatar:"JS" },
  { id:2, email:"carlos.vendas@gmail.com", name:"Carlos Mendes", role:"vendor",     plan:null,        avatar:"CM" },
  { id:3, email:"ana.consult@gmail.com",   name:"Ana Ferreira",  role:"consultant", plan:null,        avatar:"AF" },
  { id:4, email:"avenida17demarco@gmail.com", name:"Admin Norva", role:"admin",     plan:null,        avatar:"AN" },
];

// ─── LOGO ──────────────────────────────────────────────────
function NorvaLogo({ size = "md", C }) {
  const s = size === "sm" ? 28 : size === "lg" ? 52 : 38;
  const fs = size === "sm" ? 14 : size === "lg" ? 22 : 17;
  return (
    <div style={{ display:"flex", alignItems:"center", gap: size === "lg" ? 14 : 10 }}>
      <svg width={s} height={s} viewBox="0 0 100 100">
        <defs>
          <linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D6A4F"/>
            <stop offset="100%" stopColor="#C9963A"/>
          </linearGradient>
        </defs>
        <polyline points="75,10 20,10 20,90 75,90" fill="none" stroke="url(#ng)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="65,28 36,28 36,72 65,72" fill="none" stroke="url(#ng)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75"/>
        <rect x="44" y="40" width="20" height="20" fill="none" stroke="url(#ng)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      </svg>
      <div>
        <div style={{ fontSize: fs, fontWeight:900, letterSpacing:.5, lineHeight:1 }}>
          <span style={{ background:"linear-gradient(135deg,#2D6A4F,#C9963A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>NORVA</span>
        </div>
        <div style={{ fontSize: size === "lg" ? 11 : 8, color: C.muted, letterSpacing:2, fontWeight:600 }}>CONSULTORIA</div>
      </div>
    </div>
  );
}

// ─── UTILS ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, trend, C }) {
  color = color || C.accent;
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
        <div style={{ background:`${color}20`, borderRadius:8, padding:8 }}><Icon size={16} color={color}/></div>
        {trend !== undefined && <span style={{ fontSize:11, color:trend>=0?C.green:C.red, fontWeight:700 }}>{trend>=0?"▲":"▼"} {Math.abs(trend)}%</span>}
      </div>
      <div style={{ fontSize:20, fontWeight:700, marginBottom:2, color:C.text }}>{value}</div>
      <div style={{ fontSize:11, color:C.muted }}>{label}</div>
      {sub && <div style={{ fontSize:10, color:C.muted, marginTop:3 }}>{sub}</div>}
    </div>
  );
}

function Title({ children, C }) {
  return <h2 style={{ fontSize:17, fontWeight:700, marginBottom:16, color:C.text, marginTop:0 }}>{children}</h2>;
}

function Bar({ pct, color }) {
  return (
    <div style={{ background:"#e2e8f022", borderRadius:20, height:7, overflow:"hidden" }}>
      <div style={{ width:`${Math.min(pct,100)}%`, background:color, height:"100%", borderRadius:20 }}/>
    </div>
  );
}

const badge = (color) => ({ background:`${color}22`, color, padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:700, whiteSpace:"nowrap" });
const btn = (color="#2D6A4F") => ({ background:`linear-gradient(135deg, ${color}, ${color}cc)`, color:"#fff", border:"none", borderRadius:8, padding:"9px 16px", cursor:"pointer", fontSize:13, fontWeight:600 });
const btnO = (C) => ({ background:"transparent", color:C.accentL, border:`1px solid ${C.accentL}44`, borderRadius:8, padding:"7px 14px", cursor:"pointer", fontSize:12 });

function Input({ label, C, ...props }) {
  return (
    <div>
      {label && <label style={{ fontSize:11, color:C.muted, marginBottom:4, display:"block", fontWeight:500 }}>{label}</label>}
      <input style={{ background:C.inputBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, width:"100%", outline:"none", boxSizing:"border-box" }} {...props}/>
    </div>
  );
}

function Select({ label, C, children, ...props }) {
  return (
    <div>
      {label && <label style={{ fontSize:11, color:C.muted, marginBottom:4, display:"block", fontWeight:500 }}>{label}</label>}
      <select style={{ background:C.inputBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, width:"100%", outline:"none", boxSizing:"border-box" }} {...props}>{children}</select>
    </div>
  );
}

function Sidebar({ nav, active, setActive, roleLabel, onLogout, C }) {
  return (
    <div style={{ width:210, background:C.sidebar, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", flexShrink:0 }}>
      <div style={{ padding:"18px 16px 14px", borderBottom:`1px solid ${C.border}`, marginBottom:6 }}>
        <NorvaLogo size="sm" C={C}/>
        <div style={{ fontSize:10, color:C.muted, marginTop:6 }}>{roleLabel}</div>
      </div>
      <div style={{ flex:1, padding:"4px 8px" }}>
        {nav.map(item => (
          <button key={item.id} onClick={()=>setActive(item.id)}
            style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 12px", borderRadius:8, marginBottom:2,
              background: active===item.id ? `linear-gradient(135deg,#2D6A4F22,#C9963A15)` : "transparent",
              border: active===item.id ? `1px solid #2D6A4F44` : "1px solid transparent",
              color: active===item.id ? C.accentL : C.muted, cursor:"pointer", fontSize:12,
              fontWeight: active===item.id ? 600 : 400, width:"100%", textAlign:"left" }}>
            <item.icon size={14}/>{item.label}
          </button>
        ))}
      </div>
      <div style={{ padding:"0 8px 8px" }}>
        <button onClick={onLogout}
          style={{ display:"flex", alignItems:"center", gap:9, padding:"9px 12px", borderRadius:8, background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:12, width:"100%" }}>
          <LogOut size={14}/> Sair
        </button>
      </div>
    </div>
  );
}

function ThemeToggle({ dark, toggle }) {
  return (
    <button onClick={toggle} title={dark?"Modo claro":"Modo escuro"}
      style={{ background:"transparent", border:`1px solid #2D6A4F55`, borderRadius:20, padding:"6px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, color: dark?"#f1f5f9":"#1e293b", fontSize:12, fontWeight:600 }}>
      {dark ? <><Sun size={13}/> Claro</> : <><Moon size={13}/> Escuro</>}
    </button>
  );
}

// ─── LANDING PAGE + LOGIN ──────────────────────────────────
const LS = {
  ff:   "'Bricolage Grotesque', 'Work Sans', sans-serif",
  ffB:  "'Work Sans', sans-serif",
  ffI:  "'Instrument Serif', serif",
  deep: "#1B4332", mid: "#2D6A4F", leaf: "#52B788",
  gold: "#C9963A", goldL:"#D4AA5A", cream:"#F5F0E8",
  muted:"#8AB49A", bg0:"#0F2A1C", bg1:"#1B4332",
};

function HeroGoalBar({ icon, label, pct, color }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", background:"rgba(255,255,255,0.04)", borderRadius:10, border:"1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ width:38, height:38, borderRadius:8, background:"rgba(201,150,58,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{icon}</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:13, fontWeight:600, marginBottom:5, color:"#fff" }}>{label}</div>
        <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:2 }}>
          <div style={{ width:`${pct}%`, height:"100%", borderRadius:2, background:color }}/>
        </div>
      </div>
      <span style={{ fontSize:12, fontWeight:700, color }}>{pct}%</span>
    </div>
  );
}

// ─── REGISTRATION FORM (primeiro acesso) ──────────────────
function RegistrationForm({ googleUser, onComplete }) {
  const [form, setForm] = useState({
    full_name: googleUser.user_metadata?.full_name || googleUser.user_metadata?.name || "",
    phone: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!form.full_name.trim() || !form.phone.trim() || !form.cpf.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { supabase } = await import("./lib/supabase");
      const { error: err } = await supabase.from("profiles").upsert({
        id: googleUser.id,
        email: googleUser.email,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        cpf: form.cpf.trim(),
        role: "client",
      });
      if (err) throw err;
      onComplete({ id: googleUser.id, email: googleUser.email, name: form.full_name.trim(), role: "client" });
    } catch {
      setError("Erro ao salvar. Verifique os dados e tente novamente.");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight:"100vh", background:LS.bg0, color:"#fff", fontFamily:LS.ffB, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:480, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.2)", borderRadius:16, padding:40 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontFamily:LS.ffB, fontWeight:700, fontSize:20, letterSpacing:"0.1em", marginBottom:20 }}>
            <span style={{ color:LS.gold }}>NORVA</span> CONSULTORIA
          </div>
          <h2 style={{ fontFamily:LS.ff, fontSize:24, fontWeight:800, marginTop:0, marginBottom:8 }}>Complete seu cadastro</h2>
          <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:16, color:"rgba(255,255,255,0.6)", margin:0, lineHeight:1.6 }}>
            Só mais um passo para acessar sua área de membros.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {[
            {label:"Nome completo *", key:"full_name", placeholder:"Como você quer ser chamado"},
            {label:"CPF *", key:"cpf", placeholder:"000.000.000-00"},
            {label:"Telefone / WhatsApp *", key:"phone", placeholder:"(21) 99999-0000"},
          ].map(({label,key,placeholder})=>(
            <div key={key}>
              <label style={{ fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:8, display:"block" }}>{label}</label>
              <input
                placeholder={placeholder}
                value={form[key]}
                onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
                style={{ width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(201,150,58,0.25)", borderRadius:8, padding:"12px 16px", color:"#fff", fontSize:15, outline:"none", boxSizing:"border-box" }}
              />
            </div>
          ))}
        </div>
        {error && (
          <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#fca5a5", marginTop:16 }}>{error}</div>
        )}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width:"100%", background:LS.gold, color:LS.deep, fontFamily:LS.ffB, fontWeight:700, fontSize:16, letterSpacing:"0.04em", padding:"14px 24px", borderRadius:8, border:"none", cursor:"pointer", marginTop:24, opacity:loading?0.7:1 }}
        >
          {loading ? "Salvando..." : "Continuar para pagamento →"}
        </button>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", textAlign:"center", marginTop:16 }}>
          Ao continuar, você concorda com os termos de uso da Norva Consultoria.
        </div>
      </div>
    </div>
  );
}

// ─── TELA DE ASSINATURA INATIVA ────────────────────────────
function SubscriptionInactiveScreen({ user, isNew, onLogout }) {
  const firstName = (user?.name || user?.full_name || "").split(" ")[0];
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  return (
    <div style={{ minHeight:"100vh", background:LS.bg0, color:"#fff", fontFamily:LS.ffB }}>
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 60px", background:"rgba(27,67,50,0.92)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(201,150,58,0.15)" }}>
        <div style={{ fontFamily:LS.ffB, fontWeight:700, fontSize:18, letterSpacing:"0.12em" }}>
          <span style={{ color:LS.gold }}>NORVA</span> CONSULTORIA
        </div>
        <button onClick={onLogout} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.7)", fontFamily:LS.ffB, fontWeight:500, fontSize:14, padding:"8px 20px", borderRadius:6, cursor:"pointer" }}>
          Sair
        </button>
      </nav>

      <div style={{ maxWidth:700, margin:"72px auto 0", padding:"0 24px", textAlign:"center" }}>
        {isNew ? (
          <>
            <div style={{ fontSize:48, marginBottom:16 }}>🎉</div>
            <h1 style={{ fontFamily:LS.ff, fontSize:"clamp(28px,4vw,44px)", fontWeight:800, lineHeight:1.1, marginBottom:12, marginTop:0 }}>
              Cadastro concluído!<br/>Agora escolha seu <span style={{ color:LS.gold }}>plano</span>
            </h1>
            <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:18, color:"rgba(255,255,255,0.6)", lineHeight:1.7, maxWidth:520, margin:"0 auto 28px" }}>
              Olá, <strong style={{color:"#fff"}}>{firstName}</strong>! Seu cadastro foi salvo.
              Escolha um plano e assine pelo Mercado Pago para liberar o acesso completo.
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize:48, marginBottom:16 }}>⚠️</div>
            <h1 style={{ fontFamily:LS.ff, fontSize:"clamp(28px,4vw,44px)", fontWeight:800, lineHeight:1.1, marginBottom:12, marginTop:0 }}>
              Mensalidade <span style={{ color:LS.gold }}>em atraso</span>
            </h1>
            <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:18, color:"rgba(255,255,255,0.6)", lineHeight:1.7, maxWidth:520, margin:"0 auto 28px" }}>
              Olá, <strong style={{color:"#fff"}}>{firstName}</strong>! Sua assinatura está inativa.
              Renove seu plano para continuar acessando todos os benefícios.
            </p>
          </>
        )}
        <div style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:10, padding:"12px 24px", display:"inline-flex", alignItems:"center", gap:8, marginBottom:56 }}>
          <span style={{ fontSize:14, color:"#fca5a5" }}>🔒 Acesso bloqueado até a confirmação do pagamento</span>
        </div>
      </div>

      <section style={{ padding:"0 60px 80px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1100, margin:"0 auto", alignItems:"start" }}>
          {PLANS.map((plan)=>(
            <div key={plan.id} style={{ background:"rgba(255,255,255,0.04)", border: plan.popular?"2px solid #C9963A":"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"36px 32px", display:"flex", flexDirection:"column", position:"relative", transform:plan.popular?"translateY(-8px)":"none" }}>
              {plan.popular && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:LS.gold, color:LS.deep, fontSize:12, fontWeight:700, letterSpacing:"0.08em", padding:"5px 18px", borderRadius:20, whiteSpace:"nowrap" }}>Mais popular</div>}
              <div style={{ fontFamily:LS.ff, fontSize:20, fontWeight:700, marginBottom:16 }}>{plan.label}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:6 }}>
                <span style={{ fontFamily:LS.ff, fontSize:14, fontWeight:600 }}>R$</span>
                <span style={{ fontFamily:LS.ff, fontSize:52, fontWeight:800, lineHeight:1 }}>{plan.price.toFixed(2).replace(".",",").split(",")[0]}</span>
                <span style={{ fontFamily:LS.ff, fontSize:28, fontWeight:700 }}>,{plan.price.toFixed(2).split(".")[1]}</span>
                <span style={{ fontSize:16, fontWeight:400, color:LS.muted, marginLeft:4 }}>/mês</span>
              </div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:28 }}>Cobrado mensalmente via Mercado Pago</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:12, marginBottom:32, flex:1, padding:0 }}>
                {plan.features.map((f,i)=>(
                  <li key={i} style={{ fontSize:14, color:"rgba(255,255,255,0.75)", paddingLeft:22, position:"relative", lineHeight:1.5 }}>
                    <span style={{ position:"absolute", left:0, color:LS.leaf, fontWeight:700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>window.open(plan.link,"_blank")} style={{ display:"block", textAlign:"center", fontFamily:LS.ffB, fontWeight:700, fontSize:15, letterSpacing:"0.04em", padding:"14px 24px", borderRadius:8, border: plan.popular?"none":"1.5px solid rgba(255,255,255,0.2)", background: plan.popular?LS.gold:"transparent", color: plan.popular?LS.deep:"#fff", cursor:"pointer" }}>
                Assinar {plan.label}
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:32, fontSize:13, color:"rgba(255,255,255,0.4)" }}>
          Após o pagamento, o acesso é liberado automaticamente. Dúvidas?{" "}
          <a href="https://wa.me/5521999999999" target="_blank" rel="noreferrer" style={{ color:LS.goldL }}>Fale no WhatsApp</a>.
        </div>
      </section>
    </div>
  );
}

function LoginScreen({ onLogin, dark, toggleDark }) {
  const C = getC(dark);
  const [showLogin, setShowLogin] = useState(false);
  const [picking, setPicking] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authBirth, setAuthBirth] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authMsg, setAuthMsg] = useState('');

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

  return (
    <div style={{ minHeight:"100vh", background:LS.bg1, color:"#fff", fontFamily:LS.ffB, overflowX:"hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 60px", background:"rgba(27,67,50,0.92)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(201,150,58,0.15)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:7, height:7, borderRadius:"50%", background:LS.gold }}/>
          <span style={{ fontFamily:LS.ffB, fontWeight:700, fontSize:18, letterSpacing:"0.12em" }}>
            <span style={{ color:LS.gold }}>NORVA</span> CONSULTORIA
          </span>
          <div style={{ width:7, height:7, borderRadius:"50%", background:LS.gold }}/>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:36 }}>
          {["Início","Sobre","Planos","Parceiros"].map(l=>(
            <a key={l} onClick={()=>l==="Planos"?scrollTo("planos"):l==="Parceiros"?scrollTo("parceiros"):l==="Sobre"?scrollTo("sobre"):window.scrollTo({top:0,behavior:'smooth'})}
              style={{ fontSize:14, fontWeight:500, letterSpacing:"0.06em", color:"rgba(255,255,255,0.75)", cursor:"pointer", textDecoration:"none" }}>{l}</a>
          ))}
          <button onClick={()=>{ setShowLogin(true); window.scrollTo({top:0,behavior:'smooth'}); }}
            style={{ background:LS.gold, color:LS.deep, fontWeight:700, fontSize:14, padding:"10px 24px", borderRadius:6, border:"none", cursor:"pointer", letterSpacing:"0.04em" }}>
            Entrar →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", gap:60, padding:"120px 60px 80px", background:"linear-gradient(135deg, #0F2A1C 0%, #1B4332 60%, #2D6A4F 100%)", position:"relative", overflow:"hidden" }}>
        {/* gold accent bar */}
        <div style={{ position:"absolute", left:0, top:180, bottom:80, width:4, background:LS.gold }}/>
        {/* ghost letter */}
        <div style={{ position:"absolute", right:-40, top:"50%", transform:"translateY(-50%)", fontFamily:LS.ff, fontSize:480, fontWeight:800, lineHeight:1, color:"rgba(255,255,255,0.03)", userSelect:"none", pointerEvents:"none" }}>N</div>

        {/* Left content */}
        <div style={{ position:"relative", zIndex:2 }}>
          <div style={{ fontSize:13, fontWeight:500, letterSpacing:"0.18em", color:LS.gold, textTransform:"uppercase", marginBottom:28, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ display:"block", width:32, height:2, background:LS.gold }}/>
            Plataforma Financeira
          </div>
          <h1 style={{ fontFamily:LS.ff, fontSize:"clamp(48px,5.5vw,76px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:24, marginTop:0 }}>
            Organize sua vida<br/>financeira de forma<br/><span style={{ color:LS.gold }}>simples e inteligente.</span>
          </h1>
          <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:21, color:"rgba(255,255,255,0.7)", lineHeight:1.65, marginBottom:44, maxWidth:500 }}>
            Não é sobre ganhar mais. É sobre controlar melhor o que você já tem.
          </p>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            <button onClick={()=>scrollTo("planos")} style={{ background:LS.gold, color:LS.deep, fontFamily:LS.ffB, fontWeight:700, fontSize:16, letterSpacing:"0.04em", padding:"16px 36px", borderRadius:8, border:"none", cursor:"pointer" }}>
              Começar agora →
            </button>
            <button onClick={()=>scrollTo("planos")} style={{ background:"transparent", color:"#fff", fontFamily:LS.ffB, fontWeight:500, fontSize:16, padding:"15px 32px", borderRadius:8, border:"1.5px solid rgba(255,255,255,0.25)", cursor:"pointer" }}>
              Conhecer os planos
            </button>
          </div>
          {/* Stats */}
          <div style={{ display:"flex", gap:48, marginTop:64, paddingTop:36, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
            {[{n:"+800",l:"Clientes organizados"},{n:"+60",l:"Empresas parceiras"},{n:"100%",l:"Foco no seu resultado"}].map((s,i)=>(
              <div key={i}>
                <div style={{ fontFamily:LS.ff, fontSize:38, fontWeight:800, color:LS.gold, letterSpacing:"-0.02em" }}>{s.n}</div>
                <div style={{ fontSize:13, color:LS.muted, marginTop:4, letterSpacing:"0.04em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — floating cards */}
        <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", gap:16, animation:"floatUp 6s ease-in-out infinite" }}>
          <style>{`@keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
          {/* Metas card */}
          <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(201,150,58,0.2)", borderRadius:14, padding:"24px 28px", backdropFilter:"blur(8px)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <span style={{ fontSize:12, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:LS.muted }}>Minhas Metas</span>
              <span style={{ fontSize:11, fontWeight:600, background:"rgba(82,183,136,0.15)", color:LS.leaf, padding:"4px 10px", borderRadius:20 }}>3 ativas</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <HeroGoalBar icon="🛡️" label="Reserva de Emergência" pct={68} color={LS.gold}/>
              <HeroGoalBar icon="🏠" label="Entrada do Apartamento" pct={34} color={LS.leaf}/>
              <HeroGoalBar icon="✈️" label="Viagem de Férias" pct={88} color={LS.leaf}/>
            </div>
          </div>
          {/* Resumo card */}
          <div style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(201,150,58,0.2)", borderRadius:14, padding:"24px 28px", backdropFilter:"blur(8px)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <span style={{ fontSize:12, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:LS.muted }}>Resumo do mês</span>
              <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>Maio 2025</span>
            </div>
            <div style={{ display:"flex", gap:12 }}>
              {[{icon:"💰",val:"R$1.2k",label:"Guardado"},{icon:"📉",val:"R$1.6k",label:"Gastos fixos"},{icon:"🎯",val:"2/3",label:"Metas ativas"}].map((a,i)=>(
                <div key={i} style={{ flex:1, padding:16, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, textAlign:"center" }}>
                  <div style={{ fontSize:22, marginBottom:6 }}>{a.icon}</div>
                  <div style={{ fontFamily:LS.ff, fontSize:22, fontWeight:800, color:LS.gold }}>{a.val}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{a.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section style={{ padding:"96px 60px", background:"linear-gradient(180deg, #1B4332 0%, #162E22 100%)" }}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:LS.gold, marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ display:"block", width:24, height:2, background:LS.gold }}/>O que oferecemos
        </div>
        <h2 style={{ fontFamily:LS.ff, fontSize:"clamp(32px,4vw,52px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:12, marginTop:0 }}>
          Tudo que você precisa<br/>para <span style={{ color:LS.gold }}>organizar seu dinheiro</span>
        </h2>
        <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:19, color:"rgba(255,255,255,0.6)", maxWidth:520, lineHeight:1.6, marginBottom:0 }}>
          Ferramentas pensadas para quem quer sair do caos financeiro de uma vez.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginTop:60 }}>
          {[
            {icon:"📊",title:"Diagnóstico Financeiro",desc:"Entenda onde seu dinheiro está indo com uma visão clara e objetiva da sua situação atual."},
            {icon:"🎯",title:"Score Financeiro",desc:"Acompanhe sua evolução com uma pontuação personalizada que reflete seu progresso real."},
            {icon:"🧮",title:"Calculadoras Inteligentes",desc:"Simule juros, planejamento de aposentadoria, reserva de emergência e muito mais."},
            {icon:"💬",title:"Consultoria Personalizada",desc:"Acesso direto a consultores especializados para orientar suas decisões financeiras."},
            {icon:"📅",title:"Planejamento de Metas",desc:"Defina objetivos, estabeleça prazos e acompanhe o caminho até realizá-los."},
            {icon:"🔒",title:"Segurança & Privacidade",desc:"Seus dados financeiros protegidos com os mais altos padrões de segurança digital."},
          ].map((f,i)=>(
            <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.15)", borderRadius:12, padding:"36px 32px", cursor:"pointer" }}>
              <div style={{ width:52, height:52, borderRadius:10, background:"rgba(201,150,58,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, marginBottom:24 }}>{f.icon}</div>
              <div style={{ fontFamily:LS.ff, fontSize:21, fontWeight:700, marginBottom:12, letterSpacing:"-0.01em" }}>{f.title}</div>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.6)", lineHeight:1.7, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCORE ── */}
      <section style={{ padding:"96px 60px", background:"linear-gradient(135deg, #162E22 0%, #0F2A1C 100%)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:LS.gold, marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ display:"block", width:24, height:2, background:LS.gold }}/>Seu Score
            </div>
            <h2 style={{ fontFamily:LS.ff, fontSize:"clamp(32px,4vw,52px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:16, marginTop:0 }}>
              Meça seu progresso<br/>com um <span style={{ color:LS.gold }}>score real</span>
            </h2>
            <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:19, color:"rgba(255,255,255,0.6)", lineHeight:1.6, marginBottom:0 }}>
              Um número que mostra onde você está e te guia até onde quer chegar.
            </p>
          </div>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.2)", borderRadius:16, padding:48, textAlign:"center" }}>
            <div style={{ position:"relative", display:"inline-block", marginBottom:24 }}>
              <div style={{ width:180, height:180, borderRadius:"50%", background:"conic-gradient(#C9963A 0% 72%, rgba(255,255,255,0.08) 72% 100%)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                <div style={{ position:"absolute", inset:16, borderRadius:"50%", background:"#0F2A1C" }}/>
                <span style={{ position:"relative", zIndex:1, fontFamily:LS.ff, fontSize:52, fontWeight:800, color:LS.gold }}>720</span>
              </div>
            </div>
            <div style={{ fontSize:13, letterSpacing:"0.12em", textTransform:"uppercase", color:LS.muted, marginBottom:8 }}>Score Financeiro</div>
            <div style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:18, color:LS.leaf, marginBottom:28 }}>Muito bom — continue assim!</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[["Controle de gastos","85%"],["Reserva de emergência","68%"],["Organização de dívidas","92%"]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)", width:160, textAlign:"left" }}>{l}</span>
                  <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.08)", borderRadius:3 }}>
                    <div style={{ width:v, height:"100%", borderRadius:3, background:LS.gold }}/>
                  </div>
                  <span style={{ fontSize:13, color:LS.gold, fontWeight:600, width:36, textAlign:"right" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE ── */}
      <section id="sobre" style={{ padding:"96px 60px", background:"linear-gradient(135deg, #0F2A1C 0%, #162E22 100%)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:LS.gold, marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ display:"block", width:24, height:2, background:LS.gold }}/>Sobre nós
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
            <div>
              <h2 style={{ fontFamily:LS.ff, fontSize:"clamp(32px,4vw,50px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:20, marginTop:0 }}>
                Sabemos como é difícil<br/>olhar para o extrato<br/>e <span style={{ color:LS.gold }}>não saber o que fazer</span>
              </h2>
              <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:19, color:"rgba(255,255,255,0.65)", lineHeight:1.8, marginBottom:20 }}>
                A Norva nasceu da vontade genuína de transformar a relação dos brasileiros com o dinheiro.
                Não com julgamento — mas com acolhimento, tecnologia e orientação de quem realmente entende o que você está vivendo.
              </p>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:40 }}>
                Seja você quem está endividado e não sabe por onde começar, ou quem já tem estabilidade e quer ir além:{" "}
                <strong style={{color:"rgba(255,255,255,0.8)"}}>a Norva é sua parceira financeira</strong>.
                Com inteligência artificial, consultores humanos e conteúdo de qualidade,
                você nunca mais caminha sozinho rumo à sua liberdade financeira.
              </p>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                <button onClick={()=>scrollTo("planos")} style={{ background:LS.gold, color:LS.deep, fontFamily:LS.ffB, fontWeight:700, fontSize:15, letterSpacing:"0.04em", padding:"14px 32px", borderRadius:8, border:"none", cursor:"pointer" }}>
                  Quero transformar minhas finanças →
                </button>
                <button onClick={()=>window.open("https://wa.me/5521999999999","_blank")} style={{ background:"transparent", color:"#fff", fontFamily:LS.ffB, fontWeight:500, fontSize:15, padding:"13px 28px", borderRadius:8, border:"1.5px solid rgba(255,255,255,0.2)", cursor:"pointer" }}>
                  Falar com a equipe
                </button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[
                {emoji:"💙",title:"Acolhimento genuíno",desc:"Sem julgamento. Orientação de quem entende o que você está vivendo."},
                {emoji:"🤖",title:"Tecnologia a seu favor",desc:"IA que analisa suas finanças e gera recomendações práticas e personalizadas."},
                {emoji:"👨‍💼",title:"Consultores reais",desc:"Profissionais certificados ao seu lado para as decisões que importam."},
                {emoji:"🎯",title:"Resultado concreto",desc:"Ferramentas e suporte para você mudar de vida de verdade."},
              ].map((item,i)=>(
                <div key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(201,150,58,0.15)", borderRadius:12, padding:"24px 20px" }}>
                  <div style={{ fontSize:28, marginBottom:12 }}>{item.emoji}</div>
                  <div style={{ fontFamily:LS.ff, fontSize:16, fontWeight:700, marginBottom:8 }}>{item.title}</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANOS ── */}
      <section id="planos" style={{ padding:"96px 60px", background:"linear-gradient(180deg, #162E22 0%, #0F2A1C 100%)" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:LS.gold, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <span style={{ display:"block", width:24, height:2, background:LS.gold }}/>Planos<span style={{ display:"block", width:24, height:2, background:LS.gold }}/>
          </div>
          <h2 style={{ fontFamily:LS.ff, fontSize:"clamp(32px,4vw,52px)", fontWeight:800, lineHeight:1.1, marginBottom:12, marginTop:0 }}>Escolha seu <span style={{ color:LS.gold }}>plano</span></h2>
          <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:19, color:"rgba(255,255,255,0.6)" }}>Cancele quando quiser. Sem multa, sem burocracia.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, alignItems:"start" }}>
          {PLANS.map((plan)=>(
            <div key={plan.id} style={{ background:"rgba(255,255,255,0.04)", border: plan.popular?"2px solid #C9963A":"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"36px 32px", display:"flex", flexDirection:"column", position:"relative", transform:plan.popular?"translateY(-8px)":"none" }}>
              {plan.popular && <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:LS.gold, color:LS.deep, fontSize:12, fontWeight:700, letterSpacing:"0.08em", padding:"5px 18px", borderRadius:20, whiteSpace:"nowrap" }}>Mais popular</div>}
              <div style={{ fontFamily:LS.ff, fontSize:20, fontWeight:700, marginBottom:16 }}>{plan.label}</div>
              <div style={{ display:"flex", alignItems:"baseline", gap:2, marginBottom:6 }}>
                <span style={{ fontFamily:LS.ff, fontSize:14, fontWeight:600, marginBottom:28 }}>R$</span>
                <span style={{ fontFamily:LS.ff, fontSize:52, fontWeight:800, lineHeight:1 }}>{plan.price.toFixed(2).replace(".",",").split(",")[0]}</span>
                <span style={{ fontFamily:LS.ff, fontSize:28, fontWeight:700 }}>,{plan.price.toFixed(2).split(".")[1]}</span>
                <span style={{ fontSize:16, fontWeight:400, color:LS.muted, marginLeft:4 }}>/mês</span>
              </div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:28 }}>Cobrado mensalmente via Mercado Pago</div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:12, marginBottom:32, flex:1, padding:0 }}>
                {plan.features.map((f,i)=>(
                  <li key={i} style={{ fontSize:14, color:"rgba(255,255,255,0.75)", paddingLeft:22, position:"relative", lineHeight:1.5 }}>
                    <span style={{ position:"absolute", left:0, color:LS.leaf, fontWeight:700, fontSize:13 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button onClick={()=>window.open(plan.link,"_blank")} style={{ display:"block", textAlign:"center", fontFamily:LS.ffB, fontWeight:700, fontSize:15, letterSpacing:"0.04em", padding:"14px 24px", borderRadius:8, border: plan.popular?"none":"1.5px solid rgba(255,255,255,0.2)", background: plan.popular?LS.gold:"transparent", color: plan.popular?LS.deep:"#fff", cursor:"pointer", marginTop:"auto" }}>
                Assinar {plan.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMPRESAS PARCEIRAS ── */}
      <section id="parceiros" style={{ padding:"96px 60px", background:"linear-gradient(180deg, #0F2A1C 0%, #1B4332 100%)" }}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:LS.gold, marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ display:"block", width:24, height:2, background:LS.gold }}/>Parceiros
        </div>
        <h2 style={{ fontFamily:LS.ff, fontSize:"clamp(32px,4vw,52px)", fontWeight:800, lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:12, marginTop:0 }}>
          +60 empresas que<br/>geram <span style={{ color:LS.gold }}>economia real</span>
        </h2>
        <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:19, color:"rgba(255,255,255,0.6)", maxWidth:520, lineHeight:1.6, marginBottom:56 }}>
          Acesso exclusivo para associados Norva. Descontos em farmácias, academias, clínicas, educação e muito mais.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {[
            {icon:"💊",name:"Farmácia Bem Estar",desc:"15% em medicamentos e produtos de saúde"},
            {icon:"🏋️",name:"Academia Fit Plus",desc:"Mensalidade com 30% de desconto"},
            {icon:"🏥",name:"Clínica Saúde Total",desc:"Consultas com 20% de desconto"},
            {icon:"📚",name:"Livraria Saber",desc:"10% em todos os livros e cursos"},
            {icon:"🦷",name:"Odontoclínica Plus",desc:"Tratamentos com preços especiais"},
            {icon:"🎓",name:"Plataforma EduTech",desc:"Cursos online com 40% off"},
          ].map((p,i)=>(
            <div key={i} style={{ background:"rgba(82,183,136,0.06)", border:"1px solid rgba(82,183,136,0.15)", borderRadius:10, padding:"28px 24px", display:"flex", alignItems:"flex-start", gap:16 }}>
              <div style={{ fontSize:28, flexShrink:0, marginTop:2 }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily:LS.ff, fontSize:16, fontWeight:700, marginBottom:6 }}>{p.name}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.6 }}>{p.desc}</div>
                <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:LS.gold, background:"rgba(201,150,58,0.12)", padding:"3px 10px", borderRadius:4, display:"inline-block", marginTop:10 }}>Exclusivo Norva</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:LS.gold, textAlign:"center", padding:"96px 60px" }}>
        <div style={{ fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:LS.deep, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
          <span style={{ display:"block", width:24, height:2, background:LS.deep }}/>Comece agora<span style={{ display:"block", width:24, height:2, background:LS.deep }}/>
        </div>
        <h2 style={{ fontFamily:LS.ff, fontSize:"clamp(32px,4vw,52px)", fontWeight:800, color:LS.deep, lineHeight:1.1, marginBottom:12, marginTop:0 }}>
          Pronto para organizar<br/>sua vida financeira?
        </h2>
        <p style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:19, color:"rgba(27,67,50,0.75)", maxWidth:500, margin:"0 auto 48px" }}>
          Comece com o plano Essencial por apenas R$ 19,90/mês e mude sua relação com o dinheiro.
        </p>
        <button onClick={()=>scrollTo("planos")} style={{ background:LS.deep, color:"#fff", fontFamily:LS.ffB, fontWeight:700, fontSize:16, padding:"16px 40px", borderRadius:8, border:"none", cursor:"pointer", letterSpacing:"0.04em" }}>
          Escolher meu plano →
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0C1F15", padding:"60px 60px 36px", borderTop:"1px solid rgba(201,150,58,0.12)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:48 }}>
          <div>
            <div style={{ fontFamily:LS.ffB, fontWeight:700, fontSize:22, letterSpacing:"0.1em", marginBottom:10 }}>
              <span style={{ color:LS.gold }}>NORVA</span> CONSULTORIA
            </div>
            <div style={{ fontFamily:LS.ffI, fontStyle:"italic", fontSize:16, color:"rgba(255,255,255,0.5)" }}>
              Organize. Evolua. Realize.
            </div>
          </div>
          <div style={{ display:"flex", gap:60 }}>
            {[
              {title:"Plataforma",links:["Dashboard","Score Financeiro","Metas","Relatório IA"]},
              {title:"Planos",links:["Essencial","Progresso","Prime"]},
              {title:"Suporte",links:["WhatsApp","FAQ","Termos de uso"]},
            ].map((col)=>(
              <div key={col.title}>
                <h4 style={{ fontSize:12, fontWeight:600, letterSpacing:"0.14em", textTransform:"uppercase", color:LS.gold, marginBottom:20, marginTop:0 }}>{col.title}</h4>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10, padding:0 }}>
                  {col.links.map(l=><li key={l}><span style={{ fontSize:14, color:"rgba(255,255,255,0.55)", cursor:"pointer" }}>{l}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.35)" }}>© 2025 <span style={{ color:LS.gold }}>Norva</span> Consultoria. Todos os direitos reservados.</span>
          <div style={{ display:"flex", gap:6, alignItems:"center" }}>
            {[0.4,0.7,1].map((o,i)=><span key={i} style={{ width:5, height:5, borderRadius:"50%", background:LS.gold, opacity:o, display:"block" }}/>)}
          </div>
        </div>
      </footer>

      {/* MODAL LOGIN */}
      {showLogin && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200, padding:24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowLogin(false); }}>
          <div style={{ width:"100%", maxWidth:400, background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:32, position:"relative" }}>
            <button onClick={()=>setShowLogin(false)} style={{ position:"absolute", top:12, right:16, background:"transparent", border:"none", color:C.muted, cursor:"pointer", fontSize:20 }}>×</button>
            {!picking ? (
              <>
                {/* Header */}
                <div style={{ textAlign:"center", marginBottom:20 }}>
                  <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
                    <NorvaLogo size="lg" C={C}/>
                  </div>
                  <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:4 }}>
                    {authMode==='register' ? 'Criar sua conta' : authMode==='forgot' ? 'Redefinir senha' : 'Bem-vindo de volta'}
                  </div>
                  <div style={{ fontSize:12, color:C.muted }}>
                    {authMode==='register' ? 'Preencha seus dados para começar' : authMode==='forgot' ? 'Enviaremos um link para seu e-mail' : 'Entre na sua conta Norva'}
                  </div>
                </div>

                {/* Feedback */}
                {authMsg && <div style={{ background:"rgba(82,183,136,0.12)", border:"1px solid rgba(82,183,136,0.3)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#52B788", marginBottom:12 }}>{authMsg}</div>}
                {authError && <div style={{ background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#f87171", marginBottom:12 }}>{authError}</div>}

                {/* Fields */}
                {authMode==='register' && (<>
                  <input placeholder="Nome completo" value={authName} onChange={e=>setAuthName(e.target.value)}
                    style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.inputBg, color:C.text, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box" }}/>
                  <input placeholder="Data de nascimento" type="date" value={authBirth||''} onChange={e=>setAuthBirth(e.target.value)}
                    style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.inputBg, color:authBirth?C.text:C.muted, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box", colorScheme:"dark" }}/>
                  <input placeholder="Telefone (WhatsApp)" type="tel" value={authPhone||''} onChange={e=>setAuthPhone(e.target.value)}
                    style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.inputBg, color:C.text, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box" }}/>
                </>)}
                <input placeholder="E-mail" type="email" value={authEmail} onChange={e=>{setAuthEmail(e.target.value);setAuthError('');}}
                  style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.inputBg, color:C.text, fontSize:14, marginBottom:10, outline:"none", boxSizing:"border-box" }}/>
                {authMode !== 'forgot' && (
                  <input placeholder="Senha" type="password" value={authPass} onChange={e=>{setAuthPass(e.target.value);setAuthError('');}}
                    style={{ width:"100%", padding:"11px 14px", borderRadius:9, border:`1px solid ${C.border}`, background:C.inputBg, color:C.text, fontSize:14, marginBottom:authMode==='login'?4:14, outline:"none", boxSizing:"border-box" }}/>
                )}
                {authMode==='login' && (
                  <div style={{ textAlign:"right", marginBottom:14 }}>
                    <span onClick={()=>{setAuthMode('forgot');setAuthError('');setAuthMsg('');}} style={{ fontSize:12, color:C.accentL, cursor:"pointer" }}>Esqueceu sua senha?</span>
                  </div>
                )}

                {/* Main CTA */}
                <button disabled={authLoading} onClick={async()=>{
                  setAuthError(''); setAuthMsg(''); setAuthLoading(true);
                  const {supabase} = await import("./lib/supabase");
                  if(authMode==='forgot'){
                    const {error}=await supabase.auth.resetPasswordForEmail(authEmail,{redirectTo:'https://www.norvaconsultoria.com.br'});
                    setAuthLoading(false);
                    if(error) setAuthError(error.message);
                    else setAuthMsg('Link enviado! Verifique seu e-mail.');
                    return;
                  }
                  if(authMode==='register'){
                    const {error}=await supabase.auth.signUp({email:authEmail,password:authPass,options:{data:{full_name:authName,phone:authPhone,birth_date:authBirth}}});
                    setAuthLoading(false);
                    if(error) setAuthError(error.message);
                    else setAuthMsg('Conta criada! Verifique seu e-mail para confirmar.');
                    return;
                  }
                  const {error}=await supabase.auth.signInWithPassword({email:authEmail,password:authPass});
                  setAuthLoading(false);
                  if(error) setAuthError('E-mail ou senha incorretos.');
                }}
                  style={{ width:"100%", padding:"12px 20px", borderRadius:10, border:"none", background:LS.gold, color:LS.deep, cursor:authLoading?"not-allowed":"pointer", fontSize:14, fontWeight:700, marginBottom:14, opacity:authLoading?0.7:1 }}>
                  {authLoading ? 'Aguarde...' : authMode==='register' ? 'Criar conta' : authMode==='forgot' ? 'Enviar link' : 'Entrar'}
                </button>

                {/* Google divider */}
                {authMode !== 'forgot' && (<>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                    <div style={{ flex:1, height:1, background:C.border }}/>
                    <span style={{ fontSize:12, color:C.muted }}>ou continue com</span>
                    <div style={{ flex:1, height:1, background:C.border }}/>
                  </div>
                  <button onClick={async()=>{ const {supabase}=await import("./lib/supabase"); await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:"https://www.norvaconsultoria.com.br"}}); }}
                    style={{ width:"100%", padding:"11px 20px", borderRadius:10, border:`1px solid ${C.border}`, background:C.inputBg, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, fontSize:14, fontWeight:600, color:C.text, marginBottom:16 }}>
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                    Entrar com Google
                  </button>
                </>)}

                {/* Bottom links */}
                <div style={{ textAlign:"center", fontSize:12, color:C.muted }}>
                  {authMode==='login' && <span>Não tem conta? <span onClick={()=>{setAuthMode('register');setAuthError('');setAuthMsg('');}} style={{ color:LS.gold, cursor:"pointer", fontWeight:600 }}>Cadastre-se</span></span>}
                  {authMode==='register' && <span>Já tem conta? <span onClick={()=>{setAuthMode('login');setAuthError('');setAuthMsg('');}} style={{ color:LS.gold, cursor:"pointer", fontWeight:600 }}>Entrar</span></span>}
                  {authMode==='forgot' && <span onClick={()=>{setAuthMode('login');setAuthError('');setAuthMsg('');}} style={{ color:LS.gold, cursor:"pointer", fontWeight:600 }}>← Voltar para o login</span>}
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:4 }}>Escolher conta Google</div>
                <div style={{ fontSize:11, color:C.muted, marginBottom:16 }}>Demonstração — selecione seu perfil</div>
                {MOCK_ACCOUNTS.map(acc => (
                  <button key={acc.id} onClick={()=>onLogin(acc)}
                    style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${C.border}`, background:C.inputBg, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                    <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#2D6A4F,#C9963A)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:13, flexShrink:0 }}>{acc.avatar}</div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{acc.name}</div>
                      <div style={{ fontSize:11, color:C.muted }}>{acc.email}</div>
                    </div>
                    <div style={{ marginLeft:"auto" }}>
                      <span style={badge(acc.role==="admin"?"#C9963A":acc.role==="vendor"?"#52B788":acc.role==="consultant"?"#C9963A":"#2D6A4F")}>
                        {acc.role==="admin"?"Admin":acc.role==="vendor"?"Vendedor":acc.role==="consultant"?"Consultor":"Associado"}
                      </span>
                    </div>
                  </button>
                ))}
                <button onClick={()=>setPicking(false)} style={{ ...btnO(C), marginTop:4, width:"100%", textAlign:"center" }}>← Voltar</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MOCK DATA ─────────────────────────────────────────────
const mockGoalsData = [
  { id:1, label:"Quitar dívida cartão", target:5000, current:2100 },
  { id:2, label:"Reserva de emergência", target:10000, current:6500 },
  { id:3, label:"Viagem de férias", target:3000, current:800 },
];
const mockSessions = [
  { id:1, client:"João Silva",   date:"28/04/25", time:"14:00", status:"agendada",  notes:"" },
  { id:2, client:"Maria Souza",  date:"26/04/25", time:"10:00", status:"realizada", notes:"Cliente progredindo bem, controle de gastos melhorou." },
  { id:3, client:"Pedro Torres", date:"30/04/25", time:"16:00", status:"agendada",  notes:"" },
];
const mockPartners = [
  { emoji:"💊", name:"Farmácia Bem Estar",  service:"Farmácia", discount:"15% em medicamentos",      addr:"Rua das Flores, 100" },
  { emoji:"🏋️", name:"Academia Fit Plus",   service:"Fitness",  discount:"Mensalidade com 30% off",  addr:"Av. Central, 250" },
  { emoji:"🏥", name:"Clínica Saúde Total", service:"Saúde",    discount:"Consultas com 20% off",    addr:"Rua da Paz, 75" },
  { emoji:"📚", name:"Livraria Saber",      service:"Educação", discount:"10% em todos os livros",   addr:"Praça do Conhecimento, 10" },
];
const mockClients = [
  { id:1, name:"João Silva",    plan:"Prime",     planVal:119.90, status:"ativo",     joined:"Jan/25" },
  { id:2, name:"Maria Souza",   plan:"Progresso", planVal:59.90,  status:"ativo",     joined:"Fev/25" },
  { id:3, name:"Carla Mendes",  plan:"Essencial", planVal:19.90,  status:"cancelado", joined:"Dez/24" },
  { id:4, name:"Pedro Torres",  plan:"Prime",     planVal:119.90, status:"ativo",     joined:"Mar/25" },
];
const mockLeads = [
  { id:1, name:"Fernanda Rocha", phone:"21991234567" },
  { id:2, name:"Gustavo Pires",  phone:"21987654321" },
  { id:3, name:"Helena Costa",   phone:"21976543210" },
];
const mockAccounts = [
  { id:1, name:"Ana Ferreira",  email:"ana.consult@gmail.com", role:"consultant", phone:"21911110000", cpf:"111.222.333-44", since:"Jan/25" },
  { id:2, name:"Carlos Mendes", email:"carlos.vendas@gmail.com", role:"vendor",   phone:"21922220000", cpf:"222.333.444-55", since:"Fev/25" },
];

// ─── CALC SHARED COMPONENTS (fora do tab para não perder foco) ─
const CINP={width:'100%',padding:'11px 14px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',color:'#fff',fontSize:14,outline:'none',boxSizing:'border-box'};
const CLBL={fontSize:11,fontWeight:600,color:'#8AB49A',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:5,display:'block'};
function CalcField({label,value,set,type='text',ph='',opts}){
  return(
    <div>
      <label style={CLBL}>{label}</label>
      {opts
        ?<select value={value} onChange={e=>set(e.target.value)} style={{...CINP,color:'#fff'}}>{opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>
        :<input type={type} value={value} onChange={e=>set(e.target.value)} placeholder={ph} style={CINP}/>
      }
    </div>
  );
}
function CalcResCard({label,value,sub,hi}){
  return(
    <div style={{background:hi?'rgba(201,150,58,0.12)':'rgba(255,255,255,0.04)',border:`1px solid ${hi?'rgba(201,150,58,0.25)':'rgba(255,255,255,0.08)'}`,borderRadius:12,padding:'18px 20px',textAlign:'center'}}>
      <div style={{fontSize:11,color:'#8AB49A',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:6}}>{label}</div>
      <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:24,fontWeight:800,color:hi?'#C9963A':'#fff',marginBottom:3}}>{value}</div>
      {sub&&<div style={{fontSize:12,color:'#8AB49A'}}>{sub}</div>}
    </div>
  );
}
function CalcHeader({title,icon,onBack}){
  return(
    <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
      <button onClick={onBack} style={{background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'12px 20px',fontSize:14,fontWeight:600,cursor:'pointer'}}>← Voltar</button>
      <span style={{fontSize:22}}>{icon}</span>
      <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:700}}>{title}</span>
    </div>
  );
}
// ─── PRIZE STRIP (clube de vantagens) ──────────────────────
const PRIZE_CARDS=[
  {img:'/geladeira.jpg', label:'Geladeira Duplex 400L', val:'R$ 3.200', tag:'Sorteio mensal', accent:'#60a5fa'},
  {img:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=480&h=320&fit=crop&auto=format&q=80', label:'Máquina de Lavar 12kg', val:'R$ 2.800', tag:'Sorteio mensal', accent:'#a78bfa'},
  {isCash2500:true},
  {img:'/fogao.jpg', label:'Fogão 4 Bocas Atlas', val:'R$ 899', tag:'Sorteio mensal', accent:'#fb923c'},
  {isCash10k:true},
  {isArt:true},
];
function NorvaArtCard(){
  return(
    <div style={{width:240,height:170,borderRadius:18,flexShrink:0,overflow:'hidden',position:'relative',background:'linear-gradient(135deg,#0A1F14 0%,#1B4332 55%,#0f2318 100%)',border:'1px solid rgba(201,150,58,0.35)',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'14px 16px'}}>
      {/* decorative circles */}
      <div style={{position:'absolute',top:-24,right:-24,width:100,height:100,borderRadius:'50%',background:'rgba(201,150,58,0.12)'}}/>
      <div style={{position:'absolute',bottom:-30,left:-20,width:120,height:120,borderRadius:'50%',background:'rgba(82,183,136,0.08)'}}/>
      {/* top badge */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',position:'relative',zIndex:1}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:5,background:'rgba(201,150,58,0.18)',border:'1px solid rgba(201,150,58,0.35)',borderRadius:12,padding:'3px 10px',fontSize:9,fontWeight:800,color:'#C9963A',letterSpacing:'0.08em',textTransform:'uppercase'}}>🏆 Sorteio Mensal</div>
        <div style={{fontSize:18}}>🎰</div>
      </div>
      {/* logo + slogan */}
      <div style={{position:'relative',zIndex:1}}>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:17,fontWeight:900,lineHeight:1.1,marginBottom:6}}>
          <span style={{background:'linear-gradient(135deg,#52B788,#C9963A)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>NORVA</span>
          <span style={{color:'rgba(255,255,255,0.85)',fontSize:12,fontWeight:600,marginLeft:6}}>CONSULTORIA</span>
        </div>
        <div style={{fontSize:11,color:'rgba(255,255,255,0.65)',lineHeight:1.4,marginBottom:8}}>Aprenda a gerir e ainda<br/><strong style={{color:'#C9963A'}}>concorra a prêmios incríveis!</strong></div>
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {['🧊 Geladeira','🌀 Lavadora','💵 R$2.500/sem','🏆 R$10.000'].map(p=>(
            <span key={p} style={{fontSize:9,fontWeight:700,color:'rgba(255,255,255,0.7)',background:'rgba(255,255,255,0.08)',borderRadius:6,padding:'2px 7px'}}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
function NorvaArt2500(){
  return(
    <div style={{width:200,height:160,borderRadius:14,overflow:'hidden',position:'relative',flexShrink:0,background:'linear-gradient(145deg,#061a0d 0%,#0f2318 40%,#1a3a22 100%)'}}>
      {/* glow circles */}
      <div style={{position:'absolute',top:-25,right:-25,width:110,height:110,borderRadius:'50%',background:'rgba(82,183,136,0.12)'}}/>
      <div style={{position:'absolute',bottom:-30,left:-15,width:90,height:90,borderRadius:'50%',background:'rgba(201,150,58,0.09)'}}/>
      {/* horizontal stripe accent */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,#52B788,#C9963A,#52B788)'}}/>
      {/* top row */}
      <div style={{position:'absolute',top:10,left:10,right:10,display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:1}}>
        <div style={{background:'rgba(82,183,136,0.18)',border:'1px solid rgba(82,183,136,0.4)',borderRadius:6,padding:'2px 8px',fontSize:8,fontWeight:800,color:'#52B788',letterSpacing:'0.07em',textTransform:'uppercase'}}>📅 Todo mês</div>
        <span style={{fontSize:9,fontWeight:900,color:'rgba(255,255,255,0.5)',letterSpacing:'0.04em'}}>NORVA</span>
      </div>
      {/* center value */}
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:1}}>
        <div style={{fontSize:9,fontWeight:700,color:'rgba(201,150,58,0.75)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:4}}>Ganhador recebe</div>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:30,fontWeight:900,color:'#C9963A',lineHeight:1,textShadow:'0 2px 16px rgba(201,150,58,0.5)'}}>R$2.500</div>
        <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.6)',marginTop:3,letterSpacing:'0.03em'}}>por semana</div>
      </div>
      {/* bottom bar */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'5px 10px',background:'rgba(0,0,0,0.35)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:1}}>
        <span style={{fontSize:8,fontWeight:900,color:'#fff',letterSpacing:'0.04em'}}>NORVA <span style={{color:'#C9963A'}}>CONSULTORIA</span></span>
        <span style={{fontSize:8,color:'rgba(255,255,255,0.4)'}}>Sorteio mensal</span>
      </div>
    </div>
  );
}
function NorvaArt10k(){
  return(
    <div style={{width:200,height:160,borderRadius:14,overflow:'hidden',position:'relative',flexShrink:0,background:'linear-gradient(145deg,#120820 0%,#1e0d38 40%,#2d1b4e 100%)'}}>
      {/* glow circles */}
      <div style={{position:'absolute',top:-25,right:-25,width:110,height:110,borderRadius:'50%',background:'rgba(251,191,36,0.1)'}}/>
      <div style={{position:'absolute',bottom:-30,left:-15,width:90,height:90,borderRadius:'50%',background:'rgba(251,191,36,0.07)'}}/>
      {/* horizontal stripe accent */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,#fbbf24,#f59e0b,#fbbf24)'}}/>
      {/* top row */}
      <div style={{position:'absolute',top:10,left:10,right:10,display:'flex',justifyContent:'space-between',alignItems:'center',zIndex:1}}>
        <div style={{background:'rgba(251,191,36,0.12)',border:'1px solid rgba(251,191,36,0.35)',borderRadius:6,padding:'2px 8px',fontSize:8,fontWeight:800,color:'#fbbf24',letterSpacing:'0.07em',textTransform:'uppercase'}}>🏆 Sorteio especial</div>
        <span style={{fontSize:9,fontWeight:900,color:'rgba(255,255,255,0.5)',letterSpacing:'0.04em'}}>NORVA</span>
      </div>
      {/* center value */}
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:1}}>
        <div style={{fontSize:9,fontWeight:700,color:'rgba(251,191,36,0.75)',letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:4}}>Grande prêmio</div>
        <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:30,fontWeight:900,color:'#fbbf24',lineHeight:1,textShadow:'0 2px 20px rgba(251,191,36,0.5)'}}>R$10.000</div>
        <div style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.6)',marginTop:3,letterSpacing:'0.03em'}}>por mês</div>
      </div>
      {/* bottom bar */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'5px 10px',background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'space-between',zIndex:1}}>
        <span style={{fontSize:8,fontWeight:900,color:'#fff',letterSpacing:'0.04em'}}>NORVA <span style={{color:'#fbbf24'}}>CONSULTORIA</span></span>
        <span style={{fontSize:8,color:'rgba(255,255,255,0.4)'}}>Sorteio mensal</span>
      </div>
    </div>
  );
}
function PrizeStrip({bare}){
  const scrollContent=(
    <div style={{display:'flex',gap:0,animation:'pmarquee 28s linear infinite',width:'max-content',alignItems:'center'}}>
      {[...PRIZE_CARDS,...PRIZE_CARDS].map((c,i)=>(
        <div key={i} style={{padding:'0 8px',flexShrink:0}}>
          {c.isArt      ? <NorvaArtCard/>
          :c.isCash2500 ? <NorvaArt2500/>
          :c.isCash10k  ? <NorvaArt10k/>
          :(
            <div style={{width:200,height:160,borderRadius:14,overflow:'hidden',position:'relative',flexShrink:0,background:'#1a2a1a'}}>
              <img src={c.img} alt={c.label}
                style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}
                onError={e=>{e.currentTarget.style.display='none';}}
              />
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.2) 55%,transparent 100%)'}}/>
              <div style={{position:'absolute',top:8,left:8,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(6px)',borderRadius:8,padding:'3px 9px',fontSize:9,fontWeight:700,color:c.accent,letterSpacing:'0.07em',textTransform:'uppercase',border:`1px solid ${c.accent}55`}}>{c.tag}</div>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'10px 12px'}}>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:19,fontWeight:900,color:c.accent,lineHeight:1}}>{c.val}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.85)',fontWeight:600,marginTop:2}}>{c.label}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  if(bare) return scrollContent;
  return(
    <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:'16px 0',overflow:'hidden',marginTop:20}}>
      <style>{`@keyframes pmarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
      {scrollContent}
    </div>
  );
}
// ─── BRAND LOGO ITEM (clube de vantagens) ──────────────────
function BrandLogoItem({ name, logo, color }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'0 28px',borderRight:'1px solid rgba(255,255,255,0.07)',flexShrink:0}}>
      <div style={{width:38,height:38,borderRadius:9,background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',flexShrink:0}}>
        {!err
          ? <img src={logo} alt={name} onError={()=>setErr(true)} style={{width:28,height:28,objectFit:'contain',display:'block'}}/>
          : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',background:color,color:'#fff',fontSize:14,fontWeight:900}}>{name[0]}</div>
        }
      </div>
      <span style={{fontSize:13,fontWeight:700,color:'rgba(255,255,255,0.8)',whiteSpace:'nowrap',letterSpacing:'-0.01em'}}>{name}</span>
    </div>
  );
}
// ─── CALC CHART ────────────────────────────────────────────
function CalcChart({ data }) {
  if (!data || data.length === 0) return null;
  const W=660,H=230,PL=62,PR=20,PT=16,PB=38;
  const cW=W-PL-PR, cH=H-PT-PB;
  const maxVal=Math.max(...data.map(d=>d.totalAcumulado));
  const xS=i=>PL+(i/(data.length-1||1))*cW;
  const yS=v=>PT+cH-Math.max(0,Math.min(1,(v/maxVal)))*cH;
  const path=key=>data.map((d,i)=>`${i===0?'M':'L'}${xS(i).toFixed(1)},${yS(d[key]).toFixed(1)}`).join(' ');
  const ticks=[0,.25,.5,.75,1];
  const fmt2=n=>n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1e3?`${(n/1e3).toFixed(0)}K`:'0';
  const fmtBRL=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const xIdxs=[...new Set([0,Math.floor(data.length/5),Math.floor(data.length*2/5),Math.floor(data.length*3/5),Math.floor(data.length*4/5),data.length-1])];
  return(
    <div style={{marginTop:24}}>
      <div style={{display:'flex',gap:20,marginBottom:10,flexWrap:'wrap'}}>
        {[['#C9963A','Total Acumulado'],['#52B788','Valor Investido'],['#60a5fa','Total em Juros']].map(([c,l])=>(
          <div key={l} style={{display:'flex',alignItems:'center',gap:6}}>
            <div style={{width:18,height:3,background:c,borderRadius:2}}/>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.65)'}}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,padding:'8px 4px 4px',overflow:'hidden'}}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',height:'auto',display:'block'}}>
          {ticks.map((t,i)=>{const y=yS(t*maxVal);return(<g key={i}>
            <line x1={PL} x2={W-PR} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <text x={PL-6} y={y+4} textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="10.5">{fmt2(t*maxVal)}</text>
          </g>);})}
          <path d={path('totalInvestido')} fill="none" stroke="#52B788" strokeWidth="2" strokeDasharray="5,3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={path('totalJuros')} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d={path('totalAcumulado')} fill="none" stroke="#C9963A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1={PL} x2={W-PR} y1={H-PB} y2={H-PB} stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          {xIdxs.filter(i=>i<data.length).map(i=>(
            <text key={i} x={xS(i).toFixed(1)} y={H-PB+15} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10.5">{data[i].mes}m</text>
          ))}
        </svg>
      </div>
      <div style={{marginTop:14,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:12,overflow:'hidden'}}>
        <div style={{fontSize:10,fontWeight:700,color:'#8AB49A',letterSpacing:'0.1em',textTransform:'uppercase',padding:'10px 14px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>Detalhamento Mensal</div>
        <div style={{maxHeight:220,overflowY:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
            <thead><tr style={{background:'rgba(255,255,255,0.04)',position:'sticky',top:0}}>
              {['Mês','Juros do Mês','Total Investido','Total Juros','Total Acumulado'].map(h=>(
                <th key={h} style={{padding:'8px 12px',textAlign:'right',color:'rgba(255,255,255,0.45)',fontWeight:600,borderBottom:'1px solid rgba(255,255,255,0.06)',whiteSpace:'nowrap',fontSize:11}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{data.map((d,i)=>(
              <tr key={d.mes} style={{borderBottom:'1px solid rgba(255,255,255,0.03)',background:i%2===0?'transparent':'rgba(255,255,255,0.015)'}}>
                <td style={{padding:'6px 12px',textAlign:'right',color:'rgba(255,255,255,0.55)'}}>{d.mes}</td>
                <td style={{padding:'6px 12px',textAlign:'right',color:'#60a5fa'}}>{fmtBRL(d.jurosMes)}</td>
                <td style={{padding:'6px 12px',textAlign:'right',color:'#52B788'}}>{fmtBRL(d.totalInvestido)}</td>
                <td style={{padding:'6px 12px',textAlign:'right',color:'#60a5fa'}}>{fmtBRL(d.totalJuros)}</td>
                <td style={{padding:'6px 12px',textAlign:'right',color:'#C9963A',fontWeight:600}}>{fmtBRL(d.totalAcumulado)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// ─── CALCULADORAS ──────────────────────────────────────────
function CalculadorasTab({ S }) {
  const [active, setActive] = useState(null);
  const [jsCapital,setJsCapital]=useState(''); const [jsTaxa,setJsTaxa]=useState(''); const [jsPeriodo,setJsPeriodo]=useState(''); const [jsTipoTaxa,setJsTipoTaxa]=useState('mes'); const [jsTipoPeriodo,setJsTipoPeriodo]=useState('meses'); const [jsAporte,setJsAporte]=useState(''); const [jsResult,setJsResult]=useState(null); const [jsMonthly,setJsMonthly]=useState([]);
  const [jcCapital,setJcCapital]=useState(''); const [jcTaxa,setJcTaxa]=useState(''); const [jcTipoTaxa,setJcTipoTaxa]=useState('mes'); const [jcPeriodo,setJcPeriodo]=useState(''); const [jcTipoPeriodo,setJcTipoPeriodo]=useState('meses'); const [jcAporte,setJcAporte]=useState(''); const [jcResult,setJcResult]=useState(null); const [jcMonthly,setJcMonthly]=useState([]);
  const [reGastos,setReGastos]=useState(''); const [reMeses,setReMeses]=useState('6'); const [reResult,setReResult]=useState(null);
  const [apRenda,setApRenda]=useState(''); const [apPct,setApPct]=useState(''); const [apRentab,setApRentab]=useState(''); const [apIdade,setApIdade]=useState(''); const [apIdadeAp,setApIdadeAp]=useState(''); const [apPatrim,setApPatrim]=useState(''); const [apResult,setApResult]=useState(null);
  const [pvInicial,setPvInicial]=useState(''); const [pvAporte,setPvAporte]=useState(''); const [pvPeriodo,setPvPeriodo]=useState(''); const [pvResult,setPvResult]=useState(null);
  const [avImovel,setAvImovel]=useState(''); const [avAluguel,setAvAluguel]=useState(''); const [avEntrada,setAvEntrada]=useState(''); const [avTaxa,setAvTaxa]=useState(''); const [avPrazo,setAvPrazo]=useState(''); const [avResult,setAvResult]=useState(null);
  const [pmCapital,setPmCapital]=useState(''); const [pmAporte,setPmAporte]=useState(''); const [pmTaxa,setPmTaxa]=useState(''); const [pmTipoTaxa,setPmTipoTaxa]=useState('mes'); const [pmPeriodoTipo,setPmPeriodoTipo]=useState('meses'); const [pmResult,setPmResult]=useState(null); const [pmMonthly,setPmMonthly]=useState([]);

  const calcs=[
    {id:'js',icon:'💰',name:'Juros Simples',desc:'Calcule rendimentos com juros simples'},
    {id:'jc',icon:'📈',name:'Juros Compostos',desc:'Simule o poder dos juros compostos com aportes'},
    {id:'re',icon:'🛡️',name:'Reserva de Emergência',desc:'Descubra quanto guardar para imprevistos'},
    {id:'ap',icon:'🏖️',name:'Simulador de Aposentadoria',desc:'Planeje sua aposentadoria com projeção real'},
    {id:'pv',icon:'🏦',name:'Poupança vs SELIC vs CDI',desc:'Compare onde seu dinheiro rende mais'},
    {id:'av',icon:'🏠',name:'Alugar vs Financiar',desc:'Qual opção imobiliária é mais vantajosa?'},
    {id:'pm',icon:'🏆',name:'Primeiro Milhão',desc:'Quanto tempo para chegar ao R$1.000.000?'},
  ];

  const fmt=(n)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const inp={width:'100%',padding:'11px 14px',borderRadius:10,border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.05)',color:'#fff',fontSize:14,outline:'none',boxSizing:'border-box'};
  const btnG={background:S.gold,color:S.deep,border:'none',borderRadius:10,padding:'12px 28px',fontSize:14,fontWeight:700,cursor:'pointer'};
  const btnO={background:'rgba(255,255,255,0.06)',color:'rgba(255,255,255,0.7)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'12px 20px',fontSize:14,fontWeight:600,cursor:'pointer'};
  const g2={display:'grid',gridTemplateColumns:'1fr 1fr',gap:14};
  const box={background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:24};
  const ob=()=>setActive(null);

  function calcJS(){
    const C=+jsCapital, taxa=+jsTaxa/100, t_raw=+jsPeriodo, ap=+jsAporte||0;
    if(!C||!taxa||!t_raw) return;
    const i = jsTipoTaxa==='ano' ? taxa/12 : taxa;
    const t = jsTipoPeriodo==='anos' ? t_raw*12 : t_raw;
    const monthly=[];
    for(let m=1;m<=t;m++){
      let acc=C*(1+i*m);
      for(let k=1;k<=m;k++) acc+=ap*(1+i*(m-k));
      const ti=C+ap*m;
      const tj=acc-ti;
      monthly.push({mes:m,jurosMes:i*(C+(m-1)*ap),totalInvestido:ti,totalJuros:tj,totalAcumulado:acc});
    }
    const last=monthly[monthly.length-1]||{totalAcumulado:C,totalInvestido:C,totalJuros:0};
    setJsResult({juros:last.totalJuros,montante:last.totalAcumulado,totalInvestido:last.totalInvestido});
    setJsMonthly(monthly);
  }
  function calcJC(){
    const C=+jcCapital||0,taxa=+jcTaxa/100,t_raw=+jcPeriodo||0,ap=+jcAporte||0;
    if((!C&&!ap)||!taxa||!t_raw)return;
    const i=jcTipoTaxa==='ano'?Math.pow(1+taxa,1/12)-1:taxa;
    const t=jcTipoPeriodo==='anos'?t_raw*12:t_raw;
    const monthly=[];let s=C;
    for(let m=1;m<=t;m++){const int=s*i;s=s*(1+i)+ap;const ti=C+ap*m;monthly.push({mes:m,jurosMes:int,totalInvestido:ti,totalJuros:s-ti,totalAcumulado:s});}
    const tot=C+ap*t;setJcResult({montante:s,totalInvestido:tot,juros:s-tot});setJcMonthly(monthly);
  }
  function calcRE(){const g=+reGastos,m=+reMeses;if(!g)return;setReResult({valor:g*m,gastos:g,meses:m});}
  function calcAP(){const r=+apRenda,p=+apPct/100,i=+apRentab/100/12,id=+apIdade,ia=+apIdadeAp,pt=+apPatrim||0;if(!r||!p||!i||!id||!ia)return;const m=(ia-id)*12,ap=r*p;let s=pt;for(let x=0;x<m;x++)s=s*(1+i)+ap;setApResult({patrimonio:s,rendaMensal:s*i,aporte:ap,anos:ia-id});}
  function calcPV(){const ini=+pvInicial||0,ap=+pvAporte||0,m=+pvPeriodo||0;if((!ini&&!ap)||!m)return;const ts={Poupança:0.0617/12,SELIC:0.1475/12,CDI:0.1465/12};const r={};for(const[n,t]of Object.entries(ts)){let s=ini;for(let x=0;x<m;x++)s=s*(1+t)+ap;r[n]=s;}setPvResult({...r,totalInvestido:ini+ap*m});}
  function calcAV(){const im=+avImovel,al=+avAluguel,en=+avEntrada||0,t=+avTaxa/100/12,pr=+avPrazo*12;if(!im||!al||!t||!pr)return;const fin=im-en,parc=(fin*t*Math.pow(1+t,pr))/(Math.pow(1+t,pr)-1);const tf=en+parc*pr,ta=al*pr;setAvResult({parcela:parc,totalFinanciar:tf,totalAlugar:ta,melhor:ta<tf?'Alugar':'Financiar'});}
  function calcPM(){
    const C=+pmCapital||0,ap=+pmAporte||0,taxa=+pmTaxa/100;
    if((!C&&!ap)||!taxa)return;
    const t=pmTipoTaxa==='ano'?Math.pow(1+taxa,1/12)-1:taxa;
    const monthly=[];let s=C,m=0;
    while(s<1000000&&m<1440){const int=s*t;s=s*(1+t)+ap;m++;const ti=C+ap*m;monthly.push({mes:m,jurosMes:int,totalInvestido:ti,totalJuros:s-ti,totalAcumulado:s});}
    const tot=C+ap*m;setPmResult({meses:m,anos:Math.floor(m/12),mesesR:m%12,totalInvestido:tot,atingiu:s>=1000000});setPmMonthly(monthly);
  }

  function renderCalc(){
    const selSt={background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,color:'#fff',padding:'0 10px',fontSize:13,fontWeight:600,cursor:'pointer',outline:'none',height:44};
    if(active==='js') return(
      <div><CalcHeader onBack={ob} title="Juros Simples" icon="💰"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Capital inicial (R$)" value={jsCapital} set={setJsCapital} ph="10000"/>
            <CalcField label="Aporte mensal (R$)" value={jsAporte} set={setJsAporte} ph="0"/>
            <div>
              <label style={CLBL}>Taxa de juros (%)</label>
              <div style={{display:'flex',gap:8}}>
                <input type="text" value={jsTaxa} onChange={e=>setJsTaxa(e.target.value)} placeholder="2" style={{...CINP,flex:1}}/>
                <select value={jsTipoTaxa} onChange={e=>setJsTipoTaxa(e.target.value)} style={selSt}>
                  <option value="mes">% mês</option>
                  <option value="ano">% ano</option>
                </select>
              </div>
            </div>
            <div>
              <label style={CLBL}>Quantidade de períodos</label>
              <div style={{display:'flex',gap:8}}>
                <input type="text" value={jsPeriodo} onChange={e=>setJsPeriodo(e.target.value)} placeholder="12" style={{...CINP,flex:1}}/>
                <select value={jsTipoPeriodo} onChange={e=>setJsTipoPeriodo(e.target.value)} style={selSt}>
                  <option value="meses">meses</option>
                  <option value="anos">anos</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcJS} style={btnG}>Calcular</button>
            <button onClick={()=>{setJsResult(null);setJsMonthly([]);}} style={btnO}>Limpar</button>
          </div>
          {jsResult&&<><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginTop:20}}>
            <CalcResCard label="Total investido" value={fmt(jsResult.totalInvestido)}/>
            <CalcResCard label="Juros obtidos" value={fmt(jsResult.juros)}/>
            <CalcResCard label="Montante final" value={fmt(jsResult.montante)} sub={`Capital: ${fmt(+jsCapital)}`} hi/>
          </div>
          <CalcChart data={jsMonthly}/></>}
        </div>
      </div>
    );
    if(active==='jc') return(
      <div><CalcHeader onBack={ob} title="Juros Compostos" icon="📈"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Capital inicial (R$)" value={jcCapital} set={setJcCapital} ph="0"/>
            <CalcField label="Aporte mensal (R$)" value={jcAporte} set={setJcAporte} ph="500"/>
            <div>
              <label style={CLBL}>Taxa de juros (%)</label>
              <div style={{display:'flex',gap:8}}>
                <input type="text" value={jcTaxa} onChange={e=>setJcTaxa(e.target.value)} placeholder="1" style={{...CINP,flex:1}}/>
                <select value={jcTipoTaxa} onChange={e=>setJcTipoTaxa(e.target.value)} style={selSt}>
                  <option value="mes">% mês</option>
                  <option value="ano">% ano</option>
                </select>
              </div>
            </div>
            <div>
              <label style={CLBL}>Quantidade de períodos</label>
              <div style={{display:'flex',gap:8}}>
                <input type="text" value={jcPeriodo} onChange={e=>setJcPeriodo(e.target.value)} placeholder="60" style={{...CINP,flex:1}}/>
                <select value={jcTipoPeriodo} onChange={e=>setJcTipoPeriodo(e.target.value)} style={selSt}>
                  <option value="meses">meses</option>
                  <option value="anos">anos</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcJC} style={btnG}>Calcular</button>
            <button onClick={()=>{setJcResult(null);setJcMonthly([]);}} style={btnO}>Limpar</button>
          </div>
          {jcResult&&<><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginTop:20}}>
            <CalcResCard label="Total investido" value={fmt(jcResult.totalInvestido)}/>
            <CalcResCard label="Juros ganhos" value={fmt(jcResult.juros)} sub={`${((jcResult.juros/jcResult.totalInvestido)*100).toFixed(1)}% de rendimento`}/>
            <CalcResCard label="Montante final" value={fmt(jcResult.montante)} sub="Patrimônio acumulado" hi/>
          </div>
          <CalcChart data={jcMonthly}/></>}
        </div>
      </div>
    );
    if(active==='re') return(
      <div><CalcHeader onBack={ob} title="Reserva de Emergência" icon="🛡️"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Gastos mensais totais (R$)" value={reGastos} set={setReGastos} ph="3000"/>
            <CalcField label="Meses de reserva" value={reMeses} set={setReMeses} opts={[{v:'3',l:'3 meses (mínimo)'},{v:'6',l:'6 meses (recomendado)'},{v:'12',l:'12 meses (ideal)'}]}/>
          </div>
          <div style={{background:'rgba(201,150,58,0.08)',border:'1px solid rgba(201,150,58,0.2)',borderRadius:10,padding:14,marginTop:14,fontSize:13,color:'rgba(255,255,255,0.6)',lineHeight:1.6}}>
            💡 <strong style={{color:'#fff'}}>Dica Norva:</strong> Guarde na Selic ou em CDB de liquidez diária para ter acesso sem perda de rendimento.
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcRE} style={btnG}>Calcular</button>
            <button onClick={()=>setReResult(null)} style={btnO}>Limpar</button>
          </div>
          {reResult&&<div style={{marginTop:20}}>
            <CalcResCard label={`Reserva necessária (${reResult.meses} meses)`} value={fmt(reResult.valor)} sub={`${fmt(reResult.gastos)}/mês × ${reResult.meses} meses`} hi/>
          </div>}
        </div>
      </div>
    );
    if(active==='ap') return(
      <div><CalcHeader onBack={ob} title="Simulador de Aposentadoria" icon="🏖️"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Renda mensal atual (R$)" value={apRenda} set={setApRenda} ph="5000"/>
            <CalcField label="% da renda para investir" value={apPct} set={setApPct} ph="20"/>
            <CalcField label="Rentabilidade anual (%)" value={apRentab} set={setApRentab} ph="10"/>
            <CalcField label="Patrimônio já acumulado (R$)" value={apPatrim} set={setApPatrim} ph="0"/>
            <CalcField label="Idade atual" value={apIdade} set={setApIdade} ph="30"/>
            <CalcField label="Idade para aposentar" value={apIdadeAp} set={setApIdadeAp} ph="65"/>
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcAP} style={btnG}>Calcular</button>
            <button onClick={()=>setApResult(null)} style={btnO}>Limpar</button>
          </div>
          {apResult&&<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginTop:20}}>
            <CalcResCard label="Aporte mensal" value={fmt(apResult.aporte)} sub={`Por ${apResult.anos} anos`}/>
            <CalcResCard label="Patrimônio projetado" value={fmt(apResult.patrimonio)} sub="Ao se aposentar" hi/>
            <CalcResCard label="Renda passiva mensal" value={fmt(apResult.rendaMensal)} sub="Rendimento do patrimônio"/>
          </div>}
        </div>
      </div>
    );
    if(active==='pv') return(
      <div><CalcHeader onBack={ob} title="Poupança vs SELIC vs CDI" icon="🏦"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Valor inicial (R$)" value={pvInicial} set={setPvInicial} ph="10000"/>
            <CalcField label="Aporte mensal (R$)" value={pvAporte} set={setPvAporte} ph="500"/>
          </div>
          <div style={{marginTop:14}}><CalcField label="Período (meses)" value={pvPeriodo} set={setPvPeriodo} ph="24"/></div>
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:10,padding:12,marginTop:14}}>
            <div style={{fontSize:11,color:S.muted,marginBottom:4}}>Taxas aproximadas (mai/2025)</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.6)',lineHeight:1.8}}>Poupança: 6,17% a.a. · SELIC: 14,75% a.a. · CDI: 14,65% a.a.</div>
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcPV} style={btnG}>Calcular</button>
            <button onClick={()=>setPvResult(null)} style={btnO}>Limpar</button>
          </div>
          {pvResult&&<div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:12,marginTop:20}}>
              <CalcResCard label="Total investido" value={fmt(pvResult.totalInvestido)}/>
              <CalcResCard label="Poupança" value={fmt(pvResult['Poupança'])} sub={`+${fmt(pvResult['Poupança']-pvResult.totalInvestido)} de juros`}/>
              <CalcResCard label="SELIC" value={fmt(pvResult['SELIC'])} sub={`+${fmt(pvResult['SELIC']-pvResult.totalInvestido)} de juros`} hi/>
              <CalcResCard label="CDI (100%)" value={fmt(pvResult['CDI'])} sub={`+${fmt(pvResult['CDI']-pvResult.totalInvestido)} de juros`}/>
            </div>
            <div style={{marginTop:14,padding:14,background:'rgba(82,183,136,0.1)',border:'1px solid rgba(82,183,136,0.25)',borderRadius:10,fontSize:13,color:'#52B788'}}>
              💡 Investindo na SELIC você ganharia <strong>{fmt(pvResult['SELIC']-pvResult['Poupança'])}</strong> a mais que na poupança nesse período.
            </div>
          </div>}
        </div>
      </div>
    );
    if(active==='av') return(
      <div><CalcHeader onBack={ob} title="Alugar vs Financiar" icon="🏠"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Valor do imóvel (R$)" value={avImovel} set={setAvImovel} ph="500000"/>
            <CalcField label="Aluguel mensal (R$)" value={avAluguel} set={setAvAluguel} ph="2500"/>
            <CalcField label="Entrada (R$)" value={avEntrada} set={setAvEntrada} ph="100000"/>
            <CalcField label="Taxa de juros anual (%)" value={avTaxa} set={setAvTaxa} ph="10"/>
            <CalcField label="Prazo do financiamento (anos)" value={avPrazo} set={setAvPrazo} ph="30"/>
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcAV} style={btnG}>Calcular</button>
            <button onClick={()=>setAvResult(null)} style={btnO}>Limpar</button>
          </div>
          {avResult&&<div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginTop:20}}>
              <CalcResCard label="Parcela mensal" value={fmt(avResult.parcela)} sub="Financiamento"/>
              <CalcResCard label="Custo total financiando" value={fmt(avResult.totalFinanciar)} sub="Entrada + todas as parcelas" hi={avResult.melhor==='Financiar'}/>
              <CalcResCard label="Custo total alugando" value={fmt(avResult.totalAlugar)} sub={`${avPrazo} anos de aluguel`} hi={avResult.melhor==='Alugar'}/>
            </div>
            <div style={{marginTop:14,padding:14,background:'rgba(201,150,58,0.1)',border:'1px solid rgba(201,150,58,0.25)',borderRadius:10,fontSize:13,color:S.gold,fontWeight:600}}>
              📊 Com base nos valores informados, <strong>{avResult.melhor}</strong> é a opção mais econômica em custos totais.
            </div>
          </div>}
        </div>
      </div>
    );
    if(active==='pm') return(
      <div><CalcHeader onBack={ob} title="Calculadora do Primeiro Milhão" icon="🏆"/>
        <div style={box}>
          <div style={g2}>
            <CalcField label="Capital inicial (R$)" value={pmCapital} set={setPmCapital} ph="0"/>
            <CalcField label="Aporte mensal (R$)" value={pmAporte} set={setPmAporte} ph="1000"/>
            <div>
              <label style={CLBL}>Rentabilidade (%)</label>
              <div style={{display:'flex',gap:8}}>
                <input type="text" value={pmTaxa} onChange={e=>setPmTaxa(e.target.value)} placeholder="1" style={{...CINP,flex:1}}/>
                <select value={pmTipoTaxa} onChange={e=>setPmTipoTaxa(e.target.value)} style={selSt}>
                  <option value="mes">% mês</option>
                  <option value="ano">% ano</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{display:'flex',gap:12,marginTop:20}}>
            <button onClick={calcPM} style={btnG}>Calcular</button>
            <button onClick={()=>{setPmResult(null);setPmMonthly([]);}} style={btnO}>Limpar</button>
          </div>
          {pmResult&&<div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginTop:20}}>
              <CalcResCard label="Tempo para R$1.000.000" value={pmResult.anos>0?`${pmResult.anos}a ${pmResult.mesesR}m`:`${pmResult.mesesR} meses`} sub="Para atingir o primeiro milhão" hi/>
              <CalcResCard label="Total investido (seu)" value={fmt(pmResult.totalInvestido)} sub="Seus aportes próprios"/>
              <CalcResCard label="Juros ganhos" value={fmt(1000000-pmResult.totalInvestido)} sub={`${(((1000000-pmResult.totalInvestido)/pmResult.totalInvestido)*100).toFixed(0)}% do patrimônio`}/>
            </div>
            <div style={{marginTop:14,padding:14,background:'rgba(201,150,58,0.1)',border:'1px solid rgba(201,150,58,0.25)',borderRadius:10,fontSize:13,color:S.gold}}>
              🏆 Com <strong>{fmt(+pmAporte)}/mês</strong> a <strong>{pmTaxa}% a.m.</strong>, você chega ao primeiro milhão em <strong>{pmResult.anos>0?`${pmResult.anos} anos e ${pmResult.mesesR} meses`:`${pmResult.mesesR} meses`}</strong>!
            </div>
            <CalcChart data={pmMonthly}/>
          </div>}
        </div>
      </div>
    );
    return null;
  }

  if(active) return renderCalc();

  return(
    <div>
      <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:800,marginBottom:6}}>Calculadoras Financeiras</div>
      <div style={{fontSize:13,color:S.muted,marginBottom:24}}>Selecione uma calculadora para simular seus cenários financeiros.</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        {calcs.map(c=>(
          <div key={c.id} onClick={()=>setActive(c.id)}
            style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:14,padding:22,cursor:'pointer',display:'flex',gap:16,alignItems:'flex-start',transition:'border-color .2s,background .2s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,150,58,0.4)';e.currentTarget.style.background='rgba(201,150,58,0.06)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.08)';e.currentTarget.style.background='rgba(255,255,255,0.04)';}}>
            <div style={{fontSize:32,flexShrink:0}}>{c.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:5}}>{c.name}</div>
              <div style={{fontSize:12,color:S.muted,lineHeight:1.5}}>{c.desc}</div>
            </div>
            <div style={{fontSize:18,color:S.gold,alignSelf:'center'}}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CLIENT AREA ───────────────────────────────────────────
function ClientArea({ user, onLogout, dark, toggleDark }) {
  const C = getC(true);
  const [active, setActive] = useState("dashboard");
  const [goals, setGoals] = useState(mockGoalsData);
  const [newGoal, setNewGoal] = useState({ label:"", target:"", current:"" });
  const [form, setForm] = useState({
    renda:"", gastos:"", dividas:"", objetivo:"",
    reserva:"", investimentos:"", dependentes:"", moradia:"",
    transporte:"", alimentacao:"", lazer:"", educacao:"",
    planoSaude:"", poupaMes:"", cartaoCredito:"", parcelamentos:"",
    rendaExtra:"", temInvestimentos:"", tipoInvestimento:"", prazoObjetivo:"",
  });
  const [report, setReport] = useState(""); const [loading, setLoading] = useState(false);
  const [norvaScore, setNorvaScore] = useState(null);
  const [showAgModal, setShowAgModal] = useState(false);
  const [agData, setAgData] = useState({ data:"", hora:"", duracao:"45", assunto:"" });
  const [scoreTab, setScoreTab] = useState("porque");
  const [scoreChecked, setScoreChecked] = useState({});

  // Onboarding
  const [needsOnboarding, setNeedsOnboarding] = useState(!!user.needsOnboarding);
  const [obName,  setObName]  = useState(user.name && !user.name.includes('@') ? user.name : '');
  const [obPhone, setObPhone] = useState(user.phone      || '');
  const [obBirth, setObBirth] = useState(user.birth_date || '');
  const [obError, setObError] = useState('');
  const [obLoading, setObLoading] = useState(false);

  // User menu & profile edit
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profName,  setProfName]  = useState('');
  const [profPhone, setProfPhone] = useState('');
  const [profBirth, setProfBirth] = useState('');
  const [profEmail, setProfEmail] = useState('');
  const [profError, setProfError] = useState('');
  const [profMsg,   setProfMsg]   = useState('');
  const [profSaving,setProfSaving]= useState(false);

  function openProfile() {
    setProfName(displayedName); setProfPhone(user.phone||obPhone||'');
    setProfBirth(user.birth_date||obBirth||''); setProfEmail(user.email||'');
    setProfError(''); setProfMsg(''); setShowProfile(true); setShowUserMenu(false);
  }

  async function saveProfile() {
    if (!profName) { setProfError('O nome é obrigatório.'); return; }
    setProfSaving(true);
    const { supabase } = await import('./lib/supabase');
    const { error } = await supabase.auth.updateUser({ data: { full_name: profName, phone: profPhone, birth_date: profBirth } });
    if (!error) {
      await supabase.from('profiles').upsert({ id: user.supabaseId, full_name: profName, phone: profPhone, birth_date: profBirth, email: user.email, role: 'client' });
      user.name = profName; user.phone = profPhone; user.birth_date = profBirth;
      setObName(profName); setObPhone(profPhone); setObBirth(profBirth);
      setProfMsg('Dados salvos com sucesso!');
    } else { setProfError('Erro ao salvar. Tente novamente.'); }
    setProfSaving(false);
  }

  async function submitOnboarding() {
    if (!obName || !obPhone || !obBirth) { setObError('Preencha todos os campos.'); return; }
    setObLoading(true);
    const { supabase } = await import('./lib/supabase');
    const { error } = await supabase.auth.updateUser({ data: { full_name: obName, phone: obPhone, birth_date: obBirth } });
    if (!error) {
      await supabase.from('profiles').upsert({ id: user.supabaseId, full_name: obName, phone: obPhone, birth_date: obBirth, email: user.email, role: 'client' });
      user.name = obName; user.phone = obPhone; user.birth_date = obBirth;
      setNeedsOnboarding(false);
    } else { setObError('Erro ao salvar. Tente novamente.'); }
    setObLoading(false);
  }

  const S = {
    deep:"#1B4332", mid:"#2D6A4F", leaf:"#52B788",
    gold:"#C9963A", goldL:"#D4AA5A",
    bg:"#0F2A1C", sb:"#0A1F14",
    card:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.08)",
    borderGold:"rgba(201,150,58,0.25)", muted:"#8AB49A",
  };

  const navSections = [
    { label:"Principal", items:[
      { id:"dashboard",    label:"Início",    icon:"🏠" },
      { id:"score",        label:"Meu Score", icon:"🎯" },
      { id:"orcamento",    label:"Orçamento", icon:"📊" },
      { id:"goals",        label:"Metas",     icon:"🏆" },
    ]},
    { label:"Ferramentas", items:[
      { id:"calculadoras", label:"Calculadoras", icon:"🧮" },
      { id:"education",    label:"Conteúdo",     icon:"📚", badge:"3" },
      { id:"consulting",   label:"Consultoria",  icon:"💬" },
    ]},
    { label:"Conta", items:[
      { id:"partners",     label:"Clube de Descontos", icon:"🏷️" },
      { id:"report",       label:"Relatório IA",       icon:"🤖" },
    ]},
  ];

  const displayedName = obName || (user.name && !user.name.includes('@') ? user.name : 'Cliente');
  const userName = displayedName.split(" ")[0];
  const initials = displayedName.split(" ").filter(Boolean).map(w=>w[0]).slice(0,2).join("").toUpperCase() || "CL";
  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";
  const g2 = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 };
  const g3 = { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 };

  function calcNorvaScore(f) {
    let pts = 0;
    const renda = parseFloat(f.renda)||0;
    const gastos = parseFloat(f.gastos)||0;
    const reserva = parseFloat(f.reserva)||0;
    const dividas = parseFloat(f.dividas)||0;
    const poupaMes = parseFloat(f.poupaMes)||0;
    const invest = parseFloat(f.investimentos)||0;
    const parcelamentos = parseFloat(f.parcelamentos)||0;
    const cartao = parseFloat(f.cartaoCredito)||0;
    if(renda>0){
      const txPoup=(poupaMes/renda)*100;
      if(txPoup>=20) pts+=200; else if(txPoup>=15) pts+=170; else if(txPoup>=10) pts+=130; else if(txPoup>=5) pts+=80; else if(txPoup>0) pts+=30;
    }
    if(renda>0){
      const comp=(gastos/renda)*100;
      if(comp<=50) pts+=200; else if(comp<=65) pts+=160; else if(comp<=75) pts+=110; else if(comp<=85) pts+=60; else if(comp<=95) pts+=20;
    }
    if(renda>0&&reserva>0){
      const m=reserva/(gastos||renda);
      if(m>=6) pts+=200; else if(m>=3) pts+=140; else if(m>=1) pts+=70; else pts+=20;
    }
    if(renda>0){
      const dr=dividas/renda;
      if(dividas===0) pts+=150; else if(dr<=1) pts+=110; else if(dr<=3) pts+=70; else if(dr<=6) pts+=30;
    }
    if(renda>0){
      const cc=((cartao+parcelamentos)/renda)*100;
      if(cc===0) pts+=100; else if(cc<=10) pts+=80; else if(cc<=20) pts+=50; else if(cc<=30) pts+=20;
    }
    if(f.temInvestimentos==="sim") pts+=60;
    if(invest>0&&renda>0){ const r=invest/renda; if(r>=12) pts+=40; else if(r>=6) pts+=25; else pts+=10; }
    if(f.planoSaude==="sim") pts+=30;
    if(f.rendaExtra==="sim") pts+=20;
    return Math.min(1000,Math.round(pts));
  }

  function scoreInfo(s){
    if(s<=200) return {label:"Crítico",     color:"#ef4444",bg:"rgba(239,68,68,0.12)",  emoji:"🚨",desc:"Situação financeira muito delicada. Ação imediata necessária."};
    if(s<=499) return {label:"Negativado",  color:"#f97316",bg:"rgba(249,115,22,0.12)", emoji:"⚠️",desc:"Dívidas e gastos comprometendo seu futuro. Reorganização urgente."};
    if(s<=600) return {label:"Em Risco",    color:"#eab308",bg:"rgba(234,179,8,0.12)",  emoji:"📉",desc:"Finanças frágeis. Pequenos imprevistos podem gerar grandes problemas."};
    if(s<=800) return {label:"Estável",     color:"#60a5fa",bg:"rgba(96,165,250,0.12)", emoji:"📊",desc:"Situação controlada, mas com espaço significativo para evoluir."};
    if(s<=900) return {label:"Saudável",    color:"#52B788",bg:"rgba(82,183,136,0.12)", emoji:"✅",desc:"Boas práticas financeiras. Continue e expanda seus investimentos."};
    return       {label:"Excelente",    color:"#C9963A",bg:"rgba(201,150,58,0.12)", emoji:"🏆",desc:"Referência em educação financeira. Patrimônio sólido e crescente."};
  }

  function gerarRelatorio(f, score) {
    const renda = parseFloat(f.renda)||0;
    const gastos = parseFloat(f.gastos)||0;
    const reserva = parseFloat(f.reserva)||0;
    const dividas = parseFloat(f.dividas)||0;
    const poupaMes = parseFloat(f.poupaMes)||0;
    const invest = parseFloat(f.investimentos)||0;
    const parcelamentos = parseFloat(f.parcelamentos)||0;
    const cartao = parseFloat(f.cartaoCredito)||0;
    const sobra = renda - gastos;
    const pctGastos = renda>0 ? Math.round((gastos/renda)*100) : 0;
    const pctPoup = renda>0 ? Math.round((poupaMes/renda)*100) : 0;
    const mesesReserva = (reserva>0&&gastos>0) ? (reserva/gastos).toFixed(1) : 0;
    const totalCredito = cartao + parcelamentos;
    const pctCredito = renda>0 ? Math.round((totalCredito/renda)*100) : 0;
    const info = scoreInfo(score);
    const fmt = v => "R$ "+v.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});

    // ── PANORAMA ──────────────────────────────────────
    let panorama = `Seu Score Norva é **${score}/1000 — ${info.label}** ${info.emoji}. `;
    if(score<=200) panorama += `Sua situação financeira está em estado crítico: ${pctGastos}% da renda é consumida por gastos, sobrando apenas ${fmt(sobra < 0 ? 0 : sobra)} ao mês. É necessária ação imediata para evitar o colapso financeiro.`;
    else if(score<=499) panorama += `Há um comprometimento elevado da renda (${pctGastos}% em gastos) e o peso das dívidas limita sua capacidade de construir patrimônio. Com reorganização focada, você pode mudar esse quadro em 6 a 12 meses.`;
    else if(score<=600) panorama += `Você tem o básico sob controle, mas a margem de segurança ainda é pequena. Sua reserva cobre apenas ${mesesReserva} mês(es) de despesas — o ideal são 6. Pequenos ajustes terão grande impacto.`;
    else if(score<=800) panorama += `Sua situação é estável: gastos sob controle (${pctGastos}% da renda) e alguma capacidade de poupança (${pctPoup}%). O próximo passo é acelerar a construção de patrimônio e elevar a reserva de emergência.`;
    else if(score<=900) panorama += `Você tem boas práticas financeiras consolidadas: poupa ${pctPoup}% da renda e já possui investimentos. O foco agora é diversificar, proteger o patrimônio e otimizar a rentabilidade.`;
    else panorama += `Sua saúde financeira é excelente — você está entre os 5% mais organizados financeiramente. O desafio é manter a disciplina, proteger o patrimônio conquistado e buscar independência financeira.`;

    // ── PONTOS POSITIVOS ──────────────────────────────
    const positivos = [];
    if(poupaMes>0) positivos.push(`Você já tem o hábito de poupar ${fmt(poupaMes)}/mês (${pctPoup}% da renda) — isso é mais do que a maioria das pessoas consegue.`);
    if(f.temInvestimentos==="sim") positivos.push(`Possui investimentos${f.tipoInvestimento?" em "+f.tipoInvestimento:""}, o que significa que seu dinheiro já trabalha para você.`);
    if(f.planoSaude==="sim") positivos.push(`Tem plano de saúde, o que protege seu patrimônio contra gastos médicos inesperados — uma das maiores causas de endividamento no Brasil.`);
    if(f.rendaExtra==="sim"||parseFloat(f.rendaExtra)>0) positivos.push(`Possui renda extra além do salário principal, o que aumenta sua resiliência financeira.`);
    if(dividas===0) positivos.push(`Está livre de dívidas — uma conquista importante que poucos alcançam.`);
    if(reserva>=gastos*3) positivos.push(`Reserva de emergência de ${fmt(reserva)} cobrindo ${mesesReserva} meses de despesas — dentro do recomendado.`);
    if(positivos.length===0) positivos.push(`Você buscou um diagnóstico financeiro — isso já demonstra consciência e disposição para mudar.`);

    // ── PONTOS DE ATENÇÃO ────────────────────────────
    const atencao = [];
    if(pctGastos>=85) atencao.push(`**Comprometimento crítico da renda:** ${pctGastos}% da sua renda vai para gastos. O recomendado é no máximo 70%. Você tem apenas ${fmt(sobra)} de sobra mensal.`);
    else if(pctGastos>=70) atencao.push(`**Renda muito comprometida:** ${pctGastos}% dos seus ganhos vão para gastos. O objetivo é reduzir para menos de 70% e ampliar a margem de poupança.`);
    if(dividas>0&&renda>0) atencao.push(`**Dívidas representam ${Math.round((dividas/renda)*100)}% da sua renda mensal** (${fmt(dividas)} no total). Enquanto não quitadas, os juros corroem sua capacidade de acumular patrimônio.`);
    if(reserva<gastos*3&&reserva>=0) atencao.push(`**Reserva de emergência insuficiente:** você tem ${fmt(reserva)} — o ideal são ${fmt(gastos*6)} (6 meses de gastos). Sem ela, qualquer imprevisto vira dívida.`);
    if(pctCredito>=30) atencao.push(`**Crédito comprometido:** cartão + parcelas somam ${fmt(totalCredito)}/mês (${pctCredito}% da renda). Isso limita severamente sua capacidade de investir.`);
    if(f.temInvestimentos!=="sim") atencao.push(`**Sem investimentos:** cada mês sem investir é um mês em que a inflação corrói seu poder de compra. Mesmo ${fmt(50)}/mês já faz diferença no longo prazo.`);
    if(atencao.length===0) atencao.push(`Seu perfil não apresenta alertas críticos. Continue monitorando seus gastos mensalmente e ajuste quando necessário.`);

    // ── PLANO 30 DIAS ────────────────────────────────
    const p30 = [];
    if(dividas>0) {
      const menorParcela = Math.min(renda*0.1, dividas);
      p30.push(`**Ataque sua maior dívida:** separe ${fmt(Math.round(menorParcela/100)*100)}/mês especificamente para amortizar ${f.dividas||"suas dívidas"}. Negocie a redução de juros diretamente com o credor (muitas vezes oferecem até 90% de desconto).`);
    }
    if(reserva<gastos*1) p30.push(`**Crie sua reserva inicial:** abra uma conta separada e transfira ${fmt(Math.max(50,Math.round(sobra*0.3/50)*50))} hoje mesmo. Trate como uma conta de água — não opcional.`);
    if(pctGastos>70) p30.push(`**Mapeie seus gastos:** durante 30 dias anote cada saída de dinheiro no celular. Você vai descobrir onde está perdendo ${fmt(Math.round(gastos*0.15))} ou mais sem perceber.`);
    if(cartao>renda*0.2) p30.push(`**Congele o cartão de crédito:** literalmente. Pague à vista ou no débito por 30 dias. Isso vai reduzir sua fatura em pelo menos ${fmt(Math.round(cartao*0.2/100)*100)}.`);
    if(p30.length<3) p30.push(`**Revise assinaturas e serviços:** liste todos os débitos automáticos e cancele os que não usa. Em média, pessoas economizam ${fmt(80)} a ${fmt(250)}/mês só nesse passo.`);

    // ── PLANO 90 DIAS ────────────────────────────────
    const objetivo = f.objetivo||"organizar suas finanças";
    const prazo = f.prazoObjetivo||"6 a 12 meses";
    const p90 = [
      `**Alcançar ${fmt(gastos*3)} de reserva de emergência** nos próximos 90 dias, poupando ${fmt(Math.round((gastos*3-reserva)/3/50)*50)}/mês. Isso dará estabilidade para tomar decisões melhores sobre "${objetivo}".`,
      poupaMes<renda*0.1
        ? `**Elevar sua taxa de poupança para ${Math.min(15,pctPoup+5)}% da renda** (${fmt(Math.round(renda*Math.min(0.15,(pctPoup+5)/100)/50)*50)}/mês). Com essa base, em ${prazo} você terá acumulado ${fmt(Math.round(renda*0.12*3/100)*100)}.`
        : `**Começar a investir regularmente:** com sua taxa atual de poupança, direcione ${fmt(Math.round(poupaMes*0.6/50)*50)}/mês para CDB ou Tesouro Selic. Em 90 dias você terá ${fmt(Math.round(poupaMes*0.6*3/100)*100)} rendendo juros.`,
    ];

    // ── EVOLUIR SCORE ────────────────────────────────
    let evolucao = "";
    if(score<=200) evolucao = `Para sair de **Crítico** para **Negativado**, você precisa: (1) reduzir gastos em pelo menos R$ ${Math.round((gastos-renda*0.85)/100)*100}/mês, (2) começar a poupar qualquer valor fixo mensalmente e (3) negociar ao menos uma dívida. Estimativa: **3 a 6 meses** de disciplina.`;
    else if(score<=499) evolucao = `Para passar de **Negativado** para **Em Risco**, foque em: (1) quitar a menor dívida primeiro (método bola de neve), (2) criar reserva de ${fmt(gastos)} (1 mês de gastos) e (3) poupar pelo menos 5% da renda. Estimativa: **4 a 8 meses**.`;
    else if(score<=600) evolucao = `De **Em Risco** para **Estável**: complete sua reserva de emergência para ${fmt(gastos*3)}, eleve sua poupança mensal para 10% da renda e quite pendências de crédito. Estimativa: **6 a 10 meses**.`;
    else if(score<=800) evolucao = `De **Estável** para **Saudável**: inicie ou amplie investimentos, chegue a ${fmt(gastos*6)} de reserva e mantenha gastos abaixo de 65% da renda. Estimativa: **8 a 14 meses** mantendo consistência.`;
    else if(score<=900) evolucao = `De **Saudável** para **Excelente**: diversifique sua carteira de investimentos (ações, FIIs, renda fixa), busque uma segunda fonte de renda e planeje previdência privada. Estimativa: **12 a 24 meses**.`;
    else evolucao = `Você atingiu o nível **Excelente**. Para manter: revise seus investimentos trimestralmente, diversifique em pelo menos 3 classes de ativos e defina metas de independência financeira (FIRE).`;

    // ── MONTAR RELATÓRIO FORMATADO ────────────────────
    return [
      `**Panorama Geral:`,`${panorama}`,
      `**Pontos Positivos:`,positivos.map((p,i)=>`${i+1}. ${p}`).join("\n"),
      `**Pontos de Atenção:`,atencao.map((p,i)=>`${i+1}. ${p}`).join("\n"),
      `**Plano de Ação — 30 dias:`,p30.map((p,i)=>`${i+1}. ${p}`).join("\n"),
      `**Plano de Ação — 90 dias:`,p90.map((p,i)=>`${i+1}. ${p}`).join("\n"),
      `**Como Evoluir seu Score:`,evolucao,
    ].join("\n");
  }

  async function genReport() {
    if (!form.renda || !form.gastos) return;
    const score = calcNorvaScore(form);
    setNorvaScore(score);
    setLoading(true); setReport("");
    await new Promise(r=>setTimeout(r,900)); // animação de carregamento
    setReport(gerarRelatorio(form, score));
    setLoading(false);
  }

  function addGoal() {
    if (!newGoal.label||!newGoal.target) return;
    setGoals(g=>[...g,{id:Date.now(),label:newGoal.label,target:+newGoal.target,current:+newGoal.current||0}]);
    setNewGoal({label:"",target:"",current:""});
  }

  function renderContent() {
    if (active==="calculadoras") return <CalculadorasTab S={S}/>;
    if (active==="dashboard") return (
      <div style={{display:"flex",flexDirection:"column",gap:28}}>
        {/* KPI ROW */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {[
            {label:"Saldo disponível", value:"R$1.240", change:"↑ +R$180 vs mês anterior", up:true,  color:"#fff"},
            {label:"Gastos do mês",    value:"R$1.620", change:"↑ +5% vs meta",            up:false, color:"#fff"},
            {label:"Guardado em maio", value:"R$1.200", change:"↑ Meta atingida",           up:true,  color:S.gold},
            {label:"Score financeiro", value:"720",     change:"↑ +18 pts este mês",        up:true,  color:S.gold},
          ].map((k,i)=>(
            <div key={i} style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:12,padding:"22px 24px",cursor:"default",transition:"border-color .25s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=S.borderGold}
              onMouseLeave={e=>e.currentTarget.style.borderColor=S.border}>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:S.muted,marginBottom:10}}>{k.label}</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:32,fontWeight:800,lineHeight:1,color:k.color,marginBottom:6}}>{k.value}</div>
              <div style={{fontSize:12,color:k.up?"#52B788":"#E07070"}}>{k.change}</div>
            </div>
          ))}
        </div>

        {/* MID ROW */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
          {/* Score Ring */}
          <div style={{background:S.card,border:`1px solid ${S.borderGold}`,borderRadius:14,padding:28,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:S.muted,marginBottom:20}}>Saúde Financeira</div>
            <div style={{position:"relative",marginBottom:16}}>
              <div style={{width:140,height:140,borderRadius:"50%",background:"conic-gradient(#C9963A 0% 72%, rgba(255,255,255,0.07) 72% 100%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
                <div style={{position:"absolute",inset:14,borderRadius:"50%",background:S.sb}}/>
                <span style={{position:"relative",zIndex:1,fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:40,fontWeight:800,color:S.gold}}>720</span>
              </div>
            </div>
            <div style={{fontSize:12,color:S.muted,marginBottom:4}}>de 1000 pontos</div>
            <div style={{fontFamily:"'Instrument Serif',serif",fontStyle:"italic",fontSize:15,color:S.leaf,marginBottom:20}}>Bom progresso!</div>
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:9}}>
              {[["Reserva","68%"],["Controle","82%"],["Investimentos","45%"],["Metas","91%"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,.5)",width:90,textAlign:"left"}}>{l}</span>
                  <div style={{flex:1,height:5,background:"rgba(255,255,255,.07)",borderRadius:3}}>
                    <div style={{width:v,height:"100%",borderRadius:3,background:S.gold}}/>
                  </div>
                  <span style={{fontSize:11,color:S.gold,fontWeight:600,width:28,textAlign:"right"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metas */}
          <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:14,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <span style={{fontSize:14,fontWeight:700}}>Minhas Metas</span>
              <button onClick={()=>setActive("goals")} style={{fontSize:12,color:S.gold,cursor:"pointer",border:"none",background:"none",fontFamily:"inherit"}}>Ver todas →</button>
            </div>
            {[
              {icon:"🛡️",name:"Reserva de Emergência",cur:4080, total:6000, color:S.gold},
              {icon:"🏠",name:"Entrada do Apê",        cur:17000,total:50000,color:S.leaf},
              {icon:"✈️",name:"Viagem de Férias",      cur:4400, total:5000, color:S.leaf},
            ].map((g,i)=>{
              const pct=Math.round((g.cur/g.total)*100);
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"12px 0",borderBottom:i<2?"1px solid rgba(255,255,255,.05)":"none"}}>
                  <div style={{width:38,height:38,borderRadius:9,background:"rgba(201,150,58,.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{g.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:5}}>{g.name}</div>
                    <div style={{height:5,background:"rgba(255,255,255,.07)",borderRadius:3}}>
                      <div style={{width:`${pct}%`,height:"100%",borderRadius:3,background:g.color}}/>
                    </div>
                    <div style={{fontSize:11,color:S.muted,marginTop:4}}>R${g.cur.toLocaleString("pt-BR")} de R${g.total.toLocaleString("pt-BR")}</div>
                  </div>
                  <span style={{fontSize:13,fontWeight:700,flexShrink:0,color:g.color}}>{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* Próxima Consultoria */}
          <div style={{background:"linear-gradient(135deg,rgba(45,106,79,0.35),rgba(27,67,50,0.5))",border:"1px solid rgba(82,183,136,0.2)",borderRadius:14,padding:28,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
            <div>
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(82,183,136,.15)",color:S.leaf,fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:20,marginBottom:16}}>
                <span style={{fontSize:8}}>●</span> Consultoria agendada
              </div>
              <h3 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:700,marginBottom:8}}>Sua próxima sessão</h3>
              <p style={{fontSize:13,color:"rgba(255,255,255,.6)",lineHeight:1.6,marginBottom:20}}>Revise seu planejamento financeiro com seu consultor Norva.</p>
              <div style={{display:"flex",alignItems:"center",gap:10,background:"rgba(0,0,0,.2)",borderRadius:10,padding:"12px 16px",marginBottom:20}}>
                <span style={{fontSize:22}}>📅</span>
                <div>
                  <strong style={{display:"block",fontWeight:700,fontSize:13}}>Quarta, 7 de maio</strong>
                  <span style={{color:S.muted,fontSize:12}}>às 19h00 · Online via Google Meet</span>
                </div>
              </div>
            </div>
            <button style={{background:S.gold,color:S.deep,fontFamily:"'Work Sans',sans-serif",fontWeight:700,fontSize:14,letterSpacing:"0.04em",padding:12,borderRadius:8,border:"none",cursor:"pointer",width:"100%"}}>
              Acessar consultoria →
            </button>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
          {/* Gastos */}
          <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:14,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <span style={{fontSize:14,fontWeight:700}}>Gastos por categoria — Maio</span>
              <button style={{fontSize:12,color:S.gold,cursor:"pointer",border:"none",background:"none",fontFamily:"inherit"}}>Ver relatório →</button>
            </div>
            {[
              {icon:"🏠",name:"Moradia",    sub:"Aluguel + condomínio",  pct:52,color:S.leaf,  val:"R$840",bg:"rgba(82,183,136,.12)"},
              {icon:"🛒",name:"Alimentação",sub:"Mercado + restaurantes",pct:28,color:S.gold,  val:"R$460",bg:"rgba(201,150,58,.12)"},
              {icon:"🚗",name:"Transporte", sub:"Combustível + Uber",    pct:16,color:"#8264C8",val:"R$260",bg:"rgba(130,100,200,.12)"},
              {icon:"💳",name:"Assinaturas",sub:"Streaming + apps",      pct:4, color:"#E07070",val:"R$60", bg:"rgba(224,112,112,.12)"},
            ].map((g,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:12,borderRadius:9,cursor:"default",transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:38,height:38,borderRadius:9,background:g.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{g.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{g.name}</div>
                  <div style={{fontSize:11,color:S.muted}}>{g.sub}</div>
                </div>
                <div style={{width:100}}>
                  <div style={{height:4,background:"rgba(255,255,255,.07)",borderRadius:2,marginBottom:3}}>
                    <div style={{width:`${g.pct}%`,height:"100%",borderRadius:2,background:g.color}}/>
                  </div>
                  <div style={{fontSize:10,color:S.muted,textAlign:"right"}}>{g.pct}% do orçamento</div>
                </div>
                <div style={{fontSize:14,fontWeight:700,textAlign:"right",minWidth:70}}>{g.val}</div>
              </div>
            ))}
          </div>

          {/* Conteúdo */}
          <div style={{background:S.card,border:`1px solid ${S.border}`,borderRadius:14,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <span style={{fontSize:14,fontWeight:700}}>Conteúdo para você</span>
              <button onClick={()=>setActive("education")} style={{fontSize:12,color:S.gold,cursor:"pointer",border:"none",background:"none",fontFamily:"inherit"}}>Ver tudo →</button>
            </div>
            {[
              {icon:"📈",title:"Como montar sua reserva de emergência do zero",meta:"8 min · Educação financeira",isNew:true},
              {icon:"💰",title:"Juros compostos: o segredo de quem investe cedo",meta:"12 min · Investimentos",isNew:true},
              {icon:"🏠",title:"Alugar ou financiar? Como decidir com segurança",meta:"10 min · Planejamento",isNew:false},
            ].map((c,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:10,borderRadius:9,cursor:"pointer",marginBottom:4,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.04)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:48,height:48,borderRadius:8,background:`linear-gradient(135deg,${S.mid},${S.deep})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{c.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,marginBottom:3,lineHeight:1.4}}>{c.title}</div>
                  <div style={{fontSize:11,color:S.muted}}>{c.meta}</div>
                </div>
                {c.isNew&&<span style={{fontSize:10,fontWeight:700,letterSpacing:".06em",background:"rgba(201,150,58,.15)",color:S.gold,padding:"2px 8px",borderRadius:4,flexShrink:0,marginTop:2}}>Novo</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    // ═══════════════════════════════════════════════════════
    //  MEU SCORE
    // ═══════════════════════════════════════════════════════
    if (active==="score") {
      const hasData = !!(form.renda && form.gastos);
      const renda  = parseFloat(form.renda)||0;
      const gastos = parseFloat(form.gastos)||0;
      const reserva= parseFloat(form.reserva)||0;
      const dividas= parseFloat(form.dividas)||0;
      const poupaMes = parseFloat(form.poupaMes)||0;
      const invest = parseFloat(form.investimentos)||0;
      const cartao = parseFloat(form.cartaoCredito)||0;
      const parcelamentos = parseFloat(form.parcelamentos)||0;

      const pctGastos = renda>0 ? (gastos/renda)*100 : 100;
      const compPts   = pctGastos<=50?200:pctGastos<=65?160:pctGastos<=75?110:pctGastos<=85?60:pctGastos<=95?20:0;
      const meses     = (reserva>0&&gastos>0) ? reserva/gastos : 0;
      const reservaPts= meses>=6?200:meses>=3?140:meses>=1?70:meses>0?20:0;
      const dr        = renda>0 ? dividas/renda : 99;
      const dividaPts = dividas===0?150:dr<=1?110:dr<=3?70:dr<=6?30:0;
      const cc        = renda>0 ? ((cartao+parcelamentos)/renda)*100 : 0;
      const cartaoPts = cc===0?100:cc<=10?80:cc<=20?50:cc<=30?20:0;
      const endiPts   = dividaPts + cartaoPts;
      let investPts=0;
      if(form.temInvestimentos==="sim") investPts+=60;
      if(invest>0&&renda>0){ const r=invest/renda; investPts+=r>=12?40:r>=6?25:10; }

      const norm = (pts,max) => hasData ? Math.round((pts/max)*1000) : 0;

      const totalScore = hasData ? (norvaScore!==null ? norvaScore : calcNorvaScore(form)) : null;
      const si = totalScore!==null ? scoreInfo(totalScore) : null;

      const metrics = [
        { icon:"💳", label:"Controle de Gastos",
          desc:"Proporção da renda destinada a despesas",
          score:norm(compPts,200), max:1000,
          color:compPts>=160?"#52B788":compPts>=110?"#60a5fa":compPts>=60?"#eab308":"#ef4444",
          detail:hasData?(pctGastos<=50?"Excelente":pctGastos<=70?"Bom":pctGastos<=85?"Atenção":"Crítico"):"-",
          factors:hasData?[
            pctGastos<=70?{t:"pos",txt:`Gastos em ${Math.round(pctGastos)}% da renda — dentro do limite`}:{t:"neg",txt:`Gastos em ${Math.round(pctGastos)}% da renda — acima de 70%`},
            poupaMes>0?{t:"pos",txt:`Poupando ${((poupaMes/renda)*100).toFixed(0)}% da renda por mês`}:{t:"neg",txt:"Sem poupança mensal registrada"},
          ]:[],
        },
        { icon:"🏦", label:"Endividamento",
          desc:"Peso das dívidas e crédito na renda",
          score:norm(endiPts,250), max:1000,
          color:endiPts>=200?"#52B788":endiPts>=150?"#60a5fa":endiPts>=100?"#eab308":"#ef4444",
          detail:hasData?(endiPts>=200?"Livre":endiPts>=150?"Controlado":endiPts>=100?"Atenção":"Crítico"):"-",
          factors:hasData?[
            dividas===0?{t:"pos",txt:"Sem dívidas ativas"}:{t:"neg",txt:`Dívidas de R$${dividas.toLocaleString('pt-BR')} (${Math.round(dr*100)}% da renda)`},
            cc<=10?{t:"pos",txt:"Uso saudável do cartão/parcelas"}:{t:"neg",txt:`Cartão+parcelas em ${Math.round(cc)}% da renda`},
          ]:[],
        },
        { icon:"🛡️", label:"Reserva de Emergência",
          desc:"Meses de despesas cobertos",
          score:norm(reservaPts,200), max:1000,
          color:reservaPts>=200?"#52B788":reservaPts>=140?"#60a5fa":reservaPts>=70?"#eab308":"#ef4444",
          detail:hasData?(meses>=6?"Ideal":meses>=3?"Parcial":meses>=1?"Inicial":"Sem reserva"):"-",
          factors:hasData?[
            meses>=6?{t:"pos",txt:"Reserva completa (6+ meses)"}:{t:"neg",txt:`Reserva cobre ${meses.toFixed(1)} mês(es) — meta: 6`},
            reserva>0?{t:"pos",txt:`R$${reserva.toLocaleString('pt-BR')} guardados`}:{t:"neg",txt:"Nenhum valor registrado como reserva"},
          ]:[],
        },
        { icon:"📅", label:"Pagamento em Dia",
          desc:"Adimplência e histórico de pagamentos",
          score:870, max:1000,
          color:"#52B788", detail:"Bom histórico",
          factors:[{t:"pos",txt:"Sem registros de atraso recentes"},{t:"pos",txt:"Contas pagas em dia"},{t:"neu",txt:"Continue mantendo este padrão"}],
        },
        { icon:"📈", label:"Patrimônio & Investimentos",
          desc:"Crescimento de investimentos e ativos",
          score:norm(investPts,100), max:1000,
          color:investPts>=80?"#52B788":investPts>=40?"#60a5fa":investPts>=10?"#eab308":"#ef4444",
          detail:hasData?(investPts>=80?"Crescendo":investPts>=40?"Em progresso":investPts>=10?"Iniciando":"Sem patrimônio"):"-",
          factors:hasData?[
            form.temInvestimentos==="sim"?{t:"pos",txt:`Investe${form.tipoInvestimento?" em "+form.tipoInvestimento:""}`}:{t:"neg",txt:"Sem investimentos registrados"},
            invest>0?{t:"pos",txt:`R$${invest.toLocaleString('pt-BR')} em investimentos`}:{t:"neu",txt:"Registre seus investimentos para análise"},
          ]:[],
        },
        { icon:"🏆", label:"Metas Financeiras",
          desc:"Aderência ao planejamento e objetivos",
          score:650, max:1000,
          color:"#eab308", detail:"Em progresso",
          factors:[{t:"pos",txt:"2 de 3 metas mensais atingidas"},{t:"neg",txt:"Meta de reserva ainda pendente"},{t:"pos",txt:"Meta de controle de gastos atingida"}],
        },
      ];

      const histData = [
        {mes:"Nov",s:totalScore?Math.max(200,totalScore-225):350},
        {mes:"Dez",s:totalScore?Math.max(250,totalScore-180):398},
        {mes:"Jan",s:totalScore?Math.max(300,totalScore-135):440},
        {mes:"Feb",s:totalScore?Math.max(350,totalScore-90):485},
        {mes:"Mar",s:totalScore?Math.max(400,totalScore-45):530},
        {mes:"Abr",s:totalScore||580},
      ];
      const maxHist = 1000;

      const improvements = [
        {id:"cartao",  icon:"💳", title:"Reduzir uso do cartão", desc:"Limite a no máximo 20% da renda mensal", pri:"🔴 Alta"},
        {id:"reserva", icon:"🛡️", title:"Criar reserva de emergência", desc:"Acumule 6 meses de despesas em conta separada", pri:"🔴 Alta"},
        {id:"orc",     icon:"📊", title:"Organizar orçamento mensal", desc:"Categorize gastos e defina limites por categoria", pri:"🟡 Média"},
        {id:"dividas", icon:"🏦", title:"Quitar dívidas mais caras", desc:"Priorize as de maior juros (método avalanche)", pri:"🔴 Alta"},
        {id:"invest",  icon:"📈", title:"Investir regularmente", desc:"Separe ao menos 10% da renda todo mês", pri:"🟡 Média"},
        {id:"metas",   icon:"🏆", title:"Revisar metas semanalmente", desc:"Ajuste e acompanhe cada meta com frequência", pri:"🟢 Baixa"},
      ];

      const factorsExpl = hasData ? [
        pctGastos>70?{t:"neg",txt:`Alto comprometimento: ${Math.round(pctGastos)}% da renda vai para gastos (ideal ≤70%)`}:{t:"pos",txt:`Gastos controlados em ${Math.round(pctGastos)}% da renda`},
        dividas>0?{t:"neg",txt:`Dívidas de R$${dividas.toLocaleString('pt-BR')} reduzem seu score`}:{t:"pos",txt:"Livre de dívidas — excelente!"},
        meses<3?{t:"neg",txt:`Reserva de emergência baixa: ${meses.toFixed(1)} mês(es) — ideal são 6`}:{t:"pos",txt:`Reserva sólida: ${meses.toFixed(1)} meses de despesas`},
        cc>20?{t:"neg",txt:`Uso elevado do crédito: ${Math.round(cc)}% da renda em cartão/parcelas`}:{t:"pos",txt:"Uso saudável de crédito"},
        form.temInvestimentos==="sim"?{t:"pos",txt:`Investimentos ativos${form.tipoInvestimento?" em "+form.tipoInvestimento:""}`}:{t:"neg",txt:"Sem investimentos — dinheiro parado perde para a inflação"},
        poupaMes>0?{t:"pos",txt:`Poupando R$${poupaMes.toLocaleString('pt-BR')}/mês (${((poupaMes/renda)*100).toFixed(0)}% da renda)`}:{t:"neg",txt:"Sem poupança mensal — dificulta construção de patrimônio"},
      ] : [];

      const scoreGradH = si ? si.color : C.muted;
      const barH = (s) => `${Math.round((s/maxHist)*100)}%`;

      return (
        <div>
          <Title C={C}>Meu Score Norva</Title>

          {/* ── SEM DADOS ── */}
          {!hasData && (
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:36,textAlign:"center",marginBottom:20}}>
              <div style={{fontSize:40,marginBottom:12}}>🎯</div>
              <div style={{fontWeight:700,fontSize:16,marginBottom:8}}>Seu score ainda não foi calculado</div>
              <div style={{fontSize:13,color:C.muted,marginBottom:20,lineHeight:1.6}}>Preencha o Relatório Financeiro com IA para gerar seu Score Norva personalizado com análise completa da sua saúde financeira.</div>
              <button onClick={()=>setActive("report")} style={{...btn(C.green),padding:"12px 28px",fontSize:13,fontWeight:800}}>📊 Preencher Relatório Financeiro</button>
            </div>
          )}

          {/* ── SCORE HERO ── */}
          {hasData && si && (
            <div style={{background:`linear-gradient(135deg,${C.card},${C.card})`,border:`1px solid ${C.border}`,borderRadius:18,padding:28,marginBottom:20,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",background:si.color,opacity:0.06,pointerEvents:"none"}}/>
              <div style={{display:"flex",alignItems:"center",gap:28,flexWrap:"wrap"}}>
                {/* Gauge */}
                <div style={{position:"relative",flexShrink:0}}>
                  <svg width={140} height={80} viewBox="0 0 140 80">
                    <path d="M10,70 A60,60 0 0,1 130,70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" strokeLinecap="round"/>
                    <path d="M10,70 A60,60 0 0,1 130,70" fill="none" stroke={si.color} strokeWidth="12" strokeLinecap="round"
                      strokeDasharray={`${188*(totalScore/1000)} 188`} opacity="0.9"/>
                    <text x="70" y="62" textAnchor="middle" fill={si.color} fontSize="22" fontWeight="800" fontFamily="'Bricolage Grotesque',sans-serif">{totalScore}</text>
                    <text x="70" y="76" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="'Work Sans',sans-serif">/1000</text>
                  </svg>
                </div>
                {/* Info */}
                <div style={{flex:1,minWidth:180}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                    <span style={{fontSize:24}}>{si.emoji}</span>
                    <span style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:24,fontWeight:800,color:si.color}}>{si.label}</span>
                    <div style={{background:si.bg,border:`1px solid ${si.color}40`,borderRadius:20,padding:"2px 12px",fontSize:11,fontWeight:700,color:si.color}}>{totalScore}/1000</div>
                  </div>
                  <div style={{fontSize:13,color:C.muted,lineHeight:1.6,marginBottom:12}}>{si.desc}</div>
                  {/* Scale bar */}
                  <div style={{position:"relative"}}>
                    <div style={{height:6,borderRadius:3,background:"linear-gradient(to right,#ef4444 0%,#f97316 20%,#eab308 40%,#60a5fa 65%,#52B788 82%,#C9963A 100%)"}}>
                      <div style={{position:"absolute",top:-4,left:`${(totalScore/1000)*100}%`,transform:"translateX(-50%)",width:14,height:14,borderRadius:"50%",background:si.color,border:"2px solid #fff",boxShadow:`0 0 8px ${si.color}`}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:9,color:C.muted}}>
                      {["Crítico","Negativado","Em Risco","Estável","Saudável","Excelente"].map(l=><span key={l}>{l}</span>)}
                    </div>
                  </div>
                </div>
                {/* CTA side */}
                <div style={{flexShrink:0}}>
                  <button onClick={()=>setActive("report")} style={{...btn(),fontSize:12,padding:"9px 18px"}}>🔄 Atualizar dados</button>
                </div>
              </div>
            </div>
          )}

          {/* ── METRIC CARDS GRID ── */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:20}}>
            {metrics.map((m,i)=>(
              <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:m.color,opacity:0.8}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontSize:18,marginBottom:4}}>{m.icon}</div>
                    <div style={{fontWeight:700,fontSize:12,lineHeight:1.3}}>{m.label}</div>
                    <div style={{fontSize:10,color:C.muted,marginTop:2}}>{m.desc}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:800,color:m.color}}>{hasData||m.score===870||m.score===650?m.score:"-"}</div>
                    <div style={{fontSize:9,color:C.muted}}>de 1000</div>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:3,marginBottom:8,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${hasData||m.score===870||m.score===650?(m.score/10):0}%`,background:m.color,borderRadius:3,transition:"width 1s ease"}}/>
                </div>
                <div style={{display:"inline-flex",alignItems:"center",gap:4,background:`${m.color}18`,border:`1px solid ${m.color}40`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700,color:m.color}}>
                  {m.detail}
                </div>
              </div>
            ))}
          </div>

          {/* ── TABS: Por que / Como melhorar ── */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden",marginBottom:20}}>
            {/* Tab bar */}
            <div style={{display:"flex",borderBottom:`1px solid ${C.border}`}}>
              {[{id:"porque",label:"🔍 Por que meu score está assim?"},{id:"melhorar",label:"🚀 Como melhorar?"}].map(tab=>(
                <button key={tab.id} onClick={()=>setScoreTab(tab.id)}
                  style={{flex:1,padding:"14px 18px",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700,transition:"all .2s",
                    background:scoreTab===tab.id?"transparent":"rgba(0,0,0,0.2)",
                    color:scoreTab===tab.id?C.green:C.muted,
                    borderBottom:scoreTab===tab.id?`2px solid ${C.green}`:"2px solid transparent"}}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── POR QUE ── */}
            {scoreTab==="porque" && (
              <div style={{padding:24}}>
                {!hasData && (
                  <div style={{textAlign:"center",padding:24,color:C.muted,fontSize:13}}>
                    Preencha o Relatório Financeiro para ver a análise dos fatores do seu score.
                  </div>
                )}
                {hasData && (
                  <div>
                    <div style={{fontSize:13,color:C.muted,marginBottom:16}}>Os fatores abaixo influenciaram positiva ou negativamente seu Score Norva:</div>
                    <div style={{display:"flex",flexDirection:"column",gap:10}}>
                      {factorsExpl.map((f,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",borderRadius:10,
                          background:f.t==="pos"?"rgba(82,183,136,0.08)":f.t==="neg"?"rgba(239,68,68,0.08)":"rgba(255,255,255,0.04)",
                          border:f.t==="pos"?`1px solid rgba(82,183,136,0.2)`:f.t==="neg"?`1px solid rgba(239,68,68,0.2)`:`1px solid ${C.border}`}}>
                          <span style={{fontSize:16,flexShrink:0,marginTop:1}}>{f.t==="pos"?"✅":f.t==="neg"?"❌":"📊"}</span>
                          <span style={{fontSize:13,color:C.text,lineHeight:1.5}}>{f.txt}</span>
                        </div>
                      ))}
                    </div>
                    {/* By metric */}
                    <div style={{marginTop:20,fontSize:11,fontWeight:800,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Detalhe por categoria</div>
                    {metrics.map((m,mi)=>(
                      <div key={mi} style={{marginBottom:14}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                          <span style={{fontSize:14}}>{m.icon}</span>
                          <span style={{fontSize:12,fontWeight:700,color:m.color}}>{m.label}</span>
                          <span style={{fontSize:11,color:C.muted,marginLeft:"auto"}}>{hasData||m.score===870||m.score===650?m.score:"-"}/1000</span>
                        </div>
                        {m.factors.map((f,fi)=>(
                          <div key={fi} style={{fontSize:12,color:C.muted,paddingLeft:22,marginBottom:3}}>
                            {f.t==="pos"?"✅":f.t==="neg"?"⚠️":"📊"} {f.txt}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── COMO MELHORAR ── */}
            {scoreTab==="melhorar" && (
              <div style={{padding:24}}>
                <div style={{fontSize:13,color:C.muted,marginBottom:18}}>Siga estas recomendações para aumentar seu Score Norva ao longo dos próximos meses:</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {improvements.map((imp)=>{
                    const done = !!scoreChecked[imp.id];
                    return (
                      <div key={imp.id} onClick={()=>setScoreChecked(p=>({...p,[imp.id]:!p[imp.id]}))}
                        style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:12,cursor:"pointer",transition:"all .2s",
                          background:done?"rgba(82,183,136,0.1)":"rgba(255,255,255,0.03)",
                          border:done?`1px solid rgba(82,183,136,0.3)`:`1px solid ${C.border}`,
                          opacity:done?0.7:1}}>
                        {/* Checkbox */}
                        <div style={{width:22,height:22,borderRadius:6,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",
                          background:done?"#52B788":"transparent",border:done?"none":`2px solid ${C.border}`}}>
                          {done && <span style={{color:"#fff",fontSize:13,fontWeight:800}}>✓</span>}
                        </div>
                        <span style={{fontSize:18,flexShrink:0}}>{imp.icon}</span>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:700,textDecoration:done?"line-through":"none",color:done?C.muted:C.text,marginBottom:2}}>{imp.title}</div>
                          <div style={{fontSize:11,color:C.muted}}>{imp.desc}</div>
                        </div>
                        <div style={{fontSize:10,color:C.muted,flexShrink:0,background:"rgba(255,255,255,0.05)",padding:"3px 8px",borderRadius:10}}>{imp.pri}</div>
                      </div>
                    );
                  })}
                </div>
                <div style={{marginTop:16,fontSize:11,color:C.muted,textAlign:"center"}}>
                  {Object.values(scoreChecked).filter(Boolean).length} de {improvements.length} ações marcadas como concluídas
                </div>
              </div>
            )}
          </div>

          {/* ── HISTÓRICO ── */}
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,marginBottom:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>
                <div style={{fontWeight:700,fontSize:14}}>📈 Evolução do Score</div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>Últimos 6 meses</div>
              </div>
              {hasData && si && (
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,color:C.green,fontWeight:700}}>+{histData[histData.length-1].s - histData[0].s} pts</div>
                  <div style={{fontSize:10,color:C.muted}}>vs. 6 meses atrás</div>
                </div>
              )}
            </div>
            {/* Bar chart */}
            <div style={{display:"flex",alignItems:"flex-end",gap:10,height:110}}>
              {histData.map((h,i)=>{
                const isLast = i===histData.length-1;
                const barColor = isLast ? (si?si.color:C.green) : C.muted;
                const pct = Math.round((h.s/maxHist)*100);
                return (
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                    <div style={{fontSize:10,fontWeight:700,color:isLast?(si?si.color:C.green):C.muted}}>{h.s}</div>
                    <div style={{width:"100%",position:"relative",display:"flex",flexDirection:"column",justifyContent:"flex-end",height:80}}>
                      <div style={{width:"100%",borderRadius:"6px 6px 0 0",transition:"height 1s",
                        height:`${pct}%`,
                        background:isLast?`linear-gradient(to top,${barColor},${barColor}88)`:`rgba(255,255,255,0.08)`,
                        border:isLast?`1px solid ${barColor}40`:"none",
                        boxShadow:isLast?`0 0 12px ${barColor}40`:"none"}}/>
                    </div>
                    <div style={{fontSize:10,color:C.muted}}>{h.mes}</div>
                  </div>
                );
              })}
            </div>
            {/* Trend line note */}
            {hasData && (
              <div style={{marginTop:14,padding:"10px 14px",borderRadius:10,background:"rgba(82,183,136,0.08)",border:"1px solid rgba(82,183,136,0.2)",fontSize:12,color:C.text}}>
                📊 Seu score evoluiu <strong style={{color:C.green}}>+{histData[histData.length-1].s - histData[0].s} pontos</strong> nos últimos 6 meses. Continue seguindo o plano de melhoria para atingir a faixa <strong>{si && si.label==="Excelente"?"Prime":"Saudável"}</strong>.
              </div>
            )}
          </div>

          {/* ── CONSULTORIA EXTRA ── */}
          <div style={{background:"linear-gradient(135deg,rgba(201,150,58,0.15),rgba(201,150,58,0.05))",border:"1px solid rgba(201,150,58,0.35)",borderRadius:14,padding:28}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
              <div>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(201,150,58,0.2)",color:C.gold,fontSize:10,fontWeight:700,padding:"3px 12px",borderRadius:20,marginBottom:10,letterSpacing:"0.06em",textTransform:"uppercase"}}>
                  ⭐ Acelerador de Score
                </div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:800,marginBottom:6}}>Precisa de ajuda personalizada?</div>
                <div style={{fontSize:13,color:C.muted,lineHeight:1.6,maxWidth:420}}>
                  Sessão 1:1 com consultora especializada da Norva. Revisamos seu score juntos, identificamos os maiores gargalos e montamos um plano de ação personalizado.
                </div>
                <div style={{display:"flex",gap:20,marginTop:14,flexWrap:"wrap"}}>
                  {["✅ 45 min dedicados ao seu caso","✅ Plano de ação pós-sessão","✅ Acesso ao relatório detalhado"].map((t,i)=>(
                    <div key={i} style={{fontSize:12,color:C.text}}>{t}</div>
                  ))}
                </div>
              </div>
              <div style={{flexShrink:0,textAlign:"center"}}>
                <div style={{fontSize:12,color:C.muted,textDecoration:"line-through",marginBottom:2}}>De R$120</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:32,fontWeight:800,color:C.gold,lineHeight:1}}>R$50</div>
                <div style={{fontSize:11,color:C.muted,marginBottom:14}}>sessão única</div>
                <button
                  onClick={()=>window.open("https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=7e92478e255f4f1dab81610e74cbd293","_blank")}
                  style={{background:C.gold,color:"#1B4332",fontFamily:"'Work Sans',sans-serif",fontWeight:800,fontSize:14,padding:"13px 28px",borderRadius:10,border:"none",cursor:"pointer",letterSpacing:"0.03em",whiteSpace:"nowrap",boxShadow:`0 4px 20px ${C.gold}40`}}>
                  💳 Comprar sessão — R$50
                </button>
                <div style={{fontSize:10,color:C.muted,marginTop:8}}>Pagamento via Mercado Pago · 100% seguro</div>
              </div>
            </div>
          </div>

        </div>
      );
    }
    // ═══════════════════════════════════════════════════════

    if (active==="report") {
      const si = norvaScore!==null ? scoreInfo(norvaScore) : null;
      const sf = v => e => setForm(f=>({...f,[v]:e.target.value}));
      const selSt = {background:C.card,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 10px",fontSize:13,fontFamily:"inherit",width:"100%",outline:"none"};
      const Section = ({title,icon})=>(
        <div style={{display:"flex",alignItems:"center",gap:8,marginTop:20,marginBottom:10}}>
          <span style={{fontSize:14}}>{icon}</span>
          <span style={{fontSize:11,fontWeight:800,letterSpacing:"0.1em",textTransform:"uppercase",color:C.muted}}>{title}</span>
          <div style={{flex:1,height:1,background:C.border}}/>
        </div>
      );
      return (
        <div>
          <Title C={C}>Relatório Financeiro com IA</Title>

          {/* Score Norva display */}
          {norvaScore!==null && si && (
            <div style={{background:si.bg,border:`1px solid ${si.color}44`,borderRadius:14,padding:20,marginBottom:14,display:"flex",alignItems:"center",gap:20}}>
              <div style={{textAlign:"center",flexShrink:0}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:si.color,marginBottom:4}}>Score Norva</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:48,fontWeight:900,color:si.color,lineHeight:1}}>{norvaScore}</div>
                <div style={{fontSize:10,color:si.color,opacity:0.7,marginTop:2}}>de 1.000</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:20}}>{si.emoji}</span>
                  <span style={{fontWeight:800,fontSize:18,color:si.color}}>{si.label}</span>
                </div>
                <div style={{fontSize:12,color:C.muted,lineHeight:1.6,marginBottom:10}}>{si.desc}</div>
                {/* Score bar */}
                <div style={{height:8,borderRadius:4,background:C.border,position:"relative",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(norvaScore/1000)*100}%`,background:`linear-gradient(90deg,#ef4444,#f97316,#eab308,#60a5fa,#52B788,#C9963A)`,borderRadius:4,transition:"width 0.8s ease"}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.muted,marginTop:4}}>
                  {["Crítico","Negativado","Em Risco","Estável","Saudável","Excelente"].map(l=><span key={l}>{l}</span>)}
                </div>
              </div>
            </div>
          )}

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
            <div style={{ fontSize:12, color:C.muted, marginBottom:4 }}>Responda com precisão — quanto mais detalhado, mais assertivo será seu diagnóstico.</div>

            <Section title="Renda" icon="💰"/>
            <div style={g2}>
              <Input C={C} label="Renda mensal líquida (R$)" placeholder="ex: 3.500" value={form.renda} onChange={sf("renda")}/>
              <Input C={C} label="Renda extra mensal (R$)" placeholder="ex: 800 (freela, aluguel…)" value={form.rendaExtra} onChange={sf("rendaExtra")}/>
            </div>
            <div style={{marginTop:10}}>
              <label style={{fontSize:11,fontWeight:600,color:C.muted,display:"block",marginBottom:4}}>Possui outra fonte de renda?</label>
              <select style={selSt} value={form.rendaExtra==="sim"||form.rendaExtra==="nao"?form.rendaExtra:""} onChange={e=>setForm(f=>({...f,rendaExtra:e.target.value}))}>
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <Section title="Gastos Mensais" icon="📤"/>
            <div style={g2}>
              <Input C={C} label="Total de gastos mensais (R$)" placeholder="ex: 2.800" value={form.gastos} onChange={sf("gastos")}/>
              <Input C={C} label="Moradia — aluguel/financiamento (R$)" placeholder="ex: 900" value={form.moradia} onChange={sf("moradia")}/>
              <Input C={C} label="Alimentação — mercado + refeições (R$)" placeholder="ex: 600" value={form.alimentacao} onChange={sf("alimentacao")}/>
              <Input C={C} label="Transporte — carro, combustível, VT (R$)" placeholder="ex: 350" value={form.transporte} onChange={sf("transporte")}/>
              <Input C={C} label="Lazer e entretenimento (R$)" placeholder="ex: 200" value={form.lazer} onChange={sf("lazer")}/>
              <Input C={C} label="Educação — cursos, escola, faculdade (R$)" placeholder="ex: 300" value={form.educacao} onChange={sf("educacao")}/>
            </div>
            <div style={{marginTop:10}}>
              <label style={{fontSize:11,fontWeight:600,color:C.muted,display:"block",marginBottom:4}}>Possui plano de saúde?</label>
              <select style={selSt} value={form.planoSaude} onChange={e=>setForm(f=>({...f,planoSaude:e.target.value}))}>
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>

            <Section title="Dívidas e Crédito" icon="💳"/>
            <div style={g2}>
              <Input C={C} label="Total de dívidas (R$)" placeholder="ex: 8.000" value={form.dividas} onChange={sf("dividas")}/>
              <Input C={C} label="Fatura do cartão de crédito (R$)" placeholder="ex: 1.200" value={form.cartaoCredito} onChange={sf("cartaoCredito")}/>
              <Input C={C} label="Total de parcelas ativas (R$)" placeholder="ex: 450/mês" value={form.parcelamentos} onChange={sf("parcelamentos")}/>
              <Input C={C} label="Quantos dependentes financeiros?" placeholder="ex: 2 (filhos, cônjuge…)" value={form.dependentes} onChange={sf("dependentes")}/>
            </div>

            <Section title="Reservas e Investimentos" icon="📈"/>
            <div style={g2}>
              <Input C={C} label="Reserva de emergência (R$)" placeholder="ex: 5.000" value={form.reserva} onChange={sf("reserva")}/>
              <Input C={C} label="Quanto consegue poupar por mês (R$)?" placeholder="ex: 400" value={form.poupaMes} onChange={sf("poupaMes")}/>
            </div>
            <div style={{marginTop:10}}>
              <label style={{fontSize:11,fontWeight:600,color:C.muted,display:"block",marginBottom:4}}>Já possui investimentos?</label>
              <select style={selSt} value={form.temInvestimentos} onChange={e=>setForm(f=>({...f,temInvestimentos:e.target.value}))}>
                <option value="">Selecione</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>
            </div>
            {form.temInvestimentos==="sim" && (
              <div style={g2}>
                <div style={{marginTop:10}}><Input C={C} label="Total investido (R$)" placeholder="ex: 15.000" value={form.investimentos} onChange={sf("investimentos")}/></div>
                <div style={{marginTop:10}}>
                  <label style={{fontSize:11,fontWeight:600,color:C.muted,display:"block",marginBottom:4}}>Onde investe?</label>
                  <select style={selSt} value={form.tipoInvestimento} onChange={e=>setForm(f=>({...f,tipoInvestimento:e.target.value}))}>
                    <option value="">Selecione</option>
                    <option value="Poupança">Poupança</option>
                    <option value="CDB/Tesouro Direto">CDB / Tesouro Direto</option>
                    <option value="Fundos de investimento">Fundos de investimento</option>
                    <option value="Ações / FIIs">Ações / FIIs</option>
                    <option value="Cripto">Criptomoedas</option>
                    <option value="Diversificado">Diversificado</option>
                  </select>
                </div>
              </div>
            )}

            <Section title="Objetivos" icon="🎯"/>
            <div style={g2}>
              <Input C={C} label="Objetivo financeiro principal" placeholder="ex: Quitar dívidas, comprar carro…" value={form.objetivo} onChange={sf("objetivo")}/>
              <div>
                <label style={{fontSize:11,fontWeight:600,color:C.muted,display:"block",marginBottom:4}}>Prazo para atingir o objetivo</label>
                <select style={selSt} value={form.prazoObjetivo} onChange={e=>setForm(f=>({...f,prazoObjetivo:e.target.value}))}>
                  <option value="">Selecione</option>
                  <option value="Até 3 meses">Até 3 meses</option>
                  <option value="3 a 6 meses">3 a 6 meses</option>
                  <option value="6 a 12 meses">6 a 12 meses</option>
                  <option value="1 a 2 anos">1 a 2 anos</option>
                  <option value="Mais de 2 anos">Mais de 2 anos</option>
                </select>
              </div>
            </div>

            <button style={{...btn(),marginTop:20,width:"100%",padding:"14px",fontSize:14,fontWeight:800}} onClick={genReport} disabled={loading}>
              {loading?"⏳ Analisando seu perfil...":"🤖 Gerar Diagnóstico Completo com IA"}
            </button>
          </div>

          {report && (
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20, marginTop:14 }}>
              <div style={{ fontSize:13, fontWeight:800, marginBottom:14, background:"linear-gradient(135deg,#2D6A4F,#C9963A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>📄 Diagnóstico Financeiro Personalizado — Score {norvaScore}/1000</div>
              <div style={{ fontSize:12.5, lineHeight:1.9, color:C.text }}>
                {report.split("\n").map((linha,i)=>{
                  if(linha.startsWith("**")&&linha.endsWith(":")) return(
                    <div key={i} style={{marginTop:i>0?20:0,marginBottom:8,display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:3,height:18,background:si?.color||C.gold,borderRadius:2,flexShrink:0}}/>
                      <strong style={{color:si?.color||C.gold,fontSize:13,letterSpacing:"0.02em"}}>{linha.replace(/\*\*/g,"")}</strong>
                    </div>
                  );
                  if(!linha.trim()) return null;
                  // inline bold dentro da linha
                  const parts = linha.split("**");
                  return(
                    <div key={i} style={{marginBottom:6,paddingLeft:11,color:C.text,fontSize:12.5}}>
                      {parts.map((p,j)=>j%2===1?<strong key={j} style={{color:C.text}}>{p}</strong>:<span key={j}>{p}</span>)}
                    </div>
                  );
                })}
              </div>
              <button style={{...btn(C.green),marginTop:16,fontSize:12}}>💾 Salvar relatório</button>
            </div>
          )}
        </div>
      );
    }

    if (active==="goals") return (
      <div>
        <Title C={C}>Minhas Metas Financeiras</Title>
        {goals.map(g=>(
          <div key={g.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontWeight:600, fontSize:13, color:C.text }}>{g.label}</span>
              <span style={{ fontSize:12, color:C.muted }}>R$ {g.current.toLocaleString()} / R$ {g.target.toLocaleString()}</span>
            </div>
            <Bar pct={(g.current/g.target)*100} color={g.current>=g.target?C.green:C.accent}/>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:10, color:C.muted }}>{Math.round((g.current/g.target)*100)}% concluído</span>
              <span style={badge(g.current>=g.target?C.green:C.accent)}>{g.current>=g.target?"✓ Concluída":"Em andamento"}</span>
            </div>
          </div>
        ))}
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginTop:8 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>+ Nova meta</div>
          <div style={g3}>
            <Input C={C} label="Descrição" placeholder="ex: Quitar financiamento" value={newGoal.label} onChange={e=>setNewGoal(g=>({...g,label:e.target.value}))}/>
            <Input C={C} label="Valor alvo (R$)" type="number" placeholder="15000" value={newGoal.target} onChange={e=>setNewGoal(g=>({...g,target:e.target.value}))}/>
            <Input C={C} label="Valor atual (R$)" type="number" placeholder="0" value={newGoal.current} onChange={e=>setNewGoal(g=>({...g,current:e.target.value}))}/>
          </div>
          <button style={{...btn(),marginTop:12}} onClick={addGoal}>Adicionar meta</button>
        </div>
      </div>
    );

    if (active==="education") return (
      <div>
        <Title C={C}>Conteúdo Educacional</Title>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[
            { title:"Orçamento Pessoal 101",     desc:"Organize suas finanças mensais do zero",    tag:"Básico",     emoji:"📊" },
            { title:"Primeiros Investimentos",    desc:"Selic, CDB e Tesouro Direto explicados",   tag:"Iniciante",  emoji:"📈" },
            { title:"Como Quitar Dívidas",        desc:"Método bola de neve vs. avalanche",        tag:"Prático",    emoji:"💳" },
            { title:"Reserva de Emergência",      desc:"Quanto guardar e onde aplicar",            tag:"Essencial",  emoji:"🛡️" },
            { title:"Planejamento Aposentadoria", desc:"INSS, Previdência Privada e PGBL/VGBL",   tag:"Avançado",   emoji:"🏖️" },
            { title:"Imposto de Renda",           desc:"Declaração simplificada e completa",       tag:"Anual",      emoji:"📋" },
          ].map((item,i)=>(
            <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{ fontSize:22 }}>{item.emoji}</span>
                <span style={badge(C.accent)}>{item.tag}</span>
              </div>
              <div style={{ fontWeight:600, fontSize:13, marginBottom:4, color:C.text }}>{item.title}</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:12 }}>{item.desc}</div>
              <button style={btnO(C)}>Acessar material →</button>
            </div>
          ))}
        </div>
      </div>
    );

    if (active==="partners") {
      // Simple Icons CDN: SVGs confiáveis, gratuitos, sem autenticação
      const SI=(slug,hex)=>`https://cdn.simpleicons.org/${slug}/${hex}`;
      // Google Favicon: sempre retorna 200, nunca falha
      const GF=(domain)=>`https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
      const brands=[
        {name:'Nike',        logo:SI('nike','111111'),         color:'#111111'},
        {name:'Samsung',     logo:SI('samsung','1428A0'),      color:'#1428A0'},
        {name:'Decathlon',   logo:SI('decathlon','0082C3'),    color:'#0082C3'},
        {name:'Under Armour',logo:SI('underarmour','1D1D1D'),  color:'#1D1D1D'},
        {name:'iFood',       logo:SI('ifood','EA1D2C'),        color:'#EA1D2C'},
        {name:'Adidas',      logo:SI('adidas','000000'),       color:'#000000'},
        {name:'Vivara',      logo:GF('vivara.com.br'),         color:'#8B6914'},
        {name:'Petz',        logo:GF('petz.com.br'),           color:'#F7941D'},
        {name:'Netshoes',    logo:GF('netshoes.com.br'),       color:'#E4002B'},
        {name:'Centauro',    logo:GF('centauro.com.br'),       color:'#E30613'},
        {name:'Renner',      logo:GF('lojasrenner.com.br'),    color:'#C8102E'},
        {name:'Riachuelo',   logo:GF('riachuelo.com.br'),      color:'#004B87'},
        {name:'Pague Menos', logo:GF('pagumenos.com.br'),      color:'#009640'},
        {name:'Droga Raia',  logo:GF('drogaraia.com.br'),      color:'#E4002B'},
        {name:'Pacheco',     logo:GF('drogariaspacheco.com.br'),color:'#D7262B'},
        {name:'Olympikus',   logo:GF('olympikus.com.br'),      color:'#004B8D'},
        {name:'Ultragaz',    logo:GF('ultragaz.com.br'),       color:'#F7941D'},
        {name:'Ponto',       logo:GF('ponto.com'),             color:'#E4002B'},
        {name:'99',          logo:GF('99app.com'),             color:'#FFD400'},
      ];
      const cats=[
        {icon:'💊',label:'Farmácias',desc:'Descontos em medicamentos e produtos de saúde'},
        {icon:'🛒',label:'Supermercados',desc:'Economia nas compras do dia a dia'},
        {icon:'❤️',label:'Saúde',desc:'Planos, exames e consultas com desconto'},
        {icon:'🏋️',label:'Fitness',desc:'Academias e suplementos com preço especial'},
        {icon:'👗',label:'Moda',desc:'As melhores marcas com condições exclusivas'},
        {icon:'🍔',label:'Restaurantes',desc:'Coma bem pagando menos'},
        {icon:'✈️',label:'Viagens',desc:'Hotéis, passagens e pacotes em oferta'},
        {icon:'📚',label:'Educação',desc:'Cursos e plataformas com desconto'},
        {icon:'💇',label:'Beleza',desc:'Salões, clínicas e produtos de beleza'},
        {icon:'📱',label:'Eletrônicos',desc:'Tecnologia com os melhores preços'},
        {icon:'🐾',label:'Pet',desc:'Tudo para seu animal de estimação'},
        {icon:'🔧',label:'Serviços',desc:'Seguros, mudanças e muito mais'},
      ];
      return(
        <div style={{paddingBottom:40}}>
          {/* ── HERO ── */}
          <div style={{background:'linear-gradient(135deg,#0A1F14 0%,#1B4332 60%,#0f2318 100%)',borderRadius:18,padding:'36px 32px',marginBottom:24,position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:-30,right:-30,width:180,height:180,borderRadius:'50%',background:'rgba(201,150,58,0.08)'}}/>
            <div style={{position:'absolute',bottom:-40,left:'40%',width:220,height:220,borderRadius:'50%',background:'rgba(82,183,136,0.06)'}}/>
            <div style={{position:'relative',zIndex:1}}>
              <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(201,150,58,0.12)',border:'1px solid rgba(201,150,58,0.3)',borderRadius:20,padding:'5px 14px',fontSize:11,fontWeight:700,color:'#C9963A',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:16}}>🏷️ Clube de Vantagens Norva</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:26,fontWeight:900,lineHeight:1.25,marginBottom:12,maxWidth:560}}>
                Na Norva te ensinamos a <span style={{color:'#52B788'}}>gerir seu dinheiro</span> e te ajudamos a <span style={{color:'#C9963A'}}>economizar</span>
              </div>
              <div style={{fontSize:14,color:'rgba(255,255,255,0.6)',lineHeight:1.6,maxWidth:480}}>Acesso a centenas de marcas nacionais com descontos exclusivos para membros Norva. Mais valor, menos gasto.</div>
            </div>
          </div>

          {/* ── BRAND STRIP ── */}
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,fontWeight:700,color:'#8AB49A',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Parceiros que chegam em breve</div>
            <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'16px 0',overflow:'hidden'}}>
              <style>{`@keyframes nmarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
              <div style={{display:'flex',animation:'nmarquee 44s linear infinite',width:'max-content'}}>
                {[...brands,...brands].map((b,i)=>(
                  <BrandLogoItem key={i} name={b.name} logo={b.logo} color={b.color}/>
                ))}
              </div>
            </div>
          </div>

          {/* ── CATEGORIAS ── */}
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,fontWeight:700,color:'#8AB49A',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Segmentos de desconto</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
              {cats.map((c,i)=>(
                <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'18px 16px',display:'flex',gap:12,alignItems:'flex-start',cursor:'pointer',transition:'all .2s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(201,150,58,0.35)';e.currentTarget.style.background='rgba(201,150,58,0.06)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.background='rgba(255,255,255,0.04)';}}>
                  <div style={{fontSize:26,flexShrink:0,lineHeight:1}}>{c.icon}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{c.label}</div>
                    <div style={{fontSize:11,color:'#8AB49A',lineHeight:1.5}}>{c.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── SORTEIOS ── */}
          <div style={{marginBottom:28}}>
            <div style={{fontSize:12,fontWeight:700,color:'#8AB49A',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>Sorteios mensais</div>
            <div style={{background:'linear-gradient(135deg,#7c3aed 0%,#4f46e5 50%,#2563eb 100%)',borderRadius:18,padding:'28px 0 28px 32px',display:'flex',alignItems:'center',gap:0,position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-20,right:120,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,0.06)'}}/>
              <div style={{position:'absolute',bottom:-40,right:20,width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,0.04)'}}/>
              {/* left: text + CTA */}
              <div style={{flex:'0 0 380px',position:'relative',zIndex:1,paddingRight:24}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:6,background:'rgba(255,255,255,0.15)',borderRadius:20,padding:'4px 12px',fontSize:10,fontWeight:700,color:'#fff',letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:14}}>🏆 Certificado — Sorteio Mensal</div>
                <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:26,fontWeight:900,lineHeight:1.2,color:'#fff',marginBottom:10}}>Sorteios de <span style={{color:'#fbbf24'}}>R$ 10.000</span> todo mês</div>
                <div style={{fontSize:13,color:'rgba(255,255,255,0.75)',lineHeight:1.6,maxWidth:340,marginBottom:20}}>Geladeiras, máquinas de lavar, dinheiro na conta e muito mais — regulamentado e sem custo extra para assinantes.</div>
                <a href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=6b0cb448d52243f3b746831c1add655e" target="_blank" rel="noopener noreferrer"
                  style={{background:'#fff',color:'#4f46e5',border:'none',borderRadius:10,padding:'12px 24px',fontSize:13,fontWeight:800,cursor:'pointer',display:'inline-flex',alignItems:'center',gap:8,textDecoration:'none'}}>
                  🎉 Quero participar
                </a>
                <div style={{marginTop:16,display:'inline-flex',alignItems:'center',gap:6,background:'rgba(0,0,0,0.2)',borderRadius:8,padding:'6px 10px'}}>
                  <span style={{fontSize:12}}>⏱️</span>
                  <span style={{fontSize:11,color:'rgba(255,255,255,0.65)'}}>Válido para assinantes com <strong style={{color:'#fff'}}>+3 meses</strong> de assinatura ativa</span>
                </div>
              </div>
              {/* right: scrolling prize strip clipped by banner overflow:hidden */}
              <div style={{flex:1,overflow:'hidden',position:'relative',zIndex:1,minWidth:0,alignSelf:'stretch',display:'flex',alignItems:'center'}}>
                <style>{`@keyframes pmarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
                <PrizeStrip bare/>
              </div>
            </div>
          </div>

          {/* ── CTA MEMBRO ── */}
          <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',borderRadius:14,padding:'22px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
            <div>
              <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>Quer acesso a todos os descontos?</div>
              <div style={{fontSize:13,color:'#8AB49A'}}>Faça upgrade para o plano Progresso ou Prime e desbloqueie todos os benefícios do clube.</div>
            </div>
            <button style={{background:'linear-gradient(135deg,#C9963A,#D4AA5A)',color:'#0f2318',border:'none',borderRadius:10,padding:'12px 24px',fontSize:13,fontWeight:800,cursor:'pointer',flexShrink:0,whiteSpace:'nowrap'}}>Ver planos →</button>
          </div>
        </div>
      );
    }

    if (active==="consulting") {
      function abrirAgenda() {
        const { data, hora, assunto } = agData;
        if (!data || !hora) { alert("Preencha data e horário."); return; }

        // Monta datas no formato YYYYMMDDTHHMMSS
        const [ano,mes,dia] = data.split("-");
        const [h, m] = hora.split(":");
        const startStr = `${ano}${mes}${dia}T${h}${m}00`;

        // Calcula horário de fim
        const startMs = new Date(`${data}T${hora}:00`).getTime();
        const endMs = startMs + 45*60000;
        const endDate = new Date(endMs);
        const p2 = v => String(v).padStart(2,"0");
        const endStr = `${endDate.getFullYear()}${p2(endDate.getMonth()+1)}${p2(endDate.getDate())}T${p2(endDate.getHours())}${p2(endDate.getMinutes())}00`;

        const titulo = encodeURIComponent(`Consultoria Financeira – Norva Consultoria${assunto?" | "+assunto:""}`);
        const detalhes = encodeURIComponent(`Sessão de consultoria financeira personalizada com a equipe Norva Consultoria.\n\nAssunto: ${assunto||"A definir"}\nCliente: ${user.name||"Membro"}`);
        const convidado = encodeURIComponent("Administrativo.norva@gmail.com");

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${startStr}/${endStr}&details=${detalhes}&add=${convidado}&location=Online+%E2%80%93+Google+Meet`;
        window.open(url, "_blank");
        setShowAgModal(false);
      }

      const inpSt = { background:"rgba(255,255,255,0.06)", border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px", fontSize:13, color:C.text, fontFamily:"inherit", width:"100%", outline:"none", boxSizing:"border-box" };
      const lblSt = { fontSize:11, fontWeight:600, color:C.muted, display:"block", marginBottom:5 };

      return (
        <div>
          {/* Modal de agendamento */}
          {showAgModal && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:20}}>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:32,width:"100%",maxWidth:440,boxShadow:"0 24px 64px rgba(0,0,0,0.5)"}}>
                {/* Header */}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:17,marginBottom:2}}>Agendar Sessão</div>
                    <div style={{fontSize:12,color:C.muted}}>Evento enviado para o Google Agenda da Norva</div>
                  </div>
                  <button onClick={()=>setShowAgModal(false)} style={{background:"rgba(255,255,255,0.08)",border:"none",color:C.text,width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16,fontFamily:"inherit"}}>✕</button>
                </div>

                {/* Campos */}
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  {/* Data */}
                  <div>
                    <label style={lblSt}>📅 Data</label>
                    <input type="date" style={inpSt} value={agData.data}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={e=>setAgData(d=>({...d,data:e.target.value}))}/>
                  </div>

                  {/* Disponibilidade — grade de horários */}
                  <div>
                    <label style={lblSt}>🕐 Horário disponível <span style={{fontWeight:400,color:C.muted}}>(sessão de 45 min)</span></label>
                    {[
                      { label:"🌅 Manhã",  slots:["05:00","05:45","06:30","07:00"] },
                      { label:"☀️ Tarde",  slots:["15:00"] },
                      { label:"🌙 Noite",  slots:["19:00","19:45","20:30","21:15","22:00","22:45","23:00"] },
                    ].map(block=>(
                      <div key={block.label} style={{marginBottom:10}}>
                        <div style={{fontSize:10,fontWeight:700,color:C.muted,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{block.label}</div>
                        <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                          {block.slots.map(slot=>{
                            const [sh,sm]=slot.split(":"); const eMin=parseInt(sh)*60+parseInt(sm)+45; const eh=String(Math.floor(eMin/60)).padStart(2,"0"); const em=String(eMin%60).padStart(2,"0");
                            const sel=agData.hora===slot;
                            return(
                              <button key={slot} onClick={()=>setAgData(d=>({...d,hora:slot}))}
                                style={{padding:"7px 13px",borderRadius:8,fontSize:12,fontWeight:sel?700:500,cursor:"pointer",fontFamily:"inherit",transition:"all 0.15s",
                                  background:sel?"rgba(82,183,136,0.22)":"rgba(255,255,255,0.05)",
                                  border:sel?`1px solid ${C.green}`:`1px solid ${C.border}`,
                                  color:sel?C.green:C.text}}>
                                {slot}<span style={{fontSize:10,opacity:0.65,marginLeft:3}}>→{eh}:{em}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Duração fixa */}
                  <div style={{background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15}}>⏱️</span>
                    <span style={{fontSize:12,color:C.muted}}>Duração da sessão:</span>
                    <span style={{fontSize:12,fontWeight:700,color:C.text}}>45 minutos</span>
                  </div>

                  <div>
                    <label style={lblSt}>💬 Assunto da sessão <span style={{fontWeight:400}}>(opcional)</span></label>
                    <input type="text" style={inpSt} placeholder="ex: Revisão de orçamento, planejamento de dívidas…"
                      value={agData.assunto} onChange={e=>setAgData(d=>({...d,assunto:e.target.value}))}/>
                  </div>

                  {/* Info convidado */}
                  <div style={{background:"rgba(82,183,136,0.08)",border:"1px solid rgba(82,183,136,0.2)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:18}}>📩</span>
                    <div>
                      <div style={{fontSize:11,fontWeight:700,color:C.green}}>Convite enviado automaticamente para:</div>
                      <div style={{fontSize:12,color:C.text}}>Administrativo.norva@gmail.com</div>
                    </div>
                  </div>
                </div>

                {/* Botões */}
                <div style={{display:"flex",gap:10,marginTop:24}}>
                  <button onClick={()=>setShowAgModal(false)} style={{flex:1,padding:"12px",borderRadius:10,border:`1px solid ${C.border}`,background:"transparent",color:C.muted,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Cancelar</button>
                  <button onClick={abrirAgenda} style={{flex:2,...btn(C.green),justifyContent:"center",fontSize:13,fontWeight:800,padding:"12px 0"}}>
                    📅 Abrir no Google Agenda
                  </button>
                </div>

                <div style={{marginTop:12,textAlign:"center",fontSize:11,color:C.muted}}>
                  Você será redirecionado para o Google Agenda para confirmar o evento.
                </div>
              </div>
            </div>
          )}

          <Title C={C}>Minhas Consultorias</Title>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {mockSessions.map(s=>(
              <div key={s.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{s.date} às {s.time}</div>
                  <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Consultora: Ana Ferreira</div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={badge(s.status==="realizada"?C.green:C.gold)}>{s.status==="realizada"?"✓ Realizada":"⏰ Agendada"}</span>
                  {s.status==="agendada" && <button style={btn()}>Entrar</button>}
                </div>
              </div>
            ))}
          </div>
          <button style={{...btn(C.green),marginTop:14,padding:"12px 20px",fontSize:13,fontWeight:800}} onClick={()=>setShowAgModal(true)}>
            📅 + Agendar sessão
          </button>
        </div>
      );
    }
  }

  return (
    <div style={{display:"flex",height:"100vh",background:S.bg,color:"#fff",fontFamily:"'Work Sans',sans-serif",overflow:"hidden"}}>

      {/* ── ONBOARDING MODAL ── */}
      {needsOnboarding && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:24}}>
          <div style={{width:"100%",maxWidth:440,background:S.sb,border:`1px solid ${S.borderGold}`,borderRadius:20,padding:40}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:32,marginBottom:12}}>👋</div>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:800,color:"#fff",marginBottom:6}}>Bem-vindo à Norva!</div>
              <div style={{fontSize:14,color:S.muted,lineHeight:1.5}}>Para personalizar sua experiência,<br/>precisamos de mais alguns dados.</div>
            </div>
            {obError && <div style={{background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#f87171",marginBottom:14}}>{obError}</div>}
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:S.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6,display:"block"}}>Nome completo</label>
                <input value={obName} onChange={e=>setObName(e.target.value)} placeholder="Ex: João Silva"
                  style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`1px solid ${S.border}`,background:"rgba(255,255,255,0.05)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:S.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6,display:"block"}}>Data de nascimento</label>
                <input type="date" value={obBirth} onChange={e=>setObBirth(e.target.value)}
                  style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`1px solid ${S.border}`,background:"rgba(255,255,255,0.05)",color:obBirth?"#fff":S.muted,fontSize:14,outline:"none",boxSizing:"border-box",colorScheme:"dark"}}/>
              </div>
              <div>
                <label style={{fontSize:12,fontWeight:600,color:S.muted,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:6,display:"block"}}>Telefone (WhatsApp)</label>
                <input type="tel" value={obPhone} onChange={e=>setObPhone(e.target.value)} placeholder="(11) 99999-9999"
                  style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`1px solid ${S.border}`,background:"rgba(255,255,255,0.05)",color:"#fff",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
              </div>
            </div>
            <button onClick={submitOnboarding} disabled={obLoading}
              style={{width:"100%",marginTop:24,padding:"14px 20px",borderRadius:12,border:"none",background:S.gold,color:S.deep,fontSize:15,fontWeight:700,cursor:obLoading?"not-allowed":"pointer",opacity:obLoading?.7:1}}>
              {obLoading ? 'Salvando...' : 'Continuar para o dashboard →'}
            </button>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside style={{width:240,minHeight:"100vh",background:S.sb,borderRight:`1px solid ${S.border}`,display:"flex",flexDirection:"column",flexShrink:0,position:"relative",zIndex:10}}>
        {/* Logo */}
        <div style={{padding:"28px 24px 24px",borderBottom:`1px solid ${S.border}`}}>
          <div style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'Work Sans',sans-serif",fontWeight:700,fontSize:15,letterSpacing:"0.12em"}}>
            <div style={{width:6,height:6,borderRadius:"50%",background:S.gold}}/>
            <span style={{color:S.gold}}>NORVA</span>
            <span style={{color:"#fff"}}> CONSULTORIA</span>
            <div style={{width:6,height:6,borderRadius:"50%",background:S.gold}}/>
          </div>
          <span style={{marginTop:8,fontSize:11,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:S.leaf,background:"rgba(82,183,136,0.12)",display:"inline-block",padding:"3px 10px",borderRadius:4}}>
            Plano Prime
          </span>
        </div>

        {/* Nav */}
        <nav style={{padding:"20px 0",flex:1}}>
          {navSections.map(section=>(
            <div key={section.label}>
              <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",padding:"16px 24px 8px"}}>{section.label}</div>
              {section.items.map(item=>(
                <div key={item.id} onClick={()=>setActive(item.id)}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"11px 24px",cursor:"pointer",fontSize:14,fontWeight:500,
                    color:active===item.id?"#C9963A":"rgba(255,255,255,0.55)",
                    background:active===item.id?"rgba(201,150,58,0.08)":"transparent",
                    borderLeft:`3px solid ${active===item.id?"#C9963A":"transparent"}`,
                    transition:"all .2s"}}>
                  <span style={{fontSize:16,width:20,textAlign:"center"}}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge&&<span style={{marginLeft:"auto",background:S.gold,color:S.deep,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:10}}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div style={{padding:"20px 24px",borderTop:`1px solid ${S.border}`,display:"flex",alignItems:"center",gap:12,position:"relative"}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${S.mid},${S.gold})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:S.deep,flexShrink:0}}>{initials}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{userName}</div>
            <div style={{fontSize:11,color:S.muted}}>Prime · Ativo</div>
          </div>
          <button onClick={()=>setShowUserMenu(m=>!m)} title="Opções"
            style={{fontSize:18,cursor:"pointer",opacity:.6,background:"none",border:"none",color:"#fff",padding:0,lineHeight:1}}
            onMouseEnter={e=>e.currentTarget.style.opacity=1}
            onMouseLeave={e=>e.currentTarget.style.opacity=.6}>⋯</button>

          {/* Dropdown menu */}
          {showUserMenu && (<>
            <div onClick={()=>setShowUserMenu(false)} style={{position:"fixed",inset:0,zIndex:19}}/>
            <div style={{position:"absolute",bottom:64,right:12,background:S.sb,border:`1px solid ${S.border}`,borderRadius:12,overflow:"hidden",zIndex:20,minWidth:180,boxShadow:"0 8px 32px rgba(0,0,0,0.4)"}}>
              <button onClick={openProfile}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"13px 16px",background:"transparent",border:"none",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left",borderBottom:`1px solid ${S.border}`}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(201,150,58,0.08)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{fontSize:16}}>👤</span> Meus dados
              </button>
              <button onClick={()=>{setShowUserMenu(false);onLogout();}}
                style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"13px 16px",background:"transparent",border:"none",color:"#f87171",fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left"}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.08)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <span style={{fontSize:16}}>🚪</span> Sair da conta
              </button>
            </div>
          </>)}
        </div>
      </aside>

      {/* ── PROFILE MODAL ── */}
      {showProfile && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:998,padding:24}}
          onClick={e=>{if(e.target===e.currentTarget)setShowProfile(false);}}>
          <div style={{width:"100%",maxWidth:460,background:S.sb,border:`1px solid ${S.borderGold}`,borderRadius:20,padding:36,position:"relative"}}>
            <button onClick={()=>setShowProfile(false)} style={{position:"absolute",top:14,right:18,background:"transparent",border:"none",color:S.muted,cursor:"pointer",fontSize:20,lineHeight:1}}>×</button>
            <div style={{marginBottom:24}}>
              <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:800,color:"#fff",marginBottom:4}}>Meus Dados</div>
              <div style={{fontSize:13,color:S.muted}}>Atualize suas informações cadastrais.</div>
            </div>
            {profMsg   && <div style={{background:"rgba(82,183,136,0.12)",border:"1px solid rgba(82,183,136,0.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#52B788",marginBottom:14}}>{profMsg}</div>}
            {profError && <div style={{background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#f87171",marginBottom:14}}>{profError}</div>}
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {[
                {label:"Nome completo",      value:profName,  set:setProfName,  type:"text",     ph:"Ex: João Silva"},
                {label:"Data de nascimento", value:profBirth, set:setProfBirth, type:"date",     ph:""},
                {label:"Telefone (WhatsApp)",value:profPhone, set:setProfPhone, type:"tel",      ph:"(11) 99999-9999"},
                {label:"E-mail",             value:profEmail, set:setProfEmail, type:"email",    ph:"seu@email.com", disabled:true},
              ].map(f=>(
                <div key={f.label}>
                  <label style={{fontSize:11,fontWeight:600,color:S.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,display:"block"}}>{f.label}</label>
                  <input type={f.type} value={f.value} onChange={e=>!f.disabled&&f.set(e.target.value)} placeholder={f.ph} disabled={f.disabled}
                    style={{width:"100%",padding:"12px 14px",borderRadius:10,border:`1px solid ${f.disabled?"rgba(255,255,255,0.08)":S.border}`,background:f.disabled?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.05)",color:f.disabled?S.muted:"#fff",fontSize:14,outline:"none",boxSizing:"border-box",colorScheme:"dark",cursor:f.disabled?"not-allowed":"text"}}/>
                  {f.disabled && <div style={{fontSize:11,color:S.muted,marginTop:4}}>Para alterar o e-mail entre em contato com o suporte.</div>}
                </div>
              ))}
            </div>
            <button onClick={saveProfile} disabled={profSaving}
              style={{width:"100%",marginTop:24,padding:"14px 20px",borderRadius:12,border:"none",background:S.gold,color:S.deep,fontSize:15,fontWeight:700,cursor:profSaving?"not-allowed":"pointer",opacity:profSaving?.7:1}}>
              {profSaving ? 'Salvando...' : 'Salvar alterações'}
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
        {/* Topbar */}
        <div style={{padding:"20px 36px",borderBottom:`1px solid ${S.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(10,31,20,0.6)",backdropFilter:"blur(8px)",position:"sticky",top:0,zIndex:5,flexShrink:0}}>
          <div>
            <h2 style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:22,fontWeight:700,letterSpacing:"-0.01em",margin:0}}>{saudacao}, {userName} 👋</h2>
            <p style={{fontSize:13,color:S.muted,marginTop:2}}>{new Date().toLocaleDateString("pt-BR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})} · Plano Prime</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:38,height:38,borderRadius:8,border:`1px solid ${S.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer",position:"relative"}}>
              🔔
              <div style={{position:"absolute",top:8,right:8,width:7,height:7,borderRadius:"50%",background:S.gold,border:`1.5px solid ${S.sb}`}}/>
            </div>
            <button onClick={()=>setActive("goals")} style={{background:S.gold,color:S.deep,fontSize:13,fontWeight:700,letterSpacing:"0.04em",padding:"9px 20px",borderRadius:7,cursor:"pointer",border:"none",fontFamily:"'Work Sans',sans-serif"}}>
              + Adicionar meta
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{padding:"32px 36px",flex:1}}>{renderContent()}</div>
      </main>
    </div>
  );
}

// ─── VENDOR AREA ───────────────────────────────────────────
function VendorArea({ user, onLogout, dark, toggleDark }) {
  const C = getC(dark);
  const [active, setActive] = useState("dashboard");
  const nav = [
    { id:"dashboard", label:"Comissões", icon:DollarSign },
    { id:"clients",   label:"Clientes",  icon:Users },
    { id:"leads",     label:"Leads",     icon:Phone },
  ];
  const [leads, setLeads] = useState(mockLeads);
  const [newLead, setNewLead] = useState({ name:"", phone:"" });

  const sales = [
    { client:"João Silva",   plan:"Prime",     val:119.90, date:"10/04/25", status:"liberada" },
    { client:"Pedro Torres", plan:"Prime",     val:119.90, date:"15/04/25", status:"pendente" },
    { client:"Maria Souza",  plan:"Progresso", val:59.90,  date:"20/04/25", status:"liberada" },
  ];
  const lib = sales.filter(s=>s.status==="liberada");
  const totalAdh = lib.reduce((a,s)=>a+(s.val*.5),0).toFixed(2);
  const totalRec = lib.reduce((a,s)=>a+(s.val*.1),0).toFixed(2);
  const totalPend = sales.filter(s=>s.status==="pendente").reduce((a,s)=>a+(s.val*.5),0).toFixed(2);

  function renderContent() {
    if (active==="dashboard") return (
      <div>
        <Title C={C}>Painel de Comissões</Title>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          <StatCard C={C} icon={DollarSign}   label="Comissão adesão"  value={`R$ ${totalAdh}`}  color={C.green}  sub="50% das vendas liberadas"/>
          <StatCard C={C} icon={TrendingUp}   label="Recorrente"       value={`R$ ${totalRec}`}  color={C.accent} sub="10% a partir do próx. mês"/>
          <StatCard C={C} icon={Clock}        label="Pendente (7 dias)" value={`R$ ${totalPend}`} color={C.gold}   sub="Aguardando confirmação"/>
          <StatCard C={C} icon={Users}        label="Clientes ativos"  value={mockClients.filter(c=>c.status==="ativo").length} color={C.purple}/>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginTop:14 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>Histórico de vendas</div>
          {sales.map((s,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:i<sales.length-1?`1px solid ${C.border}`:"none" }}>
              <div>
                <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{s.client}</div>
                <div style={{ fontSize:11, color:C.muted }}>Plano {s.plan} · {s.date}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontWeight:700, color:C.green, marginBottom:3 }}>+R$ {(s.val*.5).toFixed(2)}</div>
                <span style={badge(s.status==="liberada"?C.green:C.gold)}>{s.status==="liberada"?"✓ Liberada":"⏰ Pendente"}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:`${C.accent}10`, border:`1px solid ${C.accent}33`, borderRadius:12, padding:16, marginTop:14 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.accentL, marginBottom:4 }}>ℹ️ Regra de comissões</div>
          <div style={{ fontSize:11, color:C.muted, lineHeight:1.6 }}>
            <strong style={{color:C.text}}>Adesão:</strong> 50% do valor do plano, liberada 7 dias após confirmação da venda.<br/>
            <strong style={{color:C.text}}>Recorrente:</strong> 10% do valor mensal, a partir do mês seguinte à adesão.
          </div>
        </div>
      </div>
    );

    if (active==="clients") return (
      <div>
        <Title C={C}>Meus Clientes ({mockClients.filter(c=>c.status==="ativo").length} ativos)</Title>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {mockClients.map(c=>(
            <div key={c.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{c.name}</div>
                <div style={{ fontSize:11, color:C.muted }}>Plano {c.plan} · Desde {c.joined} · R$ {c.planVal.toFixed(2)}/mês</div>
              </div>
              <span style={badge(c.status==="ativo"?C.green:C.red)}>{c.status==="ativo"?"● Ativo":"○ Cancelado"}</span>
            </div>
          ))}
        </div>
      </div>
    );

    if (active==="leads") return (
      <div>
        <Title C={C}>Leads</Title>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {leads.map(l=>(
            <div key={l.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{l.name}</div>
                <div style={{ fontSize:12, color:C.muted }}>{l.phone.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3")}</div>
              </div>
              <button style={btn(C.green)} onClick={()=>window.open(`https://wa.me/55${l.phone}`,"_blank")}>📱 WhatsApp</button>
            </div>
          ))}
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginTop:14 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>+ Novo lead</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Input C={C} label="Nome completo" placeholder="Nome do lead" value={newLead.name} onChange={e=>setNewLead(l=>({...l,name:e.target.value}))}/>
            <Input C={C} label="Telefone" placeholder="(21) 99999-0000" value={newLead.phone} onChange={e=>setNewLead(l=>({...l,phone:e.target.value}))}/>
          </div>
          <button style={{...btn(),marginTop:12}} onClick={()=>{if(!newLead.name)return;setLeads(l=>[...l,{id:Date.now(),...newLead}]);setNewLead({name:"",phone:""});}}>Adicionar lead</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"system-ui,sans-serif", overflow:"hidden" }}>
      <Sidebar nav={nav} active={active} setActive={setActive} roleLabel="Vendedor" onLogout={onLogout} C={C}/>
      <div style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.sidebar, flexShrink:0 }}>
          <span style={{ fontWeight:600, fontSize:14, color:C.text }}>Painel do Vendedor</span>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <ThemeToggle dark={dark} toggle={toggleDark}/>
            <span style={badge(C.green)}>Vendedor</span>
          </div>
        </div>
        <div style={{ padding:20, flex:1 }}>{renderContent()}</div>
      </div>
    </div>
  );
}

// ─── CONSULTANT AREA ───────────────────────────────────────
function ConsultantArea({ user, onLogout, dark, toggleDark }) {
  const C = getC(dark);
  const [active, setActive] = useState("schedule");
  const [sessions, setSessions] = useState(mockSessions);
  const nav = [
    { id:"schedule", label:"Agenda",   icon:Calendar },
    { id:"clients",  label:"Clientes", icon:Users },
  ];

  function renderContent() {
    if (active==="schedule") return (
      <div>
        <Title C={C}>Agenda de Atendimentos</Title>
        {sessions.map(s=>(
          <div key={s.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:C.text }}>{s.client}</div>
                <div style={{ fontSize:11, color:C.muted }}>📅 {s.date} às {s.time}</div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={badge(s.status==="realizada"?C.green:C.gold)}>{s.status==="realizada"?"✓ Realizada":"⏰ Agendada"}</span>
                {s.status==="agendada" && <button style={btn()}>Iniciar</button>}
              </div>
            </div>
            <label style={{ fontSize:11, color:C.muted, marginBottom:4, display:"block" }}>Observações</label>
            <textarea style={{ background:C.inputBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, width:"100%", outline:"none", boxSizing:"border-box", height:68, resize:"vertical" }}
              placeholder="Registre observações desta sessão..."
              defaultValue={s.notes}
              onBlur={e=>setSessions(ss=>ss.map(x=>x.id===s.id?{...x,notes:e.target.value}:x))}/>
          </div>
        ))}
      </div>
    );

    if (active==="clients") return (
      <div>
        <Title C={C}>Clientes Atribuídos</Title>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {mockClients.filter(c=>c.status==="ativo").map(c=>(
            <div key={c.id} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:C.text }}>{c.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>Plano {c.plan} · Desde {c.joined}</div>
                </div>
                <span style={badge(C.green)}>● Ativo</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                {[["Renda","R$ 4.200",C.green],["Gastos","R$ 2.850",C.red],["Saldo","R$ 1.350",C.accent]].map(([l,v,col])=>(
                  <div key={l} style={{ background:C.inputBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"10px 12px" }}>
                    <div style={{ fontSize:10, color:C.muted }}>{l}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:col }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"system-ui,sans-serif", overflow:"hidden" }}>
      <Sidebar nav={nav} active={active} setActive={setActive} roleLabel="Consultor" onLogout={onLogout} C={C}/>
      <div style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.sidebar, flexShrink:0 }}>
          <span style={{ fontWeight:600, fontSize:14, color:C.text }}>Área do Consultor</span>
          <div style={{ display:"flex", gap:10 }}><ThemeToggle dark={dark} toggle={toggleDark}/><span style={badge(C.gold)}>Consultor</span></div>
        </div>
        <div style={{ padding:20, flex:1 }}>{renderContent()}</div>
      </div>
    </div>
  );
}

// ─── ADMIN AREA ────────────────────────────────────────────
function AdminArea({ user, onLogout, dark, toggleDark }) {
  const C = getC(dark);
  const [active, setActive] = useState("dre");
  const [expenses, setExpenses] = useState([
    { id:1, desc:"Ferramentas SaaS", val:450, date:"Abr/25" },
    { id:2, desc:"Tráfego pago",     val:800, date:"Abr/25" },
    { id:3, desc:"Contador",         val:350, date:"Abr/25" },
  ]);
  const [newExp, setNewExp] = useState({ desc:"", val:"" });
  const [accounts, setAccounts] = useState(mockAccounts);
  const [newAcc, setNewAcc] = useState({ name:"", email:"", role:"vendor", phone:"", cpf:"", password:"" });
  const [accMsg, setAccMsg] = useState("");

  const nav = [
    { id:"dre",      label:"DRE em Tempo Real",  icon:BarChart3 },
    { id:"metrics",  label:"Métricas",            icon:Activity },
    { id:"finance",  label:"Financeiro",          icon:DollarSign },
    { id:"accounts", label:"Criar Contas",        icon:UserPlus },
  ];

  const activeClients = mockClients.filter(c=>c.status==="ativo");
  const mrr = activeClients.reduce((a,c)=>a+c.planVal,0);
  const adhesion = 299.70;
  const total = mrr + adhesion;
  const commissions = total*.3;
  const marketing = total*.2;
  const ops = total*.2;
  const extraExp = expenses.reduce((a,e)=>a+e.val,0);
  const liquid = total - commissions - marketing - ops - extraExp;

  function DreRow({ label, value, color, bold, indent }) {
    return (
      <div style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${C.border}`, paddingLeft:indent?14:0 }}>
        <span style={{ fontSize:13, color:bold?C.text:C.muted, fontWeight:bold?600:400 }}>{label}</span>
        <span style={{ fontSize:13, fontWeight:bold?700:500, color:color||C.text }}>
          {value<0?`- R$ ${Math.abs(value).toFixed(2)}`:`R$ ${value.toFixed(2)}`}
        </span>
      </div>
    );
  }

  function createAccount() {
    if (!newAcc.name || !newAcc.email || !newAcc.cpf || !newAcc.phone || !newAcc.password) {
      setAccMsg("⚠️ Preencha todos os campos obrigatórios."); return;
    }
    setAccounts(a => [...a, { id:Date.now(), ...newAcc, since:"Abr/25" }]);
    setNewAcc({ name:"", email:"", role:"vendor", phone:"", cpf:"", password:"" });
    setAccMsg("✅ Conta criada com sucesso! O colaborador pode acessar com o Gmail cadastrado.");
    setTimeout(()=>setAccMsg(""), 4000);
  }

  function renderContent() {
    if (active==="dre") return (
      <div>
        <Title C={C}>DRE — Abril 2025</Title>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          <StatCard C={C} icon={TrendingUp}    label="Receita total"   value={`R$ ${total.toFixed(2)}`}   color={C.green}  trend={15}/>
          <StatCard C={C} icon={DollarSign}    label="MRR"             value={`R$ ${mrr.toFixed(2)}`}    color={C.accent}/>
          <StatCard C={C} icon={ArrowDownRight} label="Custo total"    value={`R$ ${(commissions+marketing+ops+extraExp).toFixed(2)}`} color={C.red}/>
          <StatCard C={C} icon={Activity}      label="Lucro líquido"   value={`R$ ${liquid.toFixed(2)}`}  color={liquid>0?C.green:C.red}/>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginTop:14 }}>
          <div style={{ fontSize:13, fontWeight:700, marginBottom:12, color:C.text }}>Demonstrativo de Resultado — Norva Consultoria</div>
          <DreRow label="(+) Receita Recorrente (MRR)"      value={mrr}         bold/>
          <DreRow label="(+) Receita de Adesões"            value={adhesion}    indent/>
          <DreRow label="= Receita Bruta Total"             value={total}       bold/>
          <DreRow label="(-) Comissões vendedores (30%)"    value={-commissions} color={C.red} indent/>
          <DreRow label="(-) Marketing e aquisição (20%)"   value={-marketing}   color={C.red} indent/>
          <DreRow label="(-) Custos operacionais (20%)"     value={-ops}         color={C.red} indent/>
          <DreRow label="(-) Despesas extras"               value={-extraExp}    color={C.red} indent/>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"14px 0 6px", marginTop:4, borderTop:`2px solid ${C.border}` }}>
            <span style={{ fontSize:15, fontWeight:800, color:C.text }}>= LUCRO LÍQUIDO</span>
            <span style={{ fontSize:15, fontWeight:800, color:liquid>0?C.green:C.red }}>R$ {liquid.toFixed(2)}</span>
          </div>
          <Bar pct={(liquid/total)*100} color={liquid>0?C.green:C.red}/>
          <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>Margem líquida: {((liquid/total)*100).toFixed(1)}%</div>
        </div>
      </div>
    );

    if (active==="metrics") return (
      <div>
        <Title C={C}>Métricas de Negócio</Title>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
          <StatCard C={C} icon={Users}     label="Clientes ativos"  value={activeClients.length} color={C.accent} trend={25}/>
          <StatCard C={C} icon={Activity}  label="MRR"              value={`R$ ${mrr.toFixed(2)}`} color={C.green} trend={12}/>
          <StatCard C={C} icon={TrendingUp} label="Churn mensal"    value="1" sub="1 cancelamento" color={C.red}/>
          <StatCard C={C} icon={DollarSign} label="Ticket médio"    value={`R$ ${(mrr/activeClients.length).toFixed(2)}`} color={C.gold}/>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:14 }}>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>Distribuição por plano</div>
            {[["Prime (R$ 119,90)",2,C.accent],["Progresso (R$ 59,90)",1,C.green],["Essencial (R$ 19,90)",0,C.gold]].map(([l,n,c])=>(
              <div key={l} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
                  <span style={{color:C.muted}}>{l}</span><span style={{color:c,fontWeight:700}}>{n} clientes</span>
                </div>
                <Bar pct={(n/activeClients.length)*100} color={c}/>
              </div>
            ))}
          </div>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
            <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>Vendas por vendedor</div>
            {[{ name:"Carlos Mendes", sales:3, rev:"299,70" }].map((v,i)=>(
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0" }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{v.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{v.sales} vendas no mês</div>
                </div>
                <span style={{ color:C.green, fontWeight:700 }}>R$ {v.rev}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    if (active==="finance") return (
      <div>
        <Title C={C}>Controle Financeiro</Title>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginBottom:14 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>Registrar despesa</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Input C={C} label="Descrição" placeholder="ex: Licença software" value={newExp.desc} onChange={e=>setNewExp(x=>({...x,desc:e.target.value}))}/>
            <Input C={C} label="Valor (R$)" type="number" placeholder="0" value={newExp.val} onChange={e=>setNewExp(x=>({...x,val:e.target.value}))}/>
          </div>
          <button style={{...btn(C.red),marginTop:12}} onClick={()=>{if(!newExp.desc||!newExp.val)return;setExpenses(e=>[...e,{id:Date.now(),desc:newExp.desc,val:+newExp.val,date:"Abr/25"}]);setNewExp({desc:"",val:""});}}>Registrar despesa</button>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:12, color:C.text }}>Despesas — Abril 2025</div>
          {expenses.map((e,i)=>(
            <div key={e.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:i<expenses.length-1?`1px solid ${C.border}`:"none" }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:C.text }}>{e.desc}</div>
                <div style={{ fontSize:10, color:C.muted }}>{e.date}</div>
              </div>
              <span style={{ color:C.red, fontWeight:700 }}>- R$ {e.val.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 0", borderTop:`1px solid ${C.border}`, marginTop:6 }}>
            <span style={{ fontSize:13, fontWeight:700, color:C.text }}>Total despesas extras</span>
            <span style={{ color:C.red, fontWeight:700 }}>- R$ {extraExp.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );

    if (active==="accounts") return (
      <div>
        <Title C={C}>Criar Contas de Colaboradores</Title>

        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20, marginBottom:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
            <Shield size={16} color={C.accent}/>
            <span style={{ fontSize:13, fontWeight:700, color:C.text }}>Nova conta</span>
            <span style={{ fontSize:11, color:C.muted }}>— O colaborador entrará com o Gmail cadastrado</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
            <Input C={C} label="Nome completo *" placeholder="João da Silva" value={newAcc.name} onChange={e=>setNewAcc(a=>({...a,name:e.target.value}))}/>
            <Input C={C} label="Gmail *" type="email" placeholder="colaborador@gmail.com" value={newAcc.email} onChange={e=>setNewAcc(a=>({...a,email:e.target.value}))}/>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
            <div>
              <label style={{ fontSize:11, color:C.muted, marginBottom:4, display:"block", fontWeight:500 }}>Perfil *</label>
              <select value={newAcc.role} onChange={e=>setNewAcc(a=>({...a,role:e.target.value}))}
                style={{ background:C.inputBg, border:`1px solid ${C.border}`, borderRadius:8, padding:"9px 13px", color:C.text, fontSize:13, width:"100%", outline:"none", boxSizing:"border-box" }}>
                <option value="vendor">💼 Vendedor</option>
                <option value="consultant">🧠 Consultor</option>
              </select>
            </div>
            <Input C={C} label="CPF *" placeholder="000.000.000-00" value={newAcc.cpf} onChange={e=>setNewAcc(a=>({...a,cpf:e.target.value}))}/>
            <Input C={C} label="Telefone *" placeholder="(21) 99999-0000" value={newAcc.phone} onChange={e=>setNewAcc(a=>({...a,phone:e.target.value}))}/>
          </div>
          <div style={{ marginBottom:16 }}>
            <Input C={C} label="Senha padrão *" type="password" placeholder="Senha provisória para primeiro acesso" value={newAcc.password} onChange={e=>setNewAcc(a=>({...a,password:e.target.value}))}/>
            <div style={{ fontSize:10, color:C.muted, marginTop:4 }}>O colaborador poderá alterar a senha após o primeiro acesso.</div>
          </div>
          {accMsg && (
            <div style={{ background:accMsg.startsWith("✅")?`${C.green}18`:`${C.gold}18`, border:`1px solid ${accMsg.startsWith("✅")?C.green:C.gold}44`, borderRadius:8, padding:"10px 14px", fontSize:12, color:accMsg.startsWith("✅")?C.green:C.gold, marginBottom:12 }}>{accMsg}</div>
          )}
          <button style={btn()} onClick={createAccount}>
            <UserPlus size={14} style={{marginRight:6, display:"inline"}}/> Criar conta
          </button>
        </div>

        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:14, color:C.text }}>Colaboradores cadastrados</div>
          {accounts.map((a,i)=>(
            <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom:i<accounts.length-1?`1px solid ${C.border}`:"none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,#2D6A4F,#C9963A)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:13, flexShrink:0 }}>
                  {a.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{a.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{a.email} · CPF {a.cpf} · {a.phone}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                <span style={badge(a.role==="vendor"?C.green:C.gold)}>{a.role==="vendor"?"💼 Vendedor":"🧠 Consultor"}</span>
                <span style={{ fontSize:10, color:C.muted }}>Desde {a.since}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"system-ui,sans-serif", overflow:"hidden" }}>
      <Sidebar nav={nav} active={active} setActive={setActive} roleLabel="Diretoria · Admin" onLogout={onLogout} C={C}/>
      <div style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.sidebar, flexShrink:0 }}>
          <span style={{ fontWeight:600, fontSize:14, color:C.text }}>Painel da Diretoria</span>
          <div style={{ display:"flex", gap:10 }}><ThemeToggle dark={dark} toggle={toggleDark}/><span style={badge(C.purple)}>Admin</span></div>
        </div>
        <div style={{ padding:20, flex:1 }}>{renderContent()}</div>
      </div>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────
export default function App() {
  const [user, setUser]   = useState(null);
  const [dark, setDark]   = useState(true);
  const toggleDark = () => setDark(d => !d);
  const logout = () => setUser(null);

  if (!user) return <LoginScreen onLogin={setUser} dark={dark} toggleDark={toggleDark}/>;
  const props = { user, onLogout:logout, dark, toggleDark };
  if (user.role==="client")     return <ClientArea     {...props}/>;
  if (user.role==="vendor")     return <VendorArea     {...props}/>;
  if (user.role==="consultant") return <ConsultantArea {...props}/>;
  if (user.role==="admin")      return <AdminArea      {...props}/>;
}

// Wrapper que conecta sessão Supabase ao App com controle de acesso por assinatura
export function AppWithAuth({ googleUser, onLogout }) {
  const [profile, setProfile] = useState(null);
  // loading | first_access | payment_required | payment_required_new | active
  const [status, setStatus] = useState("loading");
  const [dark, setDark] = useState(true);
  const toggleDark = () => setDark(d => !d);

  useEffect(() => {
    if (!googleUser) return;
    import("./lib/supabase").then(({ supabase }) => {
      supabase.from("profiles").select("*").eq("id", googleUser.id).single()
        .then(async ({ data: prof, error: profErr }) => {
          // Sem perfil → primeiro acesso
          if (!prof || profErr?.code === "PGRST116") {
            setStatus("first_access");
            return;
          }
          const p = { ...prof, name: prof.full_name };
          setProfile(p);
          // Equipe (admin/vendor/consultant) não precisa de assinatura
          if (prof.role !== "client") {
            setStatus("active");
            return;
          }
          // Verifica assinatura ativa
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("id")
            .eq("client_id", googleUser.id)
            .eq("status", "active")
            .maybeSingle();
          setStatus(sub ? "active" : "payment_required");
        });
    });
  }, [googleUser]);

  if (status === "loading") {
    return <div style={{background:LS.bg0,height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontFamily:LS.ffB}}>Carregando perfil...</div>;
  }

  if (status === "first_access") {
    return (
      <RegistrationForm
        googleUser={googleUser}
        onComplete={(p) => { setProfile(p); setStatus("payment_required_new"); }}
      />
    );
  }

  if (status === "payment_required" || status === "payment_required_new") {
    return (
      <SubscriptionInactiveScreen
        user={profile}
        isNew={status === "payment_required_new"}
        onLogout={onLogout}
      />
    );
  }

  const props = { user: profile, onLogout, dark, toggleDark };
  if (profile.role === "admin") return <AdminArea {...props}/>;
  if (profile.role === "vendor") return <VendorArea {...props}/>;
  if (profile.role === "consultant") return <ConsultantArea {...props}/>;
  return <ClientArea {...props}/>;
}
