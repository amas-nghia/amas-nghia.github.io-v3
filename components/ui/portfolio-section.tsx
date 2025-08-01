"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"
import { CHEST_REWARDS } from "@/lib/game-data"
import { MapPin, Phone, Mail, Linkedin, Github, Coins } from "lucide-react"
import Link from "next/link"

interface PortfolioSectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function PortfolioSection({ id, title, children, className = "" }: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { setCurrentSection, claimedChests, coins } = useGameStore()

  const chestReward = CHEST_REWARDS.find((reward) => reward.sectionId === id)
  const isChestClaimed = chestReward ? claimedChests.includes(chestReward.id) : false

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrentSection(id)
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [id, setCurrentSection])

  return (
    <section ref={sectionRef} id={id} className={`min-h-screen py-20 px-6 relative ${className}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4 text-white drop-shadow-lg">{title}</h2>
          <div className="w-16 h-px bg-white mx-auto"></div>

          {/* Chest Reward Indicator */}
          {chestReward && (
            <div className="mt-8 flex justify-center">
              <Card
                className={`minecraft-ui border-2 ${isChestClaimed ? "border-gray-600 bg-gray-800/80" : "border-yellow-500 bg-yellow-900/80 chest-glow"}`}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{isChestClaimed ? "📦" : "🎁"}</div>
                  <div className="text-sm text-white">
                    {isChestClaimed ? (
                      <span className="text-gray-400">Chest Claimed!</span>
                    ) : (
                      <div className="space-y-1">
                        <div className="text-yellow-400 font-bold">Treasure Chest</div>
                        <div className="flex items-center justify-center gap-2 text-yellow-300">
                          <Coins className="w-4 h-4" />
                          <span>{chestReward.coins} coins</span>
                        </div>
                        <div className="text-xs text-yellow-200">Look for the chest in the 3D world!</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {children}
      </div>

      {/* Floating coins animation when chest is claimed */}
      {isChestClaimed && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute coin-animation"
              style={{
                left: `${(i - 2) * 20}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <Coins className="w-8 h-8 text-yellow-400" />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// Hero Section Component
export function HeroSection() {
  const { coins } = useGameStore()

  return (
    <PortfolioSection id="hero" title="" className="pt-32">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-light tracking-tight text-white drop-shadow-lg">Game Developer</h1>
          <div className="w-24 h-px bg-white mx-auto"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
            Passionate about creating immersive gaming experiences through Unity Engine and modern web technologies.
            Specializing in mobile games, NFT platforms, and interactive applications.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Hà Nội, Vietnam</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>0352614770</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>thanhnghia98@gmail.com</span>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm"
            asChild
          >
            <Link href="https://www.linkedin.com/in/nghia-nguyen-thanh-4b61a613a" target="_blank">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm"
          >
            <Github className="w-4 h-4 mr-2" />
            GitHub
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </div>

        {/* Game Stats Display */}
        <div className="mt-12 flex justify-center">
          <Card className="minecraft-ui bg-black/60 backdrop-blur-sm border-2 border-gray-600">
            <CardContent className="p-4">
              <div className="text-center text-white">
                <div className="text-lg font-bold mb-2">🎮 Adventure Status</div>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    <span className="font-mono text-yellow-400">{coins}</span>
                  </div>
                  <div className="text-gray-400">|</div>
                  <div className="text-sm text-gray-300">Journey Progress: {Math.min(100, coins / 10)}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortfolioSection>
  )
}
