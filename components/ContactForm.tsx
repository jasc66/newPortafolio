"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send, CheckCircle, AlertCircle, Paperclip, X } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Definir los tipos de categorías
const CONTACT_CATEGORIES = [
  { value: "general", label: "Consulta general" },
  { value: "project", label: "Propuesta de proyecto" },
  { value: "job", label: "Oportunidad laboral" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Otro" },
] as const

// Configuración para los adjuntos
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

// Esquema de validación con Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  category: z.enum(["general", "project", "job", "feedback", "other"], {
    required_error: "Por favor selecciona una categoría.",
  }),
  subject: z.string().min(5, {
    message: "El asunto debe tener al menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
  attachment: z
    .any()
    .optional()
    .nullable()
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE),
      `El archivo no debe superar los 5MB.`,
    )
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type)),
      "Solo se aceptan archivos PDF, JPEG, PNG, DOC y DOCX.",
    ),
  sendCopy: z.boolean().default(true),
})

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string | null
  }>({ type: null, message: null })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [rateLimitInfo, setRateLimitInfo] = useState<{ remaining: number; reset: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      category: undefined,
      subject: "",
      message: "",
      attachment: null,
      sendCopy: true,
    },
  })

  // Manejar cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    form.setValue("attachment", file, { shouldValidate: true })
  }

  // Eliminar archivo seleccionado
  const removeFile = () => {
    setSelectedFile(null)
    form.setValue("attachment", null, { shouldValidate: true })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Formatear tiempo restante
  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setFormStatus({ type: null, message: null })

    try {
      // Crear FormData para manejar archivos
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("email", values.email)
      formData.append("category", values.category)
      formData.append("subject", values.subject)
      formData.append("message", values.message)
      formData.append("sendCopy", values.sendCopy ? "true" : "false")

      if (values.attachment) {
        formData.append("attachment", values.attachment)
      }

      // Usar try/catch específico para la solicitud fetch
      let response
      try {
        response = await fetch("/api/send-email", {
          method: "POST",
          body: formData,
        })
      } catch (fetchError) {
        console.error("Error de red al enviar el formulario:", fetchError)
        throw new Error("Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.")
      }

      // Verificar si la respuesta es JSON válido
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Error al parsear la respuesta JSON:", jsonError)

        // Intentar obtener el texto de la respuesta para diagnóstico
        let responseText = ""
        try {
          // Clonar la respuesta ya que response.text() consume el cuerpo
          const clonedResponse = response.clone()
          responseText = await clonedResponse.text()
        } catch (textError) {
          responseText = "No se pudo obtener el texto de la respuesta"
        }

        console.error("Respuesta no JSON:", responseText)
        throw new Error(`El servidor respondió con un formato no válido. Código de estado: ${response.status}`)
      }

      console.log("Respuesta del servidor:", data)

      // Actualizar información de límite de tasa si está disponible
      if (data.rateLimit) {
        setRateLimitInfo({
          remaining: data.rateLimit.remaining,
          reset: data.rateLimit.reset,
        })
      }

      if (response.ok) {
        // Mostrar toast de éxito
        toast({
          title: "¡Mensaje enviado!",
          description:
            data.mode === "development" || data.mode === "missing-api-key"
              ? "MODO SIMULADO: El mensaje se ha procesado correctamente."
              : "Gracias por contactarme. Te responderé lo antes posible.",
          duration: 5000, // 5 segundos
        })

        // Actualizar estado del formulario
        setFormStatus({
          type: "success",
          message:
            data.mode === "development" || data.mode === "missing-api-key"
              ? "El mensaje se ha enviado correctamente (modo simulado)." +
                (values.sendCopy ? " Se ha simulado el envío de una copia a tu correo." : "")
              : "¡Mensaje enviado! Gracias por contactarme." +
                (values.sendCopy ? " Se ha enviado una copia de confirmación a tu correo." : ""),
        })

        // Resetear el formulario
        form.reset()
        setSelectedFile(null)

        // Esperar un momento para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          // Redirigir a la página principal
          router.push("/")
        }, 3000)
      } else {
        // Manejar error de límite de tasa
        if (response.status === 429) {
          setFormStatus({
            type: "error",
            message: `Has excedido el límite de mensajes. Por favor, intenta nuevamente en ${formatTimeRemaining(data.rateLimit?.reset || 3600000)}.`,
          })
          return
        }

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

      {rateLimitInfo && (
        <div className="text-sm text-slate bg-navy/50 p-3 rounded-md">
          Mensajes restantes: <span className="text-green font-medium">{rateLimitInfo.remaining}</span>
          {rateLimitInfo.reset > 0 && rateLimitInfo.remaining < 5 && (
            <span> (se restablece en {formatTimeRemaining(rateLimitInfo.reset)})</span>
          )}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-light-navy border-light-navy">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-light-navy border-light-navy">
                      {CONTACT_CATEGORIES.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="focus:bg-green/10 focus:text-green"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
          </div>

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

          <FormField
            control={form.control}
            name="attachment"
            render={() => (
              <FormItem>
                <FormLabel>Adjunto (opcional)</FormLabel>
                <FormControl>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="bg-light-navy border-light-navy file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green file:text-navy hover:file:bg-green/90"
                      />
                    </div>
                    {selectedFile && (
                      <div className="flex items-center justify-between bg-light-navy/50 p-2 rounded-md">
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4 text-green" />
                          <span className="text-sm truncate max-w-[200px]">{selectedFile.name}</span>
                          <span className="text-xs text-slate">({formatFileSize(selectedFile.size)})</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="h-6 w-6 p-0 text-slate hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Eliminar archivo</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormDescription className="text-xs text-slate">
                  Archivos permitidos: PDF, JPEG, PNG, DOC, DOCX (máx. 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sendCopy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-light-navy/30 p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 accent-green"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Enviarme una copia</FormLabel>
                  <FormDescription className="text-xs">
                    Recibirás una copia de confirmación en tu correo electrónico.
                  </FormDescription>
                </div>
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

