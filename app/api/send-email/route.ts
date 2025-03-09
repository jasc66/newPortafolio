import { NextResponse } from "next/server"
import { Resend } from "resend"

// Inicializa Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Configura el correo de destino y origen
const TO_EMAIL = process.env.TO_EMAIL || "alonso.jasc@hotmail.com"
const FROM_EMAIL = process.env.FROM_EMAIL || "contacto@tudominio.com" // Reemplaza con tu dominio verificado

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validación básica
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    // Configuración para producción
    const { data, error } = await resend.emails.send({
      from: `Formulario de Contacto <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `Nuevo mensaje: ${subject}`,
      replyTo: email,
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
    })

    if (error) {
      console.error("Error al enviar el correo:", error)
      return NextResponse.json({ error: "Error al enviar el correo" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error en la API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

