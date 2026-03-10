'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false })

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

  return (
    <div className="relative">
      {/* Mobile: hero em tela cheia com globo embaixo. Desktop: só o bloco de conteúdo (globo fica na coluna da página) */}
      <div className="min-h-0 lg:min-h-0">
        <div className="min-h-[100vh] flex flex-col justify-center lg:min-h-0 lg:flex-none">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-1 lg:max-w-none">
            <div className="relative z-10 flex flex-col items-start text-left">
              {children}
            </div>
            {/* Globo só no mobile (no desktop fica na coluna esquerda da página) */}
            <div className="relative flex shrink-0 items-center justify-center lg:hidden" style={{ transform: 'none', willChange: 'auto' }}>
              <div className="h-[320px] w-[320px] shrink-0" style={{ transform: 'none' }}>
                <Globe3D scrollProgress={scrollProgress} />
              </div>
            </div>
          </div>
        </div>
        {/* Hint - desaparece ao scrollar */}
        <div
          className="absolute bottom-8 left-0 right-0 z-10 text-center pointer-events-none lg:hidden"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
        >
          <p className="text-slate-500 text-xs animate-pulse">↓ Role para continuar ↓</p>
        </div>
      </div>
    </div>
  )
}
