'use client'

import { useRef, useEffect, useState } from 'react'

interface CtaSectionProps {
  children: React.ReactNode
}

export default function CtaSection({ children }: CtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      className="relative min-h-[85vh] overflow-hidden"
    >
      <div
        className={`relative w-full h-full transition-all duration-700 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    </section>
  )
}
