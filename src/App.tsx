import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Shield, ChevronRight, Server, BookOpen, Briefcase, List } from 'lucide-react';
import { content } from './content';
import OfferLandingPage from './OfferLandingPage';

function InteractiveCheckbox({ checked: initialChecked, disabled, ...props }: any) {
  const [checked, setChecked] = useState(initialChecked || false);
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      className="w-4 h-4 mt-1.5 text-emerald-500 bg-zinc-900 border-zinc-700 rounded focus:ring-emerald-500 focus:ring-2 cursor-pointer transition-colors accent-emerald-500"
      {...props}
    />
  );
}

const tocItems = [
  { id: "1-comprendre-ce-quest-vraiment-clawbot", label: "1. Comprendre ClawBot" },
  { id: "2-pourquoi-la-sécurité-est-non-négociable", label: "2. La sécurité avant tout" },
  { id: "3-architecture-recommandée-pour-ton-setup", label: "3. Architecture recommandée" },
  { id: "étape-1---sécurisation-ssh-du-vps", label: "Étape 1 : Sécurisation SSH" },
  { id: "étape-2---firewall-hostinger", label: "Étape 2 : Firewall Hostinger" },
  { id: "étape-3---openclaw-dans-coolify--variables-denvironnement", label: "Étape 3 : Déploiement Coolify" },
  { id: "étape-4---connexion-au-modèle-ia", label: "Étape 4 : Connexion IA" },
  { id: "étape-5---intégration-telegram", label: "Étape 5 : Intégration Telegram" },
  { id: "étape-6---accès-à-linterface-graphique-via-caddy", label: "Étape 6 : Interface via Caddy" },
  { id: "étape-7---audit-de-sécurité-openclaw", label: "Étape 7 : Audit de sécurité" },
  { id: "bonnes-pratiques-post-installation", label: "Bonnes pratiques" },
  { id: "checklist-finale-de-sécurité", label: "Checklist finale" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'offer'>('guide');
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (activeTab !== 'guide') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    // Small delay to ensure markdown is rendered and IDs exist
    const timeout = setTimeout(() => {
      tocItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-zinc-950 relative">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-12 pb-4">
        <div className="flex p-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-xl w-fit mx-auto lg:mx-0">
          <button 
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'guide' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
          >
            <BookOpen className="w-4 h-4" />
            Guide d'installation
          </button>
          <button 
            onClick={() => setActiveTab('offer')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'offer' ? 'bg-zinc-800 text-zinc-100 shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
          >
            <Briefcase className="w-4 h-4" />
            Service & Offre
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {activeTab === 'guide' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            {/* STICKY SIDEBAR TOC */}
            <aside className="hidden lg:block sticky top-8 py-6 pr-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
              <h3 className="text-zinc-100 font-semibold mb-6 flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
                <List className="w-4 h-4 text-emerald-400" />
                Sommaire
              </h3>
              <nav className="flex flex-col relative border-l border-zinc-800/50 ml-2">
                {tocItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a 
                      key={item.id} 
                      href={`#${item.id}`}
                      onClick={() => setActiveSection(item.id)}
                      className={`text-[13px] transition-colors cursor-pointer py-2 pl-4 -ml-[1px] border-l leading-relaxed ${
                        isActive 
                          ? 'text-emerald-400 border-emerald-400 font-medium' 
                          : 'text-zinc-400 border-transparent hover:text-emerald-400 hover:border-emerald-400'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* MAIN CONTENT */}
            <div className="max-w-3xl">
              {/* GUIDE HERO SECTION */}
              <motion.header 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-16 pt-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-mono mb-8">
                <Shield className="w-4 h-4" />
                <span>Guide Officiel Sécurisé</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-zinc-100">
                Installer ClawBot <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Correctement & Sécurisé.
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-10">
                Version : VPS Hostinger + Coolify + Caddy + Multi-Applications. <br/>
                Enrichi avec la documentation officielle OpenClaw.
              </p>
            </motion.header>

              {/* EXACT MARKDOWN CONTENT */}
              <motion.main 
                id="guide-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="prose prose-invert prose-zinc max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-emerald-400 hover:prose-a:text-emerald-300 prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-zinc-800/50 prose-code:text-emerald-300/90 prose-strong:text-zinc-200 prose-blockquote:border-l-emerald-500/50 prose-blockquote:bg-emerald-500/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-th:bg-zinc-900 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-zinc-800"
              >
                <div className="markdown-body">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug]}
                    components={{
                      a: ({node, ...props}) => {
                        if (props.href?.startsWith('#')) {
                          return <a {...props} className="text-white hover:text-emerald-400 cursor-pointer transition-colors no-underline font-medium" />;
                        }
                        return <a {...props} />;
                      },
                      input: ({node, ...props}) => {
                        if (props.type === 'checkbox') {
                          return <InteractiveCheckbox {...props} />;
                        }
                        return <input {...props} />;
                      },
                      li: ({node, className, ...props}) => {
                        // Remove default list styling if it's a task list item
                        if (className === 'task-list-item') {
                          return <li {...props} className="flex items-start gap-3 my-2 list-none" />;
                        }
                        return <li {...props} className={className} />;
                      }
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              </motion.main>
            </div>
          </div>
        ) : (
          <motion.div
            key="offer-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <OfferLandingPage />
          </motion.div>
        )}

      </div>
    </div>
  );
}
