import { aboutData } from "@/data/about"

export function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="numbered-heading mb-10">
        <span className="text-green font-mono text-sm mr-2">01.</span>
        Sobre mí
      </h2>
      <div className="text-slate space-y-4">
        <p>{aboutData.introduction}</p>
        <p>{aboutData.currentFocus}</p>
        <p>Aquí hay algunas tecnologías con las que he estado trabajando recientemente:</p>
        <ul className="grid grid-cols-2 gap-2 mt-4">
          {aboutData.technologies.map((tech, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-green">▹</span>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

