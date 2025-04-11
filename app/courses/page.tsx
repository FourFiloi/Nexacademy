"use client"

import { useState, useEffect } from "react"
import { FeaturedCourseCard } from "./components/featured-course-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CourseCard } from "./components/course-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter } from "lucide-react"

// Mock data for courses
const featuredCourses = [
  {
    id: "1",
    title: "Data Science Bootcamp",
    description:
      "Comprehensive data science program covering Python, statistics, machine learning, and data visualization.",
    instructor: "Dr. Sarah Johnson",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 23456,
    rating: 4.9,
    ratingCount: 4567,
    progress: 0,
    tags: ["python", "data science", "machine learning"],
  },
  {
    id: "2",
    title: "JavaScript Mastery",
    description: "Master modern JavaScript from fundamentals to advanced concepts like async/await and ES6+ features.",
    instructor: "Michael Chen",
    level: "All Levels",
    duration: "10 weeks",
    enrolled: 18923,
    rating: 4.8,
    ratingCount: 3254,
    progress: 0,
    tags: ["javascript", "web development", "programming"],
  },
]

const continueLearningCourses = [
  {
    id: "python-basics",
    title: "Python Basics",
    description: "Learn the fundamentals of Python programming language",
    instructor: "Dr. Alex Johnson",
    earnedXP: 450,
    totalXP: 1500,
    progress: 30,
    tags: ["python", "programming", "basics"],
  },
  {
    id: "web-dev",
    title: "Web Development Fundamentals",
    description: "Learn HTML, CSS, and JavaScript basics",
    instructor: "Emily Rodriguez",
    earnedXP: 750,
    totalXP: 1200,
    progress: 62,
    tags: ["html", "css", "javascript"],
  },
]

const popularCourses = [
  {
    id: "3",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and techniques",
    instructor: "Dr. James Wilson",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: 12567,
    rating: 4.7,
    ratingCount: 2134,
    progress: 0,
    tags: ["machine learning", "python", "data science"],
  },
  {
    id: "4",
    title: "React for Beginners",
    description: "Start building modern web applications with React",
    instructor: "David Kim",
    level: "Beginner",
    duration: "6 weeks",
    enrolled: 15432,
    rating: 4.8,
    ratingCount: 3211,
    progress: 0,
    tags: ["react", "javascript", "web development"],
  },
  {
    id: "5",
    title: "Advanced Data Structures",
    description: "Deep dive into complex data structures and algorithms",
    instructor: "Dr. Lisa Chen",
    level: "Advanced",
    duration: "10 weeks",
    enrolled: 8765,
    rating: 4.9,
    ratingCount: 1543,
    progress: 0,
    tags: ["algorithms", "data structures", "computer science"],
  },
]

export default function CoursesPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-64 w-full rounded-xl" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-lg" />
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Featured Course */}
      <FeaturedCourseCard
        title="Data Science Bootcamp"
        description="Comprehensive data science program covering Python, statistics, machine learning, and data visualization."
        instructor="Dr. Sarah Johnson"
        rating={4.9}
        ratingCount={4567}
        students={23456}
        duration="12 weeks"
        topics={24}
        videos={65}
      />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Course Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start mb-6 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="all"
            className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Courses
          </TabsTrigger>
          <TabsTrigger
            value="programming"
            className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Programming
          </TabsTrigger>
          <TabsTrigger
            value="data-science"
            className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Data Science
          </TabsTrigger>
          <TabsTrigger
            value="web-dev"
            className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Web Development
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Mobile Dev
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {/* Continue Learning Section */}
          {continueLearningCourses.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {continueLearningCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Popular Courses Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Other tabs content would go here */}
        <TabsContent value="programming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...continueLearningCourses, ...popularCourses]
              .filter((course) => course.tags?.includes("programming") || course.tags?.includes("python"))
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="data-science">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...continueLearningCourses, ...popularCourses]
              .filter((course) => course.tags?.includes("data science") || course.tags?.includes("machine learning"))
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="web-dev">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...continueLearningCourses, ...popularCourses]
              .filter(
                (course) =>
                  course.tags?.includes("web development") ||
                  course.tags?.includes("html") ||
                  course.tags?.includes("javascript") ||
                  course.tags?.includes("react"),
              )
              .map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="mobile">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No Mobile Development Courses Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on adding mobile development courses to our catalog. Check back soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
