export interface Experience {
  title: string
  company: string
  startDate: string
  endDate: string
  description: string
  mainDuties: string[]
  technologies: string[]
  icon: string
}

export const experiences: Experience[] = [
  {
    title: "Analista Programador Senior",
    company: "Dirección General de Servicio Civil (DGSC)",
    startDate: "Junio 2024",
    endDate: "Actualidad",
    description:
      "Encargado del mantenimiento del sitio web actual de la organización y responsable del proyecto de rediseño completo del sitio web para hacerlo accesible según las normas internacionales de accesibilidad.",
    mainDuties: [
      "Mantenimiento del sitio web actual, asegurando su funcionamiento óptimo y actualización constante.",
      "Desarrollo y gestión del proyecto de rediseño completo del sitio web para cumplir con las normas internacionales de accesibilidad (WCAG 2.2).",
      "Implementación de tecnologías modernas de frontend como React, Next.js y Tailwind CSS para mejorar la experiencia del usuario.",
      "Colaboración con equipos interdisciplinarios para asegurar que el sitio web cumpla con los estándares de accesibilidad y funcionalidad requeridos.",
      "Optimización de la estructura del sitio web para mejorar el rendimiento y la compatibilidad con dispositivos móviles.",
      "Uso de herramientas como Node.js, HTML5, CSS3 y JavaScript para garantizar una integración backend-frontend eficiente y fluida.",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Node.js"],
    icon: "🌐",
  },
  {
    title: "Analista Programador Mid",
    company: "Coopealianza",
    startDate: "Diciembre 2023",
    endDate: "Junio 2024",
    description:
      "Desarrollo de aplicaciones financieras críticas utilizando tecnologías como Oracle Forms, Windows Forms y Asp.Net, asegurando la entrega puntual y la calidad de las soluciones para respaldar las operaciones comerciales.",
    mainDuties: [
      "Implemento procedimientos almacenados, cursores y funciones mediante PL/SQL para mejorar el rendimiento y la eficiencia de las operaciones de la base de datos.",
      "Identifico y resuelvo problemas complejos de manera proactiva, aplicando un enfoque analítico para minimizar el impacto en las operaciones y garantizar la continuidad del servicio.",
      "Colaboro estrechamente con equipos interdisciplinarios para comprender las necesidades del negocio y traducirlas en soluciones técnicas efectivas, contribuyendo al éxito continuo de los proyectos y la mejora de los procesos internos.",
    ],
    technologies: ["Oracle Forms", "PL/SQL", "Windows Forms", "Asp.Net"],
    icon: "💻",
  },
  {
    title: "Programador II",
    company: "Ministerio de Agricultura y Ganadería",
    startDate: "Septiembre 2008",
    endDate: "Diciembre 2023",
    description:
      "Desarrollo e implementación de sistemas de información conforme a la 'Metodología de desarrollo de sistemas'.",
    mainDuties: [
      "Intranet Direcciones Regionales: Desarrollador del INTRANET para las 8 Direcciones Regionales del País.",
      "Propuesta Reactivación Económica-Productiva Región Brunca: Desarrollo de base de datos para el manejo de proyectos.",
      "Bases de datos: ComposerPHP8, MySQL, Power Query, Tableau.",
    ],
    technologies: ["Microsoft 365", "SharePoint", "JavaScript", "React", "C#", "Tailwind CSS", "Node.js", "MongoDB"],
    icon: "🌾",
  },
  {
    title: "Profesor de Enseñanza Técnico Profesional",
    company: "Ministerio de Educación Pública – IPEC",
    startDate: "Marzo 2006",
    endDate: "Septiembre 2008",
    description:
      "Diseñé e impartí cursos técnicos profesionales en informática, adaptados a las necesidades y habilidades de una audiencia diversa.",
    mainDuties: [
      "Realicé un análisis detallado de las necesidades de aprendizaje de los estudiantes antes de cada curso, permitiendo una enseñanza personalizada y efectiva.",
      "Elaboré planes de clases basados en el conocimiento previo y nivel de habilidades del grupo, integrando las últimas tecnologías y herramientas informáticas disponibles en el mercado.",
      "Desarrollé y proporcioné materiales didácticos innovadores, así como manuales prácticos, para mejorar el proceso de aprendizaje y la comprensión de los conceptos.",
    ],
    technologies: ["Word", "Excel", "PowerPoint", "SQL"],
    icon: "🎓",
  },
  {
    title: "Freelance",
    company: "Proyectos Personales y Laborales",
    startDate: "Variable",
    endDate: "Actualidad",
    description:
      "Como freelance, ha participado en una variedad de proyectos, tanto personales como laborales, que le han permitido trabajar con diversas tecnologías.",
    mainDuties: [
      "Desarrolló un Framework en React, Next.js, y Tailwind CSS.",
      "Implementación de un E-commerce en Shopify.",
      "Creación de Templates y Plugins personalizados en WordPress utilizando JavaScript, PHP y CSS.",
      "Desarrollo de un sistema de POS de inventarios, ventas, facturación y reportes utilizando PHP, SQL, JavaScript, CSS y MVC.",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Shopify", "WordPress", "PHP", "JavaScript", "SQL"],
    icon: "🔧",
  },
]

