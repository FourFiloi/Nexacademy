"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Flame, BookOpen, Calendar, Trophy, ArrowRight, CheckCircle } from "lucide-react"
import Image from "next/image"

interface WelcomeModalProps {
  userName: string
  avatarUrl?: string
  streak?: number
  xpSinceLastLogin?: number
  coinsSinceLastLogin?: number
  currentCourse?: {
    title: string
    progress: number
  }
  tasks?: {
    id: number
    title: string
    type: "course" | "assignment" | "live" | "challenge"
    time?: string
    completed?: boolean
  }[]
}

export function WelcomeModal({
  userName = "Ashwin",
  avatarUrl = "/images/avatar.jpeg",
  streak = 3,
  xpSinceLastLogin = 150,
  coinsSinceLastLogin = 75,
  currentCourse = {
    title: "Python Basics",
    progress: 45,
  },
  tasks = [
    {
      id: 1,
      title: "Continue Python Basics course",
      type: "course",
      time: "20 min left in module",
    },
    {
      id: 2,
      title: "Complete Data Structures Quiz",
      type: "assignment",
      time: "Due today",
    },
    {
      id: 3,
      title: "Join Live Class: Intro to APIs",
      type: "live",
      time: "Today, 3:00 PM",
    },
    {
      id: 4,
      title: "Daily Coding Challenge",
      type: "challenge",
      completed: false,
    },
  ],
}: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Check if this is the first visit after login
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome")
    if (!hasSeenWelcome) {
      setIsOpen(true)
      sessionStorage.setItem("hasSeenWelcome", "true")
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4 text-blue-400" />
      case "assignment":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "live":
        return <Calendar className="h-4 w-4 text-purple-400" />
      case "challenge":
        return <Trophy className="h-4 w-4 text-yellow-400" />
      default:
        return <ArrowRight className="h-4 w-4" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md border-none bg-[#1A1A1A] p-0 shadow-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-lg"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2C2C2C] opacity-50" />

              {/* Decorative elements */}
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

              <div className="relative p-6">
                {/* Header with avatar */}
                <div className="mb-6 flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary/20">
                    <AvatarImage src={avatarUrl} alt={userName} />
                    <AvatarFallback className="text-xl">{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Welcome back, {userName}!</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="gap-1 bg-orange-500/10 text-orange-400 border-orange-500/20">
                        <Flame className="h-3 w-3" /> {streak}-day streak
                      </Badge>
                      <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20">
                        <Image src="/icons/coin-icon.svg" alt="XP" width={12} height={12} className="h-3 w-3" /> +
                        {xpSinceLastLogin} XP
                      </Badge>
                      <Badge variant="outline" className="gap-1 bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                        <Image src="/icons/xp-icon.svg" alt="Coins" width={12} height={12} className="h-3 w-3" /> +
                        {coinsSinceLastLogin} Coins
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Current course */}
                <div className="mb-6 rounded-lg bg-[#252525] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium text-white">Continue Learning</h3>
                    <span className="text-sm text-primary">{currentCourse.progress}% complete</span>
                  </div>
                  <p className="mb-2 text-sm text-gray-300">{currentCourse.title}</p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#333333]">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${currentCourse.progress}%` }} />
                  </div>
                </div>

                {/* Today's tasks */}
                <div className="mb-6">
                  <h3 className="mb-3 font-medium text-white">Today's Tasks</h3>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 rounded-lg bg-[#252525] p-3 transition-colors hover:bg-[#2A2A2A]"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#333333]">
                          {getTaskIcon(task.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{task.title}</p>
                          {task.time && <p className="text-xs text-gray-400">{task.time}</p>}
                        </div>
                        {task.completed !== undefined && (
                          <div className={`h-2 w-2 rounded-full ${task.completed ? "bg-green-500" : "bg-gray-500"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action button */}
                <Button onClick={handleClose} className="w-full gap-2 bg-primary hover:bg-primary/90">
                  Let's Go! <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
