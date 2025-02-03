import { ContactForm } from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <div className="pt-24 pb-12">
      <section id="contact" className="min-h-screen flex flex-col justify-center max-w-2xl mx-auto">
        <h1 className="text-green font-mono mb-5 text-sm">Contacto</h1>
        <h2 className="text-lightest-slate text-4xl font-bold mb-4">Ponte en contacto</h2>
        <p className="text-slate text-lg mb-12 leading-relaxed">
          ¿Tienes alguna pregunta o propuesta? Mi bandeja de entrada está siempre abierta. Ya sea que tengas una
          pregunta o simplemente quieras saludar, ¡haré todo lo posible por responderte!
        </p>
        <ContactForm />
      </section>
    </div>
  )
}

