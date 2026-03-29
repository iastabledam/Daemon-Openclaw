import { useState } from "react";

const S = {
  app:   { minHeight:"100vh", background:"#0d0f1e", fontFamily:"Inter,system-ui,sans-serif", color:"#a1a1aa" },
  g1:    { position:"fixed", top:"-10%", left:"-10%", width:"40%", height:"40%", borderRadius:"50%", background:"rgba(16,185,129,0.07)", filter:"blur(120px)", pointerEvents:"none" },
  g2:    { position:"fixed", bottom:"-10%", right:"-10%", width:"40%", height:"40%", borderRadius:"50%", background:"rgba(99,102,241,0.07)", filter:"blur(120px)", pointerEvents:"none" },
  nav:   { position:"sticky", top:0, zIndex:50, background:"rgba(13,15,30,0.9)", backdropFilter:"blur(16px)", borderBottom:"1px solid #1e2235" },
  navI:  { maxWidth:1200, margin:"0 auto", padding:"12px 24px", display:"flex", justifyContent:"center" },
  navB:  { display:"inline-flex", padding:6, background:"rgba(24,24,27,0.9)", border:"1px solid #27272a", borderRadius:12, gap:4 },
  tA:    { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"#27272a", color:"#f4f4f5", fontWeight:600, fontSize:14 },
  tI:    { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"transparent", color:"#71717a", fontWeight:500, fontSize:14 },
  tOA:   { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"linear-gradient(135deg,rgba(99,102,241,0.5),rgba(34,211,238,0.3))", color:"#e0e7ff", fontWeight:700, fontSize:14, boxShadow:"0 0 16px rgba(99,102,241,0.35)" },
  tOI:   { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"linear-gradient(135deg,rgba(99,102,241,0.2),rgba(34,211,238,0.1))", color:"#a5b4fc", fontWeight:700, fontSize:14 },
  main:  { maxWidth:1200, margin:"0 auto", padding:"48px 24px 100px" },
  hr:    { border:"none", borderTop:"1px solid #1e2235", margin:"44px 0" },
  h2:    { fontSize:"clamp(1.3rem,2.5vw,1.75rem)", fontWeight:700, color:"#f4f4f5", margin:"48px 0 14px" },
  h3:    { fontSize:"1rem", fontWeight:700, color:"#f4f4f5", margin:"28px 0 10px" },
  h4:    { fontSize:"0.9rem", fontWeight:700, color:"#d4d4d8", margin:"20px 0 8px" },
  p:     { color:"#a1a1aa", lineHeight:1.8, margin:"10px 0" },
  bq:    { borderLeft:"3px solid rgba(16,185,129,0.5)", background:"rgba(16,185,129,0.05)", padding:"14px 18px", borderRadius:"0 10px 10px 0", margin:"18px 0" },
  bqW:   { borderLeft:"3px solid rgba(239,68,68,0.5)", background:"rgba(239,68,68,0.05)", padding:"14px 18px", borderRadius:"0 10px 10px 0", margin:"18px 0" },
  bqI:   { borderLeft:"3px solid rgba(99,102,241,0.5)", background:"rgba(99,102,241,0.05)", padding:"14px 18px", borderRadius:"0 10px 10px 0", margin:"18px 0" },
  bqY:   { borderLeft:"3px solid rgba(251,191,36,0.5)", background:"rgba(251,191,36,0.05)", padding:"14px 18px", borderRadius:"0 10px 10px 0", margin:"18px 0" },
  pre:   { background:"#080a14", border:"1px solid #1e2235", borderRadius:12, padding:"18px 20px", overflowX:"auto", margin:"14px 0" },
  preC:  { fontFamily:"monospace", fontSize:13, color:"#6ee7b7", lineHeight:1.7, whiteSpace:"pre" },
  ul:    { paddingLeft:22, margin:"10px 0" },
  li:    { color:"#a1a1aa", margin:"6px 0", lineHeight:1.7 },
  tbl:   { width:"100%", borderCollapse:"collapse", margin:"18px 0", fontSize:13 },
  th:    { background:"#0f1020", padding:"10px 14px", textAlign:"left", color:"#f4f4f5", borderBottom:"1px solid #1e2235", fontWeight:600 },
  td:    { padding:"10px 14px", color:"#a1a1aa", borderBottom:"1px solid #13152a", lineHeight:1.6 },
  card:  { padding:24, borderRadius:14, background:"#0f1120", border:"1px solid #1e2235", margin:"12px 0" },
  B:     { color:"#e4e4e7", fontWeight:600 },
  badge: { display:"inline-flex", alignItems:"center", gap:8, padding:"4px 14px", borderRadius:9999, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", color:"#34d399", fontSize:12, fontFamily:"monospace", marginBottom:28 },
  h1:    { fontSize:"clamp(2rem,5vw,3.4rem)", fontWeight:800, lineHeight:1.1, color:"#f4f4f5", marginBottom:16 },
  grad:  { background:"linear-gradient(135deg,#34d399,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  gradI: { background:"linear-gradient(135deg,#818cf8,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  stop:  { background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:12, padding:"18px 20px", margin:"20px 0" },
};

const Cd = ({c}) => <code style={{background:"rgba(16,185,129,0.1)",color:"#6ee7b7",padding:"2px 7px",borderRadius:4,fontFamily:"monospace",fontSize:"0.85em"}}>{c}</code>;
const B  = ({c}) => <strong style={S.B}>{c}</strong>;
const Pre = ({children}) => <pre style={S.pre}><code style={S.preC}>{children}</code></pre>;

function Img({label}) {
  return (
    <div style={{margin:"16px 0",padding:"14px 18px",borderRadius:10,background:"rgba(99,102,241,0.06)",border:"1px dashed rgba(99,102,241,0.2)",display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:18,flexShrink:0}}>🖼️</span>
      <span style={{fontSize:13,color:"#6366f1",fontStyle:"italic"}}>{label}</span>
    </div>
  );
}

function CB() {
  const [v,set] = useState(false);
  return <input type="checkbox" checked={v} onChange={e=>set(e.target.checked)} style={{width:16,height:16,accentColor:"#10b981",cursor:"pointer",flexShrink:0,marginTop:3}}/>;
}
function ChkItem({label}) {
  return <li style={{display:"flex",alignItems:"flex-start",gap:12,margin:"8px 0",listStyle:"none"}}><CB/><span style={{color:"#a1a1aa",lineHeight:1.6}}>{label}</span></li>;
}

function Arrow({label, color="#334155", vertical=true}) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,margin:"4px 0"}}>
      <div style={{width:1,height:18,background:`linear-gradient(to bottom, ${color}44, ${color}99)`}}/>
      {label && <div style={{padding:"3px 10px",borderRadius:6,background:`${color}18`,border:`1px solid ${color}33`,fontSize:11,color,fontFamily:"monospace",whiteSpace:"nowrap"}}>{label}</div>}
      {label && <div style={{width:1,height:18,background:`linear-gradient(to bottom, ${color}99, ${color}44)`}}/>}
      <div style={{width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:`7px solid ${color}88`}}/>
    </div>
  );
}

function Node({icon, title, sub, color, glow=false, badge=null}) {
  return (
    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:6,padding:"14px 20px",borderRadius:14,background:`${color}0d`,border:`1px solid ${color}33`,boxShadow:glow?`0 0 24px ${color}22`:"none",minWidth:130,position:"relative"}}>
      {badge && <div style={{position:"absolute",top:-10,left:"50%",transform:"translateX(-50%)",padding:"2px 10px",borderRadius:9999,background:color,color:"#09090b",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{badge}</div>}
      <div style={{fontSize:24,display:"flex",alignItems:"center",justifyContent:"center"}}>{typeof icon === "string" ? icon : icon}</div>
      <div style={{color,fontWeight:700,fontSize:13,textAlign:"center"}}>{title}</div>
      {sub && <div style={{color:`${color}88`,fontSize:11,fontFamily:"monospace",textAlign:"center"}}>{sub}</div>}
    </div>
  );
}

function Logo({src, size=28}) {
  return <img src={src} alt="" style={{width:size,height:size,objectFit:"contain",borderRadius:6,flexShrink:0}}/>;
}

