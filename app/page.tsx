import dynamic from 'next/dynamic'
import IntroSection from '@/components/IntroSection'
import BusLoader from '@/components/BusLoader'
import {
  Plane,
  Users,
  Wallet,
  BarChart3,
  FileText,
  Shield,
  WifiOff,
  Smartphone,
  ChevronRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react'


const WHATSAPP_URL = `https://wa.me/554498091901?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento do GestorTrip.')}`

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2 font-semibold text-slate-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500 text-white">
              <Plane className="h-5 w-5" />
            </span>
            GestorTrip
          </a>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-8 md:flex">
              <a href="#funcionalidades" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">Funcionalidades</a>
              <a href="#tecnologias" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">Tecnologias</a>
            </nav>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Intro com Globo + Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] w-[120vw] rounded-full bg-sky-500/5 blur-3xl" />
        </div>
        <IntroSection>
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-400">
              <WifiOff className="h-4 w-4" />
              <span>Funciona 100% offline após ativação</span>
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl md:text-6xl">
              Gerencie suas viagens com{' '}
              <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">
                total controle
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 md:text-xl">
              Sistema desktop para agências e organizadores de viagens. Controle clientes, pagamentos e 
              gere relatórios em PDF — tudo local, sem depender de internet.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-500 hover:shadow-emerald-500/30"
              >
                <MessageCircle className="h-5 w-5" />
                Solicitar orçamento
                <ChevronRight className="h-5 w-5" />
              </a>
              <a
                href="#funcionalidades"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-600 px-6 py-3.5 text-base font-semibold text-slate-300 transition hover:border-sky-500/50 hover:bg-slate-800/50"
              >
                Ver funcionalidades
              </a>
            </div>
          </div>
        </IntroSection>
      </section>

      {/* Destaques */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: WifiOff, title: '100% Offline', desc: 'Funciona localmente após ativação' },
              { icon: Shield, title: 'Dados locais', desc: 'SQLite, nada na nuvem' },
              { icon: Smartphone, title: 'Desktop nativo', desc: 'Instalável via Electron' },
              { icon: Sparkles, title: 'Interface moderna', desc: 'Dark/Light mode' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-100 md:text-4xl">
              Tudo que você precisa
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-400">
              Módulos completos para gestão de clientes, viagens e pagamentos.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Users, title: 'Clientes', desc: 'Cadastro completo, CPF, telefone e endereço. Vinculação a viagens e controle de pagamento.' },
              { icon: Plane, title: 'Viagens', desc: 'Destino, datas, valor por pessoa. Status ativa/finalizada e vinculação automática.' },
              { icon: Wallet, title: 'Pagamentos', desc: 'PIX, cartão, dinheiro, transferência. Histórico por cliente e cálculo automático.' },
              { icon: BarChart3, title: 'Dashboard', desc: 'KPIs em tempo real, gráficos de receita e indicadores de inadimplência.' },
              { icon: FileText, title: 'Relatórios', desc: 'Exportação PDF e Excel. Filtros mensal, trimestral, semestral e anual.' },
              { icon: Shield, title: 'Licenciamento', desc: 'Chave única por dispositivo. Ativação online e uso 100% offline.' },
            ].map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm transition hover:border-sky-500/30 hover:bg-slate-800/50"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition group-hover:bg-sky-500/20 group-hover:text-sky-400">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-2 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologias */}
      <section id="tecnologias" className="border-t border-slate-800 bg-slate-900/30 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-100 md:text-4xl">
              Construído com tecnologias modernas
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-slate-400">
              Next.js, TypeScript, Electron e SQLite para performance e confiabilidade.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Electron', 'SQLite', 'Recharts', 'Cloudflare Workers'].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-sm font-medium text-slate-300 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-slate-100 md:text-4xl">
              Pronto para gerenciar suas viagens?
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Entre em contato e solicite seu orçamento. Respondemos rapidamente!
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-emerald-500 shadow-lg shadow-emerald-500/25"
            >
              <MessageCircle className="h-5 w-5" />
              Chamar no WhatsApp
            </a>
          </div>
          <div className="flex-shrink-0">
            <BusLoader />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-sky-500" />
              <span className="font-semibold text-slate-100">GestorTrip</span>
            </div>
            <p className="text-sm text-slate-500">
              Desenvolvido por ghenosec
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
