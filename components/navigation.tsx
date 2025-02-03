"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Codepen, Instagram, AtSign, Menu, Phone } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  const navIds = ["home", "about", "estudios", "experience", "projects"] as const
  const navLabels = ["Inicio", "Sobre Mí", "Estudios", "Experiencia", "Proyectos"]

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]")
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0.3, 0.4, 0.5, 0.6, 0.7],
      },
    )

    sections.forEach((section) => observer.observe(section))

    const isNearProjectsSection = () => {
      const projectsSection = document.getElementById("projects")
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect()
        return rect.top <= window.innerHeight * 0.3
      }
      return false
    }

    const handleScroll = () => {
      if (isNearProjectsSection()) {
        setActiveSection("projects")
      } else {
        const scrollPosition = window.scrollY + window.innerHeight * 0.3
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          if (section.offsetTop <= scrollPosition) {
            setActiveSection(section.id)
            break
          }
        }
      }
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setTimeout(() => setActiveSection(id), 100)
    }
  }

  const NavLinks = () => (
    <nav className="flex gap-3 md:gap-5">
      {navIds.map((id, index) => (
        <Link
          key={id}
          href={`#${id}`}
          className={`nav-link text-xs tracking-normal md:tracking-wider uppercase flex items-center gap-2 md:gap-3 group relative overflow-visible whitespace-normal md:whitespace-nowrap ${
            activeSection === id ? "text-green" : "text-slate hover:text-green transition-colors"
          }`}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(id)
          }}
        >
          <div className="relative">
            <div
              className={`h-[1px] w-8 md:w-12 transition-all duration-300 ${
                activeSection === id
                  ? "w-16 md:w-24 bg-green"
                  : "bg-slate/20 group-hover:w-16 md:group-hover:w-24 group-hover:bg-green"
              }`}
            />
            <div
              className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === id ? "bg-green opacity-100" : "bg-green opacity-0 group-hover:opacity-100"
              }`}
            />
          </div>
          <span className="relative z-10 text-[11px] md:text-xs">{navLabels[index]}</span>
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

  const SocialLinks = () => (
    <div className="flex gap-6">
      {socialLinks.map(({ id, href, icon: Icon }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link text-slate hover:text-green transition-colors relative"
          aria-label={id}
        >
          <Icon size={24} className="relative z-10" />
        </a>
      ))}
    </div>
  )

  return (
    <>
      {/* Mobile/Tablet Navigation (hasta 900px) */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 block md:hidden ${isScrolled ? "bg-navy/90 backdrop-blur-sm" : ""}`}
      >
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-xl font-bold text-lightest-slate">Alonso Salguero C.</h1>
            <p className="text-sm text-slate capitalize">{activeSection === "home" ? "Inicio" : activeSection}</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="nav-link text-slate hover:text-green relative">
                <Menu size={24} className="relative z-10" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-light-navy">
              <div className="flex flex-col h-full justify-between py-12">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-lightest-slate">Alonso Salguero C.</h2>
                    <p className="text-slate">Full Stack Developer</p>
                  </div>
                  <NavLinks />
                </div>
                <SocialLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Medium Navigation (900px - 1024px) */}
      <div className="hidden md:block lg:hidden fixed top-0 left-0 right-0 z-50">
        <div
          className={`w-full h-[160px] flex flex-col justify-between p-4 ${
            isScrolled ? "bg-navy/90 backdrop-blur-sm" : "bg-navy"
          }`}
        >
          <div className="space-y-2 max-w-3xl mx-auto w-full pl-4">
            <h1 className="text-3xl md:text-4xl font-bold text-lightest-slate">Alonso Salguero C.</h1>
            <h2 className="text-xl md:text-2xl text-slate">Full Stack Developer</h2>
            <p className="text-base md:text-lg text-slate/80">
              I build accessible, pixel-perfect digital experiences for the web.
            </p>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto w-full pl-4">
            <NavLinks />
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* Desktop Navigation (1024px+) */}
      <div className="hidden lg:flex fixed left-0 h-screen w-[350px] flex-col justify-between py-24 z-50 bg-navy">
        <div className="flex flex-col gap-20 px-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-lightest-slate">Alonso Salguero C.</h1>
            <h2 className="text-xl text-slate">Full Stack Developer</h2>
            <p className="text-sm text-slate/80">I build accessible, pixel-perfect digital experiences for the web.</p>
          </div>
          <nav className="flex flex-col gap-8">
            {navIds.map((id, index) => (
              <Link
                key={id}
                href={`#${id}`}
                className={`nav-link text-xs tracking-[0.2em] uppercase flex items-center gap-4 group relative overflow-hidden ${
                  activeSection === id ? "text-green" : "text-slate hover:text-green transition-colors"
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
        </div>
        <div className="px-12">
          <SocialLinks />
        </div>
      </div>
    </>
  )
}

