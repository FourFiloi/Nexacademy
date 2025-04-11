"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Code, Globe } from "lucide-react"

interface CourseCardProps {
  course: {
    id: string | number
    title: string
    instructor: string
    progress?: number
    tags?: string[]
  }
}

export function CourseCard({ course }: CourseCardProps) {
  // Get the appropriate icon based on course tags
  const getIcon = () => {
    const tags = course.tags || []
    const tagsLower = tags.map((tag) => tag.toLowerCase())

    if (tagsLower.includes("python") || tagsLower.includes("programming")) {
      return <Code className="h-6 w-6 text-purple-500" />
    }

    if (tagsLower.includes("html") || tagsLower.includes("css") || tagsLower.includes("web")) {
      return <Globe className="h-6 w-6 text-orange-500" />
    }

    return <Code className="h-6 w-6 text-blue-500" />
  }

  return (
    <Link href={`/courses/${course.id}`}>
      <div className="rounded-lg border bg-card hover:shadow-md transition-shadow overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">{getIcon()}</div>
            <h3 className="font-semibold">{course.title}</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {course.progress !== undefined && (
            <div className="mt-auto">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1.5" />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
