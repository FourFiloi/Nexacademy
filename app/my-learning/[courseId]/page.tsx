"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CourseHeader } from "../../courses/components/course-header"
import { CourseTabs } from "../../courses/components/course-tabs"
import { ModuleList } from "../../courses/components/module-list"
import { CourseSidebar } from "../../courses/components/course-sidebar"
import { pythonBasicsCourse } from "@/data/courses"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function MyLearningCoursePage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState(pythonBasicsCourse)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    router.push("/my-learning")
  }

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
      <div className="mb-6">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to My Learning
        </Button>
      </div>

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
