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
          src="https://i.imgur.com/DTiUIVP.jpeg"
          alt="Agent LinkedIn IA — avale la pilule"
          style={{width:"100%",maxWidth:720,borderRadius:20,border:"1px solid #1e2235",display:"block",margin:"28px auto 32px"}}
        />
        <p style={{fontSize:22,color:"#e4e4e7",lineHeight:1.7,marginBottom:36,fontWeight:500,maxWidth:620,margin:"0 auto 36px"}}><B c="Setup clé en main. 100% sécurisé. Zéro technique."/><br/><span style={{color:"#a1a1aa",fontSize:18}}>Tu te concentres sur les conversations. L'agent gère tout le reste.</span></p>
        <a href="https://wa.me/33628500314?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20ton%20agent%20LinkedIn%20OpenClaw%20!" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",padding:"14px 32px",borderRadius:12,background:"#f4f4f5",color:"#09090b",fontWeight:"bold",fontSize:16,textDecoration:"none"}}>Je veux mon agent LinkedIn →</a>
        <div style={{marginTop:12,fontSize:12,color:"#52525b",fontFamily:"monospace"}}>Places limitées — Setup en 48h</div>
      </section>

      <section style={{textAlign:"center"}}>
        <h2 style={{...S.h2,marginTop:0,marginBottom:8}}>Finis les abonnements à rallonge</h2>
        <p style={{...S.p,fontSize:16,marginBottom:28}}>Mon agent remplace une dizaine d'outils payants. <B c="Une seule solution, tout-en-un."/></p>
        <img
          src="https://i.imgur.com/pPxwsDZ.png"
          alt="Outils remplacés par l'agent LinkedIn : Lemlist, Unipile, n8n..."
          style={{width:"100%",maxWidth:700,borderRadius:16,border:"1px solid #1e2235",display:"block",margin:"0 auto"}}
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

const ChkO = () => <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:20,height:20,borderRadius:"50%",background:"rgba(217,119,87,0.15)",border:"1px solid rgba(217,119,87,0.4)",flexShrink:0}}>
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#D97757" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
</span>;

const CdO = ({c}) => <code style={{background:"rgba(217,119,87,0.12)",color:"#f0a882",padding:"2px 7px",borderRadius:4,fontFamily:"monospace",fontSize:"0.85em"}}>{c}</code>;
const PreO = ({children}) => <pre style={S.pre}><code style={{...S.preC,color:"#f0a882"}}>{children}</code></pre>;

