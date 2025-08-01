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

    // Reset position when tree goes too far
    if (group.current.position.z > 20) {
      group.current.position.z = -100
    }

    // Slight swaying animation
    group.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.1
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Tree leaves - multiple layers for fuller look */}
      <mesh position={[0, 3, 0]} castShadow>
        <coneGeometry args={[1.5, 2, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 4, 0]} castShadow>
        <coneGeometry args={[1.2, 1.5, 8]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      <mesh position={[0, 4.8, 0]} castShadow>
        <coneGeometry args={[0.8, 1, 8]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </group>
  )
}
