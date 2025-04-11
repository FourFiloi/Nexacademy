"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Trophy, Medal, ChevronRight, Star, Award } from "lucide-react"
import { motion } from "framer-motion"

// Update the LeaderboardUser interface to include institution
interface LeaderboardUser {
  id: number
  name: string
  avatar: string
  level: {
    number: number
    title: string
  }
  tier?: string
  xp: number
  rank: number
  institution?: string
  badges: {
    name: string
    icon: string
  }[]
  coursesCompleted?: number
  problemsSolved?: number
  contestPoints?: number
  isCurrentUser: boolean
}

interface LeaderboardTableProps {
  data: LeaderboardUser[]
  showTier?: boolean
  showContestPoints?: boolean
}

export function LeaderboardTable({ data, showTier = false, showContestPoints = false }: LeaderboardTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white">
            <Trophy className="h-4 w-4" />
          </div>
        )
      case 2:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700">
            <Medal className="h-4 w-4" />
          </div>
        )
      case 3:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-white">
            <Medal className="h-4 w-4" />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
            <span className="text-sm font-medium">{rank}</span>
          </div>
        )
    }
  }

  const getTierBadge = (tier: string) => {
    const tierColors: Record<string, { bg: string; text: string; border: string }> = {
      Diamond: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300" },
      Platinum: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300" },
      Gold: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
      Silver: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" },
      Bronze: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
    }

    const colors = tierColors[tier] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" }

    return (
      <Badge variant="outline" className={`${colors.bg} ${colors.text} border ${colors.border}`}>
        {tier}
      </Badge>
    )
  }

  // Find the current user in the data
  const currentUser = data.find((user) => user.isCurrentUser)

  // Check if current user is not in the top 10
  const currentUserNotInTop = currentUser && !data.slice(0, 10).some((user) => user.isCurrentUser)

  const institutions = [{ id: "MIT", name: "MIT" }, { id: "Harvard", name: "Harvard" }]

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left text-sm font-medium">Rank</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Student</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Level</th>
              {showTier && <th className="px-4 py-3 text-left text-sm font-medium">Tier</th>}
              <th className="px-4 py-3 text-left text-sm font-medium">{showContestPoints ? "Contest Points" : "XP"}</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Badges</th>
              <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((user) => (
              <motion.tr
                key={user.id}
                className={`border-b transition-colors hover:bg-muted/30 ${
                  user.isCurrentUser ? "relative bg-primary/5 outline outline-1 outline-primary/20" : ""
                }`}
                onMouseEnter={() => setHoveredRow(user.id)}
                onMouseLeave={() => setHoveredRow(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <td className="px-4 py-3">{getRankIcon(user.rank)}</td>
                {/* Optionally, you can add the institution to the student information display in the table
                For example, in the student cell: */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {user.name}
                        {user.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {showContestPoints && user.problemsSolved
                          ? `${user.problemsSolved} problems solved`
                          : user.coursesCompleted
                            ? `${user.coursesCompleted} courses completed`
                            : ""}
                        {user.institution && institutions.find(i => i.id === user.institution) &&
                          ` • ${institutions.find(i => i.id === user.institution)?.name}`}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Level {user.level.number}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user.level.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                {showTier && user.tier && <td className="px-4 py-3">{getTierBadge(user.tier)}</td>}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {showContestPoints ? (
                      <>
                        <Award className="h-3.5 w-3.5 text-amber-500" />
                        <span className="font-medium">{user.contestPoints?.toLocaleString() || 0} pts</span>
                      </>
                    ) : (
                      <>
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{user.xp.toLocaleString()} XP</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex -space-x-1">
                    {user.badges.slice(0, 3).map((badge, index) => (
                      <TooltipProvider key={index}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-lg shadow-sm border border-border/50">
                              {badge.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{badge.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                    {user.badges.length > 3 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-medium shadow-sm border border-border/50">
                              +{user.badges.length - 3}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-1">
                              {user.badges.slice(3).map((badge, index) => (
                                <p key={index}>
                                  {badge.icon} {badge.name}
                                </p>
                              ))}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant={hoveredRow === user.id ? "default" : "outline"}
                    className="gap-1 transition-all duration-200"
                    asChild
                  >
                    <a href={`/profile/${user.id}`}>
                      <span>View Profile</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show current user if not in top 10 */}
      {currentUserNotInTop && currentUser && (
        <div className="mt-4">
          <div className="mb-2 text-sm font-medium text-primary">Your Ranking</div>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full">
              <tbody>
                <motion.tr
                  className="relative bg-primary/5 outline outline-1 outline-primary/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <td className="px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground">
                      <span className="text-sm font-medium">{currentUser.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>
                          {currentUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {currentUser.name}
                        <span className="ml-2 text-xs text-primary">(You)</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {showContestPoints && currentUser.problemsSolved
                          ? `${currentUser.problemsSolved} problems solved`
                          : currentUser.coursesCompleted
                            ? `${currentUser.coursesCompleted} courses completed`
                            : ""}
                        {currentUser.institution && institutions.find(i => i.id === currentUser.institution) &&
                          ` • ${institutions.find(i => i.id === currentUser.institution)?.name}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                            Level {currentUser.level.number}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{currentUser.level.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  {showTier && currentUser.tier && <td className="px-4 py-3">{getTierBadge(currentUser.tier)}</td>}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {showContestPoints ? (
                        <>
                          <Award className="h-3.5 w-3.5 text-amber-500" />
                          <span className="font-medium">{currentUser.contestPoints?.toLocaleString() || 0} pts</span>
                        </>
                      ) : (
                        <>
                          <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{currentUser.xp.toLocaleString()} XP</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex -space-x-1">
                      {currentUser.badges.slice(0, 3).map((badge, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-lg shadow-sm border border-border/50">
                                {badge.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{badge.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                      {currentUser.badges.length > 3 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-medium shadow-sm border border-border/50">
                                +{currentUser.badges.length - 3}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-1">
                                {currentUser.badges.slice(3).map((badge, index) => (
                                  <p key={index}>
                                    {badge.icon} {badge.name}
                                  </p>
                                ))}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline" className="gap-1" asChild>
                      <a href="/profile">
                        <span>View Profile</span>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </td>
                </motion.tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
