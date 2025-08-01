"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import type { ChestReward } from "@/lib/game-data"
import { useGameStore } from "@/lib/game-store"
import type * as THREE from "three"

interface ChestProps {
  position: [number, number, number]
  reward: ChestReward
  onClaim: () => void
}

export function Chest({ position, reward, onClaim }: ChestProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { claimedChests } = useGameStore()

  const isClaimed = claimedChests.includes(reward.id)

  useFrame((state) => {
    if (meshRef.current && !isClaimed) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  if (isClaimed) return null

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClaim}
      scale={hovered ? 1.2 : 1}
    >
      {/* Chest Base */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.6, 0.8]} />
        <meshStandardMaterial color="#DAA520" />
      </mesh>

      {/* Chest Lid */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1, 0.2, 0.8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>

      {/* Lock */}
      <mesh position={[0, 0.1, 0.41]} castShadow>
        <boxGeometry args={[0.2, 0.3, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Glow effect */}
      <pointLight color="#FFD700" intensity={0.5} distance={3} />

      {/* Floating text */}
      {hovered && (
        <Text position={[0, 1.5, 0]} fontSize={0.3} color="#FFD700" anchorX="center" anchorY="middle">
          {`${reward.coins} coins\n${reward.experience} XP`}
        </Text>
      )}

      {/* Particles effect */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 1.5,
            Math.sin(Date.now() * 0.001 + i) * 0.5 + 1,
            Math.sin((i / 8) * Math.PI * 2) * 1.5,
          ]}
        >
          <sphereGeometry args={[0.05, 4, 4]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
