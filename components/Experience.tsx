"use client"

import { useState } from "react"
import { experiences } from "@/data/experience"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

export function Experience() {
  const [expandedJobs, setExpandedJobs] = useState<number[]>([])

  const toggleJobExpansion = (index: number) => {
    setExpandedJobs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="numbered-heading mb-10">
        <span className="text-green font-mono text-sm mr-2">03.</span>
        Dónde he trabajado
      </h2>
      <div className="space-y-16">
        {experiences.map((job, index) => (
          <div key={index} className="relative p-6 rounded-lg transition-all duration-300 hover:bg-light-navy group">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4">{job.icon}</span>
              <div>
                <h3 className="text-xl font-semibold text-lightest-slate group-hover:text-green transition-colors">
                  {job.title} · <span className="text-green">{job.company}</span>
                </h3>
                <p className="text-sm text-slate">
                  {job.startDate} - {job.endDate}
                </p>
              </div>
            </div>
            <p className="text-slate mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.technologies.map((tech, techIndex) => (
                <Badge key={techIndex} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <Button
              variant="ghost"
              className="text-green hover:text-green hover:bg-green/10"
              onClick={() => toggleJobExpansion(index)}
            >
              {expandedJobs.includes(index) ? (
                <>
                  Ver menos <ChevronUp className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Ver más <ChevronDown className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            {expandedJobs.includes(index) && (
              <ul className="list-disc list-inside space-y-2 mt-4 text-slate">
                {job.mainDuties.map((duty, dutyIndex) => (
                  <li key={dutyIndex}>{duty}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

