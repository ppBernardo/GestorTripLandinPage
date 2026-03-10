'use client'

import { createContext, useContext, useRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import dynamic from 'next/dynamic'
import * as THREE from 'three'

const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false })

/** Lambda para suavização da posição do globo (Three.js MathUtils.damp) */
const POSITION_SMOOTH_LAMBDA = 3

const FuncionalidadesScrollContext = createContext(0)

/** 0–1: progresso do scroll na seção funcionalidades (cards aparecem conforme scrolla) */
export function useFuncionalidadesScrollProgress() {
  return useContext(FuncionalidadesScrollContext)
}

const InFuncionalidadesCenterContext = createContext(false)

/** true quando o globo está no centro — cards devem ficar fixos junto ao globo */
export function useInFuncionalidadesCenter() {
  return useContext(InFuncionalidadesCenterContext)
}

const FadeOutForTecnologiasContext = createContext(false)

/** true quando deve fazer fade suave antes da seção tecnologias */
export function useFadeOutForTecnologias() {
  return useContext(FadeOutForTecnologiasContext)
}

const GLOBE_WIDTH = 420
const PADDING_LEFT = 24
/** Na posição inicial: borda direita do globo fica a esta distância da direita da tela (px) */
const PADDING_RIGHT_INITIAL = 450

/** Suaviza o progresso para movimento mais controlado (ease-in-out) */
function easeProgress(t: number): number {
  const c = Math.min(Math.max(t, 0), 1)
  return c < 0.5 ? 2 * c * c : 1 - Math.pow(-2 * c + 2, 2) / 2
}

const HERO_OFFSET_RIGHT = 120

function getGlobeLeft(progress: number): number {
  if (typeof window === 'undefined') return PADDING_LEFT
  const w = window.innerWidth
  const leftEnd = PADDING_LEFT + HERO_OFFSET_RIGHT
  const rightEnd = w - GLOBE_WIDTH - PADDING_RIGHT_INITIAL
  return leftEnd + (1 - progress) * (rightEnd - leftEnd)
}

interface ScrollGlobeSectionProps {
  children: React.ReactNode
}

