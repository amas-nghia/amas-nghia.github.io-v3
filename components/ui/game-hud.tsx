"use client"

import { useGameStore } from "@/lib/game-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Heart, Zap, Star, Sword, Shield } from "lucide-react"

export function GameHUD() {
  const { coins, experience, level, health, maxHealth, mana, maxMana, equippedWeapon, equippedArmor, gamePhase } =
    useGameStore()

  return (
    <div className="fixed top-20 left-4 z-30 space-y-2">
      {/* Player Stats */}
      <Card className="bg-black/80 backdrop-blur-sm border-yellow-500/50">
        <CardContent className="p-3 space-y-2">
          {/* Level and XP */}
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">Level {level}</span>
            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
              {experience % 100}/100 XP
            </Badge>
          </div>

          {/* Health */}
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <Progress value={(health / maxHealth) * 100} className="flex-1 h-2" />
            <span className="text-red-400 text-sm font-mono">
              {health}/{maxHealth}
            </span>
          </div>

          {/* Mana */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <Progress value={(mana / maxMana) * 100} className="flex-1 h-2" />
            <span className="text-blue-400 text-sm font-mono">
              {mana}/{maxMana}
            </span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold">{coins}</span>
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      {(equippedWeapon || equippedArmor) && (
        <Card className="bg-black/80 backdrop-blur-sm border-purple-500/50">
          <CardContent className="p-3 space-y-2">
            <div className="text-purple-400 font-semibold text-sm">Equipment</div>

            {equippedWeapon && (
              <div className="flex items-center gap-2">
                <Sword className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 text-sm">{equippedWeapon.name}</span>
                <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                  +{equippedWeapon.stats.attack} ATK
                </Badge>
              </div>
            )}

            {equippedArmor && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">{equippedArmor.name}</span>
                <Badge variant="outline" className="text-xs text-blue-400 border-blue-400">
                  +{equippedArmor.stats.defense} DEF
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Game Phase Indicator */}
      <Card className="bg-black/80 backdrop-blur-sm border-green-500/50">
        <CardContent className="p-2">
          <Badge
            variant="outline"
            className={`text-xs ${
              gamePhase === "journey"
                ? "text-green-400 border-green-400"
                : gamePhase === "shop"
                  ? "text-blue-400 border-blue-400"
                  : gamePhase === "battle"
                    ? "text-red-400 border-red-400"
                    : gamePhase === "victory"
                      ? "text-yellow-400 border-yellow-400"
                      : "text-gray-400 border-gray-400"
            }`}
          >
            {gamePhase.toUpperCase()}
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
