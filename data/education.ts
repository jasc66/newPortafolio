export interface Education {
  degree: string
  institution: string
  year: number
}

export const educationData: Education[] = [
  {
    degree: "Bachillerato en Ingeniería de Sistemas Informáticos",
    institution: "Universidad Latina",
    year: 2019,
  },
  {
    degree: "Licenciatura en Informática Educativa",
    institution: "Universidad Latina",
    year: 2009,
  },
  {
    degree: "Bachiller en Ciencias de la Educación con énfasis en I y II ciclos e Informática Educativa",
    institution: "Universidad Latina",
    year: 2003,
  },
]

export interface Course {
  year: number | string
  title: string
  institution: string
  additionalInfo: string[]
  courses: string[]
}

export const coursesData: Course[] = [
  {
    year: 2008,
    title: "Curso Técnicas Secretariales",
    institution: "Instituto Profesional de Educación Comunitaria IPEC Agua Buena",
    additionalInfo: [],
    courses: [],
  },
  {
    year: 2012,
    title: "Cursos de Auditor Interno de Calidad ISO 9001",
    institution: "Centro de Investigación y Capacitación en Administración Pública",
    additionalInfo: [],
    courses: [],
  },
  {
    year: 2012,
    title: "Curso Conciencia por la Calidad",
    institution: "Centro de Investigación y Capacitación en Administración Pública",
    additionalInfo: [],
    courses: [],
  },
  {
    year: 2012,
    title: "Curso Virtual de Control Interno",
    institution: "Centro de Investigación y Capacitación en Administración Pública",
    additionalInfo: [],
    courses: [],
  },
  {
    year: 2012,
    title: "Capacitación Regional en Tecnologías de Información y Comunicación en los módulos",
    institution: "Instituto Tecnológico de Costa Rica (Escuela de Administración de Empresas)",
    additionalInfo: [],
    courses: [
      "Tecnologías de Información y Comunicación (TIC), Sistemas de Información y Brecha Digital",
      "Rol de la Información y la Comunicación en las Actividades Agroempresariales",
      "Gestión de la Información | Instituto Tecnológico de Costa Rica (Escuela de Administración de Empresas)",
    ],
  },
  {
    year: "2018-2022",
    title: "Curso Plataforma Virtuales",
    institution: "Varias",
    additionalInfo: [],
    courses: [
      "Desarrollo Web Completo con HTML5, CSS3, JS, AJAX, PHP y MySQL",
      "JavaScript Moderno",
      "SharePoint Online",
      "Sistemas POS Inventarios y Ventas con PHP 8 y AdminLTE",
      "CSS La Guía Completa: Flexbox, Grid, SASS",
      "React: Hooks, Context, Redux, MERN",
      "Oracle Form, Pl SQL",
    ],
  },
  {
    year: 2023,
    title: "Introducción a Ciberseguridad-MAG",
    institution: "Universidad Latina de Costa Rica",
    additionalInfo: [],
    courses: [
      "Introducción a la Ciberseguridad",
      "Ataques, Conceptos y Técnicas",
      "Protegiendo sus Datos y su Privacidad",
      "Protegiendo a la Organización",
    ],
  },
]

