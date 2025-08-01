"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { useGameStore } from "@/lib/game-store"

interface CharacterProps {
  position?: [number, number, number]
  scale?: number
}

export function Character({ position = [0, 0, 0], scale = 1 }: CharacterProps) {
  const group = useRef<Group>(null)
  const { isMoving, gamePhase } = useGameStore()

  // For now, we'll use a simple cube as placeholder until we have actual models
  // In production, you would load actual character models here
  // const { scene, animations } = useGLTF('/models/steve.glb');
  // const { actions } = useAnimations(animations, group);

  useFrame((state) => {
    if (!group.current) return

    // Simple walking animation
    if (isMoving && gamePhase === "journey") {
      group.current.position.z += Math.sin(state.clock.elapsedTime * 4) * 0.02
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }

    // Battle stance
    if (gamePhase === "battle") {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.05
    }
  })

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Placeholder character - replace with actual model */}
      <mesh>
        <boxGeometry args={[0.6, 1.8, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.5, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      <mesh position={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#FFDBAC" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, -1.2, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#0000FF" />
      </mesh>
      <mesh position={[0.2, -1.2, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#0000FF" />
      </mesh>
    </group>
  )
}
