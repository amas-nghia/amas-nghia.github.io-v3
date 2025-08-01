"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import type { Enemy } from "@/lib/game-data"

interface EnemyProps {
  enemy: Enemy
  position: [number, number, number]
  health: number
}

export function EnemyModel({ enemy, position, health }: EnemyProps) {
  const group = useRef<Group>(null)
  const healthPercentage = health / enemy.stats.health

  useFrame((state) => {
    if (!group.current) return

    // Menacing movement
    group.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 2) * 0.2
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.3

    // Damage effect - red tint when hurt
    const material = (group.current.children[0] as any)?.material
    if (material) {
      material.color.setRGB(1, healthPercentage, healthPercentage)
    }
  })

  // Render different enemy types
  const renderZombie = () => (
    <>
      <mesh>
        <boxGeometry args={[0.6, 1.8, 0.4]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
      {/* Zombie arms */}
      <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </>
  )

  const renderSkeleton = () => (
    <>
      <mesh>
        <boxGeometry args={[0.5, 1.8, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </>
  )

  const renderCreeper = () => (
    <>
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 1.8, 8]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>
      {/* Creeper face pattern */}
      <mesh position={[0, 1.2, 0.26]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </>
  )

  return (
    <group ref={group} position={position}>
      {enemy.id === "zombie" && renderZombie()}
      {enemy.id === "skeleton" && renderSkeleton()}
      {enemy.id === "creeper" && renderCreeper()}

      {/* Health bar */}
      <group position={[0, 2.5, 0]}>
        <mesh>
          <planeGeometry args={[1.5, 0.2]} />
          <meshBasicMaterial color="#FF0000" />
        </mesh>
        <mesh position={[-(1.5 * (1 - healthPercentage)) / 2, 0, 0.01]}>
          <planeGeometry args={[1.5 * healthPercentage, 0.2]} />
          <meshBasicMaterial color="#00FF00" />
        </mesh>
      </group>
    </group>
  )
}
