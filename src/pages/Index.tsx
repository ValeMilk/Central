import { Monitor, Map, Fish, BarChart3, ClipboardCheck, FileText, Server, ArrowUpRight, DollarSign, Beaker } from "lucide-react";
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
    name: "Controle de Produção",
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
  {
    name: "Analytics",
    description: "Acompanhe indicadores e dashboards analiticos do grupo em tempo real.",
    url: "https://analytics.valemilk.com.br/",
    icon: BarChart3,
    color: "from-sky-500 to-cyan-500",
    bg: "bg-sky-50",
    iconColor: "text-sky-600",
    hoverBorder: "hover:border-sky-200",
  },
  {
    name: "InfoVale",
    description: "Acompanhe seus encartes, rebaixas e ofertas.",
    url: "https://infovale.valemilk.com.br/",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    hoverBorder: "hover:border-purple-200",
  },
  {
    name: "ValePrice",
    description: "Solicitações de preços para a venda",
    url: "https://valeprice.valemilk.com.br/login",
    icon: DollarSign,
    color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    hoverBorder: "hover:border-yellow-200",
  },
  {
    name: "VaeLabs",
    description: "Gestão microbiológicas",
    url: "https://valelabs.valemilk.com.br/",
    icon: Beaker,
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    hoverBorder: "hover:border-cyan-200",
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
      <main className="relative z-10 max-w-6xl mx-auto px-8 flex-1 flex flex-col justify-center">
        {/* Hero section */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 mb-3">
            <img src={logoCacau} alt="Grupo Cacau" className="h-20 w-auto object-contain" />
            <div className="flex items-center gap-5">
              <img src={logoValeMilk} alt="ValeMilk" className="h-16 w-auto object-contain" />
              <img src={logoValeFish} alt="ValeFish" className="h-16 w-auto object-contain" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Central de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Sistemas
            </span>
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Acesse todas as aplicações do grupo em um só lugar
          </p>
        </div>

        {/* App Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white rounded-xl border border-slate-100 ${app.hoverBorder} p-4 transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md flex flex-col items-center text-center`}
            >
              <div className="flex items-start gap-4 w-full">
                <div className={`w-11 h-11 rounded-lg ${app.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className={`w-5 h-5 ${app.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <h2 className="text-base font-bold text-slate-900 leading-tight">
                    {app.name}
                  </h2>
                  <p className="text-sm text-slate-500 leading-snug mt-1">
                    {app.description}
                  </p>
                </div>
              </div>
              <span className={`self-center inline-flex items-center gap-1 ${app.iconColor} text-sm font-medium mt-auto pt-3 group-hover:gap-2 transition-all duration-300`}>
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
