"use client"

import { ContactForm } from "@/components/ContactForm"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { X, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"

export default function ContactPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pt-24 pb-12 relative min-h-screen bg-section-1">
      <Button
        onClick={() => router.push("/")}
        className={`absolute top-4 left-4 p-2 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        variant="ghost"
        size="icon"
      >
        <ArrowLeft className="h-6 w-6" />
        <span className="sr-only">Volver</span>
      </Button>

      <Button
        onClick={() => router.push("/")}
        className={`absolute top-4 right-4 p-2 transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        variant="ghost"
        size="icon"
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Cerrar</span>
      </Button>

      <section id="contact" className="min-h-[80vh] flex flex-col justify-center max-w-2xl mx-auto px-4 sm:px-6">
        <div
          className={`transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-green font-mono mb-5 text-sm">Contacto</h1>
          <h2 className="text-lightest-slate text-4xl font-bold mb-4">Ponte en contacto</h2>
          <p className="text-slate text-lg mb-12 leading-relaxed">
            ¿Tienes alguna pregunta o propuesta? Mi bandeja de entrada está siempre abierta. Ya sea que tengas una
            pregunta o simplemente quieras saludar, ¡haré todo lo posible por responderte!
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}

