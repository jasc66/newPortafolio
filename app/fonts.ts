// Archivo de fuentes optimizado sin referencias a fuentes locales
import { Inter, Fira_Code, Space_Mono } from "next/font/google"

// Optimizar fuentes de Google
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
})

// Usar Space Mono como alternativa a SF Mono
export const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
})

