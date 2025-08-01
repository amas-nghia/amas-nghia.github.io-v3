"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, Sky } from "@react-three/drei"
import { Character } from "./character"
import { Tree } from "./tree"
import { Chest } from "./chest"
import { EnemyModel } from "./enemy"
import { useGameStore } from "@/lib/game-store"
import { CHEST_REWARDS } from "@/lib/game-data"

export function Scene3D() {
  const { gamePhase, currentEnemy, enemyHealth, claimChest } = useGameStore()

  // Generate trees along the path
  const trees = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 20 + (i % 2 === 0 ? -8 : 8), 0, -i * 5 - 10] as [number, number, number],
    scale: 0.5 + Math.random() * 0.5,
  }))

  // Position chests at different sections
  const chestPositions: { [key: string]: [number, number, number] } = {
    about_chest: [3, 1, -15],
    experience_chest: [3, 1, -30],
    projects_chest: [3, 1, -45],
    skills_chest: [3, 1, -60],
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }} shadows>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Environment */}
          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="sunset" />

          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[100, 200]} />
            <meshStandardMaterial color="#90EE90" />
          </mesh>

          {/* Path */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, -50]} receiveShadow>
            <planeGeometry args={[4, 200]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          {/* Character */}
          <Character position={[0, 0, 0]} />

          {/* Trees */}
          {trees.map((tree) => (
            <Tree key={tree.id} position={tree.position} scale={tree.scale} />
          ))}

          {/* Chests */}
          {gamePhase === "journey" &&
            CHEST_REWARDS.map((reward) => (
              <Chest
                key={reward.id}
                position={chestPositions[reward.id] || [0, 1, 0]}
                reward={reward}
                onClaim={() => claimChest(reward.id, reward)}
              />
            ))}

          {/* Enemy in battle */}
          {gamePhase === "battle" && currentEnemy && (
            <EnemyModel enemy={currentEnemy} position={[0, 0, -5]} health={enemyHealth} />
          )}

          {/* Shop building */}
          {(gamePhase === "shop" || gamePhase === "battle" || gamePhase === "victory" || gamePhase === "defeat") && (
            <group position={[0, 0, -80]}>
              {/* Shop structure */}
              <mesh position={[0, 2, 0]}>
                <boxGeometry args={[8, 4, 6]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[0, 5, 0]}>
                <coneGeometry args={[5, 2, 4]} />
                <meshStandardMaterial color="#DC143C" />
              </mesh>
              {/* Shop sign */}
              <mesh position={[0, 3, 3.1]}>
                <planeGeometry args={[4, 1]} />
                <meshStandardMaterial color="#FFD700" />
              </mesh>
            </group>
          )}

          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} target={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
