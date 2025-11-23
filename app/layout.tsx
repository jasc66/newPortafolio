import type React from "react"
import type { Metadata } from "next"
import "./critical.css" // Estilos críticos cargados primero
import "./globals.css" // Estilos no críticos cargados después
import "./section-backgrounds.css"
import ClientLayout from "./client-layout"

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
      <head>
        {/* Precargar recursos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      </head>
      <body className="text-slate antialiased overflow-x-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

