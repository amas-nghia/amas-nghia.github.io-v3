"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/lib/game-store"
import { EQUIPMENT, ENEMIES } from "@/lib/game-data"
import { Coins, Sword, Shield, Zap } from "lucide-react"

interface ShopModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShopModal({ isOpen, onClose }: ShopModalProps) {
  const { coins, spendCoins, equipItem, addToInventory, setGamePhase, startBattle } = useGameStore()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handlePurchase = (item: (typeof EQUIPMENT)[0]) => {
    if (spendCoins(item.price)) {
      equipItem(item)
      addToInventory(item)
      setSelectedItems([...selectedItems, item.id])
    }
  }

  const handleStartBattle = () => {
    const randomEnemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)]
    startBattle(randomEnemy)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-b from-amber-50 to-orange-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-amber-800">🏪 Adventure Shop</DialogTitle>
          <div className="flex items-center justify-center gap-2 text-amber-700">
            <Coins className="w-5 h-5" />
            <span className="font-semibold">{coins} Coins</span>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {EQUIPMENT.map((item) => {
            const canAfford = coins >= item.price
            const isPurchased = selectedItems.includes(item.id)

            return (
              <Card
                key={item.id}
                className={`${canAfford ? "border-green-300" : "border-red-300"} ${isPurchased ? "bg-green-50" : ""}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {item.type === "weapon" ? <Sword className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                    {item.name}
                    {isPurchased && <Badge variant="secondary">Equipped</Badge>}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {item.stats.attack && (
                        <Badge variant="destructive" className="text-xs">
                          <Sword className="w-3 h-3 mr-1" />+{item.stats.attack} ATK
                        </Badge>
                      )}
                      {item.stats.defense && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="w-3 h-3 mr-1" />+{item.stats.defense} DEF
                        </Badge>
                      )}
                      {item.stats.health && (
                        <Badge variant="outline" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />+{item.stats.health} HP
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Coins className="w-4 h-4" />
                        {item.price}
                      </div>
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford || isPurchased}
                        variant={canAfford ? "default" : "secondary"}
                        size="sm"
                      >
                        {isPurchased ? "Equipped" : canAfford ? "Buy" : "Can't Afford"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-6 text-center space-y-4">
          <div className="text-lg font-semibold text-amber-800">Ready for battle? Face the monsters ahead!</div>
          <Button
            onClick={handleStartBattle}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3"
          >
            ⚔️ Enter Battle Arena
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
