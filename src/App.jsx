import { useState, createContext, useContext } from "react";
import { LayoutDashboard, FileText, Target, BookOpen, Star, Calendar, DollarSign, TrendingUp, Users, Phone, BarChart3, Activity, LogOut, Bell, ArrowUpRight, ArrowDownRight, Clock, Bot, Sun, Moon, UserPlus, Shield } from "lucide-react";

const ThemeCtx = createContext({});
const useTheme = () => useContext(ThemeCtx);

function getC(dark) {
  return dark ? {
    bg:"#070d1a", card:"#0f1929", border:"#1a2940", accent:"#6c3fff",
    accentL:"#7c5cff", accentG:"#00cfff", gold:"#f59e0b", green:"#10b981",
    red:"#ef4444", text:"#f1f5f9", muted:"#64748b", sidebar:"#090e1c",
    purple:"#8b5cf6", inputBg:"#060c17", cardHover:"#132030"
  } : {
    bg:"#f0f4ff", card:"#ffffff", border:"#d1d9f0", accent:"#6c3fff",
    accentL:"#5b2ef0", accentG:"#00aadd", gold:"#d97706", green:"#059669",
    red:"#dc2626", text:"#1e293b", muted:"#64748b", sidebar:"#e8eeff",
    purple:"#7c3aed", inputBg:"#f8faff", cardHover:"#eef2ff"
  };
}

