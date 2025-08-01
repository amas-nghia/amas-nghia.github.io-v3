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
  const [isOpen, setIsOpen] = useState(false)
  const { claimedChests } = useGameStore()

  const isClaimed = claimedChests.includes(reward.id)

  useFrame((state) => {
    if (!group.current) return

    // Floating animation
    group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1

    // Rotation
    if (!isClaimed) {
      group.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  const handleClick = () => {
    if (!isClaimed) {
      setIsOpen(true)
      onClaim()
    }
  }

  return (
    <group
      ref={group}
      position={position}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
    >
      {/* Chest base */}
      <mesh>
        <boxGeometry args={[1, 0.6, 0.8]} />
        <meshStandardMaterial color={isClaimed ? "#8B4513" : "#DAA520"} />
      </mesh>

      {/* Chest lid */}
      <mesh position={[0, 0.3, isOpen ? -0.2 : 0]} rotation={[isOpen ? -Math.PI / 3 : 0, 0, 0]}>
        <boxGeometry args={[1, 0.2, 0.8]} />
        <meshStandardMaterial color={isClaimed ? "#654321" : "#FFD700"} />
      </mesh>

      {/* Lock */}
      {!isClaimed && (
        <mesh position={[0, 0.1, 0.4]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshStandardMaterial color="#C0C0C0" />
        </mesh>
      )}

      {/* Glow effect for unclaimed chests */}
      {!isClaimed && <pointLight color="#FFD700" intensity={0.5} distance={3} />}
    </group>
  )
}
