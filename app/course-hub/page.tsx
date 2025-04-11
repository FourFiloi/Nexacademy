"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Star, Users, Clock, ShoppingCart, BookOpen, Tag } from "lucide-react"
import { FeaturedCourseCard } from "../courses/components/featured-course-card"

// Mock data for available courses
const availableCourses = [
  {
    id: "data-science",
    title: "Data Science Bootcamp",
    description:
      "Comprehensive data science program covering Python, statistics, machine learning, and data visualization",
    instructor: "Dr. Sarah Johnson",
    price: 99.99,
    originalPrice: 199.99,
    rating: 4.9,
    ratingCount: 4567,
    students: 23456,
    duration: "12 weeks",
    level: "Intermediate",
    tags: ["data science", "python", "machine learning"],
    featured: true,
  },
  {
    id: "javascript-mastery",
    title: "JavaScript Mastery",
    description: "Master modern JavaScript from fundamentals to advanced concepts like async/await and ES6+ features",
    instructor: "Michael Chen",
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.8,
    ratingCount: 3254,
    students: 18923,
    duration: "10 weeks",
    level: "All Levels",
    tags: ["javascript", "web development", "programming"],
    featured: true,
  },
  {
    id: "react-essentials",
    title: "React Essentials",
    description: "Start building modern web applications with React",
    instructor: "David Kim",
    price: 69.99,
    originalPrice: 129.99,
    rating: 4.8,
    ratingCount: 3211,
    students: 15432,
    duration: "8 weeks",
    level: "Beginner",
    tags: ["react", "javascript", "web development"],
    featured: false,
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and techniques",
    instructor: "Dr. James Wilson",
    price: 89.99,
    originalPrice: 169.99,
    rating: 4.7,
    ratingCount: 2134,
    students: 12567,
    duration: "10 weeks",
    level: "Intermediate",
    tags: ["machine learning", "python", "data science"],
    featured: false,
  },
  {
    id: "advanced-data-structures",
    title: "Advanced Data Structures",
    description: "Deep dive into complex data structures and algorithms",
    instructor: "Dr. Lisa Chen",
    price: 79.99,
    originalPrice: 159.99,
    rating: 4.9,
    ratingCount: 1543,
    students: 8765,
    duration: "10 weeks",
    level: "Advanced",
    tags: ["algorithms", "data structures", "computer science"],
    featured: false,
  },
  {
    id: "python-for-data-analysis",
    title: "Python for Data Analysis",
    description: "Learn how to use Python for data analysis with pandas, NumPy, and Matplotlib",
    instructor: "Dr. Alex Johnson",
    price: 69.99,
    originalPrice: 139.99,
    rating: 4.8,
    ratingCount: 2876,
    students: 14532,
    duration: "8 weeks",
    level: "Intermediate",
    tags: ["python", "data analysis", "pandas"],
    featured: false,
  },
]

// Get featured course
const featuredCourse = availableCourses.find((course) => course.featured && course.id === "data-science")

export default function CourseHubPage() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [filteredCourses, setFilteredCourses] = useState(availableCourses)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter courses based on search query, active tab, and filters
  useEffect(() => {
    let filtered = availableCourses

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((course) => course.tags.some((tag) => tag.toLowerCase() === activeTab.toLowerCase()))
    }

    // Apply price filter
    if (priceFilter === "under-50") {
      filtered = filtered.filter((course) => course.price < 50)
    } else if (priceFilter === "50-100") {
      filtered = filtered.filter((course) => course.price >= 50 && course.price <= 100)
    } else if (priceFilter === "over-100") {
      filtered = filtered.filter((course) => course.price > 100)
    }

    // Apply level filter
    if (levelFilter !== "all") {
      filtered = filtered.filter((course) => course.level.toLowerCase() === levelFilter.toLowerCase())
    }

    setFilteredCourses(filtered)
  }, [searchQuery, activeTab, priceFilter, levelFilter])

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-full md:w-64" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Featured Course */}
      {featuredCourse && (
        <FeaturedCourseCard
          title={featuredCourse.title}
          description={featuredCourse.description}
          instructor={featuredCourse.instructor}
          rating={featuredCourse.rating}
          ratingCount={featuredCourse.ratingCount}
          students={featuredCourse.students}
          duration={featuredCourse.duration}
          topics={24}
          videos={65}
        />
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Hub</h1>
          <p className="text-muted-foreground">Discover and enroll in new courses</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-9 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-0 bg-transparent p-0 h-auto overflow-x-auto flex-nowrap">
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
              value="data science"
              className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Data Science
            </TabsTrigger>
            <TabsTrigger
              value="web development"
              className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Web Development
            </TabsTrigger>
            <TabsTrigger
              value="machine learning"
              className="rounded-full px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Machine Learning
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-50">Under $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="over-100">Over $100</SelectItem>
          </SelectContent>
        </Select>

        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    {course.originalPrice > course.price && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Sale
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground">({course.ratingCount})</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold">${course.price}</span>
                      {course.originalPrice > course.price && (
                        <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t p-4 bg-muted/30 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    <Tag className="h-4 w-4 inline mr-1" />
                    {course.tags[0]}
                  </span>
                  <Button size="sm" className="gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground max-w-md">Try adjusting your search or filters to find courses.</p>
          </div>
        )}
      </div>
    </div>
  )
}
