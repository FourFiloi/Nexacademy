"use client"

import { useEffect, useState } from "react"
import { CourseHeader } from "../components/course-header"
import { CourseTabs } from "../components/course-tabs"
import { ModuleList } from "../components/module-list"
import { CourseSidebar } from "../components/course-sidebar"
import { pythonBasicsCourse } from "@/data/courses"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState(pythonBasicsCourse)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <div className="flex gap-2">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-8 w-20" />
                  ))}
              </div>
            </div>
            <div className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
            </div>
          </div>
          <Skeleton className="h-96 w-full lg:w-80" />
        </div>
      </div>
    )
  }

  return (
    <>
      <CourseHeader course={course} />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1">
          <CourseTabs>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Course Modules</h2>
              <ModuleList modules={course.modules} courseId={params.courseId} />
            </div>
          </CourseTabs>
        </div>

        <CourseSidebar
          className="w-full lg:w-80 lg:flex-shrink-0"
          xpEarned={course.xpEarned}
          totalXP={course.totalXP}
          level={Math.floor((course.xpEarned / course.totalXP) * 10)}
          streak={7}
        />
      </div>
    </>
  )
}
