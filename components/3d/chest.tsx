"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { useGameStore } from "@/lib/game-store"
import type { ChestReward } from "@/lib/game-data"

interface ChestProps {
  position: [number, number, number]
  reward: ChestReward
  onClaim: () => void
}

export function Chest({ position, reward, onClaim }: ChestProps) {
  const group = useRef<Group>(null)
  const { claimedChests } = useGameStore()
  const [isHovered, setIsHovered] = useState(false)
  const isClaimed = claimedChests.includes(reward.id)

  useFrame((state) => {
    if (!group.current) return

    // Floating animation
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1

    // Rotation animation
    group.current.rotation.y = state.clock.elapsedTime * 0.5

    // Scale animation when hovered
    const targetScale = isHovered ? 1.2 : 1
    group.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as any, 0.1)
  })

  const handleClick = () => {
    if (!isClaimed) {
      onClaim()
    }
  }

  return (
    <group
      ref={group}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      style={{ cursor: isClaimed ? "default" : "pointer" }}
    >
      {/* Chest base */}
      <mesh castShadow>
        <boxGeometry args={[1, 0.6, 0.8]} />
        <meshStandardMaterial color={isClaimed ? "#8B4513" : "#DAA520"} />
      </mesh>

      {/* Chest lid */}
      <mesh position={[0, 0.4, isClaimed ? -0.3 : 0]} rotation={[isClaimed ? -Math.PI / 3 : 0, 0, 0]} castShadow>
        <boxGeometry args={[1, 0.2, 0.8]} />
        <meshStandardMaterial color={isClaimed ? "#654321" : "#FFD700"} />
      </mesh>

      {/* Lock (only visible if not claimed) */}
      {!isClaimed && (
        <mesh position={[0, 0.2, 0.41]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
          <meshStandardMaterial color="#C0C0C0" />
        </mesh>
      )}

      {/* Glow effect for unclaimed chests */}
      {!isClaimed && <pointLight position={[0, 1, 0]} color="#FFD700" intensity={0.5} distance={3} />}

      {/* Reward particles */}
      {!isClaimed && (
        <>
          <mesh position={[0.5, 1.5, 0]}>
            <sphereGeometry args={[0.05]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
          <mesh position={[-0.3, 1.8, 0.2]}>
            <sphereGeometry args={[0.03]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
          <mesh position={[0.2, 2, -0.3]}>
            <sphereGeometry args={[0.04]} />
            <meshBasicMaterial color="#FFD700" />
          </mesh>
        </>
      )}
    </group>
  )
}
