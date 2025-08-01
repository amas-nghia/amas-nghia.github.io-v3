"use client"

import type React from "react"

import { useEffect } from "react"
import { useGameStore } from "@/lib/game-store"

interface PortfolioSectionProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function PortfolioSection({ id, title, children, className = "" }: PortfolioSectionProps) {
  const { setCurrentSection } = useGameStore()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [id, setCurrentSection])

  return (
    <section id={id} className={`py-20 px-6 relative z-10 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4 text-white drop-shadow-lg">{title}</h2>
          <div className="w-16 h-px bg-white mx-auto"></div>
        </div>
        {children}
      </div>
    </section>
  )
}

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-light tracking-tight text-white drop-shadow-lg">Game Developer</h1>
            <div className="w-24 h-px bg-white mx-auto"></div>
            <p className="text-xl text-white max-w-2xl mx-auto font-light leading-relaxed drop-shadow">
              Passionate about creating immersive gaming experiences through Unity Engine and modern web technologies.
              Specializing in mobile games, NFT platforms, and interactive applications.
            </p>
          </div>

          <div className="text-white/80 text-sm">🎮 Scroll down to begin your adventure and collect rewards!</div>
        </div>
      </div>
    </section>
  )
}
