'use client'

import {
  useFuncionalidadesScrollProgress,
  useInFuncionalidadesCenter,
  useFadeOutForTecnologias,
} from './ScrollGlobeSection'
import { Users, Plane, Wallet, BarChart3, FileText, Shield } from 'lucide-react'

const CARDS = [
  { icon: Users, title: 'Clientes', label: 'Cadastro', desc: 'CPF, telefone e endereço completos.', x: 320, y: 0 },
  { icon: Plane, title: 'Viagens', label: 'Destinos', desc: 'Datas, valor por pessoa e status.', x: 160, y: 277 },
  { icon: Wallet, title: 'Pagamentos', label: 'Financeiro', desc: 'PIX, cartão, dinheiro e transferência.', x: -160, y: 277 },
  { icon: BarChart3, title: 'Dashboard', label: 'KPIs', desc: 'Gráficos e indicadores em tempo real.', x: -320, y: 0 },
  { icon: FileText, title: 'Relatórios', label: 'Exportação', desc: 'PDF e Excel com filtros flexíveis.', x: -160, y: -277 },
  { icon: Shield, title: 'Licenciamento', label: 'Segurança', desc: 'Chave única por dispositivo.', x: 160, y: -277 },
] as const

/** Opacidade: cada card entra em sequência ao longo do scroll (estilo landonorris.com) */
function cardOpacity(progress: number, index: number, total: number) {
  const slotSize = 1 / (total + 1)
  const start = index * slotSize
  const fadeIn = slotSize * 0.8
  if (progress <= start) return 0
  if (progress >= start + fadeIn) return 1
  return (progress - start) / fadeIn
}

export default function FuncionalidadesCards() {
  const scrollProgress = useFuncionalidadesScrollProgress()
  const inCenter = useInFuncionalidadesCenter()
  const fadeOut = useFadeOutForTecnologias()
  const showFixed = inCenter || fadeOut

  return (
    <div
      className={`hidden lg:block w-full transition-opacity duration-500 ease-out ${showFixed ? 'fixed inset-0 z-[9] flex items-center justify-center pointer-events-none' : 'relative min-h-[100vh]'}`}
      style={showFixed ? { opacity: fadeOut ? 0 : 1 } : undefined}
    >
      <div
        id="funcionalidades-globe-slot"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] flex items-center justify-center pointer-events-none"
      />
      {CARDS.map((item, i) => (
        <div
          key={item.title}
          className={`absolute left-1/2 top-1/2 w-[160px] -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${inCenter && !fadeOut ? 'pointer-events-auto' : ''}`}
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px))`,
            opacity: cardOpacity(scrollProgress, i, CARDS.length),
            transitionDelay: `${i * 80}ms`,
          }}
        >
          <div className="func-card-module group cursor-default">
            <div className="func-card-icon">
              <item.icon className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <p className="func-card-title">{item.label}</p>
            <h3 className="func-card-value">{item.title}</h3>
            <p className="func-card-desc">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