const PLANS = [
  { id:"essencial", label:"Essencial", price:19.90 },
  { id:"progresso", label:"Progresso", price:29.90 },
  { id:"prime",     label:"Prime",     price:49.90 },
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
            <stop offset="0%" stopColor="#6c3fff"/>
            <stop offset="100%" stopColor="#00cfff"/>
          </linearGradient>
        </defs>
        <polyline points="75,10 20,10 20,90 75,90" fill="none" stroke="url(#ng)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="65,28 36,28 36,72 65,72" fill="none" stroke="url(#ng)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75"/>
        <rect x="44" y="40" width="20" height="20" fill="none" stroke="url(#ng)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      </svg>
      <div>
        <div style={{ fontSize: fs, fontWeight:900, letterSpacing:.5, lineHeight:1 }}>
          <span style={{ background:"linear-gradient(135deg,#6c3fff,#00cfff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>NORVA</span>
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
const btn = (color="#6c3fff") => ({ background:`linear-gradient(135deg, ${color}, ${color}cc)`, color:"#fff", border:"none", borderRadius:8, padding:"9px 16px", cursor:"pointer", fontSize:13, fontWeight:600 });
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
              background: active===item.id ? `linear-gradient(135deg,#6c3fff18,#00cfff10)` : "transparent",
              border: active===item.id ? `1px solid #6c3fff33` : "1px solid transparent",
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
      style={{ background:"transparent", border:`1px solid #6c3fff44`, borderRadius:20, padding:"6px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, color: dark?"#f1f5f9":"#1e293b", fontSize:12, fontWeight:600 }}>
      {dark ? <><Sun size={13}/> Claro</> : <><Moon size={13}/> Escuro</>}
    </button>
  );
}

// ─── LOGIN ─────────────────────────────────────────────────
function LoginScreen({ onLogin, dark, toggleDark }) {
  const C = getC(dark);
  const [picking, setPicking] = useState(false);
  return (
    <div style={{ minHeight:"100vh", background:C.bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24, position:"relative" }}>
      <div style={{ position:"absolute", top:16, right:20 }}>
        <ThemeToggle dark={dark} toggle={toggleDark}/>
      </div>
      <div style={{ width:"100%", maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:14 }}>
            <NorvaLogo size="lg" C={C}/>
          </div>
          <div style={{ color:C.muted, fontSize:13, marginTop:4 }}>Plataforma de Consultoria Financeira</div>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:32 }}>
          {!picking ? (
            <>
              <div style={{ textAlign:"center", marginBottom:24 }}>
                <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:6 }}>Bem-vindo de volta</div>
                <div style={{ fontSize:12, color:C.muted }}>Entre com sua conta Google para acessar a plataforma</div>
              </div>
              <button onClick={async ()=>{ const {supabase} = await import("./lib/supabase"); await supabase.auth.signInWithOAuth({provider:"google",options:{redirectTo:window.location.origin}})}}
                style={{ width:"100%", padding:"13px 20px", borderRadius:10, border:`1px solid ${C.border}`, background:C.card, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:12, fontSize:14, fontWeight:600, color:C.text }}>
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                Entrar com Google
              </button>
              <div style={{ textAlign:"center", marginTop:18, fontSize:11, color:C.muted }}>
                Não tem acesso? Fale com um administrador Norva.
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:4 }}>Escolher conta Google</div>
              <div style={{ fontSize:11, color:C.muted, marginBottom:16 }}>Demonstração — selecione seu perfil</div>
              {MOCK_ACCOUNTS.map(acc => (
                <button key={acc.id} onClick={()=>onLogin(acc)}
                  style={{ display:"flex", alignItems:"center", gap:12, width:"100%", padding:"12px 14px", borderRadius:10, border:`1px solid ${C.border}`, background:C.inputBg, cursor:"pointer", marginBottom:8, textAlign:"left" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#6c3fff,#00cfff)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:13, flexShrink:0 }}>{acc.avatar}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{acc.name}</div>
                    <div style={{ fontSize:11, color:C.muted }}>{acc.email}</div>
                  </div>
                  <div style={{ marginLeft:"auto" }}>
                    <span style={badge(acc.role==="admin"?"#8b5cf6":acc.role==="vendor"?"#10b981":acc.role==="consultant"?"#f59e0b":"#6c3fff")}>
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
  { id:1, name:"João Silva",    plan:"Prime",     planVal:49.90, status:"ativo",     joined:"Jan/25" },
  { id:2, name:"Maria Souza",   plan:"Progresso", planVal:29.90, status:"ativo",     joined:"Fev/25" },
  { id:3, name:"Carla Mendes",  plan:"Essencial", planVal:19.90, status:"cancelado", joined:"Dez/24" },
  { id:4, name:"Pedro Torres",  plan:"Prime",     planVal:49.90, status:"ativo",     joined:"Mar/25" },
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

// ─── CLIENT AREA ───────────────────────────────────────────
function ClientArea({ user, onLogout, dark, toggleDark }) {
  const C = getC(dark);
  const [active, setActive] = useState("dashboard");
  const [goals, setGoals] = useState(mockGoalsData);
  const [newGoal, setNewGoal] = useState({ label:"", target:"", current:"" });
  const [form, setForm] = useState({ renda:"", gastos:"", dividas:"", objetivo:"" });
  const [report, setReport] = useState(""); const [loading, setLoading] = useState(false);

  const g2 = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 };
  const g3 = { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 };

  const nav = [
    { id:"dashboard",   label:"Dashboard",   icon:LayoutDashboard },
    { id:"report",      label:"Relatório IA", icon:Bot },
    { id:"goals",       label:"Metas",        icon:Target },
    { id:"education",   label:"Conteúdo",     icon:BookOpen },
    { id:"partners",    label:"Parceiros",    icon:Star },
    { id:"consulting",  label:"Consultorias", icon:Calendar },
  ];

  async function genReport() {
    if (!form.renda || !form.gastos) return;
    setLoading(true); setReport("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{ role:"user", content:`Você é consultor financeiro da Norva Consultoria. Gere um relatório financeiro profissional em português com análise e 3 recomendações práticas. Use **Título:** para seções.\n\nRenda: R$ ${form.renda}/mês | Gastos: R$ ${form.gastos}/mês | Dívidas: ${form.dividas||"Nenhuma"} | Objetivo: ${form.objetivo||"Organizar finanças"}` }]
        })
      });
      const d = await res.json();
      setReport(d.content?.map(c=>c.text||"").join("")||"Erro ao gerar.");
    } catch { setReport("Erro de conexão. Tente novamente."); }
    setLoading(false);
  }

  function addGoal() {
    if (!newGoal.label||!newGoal.target) return;
    setGoals(g=>[...g,{id:Date.now(),label:newGoal.label,target:+newGoal.target,current:+newGoal.current||0}]);
    setNewGoal({label:"",target:"",current:""});
  }

  function renderContent() {
    if (active==="dashboard") return (
      <div>
        <Title C={C}>Visão Geral Financeira</Title>
        <div style={g3}>
          <StatCard C={C} icon={ArrowUpRight} label="Receita do mês"   value="R$ 4.200" color={C.green} trend={8}/>
          <StatCard C={C} icon={ArrowDownRight} label="Gastos do mês"  value="R$ 2.850" color={C.red}   trend={-3}/>
          <StatCard C={C} icon={DollarSign}    label="Saldo disponível" value="R$ 1.350" color={C.accent}/>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginTop:14 }}>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:14, color:C.text }}>Evolução financeira — últimos 12 meses</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:5, height:70 }}>
            {[42,55,48,68,58,75,62,88,72,82,68,85].map((v,i)=>(
              <div key={i} style={{ flex:1, background:i===11?`linear-gradient(180deg,#6c3fff,#00cfff)`:`#6c3fff44`, borderRadius:"3px 3px 0 0", height:`${v}%` }}/>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:C.muted, marginTop:5 }}>
            {["Mai","Jun","Jul","Ago","Set","Out","Nov","Dez","Jan","Fev","Mar","Abr"].map(m=><span key={m}>{m}</span>)}
          </div>
        </div>
        <div style={{ ...g2, marginTop:14 }}>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
            <div style={{ fontSize:12, fontWeight:600, marginBottom:10, color:C.text }}>Distribuição de gastos</div>
            {[["Moradia","42%",C.accent],["Alimentação","25%",C.green],["Transporte","15%",C.gold],["Outros","18%",C.purple]].map(([l,v,c])=>(
              <div key={l} style={{ marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
                  <span style={{color:C.muted}}>{l}</span><span style={{color:c,fontWeight:600}}>{v}</span>
                </div>
                <Bar pct={parseInt(v)} color={c}/>
              </div>
            ))}
          </div>
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
            <div style={{ fontSize:12, fontWeight:600, marginBottom:10, color:C.text }}>Progresso das metas</div>
            {goals.slice(0,3).map(g=>(
              <div key={g.id} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
                  <span style={{color:C.muted}}>{g.label}</span>
                  <span style={{color:C.accentL,fontWeight:600}}>{Math.round((g.current/g.target)*100)}%</span>
                </div>
                <Bar pct={(g.current/g.target)*100} color={g.current>=g.target?C.green:C.accent}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    if (active==="report") return (
      <div>
        <Title C={C}>Relatório Financeiro com IA</Title>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18 }}>
          <div style={{ fontSize:12, color:C.muted, marginBottom:16 }}>Preencha os dados para gerar seu diagnóstico financeiro personalizado.</div>
          <div style={g2}>
            <Input C={C} label="Renda mensal (R$)" placeholder="ex: 3500" value={form.renda} onChange={e=>setForm(f=>({...f,renda:e.target.value}))}/>
            <Input C={C} label="Gastos mensais (R$)" placeholder="ex: 2800" value={form.gastos} onChange={e=>setForm(f=>({...f,gastos:e.target.value}))}/>
          </div>
          <div style={{marginTop:12}}><Input C={C} label="Dívidas atuais" placeholder="ex: Cartão R$ 5.000" value={form.dividas} onChange={e=>setForm(f=>({...f,dividas:e.target.value}))}/></div>
          <div style={{marginTop:12,marginBottom:16}}><Input C={C} label="Objetivo financeiro" placeholder="ex: Quitar dívidas em 12 meses" value={form.objetivo} onChange={e=>setForm(f=>({...f,objetivo:e.target.value}))}/></div>
          <button style={btn()} onClick={genReport} disabled={loading}>{loading?"⏳ Gerando...":"🤖 Gerar Relatório com IA"}</button>
        </div>
        {report && (
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, marginTop:14 }}>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:12, background:"linear-gradient(135deg,#6c3fff,#00cfff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>📄 Seu Relatório Personalizado</div>
            <div style={{ fontSize:12, lineHeight:1.9, color:C.text }}>
              {report.split("**").map((p,i)=>i%2===1?<strong key={i} style={{color:C.text,display:"block",marginTop:i>1?12:0,fontSize:13}}>{p}</strong>:<span key={i}>{p}</span>)}
            </div>
            <button style={{...btn(C.green),marginTop:16,fontSize:12}}>💾 Salvar relatório</button>
          </div>
        )}
      </div>
    );

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

    if (active==="partners") return (
      <div>
        <Title C={C}>Parceiros & Descontos Exclusivos</Title>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {mockPartners.map((p,i)=>(
            <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:18, display:"flex", gap:14, alignItems:"center" }}>
              <div style={{ width:46, height:46, borderRadius:10, background:`${C.accent}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{p.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600, fontSize:13, color:C.text }}>{p.name}</div>
                <div style={{ fontSize:11, color:C.muted }}>{p.service} · {p.addr}</div>
              </div>
              <span style={badge(C.green)}>{p.discount}</span>
            </div>
          ))}
        </div>
      </div>
    );

    if (active==="consulting") return (
      <div>
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
        <button style={{...btn(C.green),marginTop:14}}>+ Agendar sessão</button>
      </div>
    );
  }

  return (
    <div style={{ display:"flex", height:"100vh", background:C.bg, color:C.text, fontFamily:"system-ui,sans-serif", overflow:"hidden" }}>
      <Sidebar nav={nav} active={active} setActive={setActive} roleLabel={`Associado · Plano Prime`} onLogout={onLogout} C={C}/>
      <div style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"14px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:C.sidebar, flexShrink:0 }}>
          <span style={{ fontWeight:600, fontSize:14, color:C.text }}>Olá, {user.name.split(" ")[0]} 👋</span>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <ThemeToggle dark={dark} toggle={toggleDark}/>
            <span style={badge(C.accent)}>Plano Prime</span>
            <Bell size={16} color={C.muted}/>
          </div>
        </div>
        <div style={{ padding:20, flex:1 }}>{renderContent()}</div>
      </div>
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
    { client:"João Silva",   plan:"Prime",     val:49.90, date:"10/04/25", status:"liberada" },
    { client:"Pedro Torres", plan:"Prime",     val:49.90, date:"15/04/25", status:"pendente" },
    { client:"Maria Souza",  plan:"Progresso", val:29.90, date:"20/04/25", status:"liberada" },
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
                <div style={{ fontSize:11, color:C.muted }}>Plano {c.plan} · Desde {c.joined} · R$ {c.planVal}/mês</div>
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
  const adhesion = 149.60;
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
            {[["Prime (R$ 49,90)",2,C.accent],["Progresso (R$ 29,90)",1,C.green],["Essencial (R$ 19,90)",0,C.gold]].map(([l,n,c])=>(
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
            {[{ name:"Carlos Mendes", sales:3, rev:"149,70" }].map((v,i)=>(
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
                <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,#6c3fff,#00cfff)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:13, flexShrink:0 }}>
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
// Auto-login component - adicione isso antes do export default

// Wrapper que conecta sessão Supabase ao App
import { useEffect } from "react";
export function AppWithAuth({ googleUser, onLogout }) {
  const C = getC(true);
  const [profile, setProfile] = useState(null);
  const [dark, setDark] = useState(true);
  const toggleDark = () => setDark(d => !d);

  useEffect(() => {
    if (googleUser) {
      import('./lib/supabase').then(({ supabase }) => {
        supabase.from('profiles').select('*').eq('id', googleUser.id).single()
          .then(({ data }) => {
            if (data) setProfile({ ...data, name: data.full_name, email: data.email });
            else setProfile({ role: 'client', name: googleUser.email, email: googleUser.email });
          });
      });
    }
  }, [googleUser]);

  if (!profile) return <div style={{background:'#070d1a',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>Carregando perfil...</div>;

  const props = { user: profile, onLogout, dark, toggleDark };
  if (profile.role === 'admin') return <AdminArea {...props}/>;
  if (profile.role === 'vendor') return <VendorArea {...props}/>;
  if (profile.role === 'consultant') return <ConsultantArea {...props}/>;
  return <ClientArea {...props}/>;
}
