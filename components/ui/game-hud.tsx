"use client"

import { useGameStore } from "@/lib/game-store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, Heart, Zap, Shield, Sword } from "lucide-react"

export function GameHUD() {
  const { coins, experience, level, health, maxHealth, mana, maxMana, equippedWeapon, equippedArmor, gamePhase } =
    useGameStore()

  if (gamePhase === "defeat") return null

  return (
    <div className="fixed top-20 left-4 z-30 space-y-2">
      {/* Player Stats */}
      <Card className="bg-black/80 backdrop-blur-sm border-yellow-500/50">
        <CardContent className="p-3 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              Level {level}
            </Badge>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-white">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>{coins}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-white">
              <Heart className="w-4 h-4 text-red-400" />
              <Progress value={(health / maxHealth) * 100} className="w-20 h-2" />
              <span className="text-xs">
                {health}/{maxHealth}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-white">
              <Zap className="w-4 h-4 text-blue-400" />
              <Progress value={(mana / maxMana) * 100} className="w-20 h-2" />
              <span className="text-xs">
                {mana}/{maxMana}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card className="bg-black/80 backdrop-blur-sm border-purple-500/50">
        <CardContent className="p-3 space-y-2">
          <div className="text-xs text-purple-400 font-semibold">Equipment</div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-white">
              <Sword className="w-3 h-3" />
              <span>{equippedWeapon?.name || "None"}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-white">
              <Shield className="w-3 h-3" />
              <span>{equippedArmor?.name || "None"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="bg-black/80 backdrop-blur-sm border-green-500/50">
        <CardContent className="p-3">
          <div className="text-xs text-green-400 font-semibold mb-1">Experience</div>
          <Progress value={experience % 100} className="w-full h-2" />
          <div className="text-xs text-white mt-1">{experience % 100}/100</div>
        </CardContent>
      </Card>
    </div>
  )
}