function ArchDiagram() {
  return (
    <div style={{margin:"20px 0",padding:"32px 24px",borderRadius:20,background:"#06080f",border:"1px solid #1a1d2e",display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>

      {/* Row 1 — Sources + Arrows alignés en colonnes */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,width:"100%",maxWidth:680,marginBottom:0}}>
        {[
          {icon:"💻",          title:"TON PC",    sub:"IP fixe",      color:"#a5b4fc"},
          {icon:<Logo src="https://i.imgur.com/ZZat8GP.png"/>, title:"TELEGRAM",  sub:"@TonBot",    color:"#0088cc"},
          {icon:"🌐",          title:"INTERNET",  sub:"HTTP / HTTPS", color:"#94a3b8"},
        ].map((n,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
            <Node icon={n.icon} title={n.title} sub={n.sub} color={n.color}/>
            <Arrow label={["SSH · port 22 · ton IP","Telegram API","ports 80 / 443"][i]} color={n.color}/>
          </div>
        ))}
      </div>

      {/* Row 2 — Firewall */}
      <div style={{width:"100%",maxWidth:680,padding:"16px 24px",borderRadius:14,background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.2)",display:"flex",alignItems:"center",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
        <span style={{fontSize:20}}>🛡️</span>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Logo src="https://i.imgur.com/OXd7cgk.png" size={20}/>
          <span style={{color:"#f87171",fontWeight:700,fontSize:14,fontFamily:"monospace"}}>FIREWALL HOSTINGER</span>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {[["22","ton IP","#34d399"],["80","public","#34d399"],["443","public","#34d399"],["*","drop","#f87171"]].map(([p,s,c],i)=>(
            <div key={i} style={{padding:"3px 10px",borderRadius:6,background:`${c}14`,border:`1px solid ${c}33`,fontSize:11,color:c,fontFamily:"monospace"}}>:{p} <span style={{opacity:0.6}}>{s}</span></div>
          ))}
        </div>
      </div>

      <Arrow label="" color="#334155"/>

      {/* Row 3 — VPS */}
      <div style={{width:"100%",maxWidth:680,borderRadius:20,border:"1px solid rgba(124,58,237,0.3)",background:"rgba(124,58,237,0.03)",padding:"20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <Logo src="https://i.imgur.com/OXd7cgk.png" size={20}/>
          <span style={{color:"#a78bfa",fontWeight:700,fontSize:13,fontFamily:"monospace",letterSpacing:"0.05em"}}>VPS HOSTINGER</span>
        </div>

        {/* Coolify box */}
        <div style={{borderRadius:14,border:"1px solid rgba(124,58,237,0.2)",background:"rgba(124,58,237,0.04)",padding:"16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
            <Logo src="https://i.imgur.com/ucMrveh.png" size={18}/>
            <span style={{color:"#a78bfa",fontWeight:700,fontSize:13,fontFamily:"monospace"}}>COOLIFY</span>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {[
              {logo:"https://i.imgur.com/y9qnRhU.png", name:"Caddy",   sub:"SSL auto",        color:"#00c65e"},
              {logo:"https://i.imgur.com/YPq9o8G.png", name:"OpenClaw",sub:":18789 loopback",  color:"#ef4444", glow:true},
              {logo:"https://i.imgur.com/i2QBvBM.png", name:"n8n",     sub:"automation",       color:"#ea4b00"},
              {logo:"https://i.imgur.com/JkdpQUc.jpeg",name:"Supabase",sub:"database",         color:"#3ecf8e"},
            ].map((app,i)=>(
              <div key={i} style={{flex:"1 1 110px",maxWidth:140,padding:"12px 10px",borderRadius:12,background:`${app.color}0d`,border:`1px solid ${app.color}28`,textAlign:"center",boxShadow:app.glow?`0 0 16px ${app.color}33`:"none"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:6}}>
                  <Logo src={app.logo} size={28}/>
                </div>
                <div style={{color:app.color,fontWeight:700,fontSize:12}}>{app.name}</div>
                <div style={{color:`${app.color}77`,fontSize:10,fontFamily:"monospace",marginTop:2}}>{app.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Arrow label="API calls" color="#f59e0b"/>

      {/* Row 4 — LLM providers */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        {[
          {logo:"https://i.imgur.com/c70pItt.png",  name:"Anthropic",  sub:"Claude",    color:"#c9693a"},
          {logo:"https://i.imgur.com/Wawbyqs.jpeg", name:"OpenAI",     sub:"GPT",       color:"#f4f4f5"},
          {logo:"https://i.imgur.com/6B9O2hA.jpeg", name:"OpenRouter", sub:"Multi-LLM", color:"#6366f1"},
        ].map((llm,i)=>(
          <div key={i} style={{padding:"10px 18px",borderRadius:12,background:`${llm.color}0d`,border:`1px solid ${llm.color}28`,display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <img src={llm.logo} alt={llm.name} style={{width:32,height:32,objectFit:"contain",borderRadius:6}}/>
            </div>
            <div>
              <div style={{color:llm.color,fontWeight:700,fontSize:12}}>{llm.name}</div>
              <div style={{color:`${llm.color}77`,fontSize:10,fontFamily:"monospace"}}>{llm.sub}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

const TOC = [
  {id:"intro",     label:"0. Introduction"},
  {id:"avant",     label:"1. Avant de commencer"},
  {id:"ssh",       label:"2. Sécurisation SSH"},
  {id:"firewall",  label:"3. Firewall Hostinger"},
  {id:"deploy",    label:"4. Déploiement OpenClaw"},
  {id:"connexion", label:"5. Première connexion"},
  {id:"telegram",  label:"6. Configuration Telegram"},
  {id:"checklist", label:"7. Checklist finale"},
  {id:"depannage", label:"8. En cas de problème"},
  {id:"pratiques", label:"9. Bonnes pratiques"},
];

const CC_TOC = [
  {id:"cc1",  label:"1. C'est quoi Claude Code ?"},
  {id:"cc2",  label:"2. Quel abonnement ?"},
  {id:"cc3",  label:"3. Prérequis"},
  {id:"cc4",  label:"4. Installer Claude Code"},
  {id:"cc5",  label:"5. Premier lancement"},
  {id:"cc6",  label:"6. Dossier projet"},
  {id:"cc7",  label:"7. VS Code"},
  {id:"cc8",  label:"8. Commandes essentielles"},
  {id:"cc9",  label:"9. Outils avancés"},
  {id:"cc10", label:"10. Premier prompt"},
  {id:"cc11", label:"11. FAQ & Dépannage"},
];

function Toc({items, activeId, onTocClick, accentColor="#34d399"}) {
  return (
    <aside style={{position:"sticky",top:0,height:"100vh",display:"flex",alignItems:"center"}}>
      <div>
        <div style={{fontSize:13,textTransform:"uppercase",letterSpacing:"0.12em",color:accentColor,fontWeight:700,marginBottom:18}}>Sommaire</div>
        <nav style={{display:"flex",flexDirection:"column",borderLeft:"1px solid rgba(39,39,42,0.5)"}}>
          {items.map(({id,label})=>{
            const isA = activeId===id;
            return (
              <a key={id} href={"#"+id}
                onClick={e=>{e.preventDefault();onTocClick(id);}}
                style={{display:"block",fontSize:13,padding:"7px 0 7px 16px",marginLeft:-1,borderLeft:"1px solid "+(isA?accentColor:"transparent"),color:isA?accentColor:"#71717a",fontWeight:isA?600:400,textDecoration:"none",lineHeight:1.5,transition:"all 0.15s",cursor:"pointer"}}
                onMouseEnter={e=>{if(!isA){e.currentTarget.style.color=accentColor;e.currentTarget.style.borderLeftColor=accentColor;}}}
                onMouseLeave={e=>{if(!isA){e.currentTarget.style.color="#71717a";e.currentTarget.style.borderLeftColor="transparent";}}}
              >{label}</a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function GuideContent({activeId, onTocClick}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 210px",gap:56,alignItems:"start"}}>
      <article>

        <div style={{marginBottom:48}}>
          <div style={S.badge}>⚙️ VPS Hostinger · Coolify · Docker · Telegram</div>
          <h1 style={S.h1}>Sécurisation complète<br/><span style={S.grad}>d'OpenClaw sur VPS.</span></h1>
          <p style={{...S.p,fontSize:16,maxWidth:580,fontWeight:300}}>Ce guide te permet de déployer et sécuriser OpenClaw de A à Z, en totale autonomie.</p>
          {/* Logos setup cible */}
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap",margin:"16px 0 8px"}}>
            <span style={{color:"#71717a",fontSize:13}}>Setup cible :</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <img src="https://i.imgur.com/OXd7cgk.png" alt="Hostinger" style={{width:24,height:24,objectFit:"contain",borderRadius:4}}/>
              <span style={{color:"#a1a1aa",fontSize:13,fontWeight:600}}>Hostinger KVM</span>
            </div>
            <span style={{color:"#3f3f46",fontSize:16}}>→</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <img src="https://i.imgur.com/ucMrveh.png" alt="Coolify" style={{width:24,height:24,objectFit:"contain",borderRadius:4}}/>
              <span style={{color:"#a1a1aa",fontSize:13,fontWeight:600}}>Coolify</span>
            </div>
            <span style={{color:"#3f3f46",fontSize:16}}>→</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <img src="https://i.imgur.com/YPq9o8G.png" alt="OpenClaw" style={{width:24,height:24,objectFit:"contain",borderRadius:4,background:"#1a0000",borderRadius:6}}/>
              <span style={{color:"#a1a1aa",fontSize:13,fontWeight:600}}>OpenClaw</span>
            </div>
          </div>
          <img
            src="https://i.imgur.com/Qok8B8L.jpeg"
            alt="OpenClaw sécurisé — Firewall, SSH, Coolify"
            style={{width:"100%",borderRadius:16,border:"1px solid #1e2235",display:"block",margin:"24px 0 8px"}}
          />
          <p style={{...S.p,fontSize:13,color:"#52525b",fontStyle:"italic"}}>Tuto rédigé par Daemon IA — daemon-ia.fr · Version 3 · Mars 2026</p>
        </div>



        <h2 id="intro" style={S.h2}>0. Introduction</h2>
        <h3 style={S.h3}>Qu'est-ce qu'OpenClaw ?</h3>
        <p style={S.p}>OpenClaw est un logiciel open-source qui joue le rôle de <B c="chef d'orchestre"/> entre toi et les modèles d'IA (Claude, GPT, DeepSeek…). Il tourne sur un VPS et s'intègre à Telegram et d'autres messageries.</p>
        <Pre>{"OpenClaw  = le cerveau organisationnel\nClaude / GPT = le cerveau pensant"}</Pre>
        <div style={S.bq}><p style={{...S.p,margin:0}}>OpenClaw est conçu comme un <B c="assistant personnel à une seule frontière de confiance"/>. Ce n'est PAS un système multi-tenant. Un bot mal sécurisé ouvert à des inconnus = des inconnus avec accès à tes fichiers, ton shell, le navigateur de ton serveur.</p></div>

        <h3 style={S.h3}>Pourquoi la sécurité est non-négociable</h3>
        <div style={S.bqW}><p style={{...S.p,margin:0,fontStyle:"italic"}}>💬 "Il existe des dizaines de milliers d'instances OpenClaw accessibles sur internet. Un développeur compétent peut en prendre le contrôle en 2 à 3 minutes."</p></div>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Risque</th><th style={S.th}>Ce qui peut arriver</th></tr></thead>
            <tbody>{[
              ["🔑 Clés API exposées","Factures à plusieurs milliers d'euros"],
              ["📧 Accès emails","Lecture de tous tes emails, usurpation d'identité"],
              ["💰 Accès bancaire","Transactions frauduleuses"],
              ["📁 Google Drive","Accès à tous tes fichiers"],
              ["🖥️ Contrôle total","Impact sur toutes tes autres apps"],
              ["💉 Prompt injection","Un email malveillant manipule le bot à ton insu"],
            ].map(([r,d],i)=><tr key={i}><td style={S.td}><B c={r}/></td><td style={S.td}>{d}</td></tr>)}</tbody>
          </table>
        </div>

        <h3 style={S.h3}>Prérequis</h3>
        <ul style={S.ul}>{[
          "Un VPS Hostinger KVM (KVM2 minimum, KVM4 recommandé)",
          "Coolify installé sur le VPS",
          "Un nom de domaine pointé vers le VPS",
          "PowerShell (Windows) ou Terminal (Mac/Linux) sur ton PC",
          "Un compte LLM avec une clé API (Anthropic, OpenAI ou OpenRouter)",
          "Un bot Telegram créé via @BotFather",
        ].map((it,i)=><li key={i} style={S.li}>{it}</li>)}</ul>

        <h3 style={S.h3}>Architecture globale</h3>
        <ArchDiagram/>

        <h3 style={S.h3}>Les 6 couches de sécurité</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Couche</th><th style={S.th}>Outil</th><th style={S.th}>Protège</th></tr></thead>
            <tbody>{[
              ["1 — Compte Hostinger","2FA","Accès au panneau de gestion"],
              ["2 — Réseau","Firewall Hostinger","Filtre le trafic avant le VPS"],
              ["3 — SSH","Clé SSH + PasswordAuth no","Connexion admin au serveur"],
              ["4 — Utilisateurs","PermitRootLogin, AllowUsers","Droits sur le serveur"],
              ["5 — Secrets","Variables d'environnement Coolify","Clés API, tokens"],
              ["6 — OpenClaw","dmPolicy, groupPolicy, Gateway Token","Accès au bot"],
            ].map(([c,t,p],i)=><tr key={i}><td style={S.td}><B c={c}/></td><td style={S.td}><Cd c={t}/></td><td style={S.td}>{p}</td></tr>)}</tbody>
          </table>
        </div>

        <hr style={S.hr}/>

        <h2 id="avant" style={S.h2}>1. Avant de commencer</h2>
        <h3 style={S.h3}>1.1 — Créer un snapshot VPS</h3>
        <div style={S.bq}><p style={{...S.p,margin:0}}>📸 <B c="TOUJOURS faire un snapshot avant toute modification."/> En cas d'erreur, retour en arrière en 2 minutes.</p></div>
        <p style={S.p}>Hostinger : VPS → <B c="Sauvegardes et surveillance"/> → <B c="Snapshots"/> → Crée un snapshot.</p>
        <img src="https://i.imgur.com/qSw24Dd.jpeg" alt="Création d'un snapshot VPS dans Hostinger" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h3 style={S.h3}>1.2 — Activer le 2FA sur ton compte Hostinger</h3>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ Le terminal web Hostinger bypasse le firewall SSH. Si ton compte Hostinger est compromis, ton serveur est compromis. <B c="Le 2FA est donc obligatoire."/></p></div>
        <p style={S.p}>Hostinger → <B c="Paramètres du compte"/> → <B c="Sécurité"/> → <B c="Authentification à deux facteurs"/> → Activer.</p>

        <h3 style={S.h3}>1.3 — Récupérer les infos nécessaires</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Info</th><th style={S.th}>Où la trouver</th><th style={S.th}>Exemple</th></tr></thead>
            <tbody>{[
              ["IP du VPS","Hostinger → Aperçu","203.0.113.10"],
              ["Mot de passe root","Hostinger → Aperçu → Accès SSH","voir ci-dessous"],
              ["Domaine","Ton registrar DNS","openclaw.ton-domaine.com"],
              ["Ton IP fixe","Google « quelle est mon ip »","89.85.131.185"],
            ].map(([a,b,c],i)=><tr key={i}><td style={S.td}><B c={a}/></td><td style={S.td}>{b}</td><td style={S.td}><Cd c={c}/></td></tr>)}</tbody>
          </table>
        </div>
        <h4 style={S.h4}>Mot de passe root — deux cas</h4>
        <p style={S.p}><B c="Cas 1 — Mot de passe défini à la création"/> : visible dans Hostinger → Aperçu → Accès SSH. Utilise <Cd c="ssh root@[IP_VPS]"/> directement.</p>
        <p style={S.p}><B c="Cas 2 — Pas de mot de passe root"/> : utilise le terminal SSH Hostinger (terminal web intégré). Ou réinitialise : Hostinger → Aperçu → Accès SSH → <B c="Réinitialiser le mot de passe root"/>.</p>
        <img src="https://i.imgur.com/8ljAMI7.jpeg" alt="Accès SSH dans Hostinger" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <hr style={S.hr}/>

        <h2 id="ssh" style={S.h2}>2. Sécurisation SSH du VPS</h2>
        <p style={S.p}>Par défaut, le port SSH (22) est ouvert sur internet. Des bots scannent en permanence tous les serveurs. Ce qu'on va faire :</p>
        <ul style={S.ul}>{[
          "Créer un utilisateur dédié (pas root)",
          "Désactiver les connexions root directes",
          "Désactiver les mots de passe SSH — seule une clé SSH fonctionne",
          "Réautoriser root pour Coolify (qui en a besoin)",
        ].map((it,i)=><li key={i} style={S.li}>{it}</li>)}</ul>

        <h3 style={S.h3}>2.1 — Connexion initiale au VPS</h3>
        <h4 style={S.h4}>Option A — Terminal web Hostinger</h4>
        <p style={S.p}>Hostinger → ton VPS → <B c="Terminal"/>. Tu arrives directement en root.</p>
        <Pre>root@srv1349787:~#</Pre>
        <img src="https://i.imgur.com/L4TAykj.jpeg" alt="Terminal web Hostinger ouvert" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>
        <div style={S.bqI}><p style={{...S.p,margin:0}}>💡 Accessible depuis n'importe où. ⚠️ Passe par les serveurs Hostinger — si ton compte est compromis, l'accès est compromis.</p></div>

        <h4 style={S.h4}>Option B — PowerShell / Terminal local (recommandé)</h4>
        <Pre>ssh root@[IP_VPS]</Pre>
        <div style={S.bqI}><p style={{...S.p,margin:0}}>💡 Connexion directe PC → VPS. ⚠️ Fonctionne uniquement AVANT d'avoir désactivé les mots de passe SSH (étape 2.4).</p></div>

        <h3 style={S.h3}>2.2 — Création de l'utilisateur non-root</h3>
        <div style={S.bqI}><p style={{...S.p,margin:0}}>💡 Remplace <Cd c="[PRENOM]"/> par ton prénom dans toutes les commandes.</p></div>
        <Pre>adduser [PRENOM]</Pre>
        <p style={S.p}>Crée un mot de passe (rien ne s'affiche — c'est normal). Pour les infos optionnelles, Entrée pour passer. Tu dois voir :</p>
        <Pre>passwd: password updated successfully</Pre>
        <p style={S.p}>Ajoute au groupe sudo et vérifie :</p>
        <Pre>{"usermod -aG sudo [PRENOM]\nid [PRENOM]"}</Pre>
        <p style={S.p}>Tu dois voir : <Cd c="groups=1001([PRENOM]),27(sudo)"/></p>

        <h4 style={S.h4}>Commandes utiles</h4>
        <Pre>{"# Retrouver les utilisateurs existants\ncat /etc/passwd | grep /home\n\n# Basculer sur un utilisateur (depuis root)\nsu - [PRENOM]\n\n# Retour en root\nexit"}</Pre>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Erreur fréquente"/> — Si tu obtiens <Cd c="user does not exist"/>, relance <Cd c="adduser [PRENOM]"/> depuis le début.</p></div>

        <h3 style={S.h3}>2.3 — Configuration de la clé SSH</h3>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Étape critique."/> Configure la clé SSH AVANT de désactiver les mots de passe. Le terminal SSH Hostinger reste toujours accessible comme filet de sécurité.</p></div>
        <Pre>{"~/.ssh/id_ed25519      → clé PRIVÉE (reste sur ton ordi, ne se partage jamais)\n~/.ssh/id_ed25519.pub  → clé PUBLIQUE (à déposer sur le serveur)\n\nTON ORDI                            SERVEUR\n~/.ssh/id_ed25519 (privée)  ──►  ~/.ssh/authorized_keys (publique)\n      └── \"C'est bien moi ?\"  ──►  \"Oui, clés compatibles ✅\""}</Pre>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="PIÈGE COURANT"/> : génère la clé sur <B c="ton propre ordinateur"/> (Terminal Mac / PowerShell Windows), PAS dans le terminal Hostinger.</p></div>

        <h4 style={S.h4}>Étape 1 — Générer ta clé SSH (sur ton ordi)</h4>
        <div style={S.bqI}><p style={{...S.p,margin:0}}>🖥️ Terminal Mac ou PowerShell Windows — PAS le terminal Hostinger.</p></div>
        <Pre>{"# Vérifie si une clé existe déjà\nls ~/.ssh/\n\n# Si pas de id_ed25519, génère-la :\nssh-keygen -t ed25519 -C \"[PRENOM]\""}</Pre>
        <p style={S.p}>Appuie sur <B c="Entrée 3 fois"/> (chemin par défaut, pas de passphrase).</p>

        <h4 style={S.h4}>Étape 2 — Récupérer ta clé publique (sur ton ordi)</h4>
        <Pre>cat ~/.ssh/id_ed25519.pub</Pre>
        <p style={S.p}>Copie <B c="toute la ligne"/> — elle commence par <Cd c="ssh-ed25519 AAAA..."/> et se termine par ton prénom.</p>

        <h4 style={S.h4}>Étape 3 — Déposer la clé sur le serveur (terminal Hostinger)</h4>
        <div style={S.bqI}><p style={{...S.p,margin:0}}>🖥️ Ces commandes sont à taper dans le terminal SSH Hostinger (connecté en root).</p></div>
        <Pre>{"mkdir -p /home/[PRENOM]/.ssh\necho \"COLLE-TA-CLE-PUBLIQUE-ICI\" >> /home/[PRENOM]/.ssh/authorized_keys\nchmod 700 /home/[PRENOM]/.ssh\nchmod 600 /home/[PRENOM]/.ssh/authorized_keys\nchown -R [PRENOM]:[PRENOM] /home/[PRENOM]/.ssh\n\n# Vérifie :\ncat /home/[PRENOM]/.ssh/authorized_keys"}</Pre>

        <h4 style={S.h4}>Étape 4 — Tester la connexion SSH (sur ton ordi)</h4>
        <Pre>ssh [PRENOM]@[IP_VPS]</Pre>
        <p style={S.p}>Réponds <Cd c="yes"/> au fingerprint. Tu dois arriver sur <Cd c="[PRENOM]@srv...:~$"/>.</p>

        <div style={S.bq}><p style={{...S.p,margin:0}}>✅ <B c="Ne ferme pas cette fenêtre"/> — garde-la ouverte comme filet de sécurité pour la suite.</p></div>

        <h4 style={S.h4}>Connecter un autre ordinateur</h4>
        <p style={S.p}>Génère une nouvelle clé sur le nouvel ordi, puis ajoute-la avec <Cd c=">>"/> (sans écraser l'ancienne) :</p>
        {/* ✅ FIX 1 : >> escaped via template string */}
        <Pre>{"echo \"NOUVELLE-CLE-PUBLIQUE\" >> /home/[PRENOM]/.ssh/authorized_keys"}</Pre>

        <h4 style={S.h4}>⚠️ Erreurs fréquentes</h4>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Permission denied (publickey)"/> : clé générée sur le serveur au lieu de ton ordi, ou mauvaises permissions → <Cd c="chmod 700 .ssh && chmod 600 .ssh/authorized_keys"/>.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Le serveur demande un mot de passe"/> : la clé dans <Cd c="authorized_keys"/> ne correspond pas à celle de ton ordi local.</p></div>

        <h3 style={S.h3}>2.4 — Durcissement SSH</h3>
        <p style={S.p}><B c="Dans le terminal Hostinger (en root)"/>, exécute ces 3 commandes :</p>
        <Pre>{"sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config\nsed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config\necho \"AllowUsers [PRENOM]\" >> /etc/ssh/sshd_config"}</Pre>
        <p style={S.p}>Vérifie :</p>
        <Pre>{"grep -E \"PermitRootLogin|PasswordAuthentication|AllowUsers\" /etc/ssh/sshd_config\n\n# Tu dois voir :\n# PasswordAuthentication no\n# PermitRootLogin no\n# AllowUsers [PRENOM]"}</Pre>
        <Pre>systemctl restart ssh</Pre>

        <div style={S.stop}>
          <p style={{...S.p,margin:"0 0 8px",color:"#f87171",fontWeight:700}}>⛔ POINT DE NON-RETOUR</p>
          <ul style={{...S.ul,margin:0}}>
            <li style={{...S.li,color:"#fca5a5"}}>Tu ne peux plus te connecter avec <Cd c="ssh root@[IP_VPS]"/></li>
            <li style={{...S.li,color:"#fca5a5"}}>Tu ne peux plus utiliser un mot de passe pour SSH</li>
            <li style={{...S.li,color:"#fca5a5"}}>La seule façon : <Cd c="ssh [PRENOM]@[IP_VPS]"/> avec ta clé SSH</li>
          </ul>
          <p style={{...S.p,margin:"8px 0 0",color:"#34d399"}}>✅ Le terminal web Hostinger reste <B c="toujours accessible"/> comme solution de secours.</p>
        </div>

        <h3 style={S.h3}>2.5 — Réautorisation root pour Coolify</h3>
        <div style={S.bqY}><p style={{...S.p,margin:0}}>⚠️ Coolify se connecte en interne via SSH en tant que <B c="root"/> pour gérer Docker. Si on bloque root, Coolify affiche "Server is unreachable".</p></div>
        <Pre>{"# Depuis PowerShell, connecté avec ton utilisateur :\nssh [PRENOM]@[IP_VPS]\n\nsudo sed -i 's/PermitRootLogin no/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config\nsudo sed -i 's/AllowUsers [PRENOM]/AllowUsers [PRENOM] root/' /etc/ssh/sshd_config\nsudo systemctl restart ssh"}</Pre>
        <p style={S.p}>Vérifie dans Coolify → <B c="Servers"/> → <B c="Validate"/> que le serveur repasse en vert.</p>
        <img src="https://i.imgur.com/sB0fLhT.jpeg" alt="Coolify Servers → Validate → statut vert" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h3 style={S.h3}>2.6 — Résumé</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Avant</th><th style={S.th}>Après</th></tr></thead>
            <tbody>{[
              ["Root accessible par mot de passe","Root accessible uniquement par clé SSH (Coolify)"],
              ["N'importe qui peut tenter un mot de passe","Mots de passe SSH complètement désactivés"],
              ["Tous les utilisateurs système peuvent se connecter","Seuls [PRENOM] (ta clé) et root (clé Coolify)"],
              ["Bots peuvent brute-forcer le port 22","Sans clé physique = connexion refusée immédiatement"],
            ].map(([a,b],i)=><tr key={i}><td style={{...S.td,color:"#f87171"}}>{a}</td><td style={{...S.td,color:"#34d399"}}>{b}</td></tr>)}</tbody>
          </table>
        </div>

        <hr style={S.hr}/>

        <h2 id="firewall" style={S.h2}>3. Firewall Hostinger</h2>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Sans firewall</th><th style={S.th}>Avec firewall</th></tr></thead>
            <tbody>{[
              ["Tous les ports accessibles","Seuls 22, 80, 443 ouverts"],
              ["Des bots scannent tous tes ports","Port 22 invisible pour le reste du monde"],
              ["Attaques sur n'importe quel port","Tout le reste bloqué avant d'atteindre le VPS"],
            ].map(([a,b],i)=><tr key={i}><td style={{...S.td,color:"#f87171"}}>{a}</td><td style={{...S.td,color:"#34d399"}}>{b}</td></tr>)}</tbody>
          </table>
        </div>

        <h3 style={S.h3}>3.1 — Création du firewall</h3>
        <p style={S.p}>Hostinger → <B c="Sécurité"/> → <B c="Pare-feu"/> → <B c="+ Ajouter un pare-feu"/>. Donne-lui un nom (ex: <Cd c="mon-vps"/>).</p>
        <img src="https://i.imgur.com/vY6ehrN.jpeg" alt="Création du pare-feu dans Hostinger" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h3 style={S.h3}>3.2 — Configuration des règles</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Action</th><th style={S.th}>Protocole</th><th style={S.th}>Port (ou plage)</th><th style={S.th}>Source</th><th style={S.th}>Détail de la source</th></tr></thead>
            <tbody>{[
              ["accept","TCP","22","any","any"],
              ["accept","HTTP","80","any","any"],
              ["accept","HTTPS","443","any","any"],
              ["drop","any","any","any","any"],
            ].map(([a,p,po,s,d],i)=><tr key={i}><td style={{...S.td,color:a==="drop"?"#f87171":"#34d399",fontWeight:600}}>{a}</td><td style={S.td}>{p}</td><td style={S.td}><Cd c={po}/></td><td style={S.td}>{s}</td><td style={S.td}>{d}</td></tr>)}</tbody>
          </table>
        </div>
        <img src="https://i.imgur.com/0OpKFeZ.jpeg" alt="Les 4 règles configurées dans le pare-feu Hostinger" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h3 style={S.h3}>3.3 — IP fixe vs Anywhere pour le port 22</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div style={S.card}>
            <p style={{...S.p,margin:"0 0 8px",color:"#34d399",fontWeight:700}}>IP fixe (plus strict)</p>
            <p style={{...S.p,margin:"0 0 6px",fontSize:13}}>✅ Port 22 invisible pour tout internet sauf toi.</p>
            <p style={{...S.p,margin:0,fontSize:13,color:"#f87171"}}>⚠️ Si tu changes de connexion (café, déplacement), plus d'accès SSH depuis PowerShell. Solution : terminal web Hostinger.</p>
          </div>
          <div style={S.card}>
            <p style={{...S.p,margin:"0 0 8px",color:"#a5b4fc",fontWeight:700}}>Anywhere (plus souple)</p>
            <p style={{...S.p,margin:"0 0 6px",fontSize:13}}>✅ Toujours sécurisé — sans ta clé physique = accès refusé.</p>
            <p style={{...S.p,margin:0,fontSize:13,color:"#34d399"}}>💡 Recommandé si tu travailles depuis différents endroits.</p>
          </div>
        </div>

        <h3 style={S.h3}>3.4 — Activation</h3>
        <p style={S.p}>Page principale Pare-feu → active le <B c="toggle"/> à côté de ton pare-feu.</p>
        <img src="https://i.imgur.com/uO7IKrg.jpeg" alt="Toggle du pare-feu activé dans Hostinger" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <hr style={S.hr}/>

        <h2 id="deploy" style={S.h2}>4. Déploiement OpenClaw dans Coolify</h2>

        <h3 style={S.h3}>4.1 — Créer le service OpenClaw</h3>
        <p style={S.p}>Coolify → ton projet → <B c="+ New"/> → <B c="Service"/> → cherche <B c="OpenClaw"/> → déploie.</p>
        <img src="https://i.imgur.com/hLQGNG4.jpeg" alt="Ajout du service OpenClaw dans Coolify" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h3 style={S.h3}>4.2 — Configurer le domaine HTTPS</h3>
        <p style={S.p}>Paramètres du service → <B c="Domains"/> → ajoute <Cd c="https://openclaw.ton-domaine.com"/>. Coolify via Caddy génère automatiquement un certificat SSL.</p>

        <h3 style={S.h3}>4.3 — Variables d'environnement</h3>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Règle absolue : aucune clé API ne doit jamais transiter par une conversation, un email, ou être saisie dans l'interface OpenClaw."/> Tout doit être dans les variables d'environnement Coolify.</p></div>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Variable</th><th style={S.th}>Description</th></tr></thead>
            <tbody>{[
              ["ANTHROPIC_API_KEY","Clé API Anthropic (sk-ant-xxxxxxxx)"],
              ["OPENAI_API_KEY","Clé API OpenAI (sk-xxxxxxxx)"],
              ["OPENROUTER_API_KEY","Clé API OpenRouter (sk-or-xxxxxxxx)"],
              ["TELEGRAM_BOT_TOKEN","Token du bot Telegram (123456789:ABCDEFxxxxxxxx)"],
              ["OPENCLAW_GATEWAY_TOKEN","Token d'accès à l'interface (32+ caractères aléatoires)"],
            ].map(([v,d],i)=><tr key={i}><td style={S.td}><Cd c={v}/></td><td style={S.td}>{d}</td></tr>)}</tbody>
          </table>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Méthode</th><th style={S.th}>Sécurité</th><th style={S.th}>Verdict</th></tr></thead>
            <tbody>{[
              ["Env vars Coolify","✅ Élevée","À utiliser"],
              ["Fichier .env (chmod 600)","⚠️ Moyenne","Acceptable"],
              ["openclaw.json en clair","❌ Faible","À éviter"],
              ["Dans un chat ou email","🚨 Dangereux","Jamais"],
            ].map(([m,s,v],i)=><tr key={i}><td style={S.td}>{m}</td><td style={S.td}>{s}</td><td style={S.td}><B c={v}/></td></tr>)}</tbody>
          </table>
        </div>
        <img src="https://i.imgur.com/TdPbmNm.jpeg" alt="Variables d'environnement dans Coolify" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h3 style={S.h3}>4.4 — Démarrage et vérification</h3>
        <p style={S.p}>Clique sur <B c="Deploy"/> puis surveille l'onglet <B c="Logs"/>. Le conteneur est prêt quand le statut passe en <B c="Running (healthy)"/>.</p>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Container Degraded (unhealthy)"/> : log <Cd c="API key env var is required"/> → ajoute <Cd c="ANTHROPIC_API_KEY"/> dans env vars → Save → Restart.</p></div>

        <hr style={S.hr}/>

        <h2 id="connexion" style={S.h2}>5. Première connexion à l'interface OpenClaw</h2>
        <h3 style={S.h3}>5.1 — Accès via URL</h3>
        <Pre>https://openclaw.ton-domaine.com</Pre>
        <h3 style={S.h3}>5.2 — Connexion avec le Gateway Token</h3>
        <p style={S.p}><B c="Control → Overview"/> → champ <B c="Gateway Token"/> → colle la valeur de ton <Cd c="OPENCLAW_GATEWAY_TOKEN"/> → <B c="Connect"/>.</p>
        <img src="https://i.imgur.com/XexaOai.jpeg" alt="Overview OpenClaw avec le champ Gateway Token" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>
        <h3 style={S.h3}>5.3 — Vérification Health OK</h3>
        <p style={S.p}>Le statut doit passer de <B c="Health Offline"/> à <B c="Health OK"/> et afficher <B c="Connected"/>.</p>
        <img src="https://i.imgur.com/Q9uykff.jpeg" alt="Health OK dans OpenClaw avec Connected" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <hr style={S.hr}/>

        <h2 id="telegram" style={S.h2}>6. Configuration Telegram</h2>
        <p style={S.p}>Telegram est la <B c="porte d'entrée principale"/> de ton bot OpenClaw. C'est par là que tu lui envoies des instructions, que tu déclenches des actions et que tu reçois ses réponses. C'est donc aussi le vecteur d'attaque le plus direct.</p>
        <p style={S.p}>Ce qu'on sécurise ici :</p>
        <ul style={S.ul}>
          <li style={S.li}><B c="Le token du bot"/> — s'il est exposé, n'importe qui peut envoyer des commandes à ta place et déclencher des actions réelles sur ton serveur</li>
          <li style={S.li}><B c="L'accès aux DMs"/> — sans restriction, n'importe quel utilisateur Telegram peut écrire à ton bot et l'utiliser comme s'il était le sien</li>
          <li style={S.li}><B c="L'accès aux groupes"/> — un attaquant peut ajouter ton bot dans un groupe piégé et lui envoyer des injections de prompt pour manipuler ses actions</li>
        </ul>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ Un bot Telegram mal configuré avec des outils activés (fichiers, shell, navigateur) est une <B c="faille critique"/>. L'objectif de cette section est de s'assurer que seul toi peux lui parler.</p></div>
        <h3 style={S.h3}>6.1 — Créer le bot via @BotFather</h3>
        <p style={S.p}>Dans Telegram, recherche <B c="@BotFather"/> (badge ✅ officiel). Envoie <Cd c="/newbot"/> et suis les instructions. Tu reçois un token :</p>
        <Pre>123456789:ABCDEFGHIJKLMNOPxxxxxxxxxxxxxxxx</Pre>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ Ce token = mot de passe de ton bot. <B c="Efface le message BotFather immédiatement"/> après avoir copié le token.</p></div>

        <h3 style={S.h3}>6.2 — Stocker le token dans Coolify uniquement</h3>
        <Pre>TELEGRAM_BOT_TOKEN=123456789:ABCDEFxxxxxxxx</Pre>
        <p style={S.p}>Coolify → service OpenClaw → <B c="Environment Variables"/> → Save → Restart.</p>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Ne jamais saisir ce token dans l'interface OpenClaw."/> Il serait stocké dans le JSON et prendrait la priorité sur la variable d'environnement.</p></div>

        <h3 style={S.h3}>6.3 — Vérifier que le token vient bien des env vars</h3>
        <Pre>{"# Dans le terminal Coolify (service OpenClaw → Terminal) :\ncat /data/.openclaw/openclaw.json | grep botToken\n\n# Si une valeur s'affiche, supprime-la :\nsed -i '/\"botToken\"/d' /data/.openclaw/openclaw.json"}</Pre>
        <p style={S.p}>Puis restart dans Coolify.</p>

        <h3 style={S.h3}>6.4 — Récupérer ton Telegram user ID</h3>
        <p style={S.p}>Dans Telegram, envoie <Cd c="/start"/> au bot <B c="@userinfobot"/>. Il retourne ton ID numérique (ex: <Cd c="6125640105"/>).</p>

        <h3 style={S.h3}>6.5 — Configurer dmPolicy et allowFrom</h3>
        <p style={S.p}>OpenClaw → <B c="Settings → Config → Raw mode"/> :</p>
        <Pre>{'{\n  "channels": {\n    "telegram": {\n      "enabled": true,\n      "dmPolicy": "allowlist",\n      "allowFrom": [987654321],\n      "groupPolicy": "allowlist",\n      "streamMode": "partial",\n      "actions": {\n        "sendMessage": true,\n        "deleteMessage": true\n      }\n    }\n  }\n}'}</Pre>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ L'ID doit être un <B c="nombre entier"/> (sans guillemets). <Cd c="[987654321]"/> ✅ — <Cd c='["987654321"]'/> ❌</p></div>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Paramètre</th><th style={S.th}>Valeur</th><th style={S.th}>Effet</th></tr></thead>
            <tbody>{[
              ["dmPolicy","allowlist","Seuls les IDs dans allowFrom peuvent écrire au bot en privé"],
              ["allowFrom","[987654321]","Liste des Telegram user IDs autorisés"],
              ["groupPolicy","allowlist","Le bot ne répond pas dans des groupes non autorisés"],
            ].map(([p,v,e],i)=><tr key={i}><td style={S.td}><Cd c={p}/></td><td style={S.td}><Cd c={v}/></td><td style={S.td}>{e}</td></tr>)}</tbody>
          </table>
        </div>

        <h3 style={S.h3}>6.6 — Test de connexion Telegram</h3>
        <p style={S.p}>Ouvre Telegram et recherche ton bot par son username. Avant d'envoyer un message, tu dois d'abord cliquer sur le bouton <B c="Start"/> pour initier la conversation.</p>
        <img src="https://i.imgur.com/wsQMrGY.jpeg" alt="Bouton Start du bot Telegram" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>
        <p style={S.p}>Envoie ensuite un message comme <Cd c="Salut !"/> — le bot doit te répondre dans les secondes qui suivent.</p>
        <img src="https://i.imgur.com/UUBHSh3.jpeg" alt="Conversation Telegram avec le bot qui répond" style={{width:"100%",borderRadius:12,border:"1px solid #1e2235",display:"block",margin:"16px 0"}}/>

        <h4 style={S.h4}>⚠️ Erreurs fréquentes — Bot muet</h4>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 1"/> — <Cd c="dmPolicy: pairing"/> avec <Cd c="allowFrom"/> configuré : incompatibles. Passe sur <Cd c="allowlist"/>.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 2"/> — ID avec guillemets dans <Cd c="allowFrom"/> : utilise un nombre entier, pas une string.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 3"/> — Token révoqué ou exposé : @BotFather → <Cd c="/revoke"/> → nouveau token → Coolify env vars → supprime l'ancien du JSON → Restart.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 4"/> — Token encore dans le JSON : <Cd c="grep botToken openclaw.json"/> → si trouvé → <Cd c="sed -i"/> → Restart.</p></div>

        <hr style={S.hr}/>

        <h2 id="checklist" style={S.h2}>8. Checklist finale</h2>
        <h3 style={S.h3}>Sécurité VPS</h3>
        <ul style={{listStyle:"none",padding:0}}>{[
          "Snapshot VPS créé avant toute modification",
          "2FA activé sur le compte Hostinger",
          "Utilisateur non-root créé (adduser [PRENOM])",
          "Utilisateur ajouté à sudo (usermod -aG sudo [PRENOM])",
          "Clé SSH configurée dans /home/[PRENOM]/.ssh/authorized_keys",
          "PermitRootLogin prohibit-password configuré",
          "PasswordAuthentication no configuré",
          "AllowUsers [PRENOM] root configuré",
          "SSH redémarré sans erreur",
          "Connexion SSH testée depuis PowerShell ✅",
          "Coolify validé (Servers → Validate) ✅",
        ].map((it,i)=><ChkItem key={i} label={it}/>)}</ul>
        <h3 style={S.h3}>Firewall Hostinger</h3>
        <ul style={{listStyle:"none",padding:0}}>{[
          "Pare-feu créé",
          "Port 22 → ton IP (ou Anywhere si itinérant)",
          "Port 80 → Anywhere",
          "Port 443 → Anywhere",
          "Drop → tout le reste",
          "Firewall activé",
        ].map((it,i)=><ChkItem key={i} label={it}/>)}</ul>
        <h3 style={S.h3}>OpenClaw & Coolify</h3>
        <ul style={{listStyle:"none",padding:0}}>{[
          "Conteneur Running (healthy)",
          "ANTHROPIC_API_KEY dans les env vars Coolify",
          "TELEGRAM_BOT_TOKEN dans les env vars Coolify",
          "OPENCLAW_GATEWAY_TOKEN dans les env vars Coolify",
          "Aucun token dans le fichier JSON : grep botToken → vide ✅",
          "Gateway Token configuré dans l'interface OpenClaw",
          "Interface accessible via HTTPS ✅",
        ].map((it,i)=><ChkItem key={i} label={it}/>)}</ul>
        <h3 style={S.h3}>Telegram</h3>
        <ul style={{listStyle:"none",padding:0}}>{[
          "Bot créé via @BotFather",
          "Token dans env vars Coolify uniquement",
          "Message BotFather effacé",
          "dmPolicy: allowlist configuré",
          "Ton Telegram user ID dans allowFrom (nombre, pas string)",
          "groupPolicy: allowlist configuré",
          "Test de message Telegram réussi ✅",
        ].map((it,i)=><ChkItem key={i} label={it}/>)}</ul>
        <h3 style={S.h3}>Audit OpenClaw</h3>
        <ul style={{listStyle:"none",padding:0}}>{[
          "chmod 700 /data/.openclaw/credentials",
          "groupPolicy: allowlist",
          'trustedProxies: ["127.0.0.1"]',
          "Audit relancé → findings réduits au minimum ✅",
        ].map((it,i)=><ChkItem key={i} label={it}/>)}</ul>

        <hr style={S.hr}/>

        <h2 id="depannage" style={S.h2}>9. En cas de problème</h2>

        <h3 style={S.h3}>Je n'arrive plus à me connecter en SSH</h3>
        <div style={S.bq}><p style={{...S.p,margin:0}}>✅ <B c="Solution immédiate"/> : terminal web Hostinger (toujours accessible, bypasse le firewall).</p></div>
        <Pre>{"grep -E \"PermitRootLogin|PasswordAuthentication|AllowUsers\" /etc/ssh/sshd_config"}</Pre>
        <p style={S.p}>Si le firewall bloque ton IP : ajoute temporairement ta nouvelle IP dans Hostinger → Pare-feu.</p>

        <h3 style={S.h3}>Coolify dit "Server is unreachable"</h3>
        <p style={S.p}><B c="Cause :"/> Root bloqué avec <Cd c="PermitRootLogin no"/> ou absent de <Cd c="AllowUsers"/>.</p>
        <Pre>{"sudo sed -i 's/PermitRootLogin no/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config\nsudo sed -i 's/AllowUsers [PRENOM]/AllowUsers [PRENOM] root/' /etc/ssh/sshd_config\nsudo systemctl restart ssh"}</Pre>
        <p style={S.p}>Puis Coolify → Servers → Validate.</p>

        <h3 style={S.h3}>OpenClaw container unhealthy</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Message dans les logs</th><th style={S.th}>Cause</th><th style={S.th}>Solution</th></tr></thead>
            <tbody>{[
              ["API key env var is required","Clé IA manquante","Ajoute ANTHROPIC_API_KEY dans env vars"],
              ["invalid config","JSON malformé","Vérifie le Raw mode JSON"],
              ["Aucun log","Problème Docker","Restart + vérifie les ressources VPS"],
            ].map(([m,c,s],i)=><tr key={i}><td style={S.td}><Cd c={m}/></td><td style={S.td}>{c}</td><td style={S.td}>{s}</td></tr>)}</tbody>
          </table>
        </div>

        <h3 style={S.h3}>Telegram ne répond pas</h3>
        <p style={S.p}>OpenClaw → Settings → Logs. Envoie un message et regarde si une ligne apparaît.</p>
        <p style={S.p}><B c="Si aucune ligne :"/></p>
        <ul style={S.ul}>
          <li style={S.li}>Token valide ? Ouvre : <Cd c="https://api.telegram.org/bot[TOKEN]/getMe"/></li>
          <li style={S.li}>Token dans le JSON ? <Cd c="grep botToken openclaw.json"/> → si oui → <Cd c="sed -i"/> → Restart</li>
          <li style={S.li}>L'ID dans <Cd c="allowFrom"/> est-il un nombre entier (pas une string) ?</li>
          <li style={S.li}><Cd c="dmPolicy"/> est-il sur <Cd c="allowlist"/> ?</li>
        </ul>

        <h3 style={S.h3}>Gateway Token perdu</h3>
        <p style={S.p}>Change <Cd c="OPENCLAW_GATEWAY_TOKEN"/> dans Coolify → Save → Restart → reconnecte-toi avec le nouveau token.</p>

        <hr style={S.hr}/>

        <h2 id="pratiques" style={S.h2}>10. Bonnes pratiques</h2>
        <h3 style={S.h3}>Règle du compte dédié</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Service</th><th style={S.th}>Bonne pratique</th></tr></thead>
            <tbody>{[
              ["Gmail","Créer un Gmail séparé uniquement pour le bot"],
              ["Google Drive","Drive séparé, partager seulement les dossiers nécessaires"],
              ["GitHub","Token avec permissions minimales"],
              ["Navigateur","Ne jamais donner accès au navigateur principal"],
            ].map(([s,p],i)=><tr key={i}><td style={S.td}><B c={s}/></td><td style={S.td}>{p}</td></tr>)}</tbody>
          </table>
        </div>

        <h3 style={S.h3}>Limite de dépenses API</h3>
        <p style={S.p}>Console Anthropic → configure une <B c="limite mensuelle"/> et des <B c="alertes email"/> à 25%/50%/75%.</p>

        <h3 style={S.h3}>Ordre d'installation recommandé</h3>
        <ol style={{...S.ul,paddingLeft:28}}>{[
          "Snapshot VPS","2FA Hostinger","Créer utilisateur + configurer SSH",
          "Firewall Hostinger","Ajouter les env vars dans Coolify (AVANT le démarrage d'OpenClaw)",
          "Démarrer le conteneur OpenClaw","Connecter l'interface web",
          "Configurer Telegram (via env vars uniquement)","Audit de sécurité","Test final",
        ].map((it,i)=><li key={i} style={{...S.li,margin:"8px 0"}}>{it}</li>)}</ol>

        <h3 style={S.h3}>Signaux d'alerte à surveiller</h3>
        <ul style={S.ul}>{[
          "Le bot répond à des inconnus",
          "Des dépenses API inhabituelles apparaissent",
          "Le bot exécute des actions non demandées",
        ].map((it,i)=><li key={i} style={{...S.li,color:"#fca5a5"}}>⚠️ {it}</li>)}</ul>

        <hr style={S.hr}/>
        <div style={S.bq}><p style={{...S.p,margin:0}}>🎯 <B c="Top 1% des installations les plus sécurisées."/> Trois principes : <B c="contrôle ce qui entre, contrôle ce qui sort, isole tout ce qui peut l'être."/></p></div>

      </article>

      <Toc items={TOC} activeId={activeId} onTocClick={onTocClick}/>
    </div>
  );
}

function OfferPage() {
  return (
    <div style={{maxWidth:860,margin:"0 auto",display:"flex",flexDirection:"column",gap:"5rem",paddingBottom:"6rem",paddingTop:"1rem"}}>
      <section style={{textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"4px 14px",borderRadius:9999,background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",color:"#a5b4fc",fontSize:12,fontFamily:"monospace",marginBottom:28}}>🤖 Service OpenClaw + API LinkedIn</div>
        <h1 style={S.h1}>OpenClaw prospecte.<br/><span style={S.gradI}>Toi tu closes.</span></h1>
        <img
          src="https://i.imgur.com/8N1YTcZ.png"
          alt="Agent LinkedIn IA — avale la pilule"
          style={{width:"100%",maxWidth:900,borderRadius:20,border:"1px solid #1e2235",display:"block",margin:"28px auto 32px"}}
        />
        <p style={{fontSize:22,color:"#e4e4e7",lineHeight:1.7,marginBottom:36,fontWeight:500,maxWidth:620,margin:"0 auto 36px"}}><B c="Setup clé en main. 100% sécurisé. Zéro technique."/><br/><span style={{color:"#a1a1aa",fontSize:18}}>Tu te concentres sur les conversations. L'agent gère tout le reste.</span></p>
        <a href="https://wa.me/33628500314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20ton%20agent%20LinkedIn%20OpenClaw%20!" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"14px 32px",borderRadius:12,background:"#f4f4f5",color:"#09090b",fontWeight:"bold",fontSize:16,textDecoration:"none"}}>Je veux mon agent LinkedIn →</a>
        <div style={{marginTop:12,fontSize:12,color:"#52525b",fontFamily:"monospace"}}>Places limitées — Setup en 48h</div>
      </section>

      <section style={{textAlign:"center"}}>
        <h2 style={{...S.h2,marginTop:0,marginBottom:8}}>Finis les abonnements à rallonge</h2>
        <p style={{...S.p,fontSize:16,marginBottom:28}}>Mon agent remplace une dizaine d'outils payants. <B c="Une seule solution, tout-en-un."/></p>
        <img
          src="https://i.imgur.com/A8sN3fD.jpeg"
          alt="Outils remplacés par l'agent LinkedIn : Lemlist, Unipile, n8n..."
          style={{width:"100%",maxWidth:900,borderRadius:16,border:"1px solid #1e2235",display:"block",margin:"0 auto"}}
        />
        <p style={{...S.p,fontSize:13,color:"#52525b",marginTop:12,fontStyle:"italic"}}>Lemlist, Unipile, n8n, et bien d'autres — remplacés par ton agent.</p>
      </section>

      <section>
        <h2 style={{...S.h2,marginTop:0,marginBottom:24}}>Tu reconnais ça ?</h2>
        <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:24}}>
          {["Tu passes des heures à envoyer des demandes de connexion à la main","Tu contactes des gens à froid — ignoré 80% du temps","L'automatisation IA te semble trop technique","Tu as essayé des outils LinkedIn coûteux sans résultats"].map((it,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,padding:"14px 18px",borderRadius:12,background:"rgba(239,68,68,0.05)",border:"1px solid rgba(239,68,68,0.1)"}}>
              <span style={{color:"#ef4444",flexShrink:0}}>✗</span>
              <span style={{color:"#d4d4d8",lineHeight:1.6}}>{it}</span>
            </div>
          ))}
        </div>
        <div style={S.bqW}><p style={{...S.p,margin:0,fontSize:16}}><B c="La vraie raison :"/> Tu contactes les mauvaises personnes, au mauvais moment, sans contexte partagé.</p></div>
      </section>

      <section>
        <h2 style={{...S.h2,marginTop:0,marginBottom:28,textAlign:"center"}}>Cold vs Warm outreach</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20}}>
          <div style={{...S.card,opacity:0.65}}>
            <h3 style={{...S.h3,marginTop:0,color:"#71717a"}}>✗ Cold Outreach</h3>
            {[["Taux d'acceptation","10–20%","#f87171"],["Résultat","Ignoré dans 80% des cas","#a1a1aa"],["Exécution","Manuel, chronophage","#a1a1aa"]].map(([l,v,c],i)=>(
              <div key={i} style={{paddingBottom:10,marginBottom:10,borderBottom:"1px solid #1e2235"}}>
                <div style={{fontSize:11,textTransform:"uppercase",color:"#3f4263",marginBottom:3}}>{l}</div>
                <div style={{color:c,fontWeight:i===0?"bold":"normal"}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{padding:28,borderRadius:16,background:"linear-gradient(180deg,rgba(99,102,241,0.08),#0f1120)",border:"1px solid rgba(99,102,241,0.25)"}}>
            <h3 style={{...S.h3,marginTop:0,color:"#a5b4fc"}}>✓ Warm Signal Outreach</h3>
            {[["Taux d'acceptation","60–70%","#34d399"],["Résultat","Capte l'attention au bon moment","#e4e4e7"],["Exécution","100% automatisé","#a5b4fc"]].map(([l,v,c],i)=>(
              <div key={i} style={{paddingBottom:10,marginBottom:10,borderBottom:"1px solid rgba(99,102,241,0.08)"}}>
                <div style={{fontSize:11,textTransform:"uppercase",color:"rgba(165,180,252,0.5)",marginBottom:3}}>{l}</div>
                <div style={{color:c,fontWeight:"bold",fontSize:i===0?22:15}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 style={{...S.h2,marginTop:0,marginBottom:12,textAlign:"center"}}>Ce que tu reçois</h2>
        <div style={{display:"flex",flexDirection:"column",gap:18}}>
          {[
            {icon:"🔒",color:"#34d399",title:"1. OpenClaw installé et sécurisé sur ton VPS",desc:"Ton agent tourne 24h/24 sur ton propre serveur, pas sur un SaaS partagé.",items:["Installation VPS Hostinger + Coolify","Sécurisation complète (firewall, SSH, env vars)","Clés API protégées, jamais exposées","Redémarrages automatiques"],quote:"Pendant que d'autres utilisent des outils SaaS qui peuvent fermer du jour au lendemain, toi tu possèdes ton infrastructure."},
          ].map((p,i)=>(
            <div key={i} style={{...S.card,display:"flex",gap:22,flexWrap:"wrap"}}>
              <div style={{fontSize:28,flexShrink:0,marginTop:4}}>{p.icon}</div>
              <div style={{flex:1,minWidth:200}}>
                <h3 style={{...S.h3,marginTop:0,color:p.color}}>{p.title}</h3>
                <p style={{...S.p,marginTop:0}}>{p.desc}</p>
                <ul style={S.ul}>{p.items.map((it,j)=><li key={j} style={{...S.li,color:"#d4d4d8"}}>✓ {it}</li>)}</ul>
                {p.quote&&<div style={S.bq}><p style={{...S.p,margin:0,fontStyle:"italic",fontSize:14}}>{p.quote}</p></div>}
              </div>
            </div>
          ))}

          {/* Section 2 — Agent LinkedIn détaillé */}
          <div style={{...S.card}}>
            <div style={{display:"flex",gap:22,flexWrap:"wrap",marginBottom:20}}>
              <div style={{fontSize:28,flexShrink:0,marginTop:4}}>🤖</div>
              <div style={{flex:1,minWidth:200}}>
                <h3 style={{...S.h3,marginTop:0,color:"#818cf8"}}>2. Ton agent LinkedIn opérationnel</h3>
                <p style={{...S.p,marginTop:0}}>API spécialisée LinkedIn — 8 modules de scraping et de recherche, utilisée par 500+ professionnels.</p>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:10}}>
              {[
                {icon:"🔍",name:"Search Scraper",desc:"Recherche de posts par mot-clé ou URL, filtres par date et type de média, export CSV"},
                {icon:"👤",name:"People Search",desc:"Recherche de profils par nom, titre, entreprise, localisation"},
                {icon:"🏢",name:"Companies Search",desc:"Recherche d'entreprises par industrie, taille, localisation"},
                {icon:"💼",name:"Jobs Search",desc:"Recherche d'offres d'emploi par titre, lieu, type de contrat"},
                {icon:"🔗",name:"URL Search",desc:"Coller une URL de recherche LinkedIn et export automatique"},
                {icon:"❤️",name:"Likes Scraper",desc:"Extraire tous les profils ayant liké un post"},
                {icon:"💬",name:"Comments Scraper",desc:"Capturer tous les commentateurs avec données de profil complètes"},
                {icon:"📄",name:"Posts Scraper",desc:"Scraper les posts d'un profil ou d'une page entreprise"},
              ].map((f,i)=>(
                <div key={i} style={{padding:"12px 16px",borderRadius:10,background:"rgba(129,140,248,0.05)",border:"1px solid rgba(129,140,248,0.15)",display:"flex",gap:12,alignItems:"flex-start"}}>
                  <span style={{fontSize:18,flexShrink:0}}>{f.icon}</span>
                  <div>
                    <div style={{color:"#a5b4fc",fontWeight:700,fontSize:13,marginBottom:3}}>{f.name}</div>
                    <div style={{color:"#71717a",fontSize:12,lineHeight:1.5}}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      <section style={{padding:48,borderRadius:24,background:"linear-gradient(135deg,rgba(99,102,241,0.08),rgba(16,185,129,0.08))",textAlign:"center"}}>
        <h2 style={{...S.h2,marginTop:0,marginBottom:16}}>Ce que ça change concrètement</h2>
        <div style={{fontSize:"clamp(3rem,8vw,5rem)",fontWeight:800,...S.grad,marginBottom:12}}>60–70%</div>
        <p style={{color:"#d4d4d8",fontSize:16,marginBottom:40}}>de taux d'acceptation vs 10–20% en cold outreach classique.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16}}>
          {[["Volume qualifié","Sur 100 demandes → 60-70 connexions engagées."],["Timing parfait","Message au bon moment, après engagement."],["Contexte partagé","Un prétexte naturel pour démarrer la conversation."]].map(([t,d],i)=>(
            <div key={i} style={{padding:18,borderRadius:12,background:"rgba(9,9,11,0.5)",border:"1px solid rgba(39,39,42,0.5)",textAlign:"left"}}>
              <div style={{color:"#34d399",fontWeight:"bold",marginBottom:6,fontSize:14}}>{t}</div>
              <p style={{fontSize:13,color:"#a1a1aa",lineHeight:1.6,margin:0}}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{textAlign:"center"}}>
        <h2 style={{...S.h2,marginTop:0,marginBottom:36}}>Investissement</h2>
        <div style={{maxWidth:460,margin:"0 auto",position:"relative",paddingTop:20}}>
          <div style={{position:"absolute",top:0,left:"50%",transform:"translate(-50%,-50%)",padding:"6px 16px",background:"#10b981",color:"#09090b",fontSize:11,fontWeight:"bold",textTransform:"uppercase",borderRadius:9999,whiteSpace:"nowrap",zIndex:10}}>⚡ Offre de lancement — 48h</div>
          <div style={{padding:40,borderRadius:24,background:"#0f1120",border:"1px solid rgba(16,185,129,0.3)",boxShadow:"0 0 40px rgba(16,185,129,0.06)"}}>
            <h3 style={{...S.h3,marginTop:8,marginBottom:8,fontSize:20,textAlign:"center"}}>Setup Complet Clé en Main</h3>
            <div style={{textAlign:"center",marginBottom:32,display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
              <span style={{fontSize:22,fontWeight:"bold",color:"#52525b",textDecoration:"line-through"}}>590€</span>
              <span style={{fontSize:48,fontWeight:800,color:"#fff"}}>290€</span>
            </div>
            <ul style={{padding:0,marginBottom:32}}>
              {["Installation OpenClaw sécurisée sur ton VPS","Agent LinkedIn configuré et prêt","Intégration n8n + CRM","Intégration Telegram sécurisée","Prospection 24/7","Support VIP 30 jours"].map((it,i)=>(
                <li key={i} style={{display:"flex",alignItems:"center",gap:10,color:"#d4d4d8",fontSize:14,margin:"10px 0",listStyle:"none"}}>
                  <span style={{color:"#10b981"}}>✓</span>{it}
                </li>
              ))}
            </ul>
            <a href="https://wa.me/33628500314?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20mon%20setup%20OpenClaw%20!" target="_blank" rel="noopener noreferrer" style={{display:"block",width:"100%",padding:16,borderRadius:12,background:"#10b981",color:"#09090b",fontWeight:"bold",fontSize:16,textDecoration:"none",textAlign:"center",boxSizing:"border-box"}}>Réserver mon setup →</a>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{...S.h2,marginTop:0,marginBottom:28,textAlign:"center"}}>Questions fréquentes</h2>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {[
            ["J'ai besoin de quoi pour commencer ?","Un VPS Hostinger et un compte LinkedIn actif. Je m'occupe de tout le reste."],
            ["Est-ce risqué pour mon compte LinkedIn ?","L'API intègre un smart scheduling qui simule un comportement humain et respecte les limites LinkedIn."],
            ["Zéro compétence technique, c'est pour moi ?","Oui, c'est exactement pour ça que ce service existe. Tu reçois un agent opérationnel clé en main."],
            ["Que se passe-t-il si ça tombe en panne ?","Redémarrage automatique sur ton propre serveur. Support 30 jours inclus."],
            ["Différence avec un outil LinkedIn classique ?","Les autres font du cold outreach. Ici tu contactes des gens qui viennent de s'engager sur ton sujet — c'est le warm signal."],
          ].map(([q,a],i)=>(
            <div key={i} style={S.card}>
              <h3 style={{...S.h3,marginTop:0,marginBottom:8}}>{q}</h3>
              <p style={{...S.p,margin:0}}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:56,borderRadius:24,background:"linear-gradient(135deg,#4f46e5,#0891b2)",textAlign:"center"}}>
        <h2 style={{fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:700,color:"#fff",marginBottom:16,marginTop:0}}>Prêt à avoir ton agent LinkedIn opérationnel en 48h ?</h2>
        <p style={{color:"rgba(224,231,255,0.85)",marginBottom:36,fontSize:16}}>Setup en 48h · Support 30 jours · Ton infrastructure, pas un SaaS partagé</p>
        <a href="https://wa.me/33628500314?text=Bonjour%2C%20je%20veux%20r%C3%A9server%20mon%20setup%20OpenClaw%20!" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"16px 40px",borderRadius:12,background:"#fff",color:"#312e81",fontWeight:"bold",fontSize:16,textDecoration:"none"}}>Réserver mon setup →</a>
      </section>
    </div>
  );
}

const SC = {
  wrap:   { maxWidth:900, margin:"0 auto", padding:"0 0 80px" },
  hdr:    { textAlign:"center", padding:"60px 0 50px", borderBottom:"1px solid #252d4a", marginBottom:50 },
  logo:   { fontSize:13, letterSpacing:3, textTransform:"uppercase", color:"#4f8ef7", marginBottom:16 },
  h1c:    { fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, background:"linear-gradient(135deg,#4f8ef7,#7c5cfc)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:12 },
  sub:    { color:"#64748b", fontSize:14 },
  step:   { background:"#141828", border:"1px solid #252d4a", borderRadius:12, padding:32, marginBottom:28, position:"relative", overflow:"hidden" },
  stepL:  { position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#4f8ef7,#7c5cfc)" },
  sHdr:   { display:"flex", alignItems:"center", gap:14, marginBottom:20 },
  sNum:   { width:36, height:36, background:"linear-gradient(135deg,#4f8ef7,#7c5cfc)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14, color:"white", flexShrink:0 },
  h2c:    { fontSize:18, fontWeight:700, color:"#e2e8f0" },
  h3c:    { fontSize:15, fontWeight:600, color:"#4f8ef7", margin:"20px 0 10px" },
  pc:     { color:"#94a3b8", marginBottom:14, fontSize:14, lineHeight:1.7 },
  cBlock: { background:"#0a0c14", border:"1px solid #252d4a", borderRadius:8, margin:"14px 0", overflow:"hidden" },
  cHead:  { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 14px", background:"#1a1f35", borderBottom:"1px solid #252d4a" },
  cLabel: { fontSize:11, color:"#64748b", letterSpacing:1, textTransform:"uppercase", fontFamily:"monospace" },
  preC2:  { padding:16, fontFamily:"monospace", fontSize:12, color:"#a5b4fc", overflowX:"auto", whiteSpace:"pre-wrap", wordBreak:"break-all", lineHeight:1.6, margin:0 },
  note:   { background:"rgba(245,158,11,0.08)", borderLeft:"3px solid #f59e0b", padding:"12px 16px", borderRadius:"0 6px 6px 0", margin:"12px 0", fontSize:13, color:"#fcd34d" },
  tip:    { background:"rgba(61,214,140,0.08)", borderLeft:"3px solid #3dd68c", padding:"12px 16px", borderRadius:"0 6px 6px 0", margin:"12px 0", fontSize:13, color:"#6ee7b7" },
  tbl:    { width:"100%", borderCollapse:"collapse", margin:"14px 0", fontSize:13 },
  thc:    { background:"#1a1f35", color:"#4f8ef7", padding:"10px 14px", textAlign:"left", fontWeight:600, borderBottom:"1px solid #252d4a" },
  tdc:    { padding:"10px 14px", borderBottom:"1px solid #252d4a", color:"#94a3b8" },
  sectT:  { fontSize:13, letterSpacing:2, textTransform:"uppercase", color:"#7c5cfc", margin:"50px 0 20px", fontWeight:600 },
  ftc:    { textAlign:"center", padding:"40px 0", color:"#64748b", fontSize:12, borderTop:"1px solid #252d4a", marginTop:50 },
};

function CopyBtn({text}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={()=>{ navigator.clipboard.writeText(text.trim()); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
      style={{background:copied?"#3dd68c":"#141828", border:`1px solid ${copied?"#3dd68c":"#252d4a"}`, color:copied?"white":"#64748b", padding:"4px 12px", borderRadius:5, fontSize:11, cursor:"pointer", transition:"all 0.2s"}}
    >{copied?"✓ Copié":"Copier"}</button>
  );
}

function CBlock({label, code}) {
  return (
    <div style={SC.cBlock}>
      <div style={SC.cHead}>
        <span style={SC.cLabel}>{label}</span>
        <CopyBtn text={code}/>
      </div>
      <pre style={SC.preC2}>{code}</pre>
    </div>
  );
}

function Cd2({c}) {
  return <code style={{fontFamily:"monospace",background:"#1a1f35",padding:"2px 7px",borderRadius:4,fontSize:12,color:"#a5b4fc"}}>{c}</code>;
}

function Badge({t, type="green"}) {
  const colors = {green:["rgba(61,214,140,0.15)","#3dd68c"], orange:["rgba(245,158,11,0.15)","#f59e0b"], red:["rgba(248,113,113,0.15)","#f87171"]};
  const [bg,col] = colors[type]||colors.green;
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:99,fontSize:11,fontWeight:600,background:bg,color:col}}>{t}</span>;
}

function StepBox({num, title, children}) {
  return (
    <div style={SC.step}>
      <div style={SC.stepL}/>
      <div style={SC.sHdr}>
        <div style={SC.sNum}>{num}</div>
        <h2 style={SC.h2c}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ImgScreen({src, caption, solo=false}) {
  return (
    <div style={{margin:"18px 0", textAlign:"center"}}>
      <img src={src} alt={caption} style={{maxWidth:"100%", width: solo ? "100%" : 560, borderRadius:12, border:"1px solid #252d4a", boxShadow:"0 4px 24px rgba(0,0,0,0.5)", display:"inline-block"}}/>
      {caption && <p style={{fontSize:12, color:"#64748b", marginTop:8, fontStyle:"italic"}}>{caption}</p>}
    </div>
  );
}

function CostGuide() {
  return (
    <div style={SC.wrap}>
      <div style={SC.hdr}>
        <div style={SC.logo}>🦞 Daemon IA</div>
        <h1 style={SC.h1c}>OpenClaw — Optimisation des Coûts</h1>
        <p style={SC.sub}>Configuration OpenRouter sur VPS Hostinger / Coolify · Mars 2026</p>
      </div>

      {/* INTRO */}
      <StepBox num="📋" title="Introduction">
        <p style={SC.pc}>Ce guide explique comment connecter <strong style={{color:"#e2e8f0"}}>OpenRouter</strong> à votre instance OpenClaw pour réduire drastiquement vos coûts en tokens.</p>
        <p style={SC.pc}>Par défaut, OpenClaw utilise <strong style={{color:"#e2e8f0"}}>Claude Opus</strong> pour toutes les requêtes. Résultat : une facture pouvant dépasser <Badge t="$2 500/mois" type="red"/> pour un usage actif.</p>
        <table style={SC.tbl}>
          <thead><tr><th style={SC.thc}>Optimisation</th><th style={SC.thc}>Coût avant</th><th style={SC.thc}>Coût après</th><th style={SC.thc}>Économie</th></tr></thead>
          <tbody>
            <tr><td style={SC.tdc}>Modèle par défaut → DeepSeek V3.2</td><td style={SC.tdc}><Badge t="$2 550/mois" type="red"/></td><td style={SC.tdc}><Badge t="$680/mois"/></td><td style={SC.tdc}><Badge t="-73%"/></td></tr>
            <tr><td style={SC.tdc}>Heartbeats → Gemini Flash-Lite</td><td style={SC.tdc}><Badge t="$1 022/mois" type="red"/></td><td style={SC.tdc}><Badge t="$7/mois"/></td><td style={SC.tdc}><Badge t="-99%"/></td></tr>
            <tr><td style={SC.tdc}>Gestion de session + cache</td><td style={SC.tdc}>—</td><td style={SC.tdc}>—</td><td style={SC.tdc}><Badge t="-$60/mois"/></td></tr>
            <tr><td style={SC.tdc}><strong style={{color:"#e2e8f0"}}>Total combiné</strong></td><td style={SC.tdc}><Badge t="$2 550/mois" type="red"/></td><td style={SC.tdc}><Badge t="$70–95/mois"/></td><td style={SC.tdc}><Badge t="jusqu'à -96%"/></td></tr>
          </tbody>
        </table>
        <p style={SC.pc}><strong style={{color:"#e2e8f0"}}>Comment utiliser ce guide :</strong> Exécuter les commandes dans l'ordre depuis le <strong style={{color:"#e2e8f0"}}>Terminal Coolify</strong>. Un <strong style={{color:"#e2e8f0"}}>Restart</strong> est nécessaire après toutes les commandes.</p>
        <div style={SC.note}>⚠️ Ne pas envoyer de message à OpenClaw entre les commandes et le restart — cela pourrait écraser certains paramètres.</div>
      </StepBox>

      <p style={SC.sectT}>— Configuration OpenRouter —</p>

      <StepBox num="1" title="Enregistrer la clé OpenRouter">
        <p style={SC.pc}>Créer d'abord une clé API sur <strong style={{color:"#e2e8f0"}}>openrouter.ai → Dashboard → Keys → Créer une nouvelle clé</strong>.</p>
        <CBlock label="Terminal Coolify" code="openclaw models auth paste-token --provider openrouter"/>
        <div style={SC.tip}>✅ Succès attendu : Auth profile: openrouter:manual (openrouter/token)</div>
      </StepBox>

      <StepBox num="2" title="Corriger le profil auth en mode api_key">
        <p style={SC.pc}>Par défaut le profil est créé en mode <Cd2 c="token"/>. Il faut le passer en <Cd2 c="api_key"/> pour que les modèles OpenRouter soient autorisés.</p>
        <CBlock label="Terminal Coolify" code={`openclaw config set auth.profiles.openrouter:manual '{"provider":"openrouter","mode":"api_key"}'`}/>
      </StepBox>

      <StepBox num="3" title="Ajouter les modèles OpenRouter">
        <p style={SC.pc}>Enregistre tous les modèles disponibles. Cette commande remplace toute la liste.</p>
        <div style={SC.note}>⚠️ À relancer si vous voulez ajouter un modèle ultérieurement.</div>
        <CBlock label="Terminal Coolify" code={`openclaw config set models.providers.openrouter '{"baseUrl":"https://openrouter.ai/api/v1","api":"openai-completions","models":[{"id":"google/gemini-2.5-flash-lite","name":"Gemini Flash-Lite","contextWindow":1000000,"maxTokens":8192},{"id":"google/gemini-2.5-flash","name":"Gemini Flash","contextWindow":1000000,"maxTokens":8192},{"id":"anthropic/claude-haiku-4-5","name":"Claude Haiku 4.5","contextWindow":200000,"maxTokens":8192},{"id":"anthropic/claude-sonnet-4-6","name":"Claude Sonnet 4.6","contextWindow":1000000,"maxTokens":8192},{"id":"anthropic/claude-opus-4-6","name":"Claude Opus 4.6","contextWindow":1000000,"maxTokens":8192},{"id":"deepseek/deepseek-v3.2","name":"DeepSeek V3.2","contextWindow":164000,"maxTokens":8192},{"id":"moonshotai/kimi-k2.5","name":"Kimi K2.5","contextWindow":262000,"maxTokens":8192},{"id":"z-ai/glm-5","name":"GLM-5","contextWindow":205000,"maxTokens":8192},{"id":"openai/gpt-5-mini","name":"GPT-5 Mini","contextWindow":128000,"maxTokens":8192},{"id":"openai/gpt-5-nano","name":"GPT-5 Nano","contextWindow":128000,"maxTokens":8192},{"id":"meta-llama/llama-3.1-8b-instruct","name":"Llama 3.1 8B","contextWindow":131000,"maxTokens":8192},{"id":"meta-llama/llama-3.3-70b-instruct","name":"Llama 3.3 70B","contextWindow":131000,"maxTokens":8192},{"id":"meta-llama/llama-4-scout","name":"Llama 4 Scout","contextWindow":512000,"maxTokens":8192}]}'`}/>
      </StepBox>

      <StepBox num="4" title="Définir le modèle par défaut">
        <p style={SC.pc}>DeepSeek V3.2 est le modèle économique recommandé <Badge t="$0.31/M tokens"/>.</p>
        <CBlock label="Terminal Coolify" code="openclaw config set agents.defaults.model.primary openrouter/deepseek/deepseek-v3.2"/>
      </StepBox>

      <StepBox num="5" title="Configurer les alias de modèles">
        <p style={SC.pc}>Les alias permettent de changer de modèle depuis Telegram avec <Cd2 c="/model deepseek"/>, <Cd2 c="/model sonnet"/>, etc.</p>
        <CBlock label="Terminal Coolify" code={`openclaw config set agents.defaults.models '{"openrouter/deepseek/deepseek-v3.2":{"alias":"deepseek"},"openrouter/google/gemini-2.5-flash-lite":{"alias":"flashlite"},"openrouter/google/gemini-2.5-flash":{"alias":"flash"},"openrouter/anthropic/claude-haiku-4-5":{"alias":"haiku"},"openrouter/anthropic/claude-sonnet-4-6":{"alias":"sonnet"},"openrouter/anthropic/claude-opus-4-6":{"alias":"opus"},"openrouter/moonshotai/kimi-k2.5":{"alias":"kimi"},"openrouter/z-ai/glm-5":{"alias":"glm"},"openrouter/openai/gpt-5-mini":{"alias":"gpt"},"openrouter/openai/gpt-5-nano":{"alias":"nano"},"meta-llama/llama-3.1-8b-instruct":{"alias":"llama8b"},"meta-llama/llama-3.3-70b-instruct":{"alias":"llama70b"},"meta-llama/llama-4-scout":{"alias":"llama4"}}'`}/>
      </StepBox>

      <p style={SC.sectT}>— Optimisations des coûts —</p>

      <StepBox num="6" title="Heartbeat économique">
        <p style={SC.pc}>Par défaut les heartbeats tournent sur Opus toutes les 30 minutes — soit <Badge t="$1 022/mois" type="red"/> sans rien faire d'utile. En les passant sur Gemini Flash-Lite toutes les 55 minutes, on tombe à <Badge t="~$1/mois"/>.</p>
        <p style={SC.pc}>Pourquoi 55 minutes ? Le cache de prompt expire après ~1 heure. Le heartbeat rafraîchit le cache juste avant son expiration.</p>
        <CBlock label="Terminal Coolify" code={`openclaw config set agents.defaults.heartbeat '{"every":"55m","model":"openrouter/google/gemini-2.5-flash-lite","target":"last"}'`}/>
        <div style={SC.tip}>✅ Économie estimée : $178/mois sur cette seule optimisation.</div>
      </StepBox>

      <StepBox num="7" title="Compaction mémoire">
        <p style={SC.pc}>Chaque échange ajoute des tokens au contexte. La compaction mémoire nettoie automatiquement le contexte avant qu'il ne gonfle trop.</p>
        <CBlock label="Terminal Coolify" code={`openclaw config set agents.defaults.compaction '{"memoryFlush":{"enabled":true,"softThresholdTokens":4000}}'`}/>
      </StepBox>

      <StepBox num="8" title="Cache de prompts">
        <p style={SC.pc}>Anthropic offre une réduction de 90% sur les tokens mis en cache. Google offre 75%. À vérifier/activer depuis le chat OpenClaw :</p>
        <CBlock label="Chat OpenClaw (Telegram ou WebUI)" code={`Confirme : le cache de prompts est-il activé pour ma configuration de modèles actuelle ? Sinon, active-le. Vérifie également que mon TTL de cache est configuré de manière optimale (doit être 3600 secondes / 1 heure pour les meilleures économies).`}/>
      </StepBox>

      <StepBox num="9" title="Garde-fous budgétaires">
        <p style={SC.pc}>À envoyer dans le chat OpenClaw pour ajouter des limites automatiques :</p>
        <CBlock label="Chat OpenClaw (Telegram ou WebUI)" code={`Ajoute ces garde-fous budgétaires à mon prompt système :\n\n## Politique de Coûts et Limites API\n- Maximum 10 appels API par message utilisateur\n- Maximum 100K tokens de sortie par jour\n\nAvant d'appeler des outils : demande "Cet appel est-il nécessaire ?"\n\nBudget journalier : 5$ (préviens-moi à 3,75$)\nBudget mensuel : 100$ (préviens-moi à 75$)\n\nSi une tâche dépasse 1$ en tokens : indique-moi le coût et demande mon accord.\n\nEn cas d'erreurs de limite (429) : STOP, attends 5 minutes, réessaie une fois.\n\nConfirme que ces règles sont maintenant dans mon prompt système.`}/>
      </StepBox>

      <StepBox num="10" title="Restart et vérification finale">
        <p style={SC.pc}>Faire un <strong style={{color:"#e2e8f0"}}>Restart depuis Coolify</strong>, attendre 30 secondes, puis vérifier.</p>
        <CBlock label="Vérifier le modèle actif (Telegram)" code="/status full"/>
        <CBlock label="Vérifier la config providers (Terminal Coolify)" code={`cat /data/.openclaw/openclaw.json | grep -A3 "providers"`}/>
        <CBlock label="Voir les coûts et l'usage (Telegram)" code="/usage"/>
        <div style={SC.note}>⚠️ Si providers: {"{}"} → relancer l'étape 3 puis restart immédiatement sans envoyer de message.</div>
      </StepBox>

      <p style={SC.sectT}>— Référence —</p>

      <StepBox num="★" title="Arbre de décision — Quel modèle utiliser ?">
        <table style={SC.tbl}>
          <thead><tr><th style={SC.thc}>Si vous faites…</th><th style={SC.thc}>Alias</th><th style={SC.thc}>Modèle</th><th style={SC.thc}>Coût</th></tr></thead>
          <tbody>
            {[
              ["Heartbeat / cron / ping","flashlite","Gemini Flash-Lite","$0.18/M","green"],
              ["Question du quotidien","deepseek","DeepSeek V3.2 ⭐","$0.31/M","green"],
              ["Code simple","deepseek","DeepSeek V3.2","$0.31/M","green"],
              ["Contexte très long","kimi","Kimi K2.5","$1.08/M","green"],
              ["Code complexe","glm","GLM-5","$1.35/M","orange"],
              ["Rédaction qualité / recherche","sonnet","Claude Sonnet 4.6","$6/M","orange"],
              ["Tâche critique / raisonnement complexe","opus","Claude Opus 4.6","$10/M","red"],
              ["Open-source économique","llama8b","Llama 3.1 8B","très faible","green"],
              ["Open-source qualité","llama70b","Llama 3.3 70B","faible","green"],
              ["Contexte 512K open-source","llama4","Llama 4 Scout","faible","green"],
            ].map(([use,alias,model,cost,type],i)=>(
              <tr key={i}><td style={SC.tdc}>{use}</td><td style={SC.tdc}><Cd2 c={alias}/></td><td style={SC.tdc}>{model}</td><td style={SC.tdc}><Badge t={cost} type={type}/></td></tr>
            ))}
          </tbody>
        </table>
        <h3 style={SC.h3c}>Changer de modèle depuis Telegram</h3>
        <p style={SC.pc}><strong style={{color:"#e2e8f0"}}>Méthode 1 — Via alias (rapide)</strong></p>
        <CBlock label="Telegram" code="/model deepseek"/>
        <p style={SC.pc}><strong style={{color:"#e2e8f0"}}>Méthode 2 — Via le menu interactif</strong></p>
        <p style={SC.pc}>Taper <Cd2 c="/models"/> → cliquer sur <strong style={{color:"#e2e8f0"}}>openrouter</strong> → choisir le modèle dans la liste.</p>
        <CBlock label="Telegram" code="/models"/>
        <div style={{display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", margin:"18px 0"}}>
          <ImgScreen src="https://i.imgur.com/XOetcN9.jpeg" caption="Étape 1 — liste des providers"/>
          <ImgScreen src="https://i.imgur.com/VFXDM32.jpeg" caption="Étape 2 — modèles OpenRouter"/>
          <ImgScreen src="https://i.imgur.com/91iNLiC.jpeg" caption="Étape 3 — confirmation du modèle actif"/>
        </div>
      </StepBox>

      <StepBox num="💬" title="Prompts utiles — Contrôle des coûts">
        <h3 style={SC.h3c}>Audit des coûts</h3>
        <CBlock label="Chat OpenClaw" code={`/status full\n/usage\n\nEnsuite demande-moi : "Quels patterns vois-tu dans mon utilisation API ? Où puis-je encore réduire les coûts ?"`}/>
        <h3 style={SC.h3c}>Règle d'efficacité des sorties d'outils</h3>
        <CBlock label="Chat OpenClaw" code={`Ajoute cette règle à mon prompt système :\n\n## Gardez les Sorties d'Outils Légères\n\nAvant de retourner une sortie d'outil :\n1. Filtre pour la pertinence\n2. Résume les grandes réponses JSON\n3. Demande : "L'utilisateur a-t-il besoin des 500 lignes, ou juste de l'erreur ?"\n\nConfirme l'ajout.`}/>
        <h3 style={SC.h3c}>Arrêt d'urgence</h3>
        <CBlock label="Telegram — pause tous les appels API pendant 1h" code="/ratelimit pause"/>
      </StepBox>

      <StepBox num="🔧" title="Dépannage">
        <h3 style={SC.h3c}>Erreur : Unknown model: openrouter/...</h3>
        <p style={SC.pc}>Le bloc providers a été écrasé. Vérifier :</p>
        <CBlock label="Terminal Coolify" code={`cat /data/.openclaw/openclaw.json | grep -A3 "providers"`}/>
        <p style={SC.pc}>Si le résultat affiche <Cd2 c="providers: {}"/> → relancer l'étape 3 puis restart immédiatement.</p>
        <h3 style={SC.h3c}>Heartbeats toujours chers</h3>
        <CBlock label="Terminal Coolify" code={`# */55 * * * * /usr/bin/curl -X POST http://localhost:3000/api/agent/main -H "Content-Type: application/json" -d '{"message":"ping","sessionId":"isolated"}' >/dev/null 2>&1`}/>
        <h3 style={SC.h3c}>Coût toujours élevé après optimisation</h3>
        <CBlock label="Telegram" code="/status full"/>
      </StepBox>

      <div style={SC.ftc}>Daemon IA — daemon-ia.fr — Mars 2026</div>
    </div>
  );
}

const CLAUDEMD_HTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Le claude.md — Le briefing ultime pour ton IA</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet">
<style>
:root{--bg:#0a0a0f;--surface:#12121a;--surface2:#1a1a26;--border:#2a2a3a;--text:#e8e8f0;--muted:#8888a0;--orange:#f97316;--green:#22c55e;--blue:#3b82f6;--purple:#a855f7;--red:#ef4444;--cyan:#06b6d4;--yellow:#eab308}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;line-height:1.6;overflow-x:hidden}
a{color:var(--orange);text-decoration:none}
code{font-family:'JetBrains Mono',monospace;background:rgba(255,255,255,0.07);padding:2px 7px;border-radius:4px;font-size:.85em;color:var(--text)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:3rem 2rem;position:relative;overflow:hidden}
.hero-glow{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 30%,rgba(249,115,22,.1) 0%,transparent 55%),radial-gradient(ellipse at 70% 70%,rgba(168,85,247,.07) 0%,transparent 55%);animation:drift 15s ease-in-out infinite}
@keyframes drift{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.hero-badge{font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--orange);border:1px solid rgba(249,115,22,.35);padding:.35rem 1rem;border-radius:100px;margin-bottom:2rem;letter-spacing:.12em;text-transform:uppercase;position:relative;animation:fadeUp .6s both}
.hero h1{font-size:clamp(2.8rem,8vw,6rem);font-weight:900;line-height:1.05;margin-bottom:1.2rem;position:relative;animation:fadeUp .6s .1s both}
.hero h1 em{font-style:normal;font-family:'JetBrains Mono',monospace;color:var(--orange)}
.hero-sub{font-size:clamp(1rem,2.5vw,1.35rem);color:var(--muted);max-width:680px;font-weight:300;margin-bottom:1rem;animation:fadeUp .6s .2s both}
.hero-meta{font-size:.9rem;color:rgba(136,136,160,.6);margin-bottom:3rem;animation:fadeUp .6s .3s both}
.hero-meta span{color:var(--orange)}
.hero-scroll{animation:fadeUp .6s .5s both,bob 2s 1.5s infinite;color:var(--muted);font-size:.8rem;display:flex;flex-direction:column;align-items:center;gap:.4rem}
.hero-scroll .arr{width:22px;height:22px;border-right:2px solid var(--orange);border-bottom:2px solid var(--orange);transform:rotate(45deg)}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}

/* NAV TIMELINE */
.nav-bar{position:sticky;top:0;z-index:100;background:rgba(10,10,15,.9);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);padding:.7rem 2rem;display:flex;gap:.5rem;overflow-x:auto;scrollbar-width:none}
.nav-bar::-webkit-scrollbar{display:none}
.nav-pill{font-size:.72rem;white-space:nowrap;padding:.3rem .8rem;border-radius:100px;border:1px solid var(--border);color:var(--muted);cursor:pointer;transition:all .2s;font-family:'JetBrains Mono',monospace}
.nav-pill:hover,.nav-pill.active{background:rgba(249,115,22,.12);border-color:rgba(249,115,22,.4);color:var(--orange)}

/* WRAPPER */
.wrap{max-width:1000px;margin:0 auto;padding:0 2rem}

/* ANALOGY */
.analogy{padding:7rem 0 5rem;text-align:center}
.analogy h2{font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin-bottom:.8rem}
.analogy h2 em{font-style:normal;color:var(--orange)}
.analogy-lead{color:var(--muted);max-width:600px;margin:0 auto 3rem;font-size:1.05rem}
.analogy-cards{display:grid;grid-template-columns:1fr 60px 1fr;gap:1.5rem;align-items:center}
.card-before,.card-after{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:2rem}
.card-after{border-color:rgba(34,197,94,.3)}
.card-icon{width:64px;height:64px;margin:0 auto 1.2rem;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:1.8rem}
.card-before .card-icon{background:rgba(239,68,68,.1)}
.card-after .card-icon{background:rgba(34,197,94,.1)}
.card-title{font-weight:800;font-size:1.1rem;margin-bottom:.6rem}
.card-desc{color:var(--muted);font-size:.9rem;line-height:1.6}
.card-desc .bad{color:#f87171}
.card-desc .good{color:var(--green)}
.arr-big{font-size:2rem;color:var(--orange);text-align:center}
.keypoint{margin-top:3rem;display:inline-flex;align-items:flex-start;gap:1rem;background:rgba(249,115,22,.07);border:1px solid rgba(249,115,22,.25);border-radius:16px;padding:1.5rem 2rem;text-align:left;max-width:700px}
.keypoint-icon{font-size:1.5rem;flex-shrink:0;margin-top:.1rem}
.keypoint p{color:var(--muted);font-size:.95rem;line-height:1.7}
.keypoint p strong{color:var(--text)}

/* SECTIONS */
.sections-area{padding:3rem 0 6rem}
.sections-title{text-align:center;font-size:clamp(1.8rem,4vw,2.6rem);font-weight:800;margin-bottom:.7rem}
.sections-lead{text-align:center;color:var(--muted);margin-bottom:3.5rem;font-size:1rem}

.part-block{margin-bottom:2.5rem;border:1px solid var(--border);border-radius:20px;overflow:hidden;transition:border-color .3s}
.part-block:hover{border-color:rgba(249,115,22,.3)}
.part-header{display:flex;align-items:center;gap:1rem;padding:1.4rem 1.8rem;cursor:pointer;background:var(--surface);user-select:none}
.part-header:hover{background:var(--surface2)}
.part-num{font-family:'JetBrains Mono',monospace;font-size:.72rem;font-weight:700;color:#0a0a0f;background:var(--orange);min-width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;flex-shrink:0}
.part-tag{font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--muted);background:var(--surface2);padding:.2rem .6rem;border-radius:6px;flex-shrink:0}
.part-name{font-weight:700;font-size:1.1rem;flex:1}
.part-time{font-size:.72rem;color:var(--muted);font-family:'JetBrains Mono',monospace;flex-shrink:0}
.part-toggle{font-size:1.4rem;color:var(--muted);transition:transform .3s;flex-shrink:0}
.part-block.open .part-toggle{transform:rotate(45deg);color:var(--orange)}
.part-body{max-height:0;overflow:hidden;transition:max-height .5s ease}
.part-block.open .part-body{max-height:3000px}
.part-content{padding:1.5rem 1.8rem 2rem;border-top:1px solid var(--border)}

/* ILLUSTRATION ZONES */
.illus{margin:1.5rem 0;border-radius:14px;overflow:hidden}

/* Code preview */
.codeblock{background:#0d0d14;border:1px solid var(--border);border-radius:12px;padding:1.2rem 1.5rem;font-family:'JetBrains Mono',monospace;font-size:.78rem;line-height:1.9;overflow-x:auto;margin:1.2rem 0;color:var(--muted)}
.c-comment{color:#444460}
.c-key{color:var(--cyan)}
.c-val{color:var(--green)}
.c-hi{color:var(--orange);font-weight:600}
.c-red{color:#f87171}
.c-purple{color:#c084fc}

/* Tips */
.tip{border-radius:12px;padding:1.1rem 1.4rem;margin:.8rem 0;font-size:.9rem;line-height:1.6}
.tip-label{font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.4rem}
.tip p{color:var(--muted)}
.tip-o{background:rgba(249,115,22,.06);border:1px solid rgba(249,115,22,.2)}
.tip-o .tip-label{color:var(--orange)}
.tip-p{background:rgba(168,85,247,.06);border:1px solid rgba(168,85,247,.22)}
.tip-p .tip-label{color:#c084fc}
.tip-r{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.22)}
.tip-r .tip-label{color:#f87171}
.tip-g{background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.22)}
.tip-g .tip-label{color:var(--green)}

/* Grid 2col */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin:1.2rem 0}
.g2-item{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:1.2rem}
.g2-icon{font-size:1.4rem;margin-bottom:.6rem}
.g2-title{font-weight:700;font-size:.9rem;margin-bottom:.4rem;color:var(--text)}
.g2-desc{color:var(--muted);font-size:.85rem;line-height:1.6}

/* Rules */
.rules-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.2rem;margin:2rem 0}
.rule-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1.5rem}
.rule-num{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--orange);font-weight:700;margin-bottom:.5rem}
.rule-title{font-weight:700;font-size:1rem;margin-bottom:.4rem}
.rule-desc{color:var(--muted);font-size:.87rem;line-height:1.6}

/* Formula */
.formula-wrap{text-align:center;padding:5rem 2rem 4rem}
.formula-wrap h2{font-size:clamp(1.8rem,4vw,2.5rem);font-weight:800;margin-bottom:2rem}
.formula{font-family:'JetBrains Mono',monospace;font-size:clamp(.9rem,2.5vw,1.4rem);color:var(--orange);background:var(--surface);border:1px solid var(--border);display:inline-block;padding:1.4rem 2.5rem;border-radius:16px;margin-bottom:3rem;letter-spacing:.02em}

/* Pipeline */
.pipeline{display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;margin:1.2rem 0;padding:1rem 1.2rem;background:var(--surface2);border-radius:12px;border:1px solid var(--border)}
.pipe-step{font-family:'JetBrains Mono',monospace;font-size:.75rem;background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.25);color:var(--orange);padding:.3rem .7rem;border-radius:6px}
.pipe-arrow{color:var(--muted);font-size:.9rem}

/* File tree */
.tree{background:#0d0d14;border:1px solid var(--border);border-radius:12px;padding:1.2rem 1.5rem;font-family:'JetBrains Mono',monospace;font-size:.78rem;line-height:2;overflow-x:auto;margin:1.2rem 0}
.tree .folder{color:var(--cyan)}
.tree .file{color:var(--muted)}
.tree .warn{color:#f87171}
.tree .note{color:#444460}

/* Timeline part indicator */
.time-badge{display:inline-flex;align-items:center;gap:.4rem;font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--muted);background:var(--surface2);border:1px solid var(--border);padding:.2rem .7rem;border-radius:100px;margin-bottom:1rem}
.time-badge span{color:var(--orange)}

/* Explain block */
.explain-title{font-size:.78rem;text-transform:uppercase;letter-spacing:.1em;font-weight:700;margin-bottom:.7rem;display:flex;align-items:center;gap:.5rem}
.dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0}
.explain-list{list-style:none;padding:0;margin:.5rem 0}
.explain-list li{color:var(--muted);font-size:.92rem;padding:.25rem 0 .25rem 1.2rem;position:relative;line-height:1.6}
.explain-list li::before{content:'→';position:absolute;left:0;color:var(--orange)}

/* QA */
.qa-grid{display:flex;flex-direction:column;gap:1rem;margin:1.2rem 0}
.qa-item{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:1.2rem 1.4rem}
.qa-q{font-weight:700;font-size:.92rem;margin-bottom:.5rem;color:var(--text)}
.qa-q::before{content:'Q : ';color:var(--orange);font-family:'JetBrains Mono',monospace;font-size:.78rem}
.qa-a{color:var(--muted);font-size:.88rem;line-height:1.6}
.qa-a::before{content:'A : ';color:var(--green);font-family:'JetBrains Mono',monospace;font-size:.78rem}

/* SVG ILLUSTRATIONS */
.svg-wrap{display:flex;justify-content:center;margin:1.5rem 0}

@media(max-width:640px){.analogy-cards{grid-template-columns:1fr}.arr-big{transform:rotate(90deg)}.g2{grid-template-columns:1fr}.part-time{display:none}}
</style>
</head>
<body>

<!-- HERO -->
<section class="hero">
  <div class="hero-glow"></div>
  <div class="hero-badge">Claude Code · Formation Daemon IA</div>
  <h1>Le <em>claude.md</em><br>expliqué</h1>
  <p class="hero-sub">Le fichier qui transforme Claude d'un stagiaire perdu en développeur senior de ton projet</p>
  <p class="hero-meta">30 minutes &nbsp;·&nbsp; Par <span>Damien — Daemon IA</span></p>
  <div class="hero-scroll"><span>Scroll pour explorer</span><div class="arr"></div></div>
</section>

<!-- NAV -->
<nav class="nav-bar" id="nav">
  <div class="nav-pill active" onclick="scrollTo('analogy')">Analogie</div>
  <div class="nav-pill" onclick="scrollTo('s1')">01 Contexte</div>
  <div class="nav-pill" onclick="scrollTo('s2')">02 Stack</div>
  <div class="nav-pill" onclick="scrollTo('s3')">03 Conventions</div>
  <div class="nav-pill" onclick="scrollTo('s4')">04 Sécurité</div>
  <div class="nav-pill" onclick="scrollTo('s5')">05 Structure</div>
  <div class="nav-pill" onclick="scrollTo('s6')">06 Workflow</div>
  <div class="nav-pill" onclick="scrollTo('s7')">07 Métier</div>
  <div class="nav-pill" onclick="scrollTo('rules')">6 Règles</div>
  <div class="nav-pill" onclick="scrollTo('qa')">Q&amp;A</div>
</nav>

<!-- ANALOGY -->
<section id="analogy" class="wrap analogy">
  <h2>C'est quoi un <em>claude.md</em> ?</h2>
  <p class="analogy-lead">Imaginez : vous venez de recruter le meilleur développeur du monde. Brillant, rapide, polyglotte. Sauf qu'il a un problème — il ne sait <strong>rien</strong> de votre projet.</p>

  <!-- SVG Illustration: brain vs empty head -->
  <div class="svg-wrap">
    <svg width="520" height="120" viewBox="0 0 520 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Left: empty head -->
      <circle cx="100" cy="60" r="40" stroke="#2a2a3a" stroke-width="2" fill="#12121a"/>
      <text x="100" y="55" text-anchor="middle" font-family="Outfit,sans-serif" font-size="11" fill="#8888a0">Claude</text>
      <text x="100" y="70" text-anchor="middle" font-family="Outfit,sans-serif" font-size="10" fill="#555570">sans claude.md</text>
      <!-- Question marks -->
      <text x="78" y="45" font-size="14" fill="#ef4444" opacity="0.6">?</text>
      <text x="110" y="40" font-size="10" fill="#ef4444" opacity="0.5">?</text>
      <text x="90" y="82" font-size="12" fill="#ef4444" opacity="0.4">?</text>
      <!-- Arrow -->
      <line x1="165" y1="60" x2="215" y2="60" stroke="#f97316" stroke-width="2"/>
      <polygon points="215,55 225,60 215,65" fill="#f97316"/>
      <!-- File icon in middle -->
      <rect x="230" y="42" width="60" height="36" rx="6" fill="rgba(249,115,22,0.12)" stroke="rgba(249,115,22,0.4)" stroke-width="1.5"/>
      <text x="260" y="57" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#f97316">claude</text>
      <text x="260" y="69" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8" fill="#f97316">.md</text>
      <!-- Arrow -->
      <line x1="295" y1="60" x2="345" y2="60" stroke="#22c55e" stroke-width="2"/>
      <polygon points="345,55 355,60 345,65" fill="#22c55e"/>
      <!-- Right: head with brain -->
      <circle cx="420" cy="60" r="40" stroke="rgba(34,197,94,0.5)" stroke-width="2" fill="#12121a"/>
      <text x="420" y="55" text-anchor="middle" font-family="Outfit,sans-serif" font-size="11" fill="#22c55e">Claude</text>
      <text x="420" y="70" text-anchor="middle" font-family="Outfit,sans-serif" font-size="10" fill="#6ee7b7">avec claude.md</text>
      <!-- Checkmarks -->
      <text x="400" y="45" font-size="12" fill="#22c55e" opacity="0.7">✓</text>
      <text x="428" y="41" font-size="10" fill="#22c55e" opacity="0.6">✓</text>
      <text x="410" y="82" font-size="11" fill="#22c55e" opacity="0.5">✓</text>
    </svg>
  </div>

  <div class="analogy-cards">
    <div class="card-before">
      <div class="card-icon">🧑‍💻</div>
      <div class="card-title">Sans claude.md</div>
      <div class="card-desc">"Hé Claude, fais un composant…"<br><br><span class="bad">→ Il invente son propre style<br>→ Il se trompe de stack<br>→ Il ignore vos conventions<br>→ Il repart de zéro à chaque session</span></div>
    </div>
    <div class="arr-big">→</div>
    <div class="card-after">
      <div class="card-icon">🚀</div>
      <div class="card-title">Avec claude.md</div>
      <div class="card-desc">"Hé Claude, fais un composant…"<br><br><span class="good">→ Stack respectée (Next.js 15 strict)<br>→ Conventions appliquées<br>→ Fichiers au bon endroit<br>→ Code utilisable directement</span></div>
    </div>
  </div>

  <div style="text-align:center;margin-top:2.5rem">
    <div class="keypoint" style="display:inline-flex">
      <div class="keypoint-icon">💡</div>
      <p><strong>Point clé :</strong> Le claude.md n'est pas de la documentation classique. C'est un <strong>prompt système permanent</strong> qui conditionne le comportement de Claude sur votre projet. C'est la différence entre un outil générique et un assistant expert de <strong>votre</strong> codebase.</p>
    </div>
  </div>
</section>

<!-- SECTIONS DETAIL -->
<section class="sections-area wrap">
  <h2 class="sections-title">Anatomie du fichier</h2>
  <p class="sections-lead">9 sections, chacune avec un rôle précis. Cliquez pour explorer.</p>

  <!-- 01 CONTEXTE METIER -->
  <div id="s1" class="part-block open" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">01</div>
      <div class="part-tag">## Contexte métier</div>
      <div class="part-name">Qui tu es &amp; ce que tu fais</div>
      <div class="part-time">5:00 → 8:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>3 minutes</span> · Section fondatrice</div>

      <div class="g2">
        <div>
          <p class="explain-title"><span class="dot" style="background:#3b82f6"></span> C'est quoi ?</p>
          <p style="color:var(--muted);font-size:.92rem;line-height:1.7">Vous décrivez votre projet en langage humain : le métier, les utilisateurs, le cycle de travail. Claude comprend <strong style="color:var(--text)">pourquoi</strong> le code existe, pas juste comment le coder.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:.5rem">
          <div style="background:rgba(249,115,22,.06);border:1px solid rgba(249,115,22,.15);border-radius:10px;padding:.8rem;font-size:.82rem">
            <div style="color:var(--orange);font-weight:700;margin-bottom:.3rem">💼 Exemple HUB'AO</div>
            <div style="color:var(--muted)">Pipeline d'automatisation des AOs pour traiteurs parisiens. Cycle : Veille → Scoring → DCE → Analyse → Dépôt</div>
          </div>
        </div>
      </div>

      <div class="codeblock">
<span class="c-comment"># Projet AO — Automatisation des Appels d'Offres publics</span>
<span class="c-comment">## Contexte métier</span>
Application <span class="c-hi">multi-tenant</span> de pilotage d'AO publics pour une
entreprise intermédiaire entre <span class="c-val">acheteurs publics</span> et <span class="c-val">traiteurs</span>.

Cycle géré : <span class="c-key">Veille → Scoring → Téléchargement DCE →
Analyse → Rédaction → Dépôt → Suivi</span></div>

      <!-- Pipeline visual -->
      <div class="pipeline">
        <div class="pipe-step">Veille</div><div class="pipe-arrow">→</div>
        <div class="pipe-step">Scoring</div><div class="pipe-arrow">→</div>
        <div class="pipe-step">DCE</div><div class="pipe-arrow">→</div>
        <div class="pipe-step">Analyse</div><div class="pipe-arrow">→</div>
        <div class="pipe-step">Rédaction</div><div class="pipe-arrow">→</div>
        <div class="pipe-step">Dépôt</div><div class="pipe-arrow">→</div>
        <div class="pipe-step">Suivi</div>
      </div>

      <p class="explain-title"><span class="dot" style="background:#22c55e"></span> Pourquoi c'est crucial</p>
      <ul class="explain-list">
        <li>Sans ça, « scoring » = score de jeu vidéo. Avec contexte, Claude sait que scoring = décision <strong style="color:var(--text)">GO/NO GO</strong> sur un appel d'offres</li>
        <li>Le vocabulaire métier permet des décisions architecturales cohérentes</li>
        <li>Si Claude sait que c'est multi-tenant pour des traiteurs, il ne propose pas la même BDD que pour un blog</li>
      </ul>

      <div class="tip tip-o"><div class="tip-label">💡 Tip</div><p>Écrivez le contexte comme si vous l'expliquiez à un dev senior qui arrive dans l'équipe. Pas de jargon non défini — si vous dites "DCE", expliquez que c'est un Dossier de Consultation des Entreprises.</p></div>
    </div></div>
  </div>

  <!-- 02 STACK -->
  <div id="s2" class="part-block" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">02</div>
      <div class="part-tag">## Stack technique</div>
      <div class="part-name">Tes outils &amp; technos</div>
      <div class="part-time">8:00 → 11:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>3 minutes</span> · Les versions comptent</div>

      <div class="codeblock">
<span class="c-key">Frontend</span>  : Next.js <span class="c-hi">15</span> App Router, TypeScript <span class="c-hi">strict</span>
<span class="c-key">UI</span>        : Tailwind CSS + shadcn/ui, React Hook Form + Zod
<span class="c-key">Backend</span>   : Supabase <span class="c-hi">self-hosted</span> (Auth, PostgreSQL + RLS)
<span class="c-key">IA</span>        : Claude API via <span class="c-hi">OpenRouter</span>
<span class="c-key">Déploiement</span>: VPS Hostinger + Coolify (Docker)</div>

      <!-- Stack visual -->
      <div class="g2">
        <div style="background:rgba(239,68,68,.05);border:1px solid rgba(239,68,68,.15);border-radius:12px;padding:1rem">
          <div style="font-weight:700;color:#f87171;font-size:.85rem;margin-bottom:.7rem">❌ Vague = hallucinations</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:.77rem;color:var(--muted);line-height:1.9">
            "Next.js"<br>"TypeScript"<br>"Supabase"
          </div>
          <div style="color:#f87171;font-size:.8rem;margin-top:.6rem">→ Claude devine la version, souvent faux</div>
        </div>
        <div style="background:rgba(34,197,94,.05);border:1px solid rgba(34,197,94,.15);border-radius:12px;padding:1rem">
          <div style="font-weight:700;color:#22c55e;font-size:.85rem;margin-bottom:.7rem">✓ Précis = code correct</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:.77rem;color:var(--muted);line-height:1.9">
            "Next.js <span style="color:#f97316">15</span> App Router"<br>"TypeScript <span style="color:#f97316">strict</span>"<br>"Supabase <span style="color:#f97316">self-hosted</span>"
          </div>
          <div style="color:#22c55e;font-size:.8rem;margin-top:.6rem">→ Claude génère le bon code du premier coup</div>
        </div>
      </div>

      <p class="explain-title"><span class="dot" style="background:#22c55e"></span> Pourquoi chaque mot compte</p>
      <ul class="explain-list">
        <li><code>Next.js 15</code> ≠ <code>Next.js 12</code> — App Router vs Pages Router, architectures différentes</li>
        <li><code>TypeScript strict</code> — ferme la porte aux <code>any</code> et <code>@ts-ignore</code></li>
        <li><code>Supabase self-hosted</code> ≠ Supabase cloud — auth et Edge Functions ne se configurent pas pareil</li>
        <li><code>Claude API via OpenRouter</code> — headers différents, modèles différents, format de requête différent</li>
      </ul>

      <div class="tip tip-p"><div class="tip-label">🔥 Pro tip</div><p>Soyez précis sur les versions ! Next.js 15 ≠ Next.js 13. Le App Router a changé radicalement entre les versions. Plus vous êtes précis, moins Claude hallucine.</p></div>
    </div></div>
  </div>

  <!-- 03 CONVENTIONS -->
  <div id="s3" class="part-block" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">03</div>
      <div class="part-tag">## Conventions de code</div>
      <div class="part-name">Les règles du jeu</div>
      <div class="part-time">11:00 → 15:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>4 minutes</span> · Section game-changer</div>

      <div class="codeblock">
<span class="c-comment">// Nommage</span>
Fichiers   : <span class="c-val">kebab-case</span>  |  Composants : <span class="c-val">PascalCase</span>  |  Variables : <span class="c-val">camelCase</span>

<span class="c-comment">// Philosophie</span>
Server Components <span class="c-hi">par défaut</span>
<span class="c-key">'use client'</span> explicite et <span class="c-hi">uniquement si nécessaire</span>
Validation Zod côté serveur <span class="c-hi">systématique</span>
<span class="c-key">Mobile-first</span>, <span class="c-key">aria-label</span> sur tous les éléments interactifs
<span class="c-hi">Zéro</span> <code>any</code>, <span class="c-hi">zéro</span> <code>@ts-ignore</code></div>

      <!-- use client visual -->
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:1.2rem;margin:1.2rem 0">
        <div style="font-weight:700;font-size:.9rem;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem">
          <span style="font-size:1.2rem">⚡</span> L'histoire du <code>'use client'</code>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div>
            <div style="font-size:.78rem;color:#f87171;font-weight:700;margin-bottom:.4rem">Sans la règle</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--muted);line-height:1.8">
              <span style="color:#f87171">'use client'</span> // Header.tsx<br>
              <span style="color:#f87171">'use client'</span> // Footer.tsx<br>
              <span style="color:#f87171">'use client'</span> // Card.tsx<br>
              <span style="color:#f87171">'use client'</span> // Layout.tsx<br>
              <span style="color:rgba(136,136,160,.5)">→ SSR cassé, perf tuées</span>
            </div>
          </div>
          <div>
            <div style="font-size:.78rem;color:#22c55e;font-weight:700;margin-bottom:.4rem">Avec la règle</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:.75rem;color:var(--muted);line-height:1.8">
              Header.tsx <span style="color:#22c55e">// Server ✓</span><br>
              Footer.tsx <span style="color:#22c55e">// Server ✓</span><br>
              Card.tsx <span style="color:#22c55e">// Server ✓</span><br>
              <span style="color:#f97316">'use client'</span> // InteractiveBtn<br>
              <span style="color:rgba(136,136,160,.5)">→ SSR optimal</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Absolus vs suggestions -->
      <div class="g2">
        <div style="background:rgba(239,68,68,.05);border:1px solid rgba(239,68,68,.15);border-radius:12px;padding:1rem">
          <div style="font-weight:700;color:#f87171;font-size:.85rem;margin-bottom:.6rem">❌ Suggestions molles</div>
          <div style="color:var(--muted);font-size:.85rem;font-style:italic;line-height:1.7">"Essayez d'éviter les any"<br>"De préférence TypeScript"<br>"Essayez les Server Components"</div>
        </div>
        <div style="background:rgba(34,197,94,.05);border:1px solid rgba(34,197,94,.15);border-radius:12px;padding:1rem">
          <div style="font-weight:700;color:#22c55e;font-size:.85rem;margin-bottom:.6rem">✓ Interdits tranchants</div>
          <div style="color:var(--muted);font-size:.85rem;font-family:'JetBrains Mono',monospace;line-height:1.7">"Zéro any"<br>"TypeScript strict"<br>"Server Components PAR DÉFAUT"</div>
        </div>
      </div>

      <div class="tip tip-o"><div class="tip-label">💡 Tip</div><p>Utilisez des mots absolus : "zéro", "jamais", "toujours", "systématique". Claude respecte mieux les interdits tranchants que les suggestions floues.</p></div>
      <div class="tip tip-r"><div class="tip-label">⚠️ Piège courant</div><p>Si vous ne précisez pas "Server Components par défaut", Claude va mettre <code>'use client'</code> sur quasiment tous les composants, tuant les performances SSR de Next.js. C'est le bug invisible par excellence.</p></div>
    </div></div>
  </div>

  <!-- 04 SECURITE -->
  <div id="s4" class="part-block" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">04</div>
      <div class="part-tag">## Sécurité</div>
      <div class="part-name">Les lignes rouges</div>
      <div class="part-time">15:00 → 17:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>2 minutes</span> · 3 lignes qui protègent tout</div>

      <!-- Security visual -->
      <div class="svg-wrap">
        <svg width="480" height="90" viewBox="0 0 480 90" fill="none">
          <rect x="0" y="10" width="150" height="70" rx="12" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
          <text x="75" y="38" text-anchor="middle" font-family="Outfit,sans-serif" font-size="11" fill="#f87171" font-weight="700">RLS activé</text>
          <text x="75" y="55" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9.5" fill="#8888a0">sur chaque table</text>
          <text x="75" y="70" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" fill="#555570">jamais faire</text>
          <text x="75" y="82" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" fill="#555570">confiance au client</text>

          <rect x="165" y="10" width="150" height="70" rx="12" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
          <text x="240" y="38" text-anchor="middle" font-family="Outfit,sans-serif" font-size="11" fill="#f87171" font-weight="700">Session vérifiée</text>
          <text x="240" y="55" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9.5" fill="#8888a0">chaque Server Action</text>
          <text x="240" y="70" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" fill="#555570">autorise explicitement</text>
          <text x="240" y="82" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" fill="#555570">avant d'agir</text>

          <rect x="330" y="10" width="150" height="70" rx="12" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.3)" stroke-width="1.5"/>
          <text x="405" y="38" text-anchor="middle" font-family="Outfit,sans-serif" font-size="11" fill="#f87171" font-weight="700">Zéro secret</text>
          <text x="405" y="55" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9.5" fill="#8888a0">dans le code</text>
          <text x="405" y="70" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" fill="#555570">tout dans .env.local</text>
          <text x="405" y="82" text-anchor="middle" font-family="Outfit,sans-serif" font-size="9" fill="#555570">(gitignored)</text>
        </svg>
      </div>

      <div class="codeblock">
<span class="c-hi">RLS Supabase activé sur chaque table</span> — jamais faire confiance au client
Chaque Server Action/API Route <span class="c-key">vérifie la session</span> avant d'agir
Zéro secret dans le code — tout dans <span class="c-val">.env.local</span> (gitignored)</div>

      <p class="explain-title"><span class="dot" style="background:#22c55e"></span> Pourquoi 3 lignes suffisent</p>
      <ul class="explain-list">
        <li>Sans RLS, n'importe quel appel API peut lire les données de n'importe qui — faille catastrophique</li>
        <li>"Jamais faire confiance au client" = Claude vérifie systématiquement les permissions côté serveur</li>
        <li>Une clé API dans un commit Git = clé compromise définitivement</li>
      </ul>

      <div class="tip tip-p"><div class="tip-label">🔥 Pro tip</div><p>Mettez la sécurité dans une section dédiée, pas noyée dans les conventions. Claude y prête <strong>plus d'attention</strong> quand c'est isolé et marqué comme critique. C'est un effet psychologique qui marche aussi sur les humains !</p></div>
    </div></div>
  </div>

  <!-- 05 STRUCTURE -->
  <div id="s5" class="part-block" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">05</div>
      <div class="part-tag">## Structure clé</div>
      <div class="part-name">Le plan de l'immeuble</div>
      <div class="part-time">17:00 → 20:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>3 minutes</span> · Les commentaires qui sauvent</div>

      <div class="tree">
<span class="folder">src/</span>
  <span class="folder">app/(auth)/</span>         <span class="note"># login, register — pas de sidebar</span>
  <span class="folder">app/(dashboard)/</span>    <span class="note"># routes protégées avec sidebar</span>
  <span class="folder">components/ui/</span>       <span class="warn"># shadcn/ui — ne pas modifier ⚠️</span>
  <span class="folder">components/ao/</span>       <span class="note"># composants pipeline AO</span>
  <span class="folder">lib/supabase/</span>        <span class="note"># client.ts + server.ts + middleware.ts</span>
  <span class="folder">lib/validations/</span>     <span class="note"># schémas Zod partagés</span>
  <span class="folder">hooks/</span>               <span class="note"># TanStack Query hooks</span>
  <span class="folder">types/</span>               <span class="note"># database.types.ts (généré automatiquement)</span></div>

      <div class="g2">
        <div>
          <p class="explain-title"><span class="dot" style="background:#3b82f6"></span> Les commentaires critiques</p>
          <ul class="explain-list">
            <li><code>ne pas modifier</code> sur <code>components/ui/</code> empêche Claude de casser shadcn/ui</li>
            <li><code>(auth)</code> et <code>(dashboard)</code> = layouts différents en Next.js 15</li>
            <li><code>client.ts</code> vs <code>server.ts</code> Supabase — utiliser le mauvais = auth qui plante silencieusement</li>
          </ul>
        </div>
        <div>
          <p class="explain-title"><span class="dot" style="background:#f97316"></span> Ce que Claude en fait</p>
          <ul class="explain-list">
            <li>Il crée les fichiers au bon endroit sans demander</li>
            <li>Il évite de toucher aux fichiers marqués "ne pas modifier"</li>
            <li>Il choisit automatiquement <code>server.ts</code> pour les API Routes</li>
          </ul>
        </div>
      </div>

      <div class="tip tip-o"><div class="tip-label">💡 Tip</div><p>Ajoutez des avertissements dans les commentaires (<code>ne pas modifier</code>, <code>généré automatiquement</code>, <code>fichier critique</code>). Claude suit ces instructions et évitera de toucher à ces fichiers.</p></div>
    </div></div>
  </div>

  <!-- 06 COMMANDES & WORKFLOW -->
  <div id="s6" class="part-block" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">06</div>
      <div class="part-tag">## Commandes &amp; Workflow</div>
      <div class="part-name">La boîte à outils &amp; le workflow</div>
      <div class="part-time">20:00 → 23:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>3 minutes</span> · Le mode opératoire</div>

      <div class="codeblock">
<span class="c-comment">// Commandes disponibles</span>
<span class="c-val">npm run dev</span>           <span class="c-comment"># dev server</span>
<span class="c-val">npm run build</span>         <span class="c-comment"># vérifier avant commit</span>
<span class="c-val">npm run typecheck</span>     <span class="c-comment"># après chaque série de modifications</span>
<span class="c-hi">/project:migrate</span>      <span class="c-comment"># appliquer les migrations Supabase</span>
<span class="c-hi">/project:typecheck</span>    <span class="c-comment"># typecheck complet</span>
<span class="c-hi">/project:feature</span>      <span class="c-comment"># scaffolding nouvelle feature</span>

<span class="c-comment">// Règles de session</span>
<span class="c-key">Git commit</span> après chaque fonctionnalité qui marche
<span class="c-key">Typecheck</span> systématique après chaque série de modifications
<span class="c-hi">/compact</span> si contexte &gt; <span class="c-hi">50%</span>
Un fichier à la fois — référencer avec chemin complet <span class="c-val">@src/app/...</span>
Phase 1 <span class="c-hi">complète</span> avant de demander Phase 2</div>

      <!-- Context window visual -->
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:1.2rem;margin:1.2rem 0">
        <div style="font-weight:700;font-size:.88rem;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem">
          <span>📊</span> La fenêtre de contexte — pourquoi /compact à 50% est vital
        </div>
        <div style="background:#0d0d14;border-radius:8px;padding:.8rem;margin-bottom:.8rem">
          <div style="display:flex;align-items:center;gap:.8rem;margin-bottom:.4rem">
            <span style="font-size:.75rem;color:var(--muted);min-width:40px">0%</span>
            <div style="flex:1;height:12px;background:var(--border);border-radius:6px;overflow:hidden">
              <div style="height:100%;background:linear-gradient(90deg,#22c55e 0%,#22c55e 50%,#f97316 50%,#f97316 70%,#ef4444 70%,#ef4444 100%);width:100%"></div>
            </div>
            <span style="font-size:.75rem;color:var(--muted)">100%</span>
          </div>
          <div style="display:flex;font-size:.72rem;color:var(--muted);gap:1.5rem;padding-left:48px">
            <span style="color:#22c55e">▲ 0-50% : pleine précision</span>
            <span style="color:#f97316">▲ 50-70% : /compact</span>
            <span style="color:#ef4444">▲ 90%+ : /clear obligatoire</span>
          </div>
        </div>
        <p style="color:var(--muted);font-size:.87rem">Sans le <code>/compact</code> à 50%, Claude atteint sa limite et commence à oublier les conventions du début du fichier. Le code ne respecte plus vos règles — et vous ne comprenez pas pourquoi.</p>
      </div>

      <div class="tip tip-o"><div class="tip-label">💡 Life-saver</div><p>La règle <code>/compact si contexte &gt; 50%</code> est la règle de session la plus importante. Sans ça, Claude atteint sa limite de contexte et commence à <strong>oublier vos conventions</strong>.</p></div>

      <div class="tip tip-p"><div class="tip-label">🔥 Pro tip</div><p>Les slash commands <code>/project:</code> sont des raccourcis personnalisés pour Claude Code. Vous pouvez y mettre des workflows entiers — créer les fichiers, lancer les migrations, scaffolding. Un vrai game-changer pour la productivité !</p></div>
    </div></div>
  </div>

  <!-- 07 METIER & DONNEES -->
  <div id="s7" class="part-block" onclick="toggle(this)">
    <div class="part-header">
      <div class="part-num">07</div>
      <div class="part-tag">## Métier &amp; Données</div>
      <div class="part-name">Multi-tenant, statuts, glossaire</div>
      <div class="part-time">23:00 → 26:00</div>
      <div class="part-toggle">+</div>
    </div>
    <div class="part-body"><div class="part-content">
      <div class="time-badge">⏱ <span>3 minutes</span> · L'architecture des données + le dictionnaire</div>

      <div class="codeblock">
<span class="c-comment">// Multi-tenant</span>
Chaque <span class="c-hi">organization</span> = un client traiteur
<span class="c-key">profiles</span> lie <span class="c-val">auth.users</span> → <span class="c-val">organization</span> + rôle (<span class="c-val">admin</span> | <span class="c-val">operator</span> | <span class="c-val">client</span>)
Toutes les tables ont <span class="c-hi">organization_id</span> + RLS filtrant
Admin interne voit <span class="c-key">toutes</span> les organizations

<span class="c-comment">// Pipeline Kanban</span>
<span class="c-val">veille</span> → <span class="c-val">a_analyser</span> → <span class="c-val">go_nogo</span> → <span class="c-val">en_cours</span> → <span class="c-val">depose</span> → <span class="c-val">resultat</span> → <span class="c-val">archive</span>

<span class="c-comment">// Sources</span>
<span class="c-key">BOAMP</span>, <span class="c-key">JOUE</span>, <span class="c-key">AWS Achat</span>, <span class="c-key">Klekoon</span>

<span class="c-comment">// Pièces DCE</span>
<span class="c-key">RC</span> (Règlement de Consultation), <span class="c-key">CCTP</span>, <span class="c-key">CCAP</span>, <span class="c-key">AE</span>, <span class="c-key">BPU</span>, <span class="c-key">DQE</span></div>

      <!-- Multi-tenant visual -->
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:1.2rem;margin:1.2rem 0">
        <div style="font-weight:700;font-size:.88rem;margin-bottom:1rem">🔒 Isolation des données multi-tenant</div>
        <div style="display:flex;gap:.8rem;flex-wrap:wrap">
          <div style="background:rgba(99,102,241,.1);border:1px solid rgba(99,102,241,.2);border-radius:10px;padding:.8rem;flex:1;min-width:120px">
            <div style="font-size:.78rem;font-weight:700;color:#818cf8;margin-bottom:.4rem">🏢 Traiteur A</div>
            <div style="font-size:.75rem;color:var(--muted)">org_id: abc123<br>Ses AOs uniquement</div>
          </div>
          <div style="background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.15);border-radius:10px;padding:.8rem;flex:1;min-width:120px">
            <div style="font-size:.78rem;font-weight:700;color:#22c55e;margin-bottom:.4rem">🏢 Traiteur B</div>
            <div style="font-size:.75rem;color:var(--muted)">org_id: def456<br>Ses AOs uniquement</div>
          </div>
          <div style="background:rgba(249,115,22,.07);border:1px solid rgba(249,115,22,.2);border-radius:10px;padding:.8rem;flex:1;min-width:120px">
            <div style="font-size:.78rem;font-weight:700;color:#f97316;margin-bottom:.4rem">👑 Admin</div>
            <div style="font-size:.75rem;color:var(--muted)">Voit toutes les organizations</div>
          </div>
        </div>
      </div>

      <div class="tip tip-r"><div class="tip-label">⚠️ Section critique</div><p>Sans cette section, Claude pourrait créer une table sans <code>organization_id</code> — et <strong>casser toute l'isolation des données</strong>. Le traiteur A pourrait voir les AOs du traiteur B. Faille de sécurité catastrophique.</p></div>

      <div class="tip tip-p"><div class="tip-label">🔥 Pro tip</div><p>Mettez les valeurs d'enum <strong>exactement comme dans la base</strong> (snake_case, pas d'accents). Claude copiera ces valeurs verbatim dans le code — zéro risque de typo ou d'incohérence.</p></div>
    </div></div>
  </div>

</section>

<!-- 6 REGLES D'OR -->
<section id="rules" style="padding:5rem 0;background:var(--surface)">
  <div class="wrap">
    <h2 class="sections-title">Les 6 règles d'or</h2>
    <p class="sections-lead" style="margin-bottom:2.5rem">26:00 → 28:00 · La formule magique</p>
    <div class="rules-grid">
      <div class="rule-card">
        <div class="rule-num">RÈGLE 01</div>
        <div class="rule-title">🗡️ Sois tranchant</div>
        <div class="rule-desc">"Zéro", "Jamais", "Toujours" marchent mieux que "Essayez de". Claude respecte les absolus. Les suggestions floues sont ignorées.</div>
      </div>
      <div class="rule-card">
        <div class="rule-num">RÈGLE 02</div>
        <div class="rule-title">👁️ Montre, ne décris pas</div>
        <div class="rule-desc">Un tree de structure ou un bout de code vaut 10 paragraphes. Claude raisonne mieux sur du concret que sur de l'abstrait.</div>
      </div>
      <div class="rule-card">
        <div class="rule-num">RÈGLE 03</div>
        <div class="rule-title">🔒 Pense sécurité d'abord</div>
        <div class="rule-desc">Une section sécurité séparée attire l'attention. Noyée dans les conventions, elle sera ignorée. L'isolation visuelle = l'attention de l'IA.</div>
      </div>
      <div class="rule-card">
        <div class="rule-num">RÈGLE 04</div>
        <div class="rule-title">🔄 Itère ton claude.md</div>
        <div class="rule-desc">Ce fichier évolue avec votre projet. Chaque bug récurrent = une nouvelle règle. C'est un document vivant, pas un fichier écrit une fois.</div>
      </div>
      <div class="rule-card">
        <div class="rule-num">RÈGLE 05</div>
        <div class="rule-title">📖 Définis le vocabulaire</div>
        <div class="rule-desc">Chaque sigle, enum, statut métier doit être listé et expliqué. Claude ne devine pas votre métier — CCTP, BPU, AO ne lui disent rien sans définition.</div>
      </div>
      <div class="rule-card">
        <div class="rule-num">RÈGLE 06</div>
        <div class="rule-title">⚙️ Contrôle la session</div>
        <div class="rule-desc">/compact, commits réguliers, phases séquentielles — empêchent Claude de déraper sur les longs projets. Le garde-fou qui garantit la qualité.</div>
      </div>
    </div>
  </div>
</section>

<!-- FORMULA -->
<section class="formula-wrap wrap">
  <h2>La formule magique</h2>
  <div class="formula">claude.md précis &nbsp;=&nbsp; moins d'hallucinations &nbsp;=&nbsp; code fiable</div>
  <p style="color:var(--muted);max-width:560px;margin:0 auto;font-size:1rem;line-height:1.7">Mon conseil : ne cherchez pas le claude.md parfait du premier coup. Commencez par le contexte métier et la stack. Ajoutez les conventions quand vous voyez Claude faire des erreurs. Chaque minute investie ici vous fera gagner des heures de debug.</p>
</section>

<!-- Q&A -->
<section id="qa" style="padding:3rem 0 6rem">
  <div class="wrap">
    <h2 class="sections-title">Q&amp;A anticipées</h2>
    <p class="sections-lead">28:00 → 30:00</p>
    <div class="qa-grid">
      <div class="qa-item">
        <div class="qa-q">Est-ce que le claude.md marche aussi avec GPT/Cursor ?</div>
        <div class="qa-a">Oui, le concept de fichier de contexte projet existe dans tous les outils (cursor rules pour Cursor, etc.). La structure est similaire — adaptez le format à l'outil.</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Faut-il le mettre dans Git ?</div>
        <div class="qa-a">OUI, absolument. C'est un fichier partagé par toute l'équipe. Tout le monde bénéficie des règles, et elles évoluent avec le projet. Commitez-le dès le début.</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">C'est pas trop long pour Claude ?</div>
        <div class="qa-a">Non — le claude.md est dans le system prompt, lu avant chaque session. Plus il est précis, mieux Claude travaille. L'important : rester sous 200 lignes pour ne pas noyer l'essentiel.</div>
      </div>
      <div class="qa-item">
        <div class="qa-q">Quelle taille idéale ?</div>
        <div class="qa-a">Entre 50 et 200 lignes. Assez pour être complet, pas assez pour noyer l'essentiel. Au-delà de 200 lignes, déléguez le surplus dans des Skills ou des fichiers tasks/.</div>
      </div>
    </div>

    <div style="text-align:center;margin-top:3rem;padding:2rem;background:var(--surface);border:1px solid var(--border);border-radius:16px">
      <div style="font-size:1.1rem;font-weight:700;margin-bottom:.5rem">Formation Daemon IA</div>
      <div style="color:var(--muted);font-size:.9rem">Pour aller plus loin sur Claude Code et l'automatisation IA</div>
      <a href="https://daemon-ia.fr" style="display:inline-block;margin-top:1rem;background:var(--orange);color:white;padding:.6rem 1.6rem;border-radius:8px;font-weight:700;font-size:.9rem;text-decoration:none">daemon-ia.fr</a>
    </div>
  </div>
</section>

<script>
function toggle(el){
  document.querySelectorAll('.part-block').forEach(b=>{if(b!==el)b.classList.remove('open')});
  el.classList.toggle('open');
}
function scrollTo(id){
  var el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}
// Nav active highlight on scroll
var sections=['analogy','s1','s2','s3','s4','s5','s6','s7','rules','qa'];
var pills=document.querySelectorAll('.nav-pill');
window.addEventListener('scroll',function(){
  var y=window.scrollY+100;
  sections.forEach(function(id,i){
    var el=document.getElementById(id);
    if(el&&el.offsetTop<=y&&(i===sections.length-1||document.getElementById(sections[i+1]).offsetTop>y)){
      pills.forEach(function(p){p.classList.remove('active')});
      if(pills[i])pills[i].classList.add('active');
    }
  });
});
</script>
</body>
</html>
`;

function ClaudeMdModal({onClose}) {
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000,display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0a0a0f",borderBottom:"1px solid #2a2a3a",padding:"10px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <span style={{fontFamily:"monospace",color:"#f97316",fontWeight:700,fontSize:14}}>📄 Le CLAUDE.md expliqué</span>
        <button onClick={onClose} style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#f87171",padding:"6px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontWeight:600}}>✕ Fermer</button>
      </div>
      <iframe srcDoc={CLAUDEMD_HTML} style={{flex:1,border:"none",width:"100%"}} title="Le CLAUDE.md expliqué"/>
    </div>
  );
}

const ChkO = () => <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,borderRadius:"50%",background:"rgba(217,119,87,0.15)",border:"1px solid rgba(217,119,87,0.4)",flexShrink:0}}>
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#D97757" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
</span>;

const CdO = ({c}) => <code style={{background:"rgba(217,119,87,0.12)",color:"#f0a882",padding:"2px 7px",borderRadius:4,fontFamily:"monospace",fontSize:"0.85em"}}>{c}</code>;
const PreO = ({children}) => <pre style={S.pre}><code style={{...S.preC,color:"#f0a882"}}>{children}</code></pre>;

function ClaudeCodeGuide({ activeId, onTocClick, onShowClaudeMd }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:72, alignItems:"start" }}>
      <article>
        <div style={{ marginBottom:48 }}>
          <div style={S.badge}>📘 Guide · Mars 2026 · Windows / macOS / Linux</div>
          <h1 style={S.h1}>Guide Complet :<br/><span style={{background:"linear-gradient(135deg,#D97757,#f0a882)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Installer et Utiliser Claude Code</span></h1>
          <p style={{ ...S.p, fontSize:16, fontWeight:300 }}>Par <B c="Daemon IA"/> — daemon-ia.fr · Pas besoin de savoir coder.</p>
          <img src="https://i.imgur.com/likKxCp.jpeg" alt="Guide Claude Code" style={{ width:"100%", borderRadius:12, margin:"24px 0 0", border:"1px solid #1e2235" }}/>
        </div>
        <hr style={S.hr}/>

        {/* ── SECTION 1 ── */}
        <h2 id="cc1" style={S.h2}>1. C'est quoi Claude Code ?</h2>
        <p style={S.p}>Claude Code est un <B c="agent IA qui vit dans votre terminal"/>. Là où claude.ai répond à des questions, Claude Code <B c="agit directement sur votre ordinateur"/> — il lit, écrit, exécute, corrige.</p>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12, margin:"24px 0"}}>
          {[
            {icon:"📂", color:"#4f8ef7", title:"Lit vos fichiers", desc:"Comprend la structure complète de votre projet en quelques secondes"},
            {icon:"✍️", color:"#D97757", title:"Écrit du code", desc:"Crée et modifie des fichiers automatiquement selon vos instructions"},
            {icon:"⚡", color:"#f59e0b", title:"Exécute des commandes", desc:"Installe des outils, lance un serveur, configure un projet"},
            {icon:"🔍", color:"#a78bfa", title:"Corrige les bugs", desc:"Analyse votre code, identifie les erreurs et les répare"},
            {icon:"🌿", color:"#3dd68c", title:"Gère Git", desc:"Commits, branches, historique — tout sans quitter le terminal"},
          ].map(({icon,color,title,desc},i) => (
            <div key={i} style={{padding:"18px 16px", borderRadius:12, background:`${color}0d`, border:`1px solid ${color}25`, display:"flex", flexDirection:"column", gap:10}}>
              <div style={{fontSize:28}}>{icon}</div>
              <div style={{color, fontWeight:700, fontSize:14}}>{title}</div>
              <div style={{color:"#94a3b8", fontSize:13, lineHeight:1.6}}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{padding:"20px 24px", borderRadius:14, background:"linear-gradient(135deg,rgba(217,119,87,0.08),rgba(217,119,87,0.03))", border:"1px solid rgba(217,119,87,0.2)", display:"flex", gap:16, alignItems:"flex-start", margin:"8px 0 0"}}>
          <span style={{fontSize:24, flexShrink:0}}>💡</span>
          <p style={{...S.p, margin:0}}><B c="Analogie :"/> Si Claude sur claude.ai est un <B c="conseiller"/> qui vous donne des idées, Claude Code est l'<B c="ouvrier"/> qui entre dans votre atelier et construit ce que vous lui demandez — concrètement, maintenant.</p>
        </div>
        <hr style={S.hr}/>
        <h2 id="cc2" style={S.h2}>2. Quel abonnement choisir ?</h2>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⚠️ <B c="Claude Code n'est PAS disponible avec le plan gratuit."/></p></div>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Plan</th><th style={S.th}>Prix</th><th style={{ ...S.th, textAlign:"center" }}>Claude Code ?</th><th style={S.th}>Idéal pour</th></tr></thead>
            <tbody>{[["Gratuit","0 $",<span style={{color:"#f87171"}}>❌ Non</span>,"Tester le chat seulement"],["Pro","20 $/mois",<ChkO/>,"Débutants, petits projets"],["Max 5x","100 $/mois",<ChkO/>,"Utilisation régulière"],["Max 20x","200 $/mois",<ChkO/>,"Développeurs pro"]].map(([n,p,c,id],i) => (
              <tr key={i}><td style={S.td}><B c={n}/></td><td style={S.td}>{p}</td><td style={{ ...S.td, textAlign:"center" }}>{c}</td><td style={S.td}>{id}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⚠️ <B c="Ne choisissez PAS Anthropic Console account"/> — c'est la facturation API qui peut dépasser <B c="des centaines d'euros en un mois"/> d'utilisation intensive. Choisissez toujours <B c="Option 1 : Claude account with subscription"/>.</p></div>

        {/* ── SECTION 3 ── */}
        <hr style={S.hr}/>
        <h2 id="cc3" style={S.h2}>3. Prérequis : ce qu'il faut installer AVANT</h2>
        <h3 style={S.h3}>3.1 — Git (obligatoire sur Windows)</h3>
        <p style={S.p}>Sur Windows, Claude Code utilise Git Bash en interne. Sans Git, Claude Code ne peut pas fonctionner.</p>
        <p style={{ ...S.p, fontWeight:600, color:"#e4e4e7" }}>🪟 Windows :</p>
        <ol style={{ ...S.ul, listStyleType:"decimal" }}>
          <li style={S.li}>Allez sur <a href="https://git-scm.com/downloads/win" target="_blank" rel="noopener noreferrer" style={{color:"#D97757",fontFamily:"monospace",textDecoration:"none"}}>git-scm.com/downloads/win</a></li>
          <li style={S.li}>Téléchargez l'installateur 64-bit</li>
          <li style={S.li}>Cliquez Next à chaque étape puis Install</li>
        </ol>
        <div style={{display:"flex",gap:16,flexWrap:"nowrap",justifyContent:"center",margin:"14px 0",alignItems:"flex-start"}}>
          <div style={{flex:"0 0 48%",minWidth:0}}>
            <ImgScreen src="https://i.imgur.com/JYeGsVc.jpeg" caption="Page de téléchargement Git pour Windows"/>
          </div>
          <div style={{flex:"0 0 48%",minWidth:0}}>
            <ImgScreen src="https://i.imgur.com/NCSak8c.jpeg" caption="Installateur Git — écran licence GNU"/>
          </div>
        </div>
        <PreO>git --version</PreO>
        <p style={{ ...S.p, fontWeight:600, color:"#e4e4e7" }}>🍎 macOS / 🐧 Linux :</p>
        <PreO>{`brew install git\n# ou\nsudo apt install git -y`}</PreO>
        <h3 style={S.h3}>3.2 — Node.js (fortement recommandé)</h3>
        <p style={S.p}>Nécessaire pour les projets web (React, Next.js, Vite…) et les serveurs MCP.</p>
        <ImgScreen solo={true} src="https://i.imgur.com/WdEYfkA.jpeg" caption="Page de téléchargement Node.js — nodejs.org/en/download"/>
        <PreO>{`node -v   # ex: v24.x.x\nnpm -v    # ex: 11.x.x`}</PreO>
        <ImgScreen solo={true} src="https://i.imgur.com/7EzV6gg.jpeg" caption="Vérification des versions Node.js et npm dans PowerShell"/>

        {/* ── SECTION 4 ── */}
        <hr style={S.hr}/>
        <h2 id="cc4" style={S.h2}>4. Installer Claude Code</h2>
        <p style={S.p}>Rendez-vous sur <a href="https://code.claude.com/docs/fr/setup" target="_blank" rel="noopener noreferrer" style={{color:"#D97757",fontFamily:"monospace",textDecoration:"none"}}>code.claude.com/docs/fr/setup</a> pour la documentation officielle.</p>
        <ImgScreen solo={true} src="https://i.imgur.com/DTNJdfg.jpeg" caption="Page officielle — méthodes d'installation natives (Recommended), Homebrew, WinGet"/>
        <p style={{ ...S.p, fontWeight:600, color:"#e4e4e7" }}>🍎 macOS / 🐧 Linux / WSL :</p>
        <PreO>curl -fsSL https://claude.ai/install.sh | bash</PreO>
        <p style={{ ...S.p, fontWeight:600, color:"#e4e4e7" }}>🪟 Windows — PowerShell :</p>
        <PreO>irm https://claude.ai/install.ps1 | iex</PreO>
        <ImgScreen solo={true} src="https://i.imgur.com/kMO9F7Y.jpeg" caption="Exécution de la commande d'installation dans Windows PowerShell"/>
        <p style={{ ...S.p, fontWeight:600, color:"#e4e4e7" }}>🪟 Windows — CMD :</p>
        <PreO>curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd</PreO>
        <div style={S.bqY}><p style={{ ...S.p, margin:0 }}>⚠️ <B c="Windows nécessite Git for Windows."/> Installez-le en premier si ce n'est pas fait (voir section 3.1).</p></div>
        <h3 style={S.h3}>Vérifier l'installation</h3>
        <PreO>claude --version</PreO>
        <ImgScreen solo={true} src="https://i.imgur.com/3USY6II.jpeg" caption="Installation réussie — Claude Code v2.1.77 confirmé"/>

        {/* ── SECTION 5 ── */}
        <hr style={S.hr}/>
        <h2 id="cc5" style={S.h2}>5. Premier lancement et authentification</h2>
        <PreO>claude</PreO>
        <div style={{display:"flex",gap:16,flexWrap:"nowrap",justifyContent:"center",margin:"14px 0",alignItems:"flex-start"}}>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/8NrSxQA.jpeg" caption="Premier lancement — choix du thème (Dark/Light mode)"/></div>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/wdm2WOl.jpeg" caption="Écran de sélection de la méthode de connexion"/></div>
        </div>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⛔ <B c="Choisissez toujours l'Option 1 : Claude account with subscription"/><br/>N'utilisez jamais "Anthropic Console account" (Option 2) — facturation API à l'usage, peut coûter des centaines d'euros en un mois.</p></div>
        <ImgScreen src="https://i.imgur.com/VuZZULx.jpeg" caption="Fenêtre d'autorisation — Claude Code demande accès à votre compte Claude"/>
        <p style={S.p}>Votre navigateur s'ouvre. Cliquez <B c="Autoriser"/>. Une fois validé :</p>
        <div style={{display:"flex",gap:16,flexWrap:"nowrap",justifyContent:"center",margin:"14px 0",alignItems:"flex-start"}}>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/lX06oHP.jpeg" caption="Build something great — configuration réussie, fermez la fenêtre"/></div>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/Nfu3yqK.jpeg" caption="Retour dans le terminal — Login successful, email affiché"/></div>
        </div>
        <p style={S.p}>Claude affiche ensuite les <B c="Security notes"/> — lisez-les et appuyez sur Entrée :</p>
        <ImgScreen src="https://i.imgur.com/UQ2wzvn.jpeg" caption="Notes de sécurité importantes — Claude peut faire des erreurs, relisez toujours"/>
        <p style={S.p}>Vous pouvez maintenant discuter avec Claude Code. Testez avec <CdO c="Qui es-tu ?"/> :</p>
        <div style={{display:"flex",gap:12,flexWrap:"nowrap",justifyContent:"center",margin:"14px 0",alignItems:"flex-start"}}>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/iClefhx.jpeg" caption="Interface Claude Code opérationnelle — bienvenue !"/></div>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/n9S5k5H.jpeg" caption='Claude répond à "Qui es-tu ?"'/></div>
        </div>
        <h3 style={S.h3}>Si vous avez déjà un compte — /logout puis re-connexion</h3>
        <p style={S.p}>Si Claude Code était déjà installé avec un autre compte, faites d'abord <CdO c="/logout"/>, puis retapez <CdO c="claude"/> et choisissez votre thème :</p>
        <ImgScreen src="https://i.imgur.com/8NrSxQA.jpeg" caption="Écran de sélection du thème après /logout — choisissez Dark mode"/>

        {/* ── SECTION 6 ── */}
        <hr style={S.hr}/>
        <h2 id="cc6" style={S.h2}>6. Travailler dans un dossier projet</h2>
        <p style={S.p}><B c="Règle d'or :"/> Claude Code fonctionne dans le dossier courant. Créez toujours un dossier dédié par projet, et naviguez dedans <B c="avant"/> de lancer Claude Code.</p>
        <p style={S.p}>Créez votre dossier via l'Explorateur Windows :</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",margin:"14px 0"}}>
          <ImgScreen src="https://i.imgur.com/QOBFhBb.jpeg" caption="Créer un nouveau dossier dans l'Explorateur Windows"/>
          <ImgScreen src="https://i.imgur.com/RLzZPEp.jpeg" caption="Dossier créé et nommé pour votre projet Claude Code"/>
        </div>
        <p style={S.p}>Ensuite dans PowerShell, naviguez dans ce dossier :</p>
        <PreO>{`cd C:\\Users\\VotreNom\\Documents\\IA\\CLAUDE\\MonProjet\n\n# macOS / Linux\nmkdir -p ~/Documents/IA/CLAUDE/MonProjet\ncd ~/Documents/IA/CLAUDE/MonProjet`}</PreO>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",margin:"14px 0"}}>
          <ImgScreen src="https://i.imgur.com/1wk8QP0.jpeg" caption="Navigation vers le dossier projet dans PowerShell"/>
          <ImgScreen src="https://i.imgur.com/41E95J5.jpeg" caption="Commande cd exécutée — vous êtes dans le dossier projet"/>
        </div>
        <p style={S.p}>Tapez <CdO c="claude"/> — Claude vous demande si vous faites confiance au dossier :</p>
        <div style={{display:"flex",gap:16,flexWrap:"nowrap",justifyContent:"center",margin:"14px 0",alignItems:"flex-start"}}>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/tc0Dg3E.jpeg" caption="Security check — choisissez 1. Yes, I trust this folder"/></div>
          <div style={{flex:"0 0 48%",minWidth:0}}><ImgScreen src="https://i.imgur.com/t74GK6X.jpeg" caption="Claude Code lancé dans le dossier projet — prêt à coder"/></div>
        </div>
        <p style={S.p}>Choisissez <B c="1 — Yes, I trust this folder"/>. Claude Code est maintenant actif <B c="dans votre projet uniquement"/> :</p>

        {/* ── SECTION 7 ── */}
        <hr style={S.hr}/>
        <h2 id="cc7" style={S.h2}>7. Utiliser Claude Code dans VS Code</h2>
        <p style={S.p}>VS Code est l'éditeur recommandé. Ouvrez votre dossier projet avec <B c="File → Open Folder"/> :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/RT6tS1P.jpeg" caption="File → Open Folder dans VS Code — sélectionnez votre dossier projet"/>
        <ImgScreen solo={true} src="https://i.imgur.com/y5elErI.jpeg" caption="Structure du projet visible dans l'explorateur VS Code"/>
        <p style={S.p}>Ouvrez le terminal intégré (Terminal → New Terminal ou <CdO c="Ctrl + `"/>) puis tapez <CdO c="claude"/> :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/8L7uOIt.jpeg" caption="Claude Code lancé dans le terminal intégré VS Code"/>

        <h3 style={S.h3}>Terminal CLI vs Panneau de chat VS Code</h3>
        <p style={S.p}>VS Code propose deux façons d'utiliser Claude Code. Le panneau de chat est pratique pour démarrer, mais le terminal CLI donne accès à tout.</p>

        <div style={{overflowX:"auto", margin:"16px 0"}}>
          <table style={S.tbl}>
            <thead>
              <tr>
                <th style={S.th}>Fonctionnalité</th>
                <th style={{...S.th, textAlign:"center", color:"#D97757"}}>⌨️ Terminal CLI</th>
                <th style={{...S.th, textAlign:"center", color:"#818cf8"}}>💬 Chat VS Code</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Discuter, coder, corriger des bugs",                   "✓","✓"],
                ["Voir et modifier des fichiers",                         "✓","✓"],
                ["Checkpoints (rembobiner les changements)",              "✓","✓"],
                ["Historique de conversations",                           "✓","✓"],
                ["Commandes /plan, /model, /theme, /voice…",             "✓","partiel"],
                ["Raccourci ! pour exécuter un bash directement",        "✓","✗"],
                ["Complétion par tabulation des commandes",               "✓","✗"],
                ["Configurer des serveurs MCP depuis zéro",              "✓","✗"],
                ["Lancer claude --resume pour reprendre une session",    "✓","✗"],
                ["Utiliser des sous-agents parallèles (subagents)",      "✓","✗"],
              ].map(([feat, cli, chat], i) => (
                <tr key={i}>
                  <td style={S.td}>{feat}</td>
                  <td style={{...S.td, textAlign:"center", color: cli==="✓"?"#3dd68c":"#f87171", fontWeight:600}}>{cli}</td>
                  <td style={{...S.td, textAlign:"center", color: chat==="✓"?"#3dd68c": chat==="partiel"?"#f59e0b":"#f87171", fontWeight:600}}>{chat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{padding:"16px 20px", borderRadius:12, background:"rgba(61,214,140,0.06)", border:"1px solid rgba(61,214,140,0.15)", display:"flex", gap:12, alignItems:"flex-start"}}>
          <span style={{fontSize:18, flexShrink:0}}>💡</span>
          <p style={{...S.p, margin:0, fontSize:14}}>Vous pouvez <B c="basculer entre les deux"/> à tout moment. Ouvrez le terminal intégré (<CdO c="Ctrl+`"/>) et tapez <CdO c="claude"/> pour le CLI. Utilisez <CdO c="claude --resume"/> pour reprendre une conversation du chat dans le terminal.</p>
        </div>

        {/* ── SECTION 8 ── */}
        <hr style={S.hr}/>
        <h2 id="cc8" style={S.h2}>8. Commandes essentielles</h2>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Commande</th><th style={S.th}>Ce qu'elle fait</th></tr></thead>
            <tbody>{[["/exit","Quitter — affiche l'ID de session pour reprendre plus tard"],["/clear","Effacer l'historique de la conversation"],["/config","Ouvrir le panneau de configuration"],["/usage","Voir la consommation de tokens et les coûts"],["/theme","Changer le thème visuel"],["/voice","Activer le mode vocal"],["/model","Changer de modèle IA"],["/init","Créer CLAUDE.md — la mémoire du projet"],["/plan","Mode Plan : Claude réfléchit avant d'agir"],["/agents","Gérer les sous-agents"],["/logout","Se déconnecter (pour changer de compte)"]].map(([c,d],i) => (
              <tr key={i}><td style={S.td}><CdO c={c}/></td><td style={S.td}>{d}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",margin:"14px 0"}}>
          <ImgScreen src="https://i.imgur.com/oqRgb8T.jpeg" caption="Vue des commandes /config, /usage, /agents dans VS Code"/>
          <ImgScreen src="https://i.imgur.com/PmOBjOJ.jpeg" caption="/exit — Claude affiche l'ID de session pour reprendre plus tard"/>
        </div>
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>💡 <B c="Conseil :"/> Appuyez sur <B c="Shift+Tab"/> pour activer le <B c="plan mode"/>. Claude explique tout ce qu'il va faire avant d'agir — idéal pour apprendre et contrôler.</p></div>
        <div style={{margin:"20px 0",padding:"20px 24px",borderRadius:14,background:"linear-gradient(135deg,rgba(249,115,22,0.08),rgba(249,115,22,0.03))",border:"1px solid rgba(249,115,22,0.25)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
          <div>
            <div style={{fontWeight:700,color:"#f97316",fontSize:15,marginBottom:4}}>📄 Le CLAUDE.md expliqué</div>
            <div style={{fontSize:13,color:"#94a3b8"}}>La commande <CdO c="/init"/> crée le CLAUDE.md — le fichier le plus important de votre projet. Découvrez comment le rédiger section par section.</div>
          </div>
          <button onClick={onShowClaudeMd} style={{background:"#f97316",color:"white",border:"none",padding:"10px 22px",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>Voir le guide →</button>
        </div>
        <h3 style={S.h3}>Reprendre une session précédente</h3>
        <p style={S.p}>Après un <CdO c="/exit"/>, Claude affiche un ID de session. Pour reprendre :</p>
        <PreO>claude --resume 760af073-4f3c-4cbc-9ba0-34fd3bc66592</PreO>

        {/* ── SECTION 9 ── */}
        <hr style={S.hr}/>
        <h2 id="cc9" style={S.h2}>9. Les outils avancés de Claude Code</h2>
        <div style={{margin:"18px 0", textAlign:"center"}}>
          <img src="https://i.imgur.com/oqzuzqc.png" alt="Outils Claude Code" style={{maxWidth:"100%", width:"100%", display:"block", borderRadius:16, border:"none"}}/>
          <p style={{fontSize:12, color:"#64748b", marginTop:8, fontStyle:"italic"}}>Tous les outils disponibles : Commandes, Hooks, Skill, Memory, MCP, Subagent…</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14, marginTop:16 }}>
          {[
            ["Commandes",<span style={{color:"#D97757",fontFamily:"monospace",fontSize:13}}>/ma-commande</span>,"Instructions personnalisées pour actions répétitives. Ex : un manager tape /newsletter pour préparer et envoyer un email type sans repartir de zéro."],
            ["Hooks","Déclencheurs automatiques","Actions qui s'exécutent à des moments précis. Ex : un comptable configure un hook qui vérifie et formate automatiquement chaque facture après modification."],
            ["Skills","Fichiers SKILL.md","Compétences packagées chargées à la demande. Ex : un graphiste dit 'crée un visuel pub', et la skill dédiée applique automatiquement sa charte graphique."],
            ["Memory","Mémoire persistante","Claude se souvient d'infos entre sessions — préférences, contexte du projet, fournisseurs préférés, budgets passés."],
            ["MCP","Model Context Protocol","Connecte Claude à des outils externes : APIs, bases de données, CRM, Slack, etc. Un vendeur lie MCP à son CRM : Claude récupère les leads et envoie des emails personnalisés."],
            ["Subagents","Mini-agents parallèles","Agents spécialisés travaillant en parallèle. Ex : un recruteur lance un subagent pour analyser des CVs pendant qu'il discute stratégie avec Claude principal."],
          ].map(([t,badge,d],i) => (
            <div key={i} style={{ ...S.card, display:"flex", gap:16 }}>
              <div style={{ width:6, borderRadius:3, background:`hsl(${i*30+20},70%,60%)`, flexShrink:0 }}/>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <h3 style={{ ...S.h3, marginTop:0, marginBottom:0 }}>{t}</h3>
                  <span style={{fontSize:12,color:"#D97757",fontFamily:"monospace",background:"rgba(217,119,87,0.1)",padding:"1px 8px",borderRadius:4}}>{badge}</span>
                </div>
                <p style={{ ...S.p, margin:0, fontSize:14 }}>{d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION 10 ── */}
        <hr style={S.hr}/>
        <h2 id="cc10" style={S.h2}>10. Écrire son premier prompt de projet</h2>
        <p style={S.p}>Voici un exemple concret de prompt utilisé dans ce guide — une application de génération de lead magnets :</p>
        <PreO>{`Dans ce dossier, crée une application ViteJS avec React qui permet\nde générer automatiquement des lead magnets ultra-convertissants.\n\nL'utilisateur peut entrer :\n- sa niche\n- son offre principale\n- sa cible (SaaS, coach, e-commerce)\n- le problème principal de son audience\n- le résultat promis\n\nL'application génère automatiquement :\n- 5 idées de lead magnets à fort potentiel\n- un titre optimisé pour la conversion\n- une promesse claire et irrésistible\n- un plan détaillé du contenu\n\nUtilise une architecture propre avec :\n- components (UI)\n- hooks (logique)\n- services (génération, scoring)\n- utils (helpers)\n- types (TypeScript)\n\nCommence par faire des recherches web sur les commandes\npour installer ViteJS + React + shadcn UI à jour.`}</PreO>
        <p style={S.p}>Claude va d'abord faire des recherches web pour trouver les commandes à jour, puis vous demander de valider :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/EBPNNeI.jpeg" caption="Claude effectue ses recherches web — il demande votre autorisation avant chaque action"/>
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>💡 Choisissez <B c="2. Yes, and don't ask again" /> pour les recherches web — Claude ne bloquera plus à chaque étape.</p></div>
        <p style={S.p}>Claude code ensuite votre projet en temps réel. Vous voyez les fichiers s'écrire :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/OBWSanj.jpeg" caption="Claude Code en train d'écrire les fichiers — mode accept edits activé"/>
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>💡 <B c="Shift+Tab"/> active le <B c="plan mode"/> : Claude vous explique sa stratégie avant d'agir. Recommandé pour les débutants.</p></div>
        <ImgScreen solo={true} src="https://i.imgur.com/lHkMIID.jpeg" caption="Mode plan activé — Claude réfléchit et explique avant de coder"/>

        {/* ── SECTION 11 ── */}
        <hr style={S.hr}/>
        <h2 id="cc11" style={S.h2}>11. FAQ & Dépannage</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {[
            ["Claude Code ne se lance pas — command not found","Le chemin d'installation n'est pas dans votre PATH. Fermez et rouvrez PowerShell. Sur Mac/Linux : ajoutez export PATH=\"$HOME/.local/bin:$PATH\" dans votre ~/.bashrc puis relancez le terminal."],
            ["requires a Pro, Max, Teams, Enterprise, or Console account","Votre plan gratuit ne suffit pas. Rendez-vous sur claude.com/pricing pour souscrire au plan Pro minimum (20$/mois)."],
            ["La connexion échoue dans le navigateur","Vérifiez que vous êtes connecté à claude.ai dans votre navigateur. Essayez /logout dans Claude Code puis relancez claude."],
            ["Claude Code est très lent","Vérifiez votre connexion internet. Le modèle Opus est plus lent que Sonnet. Tapez /model pour changer."],
            ["Comment mettre à jour Claude Code ?","L'installateur natif se met à jour automatiquement. Homebrew : brew upgrade claude-code. WinGet : winget upgrade Anthropic.ClaudeCode"],
            ["Comment désinstaller Claude Code ?","Tapez claude uninstall dans votre terminal (fonctionne sur tous les systèmes)."],
          ].map(([q,a],i) => (
            <div key={i} style={S.card}>
              <h3 style={{ ...S.h3, marginTop:0, marginBottom:8, fontSize:"1rem" }}>{q}</h3>
              <p style={{ ...S.p, margin:0, fontSize:14 }}>{a}</p>
            </div>
          ))}
        </div>
        <hr style={S.hr}/>
        <h2 style={S.h2}>Liens utiles</h2>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Ressource</th><th style={S.th}>URL</th></tr></thead>
            <tbody>{[
              ["Documentation officielle","https://code.claude.com/docs"],
              ["Page de setup (FR)","https://code.claude.com/docs/fr/setup"],
              ["Tarifs Claude","https://claude.com/pricing"],
              ["Tarifs API (à éviter)","https://platform.claude.com/docs/en/about-claude/pricing"],
              ["Git","https://git-scm.com"],
              ["Node.js","https://nodejs.org"],
              ["VS Code","https://code.visualstudio.com"],
              ["shadcn/ui","https://ui.shadcn.com"],
            ].map(([r,u],i) => (
              <tr key={i}>
                <td style={S.td}><B c={r}/></td>
                <td style={S.td}><a href={u} target="_blank" rel="noopener noreferrer" style={{ color:"#D97757", fontFamily:"monospace", fontSize:13, textDecoration:"none" }} onMouseEnter={e=>e.currentTarget.style.textDecoration="underline"} onMouseLeave={e=>e.currentTarget.style.textDecoration="none"}>{u.replace("https://","")}</a></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <hr style={S.hr}/>
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>Ce tutoriel a été rédigé par <B c="Daemon IA"/>. Pour des formations sur Claude Code, l'automatisation IA et n8n : <span style={{ color:"#D97757", fontFamily:"monospace" }}>daemon-ia.fr</span></p></div>
      </article>
      <Toc items={CC_TOC} activeId={activeId} onTocClick={onTocClick} accentColor="#D97757"/>
    </div>
  );
}


const BUILDER_HTML = `
<!DOCTYPE html>
<html lang="fr" data-theme="light" style=""><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Setup Claude Code — Guide Complet LeadPilot</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet">
    <style>
      /* Reset & Base */
      :root {
        --bg-color: #0a0a0f;
        --card-bg: rgba(22, 27, 34, 0.7);
        --text-primary: #e6edf3;
        --text-secondary: #8b949e;
        --accent-blue: #2563eb;
        --accent-purple: #a78bfa;
        --accent-orange: #f97316;
        --border-color: #30363d;
        --code-bg: #0d1117;
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        scroll-behavior: smooth;
        overflow-x: hidden;
      }

      body {
        font-family:
          'Inter',
          system-ui,
          -apple-system,
          sans-serif;
        background-color: var(--bg-color);
        color: var(--text-primary);
        line-height: 1.6;
        width: 100%;
        overflow-x: hidden;
        max-width: 100%;
      }

      /* Typography */
      h1,
      h2,
      h3,
      h4 {
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 1rem;
      }

      h2 {
        font-size: 2rem;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
        position: relative;
      }

      h3 {
        font-size: 1.5rem;
        color: #58a6ff;
        margin-top: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      p {
        margin-bottom: 1rem;
        color: #c9d1d9;
      }

      /* HERO SECTION - CRITIQUE */
      .hero-section {
        position: relative;
        width: 100%;
        height: 420px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .hero-bg {
        display: none;
      }
      .hero-section {
        background-image: url(https://i.imgur.com/G0u8zSn.png);
        background-size: cover;
        background-position: center;
      }

      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(10, 10, 15, 0.5) 0%,
          rgba(10, 10, 15, 0.8) 60%,
          rgba(10, 10, 15, 1) 100%
        );
        z-index: 2;
      }

      .hero-content {
        position: relative;
        z-index: 3;
        width: 90%;
        max-width: 1200px;
      }

      .hero-title {
        font-size: 4rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        background: linear-gradient(180deg, #ffffff 0%, #a5b4fc 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        letter-spacing: -0.02em;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        color: #94a3b8;
        margin-bottom: 2.5rem;
        font-weight: 500;
      }

      .hero-badges {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        flex-wrap: wrap;
      }

      .hero-badge {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #ffffff;
        font-weight: 600;
        font-size: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .hero-badge:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
      }

      /* Navigation Sticky */
      .sticky-nav {
        position: sticky;
        top: 0;
        z-index: 1000;
        background: rgba(10, 10, 15, 0.85);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding: 1rem 2rem;
        width: 100%;
      }

      .nav-container {
        max-width: 1600px;
        margin: 0 auto;
        display: flex;
        gap: 1.5rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        scrollbar-width: none;
      }

      .nav-container::-webkit-scrollbar {
        display: none;
      }

      .nav-link {
        color: #8b949e;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 600;
        white-space: nowrap;
        transition: color 0.2s;
        padding: 0.25rem 0;
        position: relative;
      }

      .nav-link:hover {
        color: #ffffff;
      }

      .nav-link.active {
        color: #60a5fa;
      }

      .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #60a5fa;
      }

      /* Layout Content */
      .container {
        width: 95%;
        max-width: 1600px;
        margin: 4rem auto;
        padding-bottom: 4rem;
      }

      /* Cards & Sections */
      .glass-card {
        background: var(--card-bg);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        padding: 2rem;
        margin-bottom: 2rem;
        transition: all 0.3s ease;
      }

      .glass-card:hover {
        border-color: #58a6ff;
        box-shadow: 0 0 30px rgba(37, 99, 235, 0.1);
      }

      /* Tables */
      .table-container {
        overflow-x: auto;
        margin: 1.5rem 0;
        border-radius: 8px;
        border: 1px solid var(--border-color);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
        min-width: 800px; /* Prevent squishing on small screens */
      }

      th {
        background: linear-gradient(90deg, #1e3a5f 0%, #1e1b4b 100%);
        color: #ffffff;
        text-align: left;
        padding: 1rem 1.5rem;
        font-weight: 600;
        border-bottom: 1px solid var(--border-color);
      }

      td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid rgba(48, 54, 61, 0.5);
        color: #c9d1d9;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:hover td {
        background: rgba(88, 166, 255, 0.05);
        color: #ffffff;
      }

      /* Code Blocks */
      pre {
        background: var(--code-bg);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 1.5rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
        color: #e6edf3;
      }

      code {
        font-family: 'JetBrains Mono', monospace;
        background: rgba(110, 118, 129, 0.4);
        padding: 0.2em 0.4em;
        border-radius: 4px;
        font-size: 0.85em;
        color: #e6edf3;
      }

      pre code {
        background: transparent;
        padding: 0;
        color: inherit;
        font-size: inherit;
      }

      /* Syntax Highlighting Simulation */
      .token-comment {
        color: #8b949e;
      }
      .token-command {
        color: #f2cc60;
        font-weight: bold;
      } /* Yellow for main commands */
      .token-string {
        color: #a5d6ff;
      } /* Blue for strings */
      .token-keyword {
        color: #ff7b72;
      } /* Red for keywords */
      .token-function {
        color: #d2a8ff;
      } /* Purple for functions */

      /* Badges & Pills */
      .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.8rem;
        font-weight: 600;
        margin-right: 0.5rem;
      }

      .badge-blue {
        background: rgba(56, 139, 253, 0.15);
        color: #58a6ff;
        border: 1px solid rgba(56, 139, 253, 0.4);
      }
      .badge-green {
        background: rgba(46, 160, 67, 0.15);
        color: #3fb950;
        border: 1px solid rgba(46, 160, 67, 0.4);
      }
      .badge-orange {
        background: rgba(210, 153, 34, 0.15);
        color: #d29922;
        border: 1px solid rgba(210, 153, 34, 0.4);
      }
      .badge-red {
        background: rgba(248, 81, 73, 0.15);
        color: #f85149;
        border: 1px solid rgba(248, 81, 73, 0.4);
      }

      /* Grid Layouts */
      .grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
      }

      .grid-3 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
      }

      /* Checkboxes */
      .checklist-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        background: rgba(255, 255, 255, 0.03);
        padding: 0.75rem;
        border-radius: 6px;
        border: 1px solid transparent;
      }

      .checklist-item:hover {
        border-color: rgba(255, 255, 255, 0.1);
        background: rgba(255, 255, 255, 0.05);
      }

      .check-icon {
        color: #3fb950;
        margin-right: 1rem;
        font-size: 1.2rem;
      }

      /* Footer */
      footer {
        text-align: center;
        padding: 4rem 2rem;
        color: #8b949e;
        border-top: 1px solid var(--border-color);
        margin-top: 4rem;
      }

      /* Scrollbar Custom */
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #0a0a0f;
      }
      ::-webkit-scrollbar-thumb {
        background: #30363d;
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #58a6ff;
      }
    </style>
  </head>
  <body style="">
    <!-- HERO SECTION -->
    <div class="hero-section">

      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Setup Claude Code</h1>
        <div class="hero-subtitle">Guide Complet LeadPilot</div>
        <div class="hero-badges">
          <div class="hero-badge">79 endpoints BeReach</div>
          <div class="hero-badge">12 phases</div>
          <div class="hero-badge">6 Superpowers</div>
          <div class="hero-badge">3 MCP Servers</div>
        </div>
      </div>
    </div>

    <!-- STICKY NAVIGATION -->
    <nav class="sticky-nav">
      <div class="nav-container">
        <a href="#phase0" class="nav-link">Vue d'ensemble</a>
        <a href="#phase1" class="nav-link">1. Install</a>
        <a href="#phase2" class="nav-link">2. Init</a>
        <a href="#phase3" class="nav-link">3. Permissions</a>
        <a href="#phase4" class="nav-link">4. CLAUDE.md</a>
        <a href="#phase5" class="nav-link">5. Skills</a>
        <a href="#phase6" class="nav-link">6. Hooks</a>
        <a href="#phase7" class="nav-link">7. MCP</a>
        <a href="#phase8" class="nav-link">8. Commands</a>
        <a href="#phase9" class="nav-link">9. GSD</a>
        <a href="#phase10" class="nav-link">10. Monitor</a>
        <a href="#phase11" class="nav-link">11. Sécurité</a>
        <a href="#phase12" class="nav-link">12. Mémoire</a>
      </div>
    </nav>

    <div class="container">
      <!-- PHASE 0: VUE D'ENSEMBLE -->
      <section id="phase0" class="glass-card">
        <h2>Phase 0 : Vue d'ensemble</h2>
        <p>
          Avant de toucher une ligne de code, voici tout ce qu'on va mettre en place et pourquoi chaque élément est
          nécessaire. Rien n'est superflu : chaque outil résout un problème précis.
        </p>

        <div class="grid-2">
          <div>
            <h3>🛠️ L'outil principal</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Outil</th>
                    <th>C'est quoi</th>
                    <th>Pourquoi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Claude Code CLI</strong></td>
                    <td>Agent IA autonome terminal</td>
                    <td>Moteur principal qui construit le projet</td>
                  </tr>
                  <tr>
                    <td><strong>Extension VS Code</strong></td>
                    <td>Interface graphique temps réel</td>
                    <td>Visualiser les modifs en live</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3>⚙️ Configuration projet</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Fichier</th>
                    <th>Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>CLAUDE.md</code></td>
                    <td>Mémoire permanente (lue à chaque session)</td>
                  </tr>
                  <tr>
                    <td><code>REVIEW.md</code></td>
                    <td>Critères de validation avant merge</td>
                  </tr>
                  <tr>
                    <td><code>.claude/settings.json</code></td>
                    <td>Permissions de sécurité (allow/deny)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div>
            <h3>🧠 Les Skills (Connaissances)</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Superpowers</strong></td>
                    <td>Pack de 6 skills (TDD, debug, review...)</td>
                  </tr>
                  <tr>
                    <td><strong>frontend-design</strong></td>
                    <td>UI production-grade (anti-générique)</td>
                  </tr>
                  <tr>
                    <td><strong>shadcn/ui</strong></td>
                    <td>Connaissance des composants installés</td>
                  </tr>
                  <tr>
                    <td><strong>skill-bereach-api</strong></td>
                    <td>Les 79 endpoints et règles de l'API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3>🪝 Les Hooks (Automatisation)</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Hook</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>session-start</strong></td>
                    <td>Charge l'état du projet au démarrage</td>
                  </tr>
                  <tr>
                    <td><strong>pre-bash-security</strong></td>
                    <td>Bloque les commandes dangereuses</td>
                  </tr>
                  <tr>
                    <td><strong>post-bash</strong></td>
                    <td>Tronque les outputs trop longs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="grid-3">
          <div class="glass-card" style="margin-bottom: 0; padding: 1.5rem">
            <h4 style="color: var(--accent-blue)">🔌 MCP Servers</h4>
            <ul style="list-style: none; margin-top: 1rem">
              <li style="margin-bottom: 0.5rem"><strong>Context7</strong> : Docs à jour Next.js/Supabase</li>
              <li style="margin-bottom: 0.5rem"><strong>Playwright</strong> : Pilotage navigateur pour tests</li>
              <li><strong>Sequential Thinking</strong> : Raisonnement par étapes</li>
            </ul>
          </div>
          <div class="glass-card" style="margin-bottom: 0; padding: 1.5rem">
            <h4 style="color: var(--accent-purple)">💾 Mémoire Persistante</h4>
            <ul style="list-style: none; margin-top: 1rem">
              <li style="margin-bottom: 0.5rem"><strong>Claude-Mem</strong> : Plugin essentiel</li>
              <li style="margin-bottom: 0.5rem">SQLite + ChromaDB local</li>
              <li>Rinjecte le contexte pertinent</li>
            </ul>
          </div>
          <div class="glass-card" style="margin-bottom: 0; padding: 1.5rem">
            <h4 style="color: var(--accent-orange)">🛡️ Sécurité</h4>
            <ul style="list-style: none; margin-top: 1rem">
              <li style="margin-bottom: 0.5rem"><strong>.gitignore</strong> : Clés API</li>
              <li style="margin-bottom: 0.5rem"><strong>Deny rules</strong> : Bloque lecture .env</li>
              <li><strong>mcp-scan</strong> : Scan vulnérabilités</li>
            </ul>
          </div>
        </div>

        <div style="
            background: rgba(248, 81, 73, 0.1);
            border: 1px solid rgba(248, 81, 73, 0.3);
            padding: 1rem;
            border-radius: 8px;
            margin-top: 2rem;
          ">
          <strong>⚠️ Hooks vs CLAUDE.md :</strong> Le CLAUDE.md c'est des "instructions" que Claude peut oublier quand
          le contexte se remplit. Les hooks c'est du code qui s'exécute à chaque fois, sans exception. C'est la
          différence entre "pense à fermer la porte" et une porte qui se ferme automatiquement.
        </div>
      </section>

      <!-- PHASE 1: INSTALLATION -->
      <section id="phase1" class="glass-card">
        <h2>Phase 1 : Installation Claude Code</h2>

        <h3>1.1 Vérifier les prérequis</h3>
        <pre><code class="language-bash"><span class="token-comment"># Vérifications initiales</span>
node --version   <span class="token-comment"># v18+ minimum (v20+ recommandé)</span>
npm --version    <span class="token-comment"># 9+</span>
git --version    <span class="token-comment"># installé</span></code></pre>

        <h3>1.2 Installer jq (nécessaire pour les hooks)</h3>
        <pre><code class="language-bash">brew install jq          <span class="token-comment"># Mac</span>
winget install jqlang.jq <span class="token-comment"># Windows PowerShell</span>
sudo apt-get install jq  <span class="token-comment"># Ubuntu/Debian</span></code></pre>

        <h3>1.3 Installer Claude Code</h3>
        <pre><code class="language-bash"><span class="token-comment"># Le CLI (le moteur)</span>
npm install -g @anthropic-ai/claude-code
claude --version   <span class="token-comment"># &gt;= 2.1.x</span>
claude update      <span class="token-comment"># si en dessous</span>

<span class="token-comment"># L'extension VS Code (l'interface visuelle)</span>
code --install-extension anthropic.claude-code</code></pre>

        <h3>1.4 Se connecter</h3>
        <pre><code class="language-bash">claude login       <span class="token-comment"># ouvre le navigateur pour l'auth</span>
claude "Dis bonjour"   <span class="token-comment"># test de connexion</span></code></pre>

        <h3>1.5 Commandes essentielles</h3>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Commande</th>
                <th>Description</th>
                <th>Commande</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>/help</code></td>
                <td>Liste toutes les commandes</td>
                <td><code>/compact</code></td>
                <td>Compresser le contexte (à faire à 70%)</td>
              </tr>
              <tr>
                <td><code>/status</code></td>
                <td>État du contexte, modèle, session</td>
                <td><code>/clear</code></td>
                <td>Reset contexte (à faire à 90%+)</td>
              </tr>
              <tr>
                <td><code>/cost</code></td>
                <td>Coût estimé de la session</td>
                <td><code>/model</code></td>
                <td>Changer de modèle</td>
              </tr>
              <tr>
                <td><code>/config</code></td>
                <td>Configuration</td>
                <td><code>Shift+Tab</code></td>
                <td>Activer le Plan Mode</td>
              </tr>
              <tr>
                <td><code>/doctor</code></td>
                <td>Diagnostiquer les problèmes</td>
                <td><code>Esc+Esc</code></td>
                <td>Revenir en arrière (rewind)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- PHASE 2: INIT PROJET -->
      <section id="phase2" class="glass-card">
        <h2>Phase 2 : Initialiser le projet</h2>
        <pre><code class="language-bash">mkdir leadpilot &amp;&amp; cd leadpilot
git init
git branch -M main
code .</code></pre>
        <p>Premier lancement :</p>
        <pre><code class="language-bash">claude
/init   <span class="token-comment"># analyse le projet et génère un CLAUDE.md de base</span></code></pre>
      </section>

      <!-- PHASE 3: PERMISSIONS -->
      <section id="phase3" class="glass-card">
        <h2>Phase 3 : Permissions (.claude/settings.json)</h2>
        <pre><code class="language-bash">mkdir -p .claude</code></pre>
        <p>Créer <code>.claude/settings.json</code> :</p>
        <pre><code class="language-json">{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(node:*)",
      "Bash(git:*)",
      "Bash(npx:*)"
    ],
    "deny": [
      "Bash(rm -rf /*)",
      "Bash(curl * | bash)",
      "Bash(wget * | bash)",
      "Read(.env*)",
      "Bash(cat .env*)"
    ]
  }
}</code></pre>
        <p>
          <span class="badge badge-green">Recommandé</span> <strong>Auto Mode</strong> :
          <code>claude --permission-mode auto</code>. Un classifier bloque le risqué, laisse passer le reste.
        </p>
      </section>

      <!-- PHASE 4: CLAUDE.MD -->
      <section id="phase4" class="glass-card">
        <h2>Phase 4 : CLAUDE.md</h2>
        <p><strong>Règle des 200 lignes :</strong> au-delà, Claude ignore les règles. Dégrade le surplus en Skills.</p>

        <pre><code class="language-markdown"># CLAUDE.md : LeadPilot

## Identité du projet
LeadPilot : SaaS de prospection LinkedIn automatisée.
Recherche de prospects, connexions, messages personnalisés et relances via l'API BeReach.
Stack : Next.js 16 + TypeScript strict + Supabase self-hosted + shadcn/ui + BeReach API.

## Règles absolues
- TypeScript strict, pas de \`any\`
- Toujours vérifier les erreurs Supabase : if (error) throw error
- Ne jamais exposer SUPABASE_SERVICE_ROLE_KEY ou BEREACH_API_KEY côté client
- Commits atomiques après chaque tâche terminée
- Toujours vérifier /me/limits et /me/credits avant les actions BeReach en masse
- Cooldown minimum 30-60s entre chaque action LinkedIn
- Maximum 25 connexions par batch, 80/jour, 150 messages/jour

## Architecture
- src/app/            -&gt; Pages et API Routes (App Router)
- src/app/api/bereach -&gt; Routes proxy vers l'API BeReach
- src/components/     -&gt; Composants UI (shadcn/ui)
- src/lib/bereach/    -&gt; Client API BeReach typé
- src/lib/campaigns/  -&gt; Logique campagnes et séquences
- src/lib/prospects/  -&gt; Gestion des prospects
- src/types/          -&gt; Types TypeScript partagés

## Commandes projet
- npm run dev       -&gt; Serveur de développement
- npm run build     -&gt; Build production
- npm run test      -&gt; Tests
- npm run lint      -&gt; ESLint

## Compaction Instructions
Quand tu compactes le contexte, priorité à :
1. Les décisions d'architecture prises
2. Les bugs résolus et leur cause racine
3. Les patterns BeReach spécifiques (rate limits, séquences)
4. L'état des tâches en cours
Ignore : logs de commandes réussies, discussions abandonnées</code></pre>

        <h3>CLAUDE.md par sous-dossier</h3>
        <ul style="list-style: none; padding-left: 1rem; border-left: 2px solid var(--border-color)">
          <li><code>src/app/api/CLAUDE.md</code> : règles API Routes + proxy BeReach</li>
          <li><code>src/components/CLAUDE.md</code> : règles composants + design system</li>
          <li><code>src/lib/bereach/CLAUDE.md</code> : patterns client BeReach, retry, rate limits</li>
        </ul>
      </section>

      <!-- PHASE 5: SKILLS -->
      <section id="phase5" class="glass-card">
        <h2>Phase 5 : Skills</h2>

        <h3>5.1 Skills communautaires</h3>
        <pre><code class="language-bash"><span class="token-comment"># Superpowers : TDD, debugging, brainstorming, code review, worktrees, subagents</span>
npx @anthropic-ai/claude-code-skills add superpowers

<span class="token-comment"># Frontend Design : UI production-grade, anti-style-générique</span>
npx @anthropic-ai/claude-code-skills add frontend-design

<span class="token-comment"># shadcn/ui : lit ton components.json</span>
npx shadcn skill add</code></pre>

        <h3>5.2 Skill BeReach API (79 endpoints)</h3>
        <pre><code class="language-bash">mkdir -p .claude/skills/skill-bereach-api</code></pre>
        <p>Créer <code>.claude/skills/skill-bereach-api/SKILL.md</code> :</p>

        <div class="grid-3">
          <div class="glass-card" style="margin: 0; padding: 1rem; font-size: 0.9rem">
            <h4 style="color: #60a5fa; margin-top: 0">LinkedIn Search (7)</h4>
            /search/linkedin<br>
            /search/linkedin/people<br>
            /search/linkedin/companies<br>
            /search/linkedin/posts<br>
            /search/linkedin/jobs<br>
            /search/linkedin/url<br>
            /search/linkedin/parameters
          </div>
          <div class="glass-card" style="margin: 0; padding: 1rem; font-size: 0.9rem">
            <h4 style="color: #a78bfa; margin-top: 0">Scrapers (9)</h4>
            /visit/linkedin/profile<br>
            /visit/linkedin/company<br>
            /collect/linkedin/posts<br>
            /collect/linkedin/likes<br>
            /collect/linkedin/comments<br>
            /collect/linkedin/hashtag<br>
            /feed/linkedin
          </div>
          <div class="glass-card" style="margin: 0; padding: 1rem; font-size: 0.9rem">
            <h4 style="color: #f472b6; margin-top: 0">Sales Navigator (3)</h4>
            /search/linkedin/sales-nav<br>
            /search/linkedin/sales-nav/people<br>
            /search/linkedin/sales-nav/companies
          </div>
          <div class="glass-card" style="margin: 0; padding: 1rem; font-size: 0.9rem">
            <h4 style="color: #3fb950; margin-top: 0">Actions (23)</h4>
            /connect/linkedin/profile<br>
            /message/linkedin<br>
            /follow/linkedin/profile<br>
            /like/linkedin/post<br>
            /comment/linkedin/post<br>
            /publish/linkedin/post<br>
            /invitations/linkedin...
          </div>
          <div class="glass-card" style="margin: 0; padding: 1rem; font-size: 0.9rem">
            <h4 style="color: #d29922; margin-top: 0">Chat (16)</h4>
            /chats/linkedin<br>
            /chats/linkedin/messages<br>
            /chats/linkedin/typing<br>
            /chats/linkedin/unread<br>
            /chats/linkedin/search...
          </div>
          <div class="glass-card" style="margin: 0; padding: 1rem; font-size: 0.9rem">
            <h4 style="color: #f85149; margin-top: 0">Campaigns &amp; Profile</h4>
            /campaigns/{slug}/status<br>
            /campaigns/{slug}/sync<br>
            /me/linkedin<br>
            /me/limits<br>
            /me/credits<br>
            /analytics/linkedin...
          </div>
        </div>

        <h4 style="margin-top: 2rem">Patterns TypeScript Critiques</h4>
        <pre><code class="language-typescript"><span class="token-comment">// Headers standard</span>
const headers = {
  'Authorization': \`Bearer \${process.env.BEREACH_API_KEY}\`,
  'Content-Type': 'application/json'
};

<span class="token-comment">// Vérification pré-action (OBLIGATOIRE)</span>
const limits = await fetch('https://api.berea.ch/me/limits', { method: 'POST', headers });
const credits = await fetch('https://api.berea.ch/me/credits', { method: 'POST', headers });

<span class="token-comment">// Séquence "Human-like" pour message</span>
await fetch('https://api.berea.ch/chats/linkedin/typing', { ... }); <span class="token-comment">// 1. Typing</span>
await sleep(randomBetween(2000, 5000)); <span class="token-comment">// 2. Pause humaine</span>
await fetch('https://api.berea.ch/message/linkedin', { ... }); <span class="token-comment">// 3. Envoi</span></code></pre>

        <h3>5.3 Skills custom additionnels</h3>
        <pre><code class="language-bash">mkdir -p .claude/skills/{skill-supabase,skill-nextjs,skill-design-leadpilot,skill-security,skill-optimizer}</code></pre>
      </section>

      <!-- PHASE 6: HOOKS -->
      <section id="phase6" class="glass-card">
        <h2>Phase 6 : Hooks</h2>
        <pre><code class="language-bash">mkdir -p .claude/hooks</code></pre>

        <div class="grid-3">
          <div>
            <h4>session-start.sh</h4>
            <pre><code class="language-bash">#!/bin/bash
echo "=== LeadPilot : État ==="
if [ -f "tasks/STATE.md" ]; then
  cat tasks/STATE.md
fi
git status --short
grep -r "TODO\|FIXME" src/ -l</code></pre>
          </div>
          <div>
            <h4>pre-bash-security.sh</h4>
            <pre><code class="language-bash">#!/bin/bash
CMD="$1"
if echo "$CMD" | grep -qE "rm -rf /|curl.*\| bash|cat \.env"; then
  echo "BLOCKED: danger"
  exit 1
fi</code></pre>
          </div>
          <div>
            <h4>post-bash.sh</h4>
            <pre><code class="language-bash">#!/bin/bash
<span class="token-comment"># Tronque outputs &gt; 100 lignes</span>
head -100</code></pre>
          </div>
        </div>

        <pre><code class="language-bash">chmod +x .claude/hooks/*.sh</code></pre>
        <p>Configurer dans <code>.claude/settings.json</code> :</p>
        <pre><code class="language-json">"hooks": {
  "SessionStart": [{ "command": "bash .claude/hooks/session-start.sh" }],
  "PreToolUse": [{ "command": "bash .claude/hooks/pre-bash-security.sh" }],
  "PostToolUse": [{ "command": "bash .claude/hooks/post-bash.sh" }]
}</code></pre>
      </section>

      <!-- PHASE 7: MCP -->
      <section id="phase7" class="glass-card">
        <h2>Phase 7 : MCP Servers</h2>
        <p>Fichier <code>.mcp.json</code> à la racine :</p>
        <pre><code class="language-json">{
  "mcpServers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}</code></pre>
        <p>Vérifier avec <code>/mcp</code> et <code>/doctor</code>.</p>
      </section>

      <!-- PHASE 8: COMMANDS -->
      <section id="phase8" class="glass-card">
        <h2>Phase 8 : Slash Commands Custom</h2>

        <div class="grid-2">
          <div>
            <h3>/ship-feature</h3>
            <p><strong>Ce que ça fait :</strong></p>
            <ol style="margin-left: 1.5rem">
              <li>Vérifie TypeScript (tsc --noEmit)</li>
              <li>Lance les tests (npm run test)</li>
              <li>Vérifie les critères REVIEW.md</li>
              <li>Crée un commit conventionnel</li>
              <li>Prépare la PR</li>
            </ol>
            <p style="margin-top: 1rem; color: #f85149">
              <strong>Critères :</strong> 0 erreur, Tests OK, Pas de clés API.
            </p>
          </div>
          <div>
            <h3>/daily-review</h3>
            <p><strong>Ce que ça fait :</strong></p>
            <ol style="margin-left: 1.5rem">
              <li>Git log des commits du jour</li>
              <li>Vérifie les TODO/FIXME restants</li>
              <li>Lance le typecheck</li>
              <li>Résumé des tâches complétées vs à faire</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- PHASE 9: GSD -->
      <section id="phase9" class="glass-card">
        <h2>Phase 9 : GSD Framework (Optionnel)</h2>
        <pre><code class="language-bash">curl -fsSL https://raw.githubusercontent.com/gsd-build/get-shit-done/main/install.sh | bash</code></pre>
        <div style="display: flex; justify-content: space-between; margin-top: 2rem; text-align: center">
          <div class="badge badge-blue">1. DISCUSS</div>
          →
          <div class="badge badge-blue">2. PLAN</div>
          →
          <div class="badge badge-orange">3. EXECUTE</div>
          →
          <div class="badge badge-green">4. VERIFY</div>
          →
          <div class="badge badge-green">5. SHIP</div>
        </div>
      </section>

      <!-- PHASE 10: MONITORING -->
      <section id="phase10" class="glass-card">
        <h2>Phase 10 : Monitoring &amp; Optimisation</h2>
        <pre><code class="language-bash">npm install -g ccusage                    <span class="token-comment"># stats consommation</span>
npm install -g claude-code-usage-monitor  <span class="token-comment"># monitoring temps réel</span>
/statusline                               <span class="token-comment"># barre métriques native</span></code></pre>

        <div class="grid-2">
          <div>
            <h3>Seuils d'action</h3>
            <div class="table-container">
              <table>
                <tbody>
                  <tr>
                    <td><strong>CLAUDE.md</strong></td>
                    <td>&lt; 200 lignes</td>
                  </tr>
                  <tr>
                    <td><strong>Contexte 70%</strong></td>
                    <td><code>/compact</code></td>
                  </tr>
                  <tr>
                    <td><strong>Contexte 90%+</strong></td>
                    <td><code>/clear</code></td>
                  </tr>
                  <tr>
                    <td><strong>Session</strong></td>
                    <td>~5h (reset quota)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3>Choix du modèle</h3>
            <div class="table-container">
              <table>
                <tbody>
                  <tr>
                    <td><strong>Opus 4.6</strong></td>
                    <td>Architecture, complexe</td>
                  </tr>
                  <tr>
                    <td><strong>Sonnet 4.6</strong></td>
                    <td>Dev quotidien, features</td>
                  </tr>
                  <tr>
                    <td><strong>Haiku 4.5</strong></td>
                    <td>Tâches répétitives, batch</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <!-- PHASE 11: SECURITE -->
      <section id="phase11" class="glass-card">
        <h2>Phase 11 : Sécurité</h2>

        <h3>Fichiers ignorés</h3>
        <pre><code>.env
.env.local
.env.production
.mcp.json</code></pre>

        <h3>Variables d'environnement (.env.local)</h3>
        <pre><code class="language-bash">BEREACH_API_KEY=br_xxx
NEXT_PUBLIC_SUPABASE_URL=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
OPENROUTER_API_KEY=xxx</code></pre>

        <h3>Actions de sécurité</h3>
        <ul style="list-style: none; padding-left: 0">
          <li class="checklist-item">
            <span class="check-icon">✓</span> <strong>Scan MCP :</strong> <code>npx mcp-scan@latest</code>
          </li>
          <li class="checklist-item">
            <span class="check-icon">✓</span> <strong>RLS Supabase :</strong> Row Level Security sur toutes les tables
          </li>
          <li class="checklist-item">
            <span class="check-icon">✓</span> <strong>Client Side :</strong> Ne jamais utiliser
            <code>service_role</code> côté client
          </li>
        </ul>
      </section>

      <!-- PHASE 12: CLAUDE-MEM -->
      <section id="phase12" class="glass-card">
        <h2>Phase 12 : Claude-Mem (Mémoire Persistante)</h2>
        <p>
          <strong>Le problème :</strong> Claude Code n'a aucune mémoire entre les sessions. Quand tu fermes le terminal,
          tout est perdu.<br>
          <strong>La solution :</strong> Claude-Mem capture, compresse et réinjecte automatiquement le contexte.
        </p>

        <h3>12.1 Installation</h3>
        <pre><code class="language-bash">/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem</code></pre>
        <p><em>Ne PAS utiliser npm install -g. Toujours passer par /plugin.</em></p>

        <h3>12.2 Config Provider IA (réduction coûts)</h3>
        <p>Option A : OpenRouter (Recommandé)</p>
        <pre><code class="language-json">{
  "provider": "openrouter",
  "model": "anthropic/claude-sonnet-4-6",
  "openrouterApiKey": "sk-or-xxx"
}</code></pre>
        <p>Option B : Gemini (Gratuit)</p>
        <pre><code class="language-json">{
  "provider": "gemini",
  "geminiApiKey": "AIza-xxx"
}</code></pre>

        <h3>12.3 Vérification</h3>
        <pre><code class="language-bash">curl http://localhost:37777/health
<span class="token-comment"># Interface web : http://localhost:37777</span></code></pre>
      </section>

      <!-- CHECKLIST FINALE -->
      <section class="glass-card" style="border-color: #3fb950">
        <h2>Checklist Finale</h2>
        <div class="grid-2">
          <div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 1 : Installation Claude Code</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 2 : Init projet leadpilot</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 3 : Permissions sécurisées</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 4 : CLAUDE.md complet</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 5 : Skills &amp; API BeReach</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 6 : Hooks installés</div>
          </div>
          <div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 7 : MCP Servers connectés</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 8 : Slash commands custom</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 9 : GSD Framework</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 10 : Monitoring actif</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 11 : Sécurité validée</div>
            <div class="checklist-item"><span class="check-icon">✓</span> Phase 12 : Claude-Mem opérationnel</div>
          </div>
        </div>
      </section>

      <!-- STRUCTURE FINALE -->
      <section class="glass-card">
        <h2>Structure Finale du Projet</h2>
        <pre><code class="language-bash">leadpilot/
├── .claude/
│   ├── settings.json              <span class="token-comment"># permissions + hooks</span>
│   ├── commands/
│   │   ├── ship-feature.md
│   │   └── daily-review.md
│   ├── hooks/
│   │   ├── session-start.sh
│   │   ├── pre-bash-security.sh
│   │   └── post-bash.sh
│   └── skills/
│       ├── skill-bereach-api/     <span class="token-comment"># SKILL.md 79 endpoints</span>
│       ├── skill-supabase/
│       ├── skill-nextjs/
│       ├── skill-design-leadpilot/
│       └── skill-security/
├── .mcp.json                      <span class="token-comment"># 3 MCP servers</span>
├── CLAUDE.md                      <span class="token-comment"># cerveau du projet</span>
├── REVIEW.md
├── PROJECT.md
├── .env.local
├── .gitignore
├── src/
│   ├── app/
│   │   ├── api/bereach/
│   │   ├── (dashboard)/
│   │   ├── (campaigns)/
│   │   └── (inbox)/
│   ├── components/
│   │   ├── prospects/
│   │   └── campaigns/
│   ├── lib/
│   │   ├── bereach/
│   │   └── supabase/
│   └── types/
└── package.json

~/.claude-mem/
├── claude-mem.db                  <span class="token-comment"># SQLite mémoire</span>
├── chroma/                        <span class="token-comment"># Vector DB</span>
├── settings.json
└── logs/</code></pre>
      </section>

      <!-- 5 REFLEXES -->
      <section>
        <h2>Les 5 Réflexes en Session</h2>
        <div class="grid-3" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; margin: 0">
            <div style="font-size: 2rem; margin-bottom: 0.5rem">📝</div>
            <h4 style="margin: 0; color: #58a6ff">Plan avant code</h4>
            <div style="color: #8b949e; font-size: 0.9rem; margin-top: 0.5rem">
              <code>Shift+Tab</code> avant toute tâche
            </div>
          </div>
          <div class="glass-card" style="text-align: center; padding: 1.5rem; margin: 0">
            <div style="font-size: 2rem; margin-bottom: 0.5rem">💾</div>
            <h4 style="margin: 0; color: #3fb950">Commits fréquents</h4>
            <div style="color: #8b949e; font-size: 0.9rem; margin-top: 0.5rem">Après chaque petite tâche</div>
          </div>
          <div class="glass-card" style="text-align: center; padding: 1.5rem; margin: 0">
            <div style="font-size: 2rem; margin-bottom: 0.5rem">🥊</div>
            <h4 style="margin: 0; color: #f85149">Challenger</h4>
            <div style="color: #8b949e; font-size: 0.9rem; margin-top: 0.5rem">"Prouve-moi que ça marche"</div>
          </div>
          <div class="glass-card" style="text-align: center; padding: 1.5rem; margin: 0">
            <div style="font-size: 2rem; margin-bottom: 0.5rem">🧹</div>
            <h4 style="margin: 0; color: #a78bfa">Gérer contexte</h4>
            <div style="color: #8b949e; font-size: 0.9rem; margin-top: 0.5rem">/status, /compact, /clear</div>
          </div>
          <div class="glass-card" style="text-align: center; padding: 1.5rem; margin: 0">
            <div style="font-size: 2rem; margin-bottom: 0.5rem">🛑</div>
            <h4 style="margin: 0; color: #d29922">Git avant auto</h4>
            <div style="color: #8b949e; font-size: 0.9rem; margin-top: 0.5rem">Commit avant autonomie</div>
          </div>
        </div>
      </section>
    </div>

    <footer>Guide rédigé par Daemon IA — daemon-ia.fr</footer>
  

<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v8c78df7c7c0f484497ecbca7046644da1771523124516" integrity="sha512-8DS7rgIrAmghBFwoOTujcf6D9rXvH8xm8JQ1Ja01h9QX8EzXldiszufYa4IFfKdLUKTTrnSFXLDkUEOTrZQ8Qg==" data-cf-beacon='{"version":"2024.11.0","token":"4edd5f8ec12a48cfa682ab8261b80a79","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
</body></html>`;

function BuilderGuide() {
  return (
    <iframe
      srcDoc={BUILDER_HTML}
      style={{width:"100%", height:"calc(100vh - 64px)", border:"none", display:"block"}}
      title="Builder avec Claude Code"
    />
  );
}

export default function App() {
  const [tab, setTab] = useState("guide");
  const [activeId, setActiveId] = useState(null);
  const [showClaudeMd, setShowClaudeMd] = useState(false);

  const bounceScrollTo = (target) => {
    const start = window.scrollY, dist = target - start, dur = 600;
    let t0 = null;
    const ease = t => 1 - Math.pow(1 - t, 4);
    const step = ts => {
      if (!t0) t0 = ts;
      const e = Math.min((ts-t0)/dur, 1);
      window.scrollTo(0, start + dist * ease(e));
      if (e < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ✅ FIX 2 : utilise offsetTop au lieu de getBoundingClientRect().top + scrollY
  const handleTocClick = id => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      bounceScrollTo(el.offsetTop - 80);
    }
  };

  return (
    <div style={S.app}>
      {showClaudeMd && <ClaudeMdModal onClose={()=>setShowClaudeMd(false)}/>}
      <div style={S.g1}/><div style={S.g2}/>
      <div style={S.nav}>
        <div style={S.navI}>
          <div style={S.navB}>
            {[
              ["guide", <><img src="https://i.imgur.com/YPq9o8G.png" style={{width:16,height:16,objectFit:"contain",borderRadius:3}}/> Guide d'installation OpenClaw</>, false],
              ["offer", "Service & Offre", true],
              ["costs", "Optimisation des Coûts", false],
              ["claudecode", <><img src="https://i.imgur.com/BiG2k09.png" style={{width:18,height:18,objectFit:"contain",borderRadius:"50%"}}/> Guide Claude Code</>, false],
              ["builder", <><img src="https://i.imgur.com/c70pItt.png" style={{width:16,height:16,objectFit:"contain",borderRadius:3}}/> Builder avec Claude Code</>, false],
            ].map(([id,label,isOffer])=>{
              const on = tab===id;
              const st = isOffer ? (on?S.tOA:S.tOI) : (on?S.tA:S.tI);
              return <button key={id} onClick={()=>{ setTab(id); window.scrollTo(0,0); }} style={st}>{label}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={(tab==="costs"||tab==="builder") ? {padding:0} : S.main}>
        {tab==="guide" ? <GuideContent activeId={activeId} onTocClick={handleTocClick}/> : tab==="offer" ? <OfferPage/> : tab==="costs" ? <CostGuide/> : tab==="claudecode" ? <ClaudeCodeGuide activeId={activeId} onTocClick={handleTocClick} onShowClaudeMd={()=>setShowClaudeMd(true)}/> : <BuilderGuide/>}
      </div>
      {tab !== "costs" && <>
      <a
        href="https://wa.me/33628500314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20ton%20service%20OpenClaw%20LinkedIn%20!"
        target="_blank"
        rel="noopener noreferrer"
        style={{position:"fixed",bottom:32,right:32,width:56,height:56,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 24px rgba(37,211,102,0.5)",zIndex:100,textDecoration:"none"}}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.677 4.8 1.854 6.793L2 30l7.42-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.9-1.616l-.42-.252-4.404 1.08 1.116-4.284-.276-.44A11.56 11.56 0 014.4 16C4.4 9.6 9.6 4.4 16 4.4S27.6 9.6 27.6 16 22.4 27.6 16 27.6zm6.32-8.676c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.104 1.364-.204.232-.406.26-.754.086-.348-.174-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.204-.348-.022-.536.152-.708.158-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.088-.174-.784-1.888-1.074-2.588-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.61.086-.928.434-.32.348-1.218 1.19-1.218 2.9s1.247 3.364 1.42 3.596c.174.232 2.454 3.748 5.946 5.254.832.358 1.48.572 1.986.732.834.266 1.594.228 2.194.138.67-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.318-.23-.666-.404z"/>
        </svg>
      </a>
      <button onClick={()=>bounceScrollTo(0)}
        style={{position:"fixed",bottom:32,right:280,width:56,height:56,borderRadius:"50%",background:tab==="claudecode"||tab==="builder"?"#6366f1":"#10b981",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${tab==="claudecode"||tab==="builder"?"rgba(99,102,241,0.45)":"rgba(16,185,129,0.35)"}`,zIndex:100,fontSize:20,color:"#fff",fontWeight:"bold"}}>↑</button>
      </>}
    </div>
  );
}