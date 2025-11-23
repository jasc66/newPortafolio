// Nuevo archivo para estrategias de carga de datos
import { cache } from "react"
import { projectsData } from "@/data/projects"
import { experiences } from "@/data/experience"
import { educationData, coursesData } from "@/data/education"

// Usar la función cache de React para memorizar los resultados
export const getProjects = cache(() => {
  return projectsData
})

export const getExperiences = cache(() => {
  return experiences
})

export const getEducation = cache(() => {
  return {
    education: educationData,
    courses: coursesData,
  }
})

// Función para obtener datos con un retraso simulado (para desarrollo)
export async function getDataWithDelay(dataFn: Function, delay = 0) {
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay))
  }
  return dataFn()
}

