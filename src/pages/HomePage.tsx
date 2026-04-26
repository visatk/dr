import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const STACK = [
  { name: "React 18", desc: "UI layer with hooks & concurrent features", color: "bg-cyan-500" },
  { name: "Hono", desc: "Ultra-fast edge API framework", color: "bg-orange-500" },
  { name: "Vite 6", desc: "Lightning-fast build tooling", color: "bg-purple-500" },
  { name: "Cloudflare Workers", desc: "Global edge runtime, zero cold starts", color: "bg-orange-400" },
  { name: "TypeScript", desc: "End-to-end type safety", color: "bg-blue-500" },
  { name: "Tailwind CSS", desc: "Utility-first design system", color: "bg-teal-500" },
];

const FEATURES = [
  {
    icon: "🔒",
    title: "Production Security",
    desc: "CSP headers, CORS, JWT auth with Web Crypto, rate limiting out of the box.",
  },
  {
    icon: "⚡",
    title: "Edge-First Performance",
    desc: "Smart placement, KV caching stubs, 0ms cold starts across 300+ PoPs.",
  },
  {
    icon: "🔌",
    title: "Node.js Compat",
    desc: "Full nodejs_compat flag enabled — use Buffer, crypto, streams and more.",
  },
  {
    icon: "📐",
    title: "Typed API Client",
    desc: "Typed fetch wrapper sharing types with the server — no OpenAPI needed.",
  },
  {
    icon: "🗄️",
    title: "CF Bindings Ready",
    desc: "D1, KV, R2, Durable Objects — all stubbed and ready to uncomment.",
  },
  {
    icon: "🚀",
    title: "One-Command Deploy",
    desc: "npm run deploy builds and pushes to Cloudflare in a single step.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-dark">
      {/* Hero */}
      <section className="relative overflow-hidden bg-grid-pattern bg-grid-size">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 to-white dark:from-brand-950/30 dark:to-surface-dark pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 py-24 sm:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Production-ready · Edge-first · TypeScript
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 animate-slide-up font-sans">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">
              CF Stack
            </span>
            <br />Starter Template
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 animate-slide-up">
            Vite + React + Hono + Cloudflare Workers — a battle-tested, production-grade
            full-stack template built for the global edge.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up">
            <Link to="/dashboard">
              <Button size="lg">Open Dashboard →</Button>
            </Link>
            <a
              href="https://github.com/your-org/cf-stack"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stack Pills */}
      <section className="py-12 border-y border-slate-100 dark:border-slate-800 bg-surface-secondary dark:bg-surface-dark-secondary">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STACK.map(({ name, desc, color }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white dark:hover:bg-surface-dark-tertiary transition-colors group text-center"
            >
              <span className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{name}</span>
              <span className="text-xs text-slate-500 hidden group-hover:block absolute bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg px-2 py-1 mt-8 z-10 max-w-[140px] shadow-lg">
                {desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
            Everything included
          </h2>
          <p className="text-center text-slate-500 mb-16">
            Skip the boilerplate. Focus on building what matters.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-sm transition-all group"
              >
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-brand-600 to-purple-600 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to ship to the edge?</h2>
        <p className="text-brand-200 mb-8 text-lg">Clone, configure, deploy. That's it.</p>
        <code className="block bg-black/30 rounded-xl px-6 py-4 text-brand-200 font-mono text-sm mb-8 max-w-md mx-auto">
          npm create cloudflare@latest -- --template your-org/cf-stack
        </code>
        <Link to="/dashboard">
          <Button variant="secondary" size="lg">Try the demo →</Button>
        </Link>
      </section>
    </div>
  );
}
