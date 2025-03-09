"use client"

import { useEffect, useRef } from "react"
import { About } from "@/components/About"
import { Education } from "@/components/Education"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import "./section-backgrounds.css"

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen" ref={containerRef}>
      <section
        id="home"
        className="section-transition bg-section-1 min-h-screen flex flex-col justify-center px-6 lg:px-12 xl:px-24"
      >
        <div className="parallax-wrapper">
          <div className="max-w-4xl pt-24 sm:pt-0">
            {" "}
            {/* Added padding top for mobile */}
            <p className="text-green font-mono mb-5 text-sm">Hola, mi nombre es</p>
            <h1 className="text-lightest-slate text-4xl sm:text-5xl md:text-7xl font-bold mb-4">Alonso Salguero C.</h1>
            <h2 className="text-slate text-3xl sm:text-4xl md:text-6xl font-bold mb-8">Full Stack Developer.</h2>
            <p className="text-slate max-w-xl text-base sm:text-lg mb-12 leading-relaxed">
              Soy un desarrollador especializado en construir experiencias digitales excepcionales. Actualmente, me
              enfoco en crear productos accesibles y centrados en el usuario mientras aprendo las últimas tecnologías en
              desarrollo web.
            </p>
            <div className="space-y-4 mb-12">
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
            <Link href="/contact">
              <Button className="w-fit">Contáctame</Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className="section-transition bg-section-2 py-24 px-6 lg:px-12 xl:px-24">
        <div className="parallax-wrapper">
          <div className="max-w-4xl mx-auto">
            <About />
          </div>
        </div>
      </section>

      <section id="estudios" className="section-transition bg-section-3 py-24 px-6 lg:px-12 xl:px-24">
        <div className="parallax-wrapper">
          <div className="max-w-4xl mx-auto">
            <Education />
          </div>
        </div>
      </section>

      <section id="experience" className="section-transition bg-section-4 py-24 px-6 lg:px-12 xl:px-24">
        <div className="parallax-wrapper">
          <div className="max-w-4xl mx-auto">
            <Experience />
          </div>
        </div>
      </section>

      <section id="projects" className="section-transition bg-section-5 py-24 px-6 lg:px-12 xl:px-24">
        <div className="parallax-wrapper">
          <div className="max-w-4xl mx-auto">
            <Projects />
          </div>
        </div>
      </section>
    </div>
  )
}

