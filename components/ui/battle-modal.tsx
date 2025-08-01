"use client"

import { useState, useEffect } from "react"
import { useGameStore } from "@/lib/game-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sword, Shield, Skull, Trophy, RotateCcw } from "lucide-react"

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
    gamePhase,
    takeDamage,
    dealDamage,
    addCoins,
    addExperience,
    setGamePhase,
    resetGame,
  } = useGameStore()

  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  useEffect(() => {
    if (gamePhase === "battle" && currentEnemy) {
      setBattleLog([`Battle started against ${currentEnemy.name}!`])
      setIsPlayerTurn(true)
    }
  }, [gamePhase, currentEnemy])

  useEffect(() => {
    if (gamePhase === "victory" && currentEnemy) {
      setBattleLog((prev) => [...prev, `Victory! You defeated ${currentEnemy.name}!`])
      addCoins(currentEnemy.rewards.coins)
      addExperience(currentEnemy.rewards.experience)
    } else if (gamePhase === "defeat") {
      setBattleLog((prev) => [...prev, "Defeat! You have been defeated..."])
    }
  }, [gamePhase, currentEnemy, addCoins, addExperience])

  const handleAttack = () => {
    if (!currentEnemy || !isPlayerTurn) return

    const playerAttack = (equippedWeapon?.stats.attack || 10) + Math.floor(Math.random() * 10)
    const damage = Math.max(1, playerAttack - currentEnemy.stats.defense)

    dealDamage(damage)
    setBattleLog((prev) => [...prev, `You deal ${damage} damage to ${currentEnemy.name}!`])

    if (enemyHealth - damage <= 0) {
      return // Victory will be handled by useEffect
    }

    setIsPlayerTurn(false)

    // Enemy turn
    setTimeout(() => {
      const enemyAttack = currentEnemy.stats.attack + Math.floor(Math.random() * 5)
      const playerDefense = equippedArmor?.stats.defense || 0
      const damageToPlayer = Math.max(1, enemyAttack - playerDefense)

      takeDamage(damageToPlayer)
      setBattleLog((prev) => [...prev, `${currentEnemy.name} deals ${damageToPlayer} damage to you!`])

      setIsPlayerTurn(true)
    }, 1500)
  }

  const handleRestart = () => {
    resetGame()
    onClose()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleContinue = () => {
    setGamePhase("journey")
    onClose()
  }

  if (!currentEnemy) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-b from-red-50 to-orange-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Skull className="w-6 h-6" />
            Battle Arena
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player Stats */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                You
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Health</span>
                    <span>
                      {health}/{maxHealth}
                    </span>
                  </div>
                  <Progress value={(health / maxHealth) * 100} className="h-3" />
                </div>

                <div className="flex gap-2">
                  {equippedWeapon && (
                    <Badge variant="outline" className="text-orange-600 border-orange-600">
                      <Sword className="w-3 h-3 mr-1" />
                      {equippedWeapon.stats.attack} ATK
                    </Badge>
                  )}
                  {equippedArmor && (
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      <Shield className="w-3 h-3 mr-1" />
                      {equippedArmor.stats.defense} DEF
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enemy Stats */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Skull className="w-5 h-5 text-red-600" />
                {currentEnemy.name}
              </h3>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Health</span>
                    <span>
                      {enemyHealth}/{currentEnemy.stats.health}
                    </span>
                  </div>
                  <Progress value={(enemyHealth / currentEnemy.stats.health) * 100} className="h-3" />
                </div>

                <div className="flex gap-2">
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    <Sword className="w-3 h-3 mr-1" />
                    {currentEnemy.stats.attack} ATK
                  </Badge>
                  <Badge variant="outline" className="text-gray-600 border-gray-600">
                    <Shield className="w-3 h-3 mr-1" />
                    {currentEnemy.stats.defense} DEF
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Battle Log */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-bold mb-3">Battle Log</h3>
            <div className="h-32 overflow-y-auto space-y-1 text-sm">
              {battleLog.map((log, index) => (
                <div key={index} className="p-2 bg-white rounded border">
                  {log}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Battle Actions */}
        <div className="flex justify-center gap-4">
          {gamePhase === "battle" && (
            <Button
              onClick={handleAttack}
              disabled={!isPlayerTurn}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8"
            >
              <Sword className="w-4 h-4 mr-2" />
              Attack!
            </Button>
          )}

          {gamePhase === "victory" && (
            <Button onClick={handleContinue} size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
              <Trophy className="w-4 h-4 mr-2" />
              Victory! Continue
            </Button>
          )}

          {gamePhase === "defeat" && (
            <Button onClick={handleRestart} size="lg" className="bg-gray-600 hover:bg-gray-700 text-white px-8">
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
