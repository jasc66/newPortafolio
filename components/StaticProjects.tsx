"use client"

// Nuevo componente para renderizar proyectos de forma estática
import { projectsData } from "@/data/projects"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { NewBadge } from "@/components/NewBadge"

// Definir los proyectos nuevos para mostrar la etiqueta
const NEW_PROJECTS = ["Portfolio de Karla Brenes", "Portfolio de Ingeniero de Datos"]

export async function StaticProjects() {
  // Mostrar solo los primeros 3 proyectos de forma estática
  const initialProjects = projectsData.slice(0, 3)

  return (
    <div className="grid gap-8 sm:gap-16">
      {initialProjects.map((project, index) => {
        const isNewProject = NEW_PROJECTS.includes(project.title)

        return (
          <a
            key={index}
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-lg bg-light-navy hover:bg-lightest-navy transition-colors duration-300"
          >
            {isNewProject && <NewBadge />}
            <div className="flex flex-col md:flex-row">
              <div className="relative h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-navy/30 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-green transition-colors duration-300 z-20" />
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-all duration-300 group-hover:brightness-110 group-hover:contrast-110"
                />
              </div>

              <div className="flex flex-col justify-between p-6 flex-grow">
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-lightest-slate group-hover:text-green transition-colors">
                        {project.title}
                      </h3>
                      <Badge variant={project.status === "Completo" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <ExternalLink size={20} className="text-light-slate hover:text-green transition-colors" />
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-light-slate hover:text-green transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="bg-navy/50 rounded-lg p-4 mb-4 backdrop-blur-sm">
                    <p className="text-light-slate">{project.description}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-4 text-xs text-light-slate">
                    <span className="font-mono text-green">Duración:</span> {project.duration}
                  </div>

                  <ul className="flex flex-wrap gap-2 font-mono text-xs">
                    {project.technologies.map((tech, techIndex) => (
                      <li
                        key={techIndex}
                        className="rounded px-3 py-1 text-green bg-green/10 border border-green/20 hover:border-green/40 transition-colors"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

