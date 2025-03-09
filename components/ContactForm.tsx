"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  subject: z.string().min(5, {
    message: "El asunto debe tener al menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      console.log("Respuesta del servidor:", data)

      if (response.ok) {
        // Mostrar toast de éxito
        toast({
          title: "¡Mensaje enviado!",
          description:
            data.mode === "development"
              ? "MODO DE DESARROLLO: El mensaje se ha simulado correctamente."
              : "Gracias por contactarme. Te responderé lo antes posible.",
          duration: 5000, // 5 segundos
        })

        // Resetear el formulario
        form.reset()

        // Esperar un momento para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          // Redirigir a la página principal
          router.push("/")
        }, 2000)
      } else {
        // Extraer detalles del error
        const errorMessage = data.details || data.message || data.error || "Error desconocido"
        const errorTip = data.tip || "Intenta nuevamente más tarde."
        console.error("Detalles del error:", data)
        throw new Error(`${errorMessage}. ${errorTip}`)
      }
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error)
      toast({
        title: "Error al enviar el mensaje",
        description: error.message || "Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} className="bg-light-navy border-light-navy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} className="bg-light-navy border-light-navy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asunto</FormLabel>
              <FormControl>
                <Input placeholder="Asunto del mensaje" {...field} className="bg-light-navy border-light-navy" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  className="min-h-[150px] bg-light-navy border-light-navy"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
        {process.env.NODE_ENV === "development" && (
          <p className="text-xs text-slate text-center mt-2">Modo de desarrollo: El envío de correos se simulará</p>
        )}
      </form>
    </Form>
  )
}

