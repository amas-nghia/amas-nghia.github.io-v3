"use client"

import { useState, useEffect } from "react"
import { Scene3D } from "@/components/3d/scene"
import { GameHUD } from "@/components/ui/game-hud"
import { ShopModal } from "@/components/ui/shop-modal"
import { BattleModal } from "@/components/ui/battle-modal"
import { PortfolioSection, HeroSection } from "@/components/ui/portfolio-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/game-store"
import { PORTFOLIO_DATA } from "@/lib/game-data"
import { ExternalLink, Calendar, GamepadIcon, Code, Palette, Mail, Linkedin, Phone } from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const { gamePhase, setGamePhase, coins, setIsMoving } = useGameStore()
  const [showShop, setShowShop] = useState(false)
  const [showBattle, setShowBattle] = useState(false)

  // Auto-scroll and movement logic
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout

    if (gamePhase === "journey") {
      setIsMoving(true)

      // Auto-scroll every 3 seconds
      scrollInterval = setInterval(() => {
        window.scrollBy({
          top: window.innerHeight * 0.8,
          behavior: "smooth",
        })
      }, 3000)

      // Check if reached the end
      const checkScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight
        const documentHeight = document.documentElement.scrollHeight

        if (scrollPosition >= documentHeight - 100 && coins >= 200) {
          setGamePhase("shop")
          setShowShop(true)
          setIsMoving(false)
        }
      }

      window.addEventListener("scroll", checkScroll)

      return () => {
        clearInterval(scrollInterval)
        window.removeEventListener("scroll", checkScroll)
        setIsMoving(false)
      }
    }
  }, [gamePhase, coins, setGamePhase, setIsMoving])

  // Handle battle phase
  useEffect(() => {
    if (gamePhase === "battle") {
      setShowBattle(true)
    } else {
      setShowBattle(false)
    }
  }, [gamePhase])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400 text-black relative overflow-x-hidden">
      {/* 3D Scene Background */}
      <Scene3D />

      {/* Game HUD */}
      <GameHUD />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-sm border-b border-white/20 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-light tracking-wide text-white drop-shadow">Nguyễn Thành Nghĩa</div>
            <div className="flex gap-8">
              <Link href="#about" className="text-sm text-white hover:text-gray-300 transition-colors drop-shadow">
                About
              </Link>
              <Link href="#experience" className="text-sm text-white hover:text-gray-300 transition-colors drop-shadow">
                Experience
              </Link>
              <Link href="#projects" className="text-sm text-white hover:text-gray-300 transition-colors drop-shadow">
                Projects
              </Link>
              <Link href="#skills" className="text-sm text-white hover:text-gray-300 transition-colors drop-shadow">
                Skills
              </Link>
              <Link href="#contact" className="text-sm text-white hover:text-gray-300 transition-colors drop-shadow">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <PortfolioSection id="about" title="About" className="bg-black/20 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-white leading-relaxed font-light drop-shadow">
              I am a dedicated game developer with over 4 years of experience in Unity Engine and modern web
              technologies. My journey spans from intern to developer, working on diverse projects including mobile
              games, NFT platforms, and interactive web applications.
            </p>
            <p className="text-lg text-white leading-relaxed font-light drop-shadow">
              I specialize in creating engaging mobile games, optimizing performance, and integrating modern
              technologies like multiplayer systems, advertising platforms, and blockchain solutions. My goal is to
              become a technical expert in game development while contributing to innovative gaming experiences.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs bg-purple-600 text-white">
                  Unity Certified Associate: Game Developer (Dec 2022)
                </Badge>
              </div>
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-2 text-white">
                  <GamepadIcon className="w-5 h-5" />
                  <span className="text-sm">4+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Code className="w-5 h-5" />
                  <span className="text-sm">15+ Projects</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
              <div className="text-6xl opacity-60">遊</div>
            </div>
          </div>
        </div>
      </PortfolioSection>

      {/* Experience Section */}
      <PortfolioSection id="experience" title="Experience">
        <div className="space-y-8">
          {PORTFOLIO_DATA.experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="md:col-span-1">
                    <div className="space-y-2">
                      <h3 className="font-medium text-lg">{exp.company}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <div className="space-y-4">
                      <h4 className="text-xl font-light">{exp.position}</h4>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PortfolioSection>

      {/* Projects Section */}
      <PortfolioSection id="projects" title="Featured Projects" className="bg-black/20 backdrop-blur-sm">
        <div className="grid gap-8">
          {PORTFOLIO_DATA.projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/90 backdrop-blur-sm"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-video md:aspect-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-4xl opacity-30">🎮</div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-2xl font-light">{project.title}</CardTitle>
                      <Badge variant={project.status === "Live" ? "default" : "secondary"} className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{project.period}</p>
                    <CardDescription className="text-base leading-relaxed text-gray-600">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <Button
                        variant="outline"
                        className="w-fit border-black text-black hover:bg-black hover:text-white transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <Link href={project.link} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </PortfolioSection>

      {/* Skills Section */}
      <PortfolioSection id="skills" title="Skills & Technologies">
        <div className="grid md:grid-cols-2 gap-8">
          {PORTFOLIO_DATA.skills.map((skillGroup, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-light flex items-center gap-2">
                  {skillGroup.category === "Game Development" && <GamepadIcon className="w-5 h-5" />}
                  {skillGroup.category === "Frontend Development" && <Code className="w-5 h-5" />}
                  {skillGroup.category === "Tools & Technologies" && <Palette className="w-5 h-5" />}
                  {skillGroup.category === "Soft Skills" && <Calendar className="w-5 h-5" />}
                  {skillGroup.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PortfolioSection>

      {/* Contact Section */}
      <PortfolioSection id="contact" title="Let's Work Together" className="bg-black/20 backdrop-blur-sm">
        <div className="text-center space-y-8">
          <div>
            <p className="text-xl text-white font-light max-w-2xl mx-auto drop-shadow">
              Interested in collaborating on game development projects or discussing opportunities? I'm always open to
              new challenges and meaningful partnerships.
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm"
              asChild
            >
              <Link href="mailto:thanhnghia98@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm"
              asChild
            >
              <Link href="https://www.linkedin.com/in/nghia-nguyen-thanh-4b61a613a" target="_blank">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 bg-transparent backdrop-blur-sm"
              asChild
            >
              <Link href="tel:0352614770">
                <Phone className="w-5 h-5 mr-2" />
                Call Me
              </Link>
            </Button>
          </div>
        </div>
      </PortfolioSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white drop-shadow">
              © {new Date().getFullYear()} Nguyễn Thành Nghĩa. Crafted with passion for gaming.
            </div>
            <div className="text-sm text-white drop-shadow">遊戲開發者 - Game Developer</div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ShopModal isOpen={showShop} onClose={() => setShowShop(false)} />
      <BattleModal isOpen={showBattle} onClose={() => setShowBattle(false)} />
    </div>
  )
}
