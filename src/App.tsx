import { useState } from "react";
import { Shield, Cpu, GitMerge } from "lucide-react";

// ─── STYLES ───────────────────────────────────────────────────
const S: Record<string, React.CSSProperties> = {
  app:   { minHeight:"100vh", background:"#0d0f1e", fontFamily:"Inter,system-ui,sans-serif", color:"#a1a1aa" },
  g1:    { position:"fixed", top:"-10%", left:"-10%", width:"40%", height:"40%", borderRadius:"50%", background:"rgba(16,185,129,0.07)", filter:"blur(120px)", pointerEvents:"none" },
  g2:    { position:"fixed", bottom:"-10%", right:"-10%", width:"40%", height:"40%", borderRadius:"50%", background:"rgba(99,102,241,0.07)", filter:"blur(120px)", pointerEvents:"none" },
  nav:   { position:"sticky", top:0, zIndex:50, background:"rgba(13,15,30,0.9)", backdropFilter:"blur(16px)", borderBottom:"1px solid #1e2235" },
  navI:  { maxWidth:1400, margin:"0 auto", padding:"12px 24px", display:"flex", justifyContent:"center" },
  navB:  { display:"inline-flex", padding:6, background:"rgba(24,24,27,0.9)", border:"1px solid #27272a", borderRadius:12, gap:4 },
  tA:    { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"#27272a", color:"#f4f4f5", fontWeight:600, fontSize:14 },
  tI:    { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"transparent", color:"#71717a", fontWeight:500, fontSize:14 },
  tOA:   { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"linear-gradient(135deg,rgba(99,102,241,0.5),rgba(34,211,238,0.3))", color:"#e0e7ff", fontWeight:700, fontSize:14, boxShadow:"0 0 16px rgba(99,102,241,0.35)" },
  tOI:   { display:"flex", alignItems:"center", gap:8, padding:"10px 22px", borderRadius:8, border:"none", cursor:"pointer", background:"linear-gradient(135deg,rgba(99,102,241,0.2),rgba(34,211,238,0.1))", color:"#a5b4fc", fontWeight:700, fontSize:14 },
  main:  { maxWidth:1400, margin:"0 auto", padding:"48px 48px 100px" },
  hr:    { border:"none", borderTop:"1px solid #1e2235", margin:"44px 0" },
  h2:    { fontSize:"clamp(1.6rem,3vw,2.1rem)", fontWeight:700, color:"#f4f4f5", margin:"48px 0 16px" },
  h3:    { fontSize:"1.15rem", fontWeight:700, color:"#f4f4f5", margin:"28px 0 10px" },
  p:     { color:"#a1a1aa", lineHeight:1.9, margin:"10px 0", fontSize:15 },
  bq:    { borderLeft:"3px solid rgba(16,185,129,0.5)", background:"rgba(16,185,129,0.05)", padding:"14px 18px", borderRadius:"0 10px 10px 0", margin:"18px 0", fontSize:15 },
  bqW:   { borderLeft:"3px solid rgba(239,68,68,0.5)", background:"rgba(239,68,68,0.05)", padding:"14px 18px", borderRadius:"0 10px 10px 0", margin:"18px 0", fontSize:15 },
  pre:   { background:"#080a14", border:"1px solid #1e2235", borderRadius:12, padding:"18px 20px", overflowX:"auto", margin:"18px 0" },
  preC:  { fontFamily:"monospace", fontSize:14, color:"#6ee7b7", lineHeight:1.8, whiteSpace:"pre" },
  ul:    { paddingLeft:22, margin:"10px 0" },
  li:    { color:"#a1a1aa", margin:"8px 0", lineHeight:1.8, fontSize:15 },
  tbl:   { width:"100%", borderCollapse:"collapse", margin:"18px 0", fontSize:15 },
  th:    { background:"#0f1020", padding:"12px 16px", textAlign:"left", color:"#f4f4f5", borderBottom:"1px solid #1e2235", fontWeight:600 },
  td:    { padding:"12px 16px", color:"#a1a1aa", borderBottom:"1px solid #13152a", lineHeight:1.7 },
  card:  { padding:28, borderRadius:16, background:"#0f1120", border:"1px solid #1e2235", margin:"12px 0" },
  B:     { color:"#e4e4e7", fontWeight:600 },
  badge: { display:"inline-flex", alignItems:"center", gap:8, padding:"4px 14px", borderRadius:9999, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", color:"#34d399", fontSize:12, fontFamily:"monospace", marginBottom:28 },
  h1:    { fontSize:"clamp(2rem,5vw,3.6rem)", fontWeight:800, lineHeight:1.1, color:"#f4f4f5", marginBottom:16 },
  grad:  { background:"linear-gradient(135deg,#34d399,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
  gradI: { background:"linear-gradient(135deg,#818cf8,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
};

const Cd = ({ c }: { c: string }) => (
  <code style={{ background:"rgba(16,185,129,0.1)", color:"#6ee7b7", padding:"2px 7px", borderRadius:4, fontFamily:"monospace", fontSize:"0.85em" }}>{c}</code>
);
const B = ({ c }: { c: string }) => <strong style={S.B}>{c}</strong>;

function CB() {
  const [v, set] = useState(false);
  return <input type="checkbox" checked={v} onChange={e => set(e.target.checked)} style={{ width:16, height:16, accentColor:"#10b981", cursor:"pointer", flexShrink:0, marginTop:3 }} />;
}

function ChkItem({ label }: { label: string }) {
  return (
    <li style={{ display:"flex", alignItems:"flex-start", gap:12, margin:"8px 0", listStyle:"none" }}>
      <CB /><span style={{ color:"#a1a1aa", lineHeight:1.6 }}>{label}</span>
    </li>
  );
}

function Pulse({ color }: { color: string }) {
  return (
    <span style={{ display:"inline-block", width:8, height:8, borderRadius:2, background:color, opacity:0.9, flexShrink:0 }} />
  );
}

// ─── ARCH DIAGRAM ─────────────────────────────────────────────
function ArchDiagram() {
  const [hov, setHov] = useState<number | null>(null);

  const apps = [
    { name:"n8n",      url:"n8n.ton-domaine.com",      color:"#f59e0b" },
    { name:"Supabase", url:"supabase.ton-domaine.com", color:"#3b82f6" },
    { name:"OpenClaw", url:"openclaw.ton-domaine.com", color:"#34d399", badge:"18789 · loopback" },
  ];

  const fw = [
    { port:"TCP 22",      desc:"SSH — IP fixe uniquement", ok:true },
    { port:"TCP 80/443",  desc:"HTTP/HTTPS public",         ok:true },
    { port:"*",           desc:"Tout le reste — bloqué",    ok:false },
  ];

  return (
    <div style={{ margin:"28px 0", borderRadius:12, overflow:"hidden", border:"1px solid #1a1d2e", background:"#06080f", fontFamily:"monospace" }}>
      {/* Titlebar */}
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 14px", background:"#0a0c18", borderBottom:"1px solid #1a1d2e" }}>
        <div style={{ display:"flex", gap:6 }}>
          {(["#ff5f57","#febc2e","#28c840"] as string[]).map((c, i) => (
            <span key={i} style={{ width:11, height:11, borderRadius:"50%", background:c, display:"block", boxShadow:`0 0 4px ${c}60` }} />
          ))}
        </div>
        <span style={{ flex:1, textAlign:"center", fontSize:11, color:"#2e3158", fontFamily:"monospace", letterSpacing:"0.05em" }}>
          infrastructure.diagram — daemon-ia.fr
        </span>
      </div>

      <div style={{ padding:"40px 32px", display:"flex", flexDirection:"column", alignItems:"center" }}>
        {/* CLIENT */}
        <div style={{ padding:"11px 28px", borderRadius:8, background:"rgba(165,180,252,0.06)", border:"1px solid rgba(165,180,252,0.28)", display:"inline-flex", alignItems:"center", gap:14 }}>
          <Pulse color="rgb(165,180,252)" />
          <div style={{ textAlign:"left" }}>
            <div style={{ color:"rgb(165,180,252)", fontWeight:700, fontSize:13, letterSpacing:"0.04em" }}>CLIENT</div>
            <div style={{ color:"#3f4263", fontSize:11, marginTop:2 }}>IP fixe · ton poste de travail</div>
          </div>
          <span style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background:"rgba(165,180,252,0.12)", color:"rgb(165,180,252)", marginLeft:4, letterSpacing:"0.03em" }}>ORIGIN</span>
        </div>

        {/* Connector */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, margin:"2px 0" }}>
          <div style={{ width:"1px", height:18, background:"linear-gradient(to bottom,rgba(99,102,241,0.15),rgba(99,102,241,0.45))" }} />
          <div style={{ padding:"3px 14px", borderRadius:4, background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.18)", fontSize:11, color:"#6366f1", letterSpacing:"0.03em", whiteSpace:"nowrap" }}>
            SSH · port 22 · clé publique uniquement
          </div>
          <div style={{ width:"1px", height:18, background:"linear-gradient(to bottom,rgba(99,102,241,0.45),rgba(99,102,241,0.15))" }} />
          <svg width="10" height="7" viewBox="0 0 10 7" style={{ marginTop:-2 }}>
            <path d="M5 7 L0 0 L10 0 Z" fill="rgba(99,102,241,0.45)" />
          </svg>
        </div>

        {/* VPS */}
        <div style={{ width:"100%", maxWidth:680, borderRadius:10, border:"1px solid rgba(251,191,36,0.18)", background:"rgba(251,191,36,0.02)", padding:"22px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, alignSelf:"flex-start" }}>
            <Pulse color="#fbbf24" />
            <span style={{ color:"#fbbf24", fontWeight:700, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase" }}>VPS Hostinger</span>
            <span style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:"rgba(251,191,36,0.1)", color:"#fbbf24", letterSpacing:"0.05em" }}>Ubuntu 22.04</span>
          </div>

          {/* Firewall */}
          <div style={{ borderRadius:8, border:"1px solid rgba(239,68,68,0.16)", background:"rgba(239,68,68,0.025)", padding:"16px 20px", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, borderBottom:"1px solid rgba(239,68,68,0.1)", paddingBottom:10 }}>
              <Pulse color="#f87171" />
              <span style={{ color:"#f87171", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase" }}>Firewall Hostinger</span>
              <span style={{ fontSize:10, padding:"2px 8px", borderRadius:3, background:"rgba(239,68,68,0.1)", color:"#f87171", marginLeft:"auto" }}>infrastructure-level</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"auto auto 1fr", gap:"8px 16px", alignItems:"center" }}>
              {fw.map((f, i) => (
                <>
                  <span key={`s${i}`} style={{ fontSize:11, color:f.ok?"#34d399":"#f87171", fontWeight:700 }}>{f.ok?"ALLOW":"DENY"}</span>
                  <code key={`p${i}`} style={{ fontSize:12, padding:"2px 8px", borderRadius:4, background:f.ok?"rgba(16,185,129,0.08)":"rgba(239,68,68,0.08)", color:f.ok?"#6ee7b7":"#fca5a5" }}>{f.port}</code>
                  <span key={`d${i}`} style={{ fontSize:11, color:"#3f4263" }}>{f.desc}</span>
                </>
              ))}
            </div>
          </div>

          {/* Coolify */}
          <div style={{ borderRadius:8, border:"1px solid rgba(99,102,241,0.16)", background:"rgba(99,102,241,0.025)", padding:"16px 20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, borderBottom:"1px solid rgba(99,102,241,0.1)", paddingBottom:10 }}>
              <Pulse color="#a5b4fc" />
              <span style={{ color:"#a5b4fc", fontWeight:700, fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase" }}>Coolify</span>
              <span style={{ fontSize:10, color:"#3f4263", marginLeft:4 }}>+ Caddy reverse proxy · SSL auto</span>
            </div>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              {apps.map((app, i) => (
                <div key={i}
                  onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                  style={{ flex:"1 1 170px", maxWidth:210, padding:"14px 16px", borderRadius:7, border:`1px solid ${hov===i ? app.color : app.color+"2a"}`, background:hov===i ? app.color+"12" : app.color+"06", cursor:"default", transition:"border-color 0.2s, background 0.2s", boxShadow:hov===i ? `0 0 20px ${app.color}22` : "none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <Pulse color={app.color} />
                    <span style={{ color:app.color, fontWeight:700, fontSize:13 }}>{app.name}</span>
                  </div>
                  <div style={{ fontSize:10, color:"#2e3158", marginBottom:app.badge ? 6 : 0 }}>→ {app.url}</div>
                  {app.badge && <span style={{ fontSize:10, padding:"2px 7px", borderRadius:3, background:"rgba(16,185,129,0.1)", color:"#34d399", display:"inline-block" }}>{app.badge}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TOC ──────────────────────────────────────────────────────
const TOC = [
  { id:"comprendre",    label:"1. Comprendre ClawBot" },
  { id:"securite",      label:"2. La sécurité avant tout" },
  { id:"architecture",  label:"3. Architecture recommandée" },
  { id:"etape1",        label:"Étape 1 : Sécurisation SSH" },
  { id:"etape2",        label:"Étape 2 : Firewall Hostinger" },
  { id:"etape3",        label:"Étape 3 : Déploiement Coolify" },
  { id:"etape4",        label:"Étape 4 : Connexion IA" },
  { id:"etape5",        label:"Étape 5 : Intégration Telegram" },
  { id:"etape6",        label:"Étape 6 : Interface via Caddy" },
  { id:"etape7",        label:"Étape 7 : Audit de sécurité" },
  { id:"pratiques",     label:"Bonnes pratiques" },
  { id:"checklist",     label:"Checklist finale" },
];

// ─── GUIDE ────────────────────────────────────────────────────
function GuideContent({ activeId, onTocClick }: { activeId: string | null; onTocClick: (id: string) => void }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 220px", gap:72, alignItems:"start" }}>
      <article>
        <div style={{ marginBottom:48 }}>
          <div style={S.badge}>⚙️ DevSecOps · VPS Hostinger + Coolify</div>
          <h1 style={S.h1}>Installer ClawBot<br /><span style={S.grad}>Correctement & Sécurisé.</span></h1>
          <p style={{ ...S.p, fontSize:16, maxWidth:560, fontWeight:300 }}>Version : VPS Hostinger + Coolify + Caddy + Multi-Applications.<br />Enrichi avec la documentation officielle OpenClaw.</p>
        </div>

        <hr style={S.hr} />
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}><B c="Avant de commencer." /> Des dizaines de guides YouTube sont dangereux. Celui-ci t'explique <B c="pourquoi" />, pas seulement quoi faire.</p></div>

        <hr style={S.hr} />
        <h2 id="comprendre" style={S.h2}>1. Comprendre ce qu'est vraiment ClawBot</h2>
        <p style={S.p}><B c="ClawBot n'est pas une IA." /> C'est un logiciel open-source qui joue le rôle d'un <B c="chef d'orchestre" /> entre toi et les modèles d'IA (GPT, Claude, DeepSeek…).</p>
        <ul style={S.ul}>
          <li style={S.li}>ClawBot = le <B c="cerveau organisationnel" /></li>
          <li style={S.li}>GPT-4 / Claude = le <B c="cerveau pensant" /></li>
          <li style={S.li}>L'un sans l'autre ne fait rien d'intéressant</li>
        </ul>
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>⚠️ OpenClaw est conçu comme un <B c="assistant personnel à une seule frontière de confiance" />. Un bot ouvert à des inconnus = accès à tes fichiers, ton shell, ton navigateur.</p></div>

        <hr style={S.hr} />
        <h2 id="securite" style={S.h2}>2. Pourquoi la sécurité est non-négociable</h2>
        <div style={S.bq}><p style={{ ...S.p, margin:0, fontStyle:"italic" }}>💬 "Un développeur compétent peut prendre le contrôle d'une instance non sécurisée en 2 à 3 minutes."</p></div>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Risque</th><th style={S.th}>Ce qui peut arriver</th></tr></thead>
            <tbody>
              {[["🔑 Clés API","Factures à plusieurs milliers d'euros"],["📧 Emails","Usurpation d'identité"],["💰 Bancaire","Transactions frauduleuses"],["🔐 Crypto","Extraction de seed phrases"],["📁 Drive","Accès à tous tes fichiers"],["🖥️ Serveur","Impact sur toutes tes apps"],["💉 Injection","Email malveillant manipule le bot"]].map(([r,d],i)=>(
                <tr key={i}><td style={S.td}><B c={r} /></td><td style={S.td}>{d}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={S.hr} />
        <h2 id="architecture" style={S.h2}>3. Architecture recommandée pour ton setup</h2>
        <ArchDiagram />
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Couche</th><th style={S.th}>Outil</th><th style={S.th}>Protège</th></tr></thead>
            <tbody>
              <tr><td style={S.td}>Accès SSH</td><td style={S.td}>Firewall Hostinger</td><td style={S.td}>Port 22 — accès admin au VPS</td></tr>
              <tr><td style={S.td}>Accès web</td><td style={S.td}>Caddy</td><td style={S.td}>Ports 80/443 — tes apps publiques</td></tr>
            </tbody>
          </table>
        </div>

        <hr style={S.hr} />
        <h2 id="etape1" style={S.h2}>ÉTAPE 1 — Sécurisation SSH du VPS</h2>
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>🛡️ <B c="Snapshot d'abord" /> : Dans Hostinger, crée un snapshot avant toute modification.</p></div>
        <h3 style={S.h3}>1.1 — Connexion initiale</h3>
        <pre style={S.pre}><code style={S.preC}>ssh root@IP_DE_TON_VPS</code></pre>
        <h3 style={S.h3}>1.2 — Création d'un utilisateur non-root</h3>
        <pre style={S.pre}><code style={S.preC}>{`adduser tonprenom\nusermod -aG sudo tonprenom`}</code></pre>
        <h3 style={S.h3}>1.3 — Durcissement SSH</h3>
        <pre style={S.pre}><code style={S.preC}>sudo nano /etc/ssh/sshd_config</code></pre>
        <pre style={S.pre}><code style={S.preC}>{`PermitRootLogin no\nPasswordAuthentication no\nAllowUsers tonprenom`}</code></pre>
        <pre style={S.pre}><code style={S.preC}>sudo systemctl restart ssh</code></pre>
        <h3 style={S.h3}>1.4 — Permissions fichiers OpenClaw</h3>
        <pre style={S.pre}><code style={S.preC}>{`chmod 700 ~/.openclaw\nchmod 600 ~/.openclaw/openclaw.json`}</code></pre>

        <hr style={S.hr} />
        <h2 id="etape2" style={S.h2}>ÉTAPE 2 — Firewall Hostinger</h2>
        <p style={S.p}><B c="Security → Firewall → Nouveau firewall → Activer" /></p>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Action</th><th style={S.th}>Port</th><th style={S.th}>Source</th><th style={S.th}>Utilité</th></tr></thead>
            <tbody>
              {[["✅ Allow","22","Ton IP fixe","SSH sécurisé"],["✅ Allow","80","Anywhere","HTTP"],["✅ Allow","443","Anywhere","HTTPS"],["❌ Block","Tout","Anywhere","Tout le reste"]].map(([a,p,s,u],i)=>(
                <tr key={i}><td style={S.td}>{a}</td><td style={S.td}><Cd c={p} /></td><td style={S.td}><B c={s} /></td><td style={S.td}>{u}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={S.hr} />
        <h2 id="etape3" style={S.h2}>ÉTAPE 3 — OpenClaw dans Coolify & Variables d'environnement</h2>
        <h3 style={S.h3}>3.1 — Vérifications du conteneur</h3>
        <ul style={S.ul}>
          {["Statut Running","Port 18789 en loopback uniquement","Restart policy : always"].map((it,i)=><li key={i} style={S.li}>✅ {it}</li>)}
        </ul>
        <h3 style={S.h3}>3.2 — Variables d'environnement</h3>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⚠️ <B c="Aucune clé API ne doit jamais transiter par une conversation." /></p></div>
        <pre style={S.pre}><code style={S.preC}>{`OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx\nANTHROPIC_API_KEY=sk-ant-xxxxxxxx\nTELEGRAM_BOT_TOKEN=123456789:ABCDEFxxxxxxxx\nOPENCLAW_GATEWAY_TOKEN=token-long-aleatoire-32-chars`}</code></pre>

        <hr style={S.hr} />
        <h2 id="etape4" style={S.h2}>ÉTAPE 4 — Connexion au modèle IA</h2>
        <h3 style={S.h3}>Option A — Abonnement existant</h3>
        <ul style={S.ul}>
          <li style={S.li}>Installe Claude Code sur ton ordinateur</li>
          <li style={S.li}><Cd c="claude setup-token" /> → authentifie-toi → copie le token</li>
        </ul>
        <h3 style={S.h3}>Option B — Clé API</h3>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⚠️ Configure une <B c="limite mensuelle" /> et des alertes email à 25%/50%/75%.</p></div>

        <hr style={S.hr} />
        <h2 id="etape5" style={S.h2}>ÉTAPE 5 — Intégration Telegram</h2>
        <ul style={S.ul}>
          <li style={S.li}>Recherche <B c="@BotFather" /> dans Telegram (badge ✅ obligatoire)</li>
          <li style={S.li}>Envoie <Cd c="/newbot" /> puis donne un username terminant par <Cd c="_bot" /></li>
        </ul>
        <div style={S.bqW}><p style={{ ...S.p, margin:0 }}>⚠️ <B c="Token = mot de passe du bot." /> Stocke dans Coolify env vars uniquement.</p></div>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Politique</th><th style={S.th}>Comportement</th><th style={S.th}>Verdict</th></tr></thead>
            <tbody>
              {[["pairing","Code requis, ignoré jusqu'à approbation","✅ Recommandé"],["allowlist","Contacts approuvés uniquement","✅ Très sécurisé"],["open","N'importe qui peut écrire","🚨 Dangereux"],["disabled","DMs ignorés","Bots groupe uniquement"]].map(([p,b,v],i)=>(
                <tr key={i}><td style={S.td}><Cd c={p} /></td><td style={S.td}>{b}</td><td style={S.td}><B c={v} /></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <pre style={S.pre}><code style={S.preC}>openclaw pairing approve telegram [CODE]</code></pre>

        <hr style={S.hr} />
        <h2 id="etape6" style={S.h2}>ÉTAPE 6 — Interface graphique via Caddy</h2>
        <pre style={S.pre}><code style={S.preC}>{`your-domain.com {\n  reverse_proxy /openclaw localhost:18789\n}`}</code></pre>
        <pre style={S.pre}><code style={S.preC}>openclaw gateway token</code></pre>
        <p style={S.p}>Premier accès : <Cd c="https://openclaw.ton-domaine.com?token=TONTOKEN" /></p>

        <hr style={S.hr} />
        <h2 id="etape7" style={S.h2}>ÉTAPE 7 — Audit de sécurité</h2>
        <pre style={S.pre}><code style={S.preC}>{`openclaw security audit\nopenclaw security audit --deep\nopenclaw security audit --fix`}</code></pre>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Catégorie</th><th style={S.th}>Ce qui est vérifié</th></tr></thead>
            <tbody>
              {[["🌐 Réseau","Gateway bind/auth, tokens trop courts"],["🔑 Auth","auth.mode: none, Control UI sans token"],["📁 Fichiers",".openclaw 700, openclaw.json 600"],["💬 DM","dmPolicy: open avec outils activés"],["🔌 Plugins","Extensions non épinglées"],["🤖 Modèle","Petits modèles avec outils dangereux"]].map(([c,v],i)=>(
                <tr key={i}><td style={S.td}><B c={c} /></td><td style={S.td}>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={S.hr} />
        <h2 id="pratiques" style={S.h2}>Bonnes pratiques post-installation</h2>
        <div style={{ overflowX:"auto" }}>
          <table style={S.tbl}>
            <thead><tr><th style={S.th}>Service</th><th style={S.th}>Bonne pratique</th></tr></thead>
            <tbody>
              {[["Gmail","Gmail séparé uniquement pour le bot"],["Google Drive","Drive séparé, dossiers partagés au minimum"],["GitHub","Token permissions minimales"],["Navigateur","Ne jamais donner accès au navigateur principal"]].map(([s,p],i)=>(
                <tr key={i}><td style={S.td}><B c={s} /></td><td style={S.td}>{p}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr style={S.hr} />
        <h2 id="checklist" style={S.h2}>Checklist finale de sécurité</h2>
        <h3 style={S.h3}>Sécurité VPS</h3>
        <ul style={{ listStyle:"none", padding:0 }}>
          {["Snapshot VPS créé","Utilisateur non-root créé","PermitRootLogin no","PasswordAuthentication no","AllowUsers configuré","SSH redémarré","chmod 700 ~/.openclaw","chmod 600 ~/.openclaw/openclaw.json"].map((it,i)=><ChkItem key={i} label={it} />)}
        </ul>
        <h3 style={S.h3}>Firewall</h3>
        <ul style={{ listStyle:"none", padding:0 }}>
          {["Port 22 uniquement depuis ton IP fixe","Ports 80/443 ouverts","Tout le reste bloqué","Règles synchronisées"].map((it,i)=><ChkItem key={i} label={it} />)}
        </ul>
        <h3 style={S.h3}>OpenClaw & Coolify</h3>
        <ul style={{ listStyle:"none", padding:0 }}>
          {["Conteneur Running, restart policy always","Port 18789 loopback uniquement","Clés API dans env vars Coolify","Aucune clé dans une conversation","Gateway Token configuré","Interface Caddy HTTPS"].map((it,i)=><ChkItem key={i} label={it} />)}
        </ul>
        <h3 style={S.h3}>Telegram</h3>
        <ul style={{ listStyle:"none", padding:0 }}>
          {["Bot créé via @BotFather","Token dans env vars","Message BotFather effacé","dmPolicy: pairing","Appairage validé"].map((it,i)=><ChkItem key={i} label={it} />)}
        </ul>
        <h3 style={S.h3}>Audit</h3>
        <ul style={{ listStyle:"none", padding:0 }}>
          {["security audit sans findings critiques","Aucun service avec compte principal","Limite dépenses API configurée","Alertes email activées","Aucune clé dans les logs"].map((it,i)=><ChkItem key={i} label={it} />)}
        </ul>

        <hr style={S.hr} />
        <div style={S.bq}><p style={{ ...S.p, margin:0 }}>🎯 <B c="Top 1% des installations les plus sécurisées." /> Conforme à la doc officielle OpenClaw.<br /><br />Trois principes : <B c="contrôle ce qui entre, contrôle ce qui sort, isole tout ce qui peut l'être." /></p></div>
      </article>

      {/* TOC */}
      <aside style={{ position:"sticky", top:0, height:"100vh", display:"flex", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:13, textTransform:"uppercase", letterSpacing:"0.12em", color:"#34d399", fontWeight:700, marginBottom:18 }}>Sommaire</div>
          <nav style={{ display:"flex", flexDirection:"column", borderLeft:"1px solid rgba(39,39,42,0.5)" }}>
            {TOC.map(({ id, label }) => {
              const isA = activeId === id;
              return (
                <a key={id} href={`#${id}`}
                  onClick={e => { e.preventDefault(); onTocClick(id); }}
                  style={{ display:"block", fontSize:14, padding:"8px 0 8px 16px", marginLeft:-1, borderLeft:`1px solid ${isA?"#34d399":"transparent"}`, color:isA?"#34d399":"#71717a", fontWeight:isA?600:400, textDecoration:"none", lineHeight:1.6, transition:"all 0.15s", cursor:"pointer" }}
                  onMouseEnter={e => { if (!isA) { (e.currentTarget as HTMLElement).style.color="#34d399"; (e.currentTarget as HTMLElement).style.borderLeftColor="#34d399"; }}}
                  onMouseLeave={e => { if (!isA) { (e.currentTarget as HTMLElement).style.color="#71717a"; (e.currentTarget as HTMLElement).style.borderLeftColor="transparent"; }}}
                >{label}</a>
              );
            })}
          </nav>
        </div>
      </aside>
    </div>
  );
}

// ─── OFFER PAGE ───────────────────────────────────────────────
function OfferPage() {
  return (
    <div style={{ maxWidth:860, margin:"0 auto", display:"flex", flexDirection:"column", gap:"5rem", paddingBottom:"6rem", paddingTop:"1rem" }}>

      <section style={{ textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 14px", borderRadius:9999, background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", color:"#a5b4fc", fontSize:12, fontFamily:"monospace", marginBottom:28 }}>🤖 Service OpenClaw + API LinkedIn</div>
        <h1 style={S.h1}>Ton agent IA LinkedIn qui prospecte<br /><span style={S.gradI}>pendant que tu dors</span></h1>
        <p style={{ fontSize:17, color:"#a1a1aa", lineHeight:1.8, marginBottom:36 }}><B c="Setup clé en main. 100% sécurisé. Zéro technique." /><br />Tu te concentres sur les conversations. L'agent gère tout le reste.</p>
        <button style={{ padding:"14px 32px", borderRadius:12, background:"#f4f4f5", color:"#09090b", fontWeight:"bold", border:"none", cursor:"pointer", fontSize:16 }}>Je veux mon agent LinkedIn →</button>
        <div style={{ marginTop:12, fontSize:12, color:"#52525b", fontFamily:"monospace" }}>Places limitées — Setup en 48h</div>
      </section>

      <section>
        <h2 style={{ ...S.h2, marginTop:0, marginBottom:24 }}>Tu reconnais ça ?</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
          {["Tu passes des heures à envoyer des demandes de connexion à la main","Tu contactes des gens à froid — ignoré 80% du temps","L'automatisation IA te semble trop technique","Tu as essayé des outils LinkedIn coûteux sans résultats"].map((it,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 18px", borderRadius:12, background:"rgba(239,68,68,0.05)", border:"1px solid rgba(239,68,68,0.1)" }}>
              <span style={{ color:"#ef4444", flexShrink:0 }}>✗</span>
              <span style={{ color:"#d4d4d8", lineHeight:1.6 }}>{it}</span>
            </div>
          ))}
        </div>
        <div style={S.bqW}><p style={{ ...S.p, margin:0, fontSize:16 }}><B c="La vraie raison :" /> Tu contactes les mauvaises personnes, au mauvais moment, sans contexte partagé.</p></div>
      </section>

      <section>
        <h2 style={{ ...S.h2, marginTop:0, marginBottom:28, textAlign:"center" }}>Cold vs Warm outreach</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
          <div style={{ ...S.card, opacity:0.65 }}>
            <h3 style={{ ...S.h3, marginTop:0, color:"#71717a" }}>✗ Cold Outreach</h3>
            {[["Taux d'acceptation","10–20%","#f87171"],["Résultat","Ignoré dans 80% des cas","#a1a1aa"],["Exécution","Manuel, chronophage","#a1a1aa"]].map(([l,v,c],i)=>(
              <div key={i} style={{ paddingBottom:10, marginBottom:10, borderBottom:"1px solid #1e2235" }}>
                <div style={{ fontSize:11, textTransform:"uppercase" as const, color:"#3f4263", marginBottom:3 }}>{l}</div>
                <div style={{ color:c, fontWeight:i===0?"bold":"normal" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ padding:28, borderRadius:16, background:"linear-gradient(180deg,rgba(99,102,241,0.08),#0f1120)", border:"1px solid rgba(99,102,241,0.25)" }}>
            <h3 style={{ ...S.h3, marginTop:0, color:"#a5b4fc" }}>✓ Warm Signal Outreach</h3>
            {[["Taux d'acceptation","60–70%","#34d399"],["Résultat","Capte l'attention au bon moment","#e4e4e7"],["Exécution","100% automatisé","#a5b4fc"]].map(([l,v,c],i)=>(
              <div key={i} style={{ paddingBottom:10, marginBottom:10, borderBottom:"1px solid rgba(99,102,241,0.08)" }}>
                <div style={{ fontSize:11, textTransform:"uppercase" as const, color:"rgba(165,180,252,0.5)", marginBottom:3 }}>{l}</div>
                <div style={{ color:c, fontWeight:"bold", fontSize:i===0?22:15 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ ...S.h2, marginTop:0, marginBottom:12, textAlign:"center" }}>Ce que tu reçois</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {[
            { Icon:Shield, color:"#34d399", title:"1. OpenClaw installé et sécurisé sur ton VPS", desc:"Ton agent tourne 24h/24 sur ton propre serveur, pas sur un SaaS partagé.", items:["Installation VPS Hostinger + Coolify","Sécurisation complète (firewall, SSH, env vars)","Clés API protégées, jamais exposées","Redémarrages automatiques"], quote:"Pendant que d'autres utilisent des outils SaaS qui peuvent fermer du jour au lendemain, toi tu possèdes ton infrastructure." },
            { Icon:Cpu, color:"#818cf8", title:"2. Ton agent LinkedIn opérationnel", desc:"API spécialisée sur les signaux chauds, utilisée par 500+ professionnels.", items:["Surveille les posts LinkedIn de tes concurrents","Extrait les profils ayant liké ou commenté","Envoie des demandes personnalisées avec contexte","Simule un comportement humain (rate limiting)"], quote:null },
            { Icon:GitMerge, color:"#22d3ee", title:"3. Intégration n8n", desc:"Templates n8n prêts à l'emploi pour connecter ton CRM automatiquement.", items:["Alimenter ton CRM","Séquences de follow-up","Notifications Telegram"], quote:null },
          ].map((p, i) => (
            <div key={i} style={{ ...S.card, display:"flex", gap:22, flexWrap:"wrap" as const }}>
              <div style={{ width:44, height:44, borderRadius:8, background:`${p.color}12`, border:`1px solid ${p.color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <p.Icon size={20} color={p.color} strokeWidth={1.5} />
              </div>
              <div style={{ flex:1, minWidth:200 }}>
                <h3 style={{ ...S.h3, marginTop:0, color:p.color }}>{p.title}</h3>
                <p style={{ ...S.p, marginTop:0 }}>{p.desc}</p>
                <ul style={S.ul}>{p.items.map((it,j)=><li key={j} style={{ ...S.li, color:"#d4d4d8" }}>✓ {it}</li>)}</ul>
                {p.quote && <div style={S.bq}><p style={{ ...S.p, margin:0, fontStyle:"italic", fontSize:14 }}>{p.quote}</p></div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:48, borderRadius:24, background:"linear-gradient(135deg,rgba(99,102,241,0.08),rgba(16,185,129,0.08))", textAlign:"center" }}>
        <h2 style={{ ...S.h2, marginTop:0, marginBottom:16 }}>Ce que ça change concrètement</h2>
        <div style={{ fontSize:"clamp(3rem,8vw,5rem)", fontWeight:800, ...S.grad, marginBottom:12 }}>60–70%</div>
        <p style={{ color:"#d4d4d8", fontSize:16, marginBottom:40 }}>de taux d'acceptation vs 10–20% en cold outreach classique.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
          {[["Volume qualifié","Sur 100 demandes → 60-70 connexions engagées."],["Timing parfait","Message au bon moment, après engagement."],["Contexte partagé","Un prétexte naturel pour démarrer la conversation."]].map(([t,d],i)=>(
            <div key={i} style={{ padding:18, borderRadius:12, background:"rgba(9,9,11,0.5)", border:"1px solid rgba(39,39,42,0.5)", textAlign:"left" as const }}>
              <div style={{ color:"#34d399", fontWeight:"bold", marginBottom:6, fontSize:14 }}>{t}</div>
              <p style={{ fontSize:13, color:"#a1a1aa", lineHeight:1.6, margin:0 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign:"center" }}>
        <h2 style={{ ...S.h2, marginTop:0, marginBottom:36 }}>Investissement</h2>
        <div style={{ maxWidth:460, margin:"0 auto", position:"relative", paddingTop:20 }}>
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translate(-50%,-50%)", padding:"6px 16px", background:"#10b981", color:"#09090b", fontSize:11, fontWeight:"bold", textTransform:"uppercase" as const, borderRadius:9999, whiteSpace:"nowrap" as const, zIndex:10 }}>⚡ Offre de lancement — 48h</div>
          <div style={{ padding:40, borderRadius:24, background:"#0f1120", border:"1px solid rgba(16,185,129,0.3)" }}>
            <h3 style={{ ...S.h3, marginTop:8, marginBottom:8, fontSize:20, textAlign:"center" as const }}>Setup Complet Clé en Main</h3>
            <div style={{ textAlign:"center", marginBottom:32, display:"flex", alignItems:"center", justifyContent:"center", gap:16 }}>
              <span style={{ fontSize:22, fontWeight:"bold", color:"#52525b", textDecoration:"line-through" }}>590€</span>
              <span style={{ fontSize:48, fontWeight:800, color:"#fff" }}>290€</span>
            </div>
            <ul style={{ padding:0, marginBottom:32 }}>
              {["Installation OpenClaw sécurisée","Agent LinkedIn configuré","Intégration n8n + CRM","Intégration Telegram sécurisée","Prospection 24/7","Support VIP 30 jours"].map((it,i)=>(
                <li key={i} style={{ display:"flex", alignItems:"center", gap:10, color:"#d4d4d8", fontSize:14, margin:"10px 0", listStyle:"none" }}>
                  <span style={{ color:"#10b981" }}>✓</span>{it}
                </li>
              ))}
            </ul>
            <button style={{ width:"100%", padding:16, borderRadius:12, background:"#10b981", color:"#09090b", fontWeight:"bold", border:"none", cursor:"pointer", fontSize:16 }}>Réserver mon setup →</button>
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ ...S.h2, marginTop:0, marginBottom:28, textAlign:"center" }}>Questions fréquentes</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[["J'ai besoin de quoi ?","Un VPS Hostinger et un compte LinkedIn actif. Je m'occupe de tout le reste."],["Risqué pour mon compte LinkedIn ?","L'API intègre un smart scheduling qui respecte les limites LinkedIn."],["Zéro compétence technique ?","Tu reçois un agent opérationnel clé en main."],["En cas de panne ?","Redémarrage automatique + support 30 jours inclus."],["Différence avec un outil classique ?","Tu contactes des gens qui viennent de s'engager sur ton sujet — le warm signal."]].map(([q,a],i)=>(
            <div key={i} style={S.card}>
              <h3 style={{ ...S.h3, marginTop:0, marginBottom:8 }}>{q}</h3>
              <p style={{ ...S.p, margin:0 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding:56, borderRadius:24, background:"linear-gradient(135deg,#4f46e5,#0891b2)", textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(1.4rem,3vw,2rem)", fontWeight:700, color:"#fff", marginBottom:16, marginTop:0 }}>Prêt à avoir ton agent LinkedIn opérationnel en 48h ?</h2>
        <p style={{ color:"rgba(224,231,255,0.85)", marginBottom:36, fontSize:16 }}>Setup en 48h · Support 30 jours · Ton infrastructure, pas un SaaS partagé</p>
        <button style={{ padding:"16px 40px", borderRadius:12, background:"#fff", color:"#312e81", fontWeight:"bold", border:"none", cursor:"pointer", fontSize:16 }}>Réserver mon setup →</button>
      </section>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<"guide"|"offer">("guide");
  const [activeId, setActiveId] = useState<string|null>(null);

  const bounceScrollTo = (target: number) => {
    const start = window.scrollY;
    const dist  = target - start;
    const dur   = 2400;
    let t0: number | null = null;
    const ease = (t: number) => {
      const io = (p: number) => p < 0.5 ? 2*p*p : -1+(4-2*p)*p;
      if (t < 0.70) return io(t/0.70)*1.008;
      return 1.008 - io((t-0.70)/0.30)*0.008;
    };
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const e = Math.min((ts-t0)/dur, 1);
      window.scrollTo(0, start + dist * ease(e));
      if (e < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleTocClick = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) bounceScrollTo(el.getBoundingClientRect().top + window.scrollY - 24);
  };

  return (
    <div style={S.app}>
      <div style={S.g1} /><div style={S.g2} />
      <div style={S.nav}>
        <div style={S.navI}>
          <div style={S.navB}>
            {([["guide","📖 Guide d'installation",false],["offer","💼 Service & Offre",true]] as [string,string,boolean][]).map(([id,label,isOffer])=>{
              const on = tab === id;
              const st = isOffer ? (on ? S.tOA : S.tOI) : (on ? S.tA : S.tI);
            return <button key={id} onClick={() => { setTab(id as "guide"|"offer"); window.scrollTo({ top:0, behavior:"instant" }); }} style={st}>{label}</button>;
            })}
          </div>
        </div>
      </div>
      <div style={S.main}>
        {tab === "guide"
          ? <GuideContent activeId={activeId} onTocClick={handleTocClick} />
          : <OfferPage />}
      </div>
      <button onClick={() => bounceScrollTo(0)} title="Retour en haut"
        style={{ position:"fixed", bottom:32, right:280, width:44, height:44, borderRadius:"50%", background:"#10b981", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(16,185,129,0.35)", zIndex:100, fontSize:20, color:"#09090b", fontWeight:"bold" }}>↑</button>
    </div>
  );
}