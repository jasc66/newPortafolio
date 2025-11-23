"use client"

import { useEffect, useRef, useState } from "react"
import { About } from "@/components/About"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download } from "lucide-react"
import "./section-backgrounds.css"
import { LazyComponent } from "@/components/LazyComponent"

// Cargar componentes no críticos de forma perezosa
const Education = dynamic(() => import("@/components/Education").then((mod) => mod.Education), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-t-green animate-spin rounded-full"></div>
    </div>
  ),
})

const Experience = dynamic(() => import("@/components/Experience").then((mod) => mod.Experience), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-t-green animate-spin rounded-full"></div>
    </div>
  ),
})

const Projects = dynamic(() => import("@/components/Projects").then((mod) => mod.Projects), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-t-green animate-spin rounded-full"></div>
    </div>
  ),
})

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simular tiempo de carga para las animaciones
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    const handleMouseMove = (e: MouseEvent) => {
      const sections = document.querySelectorAll<HTMLElement>(".section-transition")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        section.style.setProperty("--mouse-x", `${x}%`)
        section.style.setProperty("--mouse-y", `${y}%`)
      })
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>(".parallax-wrapper")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const scrollPercentage = (rect.top / window.innerHeight) * 100
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.style.transform = `translateY(${scrollPercentage * 0.1}px)`
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" ref={containerRef}>
      <section
        id="home"
        className="section-transition bg-section-1 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 max-w-full"
      >
        <div className="parallax-wrapper max-w-7xl mx-auto w-full">
          <div className="max-w-4xl pt-24 sm:pt-0">
            <p
              className={`text-green font-mono mb-5 text-sm transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Hola, mi nombre es
            </p>
            <h1
              className={`text-lightest-slate text-4xl sm:text-5xl md:text-7xl font-bold mb-4 transition-all duration-700 delay-150 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Alonso Salguero C.
            </h1>
            <h2
              className={`text-slate text-3xl sm:text-4xl md:text-6xl font-bold mb-8 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Full Stack Developer.
            </h2>
            <p
              className={`text-slate max-w-xl text-base sm:text-lg mb-12 leading-relaxed transition-all duration-700 delay-450 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Soy un desarrollador especializado en construir experiencias digitales excepcionales. Actualmente, me
              enfoco en crear productos accesibles y centrados en el usuario mientras aprendo las últimas tecnologías en
              desarrollo web.
            </p>
            <div
              className={`space-y-4 mb-12 transition-all duration-700 delay-600 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <p>
                <span className="text-green font-mono">Email:</span>{" "}
                <a href="mailto:alonso.jasc@hotmail.com" className="text-slate hover:text-green transition-colors">
                  alonso.jasc@hotmail.com
                </a>
              </p>
              <p>
                <span className="text-green font-mono">Teléfono:</span>{" "}
                <a href="tel:+50687109971" className="text-slate hover:text-green transition-colors">
                  +506 8710 9971
                </a>
              </p>
            </div>
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-750 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <Link href="/contact">
                <Button className="relative overflow-hidden group border border-green bg-transparent hover:bg-green/10 text-green hover:text-green transition-all duration-300 px-6 py-3 rounded-md">
                  <span className="relative z-10">Contáctame</span>
                  <span className="absolute inset-0 bg-green/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              </Link>
              <a href="/cv-alonso-salguero.pdf" target="_blank" rel="noopener noreferrer" download>
                <Button
                  variant="outline"
                  className="relative overflow-hidden group border border-green bg-transparent hover:bg-green/10 text-green hover:text-green transition-all duration-300 px-6 py-3 rounded-md"
                >
                  <Download className="mr-2 h-4 w-4" />
                  <span className="relative z-10">Descargar CV</span>
                  <span className="absolute inset-0 bg-green/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-transition bg-section-2 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-full">
        <div className="parallax-wrapper max-w-7xl mx-auto w-full">
          <About />
        </div>
      </section>

      <LazyComponent>
        <section
          id="estudios"
          className="section-transition bg-section-3 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-full"
        >
          <div className="parallax-wrapper max-w-7xl mx-auto w-full">
            <Education />
          </div>
        </section>
      </LazyComponent>

      <LazyComponent>
        <section
          id="experience"
          className="section-transition bg-section-4 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-full"
        >
          <div className="parallax-wrapper max-w-7xl mx-auto w-full">
            <Experience />
          </div>
        </section>
      </LazyComponent>

      <LazyComponent>
        <section
          id="projects"
          className="section-transition bg-section-5 py-24 px-4 sm:px-6 lg:px-8 xl:px-12 max-w-full"
        >
          <div className="parallax-wrapper max-w-7xl mx-auto w-full">
            <Projects />
          </div>
        </section>
      </LazyComponent>
    </div>
  )
}

