// app/client-layout.tsx
"use client"

import type React from "react"
import { Navigation } from "@/components/navigation"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { registerServiceWorker } from "./register-sw"

const CustomCursor = dynamic(
  () => import("@/components/cursor").then((mod) => mod.CustomCursor),
  { ssr: false, loading: () => null }
)

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <div>
      <CustomCursor />
      <div className="flex min-h-screen relative">
        <Navigation />
        <main className="flex-1 w-full lg:ml-[300px] max-w-[100vw] overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
