"use client"

import { useState } from "react"
import { projectsData, type Project } from "@/data/projects"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative overflow-hidden rounded-lg bg-light-navy hover:bg-lightest-navy transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-navy/30 group-hover:bg-transparent transition-colors duration-300 z-10" />
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-green transition-colors duration-300 z-20" />
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
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
              {project.technologies.map((tech, index) => (
                <li
                  key={index}
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
}

export function Projects() {
  const [filter, setFilter] = useState<"todos" | "completo" | "construccion">("todos")
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  const filteredProjects = projectsData.filter((project) => {
    if (filter === "todos") return true
    if (filter === "completo") return project.status === "Completo"
    if (filter === "construccion") return project.status === "En construcción"
    return true
  })

  const showMoreProjects = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length))
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="numbered-heading mb-6 text-2xl">
          <span className="text-green font-mono text-sm mr-2">04.</span>
          Proyectos
        </h2>

        {/* Updated filter buttons with better responsive layout */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => {
              setFilter("todos")
              setVisibleProjects(6)
            }}
            className={`px-3 py-2 text-sm rounded transition-colors font-medium min-w-[100px] ${
              filter === "todos" ? "bg-green text-navy" : "text-light-slate hover:text-green hover:bg-green/10"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setFilter("completo")
              setVisibleProjects(6)
            }}
            className={`px-3 py-2 text-sm rounded transition-colors font-medium min-w-[100px] ${
              filter === "completo" ? "bg-green text-navy" : "text-light-slate hover:text-green hover:bg-green/10"
            }`}
          >
            Completados
          </button>
          <button
            onClick={() => {
              setFilter("construccion")
              setVisibleProjects(6)
            }}
            className={`px-3 py-2 text-sm rounded transition-colors font-medium min-w-[100px] ${
              filter === "construccion" ? "bg-green text-navy" : "text-light-slate hover:text-green hover:bg-green/10"
            }`}
          >
            En Construcción
          </button>
        </div>
      </div>

      <div className="grid gap-8 sm:gap-16">
        {filteredProjects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {visibleProjects < filteredProjects.length && (
        <div className="mt-12 text-center">
          <Button
            onClick={showMoreProjects}
            variant="outline"
            className="border-green text-green hover:text-navy hover:bg-green hover:border-green transition-colors min-w-[200px] font-medium"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Ver más proyectos"}
          </Button>
        </div>
      )}
    </div>
  )
}

