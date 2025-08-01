"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGameStore } from "@/lib/game-store"
import type * as THREE from "three"

interface CharacterProps {
  position: [number, number, number]
}

export function Character({ position }: CharacterProps) {
  const meshRef = useRef<THREE.Group>(null)
  const { isMoving, scrollProgress } = useGameStore()

  useFrame((state) => {
    if (meshRef.current) {
      // Walking animation
      if (isMoving) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 8) * 0.1
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 8) * 0.1
      }

      // Move character based on scroll progress
      meshRef.current.position.z = position[2] - scrollProgress * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Character Body - Minecraft Steve style */}
      <group>
        {/* Head */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <boxGeometry args={[0.9, 0.3, 0.9]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* Body */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[0.8, 1.2, 0.4]} />
          <meshStandardMaterial color="#00BFFF" />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.6, 1, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>
        <mesh position={[0.6, 1, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#FDBCB4" />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.2, 0.2, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0000CD" />
        </mesh>
        <mesh position={[0.2, 0.2, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0000CD" />
        </mesh>

        {/* Feet */}
        <mesh position={[-0.2, -0.3, 0.1]} castShadow>
          <boxGeometry args={[0.4, 0.2, 0.6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0.2, -0.3, 0.1]} castShadow>
          <boxGeometry args={[0.4, 0.2, 0.6]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>
    </group>
  )
}
