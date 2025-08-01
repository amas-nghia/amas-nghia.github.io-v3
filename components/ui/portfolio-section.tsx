"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PortfolioSectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function PortfolioSection({ id, title, children, className }: PortfolioSectionProps) {
  return (
    <section id={id} className={cn("py-20 px-6 relative", className)}>
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
    <section className="pt-32 pb-20 px-6 relative">
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

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/90 drop-shadow">
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>Hà Nội, Vietnam</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>0352614770</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✉️</span>
              <span>thanhnghia98@gmail.com</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/80 drop-shadow text-lg">🏖️ Welcome to my coastal portfolio adventure! 🏖️</p>
            <p className="text-white/70 drop-shadow">
              Scroll down to explore my journey and collect treasures along the way!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
