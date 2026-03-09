'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const EARTH_TEXTURE = 'https://cdn.apewebapps.com/threejs/160/examples/textures/planets/earth_atmos_2048.jpg'

// Converte lat/lng para coordenadas 3D na esfera
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Gera pontos ao longo de um arco (great circle) entre dois pontos
function getArcPoints(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  radius: number,
  segments: number = 32
) {
  const v1 = latLngToVector3(lat1, lng1, 1).normalize()
  const v2 = latLngToVector3(lat2, lng2, 1).normalize()
  const points: THREE.Vector3[] = []
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const dot = v1.dot(v2)
    const clampedDot = Math.max(-1, Math.min(1, dot))
    const angle = Math.acos(clampedDot)
    const sinAngle = Math.sin(angle)
    if (sinAngle < 0.0001) {
      points.push(v1.clone().multiplyScalar(radius))
    } else {
      const a = Math.sin((1 - t) * angle) / sinAngle
      const b = Math.sin(t * angle) / sinAngle
      const point = new THREE.Vector3(
        a * v1.x + b * v2.x,
        a * v1.y + b * v2.y,
        a * v1.z + b * v2.z
      ).multiplyScalar(radius)
      points.push(point)
    }
  }
  return points
}

// Rotas dos aviões (origem -> destino) lat1, lng1, lat2, lng2
const PLANE_ROUTES: [number, number, number, number][] = [
  [-23.5, -46.6, 25.2, 55.2],   // São Paulo -> Dubai
  [-34.6, -58.4, 40.7, -74.0],  // Buenos Aires -> NY
  [51.5, -0.1, -33.9, 18.4],    // Londres -> Cape Town
  [35.7, 139.7, -37.8, 144.9],  // Tóquio -> Melbourne
  [48.9, 2.3, -15.8, -47.9],    // Paris -> Brasília
  [-23.5, -46.6, 40.7, -74.0],  // São Paulo -> NY
  [35.7, 139.7, 51.5, -0.1],    // Tóquio -> Londres
  [40.7, -74.0, 51.5, -0.1],    // NY -> Londres
  [48.9, 2.3, 35.7, 139.7],     // Paris -> Tóquio
  [25.2, 55.2, 51.5, -0.1],     // Dubai -> Londres
  [-33.4, -70.7, -23.5, -46.6], // Santiago -> São Paulo
  [19.4, -99.1, 40.7, -74.0],   // Cidade do México -> NY
  [22.3, 114.2, 35.7, 139.7],   // Hong Kong -> Tóquio
  [1.3, 103.8, 22.3, 114.2],    // Singapura -> Hong Kong
  [-33.9, 18.4, 51.5, -0.1],    // Cape Town -> Londres
  [41.0, 29.0, 48.9, 2.3],      // Istambul -> Paris
  [55.8, 37.6, 48.9, 2.3],      // Moscou -> Paris
  [37.6, 126.9, 35.7, 139.7],   // Seul -> Tóquio
  [39.9, 116.4, 22.3, 114.2],   // Pequim -> Hong Kong
  [19.0, 72.9, 25.2, 55.2],     // Mumbai -> Dubai
  [-15.8, -47.9, -23.5, -46.6], // Brasília -> São Paulo
  [-12.0, -77.0, -34.6, -58.4], // Lima -> Buenos Aires
  [-33.4, -70.7, -34.6, -58.4], // Santiago -> Buenos Aires
  [40.7, -74.0, 19.4, -99.1],   // NY -> Cidade do México
  [41.0, 29.0, 25.2, 55.2],     // Istambul -> Dubai
  [48.9, 2.3, -33.9, 18.4],     // Paris -> Cape Town
  [1.3, 103.8, 25.2, 55.2],     // Singapura -> Dubai
  [39.9, 116.4, 51.5, -0.1],    // Pequim -> Londres
  [37.6, 126.9, 1.3, 103.8],    // Seul -> Singapura
  [-37.8, 144.9, 1.3, 103.8],   // Melbourne -> Singapura
  [41.0, 29.0, 39.9, 116.4],    // Istambul -> Pequim
  [55.8, 37.6, 39.9, 116.4],    // Moscou -> Pequim
  [-33.9, 18.4, -23.5, -46.6],  // Cape Town -> São Paulo
  [19.0, 72.9, 51.5, -0.1],     // Mumbai -> Londres
  [35.7, 139.7, 40.7, -74.0],   // Tóquio -> NY
]

