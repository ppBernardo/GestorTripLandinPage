'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Globe = dynamic(() => import('./Globe'), { ssr: false })

interface IntroSectionProps {
  children: React.ReactNode
}

export default function IntroSection({ children }: IntroSectionProps) {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const threshold = windowHeight * 1.0
      const progress = Math.min(Math.max(scrollY / threshold, 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const globeScale = 1 - scrollProgress * 0.7
  const globeOpacity = 1 - scrollProgress * 0.95
  const contentOpacity = Math.min(scrollProgress * 1.5, 1)
  const contentScale = 0.95 + scrollProgress * 0.05

  return (
    <div className="relative">
      {/* Área de scroll - estrutura em camadas para evitar desalinhamento */}
      <div className="min-h-[200vh]">
        {/* Camada 1: Globo fixo (sticky) */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden pt-16 pb-0">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `scale(${Math.max(globeScale, 0.25)})`,
              opacity: globeOpacity,
              transformOrigin: 'center center',
            }}
          >
            <Globe fullScreen />
          </div>

          {/* Hint - desaparece ao scrollar */}
          <div 
            className="absolute bottom-20 left-0 right-0 text-center z-10 pointer-events-none"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 4) }}
          >
            <p className="text-sky-400/70 text-sm tracking-[0.3em] uppercase font-medium">
              GestorTrip
            </p>
            <p className="text-slate-500 text-xs mt-3 animate-pulse">
              ↓ Role para entrar ↓
            </p>
          </div>
        </div>

        {/* Camada 2: Conteúdo - posicionado no fluxo, entra suavemente */}
        <div
          className="relative z-20 pt-[60vh] pb-24 px-4 mx-auto max-w-6xl"
          style={{
            opacity: contentOpacity,
            transform: `scale(${contentScale})`,
            transformOrigin: 'top center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
