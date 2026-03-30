import { Monitor, Map, Fish, ExternalLink, ClipboardCheck, FileText, ArrowUpRight } from "lucide-react";
import logoCacau from "@/assets/logo_grupo_cacau.png";
import logoValeFish from "@/assets/Logo_ValeFish.png";
import logoValeMilk from "@/assets/valemilk-logo.png";

const apps = [
  {
    name: "Supply Chain",
    description: "Gerenciamento de informações referente aos produtos (insumos e estoque)",
    url: "https://supply.valemilk.com.br/",
    icon: Monitor,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    hoverBorder: "hover:border-blue-200",
  },
  {
    name: "ValeFish",
    description: "Gerenciamento de informações referente as produções (aproveitamento, custos e margem)",
    url: "https://valefish.valemilk.com.br/",
    icon: Fish,
    color: "from-teal-500 to-cyan-500",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
    hoverBorder: "hover:border-teal-200",
  },
  {
    name: "Monitoramento de Entregas",
    description: "Acompanhe rotas, itinerários e a distribuição geográfica dos clientes",
    url: "https://mapas.valemilk.com.br/",
    icon: Map,
    color: "from-indigo-500 to-violet-500",
    bg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    hoverBorder: "hover:border-indigo-200",
  },
  {
    name: "Apontamentos de Frequência",
    description: "Visualização da evolução diária da frequência e os apontamentos associados de cada gestor.",
    url: "https://apontamento.valemilk.com.br/",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    hoverBorder: "hover:border-emerald-200",
  },
  {
    name: "Consolidador de Documentos",
    description: " Unifique pedidos, notas fiscais e boletos das cargas de entrega em um único arquivo",
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
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative flex flex-col overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-100/30 blur-[100px]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-5 pb-3 flex-1 flex flex-col">
        {/* Hero section */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-6 mb-2">
            <img src={logoCacau} alt="Grupo Cacau" className="h-11 w-auto object-contain" />
            <div className="w-px h-8 bg-slate-200" />
            <img src={logoValeMilk} alt="ValeMilk" className="h-11 w-auto object-contain" />
            <div className="w-px h-8 bg-slate-200" />
            <img src={logoValeFish} alt="ValeFish" className="h-11 w-auto object-contain" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Central de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Sistemas
            </span>
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acesse todas as aplicações do grupo em um só lugar
          </p>
        </div>

        {/* App Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-1 auto-rows-fr">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white rounded-xl border border-slate-100 ${app.hoverBorder} p-5 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl ${app.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className={`w-6 h-6 ${app.iconColor}`} />
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-tight mb-2">
                  {app.name}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {app.description}
                </p>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r ${app.color} text-white text-sm font-semibold shadow-sm group-hover:shadow-md transition-all duration-300 w-fit mt-4`}>
                Acessar
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </span>

              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`} />
            </a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Grupo Cacau
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">{apps.length} aplicações</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
