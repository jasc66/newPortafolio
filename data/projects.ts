export interface Project {
  title: string
  description: string
  technologies: string[]
  duration: string
  imageUrl: string
  projectUrl: string
  tag: string
  status: "En construcción" | "Completo"
  github?: string // Campo opcional para el enlace al repositorio de GitHub
}

export const projectsData: Project[] = [
  // Nuevos proyectos
  {
  title: "Portafolio Profesional - José Alonso Salguero C.",
  description:
    "Mi portafolio web profesional actualizado. Presenta mis proyectos más recientes, experiencia en desarrollo Full Stack y enfoque fuerte en accesibilidad, diseño responsivo y buenas prácticas modernas de frontend.",
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  duration: "En mejora continua",
  imageUrl: "/images/project/portafolio-pro-jasc.png",
  projectUrl: "https://portafolio-pro-jasc.vercel.app/",
  tag: "Portafolio",
  status: "Completo",
  github: "https://github.com/jasc66", // poné el repo exacto si querés
},
  {
    title: "Prototipo Accesible DGSC",
    description:
      "Prototipo funcional de dashboard para evaluar y monitorear la accesibilidad web del portal institucional de la DGSC. Incluye auditorías automatizadas, visualización de hallazgos WCAG 2.2 AA, métricas de cumplimiento y seguimiento por campañas/páginas, orientado a apoyar la mejora continua y el cumplimiento normativo.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    duration: "En desarrollo continuo",
    imageUrl: "/images/project/prototipo-accesible.png",
    projectUrl: "https://prototipo-accesible.vercel.app/",
    tag: "Accesibilidad",
    status: "En construcción",
    github: "https://github.com/jasc66", // ajustá al repo real si aplica
  },
  {
    title: "Post JASC",
    description:
      "Aplicación web con autenticación para gestionar publicaciones (posts) y contenido. Incluye módulo de login, manejo de usuarios y flujo CRUD de entradas, pensada como base para proyectos tipo blog/portal de noticias con UI moderna y responsive.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    duration: "3 Semanas",
    imageUrl: "/images/project/post-jasc.png",
    projectUrl: "https://post-jasc.vercel.app/login",
    tag: "Blog / CMS",
    status: "En construcción",
    github: "https://github.com/jasc66", // ajustá al repo real si aplica
  },

  {
    title: "Portfolio de Karla Brenes",
    description:
      "Elegante portafolio web para Karla Tatiana Brenes Campos, Analista Programador, con un diseño moderno en tonos marrones y dorados, destacando su experiencia profesional y habilidades.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    duration: "3 Semanas",
    imageUrl: "/images/project/Portafolio_Karla.png",
    projectUrl: "https://v0-pdf-to-html-template.vercel.app/",
    tag: "Portfolio",
    status: "Completo",
  },
  {
    title: "Portfolio de Ingeniero de Datos",
    description:
      "Portfolio profesional para Kevin Ilama Portuguez, Ingeniero de Datos especializado en SQL, ETL, Power BI y soluciones de integración de datos para empresas.",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    duration: "2 Semanas",
    imageUrl: "/images/project/Portafolio_Kevin.png",
    projectUrl: "https://v0-ingeniero-web-portfolio.vercel.app/",
    tag: "Portfolio",
    status: "Completo",
  },

  // Proyectos existentes
  {
    title: "Portafolio Anterior",
    description:
      "Mi portafolio web anterior, desarrollado con tecnologías modernas para mostrar mis proyectos y habilidades como desarrollador.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    duration: "3 Semanas",
    imageUrl: "/images/project/portafolio-anterior.png",
    projectUrl: "https://portafolio-jasc1.vercel.app/",
    tag: "Portafolio",
    status: "Completo",
  },
  {
    title: "Restaurante De La Finca - Sitio Principal",
    description:
      "Sitio web principal para el restaurante De La Finca, con información sobre el menú, galería y contacto. Desarrollado con tecnologías modernas para ofrecer una experiencia de usuario óptima.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    duration: "4 Semanas",
    imageUrl: "/images/project/de-la-finca-main.png",
    projectUrl: "https://de-la-finca-xu1n.vercel.app/",
    tag: "Restaurante",
    status: "Completo",
  },
  {
    title: "De La Finca - Landing Page",
    description:
      "Página de presentación para el restaurante De La Finca en Quepos, Costa Rica, destacando su experiencia culinaria única.",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "2 Semanas",
    imageUrl: "/images/project/de-la-finca.png",
    projectUrl: "https://de-la-finca.vercel.app/",
    tag: "Restaurante",
    status: "Completo",
  },
  {
    title: "UpTask - Control de Tareas",
    description: "Aplicación web para la gestión y control de tareas y proyectos con autenticación de usuarios.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    duration: "6 Semanas",
    imageUrl: "/images/project/uptask.png",
    projectUrl: "https://up-task-frontend-omega.vercel.app/auth/login",
    tag: "Productividad",
    status: "Completo",
  },
  {
    title: "ChatBot",
    description: "ChatBot Servicio Civil, Next js, Typescript, Tailwind CSS, en construcción",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    duration: "3 Semanas",
    imageUrl: "/images/project/chatbot.png",
    projectUrl: "https://chatbot-servicio-civil.vercel.app/",
    tag: "ChatBot",
    status: "En construcción",
  },
  {
    title: "Carrito de Compras",
    description: "Sitio de compras de productos agropecuarios",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    duration: "4 Semanas",
    imageUrl: "/images/project/AppCarrito.png",
    projectUrl: "https://carritoapp.vercel.app/",
    tag: "Food",
    status: "En construcción",
  },
  {
    title: "Restaurante De La Finca",
    description: "Sitio de comidas para restaurante De la Finca, en construcción",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "3 Semanas",
    imageUrl: "/images/project/de-la-finca.png",
    projectUrl: "https://de-la-finca.vercel.app/index.html",
    tag: "Food",
    status: "En construcción",
  },
  {
    title: "Contador de Calorías",
    description:
      "Contador de calorías desarrollado con React, VITE, y TypeScript, que permite realizar un seguimiento de la ingesta de alimentos. En construcción.",
    technologies: ["React", "TypeScript", "Vite"],
    duration: "2 semanas",
    imageUrl: "/images/project/contador.webp",
    projectUrl: "https://calorie-tracker-zxzn.vercel.app/",
    tag: "Contador",
    status: "En construcción",
  },
  {
    title: "AppFood",
    description: "Aplicación web de gestión de alimentos diseñada con HTML y CSS. En construcción.",
    technologies: ["HTML", "CSS"],
    duration: "1 semana",
    imageUrl: "/images/project/appfood.webp",
    projectUrl: "https://app-food-xi.vercel.app/",
    tag: "Plantilla",
    status: "En construcción",
  },
  {
    title: "Registro de Actividades Semanales MAG",
    description:
      "Sistema de registro de actividades desarrollado con React, VITE, y TypeScript, diseñado para gestionar las actividades semanales. En construcción.",
    technologies: ["React", "TypeScript", "Vite"],
    duration: "2 meses",
    imageUrl: "/images/project/Project_12_a.webp",
    projectUrl: "https://progra-semanal.vercel.app/",
    tag: "Registro",
    status: "En construcción",
  },
  {
    title: "Cotizador de Propinas React",
    description: "Aplicación para calcular propinas, desarrollada con React, VITE, y TypeScript. Proyecto completo.",
    technologies: ["React", "TypeScript", "Vite"],
    duration: "1 mes",
    imageUrl: "/images/project/cotizador.webp",
    projectUrl: "https://cotizador-react-vite-type.vercel.app/",
    tag: "Restaurante",
    status: "Completo",
  },
  {
    title: "Rajabegum",
    description:
      "Plantilla web creada con HTML, CSS, SASS, y GULP, para un sitio de servicios profesionales. En construcción.",
    technologies: ["HTML", "CSS", "SASS", "GULP"],
    duration: "1 mes",
    imageUrl: "/images/project/Project_13_a.webp",
    projectUrl: "https://los-mora.vercel.app/",
    tag: "Plantilla",
    status: "En construcción",
  },
  {
    title: "Envío Email",
    description:
      "Plantilla de correo electrónico desarrollada en React y JavaScript para gestionar el envío de correos electrónicos. Proyecto completo.",
    technologies: ["React", "JavaScript"],
    duration: "1 mes",
    imageUrl: "/images/project/Project_1_a.webp",
    projectUrl: "https://enviocorreo.netlify.app",
    tag: "Envio",
    status: "Completo",
  },
  {
    title: "Sitio Agropecuario",
    description:
      "Sitio web para el sector agropecuario, desarrollado con plantillas y diseño responsivo. Proyecto completo.",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "1 mes",
    imageUrl: "/images/project/Project_7_a.webp",
    projectUrl: "https://nosfuimosdelmag.netlify.app",
    tag: "Agropecuario",
    status: "Completo",
  },
  {
    title: "Cotizador de Préstamos",
    description: "Aplicación de cotización de préstamos usando React Hook. Proyecto completo.",
    technologies: ["React", "JavaScript"],
    duration: "1 mes",
    imageUrl: "/images/project/Project_8_a.webp",
    projectUrl: "https://cotizadorreactprestamos.netlify.app",
    tag: "Cotizador",
    status: "Completo",
  },
  {
    title: "Restaurante",
    description: "Plantilla para un restaurante con diseño responsive, en construcción.",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "1 mes",
    imageUrl: "/images/project/Project_2_a.webp",
    projectUrl: "https://ketonoah.netlify.app",
    tag: "Comidas",
    status: "En construcción",
  },
  {
    title: "API Rest",
    description: "Proyecto que consume una API REST, desarrollado con React. Proyecto completo.",
    technologies: ["React", "JavaScript", "REST API"],
    duration: "1 Semana",
    imageUrl: "/images/project/Project_3_a.webp",
    projectUrl: "https://buscadorapi.netlify.app",
    tag: "Consumo",
    status: "Completo",
  },
  {
    title: "Jornada Agro",
    description: "Sitio informativo sobre jornadas agropecuarias. Proyecto completo.",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "2 Semanas",
    imageUrl: "/images/project/Project_4_a.webp",
    projectUrl: "https://jornadaagro.netlify.app",
    tag: "Informativo",
    status: "Completo",
  },
  {
    title: "Belleza",
    description: "Sitio web de reservas para un salón de belleza. En construcción.",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "4 meses",
    imageUrl: "/images/project/Project_5_a.webp",
    projectUrl: "https://laurasalon.netlify.app",
    tag: "Reservas",
    status: "En construcción",
  },
  {
    title: "Psicología",
    description: "Sitio web informativo para una clínica de psicología. En construcción.",
    technologies: ["HTML", "CSS", "JavaScript"],
    duration: "1 mes",
    imageUrl: "/images/project/Project_6_a.webp",
    projectUrl: "https://psicoalaya.netlify.app",
    tag: "Informativo",
    status: "En construcción",
  },
  {
    title: "Victoria Arronis",
    description: "Blog profesional desarrollado en React, en construcción.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    duration: "3 Semanas",
    imageUrl: "/images/project/Project_9_a.webp",
    projectUrl: "https://victoriaarronis.netlify.app",
    tag: "Blog",
    status: "En construcción",
  },
]
