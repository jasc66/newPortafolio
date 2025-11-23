// Nuevo archivo para monitorear el rendimiento
export function reportWebVitals(metric: any) {
  // Puedes enviar los datos a tu servicio de análisis
  console.log(metric)

  // Ejemplo: enviar a Google Analytics
  const analyticsId = process.env.NEXT_PUBLIC_GA_ID
  if (!analyticsId) {
    return
  }

  // Cuando la métrica esté disponible
  const { id, name, startTime, value, label } = metric

  // Construir el payload
  const body = {
    name,
    value,
    id,
    startTime,
    label,
  }

  // Enviar a Google Analytics
  fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${analyticsId}&api_secret=${process.env.NEXT_PUBLIC_GA_SECRET}`,
    {
      body: JSON.stringify({
        client_id: "1234567890.1234567890",
        events: [
          {
            name: "web_vitals",
            params: {
              ...body,
              event_category: "Web Vitals",
              event_label: name,
              value: Math.round(name === "CLS" ? value * 1000 : value),
              non_interaction: true,
            },
          },
        ],
      }),
      method: "POST",
      keepalive: true,
    },
  )
}