export default function ScrollGlobeSection({ children }: ScrollGlobeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasFrozenRef = useRef(false)
  const [progress, setProgress] = useState(0)
  const [leftPx, setLeftPx] = useState(PADDING_LEFT)
  const targetRef = useRef({ progress: 0, leftPx: PADDING_LEFT, scrollProgress: 0 })
  const rafRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [ctaMode, setCtaMode] = useState(false)
  const [topPx, setTopPx] = useState<number | null>(null)
  const [arcTopPx, setArcTopPx] = useState<number | null>(null)
  const [smoothedTopPx, setSmoothedTopPx] = useState<number | null>(null)
  const [sizePx, setSizePx] = useState(600)
  const [scrollProgressPage, setScrollProgressPage] = useState(0)
  const [funcionalidadesScrollProgress, setFuncionalidadesScrollProgress] = useState(0)
  const [hideGlobeForTecnologias, setHideGlobeForTecnologias] = useState(false)
  const topPxRef = useRef<number | null>(null)
  const leftPxCurrentRef = useRef(PADDING_LEFT)
  const progressCurrentRef = useRef(0)
  const topCurrentRef = useRef(0)
  const sizeCurrentRef = useRef(600)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setLeftPx(getGlobeLeft(0))
      const wh = window.innerHeight
      topCurrentRef.current = wh * 0.46 - 20
    }
  }, [])

  topPxRef.current = topPx

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    const updatePosition = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pageProgress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0
      targetRef.current.scrollProgress = pageProgress

      const section = sectionRef.current
      const ctaEl = document.getElementById('cta-section')
      const windowHeight = window.innerHeight

      const inCta =
        ctaEl &&
        (() => {
          const r = ctaEl.getBoundingClientRect()
          return r.top < windowHeight * 0.6 && r.bottom > 0
        })()

      if (inCta) {
        setCtaMode(true)
        setTopPx(null)
        hasFrozenRef.current = false
        return
      }
      setCtaMode(false)

      const slotEl = document.getElementById('funcionalidades-globe-slot')
      const funcEl = document.getElementById('funcionalidades')
      const instalarEl = document.getElementById('instalar')
      const instalarRect = instalarEl?.getBoundingClientRect()
      const inInstalar =
        instalarRect && instalarRect.top < windowHeight * 0.95 && instalarRect.bottom > 0

      const inFuncionalidades =
        funcEl &&
        slotEl &&
        !inInstalar &&
        (() => {
          const r = funcEl.getBoundingClientRect()
          return r.top < windowHeight * 0.7 && r.bottom > 0
        })()

      // Não invadir tecnologias — globo some antes de sobrepor
      const globoAltura = 460
      const globoBottom = windowHeight / 2 + globoAltura / 2
      const limiteMargem = 80
      const instalarProxima =
        instalarRect && instalarRect.top < globoBottom + limiteMargem

      setHideGlobeForTecnologias(!!(instalarProxima || inInstalar))

      if (inFuncionalidades && !instalarProxima && slotEl && funcEl) {
        // Globo fixo no centro da tela (como landonorris.com) - posição não muda, só gira ao scrollar
        const centerX = window.innerWidth / 2 - 230
        const centerY = window.innerHeight / 2 - 230
        targetRef.current = { ...targetRef.current, progress: 1, leftPx: centerX }
        setTopPx(centerY)
        hasFrozenRef.current = true
        // Progresso do scroll na seção: 0→1 ao percorrer toda a altura (estilo landonorris.com)
        const rect = funcEl.getBoundingClientRect()
        const sectionHeight = rect.height
        const scrollable = Math.max(sectionHeight - windowHeight, windowHeight)
        const scrolled = -rect.top
        const sectionProgress = Math.min(Math.max(scrolled / scrollable, 0), 1)
        setFuncionalidadesScrollProgress(easeProgress(sectionProgress))
        return
      }
      hasFrozenRef.current = false
      setFuncionalidadesScrollProgress(0)
      setTopPx(null)

      // Na seção instalar, não atualizar posição do globo (ele fica oculto)
      if (inInstalar || !section) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight

      // Intervalo de scroll maior = globo se move mais devagar e controlado
      const scrollRange = Math.max((sectionHeight - windowHeight) * 1.4, windowHeight * 0.8)
      const scrolled = -rect.top + windowHeight * 0.15
      const raw = scrolled / scrollRange
      const clamped = Math.min(Math.max(raw, 0), 1)
      const eased = easeProgress(clamped)
      targetRef.current = { ...targetRef.current, progress: eased, leftPx: getGlobeLeft(1 - eased) }
    }

    const LERP_ROTATION = 0.22
    const GLOBE_HALF = 230
    const smoothUpdate = (now: number) => {
      const t = targetRef.current
      const delta = lastTimeRef.current ? Math.min((now - lastTimeRef.current) / 1000, 0.1) : 1/60
      lastTimeRef.current = now

      leftPxCurrentRef.current = THREE.MathUtils.damp(
        leftPxCurrentRef.current,
        t.leftPx,
        POSITION_SMOOTH_LAMBDA,
        delta
      )
      progressCurrentRef.current = THREE.MathUtils.damp(
        progressCurrentRef.current,
        t.progress,
        POSITION_SMOOTH_LAMBDA,
        delta
      )
      const wh = window.innerHeight
      const startTop = wh * 0.46 - 20
      const endTop = wh * 0.5 - GLOBE_HALF
      const arcDip = 70
      const targetTop = topPxRef.current != null
        ? wh / 2 - GLOBE_HALF
        : startTop + (endTop - startTop) * progressCurrentRef.current - arcDip * Math.sin(progressCurrentRef.current * Math.PI)

      topCurrentRef.current = THREE.MathUtils.damp(
        topCurrentRef.current,
        targetTop,
        POSITION_SMOOTH_LAMBDA,
        delta
      )

      const targetSize = topPxRef.current != null
        ? 460
        : Math.min(600, 420 + 180 * (1 - progressCurrentRef.current))
      sizeCurrentRef.current = THREE.MathUtils.damp(
        sizeCurrentRef.current,
        targetSize,
        POSITION_SMOOTH_LAMBDA,
        delta
      )

      setLeftPx(leftPxCurrentRef.current)
      setProgress(progressCurrentRef.current)
      if (topPxRef.current != null) setSmoothedTopPx(topCurrentRef.current)
      setArcTopPx(topPxRef.current == null ? topCurrentRef.current : null)
      setSizePx(sizeCurrentRef.current)

      setScrollProgressPage((sp) => {
        const next = sp + (t.scrollProgress - sp) * LERP_ROTATION
        return Math.abs(next - t.scrollProgress) < 0.0005 ? t.scrollProgress : next
      })
      rafRef.current = requestAnimationFrame(smoothUpdate)
    }
    rafRef.current = requestAnimationFrame((now) => {
      lastTimeRef.current = now
      smoothUpdate(now)
    })

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', updatePosition)
      window.removeEventListener('resize', updatePosition)
    }
  }, [mounted])

  const globeEl = (
    <div className="relative w-full h-full min-w-[360px] min-h-[360px] lg:min-w-[460px] lg:min-h-[460px]">
      <Globe3D scrollProgress={scrollProgressPage} />
    </div>
  )

  const fixedGlobe = (
    <div
      className="hidden lg:block fixed z-10 pointer-events-none"
      style={{
        left: `${leftPx}px`,
        ...(topPx != null
          ? { top: `${smoothedTopPx ?? topPx}px`, transform: 'none' }
          : arcTopPx != null
            ? { top: `${arcTopPx}px`, transform: 'translateY(-50%)' }
            : { top: 'calc(48% - 20px)', transform: 'translateY(-50%)' }
        ),
        opacity: hideGlobeForTecnologias ? 0 : 1,
        transition: 'left 0.3s cubic-bezier(0.22, 1, 0.36, 1), top 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-out',
      }}
    >
      <div
        className="relative pointer-events-auto"
        style={
          topPx != null
            ? { width: 460, height: 460, transform: 'none' }
            : {
                width: 600,
                height: 600,
                minWidth: 360,
                minHeight: 360,
                transform: `scale(${sizePx / 600})`,
                transformOrigin: 'center center',
              }
        }
      >
        {globeEl}
      </div>
    </div>
  )

  const inFuncionalidadesCenter = topPx != null

  return (
      <InFuncionalidadesCenterContext.Provider value={inFuncionalidadesCenter}>
      <FadeOutForTecnologiasContext.Provider value={hideGlobeForTecnologias}>
      <FuncionalidadesScrollContext.Provider value={funcionalidadesScrollProgress}>
      <section ref={sectionRef} className="relative overflow-x-hidden">
        {children}

        {/* Globo: portal em body para não ser afetado por overflow; anima até os cards e fica fixo; na CTA vai para o slot */}
      {mounted && typeof document !== 'undefined' && ctaMode && document.getElementById('cta-globe-slot') ? (
        createPortal(
          <div className="w-full h-full min-h-[320px] globe-cta-enter">
            <Globe3D scrollProgress={scrollProgressPage} />
          </div>,
          document.getElementById('cta-globe-slot')!
        )
      ) : mounted && typeof document !== 'undefined' && document.body ? (
        createPortal(fixedGlobe, document.body)
      ) : null}
      </section>
      </FuncionalidadesScrollContext.Provider>
      </FadeOutForTecnologiasContext.Provider>
      </InFuncionalidadesCenterContext.Provider>
  )
}
