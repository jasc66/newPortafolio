import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
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
      <body className={`${inter.className} bg-navy text-slate antialiased`}>
        <CustomCursor />
        <div className="flex min-h-screen relative">
          <Navigation />
          <main className="flex-1 w-full lg:ml-[350px]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
              <div className="sm:pt-[300px] lg:pt-0">{children}</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

