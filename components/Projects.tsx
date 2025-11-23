"use client"

import { useState, useEffect, useRef } from "react"
import { projectsData, type Project } from "@/data/projects"
import { ExternalLink, Github, Search } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { NewBadge } from "@/components/NewBadge"
import { Input } from "@/components/ui/input"

// Definir los proyectos nuevos para mostrar la etiqueta
const NEW_PROJECTS = ["Portfolio de Karla Brenes", "Portfolio de Ingeniero de Datos"]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isNewProject = NEW_PROJECTS.includes(project.title)
  const cardRef = useRef<HTMLDivElement>(null) // ✅ ahora es div/article
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = cardRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
          observer.unobserve(entry.target) // ✅ evita re-animar
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [index])

  return (
    <article
      ref={cardRef}
      className={`group relative overflow-hidden rounded-lg bg-light-navy hover:bg-lightest-navy transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* ✅ Link principal overlay (no anida otros <a>) */}
      <a
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir proyecto ${project.title}`}
        className="absolute inset-0 z-0"
      />

      {isNewProject && <NewBadge />}

      {/* Contenido arriba del overlay */}
      <div className="relative z-10 flex flex-col md:flex-row">
        <div className="relative h-48 md:h-auto md:w-72 flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-navy/30 group-hover:bg-transparent transition-colors duration-300 z-10" />
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-green transition-colors duration-300 z-20" />
          <Image
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
            className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:contrast-110"
          />
        </div>

        <div className="flex flex-col justify-between p-6 flex-grow">
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="mb-2 text-xl font-semibold text-lightest-slate group-hover:text-green transition-colors">
                  {project.title}
                </h3>
                <Badge variant={project.status === "Completo" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* ✅ Link externo al proyecto (icono) */}
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-slate hover:text-green transition-colors"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Abrir demo del proyecto"
                >
                  <ExternalLink size={20} />
                </a>

                {/* ✅ Link GitHub ya no está dentro de otro <a> */}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-slate hover:text-green transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Ver repositorio en GitHub"
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
              {project.technologies.map((tech, i) => (
                <li
                  key={`${tech}-${i}`}
                  className="rounded px-3 py-1 text-green bg-green/10 border border-green/20 hover:border-green/40 transition-colors"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<"todos" | "completo" | "construccion">("todos")
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  // Extraer todas las tecnologías únicas
  const allTechnologies = Array.from(
    new Set(projectsData.flatMap((project) => project.technologies)),
  ).sort()

  // Filtrar proyectos por estado, búsqueda y tecnología
  const filteredProjects = projectsData.filter((project) => {
    const statusMatch =
      filter === "todos"
        ? true
        : filter === "completo"
          ? project.status === "Completo"
          : project.status === "En construcción"

    const s = searchTerm.toLowerCase()
    const searchMatch =
      !s ||
      project.title.toLowerCase().includes(s) ||
      project.description.toLowerCase().includes(s) ||
      project.tag.toLowerCase().includes(s)

    const techMatch = selectedTech === null ? true : project.technologies.includes(selectedTech)

    return statusMatch && searchMatch && techMatch
  })

  const showMoreProjects = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length))
    setIsLoading(false)
  }

  const resetFilters = () => {
    setFilter("todos")
    setSearchTerm("")
    setSelectedTech(null)
    setVisibleProjects(6)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h2 className="numbered-heading mb-6 text-2xl">
          <span className="text-green font-mono text-sm mr-2">04.</span>
          Proyectos
        </h2>

        <div className="space-y-6 mb-8">
          {/* Filtros de estado */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setFilter("todos")
                setVisibleProjects(6)
              }}
              className={`px-3 py-2 text-sm rounded transition-colors font-medium min-w-[100px] ${
                filter === "todos"
                  ? "bg-green text-navy"
                  : "text-light-slate hover:text-green hover:bg-green/10"
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
                filter === "completo"
                  ? "bg-green text-navy"
                  : "text-light-slate hover:text-green hover:bg-green/10"
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
                filter === "construccion"
                  ? "bg-green text-navy"
                  : "text-light-slate hover:text-green hover:bg-green/10"
              }`}
            >
              En Construcción
            </button>
          </div>

          {/* Búsqueda y filtro por tecnología */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setVisibleProjects(6)
                }}
                className="pl-10 bg-light-navy border-light-navy"
              />
            </div>

            <select
              value={selectedTech || ""}
              onChange={(e) => {
                setSelectedTech(e.target.value || null)
                setVisibleProjects(6)
              }}
              className="px-3 py-2 rounded bg-light-navy border-light-navy text-slate focus:outline-none focus:ring-1 focus:ring-green"
            >
              <option value="">Todas las tecnologías</option>
              {allTechnologies.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>

            {(searchTerm || selectedTech || filter !== "todos") && (
              <Button variant="ghost" onClick={resetFilters} className="text-slate hover:text-green">
                Limpiar filtros
              </Button>
            )}
          </div>
        </div>

        <p className="text-sm text-slate mb-6">
          Mostrando {Math.min(visibleProjects, filteredProjects.length)} de {filteredProjects.length} proyectos
        </p>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-light-navy/30 rounded-lg">
          <p className="text-xl text-slate">No se encontraron proyectos con los filtros actuales</p>
          <Button variant="link" onClick={resetFilters} className="text-green mt-4">
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 sm:gap-16">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      )}

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
