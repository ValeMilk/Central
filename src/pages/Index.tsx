import { Monitor, Map, Fish, ExternalLink, ClipboardCheck, FileText, ArrowUpRight } from "lucide-react";
import logoCacau from "@/assets/logo_grupo_cacau.png";
import logoValeFish from "@/assets/Logo_ValeFish.png";
import logoValeMilk from "@/assets/valemilk-logo.png";

const apps = [
  {
    name: "Sistema Supply",
    description: "Sistema de gestão integrado para controle e operações",
    url: "https://supply.valemilk.com.br/",
    icon: Monitor,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-200",
  },
  {
    name: "ValeFish",
    description: "Plataforma completa ValeFish",
    url: "https://valefish.valemilk.com.br/",
    icon: Fish,
    color: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverBorder: "hover:border-teal-200",
  },
  {
    name: "Mapas",
    description: "Visualização de mapas e geolocalização em tempo real",
    url: "https://mapas.valemilk.com.br/",
    icon: Map,
    color: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    hoverBorder: "hover:border-indigo-200",
  },
  {
    name: "Apontamento",
    description: "Sistema de apontamento",
    url: "https://apontamento.valemilk.com.br/",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    name: "Agrupador Inteligente de PDFs",
    description: "Gerador e visualizador inteligente de PDFs",
    url: "https://valemilk-pdf.streamlit.app/",
    icon: FileText,
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-600",
    hoverBorder: "hover:border-orange-200",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-100/20 blur-[80px]" />
      </div>

      {/* Top bar */}
      <nav className="sticky top-0 z-50 glass shadow-sm shadow-black/[0.03]">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700 tracking-tight">Central de Sistemas</span>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-400">Todos os sistemas online</span>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Hero section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-5 mb-8">
            <img src={logoCacau} alt="Grupo Cacau" className="h-14 md:h-16 w-auto object-contain" />
            <div className="w-px h-10 bg-slate-200" />
            <img src={logoValeMilk} alt="ValeMilk" className="h-14 md:h-16 w-auto object-contain" />
            <div className="w-px h-10 bg-slate-200" />
            <img src={logoValeFish} alt="ValeFish" className="h-14 md:h-16 w-auto object-contain" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Central de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Sistemas
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-slate-500 max-w-md mx-auto leading-relaxed">
            Acesse todas as aplicações do grupo em um só lugar
          </p>
        </div>

        {/* App Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white rounded-2xl border border-slate-100 ${app.hoverBorder} p-6 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 active:translate-y-0 active:shadow-md`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${app.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <app.icon className={`w-6 h-6 ${app.iconColor}`} />
              </div>

              {/* Content */}
              <h2 className="text-lg font-bold text-slate-900 mb-1.5">
                {app.name}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-5">
                {app.description}
              </p>

              {/* Button */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${app.color} text-white text-sm font-semibold shadow-sm group-hover:shadow-md transition-all duration-300`}>
                  Acessar
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </div>

              {/* Hover glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} />
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Grupo Cacau — Todos os direitos reservados
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">{apps.length} aplicações disponíveis</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
