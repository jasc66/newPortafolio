import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./section-backgrounds.css"
import type React from "react"
import { Navigation } from "@/components/navigation"
import { CustomCursor } from "@/components/cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alonso Salguero C. - Portfolio",
  description: "Portfolio de Alonso Salguero C., Full Stack Developer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} text-slate antialiased`}>
        <CustomCursor />
        <div className="flex min-h-screen relative">
          <Navigation />
          <main className="flex-1 w-full lg:ml-[300px]">{children}</main>
        </div>
      </body>
    </html>
  )
}

