"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Flame,
  BookOpen,
  Target,
  Calendar,
  CheckCircle,
  ArrowRight,
  Award,
  CloudLightningIcon as Lightning,
  Zap,
  Flag,
  Check,
  Clock,
  Users,
} from "lucide-react"
import { ProfileLevelCard } from "@/components/profile-level-card"
import Link from "next/link"
import { FaListUl, FaStar, FaRegStar } from "react-icons/fa"
import { MdSlowMotionVideo } from "react-icons/md"
import { SiPython, SiJavascript, SiReact } from "react-icons/si"
import { useMobile } from "@/hooks/use-mobile"
import { LearningAnalyticsGraph } from "@/components/learning-analytics-graph"
import { DailyTasks } from "@/components/daily-tasks"

// Create a context to track sidebar state
export const SidebarContext = {
  Consumer: ({ children }) => {
    // Get the sidebar collapsed state from localStorage on client side
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    useEffect(() => {
      // Check localStorage for sidebar state
      const storedState = localStorage.getItem("sidebarCollapsed")
      if (storedState !== null) {
        setSidebarCollapsed(storedState === "true")
      }

      // Set up event listener for sidebar state changes
      const handleStorageChange = () => {
        const currentState = localStorage.getItem("sidebarCollapsed")
        setSidebarCollapsed(currentState === "true")
      }

      // Listen for custom event for sidebar toggle
      window.addEventListener("sidebarStateChange", handleStorageChange)

      return () => {
        window.removeEventListener("sidebarStateChange", handleStorageChange)
      }
    }, [])

    return children(sidebarCollapsed)
  },
}

// Define userData directly in the dashboard component to avoid import issues
const userData = {
  name: "Ashwin",
  avatar: "/images/avatar.jpeg",
  level: 4,
  levelTitle: "Syntax Samurai",
  tier: "Platinum Tier",
  tierEmoji: "💠",
  currentXP: 4595,
  nextLevelXP: 5000,
  streak: 3,
  achievements: 7,
  daysActive: 42,
}

// Updated course data to match the My Learning page style
const courses = [
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Learn the core concepts of JavaScript with practical examples and interactive exercises",
    instructor: "Alex Johnson",
    earnedXP: 750,
    totalXP: 1000,
    progress: 75,
    lastAccessed: "2 days ago",
    tags: ["javascript", "web development", "programming"],
    certificate: false,
    level: "Beginner",
    icon: SiJavascript,
    bannerColor: "rgb(255, 240, 200)",
    topics: 8,
    videos: 16,
    rating: 4.7,
    enrolledCount: 1800,
    isLiked: true,
    url: "/my-learning/javascript-fundamentals",
  },
  {
    id: "react-essentials",
    title: "React Essentials",
    description: "Master React.js through hands-on projects and component-based architecture",
    instructor: "Sarah Miller",
    earnedXP: 450,
    totalXP: 1000,
    progress: 45,
    lastAccessed: "Yesterday",
    tags: ["react", "javascript", "frontend"],
    certificate: false,
    level: "Intermediate",
    icon: SiReact,
    bannerColor: "rgb(220, 242, 250)",
    topics: 10,
    videos: 22,
    rating: 4.8,
    enrolledCount: 2200,
    isLiked: false,
    url: "/my-learning/react-essentials",
  },
  {
    id: "python-basics",
    title: "Python Basics",
    description: "Learn the fundamentals of Python programming language with hands-on projects and exercises",
    instructor: "Michael Chen",
    earnedXP: 900,
    totalXP: 1000,
    progress: 90,
    lastAccessed: "Today",
    tags: ["python", "programming", "basics"],
    certificate: false,
    level: "Beginner",
    icon: SiPython,
    bannerColor: "rgb(230, 250, 230)",
    topics: 12,
    videos: 24,
    rating: 4.9,
    enrolledCount: 3500,
    isLiked: true,
    url: "/my-learning/python-basics",
  },
]

// Rating renderer function
const renderRating = (rating: number) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const stars = []

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" size={14} />)
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStar key={i} className="text-yellow-400" size={14} />)
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" size={14} />)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  )
}

// Utility function to format numbers
const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

