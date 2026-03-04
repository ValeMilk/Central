import { Monitor, Map, Fish, ExternalLink } from "lucide-react";
import logoCacau from "@/assets/logo_grupo_cacau.jpeg";
import logoValeFish from "@/assets/Logo_ValeFish.png";
import logoValeMilk from "@/assets/valemilk-logo.png";

const apps = [
  {
    name: "Sistema CIS",
    description: "Sistema de gestão integrado",
    url: "http://72.61.62.17:8886/",
    icon: Monitor,
    gradient: "from-primary to-secondary",
  },
  {
    name: "ValeFish",
    description: "Plataforma ValeFish",
    url: "http://72.61.62.17:8888/",
    icon: Fish,
    gradient: "from-secondary to-primary",
  },
  {
    name: "Mapas",
    description: "Visualização de mapas e geolocalização",
    url: "http://72.61.62.17:3000/",
    icon: Map,
    gradient: "from-primary via-secondary to-primary",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12">
        {/* Header */}
        <header className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={logoCacau}
              alt="Logo Grupo Cacau"
              className="h-20 w-auto object-contain mix-blend-multiply"
            />
            <div className="w-px h-14 bg-border" />
            <img
              src={logoValeMilk}
              alt="Logo ValeMilk"
              className="h-20 w-auto object-contain mix-blend-multiply"
            />
            <div className="w-px h-14 bg-border" />
            <img
              src={logoValeFish}
              alt="Logo ValeFish"
              className="h-20 w-auto object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Central de Sistemas
          </h1>
          <p className="mt-2 text-muted-foreground text-lg">
            Acesse as aplicações do grupo em um só lugar
          </p>
        </header>

        {/* App Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {apps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${app.gradient}`} />

              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-card-foreground font-[Montserrat]">
                    {app.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {app.description}
                  </p>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                  Acessar
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-16 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Grupo Cacau — Todos os direitos reservados
        </footer>
      </div>
    </div>
  );
};

export default Index;
