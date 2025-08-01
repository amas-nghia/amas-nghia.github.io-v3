"use client"

import { useState, useEffect } from "react"
import { useGameStore } from "@/lib/game-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sword, Shield, Heart, Zap } from "lucide-react"

interface BattleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BattleModal({ isOpen, onClose }: BattleModalProps) {
  const {
    currentEnemy,
    enemyHealth,
    health,
    maxHealth,
    equippedWeapon,
    equippedArmor,
    takeDamage,
    dealDamage,
    addCoins,
    gamePhase,
    setGamePhase,
    resetGame,
  } = useGameStore()

  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  useEffect(() => {
    if (gamePhase === "victory") {
      setBattleLog((prev) => [...prev, `🎉 Victory! You defeated the ${currentEnemy?.name}!`])
      if (currentEnemy) {
        addCoins(currentEnemy.reward)
        setBattleLog((prev) => [...prev, `💰 Earned ${currentEnemy.reward} coins!`])
      }
    } else if (gamePhase === "defeat") {
      setBattleLog((prev) => [...prev, `💀 Defeat! The ${currentEnemy?.name} has bested you...`])
    }
  }, [gamePhase, currentEnemy, addCoins])

  const handleAttack = () => {
    if (!currentEnemy || !isPlayerTurn) return

    const weaponDamage = equippedWeapon?.stats.attack || 10
    const totalDamage = weaponDamage + Math.floor(Math.random() * 10)

    dealDamage(totalDamage)
    setBattleLog((prev) => [...prev, `⚔️ You attack for ${totalDamage} damage!`])

    setIsPlayerTurn(false)

    // Enemy turn after delay
    setTimeout(() => {
      if (enemyHealth - totalDamage > 0) {
        const enemyDamage = Math.max(1, currentEnemy.stats.attack - (equippedArmor?.stats.defense || 0))
        takeDamage(enemyDamage)
        setBattleLog((prev) => [...prev, `🧟 ${currentEnemy.name} attacks for ${enemyDamage} damage!`])
      }
      setIsPlayerTurn(true)
    }, 1500)
  }

  const handleDefend = () => {
    if (!isPlayerTurn) return

    setBattleLog((prev) => [...prev, `🛡️ You defend and recover some health!`])
    // Heal a small amount
    const healAmount = Math.floor(maxHealth * 0.1)
    // Note: You'd need to add a heal function to the store

    setIsPlayerTurn(false)

    setTimeout(() => {
      if (currentEnemy && enemyHealth > 0) {
        const enemyDamage = Math.max(1, Math.floor(currentEnemy.stats.attack * 0.5))
        takeDamage(enemyDamage)
        setBattleLog((prev) => [...prev, `🧟 ${currentEnemy.name} attacks for ${enemyDamage} damage!`])
      }
      setIsPlayerTurn(true)
    }, 1500)
  }

  const handleContinue = () => {
    if (gamePhase === "victory") {
      setGamePhase("journey")
      onClose()
    } else if (gamePhase === "defeat") {
      resetGame()
      onClose()
    }
  }

  if (!currentEnemy) return null

  const playerHealthPercentage = (health / maxHealth) * 100
  const enemyHealthPercentage = (enemyHealth / currentEnemy.stats.health) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl minecraft-ui bg-black/95 text-white border-4 border-red-600">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-red-400">⚔️ Battle Arena</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player Stats */}
          <Card className="bg-blue-900/50 border-blue-600">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                <Sword className="w-5 h-5" />
                You
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <Progress value={playerHealthPercentage} className="flex-1" />
                  <span className="text-sm">
                    {health}/{maxHealth}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Weapon:</span>
                    <span className="text-orange-400">{equippedWeapon?.name || "Fists"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Armor:</span>
                    <span className="text-blue-400">{equippedArmor?.name || "None"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enemy Stats */}
          <Card className="bg-red-900/50 border-red-600">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                {currentEnemy.name}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <Progress value={enemyHealthPercentage} className="flex-1" />
                  <span className="text-sm">
                    {enemyHealth}/{currentEnemy.stats.health}
                  </span>
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Attack:</span>
                    <span className="text-red-400">{currentEnemy.stats.attack}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Defense:</span>
                    <span className="text-gray-400">{currentEnemy.stats.defense}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Battle Log */}
        <Card className="bg-gray-900/50 border-gray-600">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-3">Battle Log</h3>
            <div className="h-32 overflow-y-auto space-y-1 text-sm font-mono">
              {battleLog.map((log, index) => (
                <div key={index} className="text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Battle Actions */}
        <div className="flex gap-4 justify-center">
          {gamePhase === "battle" && (
            <>
              <Button onClick={handleAttack} disabled={!isPlayerTurn} className="bg-red-600 hover:bg-red-700 px-6 py-3">
                <Sword className="w-4 h-4 mr-2" />
                Attack
              </Button>
              <Button
                onClick={handleDefend}
                disabled={!isPlayerTurn}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3"
              >
                <Shield className="w-4 h-4 mr-2" />
                Defend
              </Button>
            </>
          )}

          {(gamePhase === "victory" || gamePhase === "defeat") && (
            <Button
              onClick={handleContinue}
              className={`px-8 py-3 text-lg ${
                gamePhase === "victory" ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
              }`}
            >
              {gamePhase === "victory" ? "🎉 Continue Journey" : "💀 Start Over"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