// Daily quests/goals data
const dailyQuests = [
  { id: 1, title: "Complete JavaScript Module 7", xp: 50, completed: true },
  { id: 2, title: "Solve 3 Python challenges", xp: 75, completed: false },
  { id: 3, title: "Watch React Component tutorial", xp: 30, completed: false },
  { id: 4, title: "Submit weekly assignment", xp: 100, completed: false },
  { id: 5, title: "Help in community forum", xp: 25, completed: true },
]

// Upcoming events/deadlines
const upcomingEvents = [
  {
    id: 1,
    title: "Data Structures Quiz",
    date: "Apr 12",
    time: "3:00 PM",
    type: "quiz",
    course: "JavaScript Fundamentals",
  },
  {
    id: 2,
    title: "Live Coding Session",
    date: "Apr 15",
    time: "2:00 PM",
    type: "live",
    course: "Python Basics",
  },
  {
    id: 3,
    title: "Code Project Deadline",
    date: "Apr 18",
    time: "11:59 PM",
    type: "deadline",
    course: "React Essentials",
  },
]

// Achievements data
const achievements = [
  { id: 1, title: "Fast Learner", description: "Complete 3 lessons in a day", progress: 100, icon: "🚀" },
  { id: 2, title: "Code Streak", description: "Learn for 7 consecutive days", progress: 43, icon: "🔥" },
  { id: 3, title: "Quiz Master", description: "Get perfect score on 3 quizzes", progress: 67, icon: "🧠" },
]

// Weekly streak data
const weeklyStreak = [
  { day: "Su", completed: true },
  { day: "M", completed: true },
  { day: "Tu", completed: true },
  { day: "W", completed: true },
  { day: "Th", completed: true },
  { day: "F", completed: false },
  { day: "Sa", completed: false },
]

// Activity data
const activityFeed = [
  {
    id: 1,
    title: "Completed Python Chapter 11",
    time: "Today, 9:25 AM",
    xp: 75,
    type: "chapter",
    icon: <CheckCircle className="text-green-500" />,
  },
  {
    id: 2,
    title: "Earned 'Fast Learner' Badge",
    time: "Yesterday, 4:15 PM",
    type: "badge",
    icon: <Award className="text-amber-500" />,
  },
  {
    id: 3,
    title: "Reached Level 4: Syntax Samurai",
    time: "Yesterday, 2:30 PM",
    xp: 0,
    type: "level",
    icon: <Trophy className="text-primary" />,
  },
  {
    id: 4,
    title: "Answered Forum Question",
    time: "Apr 5, 11:20 AM",
    xp: 25,
    type: "forum",
    icon: <Lightning className="text-blue-500" />,
  },
]

// Component for daily quest items
const QuestItem = ({ quest }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-card border hover:shadow-md transition-shadow w-full">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={`p-1 rounded-md ${quest.completed ? "bg-green-500/20" : "bg-blue-500/20"}`}>
          {quest.completed ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Target className="h-5 w-5 text-blue-500" />
          )}
        </div>
        <span className={`text-sm font-medium truncate ${quest.completed ? "line-through text-muted-foreground" : ""}`}>
          {quest.title}
        </span>
      </div>
      <div className="ml-3 flex-shrink-0">
        <Badge variant="outline" className="bg-primary/10 text-primary min-w-[70px] flex items-center justify-center">
          +{quest.xp} XP
        </Badge>
      </div>
    </div>
  )
}

