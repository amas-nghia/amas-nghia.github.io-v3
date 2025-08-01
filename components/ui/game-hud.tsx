"use client"

import { useGameStore } from "@/lib/game-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Heart, Zap, Sword, Shield } from "lucide-react"

export function GameHUD() {
  const { coins, level, health, maxHealth, mana, maxMana, equippedWeapon, equippedArmor, experience } = useGameStore()

  const healthPercentage = (health / maxHealth) * 100
  const manaPercentage = (mana / maxMana) * 100
  const expToNextLevel = (level * 100 - experience) % 100
  const expPercentage = ((experience % 100) / 100) * 100

  return (
    <div className="fixed top-4 left-4 z-50 game-overlay">
      <Card className="minecraft-ui bg-black/80 text-white border-2 border-gray-600">
        <CardContent className="p-4 space-y-3">
          {/* Level and Experience */}
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-600">
              Level {level}
            </Badge>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${expPercentage}%` }}
              />
            </div>
          </div>

          {/* Health */}
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <div className="flex-1 bg-gray-700 rounded-full h-3">
              <div
                className="health-bar h-3 rounded-full transition-all duration-300"
                style={{ width: `${healthPercentage}%` }}
              />
            </div>
            <span className="text-sm font-mono">
              {health}/{maxHealth}
            </span>
          </div>

          {/* Mana */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <div className="flex-1 bg-gray-700 rounded-full h-3">
              <div
                className="mana-bar h-3 rounded-full transition-all duration-300"
                style={{ width: `${manaPercentage}%` }}
              />
            </div>
            <span className="text-sm font-mono">
              {mana}/{maxMana}
            </span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="font-mono text-yellow-400">{coins}</span>
          </div>

          {/* Equipment */}
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <Sword className="w-4 h-4 text-orange-500" />
              <span className="text-xs">{equippedWeapon ? equippedWeapon.name : "None"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-xs">{equippedArmor ? equippedArmor.name : "None"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
