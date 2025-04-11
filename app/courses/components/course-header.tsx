"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Bookmark, BookmarkCheck, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Course } from "@/data/courses"
import { getCourseTheme } from "@/lib/course-icons"

interface CourseHeaderProps {
  course: Course
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const theme = getCourseTheme(course.title, [])
  const Icon = theme.icon

  return (
    <div className="mb-8 bg-card rounded-xl overflow-hidden border border-border">
      <div className="relative h-32 md:h-48 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Icon className="h-64 w-64 text-primary" />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-card to-transparent pt-16">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
                <Badge variant="outline" className="ml-2 border-primary/20 bg-primary/10 text-primary">
                  {course.level}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 max-w-2xl">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              {course.modules.length} Modules
            </Badge>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              {course.totalXP} XP Available
            </Badge>
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              Estimated 12 hours
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="rounded-full"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isBookmarked ? "Remove bookmark" : "Bookmark course"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share course</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Course Progress</span>
              <span className="font-medium">
                {course.xpEarned} / {course.totalXP} XP ({course.progress}%)
              </span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-lg px-4 py-2 min-w-[100px]">
              <span className="text-2xl font-bold text-primary">{course.xpEarned}</span>
              <span className="text-xs text-muted-foreground">XP Earned</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-lg px-4 py-2 min-w-[100px]">
              <span className="text-2xl font-bold text-primary">
                {Math.floor((course.xpEarned / course.totalXP) * 10)}
              </span>
              <span className="text-xs text-muted-foreground">Current Level</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
