"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
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
    setFormStatus({ type: null, message: null })

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

        // Actualizar estado del formulario
        setFormStatus({
          type: "success",
          message:
            data.mode === "development" || data.mode === "missing-api-key"
              ? "El mensaje se ha enviado correctamente (modo simulado)."
              : "¡Mensaje enviado! Gracias por contactarme.",
        })

        // Resetear el formulario
        form.reset()

        // Esperar un momento para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          // Redirigir a la página principal
          router.push("/")
        }, 3000)
      } else {
        // Extraer detalles del error
        const errorMessage = data.details || data.message || data.error || "Error desconocido"
        const errorTip = data.tip || "Intenta nuevamente más tarde."
        console.error("Detalles del error:", data)

        // Actualizar estado del formulario
        setFormStatus({
          type: "error",
          message: `${errorMessage}. ${errorTip}`,
        })

        throw new Error(`${errorMessage}. ${errorTip}`)
      }
    } catch (error: any) {
      console.error("Error al enviar el formulario:", error)

      // Mostrar toast de error
      toast({
        title: "Error al enviar el mensaje",
        description: error.message || "Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
        duration: 5000,
      })

      // Actualizar estado del formulario
      setFormStatus({
        type: "error",
        message: error.message || "Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {formStatus.type && (
        <Alert variant={formStatus.type === "success" ? "default" : "destructive"} className="animate-fadeIn">
          {formStatus.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{formStatus.type === "success" ? "¡Mensaje enviado!" : "Error al enviar"}</AlertTitle>
          <AlertDescription>{formStatus.message}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-medium bg-green hover:bg-green/90 text-navy transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-green/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Enviar mensaje
              </>
            )}
          </Button>
          {process.env.NODE_ENV === "development" && (
            <p className="text-xs text-slate text-center mt-2">Modo de desarrollo: El envío de correos se simulará</p>
          )}
        </form>
      </Form>
    </div>
  )
}

