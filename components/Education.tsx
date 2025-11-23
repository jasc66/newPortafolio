"use client"

import { useState } from "react"
import { educationData, coursesData } from "@/data/education"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function Education() {
  const [expandedCourses, setExpandedCourses] = useState<number[]>([])

  const toggleCourseExpansion = (index: number) => {
    setExpandedCourses((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="numbered-heading mb-10">
        <span className="text-green font-mono text-sm mr-2">02.</span>
        Estudios Académicos
      </h2>

      <div className="space-y-12 mb-16">
        <h3 className="text-2xl font-semibold text-lightest-slate mb-6">Educación Formal</h3>
        {educationData.map((edu, index) => (
          <div key={index} className="group">
            <h4 className="text-xl font-semibold text-lightest-slate group-hover:text-green transition-colors">
              {edu.degree}
            </h4>
            <p className="text-slate">
              {edu.institution} ({edu.year})
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        <h3 className="text-2xl font-semibold text-lightest-slate mb-6">Cursos y Certificaciones</h3>
        {coursesData.map((course, index) => (
          <div key={index} className="p-6 rounded-lg transition-all duration-300 hover:bg-light-navy group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-semibold text-lightest-slate group-hover:text-green transition-colors">
                  {course.title}
                </h4>
                <p className="text-slate">{course.institution}</p>
                <Badge variant="secondary" className="mt-2">
                  {course.year}
                </Badge>
              </div>
              {course.courses.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green hover:text-green hover:bg-green/10"
                  onClick={() => toggleCourseExpansion(index)}
                >
                  {expandedCourses.includes(index) ? (
                    <>
                      Ver menos <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Ver más <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
            {expandedCourses.includes(index) && course.courses.length > 0 && (
              <ul className="list-disc list-inside space-y-2 mt-4 text-slate">
                {course.courses.map((subCourse, subIndex) => (
                  <li key={subIndex}>{subCourse}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

