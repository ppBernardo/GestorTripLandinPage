'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

useGLTF.preload('/source/earth-cartoon.glb')

/** Rotações completas (360°) ao percorrer scroll de 0 a 1 — igual landonorris.com */
const ROTATIONS_PER_SCROLL = 2.5

/** Lambda para MathUtils.damp — valores menores = movimento mais suave ao scrollar (Three.js) */
const ROTATION_SMOOTH_LAMBDA = 2.2

function EarthModel({ scrollProgress }: { scrollProgress?: number }) {
  const group = useRef<Group>(null)
  const currentRotation = useRef(0)
  const { scene, animations } = useGLTF('/source/earth-cartoon.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return
    Object.values(actions).forEach((action) => action?.play())
  }, [actions])

  const targetY = scrollProgress != null ? scrollProgress * Math.PI * 2 * ROTATIONS_PER_SCROLL : 0

  useFrame((_, delta) => {
    if (!group.current) return
    currentRotation.current = THREE.MathUtils.damp(
      currentRotation.current,
      targetY,
      ROTATION_SMOOTH_LAMBDA,
      delta
    )
    group.current.rotation.y = currentRotation.current
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.55} />
    </group>
  )
}

interface Globe3DProps {
  className?: string
  /** 0–1: progresso do scroll da página; quando definido, o globo gira conforme o scroll (como landonorris.com) */
  scrollProgress?: number
}

export default function Globe3D({ className = '', scrollProgress }: Globe3DProps) {
  return (
    <div className={`relative w-full h-full min-h-[320px] ${className}`}>
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-slate-500 animate-pulse">Carregando...</div>}>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} />
          <EarthModel scrollProgress={scrollProgress} />
          <OrbitControls
            enableZoom={false}
            enableRotate={scrollProgress == null}
            autoRotate={scrollProgress == null}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