// New Course Card component based on My Learning page
const CourseCard = ({ course }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all h-full">
      <CardContent className="p-0 flex flex-col h-full justify-between">
        <div className="p-6 h-full" style={{ backgroundColor: course.bannerColor }}>
          <div className="flex flex-row items-center justify-between">
            <div className="bg-white dark:bg-[#121212] inline-block px-4 py-0.5 text-xs font-medium rounded-full text-gray-800 dark:text-white">
              {course.level}
            </div>
            <div className="w-10 h-10 bg-white dark:bg-[#121212] rounded-lg flex justify-center items-center text-gray-800 dark:text-white">
              {course.icon && <course.icon size={25} />}
            </div>
          </div>

          {/* Title */}
          <div className="text-xl font-bold mt-2.5 pl-1.5 leading-[30px] text-gray-800">{course.title}</div>

          {/* Stats Section */}
          <div className="flex flex-row items-center gap-1 pl-1.5 pt-1.5">
            <div className="text-[11px] text-gray-600 flex flex-row items-center justify-center gap-0.5">
              <FaListUl size={14} />
              <span>{course.topics} Topics</span>
            </div>
            <span className="text-gray-400 text-sm font-medium">|</span>
            <div className="text-[11px] text-gray-600 flex flex-row items-center justify-center gap-0.5">
              <MdSlowMotionVideo size={15} />
              <span>{course.videos} Videos</span>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-2 pl-1.5">{renderRating(course.rating)}</div>

          {/* Description */}
          <div className="mt-2 text-[13px] pl-1.5 text-gray-600 line-clamp-2">{course.description}</div>
        </div>

        <div className="bg-white dark:bg-[#121212] p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-black dark:text-white">Progress</div>
            <div className="text-sm font-medium text-black dark:text-white">{course.progress}%</div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>

          <div className="flex justify-between items-center">
            {/* Enrolled count */}
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 z-10">
              <Users className="h-4 w-4 mr-1" />
              <span>{formatNumber(course.enrolledCount)}</span>
            </div>

            <Link href={course.url}>
              <div className="px-5 py-2 bg-black text-white dark:bg-transparent dark:border dark:border-white dark:text-white rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-white dark:hover:text-black transition-colors">
                Continue
              </div>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Dashboard component
export function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [quests, setQuests] = useState(dailyQuests)
  const isMobile = useMobile()

  // Calculate quest completion stats
  const completedQuests = quests.filter((q) => q.completed).length
  const totalXpEarned = quests.filter((q) => q.completed).reduce((sum, q) => sum + q.xp, 0)
  const totalXpAvailable = quests.reduce((sum, q) => sum + q.xp, 0)

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Hero welcome section */}
      <motion.div
        className="p-6 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 flex flex-col md:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="/images/avatar.jpeg" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary text-xs text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {userData.level}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, Ashwin!</h1>
              <p className="text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-full shadow-sm">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Level {userData.level}: {userData.levelTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-full shadow-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">{userData.streak}-day streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-full shadow-sm">
            <Zap className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium">{userData.currentXP.toLocaleString()} XP</span>
          </div>
        </div>
      </motion.div>

      {/* Main dashboard layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - responsive, with maximum width constraint */}
        <div className="flex-1 space-y-6 md:max-w-[calc(100%-350px-1.5rem)]">
          {/* Course progress section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Courses</h2>
              <Button variant="outline" size="sm" className="gap-1">
                <BookOpen className="h-4 w-4" />
                View All
              </Button>
            </div>

            <SidebarContext.Consumer>
              {(sidebarCollapsed) => (
                <div
                  className={`grid grid-cols-1 ${
                    sidebarCollapsed ? "md:grid-cols-2 xl:grid-cols-3" : "xl:grid-cols-2"
                  } gap-4`}
                >
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
            </SidebarContext.Consumer>
          </div>

          {/* Activity/Achievements and Daily Tasks side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tabs for activity and achievements - with equal height */}
            <Card className="flex flex-col h-full">
              <Tabs defaultValue="activity" className="w-full flex flex-col flex-1">
                <CardHeader className="pb-0 pt-4 px-4">
                  <TabsList className="w-full justify-start bg-transparent p-0">
                    <TabsTrigger
                      value="activity"
                      className="rounded-t-lg rounded-b-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="achievements"
                      className="rounded-t-lg rounded-b-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-2"
                    >
                      Achievements
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="pt-4 flex-1 flex flex-col">
                  <TabsContent value="activity" className="space-y-4 m-0 flex-1 flex flex-col">
                    <div className="flex-1">
                      {activityFeed.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="bg-secondary p-2 rounded-full">{activity.icon}</div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="font-medium">{activity.title}</p>
                              {activity.xp > 0 && (
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                  +{activity.xp} XP
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-1 mt-auto">
                      View All Activity <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TabsContent>

                  <TabsContent value="achievements" className="m-0 flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          className="border rounded-lg p-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="bg-secondary p-3 rounded-full h-12 w-12 flex items-center justify-center text-2xl">
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium">{achievement.title}</h4>
                                <span className="text-sm font-semibold">{achievement.progress}%</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <Progress value={achievement.progress} className="h-2 mt-2" />
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-1 mt-4">
                      View All Achievements <Trophy className="h-4 w-4" />
                    </Button>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* Daily To-Do List - with equal height */}
            <div className="h-full">
              <DailyTasks />
            </div>
          </div>

          {/* Learning Analytics Graph */}
          <LearningAnalyticsGraph />
        </div>

        {/* Right column - fixed width on desktop, full width on mobile */}
        <div className="w-full md:w-[350px] flex-shrink-0 space-y-6">
          {/* Profile Level Card */}
          <ProfileLevelCard userData={userData} className="w-full" />

          {/* Daily Streak Card */}
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Daily Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-2">
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3D2A15] mb-2">
                    <Flame className="h-8 w-8 text-orange-500" />
                  </div>
                  <div className="text-2xl font-bold">3 Days</div>
                  <p className="text-xs text-muted-foreground mt-1">Highest streak: 7 days</p>
                </div>
              </div>

              {/* Weekly Streak Visualization */}
              <div className="mt-4 mb-2 bg-muted rounded-lg p-3">
                <div className="flex justify-between px-1 mb-1.5">
                  {["Su", "M", "Tu", "W", "Th", "F", "Sa"].map((day, index) => (
                    <div key={index} className="text-xs font-medium text-muted-foreground w-6 text-center">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  {weeklyStreak.map((day, index) => (
                    <div
                      key={index}
                      className={`relative flex h-6 w-6 items-center justify-center rounded-full 
        ${day.completed ? "bg-orange-500" : "bg-secondary border border-border"}`}
                    >
                      {day.completed && <Check className="h-3 w-3 text-white stroke-[3]" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">Keep your streak going!</p>
              </div>
            </CardContent>
          </Card>

          {/* Daily Quests Card - Moved to right column */}
          <Card className="w-full">
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <Flag className="h-5 w-5 text-green-500 mr-2" />
                  <CardTitle className="text-lg">Daily Quests</CardTitle>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {completedQuests}/{quests.length} completed
                  </span>
                  <Badge className="bg-primary/10 text-primary min-w-[90px] flex items-center justify-center">
                    +{totalXpEarned}/{totalXpAvailable} XP
                  </Badge>
                </div>
                <Progress value={(completedQuests / quests.length) * 100} className="h-2 mt-1" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {quests
                .slice()
                .sort((a, b) => {
                  // Sort by completion status (incomplete first)
                  if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1
                  }
                  // If same completion status, sort by XP (higher XP first)
                  return b.xp - a.xp
                })
                .map((quest) => (
                  <QuestItem key={quest.id} quest={quest} />
                ))}
            </CardContent>
          </Card>

          {/* About the player section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">About the player</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-lg font-bold">8</span>
                  <span className="text-xs text-muted-foreground">Courses Enrolled</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <Trophy className="h-5 w-5 text-amber-500 mb-1" />
                  <span className="text-lg font-bold">7</span>
                  <span className="text-xs text-muted-foreground">Achievements</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <Target className="h-5 w-5 text-green-500 mb-1" />
                  <span className="text-lg font-bold">42</span>
                  <span className="text-xs text-muted-foreground">Problems Solved</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-purple-500 mb-1" />
                  <span className="text-lg font-bold">42</span>
                  <span className="text-xs text-muted-foreground">Days Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-violet-500" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex-shrink-0 bg-primary/10 text-primary h-12 w-12 rounded-lg flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold">{event.date.split(" ")[0]}</span>
                    <span className="text-sm font-bold">{event.date.split(" ")[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.time} • {event.course}
                    </p>
                    <Badge
                      variant="outline"
                      className={`mt-1 text-xs ${
                        event.type === "quiz"
                          ? "bg-blue-500/10 text-blue-500"
                          : event.type === "live"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {event.type === "quiz" ? "Quiz" : event.type === "live" ? "Live Session" : "Deadline"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
