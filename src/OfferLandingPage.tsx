import { motion } from 'motion/react';
import { 
  CheckCircle2, XCircle, MessageSquare, Users, Zap, Server, 
  Bot, Workflow, TrendingUp, Target, Briefcase, Building2, 
  CreditCard, Terminal, ArrowRight, ChevronRight, AlertTriangle, Lock
} from 'lucide-react';

export default function OfferLandingPage() {
  return (
    <div className="space-y-32 pb-24 pt-8">
      
      {/* HERO SECTION */}
      <section className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-mono mb-8">
            <Bot className="w-4 h-4" />
            <span>Service OpenClaw + API LinkedIn</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 text-zinc-100 font-display">
            Ton agent IA LinkedIn qui prospecte <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">pendant que tu dors</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
            <strong className="text-zinc-200 font-medium">Setup clé en main. 100% sécurisé. Zéro technique.</strong><br/>
            Tu te concentres sur les conversations. L'agent gère tout le reste.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="px-8 py-4 rounded-xl bg-zinc-100 text-zinc-950 font-bold hover:bg-white hover:scale-105 transition-all flex items-center gap-2 text-lg">
              Je veux mon agent LinkedIn <ArrowRight className="w-5 h-5" />
            </button>
            <span className="text-sm text-zinc-500 font-mono">Places limitées - Setup en 48h</span>
          </div>
        </motion.div>
      </section>

      {/* PROBLEM SECTION */}
      <section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 font-display">Tu reconnais ça ?</h2>
            <ul className="space-y-4">
              {[
                "Tu passes des heures à envoyer des demandes de connexion à la main sur LinkedIn",
                "Tu contactes des gens à froid - et tu te fais ignorer 80% du temps",
                "Tu as entendu parler de l'automatisation IA mais c'est trop technique à mettre en place",
                "Tu as essayé des outils LinkedIn qui t'ont coûté cher pour des résultats décevants"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
            <AlertTriangle className="w-10 h-10 text-rose-400 mb-6" />
            <h3 className="text-xl font-bold text-zinc-100 mb-4">La vraie raison pour laquelle ton outreach ne fonctionne pas :</h3>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Tu contactes les mauvaises personnes, au mauvais moment, sans contexte partagé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display">La différence entre cold et warm outreach</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cold */}
          <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 opacity-75">
            <h3 className="text-xl font-bold text-zinc-400 mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Cold Outreach classique
            </h3>
            <ul className="space-y-4 text-zinc-400">
              <li className="flex flex-col gap-1 pb-4 border-b border-zinc-800/50">
                <span className="text-sm uppercase tracking-wider text-zinc-500">Approche</span>
                <span>Contact à froid, sans contexte</span>
              </li>
              <li className="flex flex-col gap-1 pb-4 border-b border-zinc-800/50">
                <span className="text-sm uppercase tracking-wider text-zinc-500">Taux d'acceptation</span>
                <span className="text-rose-400 font-bold">10–20%</span>
              </li>
              <li className="flex flex-col gap-1 pb-4 border-b border-zinc-800/50">
                <span className="text-sm uppercase tracking-wider text-zinc-500">Message type</span>
                <span className="italic">"Bonjour, je voulais me connecter..."</span>
              </li>
              <li className="flex flex-col gap-1 pb-4 border-b border-zinc-800/50">
                <span className="text-sm uppercase tracking-wider text-zinc-500">Résultat</span>
                <span>Ignoré dans 80% des cas</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-sm uppercase tracking-wider text-zinc-500">Exécution</span>
                <span>Manuel, chronophage</span>
              </li>
            </ul>
          </div>
          
          {/* Warm */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-500/10 to-zinc-900 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Warm Signal Outreach
            </h3>
            <ul className="space-y-4 text-zinc-200 relative z-10">
              <li className="flex flex-col gap-1 pb-4 border-b border-indigo-500/10">
                <span className="text-sm uppercase tracking-wider text-indigo-400/70">Approche</span>
                <span>Contact après un engagement sur un post</span>
              </li>
              <li className="flex flex-col gap-1 pb-4 border-b border-indigo-500/10">
                <span className="text-sm uppercase tracking-wider text-indigo-400/70">Taux d'acceptation</span>
                <span className="text-emerald-400 font-bold text-xl">60–70%</span>
              </li>
              <li className="flex flex-col gap-1 pb-4 border-b border-indigo-500/10">
                <span className="text-sm uppercase tracking-wider text-indigo-400/70">Message type</span>
                <span className="italic">"J'ai vu ton commentaire sur [post], je partage ton point de vue..."</span>
              </li>
              <li className="flex flex-col gap-1 pb-4 border-b border-indigo-500/10">
                <span className="text-sm uppercase tracking-wider text-indigo-400/70">Résultat</span>
                <span>Capte l'attention au bon moment</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-sm uppercase tracking-wider text-indigo-400/70">Exécution</span>
                <span className="font-bold text-indigo-300">100% automatisé par ton agent IA</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-display mb-4">Ce que tu reçois</h2>
          <p className="text-zinc-400">Une infrastructure complète, sécurisée et prête à générer des leads.</p>
        </div>

        <div className="space-y-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Lock className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">1. OpenClaw installé et sécurisé sur ton VPS</h3>
              <p className="text-zinc-400 mb-6">
                Ton agent tourne <strong>24h/24 sur ton propre serveur</strong>, pas sur un SaaS partagé avec 10 000 autres utilisateurs.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 mb-6">
                {["Installation sur VPS Hostinger + Coolify", "Sécurisation complète (firewall, SSH, env vars)", "Conforme aux meilleures pratiques officielles", "Toutes tes clés API protégées, jamais exposées", "Redémarrages automatiques"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500 text-sm text-emerald-200/80 italic">
                "Pendant que d'autres utilisent des outils SaaS qui peuvent fermer du jour au lendemain, toi tu possèdes ton infrastructure."
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-8 h-8 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">2. Ton agent LinkedIn opérationnel</h3>
              <p className="text-zinc-400 mb-6">
                L'agent utilise <strong>une API spécialisée</strong> - l'outil d'automatisation LinkedIn basé sur les signaux chauds, utilisé par 500+ professionnels.
              </p>
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Ce que fait ton agent automatiquement :</h4>
                <ul className="space-y-3">
                  {[
                    { icon: Target, text: "Surveille les posts LinkedIn de tes concurrents ou influenceurs" },
                    { icon: Users, text: "Extrait les profils de toutes les personnes ayant liké ou commenté" },
                    { icon: MessageSquare, text: "Envoie des demandes de connexion personnalisées avec référence au post" },
                    { icon: Zap, text: "Suit les commentateurs avec un DM automatique contextuel" },
                    { icon: TrendingUp, text: "Simule un comportement humain (délais intelligents, rate limiting)" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-300">
                      <item.icon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Workflow className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">3. Intégration n8n (si tu l'utilises déjà)</h3>
              <p className="text-zinc-400 mb-4">
                L'API dispose de <strong>templates n8n prêts à l'emploi</strong>. Si tu as déjà n8n sur ton VPS, ton agent LinkedIn peut s'y connecter en quelques minutes.
              </p>
              <ul className="flex flex-wrap gap-3">
                <li className="px-3 py-1.5 rounded-lg bg-zinc-800 text-sm text-zinc-300">Alimenter ton CRM</li>
                <li className="px-3 py-1.5 rounded-lg bg-zinc-800 text-sm text-zinc-300">Séquences de follow-up</li>
                <li className="px-3 py-1.5 rounded-lg bg-zinc-800 text-sm text-zinc-300">Notifications Telegram</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section className="relative py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-emerald-500/10 to-transparent rounded-3xl"></div>
        <div className="relative z-10 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold font-display mb-8">Ce que ça change concrètement</h2>
          <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
            60–70%
          </div>
          <p className="text-xl text-zinc-300 mb-12 font-light">
            de taux d'acceptation de connexion vs 10–20% en cold outreach classique.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
              <div className="text-emerald-400 font-bold mb-2">Volume qualifié</div>
              <p className="text-sm text-zinc-400">Sur 100 demandes envoyées → 60 à 70 nouvelles connexions avec des personnes déjà engagées.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
              <div className="text-emerald-400 font-bold mb-2">Timing parfait</div>
              <p className="text-sm text-zinc-400">Chaque message arrive quand la personne vient de liker ou commenter un post sur ton domaine.</p>
            </div>
            <div className="p-6 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
              <div className="text-emerald-400 font-bold mb-2">Contexte partagé</div>
              <p className="text-sm text-zinc-400">Tu n'envoies plus à l'aveugle - tu as un prétexte naturel pour démarrer la conversation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Ce service est fait pour toi si tu es...</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: Briefcase, title: "Founder / Entrepreneur", desc: "Tu veux tes premiers clients sans passer tes journées sur LinkedIn. Ton agent cible les personnes qui s'intéressent aux posts de tes concurrents." },
            { icon: TrendingUp, title: "Sales / SDR", desc: "Tu veux remplir ton pipeline de leads chauds et atteindre tes quotas plus vite. L'agent tourne en continu, tu ne t'occupes que des conversations." },
            { icon: Target, title: "Recruteur", desc: "Tu veux trouver des candidats qui parlent déjà de leur recherche d'emploi ou des tendances de ton secteur. L'agent les identifie au moment parfait." },
            { icon: Building2, title: "Agence", desc: "Tu veux gérer la prospection de plusieurs clients sans recruter de SDRs supplémentaires. Un agent par client, campagnes séparées, tout centralisé." }
          ].map((persona, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                <persona.icon className="w-6 h-6 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-100 mb-2">{persona.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{persona.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Investissement</h2>
        </div>
        <div className="max-w-xl mx-auto">
          {/* Setup */}
          <div className="p-8 rounded-3xl bg-zinc-900 border border-emerald-500/30 relative shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-emerald-500 text-zinc-950 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2">
              <Zap className="w-3 h-3" />
              Offre de lancement - Valable 48h
            </div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-2 text-center mt-4">Setup Complet Clé en Main</h3>
            <div className="text-center mb-8 flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-zinc-500 line-through decoration-rose-500/50">590€</span>
              <span className="text-5xl font-bold text-white">290€</span>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                "Installation OpenClaw sécurisée sur ton propre VPS",
                "Agent LinkedIn configuré et prêt à prospecter",
                "Intégration n8n pour connecter ton CRM automatiquement",
                "Intégration Telegram sécurisée pour piloter depuis ton téléphone",
                "Prospection 24/7",
                "Support VIP de 30 jours post-installation"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2">
              Réserver mon setup <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section>
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900 border border-zinc-800">
          <h2 className="text-2xl font-bold font-display mb-8 flex items-center gap-3">
            <Terminal className="w-6 h-6 text-zinc-400" />
            Comment ça fonctionne sous le capot
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="font-mono text-sm text-zinc-400 bg-zinc-950 p-6 rounded-xl border border-zinc-800">
              <div className="text-emerald-400 mb-2">LinkedIn (posts, likes, commentaires)</div>
              <div className="pl-4 border-l border-zinc-800 py-2">↓</div>
              <div className="text-indigo-400 mb-2">API LinkedIn (extraction signaux chauds)</div>
              <div className="pl-4 border-l border-zinc-800 py-2">↓</div>
              <div className="text-cyan-400 mb-2">Agent OpenClaw (orchestration IA)</div>
              <div className="pl-4 border-l border-zinc-800 py-2">↓</div>
              <div className="text-zinc-200 mb-2">Envoi personnalisé sur LinkedIn</div>
              <div className="pl-4 border-l border-zinc-800 py-2">↓</div>
              <div className="text-zinc-500">Export CRM / n8n / Telegram</div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-zinc-200 mb-4">Stack technique :</h3>
              <ul className="space-y-4">
                <li className="flex gap-3"><strong className="text-zinc-200 w-24 shrink-0">OpenClaw</strong> <span className="text-zinc-400">Moteur d'orchestration de l'agent IA</span></li>
                <li className="flex gap-3"><strong className="text-zinc-200 w-24 shrink-0">API Spécialisée</strong> <span className="text-zinc-400">API LinkedIn warm signals (500+ pros)</span></li>
                <li className="flex gap-3"><strong className="text-zinc-200 w-24 shrink-0">Coolify</strong> <span className="text-zinc-400">Gestion des conteneurs sur ton VPS</span></li>
                <li className="flex gap-3"><strong className="text-zinc-200 w-24 shrink-0">Caddy</strong> <span className="text-zinc-400">Reverse proxy HTTPS officiel</span></li>
                <li className="flex gap-3"><strong className="text-zinc-200 w-24 shrink-0">n8n</strong> <span className="text-zinc-400">Workflows d'automatisation optionnels</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Questions fréquentes</h2>
        </div>
        <div className="grid gap-4 max-w-3xl mx-auto">
          {[
            { q: "J'ai besoin de quoi pour commencer ?", a: "Un VPS Hostinger (à partir de quelques euros/mois) et un compte LinkedIn actif. Je m'occupe de tout le reste." },
            { q: "Est-ce que c'est risqué pour mon compte LinkedIn ?", a: "L'API intègre un smart scheduling qui simule un comportement humain et respecte les limites de LinkedIn. C'est conçu pour fonctionner dans les règles." },
            { q: "Je n'ai aucune compétence technique. C'est pour moi ?", a: "Oui, c'est exactement pour ça que ce service existe. Tu n'as rien à installer, rien à configurer - tu reçois un agent opérationnel clé en main." },
            { q: "Est-ce que ça marche avec mon CRM existant ?", a: "Si tu utilises n8n, les templates de l'API permettent une connexion CRM en quelques minutes. Pour d'autres intégrations, on en discute lors du setup." },
            { q: "Que se passe-t-il si quelque chose ne fonctionne plus ?", a: "Ton agent tourne sur ton propre serveur avec redémarrage automatique. Tu n'es pas dépendant d'un SaaS externe. Le support post-installation de 30 jours couvre les ajustements nécessaires." },
            { q: "Quelle différence avec un outil LinkedIn classique ?", a: "La plupart des outils font du cold outreach - ils contactent des inconnus au hasard. Ici, tu contactes des personnes qui viennent de s'engager sur un sujet qui te concerne - c'est ça le warm signal, et c'est pour ça que le taux d'acceptation est 3 à 6x supérieur." }
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-100 mb-2">{faq.q}</h3>
              <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display">
              Prêt à avoir ton agent LinkedIn opérationnel en 48h ?
            </h2>
            <p className="text-indigo-100 mb-10 text-lg max-w-2xl mx-auto">
              Setup en 48h · Support 30 jours · Ton infrastructure, pas un SaaS partagé
            </p>
            <button className="px-8 py-4 rounded-xl bg-white text-indigo-950 font-bold hover:scale-105 transition-all flex items-center gap-2 text-lg mx-auto shadow-xl shadow-indigo-900/20">
              Réserver mon setup <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
