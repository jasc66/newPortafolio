import { About } from "@/components/About"
import { Education } from "@/components/Education"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="home" className="min-h-screen flex flex-col justify-center max-w-4xl">
        <h1 className="text-green font-mono mb-5 text-sm">Hola, mi nombre es</h1>
        <h2 className="text-lightest-slate text-5xl md:text-7xl font-bold mb-4">Alonso Salguero C.</h2>
        <h3 className="text-slate text-4xl md:text-7xl font-bold mb-8">Full Stack Developer.</h3>
        <p className="text-slate max-w-xl text-lg mb-6 leading-relaxed">
          Soy un desarrollador especializado en construir experiencias digitales excepcionales. Actualmente, me enfoco
          en crear productos accesibles y centrados en el usuario mientras aprendo las últimas tecnologías en desarrollo
          web.
        </p>
        <div className="text-slate mb-8">
          <p className="mb-2">
            <span className="text-green">Email:</span> alonso.jasc@hotmail.com
          </p>
          <p>
            <span className="text-green">Teléfono:</span> +506 8710 9971
          </p>
        </div>
        <Link href="/contact">
          <Button className="w-fit">Contáctame</Button>
        </Link>
      </section>

      <About />
      <Education />
      <Experience />
      <Projects />
    </div>
  )
}

