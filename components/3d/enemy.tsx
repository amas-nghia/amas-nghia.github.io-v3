"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Enemy } from "@/lib/game-data"
import type * as THREE from "three"

interface EnemyModelProps {
  enemy: Enemy
  position: [number, number, number]
  health: number
}

export function EnemyModel({ enemy, position, health }: EnemyModelProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Idle animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  const renderZombie = () => (
    <group>
      {/* Head */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color="#556B2F" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 1, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
      <mesh position={[0.6, 1, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, 0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.2, 0.2, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )

  const renderSkeleton = () => (
    <group>
      {/* Head */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 1, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.5, 1, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[0.15, 0.2, 0]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
    </group>
  )

  const renderCreeper = () => (
    <group>
      {/* Head */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.3, 0.2, -0.3]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>
      <mesh position={[0.3, 0.2, -0.3]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>
      <mesh position={[-0.3, 0.2, 0.3]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.3]} castShadow>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#00FF00" />
      </mesh>
    </group>
  )

  return (
    <group ref={meshRef} position={position}>
      {enemy.type === "zombie" && renderZombie()}
      {enemy.type === "skeleton" && renderSkeleton()}
      {enemy.type === "creeper" && renderCreeper()}

      {/* Health bar */}
      <group position={[0, 3, 0]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[2, 0.2]} />
          <meshBasicMaterial color="#FF0000" />
        </mesh>
        <mesh position={[-(1 - health / enemy.stats.health), 0, 0.01]}>
          <planeGeometry args={[2 * (health / enemy.stats.health), 0.2]} />
          <meshBasicMaterial color="#00FF00" />
        </mesh>
      </group>
    </group>
  )
}
