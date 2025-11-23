// Almacenamiento simple en memoria para limitar las solicitudes por IP
// En producción, considera usar Redis u otra solución de almacenamiento persistente
type RateLimitEntry = {
  count: number
  timestamp: number
}

const ipRequestMap = new Map<string, RateLimitEntry>()

// Configuración de límites
const MAX_REQUESTS = 5 // Máximo de solicitudes permitidas
const TIME_WINDOW = 60 * 60 * 1000 // Ventana de tiempo en ms (1 hora)

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipRequestMap.get(ip)

  // Si no hay entrada previa o la entrada es antigua, crear una nueva
  if (!entry || now - entry.timestamp > TIME_WINDOW) {
    ipRequestMap.set(ip, { count: 1, timestamp: now })
    return false
  }

  // Si ya ha alcanzado el límite
  if (entry.count >= MAX_REQUESTS) {
    return true
  }

  // Incrementar el contador
  entry.count += 1
  ipRequestMap.set(ip, entry)
  return false
}

// Limpiar entradas antiguas periódicamente (cada hora)
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of ipRequestMap.entries()) {
    if (now - entry.timestamp > TIME_WINDOW) {
      ipRequestMap.delete(ip)
    }
  }
}, TIME_WINDOW)

// Función para obtener información sobre el límite
export function getRateLimitInfo(ip: string): {
  remaining: number
  reset: number
  limited: boolean
} {
  const now = Date.now()
  const entry = ipRequestMap.get(ip)

  if (!entry) {
    return { remaining: MAX_REQUESTS, reset: 0, limited: false }
  }

  // Si la entrada es antigua, resetear
  if (now - entry.timestamp > TIME_WINDOW) {
    return { remaining: MAX_REQUESTS, reset: 0, limited: false }
  }

  const remaining = Math.max(0, MAX_REQUESTS - entry.count)
  const reset = entry.timestamp + TIME_WINDOW - now

  return {
    remaining,
    reset,
    limited: remaining === 0,
  }
}