// Materiais para aviões comerciais (corpo branco, detalhes)
const planeBodyMaterial = (
  <meshStandardMaterial
    color={0xf5f5f5}
    emissive={0xcccccc}
    emissiveIntensity={0.1}
    metalness={0.3}
    roughness={0.6}
  />
)

function MiniPlane({
  lat1, lng1, lat2, lng2,
  delay = 0,
}: {
  lat1: number; lng1: number; lat2: number; lng2: number;
  delay?: number;
}) {
  const groupRef = useRef<THREE.Group>(null)
  const points = useMemo(
    () => getArcPoints(lat1, lng1, lat2, lng2, 1.04, 64),
    [lat1, lng1, lat2, lng2]
  )

  useFrame((state) => {
    if (!groupRef.current) return
    const time = (state.clock.elapsedTime + delay) % 5
    const t = (time / 5) % 1
    const exactIndex = t * (points.length - 1)
    const index = Math.floor(exactIndex)
    const nextIndex = Math.min(index + 1, points.length - 1)
    const localT = exactIndex - index
    const pos = new THREE.Vector3().lerpVectors(points[index], points[nextIndex], localT)
    groupRef.current.position.copy(pos)
    const dir = pos.clone().normalize()
    groupRef.current.lookAt(pos.clone().add(dir))
  })

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Avião comercial - modelo compacto */}
      {/* Fuselagem */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.0035, 0.004, 0.028, 12]} />
        {planeBodyMaterial}
      </mesh>
      {/* Nariz (cone) */}
      <mesh position={[0, 0, -0.018]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.004, 0.01, 8]} />
        {planeBodyMaterial}
      </mesh>
      {/* Asas principais */}
      <mesh position={[0, 0, 0.002]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.022, 0.002, 0.01]} />
        {planeBodyMaterial}
      </mesh>
      {/* Cauda vertical */}
      <mesh position={[0, 0, 0.016]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.0025, 0.008, 0.006]} />
        {planeBodyMaterial}
      </mesh>
      {/* Estabilizadores horizontais */}
      <mesh position={[0.006, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.012, 0.0015, 0.004]} />
        {planeBodyMaterial}
      </mesh>
      <mesh position={[-0.006, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.012, 0.0015, 0.004]} />
        {planeBodyMaterial}
      </mesh>
    </group>
  )
}

function EarthSphere() {
  const map = useTexture(EARTH_TEXTURE)
  useMemo(() => {
    map.colorSpace = THREE.SRGBColorSpace
  }, [map])

  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={map}
        metalness={0.05}
        roughness={0.9}
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

function EarthFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={0x1e40af}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  )
}

function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null)

  const arcsGeometry = useMemo(() => {
    const radius = 1.025
    return PLANE_ROUTES.map(([lat1, lng1, lat2, lng2]) =>
      new THREE.BufferGeometry().setFromPoints(
        getArcPoints(lat1, lng1, lat2, lng2, radius, 48)
      )
    )
  }, [])

  const routeColors = [0x00ffff, 0xff6b9d, 0xffe135, 0x7bff7b, 0xff9966]

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Planeta Terra com textura */}
      <Suspense fallback={<EarthFallback />}>
        <EarthSphere />
      </Suspense>
      
      {/* Rotas arcade - linhas neon */}
      {arcsGeometry.map((geom, i) => (
        <line key={`arc-${i}`} geometry={geom}>
          <lineBasicMaterial
            color={routeColors[i % routeColors.length]}
            transparent
            opacity={0.85}
          />
        </line>
      ))}
      
      {/* Mini aviões arcade */}
      {PLANE_ROUTES.map(([lat1, lng1, lat2, lng2], i) => (
        <MiniPlane
          key={`bus-${i}`}
          lat1={lat1}
          lng1={lng1}
          lat2={lat2}
          lng2={lng2}
          delay={i * 0.35}
        />
      ))}
    </group>
  )
}

interface GlobeProps {
  fullScreen?: boolean
}

export default function Globe({ fullScreen = false }: GlobeProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <div className={`aspect-square pointer-events-auto cursor-grab active:cursor-grabbing ${fullScreen ? 'w-[min(85vw,750px)] min-h-0' : 'w-full h-full max-w-xl max-h-[380px] min-h-[320px]'}`}>
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 3, 5]} intensity={1.2} />
          <directionalLight position={[-3, -2, 2]} intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#a5f3fc" />
          <OrbitControls
            enableRotate={true}
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.5}
          />
          <GlobeMesh />
        </Canvas>
      </div>
    </div>
  )
}
