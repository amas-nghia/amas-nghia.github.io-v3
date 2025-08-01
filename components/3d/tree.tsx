"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface TreeProps {
  position: [number, number, number]
  scale?: number
  type?: "palm" | "coconut"
}

export function Tree({ position, scale = 1, type = "palm" }: TreeProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle swaying motion
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1

      // Palm fronds swaying
      const fronds = groupRef.current.children.slice(1)
      fronds.forEach((frond, index) => {
        if (frond instanceof THREE.Group) {
          frond.rotation.y = Math.sin(state.clock.elapsedTime * 2 + index) * 0.2
        }
      })
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Palm Tree Trunk */}
      <mesh position={[0, 2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Palm Fronds */}
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
          <mesh position={[0, 4.5, 1.5]} rotation={[0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 0.1, 3]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
          <mesh position={[0, 4.3, 2.8]} rotation={[0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.15, 0.1, 1.5]} />
            <meshStandardMaterial color="#32CD32" />
          </mesh>
        </group>
      ))}

      {/* Coconuts */}
      {type === "coconut" &&
        Array.from({ length: 3 }, (_, i) => (
          <mesh key={i} position={[Math.cos(i) * 0.5, 3.8, Math.sin(i) * 0.5]} castShadow>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
        ))}
    </group>
  )
}
