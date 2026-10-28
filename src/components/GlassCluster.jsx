import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FRESNEL_FRAG, FRESNEL_VERT, PRISM_COLORS } from '../three/fresnel.js'

/* ============================================================
   L2 中量 3D：玻璃几何簇
   —— 进视口才挂载，滚出视口立刻停帧（frameloop='never'）
   ============================================================ */

function GlassShape({ kind, colorKey, position, scale = 1, speed = 1, phase = 0, wire = false }) {
  const mesh = useRef()

  const geometry = useMemo(() => {
    switch (kind) {
      case 'knot':
        return new THREE.TorusKnotGeometry(0.62, 0.2, 96, 12)
      case 'icosa':
        return new THREE.IcosahedronGeometry(0.78, 0)
      case 'octa':
        return new THREE.OctahedronGeometry(0.7, 0)
      case 'dodeca':
        return new THREE.DodecahedronGeometry(0.68, 0)
      case 'torus':
        return new THREE.TorusGeometry(0.6, 0.16, 20, 60)
      default:
        return new THREE.IcosahedronGeometry(0.7, 0)
    }
  }, [kind])

  const uniforms = useMemo(() => {
    const [a, b] = PRISM_COLORS[colorKey] || PRISM_COLORS.indigo
    return {
      uA: { value: new THREE.Color(a) },
      uB: { value: new THREE.Color(b) },
      uOpacity: { value: wire ? 0.85 : 1 },
    }
  }, [colorKey, wire])

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed + phase
    mesh.current.rotation.x = t * 0.32
    mesh.current.rotation.y = t * 0.44
    mesh.current.position.y = position[1] + Math.sin(t * 0.7) * 0.16
  })

  return (
    <mesh ref={mesh} geometry={geometry} position={position} scale={scale}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={FRESNEL_VERT}
        fragmentShader={FRESNEL_FRAG}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={wire ? THREE.AdditiveBlending : THREE.NormalBlending}
        wireframe={wire}
      />
    </mesh>
  )
}

export default function GlassCluster({ tier = 'high', animate = true, active = true }) {
  const dpr = tier === 'high' ? [1, 1.6] : [1, 1.2]

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: tier === 'high', alpha: true, powerPreference: 'default' }}
      camera={{ position: [0, 0, 6.4], fov: 40 }}
      frameloop={active ? 'always' : 'demand'}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <GlassShape kind="knot" colorKey="indigo" position={[-0.55, 0.15, 0]} scale={1.12} speed={animate ? 0.9 : 0} />
      <GlassShape kind="icosa" colorKey="mint" position={[1.5, -0.75, -0.6]} scale={0.82} speed={animate ? 1.15 : 0} phase={1.4} />
      <GlassShape kind="octa" colorKey="coral" position={[1.15, 1.15, -0.3]} scale={0.72} speed={animate ? 1.4 : 0} phase={2.6} />
      <GlassShape kind="dodeca" colorKey="ink" position={[-1.75, -0.95, -0.9]} scale={0.66} speed={animate ? 1.05 : 0} phase={0.8} wire />
      <GlassShape kind="torus" colorKey="indigo" position={[-1.5, 1.4, -1.2]} scale={0.6} speed={animate ? 1.25 : 0} phase={3.4} wire />
    </Canvas>
  )
}
