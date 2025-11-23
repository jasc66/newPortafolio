"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Codepen, Instagram, AtSign, Menu, Phone, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetHeader } from "@/components/ui/sheet"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const router = useRouter()

  const navIds = ["home", "about", "estudios", "experience", "projects"] as const
  const navLabels = ["Inicio", "Sobre Mí", "Estudios", "Experiencia", "Proyectos"]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]")
      const scrollPosition = window.scrollY + window.innerHeight * 0.3

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
        }
      })

      setIsScrolled(window.scrollY > 50)

      // Ocultar el indicador de desplazamiento después de cierto scroll
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== "/") {
      router.push(`/#${id}`)
    } else {
      const element = document.getElementById(id)
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
        setTimeout(() => setActiveSection(id), 100)
      }
    }
  }

  const NavLinks = () => (
    <nav className="flex flex-col gap-8">
      {navIds.map((id, index) => (
        <Link
          key={id}
          href={`/#${id}`}
          className={`nav-link text-xs tracking-[0.2em] uppercase flex items-center gap-4 group relative ${
            activeSection === id ? "text-green font-medium" : "text-light-slate hover:text-green transition-colors"
          }`}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(id)
          }}
        >
          <div className="relative">
            <div
              className={`h-[1px] w-12 transition-all duration-300 ${
                activeSection === id ? "w-24 bg-green" : "bg-slate/20 group-hover:w-24 group-hover:bg-green"
              }`}
            />
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === id ? "bg-green opacity-100" : "bg-green opacity-0 group-hover:opacity-100"
              }`}
            />
          </div>
          <span className="relative z-10">{navLabels[index]}</span>
        </Link>
      ))}
    </nav>
  )

  const socialLinks = [
    { id: "github", href: "https://github.com/JorgeSanchezF", icon: Github },
    {
      id: "linkedin",
      href: "https://www.linkedin.com/in/jorge-s%C3%A1nchez-fern%C3%A1ndez-a8a8b8203/",
      icon: Linkedin,
    },
    { id: "codepen", href: "#", icon: Codepen },
    { id: "instagram", href: "#", icon: Instagram },
    { id: "email", href: "mailto:alonso.jasc@hotmail.com", icon: AtSign },
    { id: "whatsapp", href: "https://wa.me/50687109971", icon: Phone },
  ]

  const getBackgroundClass = () => {
    switch (activeSection) {
      case "home":
        return "bg-section-1"
      case "about":
        return "bg-section-2"
      case "estudios":
        return "bg-section-3"
      case "experience":
        return "bg-section-4"
      case "projects":
        return "bg-section-5"
      default:
        return "bg-section-1"
    }
  }

  const SocialLinks = () => (
    <div className="flex flex-wrap gap-2 px-2">
      {socialLinks.map(({ id, href, icon: Icon }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-light-slate hover:text-green transition-colors p-1"
          aria-label={`Visitar ${id}`}
        >
          <Icon size={18} aria-hidden="true" />
        </a>
      ))}
    </div>
  )

  return (
    <>
      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden ${isScrolled ? "bg-navy/90 backdrop-blur-sm" : "bg-navy/50 backdrop-blur-sm"}`}
      >
        <div className="flex items-center justify-between p-4 max-w-full">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-lightest-slate truncate">Alonso Salguero C.</h1>
            <p className="text-xs sm:text-sm text-slate capitalize truncate">
              {activeSection === "home" ? "Inicio" : activeSection}
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="nav-link text-slate hover:text-green relative p-2" aria-label="Abrir menú">
                <Menu size={24} className="relative z-10" aria-hidden="true" />
                <span className="sr-only">Abrir menú</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className={`w-[320px] ${getBackgroundClass()} transition-colors duration-500`}>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-lightest-slate">Alonso Salguero C.</SheetTitle>
                <SheetDescription className="text-slate">Full Stack Developer</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col h-full justify-between py-6">
                <div className="space-y-12">
                  <NavLinks />
                </div>
                <SocialLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div
        className={`hidden lg:block fixed left-0 h-screen w-[320px] ${getBackgroundClass()} transition-colors duration-500 px-6 py-12 z-50`}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-lightest-slate">Alonso Salguero C.</h1>
              <p className="text-slate">Full Stack Developer</p>
              <p className="text-sm text-slate/80">
                I build accessible, pixel-perfect digital experiences for the web.
              </p>
            </div>
            <NavLinks />
          </div>
          <SocialLinks />
        </div>
      </div>

      {/* Indicador de desplazamiento */}
      {showScrollIndicator && activeSection === "home" && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce hidden md:flex flex-col items-center">
          <span className="text-green text-xs mb-2">Desplaza hacia abajo</span>
          <ChevronDown className="h-6 w-6 text-green" />
        </div>
      )}
    </>
  )
}

