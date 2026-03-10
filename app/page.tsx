import IntroSection from '@/components/IntroSection'
import ScrollGlobeSection from '@/components/ScrollGlobeSection'
import FuncionalidadesCards from '@/components/FuncionalidadesCards'
import CtaSection from '@/components/CtaSection'
import {
  Plane,
  Users,
  Wallet,
  BarChart3,
  FileText,
  Shield,
  ChevronRight,
  MessageCircle,
  Download,
} from 'lucide-react'

const WHATSAPP_URL = `https://wa.me/554498091901?text=${encodeURIComponent('Olá! Gostaria de solicitar um orçamento do GestorTrip.')}`

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero + Destaques + Funcionalidades: globo começa à direita e desliza para a esquerda ao scrollar */}
      <ScrollGlobeSection>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] w-[120vw] rounded-full bg-sky-500/5 blur-3xl" />
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-12 lg:items-center lg:min-h-[85vh] lg:max-w-7xl lg:mx-auto">
            {/* hero: título à esquerda, globo à direita — fica à esquerda e “desce” conforme o scroll (só desktop) */}
            <div className="hidden lg:block lg:min-h-[420px] shrink-0" aria-hidden />
            <IntroSection>
              <div className="w-full pt-16 pb-12 lg:pt-20 lg:pb-16 lg:pl-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase">
                  <span className="text-sky-400">GESTOR</span>
                  <span className="text-white">TRIP</span>
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-400">
                  <span>100% Offline</span>
                  <span>•</span>
                  <span>Desktop nativo</span>
                  <span>•</span>
                  <span>Dados locais</span>
                </div>
                <p className="mt-6 text-sm uppercase tracking-widest text-slate-500">Total controle</p>
                <p className="mt-3 max-w-xl text-lg text-slate-300 leading-relaxed">
                  Sistema para agências e organizadores de viagens. Controle clientes, pagamentos e
                  gere relatórios em PDF —{' '}
                  <span className="text-sky-400 font-semibold">tudo local, sem internet.</span>
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar orçamento
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </IntroSection>
          </div>

          <section id="funcionalidades" className="pt-24 pb-[400vh] md:pt-32 md:pb-[400vh]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400/80 mb-3 text-center">
                Módulos
              </p>
              <h2 className="text-3xl font-bold text-slate-100 md:text-5xl text-center mb-4 tracking-tight">
                Tudo que você precisa
              </h2>
              <p className="mt-2 mx-auto max-w-2xl text-lg text-slate-400 text-center mb-12">
                Módulos completos para gestão de clientes, viagens e pagamentos.
              </p>
              {/* Mobile: grid estilo landonorris.com */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:hidden">
                {[
                  { icon: Users, label: 'Cadastro', title: 'Clientes', desc: 'CPF, telefone, endereço. Vinculação a viagens e controle de pagamento.' },
                  { icon: Plane, label: 'Destinos', title: 'Viagens', desc: 'Datas, valor por pessoa. Status ativa/finalizada e vinculação automática.' },
                  { icon: Wallet, label: 'Financeiro', title: 'Pagamentos', desc: 'PIX, cartão, dinheiro. Histórico por cliente e cálculo automático.' },
                  { icon: BarChart3, label: 'KPIs', title: 'Dashboard', desc: 'Gráficos de receita e indicadores em tempo real.' },
                  { icon: FileText, label: 'Exportação', title: 'Relatórios', desc: 'PDF e Excel. Filtros mensal, trimestral e anual.' },
                  { icon: Shield, label: 'Segurança', title: 'Licenciamento', desc: 'Chave única por dispositivo. Uso 100% offline.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group border border-slate-700/60 rounded-xl p-5 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/40 hover:bg-slate-800/50"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center text-sky-400">
                      <item.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 group-hover:text-slate-400">{item.label}</p>
                    <h3 className="text-base font-bold text-slate-100 tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
              {/* Desktop: layout circular - globo no centro, cards aparecem após globo fixo */}
              <FuncionalidadesCards />
            </div>
          </section>
        </div>
      </ScrollGlobeSection>

      {/* Instalação — baixar app, ativar com chave */}
      <section id="instalar" className="relative border-t border-slate-800/80 py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950" />
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400/80 mb-4 text-center">
            Download
          </p>
          <h2 className="text-3xl font-bold text-slate-100 md:text-5xl text-center mb-6 tracking-tight">
            Instale e comece a usar
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 text-center mb-16">
            Baixe o GestorTrip gratuitamente. O uso completo requer uma chave de licença — solicite seu orçamento para ativar.
          </p>

          <div className="grid md:grid-cols-3 gap-8 items-stretch mb-16">
            <div className="relative border border-slate-700/60 rounded-2xl p-8 bg-slate-900/30 text-center transition-all duration-300 hover:border-sky-500/30">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-bold text-lg mb-4">1</span>
              <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Baixar</h3>
              <p className="mt-2 text-sm text-slate-400">Instale o aplicativo no seu computador. Grátis e sem cadastro prévio.</p>
            </div>
            <div className="relative border border-slate-700/60 rounded-2xl p-8 bg-slate-900/30 text-center transition-all duration-300 hover:border-sky-500/30">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-bold text-lg mb-4">2</span>
              <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Chave de licença</h3>
              <p className="mt-2 text-sm text-slate-400">Solicite seu orçamento e receba uma chave única para ativar o uso completo.</p>
            </div>
            <div className="relative border border-slate-700/60 rounded-2xl p-8 bg-slate-900/30 text-center transition-all duration-300 hover:border-sky-500/30">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-bold text-lg mb-4">3</span>
              <h3 className="text-base font-bold text-slate-100 uppercase tracking-wider">Ativar</h3>
              <p className="mt-2 text-sm text-slate-400">Digite a chave no app, ative uma vez e use 100% offline para sempre.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 bg-sky-500 text-slate-950 font-bold uppercase tracking-widest transition-all hover:bg-sky-400"
            >
              <Download className="h-5 w-5" />
              Baixar para Windows
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-slate-600 px-6 py-4 text-slate-300 font-medium uppercase tracking-wider transition-all hover:border-sky-500/50 hover:text-sky-300"
            >
              <MessageCircle className="h-5 w-5" />
              Solicitar chave
            </a>
          </div>
        </div>
      </section>

      {/* CTA — estilo landonorris.com "Always bringing the fight" */}
      <CtaSection>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] text-center px-6 pb-32">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-slate-100 max-w-4xl">
            Sempre no controle.
          </h2>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-xl">
            Pronto para gerenciar suas viagens? Solicite seu orçamento e comece hoje.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 bg-sky-500 px-10 py-4 text-base font-bold text-slate-950 uppercase tracking-widest transition-all hover:bg-sky-400 hover:scale-[1.02]"
          >
            <MessageCircle className="h-5 w-5" />
            Solicitar orçamento
          </a>
          <div id="cta-globe-slot" className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[360px] md:h-[360px] pointer-events-none opacity-90" />
        </div>
      </CtaSection>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <img src="/GestorTrip_sem_fundo.png" alt="GestorTrip" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-slate-500">
              Site desenvolvido por ppBernardo
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
