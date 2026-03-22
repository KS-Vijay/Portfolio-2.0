// @ts-nocheck
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { mouse } = useThree()
  const COUNT = 2000

  const [positions, sizes] = useMemo(() => {
    const pos  = new Float32Array(COUNT * 3)
    const size = new Float32Array(COUNT)
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      size[i] = Math.random() * 2 + 0.5
    }
    return [pos, size]
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.04
    ref.current.rotation.x = mouse.y * 0.05
    ref.current.rotation.z = mouse.x * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size"     args={[sizes, 1]}     />
      </bufferGeometry>
      <pointsMaterial
        size={0.04} color="#c8ff00" transparent opacity={0.4}
        sizeAttenuation blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
