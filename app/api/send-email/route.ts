import { NextResponse } from "next/server"
import { Resend } from "resend"

// Inicializa Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Configura el correo de destino y origen
const TO_EMAIL = process.env.TO_EMAIL || "jalonsc66@gmail.com" // Tu correo registrado en Resend
const FROM_EMAIL = "onboarding@resend.dev" // Usar el dominio de prueba de Resend

// Función para simular envío en desarrollo
async function mockSendEmail(options: any) {
  console.log("MODO DE DESARROLLO: Simulando envío de correo")
  console.log("Opciones:", JSON.stringify(options, null, 2))

  // Simular un retraso
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Devolver una respuesta exitosa simulada
  return {
    data: {
      id: "mock_email_id_" + Date.now(),
      from: options.from,
      to: options.to,
      created_at: new Date().toISOString(),
    },
    error: null,
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Opciones de correo - IMPORTANTE: Usamos el dominio de prueba de Resend y enviamos al correo registrado
    const emailOptions = {
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `Nuevo mensaje: ${subject}`,
      reply_to: email, // Usar reply_to en lugar de replyTo para responder al remitente
      text: `
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject}
        
        Mensaje:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #0a192f; border-bottom: 2px solid #64ffda; padding-bottom: 10px;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="color: #0a192f; margin-top: 0;">Mensaje:</h3>
            <p style="white-space: pre-line;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
            Este mensaje fue enviado desde el formulario de contacto de tu portafolio.
          </p>
        </div>
      `,
    }

    // Determinar si estamos en desarrollo
    const isDevelopment = process.env.NODE_ENV === "development"

    // En desarrollo, simular el envío
    if (isDevelopment) {
      console.log("Usando modo de desarrollo simulado para envío de correos")
      const result = await mockSendEmail(emailOptions)
      return NextResponse.json({
        success: true,
        data: result.data,
        mode: "development",
      })
    }

    // En producción, usar Resend
    try {
      const { data, error } = await resend.emails.send(emailOptions)

      if (error) {
        console.error("Error detallado de Resend:", error)
        return NextResponse.json(
          {
            error: "Error al enviar el correo",
            details: error.message,
            // No usamos statusCode para evitar el error de TypeScript
            tip: "Verifica tu API key y la configuración de Resend",
          },
          { status: 500 },
        )
      }

      return NextResponse.json({ success: true, data })
    } catch (resendError: any) {
      console.error("Error al llamar a la API de Resend:", resendError)
      return NextResponse.json(
        {
          error: "Error al comunicarse con Resend",
          message: resendError.message,
          tip: "Verifica tu conexión a internet y la API key de Resend",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Error general en la API:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        tip: "Revisa los logs del servidor para más detalles",
      },
      { status: 500 },
    )
  }
}

