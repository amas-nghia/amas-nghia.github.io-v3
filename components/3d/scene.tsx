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

  // Generate palm trees along the beach
  const trees = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    position: [(Math.random() - 0.5) * 30 + (i % 2 === 0 ? -12 : 12), 0, -i * 8 - 20] as [number, number, number],
    scale: 0.8 + Math.random() * 0.4,
    type: Math.random() > 0.5 ? "coconut" : ("palm" as "coconut" | "palm"),
  }))

  // Position chests at different sections along the beach
  const chestPositions: { [key: string]: [number, number, number] } = {
    about_chest: [4, 2, -25],
    experience_chest: [4, 2, -50],
    projects_chest: [4, 2, -75],
    skills_chest: [4, 2, -100],
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 8, 15], fov: 60 }} shadows gl={{ antialias: true }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[20, 20, 10]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />

          {/* Ocean Environment */}
          <Sky sunPosition={[100, 20, 100]} inclination={0.49} azimuth={0.25} />
          <Environment preset="sunset" />

          {/* Ocean */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-15, -2, -50]} receiveShadow>
            <planeGeometry args={[100, 300]} />
            <meshStandardMaterial color="#006994" transparent opacity={0.8} roughness={0.1} metalness={0.1} />
          </mesh>

          {/* Beach Sand */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -1.9, -50]} receiveShadow>
            <planeGeometry args={[30, 300]} />
            <meshStandardMaterial color="#F4A460" />
          </mesh>

          {/* Wooden Boardwalk Path */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, -50]} receiveShadow>
            <planeGeometry args={[4, 300]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          {/* Boardwalk planks */}
          {Array.from({ length: 60 }, (_, i) => (
            <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.75, -20 + i * 5]} receiveShadow>
              <planeGeometry args={[4.2, 0.3]} />
              <meshStandardMaterial color="#654321" />
            </mesh>
          ))}

          {/* Character */}
          <Character position={[0, 0, 0]} />

          {/* Palm Trees */}
          {trees.map((tree) => (
            <Tree key={tree.id} position={tree.position} scale={tree.scale} type={tree.type} />
          ))}

          {/* Treasure Chests */}
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
            <EnemyModel enemy={currentEnemy} position={[0, 0, -8]} health={enemyHealth} />
          )}

          {/* Beach Hut Shop */}
          {(gamePhase === "shop" || gamePhase === "battle" || gamePhase === "victory" || gamePhase === "defeat") && (
            <group position={[0, 0, -120]}>
              {/* Hut Base */}
              <mesh position={[0, 1, 0]} castShadow>
                <boxGeometry args={[10, 3, 8]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>

              {/* Thatched Roof */}
              <mesh position={[0, 3.5, 0]} castShadow>
                <coneGeometry args={[7, 3, 4]} />
                <meshStandardMaterial color="#DAA520" />
              </mesh>

              {/* Shop Sign */}
              <mesh position={[0, 2.5, 4.1]} castShadow>
                <planeGeometry args={[6, 1.5]} />
                <meshStandardMaterial color="#F5DEB3" />
              </mesh>

              {/* Support Posts */}
              <mesh position={[-4, 0, 4]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 3]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
              <mesh position={[4, 0, 4]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 3]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            </group>
          )}

          {/* Ocean waves animation */}
          {Array.from({ length: 20 }, (_, i) => (
            <mesh
              key={i}
              position={[-15 + Math.random() * 10, -1.5, -30 + i * 10]}
              rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
            >
              <planeGeometry args={[2, 0.5]} />
              <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
            </mesh>
          ))}

          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} target={[0, 2, -10]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
