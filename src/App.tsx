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
      <span style={{fontSize:24}}>{icon}</span>
      <div style={{color,fontWeight:700,fontSize:13,textAlign:"center"}}>{title}</div>
      {sub && <div style={{color:`${color}88`,fontSize:11,fontFamily:"monospace",textAlign:"center"}}>{sub}</div>}
    </div>
  );
}

function ArchDiagram() {
  return (
    <div style={{margin:"20px 0",padding:"32px 24px",borderRadius:20,background:"#06080f",border:"1px solid #1a1d2e",display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>

      {/* Row 1 — Sources */}
      <div style={{display:"flex",alignItems:"flex-end",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
        <Node icon="💻" title="TON PC" sub="IP fixe" color="#a5b4fc"/>
        <Node icon="📱" title="TELEGRAM" sub="@TonBot" color="#38bdf8"/>
        <Node icon="🌐" title="INTERNET" sub="HTTP / HTTPS" color="#94a3b8"/>
      </div>

      {/* Arrows row 1 → firewall */}
      <div style={{display:"flex",gap:40,flexWrap:"wrap",justifyContent:"center"}}>
        <Arrow label="SSH · port 22 · ton IP" color="#a5b4fc"/>
        <Arrow label="Telegram API" color="#38bdf8"/>
        <Arrow label="ports 80 / 443" color="#94a3b8"/>
      </div>

      {/* Row 2 — Firewall */}
      <div style={{width:"100%",maxWidth:680,padding:"16px 24px",borderRadius:14,background:"rgba(239,68,68,0.04)",border:"1px solid rgba(239,68,68,0.2)",display:"flex",alignItems:"center",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
        <span style={{fontSize:20}}>🛡️</span>
        <span style={{color:"#f87171",fontWeight:700,fontSize:14,fontFamily:"monospace"}}>FIREWALL HOSTINGER</span>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
          {[["22","ton IP","#34d399"],["80","public","#34d399"],["443","public","#34d399"],["*","drop","#f87171"]].map(([p,s,c],i)=>(
            <div key={i} style={{padding:"3px 10px",borderRadius:6,background:`${c}14`,border:`1px solid ${c}33`,fontSize:11,color:c,fontFamily:"monospace"}}>:{p} <span style={{opacity:0.6}}>{s}</span></div>
          ))}
        </div>
      </div>

      <Arrow label="" color="#334155"/>

      {/* Row 3 — VPS */}
      <div style={{width:"100%",maxWidth:680,borderRadius:20,border:"1px solid rgba(251,191,36,0.2)",background:"rgba(251,191,36,0.02)",padding:"20px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
          <span style={{fontSize:18}}>🖥️</span>
          <span style={{color:"#fbbf24",fontWeight:700,fontSize:13,fontFamily:"monospace",letterSpacing:"0.05em"}}>VPS HOSTINGER</span>
        </div>

        {/* Coolify box */}
        <div style={{borderRadius:14,border:"1px solid rgba(99,102,241,0.2)",background:"rgba(99,102,241,0.03)",padding:"16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:16}}>
            <span style={{fontSize:16}}>⚡</span>
            <span style={{color:"#a5b4fc",fontWeight:700,fontSize:13,fontFamily:"monospace"}}>COOLIFY</span>
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {[
              {icon:"🔒",name:"Caddy",sub:"SSL auto",color:"#34d399"},
              {icon:"🤖",name:"OpenClaw",sub:":18789 loopback",color:"#f59e0b",glow:true},
              {icon:"🔄",name:"n8n",sub:"automation",color:"#818cf8"},
              {icon:"🗄️",name:"Supabase",sub:"database",color:"#38bdf8"},
            ].map((app,i)=>(
              <div key={i} style={{flex:"1 1 110px",maxWidth:140,padding:"12px 10px",borderRadius:12,background:`${app.color}0d`,border:`1px solid ${app.color}28`,textAlign:"center",boxShadow:app.glow?`0 0 16px ${app.color}22`:"none"}}>
                <div style={{fontSize:18,marginBottom:4}}>{app.icon}</div>
                <div style={{color:app.color,fontWeight:700,fontSize:12}}>{app.name}</div>
                <div style={{color:`${app.color}66`,fontSize:10,fontFamily:"monospace",marginTop:2}}>{app.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Arrow label="API calls" color="#f59e0b"/>

      {/* Row 4 — LLM providers */}
      <div style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
        {[
          {icon:"🟣",name:"Anthropic",sub:"Claude",color:"#a78bfa"},
          {icon:"🟢",name:"OpenAI",sub:"GPT-4",color:"#34d399"},
          {icon:"🔵",name:"OpenRouter",sub:"Multi-LLM",color:"#38bdf8"},
        ].map((llm,i)=>(
          <div key={i} style={{padding:"10px 18px",borderRadius:12,background:`${llm.color}0d`,border:`1px solid ${llm.color}28`,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>{llm.icon}</span>
            <div>
              <div style={{color:llm.color,fontWeight:700,fontSize:12}}>{llm.name}</div>
              <div style={{color:`${llm.color}66`,fontSize:10,fontFamily:"monospace"}}>{llm.sub}</div>
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
  {id:"audit",     label:"7. Audit de sécurité"},
  {id:"checklist", label:"8. Checklist finale"},
  {id:"depannage", label:"9. En cas de problème"},
  {id:"pratiques", label:"10. Bonnes pratiques"},
];

function GuideContent({activeId, onTocClick}) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 210px",gap:56,alignItems:"start"}}>
      <article>

        <div style={{marginBottom:48}}>
          <div style={S.badge}>⚙️ VPS Hostinger · Coolify · Docker · Telegram</div>
          <h1 style={S.h1}>Sécurisation complète<br/><span style={S.grad}>d'OpenClaw sur VPS.</span></h1>
          <p style={{...S.p,fontSize:16,maxWidth:580,fontWeight:300}}>Ce guide te permet de déployer et sécuriser OpenClaw de A à Z, en totale autonomie.<br/>Setup cible : <B c="VPS Hostinger KVM → Coolify → OpenClaw (conteneur Docker)"/>.</p>
          <p style={{...S.p,fontSize:13,color:"#52525b",fontStyle:"italic"}}>Tuto rédigé par Daemon IA — daemon-ia.fr · Version 3 · Mars 2026</p>
        </div>

        <hr style={S.hr}/>

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
        <Img label="section Accès SSH dans Hostinger avec le bouton réinitialiser le mot de passe root"/>

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
        <Img label="terminal web Hostinger ouvert"/>
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
        <Img label="résultat de la commande id avec sudo dans les groupes"/>
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
        <Img label="connexion SSH réussie dans le Terminal Mac / PowerShell Windows"/>
        <div style={S.bq}><p style={{...S.p,margin:0}}>✅ <B c="Ne ferme pas cette fenêtre"/> — garde-la ouverte comme filet de sécurité pour la suite.</p></div>

        <h4 style={S.h4}>Connecter un autre ordinateur</h4>
        <p style={S.p}>Génère une nouvelle clé sur le nouvel ordi, puis ajoute-la avec <Cd c=">>"/> (sans écraser l'ancienne) :</p>
        <Pre>echo "NOUVELLE-CLE-PUBLIQUE" {">>"} /home/[PRENOM]/.ssh/authorized_keys</Pre>
        
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
        <Img label="Coolify Servers → Validate → statut vert"/>

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
        <Img label="création du pare-feu dans Hostinger"/>

        <h3 style={S.h3}>3.2 — Configuration des règles</h3>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Règle</th><th style={S.th}>Action</th><th style={S.th}>Port</th><th style={S.th}>Source</th></tr></thead>
            <tbody>{[
              ["SSH (accès admin)","✅ Accepter","22","Ton IP fixe"],
              ["HTTP","✅ Accepter","80","Anywhere"],
              ["HTTPS","✅ Accepter","443","Anywhere"],
              ["Tout le reste","❌ Drop","Any","Anywhere"],
            ].map(([r,a,p,s],i)=><tr key={i}><td style={S.td}><B c={r}/></td><td style={S.td}>{a}</td><td style={S.td}><Cd c={p}/></td><td style={S.td}>{s}</td></tr>)}</tbody>
          </table>
        </div>
        <Img label="les 4 règles configurées dans le pare-feu Hostinger"/>

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
        <Img label="toggle du pare-feu activé dans Hostinger"/>

        <hr style={S.hr}/>

        <h2 id="deploy" style={S.h2}>4. Déploiement OpenClaw dans Coolify</h2>

        <h3 style={S.h3}>4.1 — Créer le service OpenClaw</h3>
        <p style={S.p}>Coolify → ton projet → <B c="+ New"/> → <B c="Service"/> → cherche <B c="OpenClaw"/> → déploie.</p>
        <Img label="ajout du service OpenClaw dans Coolify"/>

        <h3 style={S.h3}>4.2 — Configurer le domaine HTTPS</h3>
        <p style={S.p}>Paramètres du service → <B c="Domains"/> → ajoute <Cd c="https://openclaw.ton-domaine.com"/>. Coolify via Caddy génère automatiquement un certificat SSL.</p>
        <Img label="configuration du domaine dans Coolify"/>

        <h3 style={S.h3}>4.3 — Variables d'environnement</h3>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Règle absolue : aucune clé API ne doit jamais transiter par une conversation, un email, ou être saisie dans l'interface OpenClaw."/> Tout doit être dans les variables d'environnement Coolify.</p></div>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Variable</th><th style={S.th}>Description</th></tr></thead>
            <tbody>{[
              ["ANTHROPIC_API_KEY","Clé API Anthropic (sk-ant-xxxxxxxx)"],
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
        <Img label="variables d'environnement dans Coolify"/>

        <h3 style={S.h3}>4.4 — Démarrage et vérification</h3>
        <p style={S.p}>Clique sur <B c="Deploy"/> puis surveille l'onglet <B c="Logs"/>. Le conteneur est prêt quand le statut passe en <B c="Running (healthy)"/>.</p>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ <B c="Container Degraded (unhealthy)"/> : log <Cd c="API key env var is required"/> → ajoute <Cd c="ANTHROPIC_API_KEY"/> dans env vars → Save → Restart.</p></div>
        <Img label="logs d'erreur dans Coolify + variables corrigées"/>

        <hr style={S.hr}/>

        <h2 id="connexion" style={S.h2}>5. Première connexion à l'interface OpenClaw</h2>
        <h3 style={S.h3}>5.1 — Accès via URL</h3>
        <Pre>https://openclaw.ton-domaine.com</Pre>
        <h3 style={S.h3}>5.2 — Connexion avec le Gateway Token</h3>
        <p style={S.p}><B c="Control → Overview"/> → champ <B c="Gateway Token"/> → colle la valeur de ton <Cd c="OPENCLAW_GATEWAY_TOKEN"/> → <B c="Connect"/>.</p>
        <Img label="Overview OpenClaw avec le champ Gateway Token"/>
        <h3 style={S.h3}>5.3 — Vérification Health OK</h3>
        <p style={S.p}>Le statut doit passer de <B c="Health Offline"/> à <B c="Health OK"/> et afficher <B c="Connected"/>.</p>
        <Img label="Health OK dans OpenClaw avec Connected"/>

        <hr style={S.hr}/>

        <h2 id="telegram" style={S.h2}>6. Configuration Telegram</h2>
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
        <Pre>{'{\n  "channels": {\n    "telegram": {\n      "enabled": true,\n      "dmPolicy": "allowlist",\n      "allowFrom": [6125640105],\n      "groupPolicy": "allowlist",\n      "streamMode": "partial",\n      "actions": {\n        "sendMessage": true,\n        "deleteMessage": true\n      }\n    }\n  }\n}'}</Pre>
        <div style={S.bqW}><p style={{...S.p,margin:0}}>⚠️ L'ID doit être un <B c="nombre entier"/> (sans guillemets). <Cd c="[6125640105]"/> ✅ — <Cd c='["6125640105"]'/> ❌</p></div>
        <div style={{overflowX:"auto"}}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Paramètre</th><th style={S.th}>Valeur</th><th style={S.th}>Effet</th></tr></thead>
            <tbody>{[
              ["dmPolicy","allowlist","Seuls les IDs dans allowFrom peuvent écrire au bot en privé"],
              ["allowFrom","[6125640105]","Liste des Telegram user IDs autorisés"],
              ["groupPolicy","allowlist","Le bot ne répond pas dans des groupes non autorisés"],
            ].map(([p,v,e],i)=><tr key={i}><td style={S.td}><Cd c={p}/></td><td style={S.td}><Cd c={v}/></td><td style={S.td}>{e}</td></tr>)}</tbody>
          </table>
        </div>

        <h3 style={S.h3}>6.6 — Test de connexion Telegram</h3>
        <p style={S.p}>Envoie un message à ton bot depuis Telegram. Il doit répondre.</p>
        <Img label="conversation Telegram avec le bot qui répond"/>

        <h4 style={S.h4}>⚠️ Erreurs fréquentes — Bot muet</h4>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 1"/> — <Cd c="dmPolicy: pairing"/> avec <Cd c="allowFrom"/> configuré : incompatibles. Passe sur <Cd c="allowlist"/>.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 2"/> — ID avec guillemets dans <Cd c="allowFrom"/> : utilise un nombre entier, pas une string.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 3"/> — Token révoqué ou exposé : @BotFather → <Cd c="/revoke"/> → nouveau token → Coolify env vars → supprime l'ancien du JSON → Restart.</p></div>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Cause 4"/> — Token encore dans le JSON : <Cd c="grep botToken openclaw.json"/> → si trouvé → <Cd c="sed -i"/> → Restart.</p></div>

        <hr style={S.hr}/>

        <h2 id="audit" style={S.h2}>7. Audit de sécurité OpenClaw</h2>
        <h3 style={S.h3}>7.1 — Lancer l'audit</h3>
        <p style={S.p}>Dans le terminal Coolify (service OpenClaw → Terminal) :</p>
        <Pre>{"openclaw security audit\nopenclaw security audit --deep\nopenclaw security audit --fix\nopenclaw security audit --json"}</Pre>
        <Img label="résultat brut de l'audit avec les findings"/>

        <h3 style={S.h3}>7.2 — Corriger les findings</h3>
        <h4 style={S.h4}>CRITICAL — groupPolicy open avec outils activés</h4>
        <div style={S.bqW}><p style={{...S.p,margin:0}}><B c="Risque :"/> N'importe qui peut ajouter ton bot à un groupe et déclencher des actions réelles via injection de prompt.</p></div>
        <Pre>{"// Raw mode OpenClaw :\n\"groupPolicy\": \"allowlist\""}</Pre>

        <h4 style={S.h4}>CRITICAL — Credentials dir permissions</h4>
        <Pre>chmod 700 /data/.openclaw/credentials</Pre>

        <h4 style={S.h4}>WARN — trustedProxies manquants</h4>
        <Pre>{'{\n  "gateway": {\n    "port": 18789,\n    "mode": "local",\n    "trustedProxies": ["127.0.0.1"],\n    "controlUi": { }\n  }\n}'}</Pre>
        <p style={S.p}>Save → Restart dans Coolify.</p>

        <h4 style={S.h4}>CRITICAL — allowInsecureAuth</h4>
        <div style={S.bqI}><p style={{...S.p,margin:0}}>On laisse <Cd c="allowInsecureAuth: true"/> — Caddy termine le SSL et OpenClaw voit du HTTP en interne. La connexion est protégée par HTTPS via Caddy ✅ et le Gateway Token est requis ✅.</p></div>
        <div style={S.bq}><p style={{...S.p,margin:0}}>💡 <B c="Option avancée — Tailscale :"/> VPN mesh gratuit (jusqu'à 100 appareils). L'interface OpenClaw ne serait accessible que depuis tes appareils. Résout complètement ce CRITICAL.</p></div>

        <h4 style={S.h4}>WARN — CDP HTTP</h4>
        <p style={S.p}><Cd c="http://browser:9223"/> est du trafic interne Docker entre conteneurs. Jamais exposé à l'extérieur. <B c="Faux positif"/> — pas d'action requise.</p>

        <h3 style={S.h3}>7.3 — Résultat cible</h3>
        <Pre>Summary: 1 critical · 1 warn · 1 info</Pre>
        <div style={S.bq}><p style={{...S.p,margin:0}}>Le 1 critical résiduel (<Cd c="allowInsecureAuth"/>) est <B c="acceptable"/> avec HTTPS + Gateway Token en place.</p></div>
        <Img label="résultat de l'audit après corrections"/>

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

      <aside style={{position:"sticky",top:0,height:"100vh",display:"flex",alignItems:"center"}}>
        <div>
          <div style={{fontSize:13,textTransform:"uppercase",letterSpacing:"0.12em",color:"#34d399",fontWeight:700,marginBottom:18}}>Sommaire</div>
          <nav style={{display:"flex",flexDirection:"column",borderLeft:"1px solid rgba(39,39,42,0.5)"}}>
            {TOC.map(({id,label})=>{
              const isA = activeId===id;
              return (
                <a key={id} href={"#"+id}
                  onClick={e=>{e.preventDefault();onTocClick(id);}}
                  style={{display:"block",fontSize:13,padding:"7px 0 7px 16px",marginLeft:-1,borderLeft:"1px solid "+(isA?"#34d399":"transparent"),color:isA?"#34d399":"#71717a",fontWeight:isA?600:400,textDecoration:"none",lineHeight:1.5,transition:"all 0.15s",cursor:"pointer"}}
                  onMouseEnter={e=>{if(!isA){e.currentTarget.style.color="#34d399";e.currentTarget.style.borderLeftColor="#34d399";}}}
                  onMouseLeave={e=>{if(!isA){e.currentTarget.style.color="#71717a";e.currentTarget.style.borderLeftColor="transparent";}}}
                >{label}</a>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
}

function OfferPage() {
  return (
    <div style={{maxWidth:860,margin:"0 auto",display:"flex",flexDirection:"column",gap:"5rem",paddingBottom:"6rem",paddingTop:"1rem"}}>
      <section style={{textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"4px 14px",borderRadius:9999,background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",color:"#a5b4fc",fontSize:12,fontFamily:"monospace",marginBottom:28}}>🤖 Service OpenClaw + API LinkedIn</div>
        <h1 style={S.h1}>Ton agent IA LinkedIn qui prospecte{" "}<span style={S.gradI}>pendant que tu dors</span></h1>
        <p style={{fontSize:17,color:"#a1a1aa",lineHeight:1.8,marginBottom:36}}><B c="Setup clé en main. 100% sécurisé. Zéro technique."/><br/>Tu te concentres sur les conversations. L'agent gère tout le reste.</p>
        <button style={{padding:"14px 32px",borderRadius:12,background:"#f4f4f5",color:"#09090b",fontWeight:"bold",border:"none",cursor:"pointer",fontSize:16}}>Je veux mon agent LinkedIn →</button>
        <div style={{marginTop:12,fontSize:12,color:"#52525b",fontFamily:"monospace"}}>Places limitées — Setup en 48h</div>
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
            {icon:"🤖",color:"#818cf8",title:"2. Ton agent LinkedIn opérationnel",desc:"API spécialisée sur les signaux chauds, utilisée par 500+ professionnels.",items:["Surveille les posts LinkedIn de tes concurrents","Extrait les profils ayant liké ou commenté","Envoie des demandes personnalisées avec contexte","Simule un comportement humain (rate limiting)"],quote:null},
            {icon:"⚙️",color:"#22d3ee",title:"3. Intégration n8n",desc:"Templates n8n prêts à l'emploi pour connecter ton CRM automatiquement.",items:["Alimenter ton CRM","Séquences de follow-up","Notifications Telegram"],quote:null},
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
            <button style={{width:"100%",padding:16,borderRadius:12,background:"#10b981",color:"#09090b",fontWeight:"bold",border:"none",cursor:"pointer",fontSize:16}}>Réserver mon setup →</button>
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
        <button style={{padding:"16px 40px",borderRadius:12,background:"#fff",color:"#312e81",fontWeight:"bold",border:"none",cursor:"pointer",fontSize:16}}>Réserver mon setup →</button>
      </section>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("guide");
  const [activeId, setActiveId] = useState(null);

  const bounceScrollTo = (target) => {
    const start = window.scrollY, dist = target - start, dur = 2400;
    let t0 = null;
    const ease = t => {
      const io = p => p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
      return t < 0.70 ? io(t/0.70)*1.008 : 1.008 - io((t-0.70)/0.30)*0.008;
    };
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
    if (el) bounceScrollTo(el.getBoundingClientRect().top + window.scrollY - 24);
  };

  return (
    <div style={S.app}>
      <div style={S.g1}/><div style={S.g2}/>
      <div style={S.nav}>
        <div style={S.navI}>
          <div style={S.navB}>
            {[["guide","📖 Guide d'installation",false],["offer","💼 Service & Offre",true]].map(([id,label,isOffer])=>{
              const on = tab===id;
              const st = isOffer ? (on?S.tOA:S.tOI) : (on?S.tA:S.tI);
              return <button key={id} onClick={()=>setTab(id)} style={st}>{label}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={S.main}>
        {tab==="guide" ? <GuideContent activeId={activeId} onTocClick={handleTocClick}/> : <OfferPage/>}
      </div>
      <button onClick={()=>bounceScrollTo(0)}
        style={{position:"fixed",bottom:32,right:280,width:44,height:44,borderRadius:"50%",background:"#10b981",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 20px rgba(16,185,129,0.35)",zIndex:100,fontSize:20,color:"#09090b",fontWeight:"bold"}}>↑</button>
    </div>
  );
}