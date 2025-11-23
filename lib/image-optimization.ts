// Nuevo archivo para funciones de optimización de imágenes
import { getPlaiceholder } from "plaiceholder"

export async function getBlurDataURL(imageUrl: string): Promise<string> {
  try {
    if (!imageUrl.startsWith("http")) {
      // Para imágenes locales, necesitamos leer el archivo
      const fs = require("fs")
      const { base64 } = await getPlaiceholder(fs.readFileSync(`public${imageUrl}`))
      return base64
    }

    // Para imágenes remotas
    const res = await fetch(imageUrl)
    const buffer = await res.arrayBuffer()
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))
    return base64
  } catch (err) {
    // Fallback a un color sólido si hay error
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAI8V7yQCgAAAABJRU5ErkJggg=="
  }
}

