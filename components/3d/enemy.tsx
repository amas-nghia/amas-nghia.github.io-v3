"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import type { Enemy } from "@/lib/game-data"

interface EnemyModelProps {
  enemy: Enemy
  position: [number, number, number]
  health: number
}

export function EnemyModel({ enemy, position, health }: EnemyModelProps) {
  const group = useRef<Group>(null)
  const healthPercentage = health / enemy.stats.health

  useFrame((state) => {
    if (!group.current) return

    // Battle animation - slight movement and rotation
    group.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 2) * 0.2
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.3

    // Damage effect - red tint when low health
    if (healthPercentage < 0.3) {
      group.current.scale.setScalar(0.9 + Math.sin(state.clock.elapsedTime * 10) * 0.1)
    }
  })

  const renderZombie = () => (
    <group>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.6, 1.8, 0.4]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#8B0000" : "#228B22"} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#654321" : "#90EE90"} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#654321" : "#90EE90"} />
      </mesh>
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#654321" : "#90EE90"} />
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

  const renderSkeleton = () => (
    <group>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.6, 1.8, 0.4]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#FFFAF0" />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.5, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      {/* Bow */}
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, -1.2, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.2, -1.2, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
    </group>
  )

  const renderCreeper = () => (
    <group>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#FF0000" : "#00FF00"} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#FF0000" : "#00FF00"} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.2, -1.2, -0.2]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#FF0000" : "#00FF00"} />
      </mesh>
      <mesh position={[0.2, -1.2, -0.2]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#FF0000" : "#00FF00"} />
      </mesh>
      <mesh position={[-0.2, -1.2, 0.2]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#FF0000" : "#00FF00"} />
      </mesh>
      <mesh position={[0.2, -1.2, 0.2]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color={healthPercentage < 0.3 ? "#FF0000" : "#00FF00"} />
      </mesh>
      {/* Face pattern */}
      <mesh position={[0, 1.2, 0.26]}>
        <planeGeometry args={[0.3, 0.4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  )

  return (
    <group ref={group} position={position} castShadow>
      {enemy.type === "zombie" && renderZombie()}
      {enemy.type === "skeleton" && renderSkeleton()}
      {enemy.type === "creeper" && renderCreeper()}

      {/* Health bar */}
      <group position={[0, 2.5, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.2]} />
          <meshBasicMaterial color="#FF0000" />
        </mesh>
        <mesh position={[-(1 - healthPercentage), 0, 0.01]}>
          <planeGeometry args={[2 * healthPercentage, 0.2]} />
          <meshBasicMaterial color="#00FF00" />
        </mesh>
      </group>
    </group>
  )
}
