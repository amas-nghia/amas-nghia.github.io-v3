"use client"

import { useState } from "react"
import { useGameStore } from "@/lib/game-store"
import { EQUIPMENT, ENEMIES } from "@/lib/game-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, Sword, Shield, ShoppingCart } from "lucide-react"

interface ShopModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShopModal({ isOpen, onClose }: ShopModalProps) {
  const { coins, buyItem, equipItem, startBattle, setGamePhase } = useGameStore()
  const [selectedTab, setSelectedTab] = useState("weapons")

  const weapons = EQUIPMENT.filter((item) => item.type === "weapon")
  const armor = EQUIPMENT.filter((item) => item.type === "armor")

  const handleBuyAndEquip = (item: (typeof EQUIPMENT)[0]) => {
    if (buyItem(item)) {
      equipItem(item)
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
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <ShoppingCart className="w-6 h-6" />
            Beach Hut Shop
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-yellow-600" />
            <span className="text-lg font-bold text-yellow-600">{coins} Coins</span>
          </div>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="weapons" className="flex items-center gap-2">
              <Sword className="w-4 h-4" />
              Weapons
            </TabsTrigger>
            <TabsTrigger value="armor" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Armor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weapons" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weapons.map((weapon) => (
                <Card key={weapon.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{weapon.name}</span>
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        +{weapon.stats.attack} ATK
                      </Badge>
                    </CardTitle>
                    <CardDescription>{weapon.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-yellow-600" />
                        <span className="font-bold text-yellow-600">{weapon.price}</span>
                      </div>
                      <Button
                        onClick={() => handleBuyAndEquip(weapon)}
                        disabled={coins < weapon.price}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Buy & Equip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="armor" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {armor.map((armorPiece) => (
                <Card key={armorPiece.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{armorPiece.name}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          +{armorPiece.stats.defense} DEF
                        </Badge>
                        {armorPiece.stats.health && (
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            +{armorPiece.stats.health} HP
                          </Badge>
                        )}
                      </div>
                    </CardTitle>
                    <CardDescription>{armorPiece.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-yellow-600" />
                        <span className="font-bold text-yellow-600">{armorPiece.price}</span>
                      </div>
                      <Button
                        onClick={() => handleBuyAndEquip(armorPiece)}
                        disabled={coins < armorPiece.price}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Buy & Equip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center pt-4 border-t">
          <Button onClick={handleStartBattle} size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
            Enter Battle Arena!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
