// Componente de ejemplo para cargar secciones de forma perezosa
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface LazyComponentProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}

export function LazyComponent({ children, threshold = 0.1, rootMargin = "100px" }: LazyComponentProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !isLoaded) {
      setIsLoaded(true)
    }
  }, [inView, isLoaded])

  return (
    <div ref={ref} className="min-h-[100px]">
      {isLoaded ? (
        children
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-transparent text-green animate-spin flex items-center justify-center border-t-green rounded-full"></div>
        </div>
      )}
    </div>
  )
}

