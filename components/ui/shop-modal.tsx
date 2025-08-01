"use client"

import { useState } from "react"
import { useGameStore } from "@/lib/game-store"
import { EQUIPMENT, ENEMIES } from "@/lib/game-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Sword, Shield, Zap } from "lucide-react"

interface ShopModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShopModal({ isOpen, onClose }: ShopModalProps) {
  const { coins, spendCoins, equipItem, addToInventory, setGamePhase, startBattle } = useGameStore()
  const [selectedTab, setSelectedTab] = useState("weapons")

  const weapons = EQUIPMENT.filter((item) => item.type === "weapon")
  const armor = EQUIPMENT.filter((item) => item.type === "armor")

  const handlePurchase = (item: (typeof EQUIPMENT)[0]) => {
    if (spendCoins(item.price)) {
      equipItem(item)
      addToInventory(item)
    }
  }

  const handleStartBattle = () => {
    const randomEnemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)]
    startBattle(randomEnemy)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl minecraft-ui bg-black/90 text-white border-4 border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-yellow-400">🏪 Adventure Shop</DialogTitle>
          <div className="flex items-center justify-center gap-2">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-400 font-mono text-lg">{coins} Coins</span>
          </div>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="weapons" className="data-[state=active]:bg-orange-600">
              <Sword className="w-4 h-4 mr-2" />
              Weapons
            </TabsTrigger>
            <TabsTrigger value="armor" className="data-[state=active]:bg-blue-600">
              <Shield className="w-4 h-4 mr-2" />
              Armor
            </TabsTrigger>
            <TabsTrigger value="battle" className="data-[state=active]:bg-red-600">
              <Zap className="w-4 h-4 mr-2" />
              Battle
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weapons" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weapons.map((weapon) => (
                <Card key={weapon.id} className="bg-gray-800 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center gap-2">
                      <Sword className="w-4 h-4" />
                      {weapon.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{weapon.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Attack:</span>
                        <Badge variant="destructive">+{weapon.stats.attack}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          {weapon.price}
                        </span>
                        <Button
                          onClick={() => handlePurchase(weapon)}
                          disabled={coins < weapon.price}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="armor" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {armor.map((armorItem) => (
                <Card key={armorItem.id} className="bg-gray-800 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-blue-400 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {armorItem.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300">{armorItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Defense:</span>
                        <Badge variant="secondary">+{armorItem.stats.defense}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Health:</span>
                        <Badge variant="outline">+{armorItem.stats.health}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <Coins className="w-4 h-4 text-yellow-500" />
                          {armorItem.price}
                        </span>
                        <Button
                          onClick={() => handlePurchase(armorItem)}
                          disabled={coins < armorItem.price}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Buy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="battle" className="space-y-4">
            <Card className="bg-red-900/50 border-red-600">
              <CardHeader>
                <CardTitle className="text-red-400 text-center">⚔️ Enter the Battle Arena</CardTitle>
                <CardDescription className="text-center text-gray-300">
                  Face dangerous enemies and prove your worth! Victory brings great rewards, but defeat means starting
                  over.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  onClick={handleStartBattle}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                >
                  🗡️ Start Battle!
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ENEMIES.map((enemy) => (
                <Card key={enemy.id} className="bg-gray-800 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-red-400">{enemy.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Health:</span>
                        <span>{enemy.stats.health}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attack:</span>
                        <span>{enemy.stats.attack}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Reward:</span>
                        <span className="text-yellow-400">{enemy.reward} coins</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
