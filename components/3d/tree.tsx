"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { useGameStore } from "@/lib/game-store"

interface TreeProps {
  position: [number, number, number]
  scale?: number
}

export function Tree({ position, scale = 1 }: TreeProps) {
  const group = useRef<Group>(null)
  const { isMoving } = useGameStore()

  useFrame((state) => {
    if (!group.current || !isMoving) return

    // Move trees backward to simulate forward movement
    group.current.position.z += 0.05

    // Reset position when tree goes too far back
    if (group.current.position.z > 10) {
      group.current.position.z = -50
    }

    // Gentle swaying
    group.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Tree leaves */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </group>
  )
}