function ClaudeCodeGuide({ activeId, onTocClick }) {
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
        <ImgScreen solo={true} src="https://i.imgur.com/8NrSxQA.jpeg" caption="Premier lancement — choix du thème (Dark/Light mode)"/>
        <p style={S.p}>Claude vous propose de choisir un thème. Ensuite, l'écran de connexion s'affiche :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/wdm2WOl.jpeg" caption="Écran de sélection de la méthode de connexion"/>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⛔ <B c="Choisissez toujours l'Option 1 : Claude account with subscription"/><br/>N'utilisez jamais "Anthropic Console account" (Option 2) — facturation API à l'usage, peut dépasser 5 000 $ en un mois.</p></div>
        <ImgScreen solo={true} src="https://i.imgur.com/VuZZULx.jpeg" caption="Fenêtre d'autorisation — Claude Code demande accès à votre compte Claude"/>
        <p style={S.p}>Votre navigateur s'ouvre. Cliquez <B c="Autoriser"/>. Une fois validé :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/lX06oHP.jpeg" caption="Build something great — configuration réussie, fermez la fenêtre"/>
        <ImgScreen solo={true} src="https://i.imgur.com/Nfu3yqK.jpeg" caption="Retour dans le terminal — Login successful, email affiché"/>
        <p style={S.p}>Claude affiche ensuite les <B c="Security notes"/> — lisez-les et appuyez sur Entrée :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/UQ2wzvn.jpeg" caption="Notes de sécurité importantes — Claude peut faire des erreurs, relisez toujours"/>
        <p style={S.p}>Vous pouvez maintenant discuter avec Claude Code. Testez avec <CdO c="Qui es-tu ?"/> :</p>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",margin:"14px 0"}}>
          <ImgScreen src="https://i.imgur.com/iClefhx.jpeg" caption="Interface Claude Code opérationnelle — bienvenue !"/>
          <ImgScreen src="https://i.imgur.com/n9S5k5H.jpeg" caption='Claude répond à "Qui es-tu ?" — se présente comme interface CLI Anthropic'/>
        </div>
        <h3 style={S.h3}>Si vous avez déjà un compte — /logout puis re-connexion</h3>
        <p style={S.p}>Si Claude Code était déjà installé avec un autre compte, faites d'abord <CdO c="/logout"/>, puis retapez <CdO c="claude"/> et choisissez votre thème :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/8NrSxQA.jpeg" caption="Écran de sélection du thème après /logout — choisissez Dark mode"/>

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
        <ImgScreen solo={true} src="https://i.imgur.com/tc0Dg3E.jpeg" caption="Security check — choisissez 1. Yes, I trust this folder"/>
        <p style={S.p}>Choisissez <B c="1 — Yes, I trust this folder"/>. Claude Code est maintenant actif <B c="dans votre projet uniquement"/> :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/t74GK6X.jpeg" caption="Claude Code lancé dans le dossier projet — prêt à coder"/>

        {/* ── SECTION 7 ── */}
        <hr style={S.hr}/>
        <h2 id="cc7" style={S.h2}>7. Utiliser Claude Code dans VS Code</h2>
        <p style={S.p}>VS Code est l'éditeur recommandé. Ouvrez votre dossier projet avec <B c="File → Open Folder"/> :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/RT6tS1P.jpeg" caption="File → Open Folder dans VS Code — sélectionnez votre dossier projet"/>
        <ImgScreen solo={true} src="https://i.imgur.com/y5elErI.jpeg" caption="Structure du projet visible dans l'explorateur VS Code"/>
        <p style={S.p}>Ouvrez le terminal intégré (Terminal → New Terminal ou <CdO c="Ctrl + `"/>) puis tapez <CdO c="claude"/> :</p>
        <ImgScreen solo={true} src="https://i.imgur.com/8L7uOIt.jpeg" caption="Claude Code lancé dans le terminal intégré VS Code"/>

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
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>💡 <B c="Conseil débutants :"/> Appuyez sur <B c="Shift+Tab"/> pour activer le <B c="plan mode"/>. Claude explique tout ce qu'il va faire avant d'agir — idéal pour apprendre et contrôler.</p></div>
        <h3 style={S.h3}>Reprendre une session précédente</h3>
        <p style={S.p}>Après un <CdO c="/exit"/>, Claude affiche un ID de session. Pour reprendre :</p>
        <PreO>claude --resume 760af073-4f3c-4cbc-9ba0-34fd3bc66592</PreO>

        {/* ── SECTION 9 ── */}
        <hr style={S.hr}/>
        <h2 id="cc9" style={S.h2}>9. Les outils avancés de Claude Code</h2>
        <div style={{margin:"18px 0", textAlign:"center", background:"#0d0f1e"}}>
          <img src="https://i.imgur.com/oqzuzqc.png" alt="Outils Claude Code" style={{maxWidth:"100%", width:"100%", display:"block", borderRadius:0, border:"none"}}/>
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


export default function App() {
  const [tab, setTab] = useState("guide");
  const [activeId, setActiveId] = useState(null);

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
      <div style={S.g1}/><div style={S.g2}/>
      <div style={S.nav}>
        <div style={S.navI}>
          <div style={S.navB}>
            {[
              ["guide", <><img src="https://i.imgur.com/YPq9o8G.png" style={{width:16,height:16,objectFit:"contain",borderRadius:3}}/> Guide d'installation OpenClaw</>, false],
              ["offer", "Service & Offre", true],
              ["costs", "Optimisation des Coûts", false],
              ["claudecode", <><img src="https://i.imgur.com/c70pItt.png" style={{width:16,height:16,objectFit:"contain",borderRadius:3}}/> Guide Claude Code</>, false],
            ].map(([id,label,isOffer])=>{
              const on = tab===id;
              const st = isOffer ? (on?S.tOA:S.tOI) : (on?S.tA:S.tI);
              return <button key={id} onClick={()=>{ setTab(id); window.scrollTo(0,0); }} style={st}>{label}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={(tab==="costs") ? {padding:0} : S.main}>
        {tab==="guide" ? <GuideContent activeId={activeId} onTocClick={handleTocClick}/> : tab==="offer" ? <OfferPage/> : tab==="costs" ? <CostGuide/> : <ClaudeCodeGuide activeId={activeId} onTocClick={handleTocClick}/>}
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
        style={{position:"fixed",bottom:32,right:280,width:56,height:56,borderRadius:"50%",background:tab==="claudecode"?"#D97757":"#10b981",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 20px ${tab==="claudecode"?"rgba(217,119,87,0.45)":"rgba(16,185,129,0.35)"}`,zIndex:100,fontSize:20,color:"#09090b",fontWeight:"bold"}}>↑</button>
      </>}
    </div>
  );
}