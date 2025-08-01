"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGameStore } from "@/lib/game-store"
import { Sword, Shield, Heart, Skull } from "lucide-react"

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
    dealDamage,
    takeDamage,
    addCoins,
    addExperience,
    setGamePhase,
    resetGame,
    gamePhase,
  } = useGameStore()

  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  useEffect(() => {
    if (gamePhase === "battle" && currentEnemy) {
      setBattleLog([`A wild ${currentEnemy.name} appears!`])
      setIsPlayerTurn(true)
    }
  }, [gamePhase, currentEnemy])

  useEffect(() => {
    if (gamePhase === "victory" && currentEnemy) {
      setBattleLog((prev) => [...prev, `Victory! You defeated the ${currentEnemy.name}!`])
      addCoins(currentEnemy.rewards.coins)
      addExperience(currentEnemy.rewards.experience)

      setTimeout(() => {
        setBattleLog((prev) => [
          ...prev,
          `You earned ${currentEnemy.rewards.coins} coins and ${currentEnemy.rewards.experience} experience!`,
        ])
      }, 1000)
    }
  }, [gamePhase, currentEnemy, addCoins, addExperience])

  useEffect(() => {
    if (gamePhase === "defeat") {
      setBattleLog((prev) => [...prev, "You have been defeated...", "The journey begins anew..."])
    }
  }, [gamePhase])

  const handleAttack = () => {
    if (!currentEnemy || !isPlayerTurn) return

    const weaponDamage = equippedWeapon?.stats.attack || 10
    const damage = Math.floor(weaponDamage + Math.random() * 10)

    dealDamage(damage)
    setBattleLog((prev) => [...prev, `You attack for ${damage} damage!`])

    if (enemyHealth - damage <= 0) {
      setGamePhase("victory")
      return
    }

    setIsPlayerTurn(false)

    // Enemy turn
    setTimeout(() => {
      const enemyDamage = Math.floor(currentEnemy.stats.attack + Math.random() * 5)
      const armorDefense = equippedArmor?.stats.defense || 0
      const finalDamage = Math.max(1, enemyDamage - armorDefense)

      takeDamage(finalDamage)
      setBattleLog((prev) => [...prev, `${currentEnemy.name} attacks for ${finalDamage} damage!`])

      if (health - finalDamage <= 0) {
        setGamePhase("defeat")
      } else {
        setIsPlayerTurn(true)
      }
    }, 1500)
  }

  const handleRestart = () => {
    resetGame()
    onClose()
    window.scrollTo(0, 0)
  }

  const handleContinue = () => {
    setGamePhase("journey")
    onClose()
  }

  if (!currentEnemy) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl bg-gradient-to-b from-red-900 to-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-red-400">⚔️ Battle Arena</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Enemy Status */}
          <Card className="bg-red-800/50 border-red-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-red-300">{currentEnemy.name}</h3>
                <div className="flex items-center gap-2 text-red-300">
                  <Skull className="w-4 h-4" />
                  <span>{currentEnemy.stats.attack} ATK</span>
                </div>
              </div>
              <Progress value={(enemyHealth / currentEnemy.stats.health) * 100} className="h-3" />
              <div className="text-sm text-red-300 mt-1">
                {enemyHealth}/{currentEnemy.stats.health} HP
              </div>
            </CardContent>
          </Card>

          {/* Player Status */}
          <Card className="bg-blue-800/50 border-blue-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-blue-300">You</h3>
                <div className="flex items-center gap-4 text-blue-300">
                  <div className="flex items-center gap-1">
                    <Sword className="w-4 h-4" />
                    <span>{equippedWeapon?.stats.attack || 10}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>{equippedArmor?.stats.defense || 0}</span>
                  </div>
                </div>
              </div>
              <Progress value={(health / maxHealth) * 100} className="h-3" />
              <div className="text-sm text-blue-300 mt-1">
                {health}/{maxHealth} HP
              </div>
            </CardContent>
          </Card>

          {/* Battle Log */}
          <Card className="bg-gray-800/50 border-gray-600">
            <CardContent className="p-4">
              <div className="h-32 overflow-y-auto space-y-1">
                {battleLog.map((log, index) => (
                  <div key={index} className="text-sm text-gray-300">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {gamePhase === "battle" && (
              <Button
                onClick={handleAttack}
                disabled={!isPlayerTurn}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
              >
                <Sword className="w-4 h-4 mr-2" />
                Attack
              </Button>
            )}

            {gamePhase === "victory" && (
              <Button
                onClick={handleContinue}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2"
              >
                <Heart className="w-4 h-4 mr-2" />
                Continue Journey
              </Button>
            )}

            {gamePhase === "defeat" && (
              <Button onClick={handleRestart} className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-6 py-2">
                <Skull className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
