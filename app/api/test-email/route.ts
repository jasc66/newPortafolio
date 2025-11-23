import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function GET() {
  try {
    // Inicializa Resend con tu API key
    const resend = new Resend(process.env.RESEND_API_KEY)

    console.log("API Key configurada:", process.env.RESEND_API_KEY ? "Sí" : "No")

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          error: "API key de Resend no configurada",
          message: "No se puede enviar el correo sin la API key de Resend",
        },
        { status: 500 },
      )
    }

    // Enviar un correo de prueba simple
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.TO_EMAIL || "jalonsc66@gmail.com",
      subject: "Correo de prueba",
      html: "<p>Este es un correo de prueba para verificar la configuración de Resend.</p>",
    })

    if (error) {
      console.error("Error al enviar correo de prueba:", error)
      return NextResponse.json(
        {
          error: "Error al enviar correo de prueba",
          details: error,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Correo de prueba enviado correctamente",
      data,
    })
  } catch (error: any) {
    console.error("Error general en la API de prueba:", error)
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        message: error.message || "Error desconocido",
      },
      { status: 500 },
    )
  }
}

