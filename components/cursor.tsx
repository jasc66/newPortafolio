"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(target.closest('a, button, [role="button"]') !== null)
    }

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseover", updateHoverState)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mouseover", updateHoverState)
    }
  }, [])

  return (
    <>
      <div
        className={`cursor ${isHovering ? "hover" : ""}`}
        style={{
          transform: `translate(${position.x - (isHovering ? 30 : 20)}px, ${position.y - (isHovering ? 30 : 20)}px)`,
        }}
      />
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </>
  )
}

