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

const ChkO = () => <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,borderRadius:"50%",background:"rgba(217,119,87,0.15)",border:"1px solid rgba(217,119,87,0.4)",flexShrink:0}}><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#D97757" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>;

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
        background-image: url(data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCASwB4ADASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAECBQYHCAMECf/EAF8QAAECBAEFBhAKBwYFAwQBBQABAgMEBREGBxIhMVEUQWGRktEIExUWFyI2U1RVVnFzgaGxGDI0N1JydJOywSMmMzVC4fAlQ2JjgqIkREVklCdlg0Z1wvFHo6SEZuL/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQUCBAYDB//EADcRAQACAQIEBAYBBAEEAgMBAAABAgMEEQUSE1EUFSExIjIzQVJhQgYWI3FiNIGRoSRTQ8Hwsf/aAAwDAQACEQMRAD8A5kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGO4AKCd0gAAAAlAAAAJBjuIABKQAEoAAABPqHqMdxAAJSAAlACfUPUY7iAASkABKAE+oeox3EAAlIACUAAAAn1D1GO4gAEpAASgABjuAAJAAEgADHcAASAAJAAAAAY7gACQABIAAx3AAEgACQABjuAAJAAEgAAAAMdwABIAAkAAY7gACQABIAAx3AAEgACQAAAAGO4AAkAASAAMdwABIAAkAAY7gACQABIAAAADHcAASAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABiAAAAAAADIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAACAAAAAGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9k=);
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

  const handleTocClick = id => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) bounceScrollTo(el.offsetTop - 80);
  };

  // Couleur accent par onglet
  const accentColor = {
    guide:      "#10b981",
    offer:      "#6366f1",
    costs:      "#f59e0b",
    claudecode: "#D97757",
    builder:    "#8b5cf6",
  }[tab] || "#10b981";

  const TABS = [
    { id:"guide",      label:"Guide OpenClaw",          logo:"https://i.imgur.com/YPq9o8G.png", round:false, color:"#10b981" },
    { id:"offer",      label:"Service & Offre",          logo:null,                               round:false, color:"#6366f1" },
    { id:"costs",      label:"Optimisation des Coûts",   logo:null,                               round:false, color:"#f59e0b" },
    { id:"claudecode", label:"Guide Claude Code",        logo:"https://i.imgur.com/BiG2k09.png",  round:true,  color:"#D97757" },
    { id:"builder",    label:"Builder avec Claude Code", logo:"https://i.imgur.com/c70pItt.png",  round:false, color:"#8b5cf6" },
  ];

  const isFullscreen = tab === "costs" || tab === "builder";

  return (
    <div style={{minHeight:"100vh", background:"#09090b", fontFamily:"'Inter',system-ui,sans-serif", color:"#fafafa", overflowX:"hidden"}}>
      {showClaudeMd && <ClaudeMdModal onClose={()=>setShowClaudeMd(false)}/>}

      {/* Ambient glow — couleur de l'onglet actif */}
      <div style={{position:"fixed",top:"-30%",left:"50%",transform:"translateX(-50%)",width:"80%",height:"60%",borderRadius:"50%",background:`radial-gradient(ellipse,${accentColor}09 0%,transparent 70%)`,filter:"blur(60px)",pointerEvents:"none",zIndex:0,transition:"background 0.6s ease"}}/>

      {/* NAV — Linear style */}
      <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(9,9,11,0.8)",backdropFilter:"blur(24px) saturate(180%)",borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
        {/* Accent line top */}
        <div style={{height:1,background:`linear-gradient(90deg,transparent,${accentColor}60,transparent)`,transition:"background 0.4s"}}/>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",height:56,gap:12}}>

          {/* Wordmark */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginRight:4}}>
            <div style={{width:26,height:26,borderRadius:6,background:`linear-gradient(135deg,${accentColor},${accentColor}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,color:"#09090b",transition:"background 0.4s",letterSpacing:"-0.02em",flexShrink:0}}>D</div>
            <span style={{fontSize:12,fontWeight:600,color:"rgba(250,250,250,0.35)",letterSpacing:"0.05em",textTransform:"uppercase"}}>Daemon IA</span>
          </div>

          <div style={{width:"1px",height:20,background:"rgba(255,255,255,0.08)",flexShrink:0}}/>

          {/* Tab list — shadcn Tabs style */}
          <div style={{display:"flex",alignItems:"center",gap:1,flex:1,overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none"}}>
            {TABS.map(({id,label,logo,round,color})=>{
              const on = tab === id;
              return (
                <button
                  key={id}
                  onClick={()=>{ setTab(id); window.scrollTo(0,0); }}
                  style={{
                    position:"relative",
                    display:"flex", alignItems:"center", gap:6,
                    padding:"6px 13px", borderRadius:6, border:"none",
                    cursor:"pointer", fontSize:13, fontWeight: on ? 600 : 400,
                    whiteSpace:"nowrap", transition:"all 0.18s ease",
                    background: on ? `${color}14` : "transparent",
                    color: on ? color : "rgba(250,250,250,0.4)",
                    outline:"none",
                  }}
                  onMouseEnter={e=>{ if(!on){ e.currentTarget.style.color="rgba(250,250,250,0.75)"; e.currentTarget.style.background="rgba(255,255,255,0.04)"; }}}
                  onMouseLeave={e=>{ if(!on){ e.currentTarget.style.color="rgba(250,250,250,0.4)"; e.currentTarget.style.background="transparent"; }}}
                >
                  {logo && <img src={logo} style={{width:14,height:14,objectFit:"contain",borderRadius:round?"50%":2,flexShrink:0,opacity: on ? 1 : 0.5,transition:"opacity 0.18s"}} alt=""/>}
                  {label}
                  {on && <span style={{position:"absolute",bottom:-1,left:"50%",transform:"translateX(-50%)",width:"60%",height:"2px",borderRadius:"2px 2px 0 0",background:color,opacity:0.9}}/>}
                </button>
              );
            })}
          </div>

          {/* Right — CTA pill */}
          <a
            href="https://wa.me/33628500314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20ton%20service%20OpenClaw%20!"
            target="_blank" rel="noopener noreferrer"
            style={{flexShrink:0,display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:6,background:`${accentColor}18`,border:`1px solid ${accentColor}35`,color:accentColor,fontSize:12,fontWeight:600,textDecoration:"none",transition:"all 0.2s",letterSpacing:"0.01em"}}
            onMouseEnter={e=>{ e.currentTarget.style.background=`${accentColor}28`; }}
            onMouseLeave={e=>{ e.currentTarget.style.background=`${accentColor}18`; }}
          >
            <svg width="12" height="12" viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.677 4.8 1.854 6.793L2 30l7.42-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"/></svg>
            Contact
          </a>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{position:"relative",zIndex:1,...(isFullscreen ? {} : {maxWidth:1200,margin:"0 auto",padding:"48px 24px 100px"})}}>
        {tab==="guide"      ? <GuideContent activeId={activeId} onTocClick={handleTocClick}/> :
         tab==="offer"      ? <OfferPage/> :
         tab==="costs"      ? <CostGuide/> :
         tab==="claudecode" ? <ClaudeCodeGuide activeId={activeId} onTocClick={handleTocClick} onShowClaudeMd={()=>setShowClaudeMd(true)}/> :
                              <BuilderGuide/>}
      </div>

      {/* FLOATING BUTTONS */}
      {!isFullscreen && <>
        {/* WhatsApp */}
        <a
          href="https://wa.me/33628500314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20ton%20service%20OpenClaw%20LinkedIn%20!"
          target="_blank" rel="noopener noreferrer"
          style={{position:"fixed",bottom:28,right:28,width:50,height:50,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(37,211,102,0.35)",zIndex:100,textDecoration:"none",transition:"transform 0.2s,box-shadow 0.2s"}}
          onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.08)"; e.currentTarget.style.boxShadow="0 6px 28px rgba(37,211,102,0.5)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(37,211,102,0.35)"; }}
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.268 2 2 8.268 2 16c0 2.478.677 4.8 1.854 6.793L2 30l7.42-1.822A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 01-5.9-1.616l-.42-.252-4.404 1.08 1.116-4.284-.276-.44A11.56 11.56 0 014.4 16C4.4 9.6 9.6 4.4 16 4.4S27.6 9.6 27.6 16 22.4 27.6 16 27.6zm6.32-8.676c-.348-.174-2.06-1.016-2.38-1.132-.32-.116-.552-.174-.784.174-.232.348-.9 1.132-1.104 1.364-.204.232-.406.26-.754.086-.348-.174-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.204-.348-.022-.536.152-.708.158-.156.348-.406.522-.61.174-.202.232-.348.348-.58.116-.232.058-.436-.028-.61-.088-.174-.784-1.888-1.074-2.588-.282-.68-.57-.588-.784-.598l-.668-.012c-.232 0-.61.086-.928.434-.32.348-1.218 1.19-1.218 2.9s1.247 3.364 1.42 3.596c.174.232 2.454 3.748 5.946 5.254.832.358 1.48.572 1.986.732.834.266 1.594.228 2.194.138.67-.1 2.06-.842 2.35-1.656.29-.814.29-1.512.204-1.656-.086-.144-.318-.23-.666-.404z"/></svg>
        </a>

        {/* Scroll up */}
        <button
          onClick={()=>bounceScrollTo(0)}
          style={{position:"fixed",bottom:28,right:88,width:50,height:50,borderRadius:"50%",border:`1px solid ${accentColor}30`,background:`${accentColor}10`,backdropFilter:"blur(8px)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,color:accentColor,fontSize:18,fontWeight:700,transition:"all 0.2s",boxShadow:`0 4px 16px ${accentColor}20`}}
          onMouseEnter={e=>{ e.currentTarget.style.background=`${accentColor}22`; e.currentTarget.style.boxShadow=`0 6px 24px ${accentColor}35`; e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background=`${accentColor}10`; e.currentTarget.style.boxShadow=`0 4px 16px ${accentColor}20`; e.currentTarget.style.transform="translateY(0)"; }}
        >↑</button>
      </>}
    </div>
  );
}