"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { Search, Trophy, Users, Award, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Mock data for overall leaderboard
export const overallLeaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 7,
      title: "Algorithm Ace",
    },
    tier: "Diamond",
    xp: 5250,
    rank: 1,
    institution: "mit",
    badges: [
      { name: "Python Master", icon: "🐍" },
      { name: "100 Day Streak", icon: "🔥" },
      { name: "Top Contributor", icon: "⭐" },
    ],
    coursesCompleted: 8,
    isCurrentUser: false,
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 6,
      title: "Code Virtuoso",
    },
    tier: "Platinum",
    xp: 4980,
    rank: 2,
    institution: "stanford",
    badges: [
      { name: "JavaScript Guru", icon: "🌟" },
      { name: "Bug Hunter", icon: "🐛" },
    ],
    coursesCompleted: 7,
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Syntax Samurai",
    },
    tier: "Gold",
    xp: 2450,
    rank: 3,
    institution: "harvard",
    badges: [
      { name: "Early Bird", icon: "🌅" },
      { name: "Code Ninja", icon: "🥷" },
    ],
    coursesCompleted: 3,
    isCurrentUser: true,
  },
  {
    id: 4,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 5,
      title: "Data Dynamo",
    },
    tier: "Gold",
    xp: 3100,
    rank: 4,
    institution: "berkeley",
    badges: [
      { name: "Python Master", icon: "🐍" },
      { name: "Fast Learner", icon: "⚡" },
    ],
    coursesCompleted: 5,
    isCurrentUser: false,
  },
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 5,
      title: "Frontend Wizard",
    },
    tier: "Gold",
    xp: 2950,
    rank: 5,
    institution: "cmu",
    badges: [
      { name: "CSS Master", icon: "✨" },
      { name: "UI Expert", icon: "🎨" },
    ],
    coursesCompleted: 4,
    isCurrentUser: false,
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Backend Builder",
    },
    tier: "Silver",
    xp: 2300,
    rank: 6,
    institution: "mit",
    badges: [
      { name: "Database Guru", icon: "💾" },
      { name: "API Architect", icon: "🔌" },
    ],
    coursesCompleted: 3,
    isCurrentUser: false,
  },
  {
    id: 7,
    name: "Olivia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Testing Titan",
    },
    tier: "Silver",
    xp: 2100,
    rank: 7,
    institution: "stanford",
    badges: [
      { name: "Bug Hunter", icon: "🐛" },
      { name: "Quality Guardian", icon: "🛡️" },
    ],
    coursesCompleted: 3,
    isCurrentUser: false,
  },
  {
    id: 8,
    name: "Ethan Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "Mobile Maestro",
    },
    tier: "Silver",
    xp: 1950,
    rank: 8,
    institution: "harvard",
    badges: [
      { name: "App Developer", icon: "📱" },
      { name: "UI Designer", icon: "🎨" },
    ],
    coursesCompleted: 2,
    isCurrentUser: false,
  },
  {
    id: 9,
    name: "Sophia Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "DevOps Dynamo",
    },
    tier: "Bronze",
    xp: 1800,
    rank: 9,
    institution: "berkeley",
    badges: [
      { name: "Cloud Expert", icon: "☁️" },
      { name: "CI/CD Master", icon: "🔄" },
    ],
    coursesCompleted: 2,
    isCurrentUser: false,
  },
  {
    id: 10,
    name: "Noah Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "Security Sentinel",
    },
    tier: "Bronze",
    xp: 1750,
    rank: 10,
    institution: "cmu",
    badges: [
      { name: "Ethical Hacker", icon: "🔒" },
      { name: "Firewall Guardian", icon: "🛡️" },
    ],
    coursesCompleted: 2,
    isCurrentUser: false,
  },
]

// Mock data for contest leaderboard
export const contestLeaderboardData = [
  {
    id: 5,
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 5,
      title: "Frontend Wizard",
    },
    tier: "Gold",
    xp: 850,
    rank: 1,
    institution: "cmu",
    badges: [
      { name: "CSS Master", icon: "✨" },
      { name: "UI Expert", icon: "🎨" },
    ],
    problemsSolved: 12,
    contestPoints: 450,
    isCurrentUser: false,
  },
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 7,
      title: "Algorithm Ace",
    },
    tier: "Diamond",
    xp: 780,
    rank: 2,
    institution: "mit",
    badges: [
      { name: "Python Master", icon: "🐍" },
      { name: "100 Day Streak", icon: "🔥" },
      { name: "Top Contributor", icon: "⭐" },
    ],
    problemsSolved: 10,
    contestPoints: 420,
    isCurrentUser: false,
  },
  {
    id: 4,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 5,
      title: "Data Dynamo",
    },
    tier: "Gold",
    xp: 720,
    rank: 3,
    institution: "berkeley",
    badges: [
      { name: "Python Master", icon: "🐍" },
      { name: "Fast Learner", icon: "⚡" },
    ],
    problemsSolved: 9,
    contestPoints: 380,
    isCurrentUser: false,
  },
  {
    id: 3,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Syntax Samurai",
    },
    tier: "Gold",
    xp: 650,
    rank: 4,
    institution: "harvard",
    badges: [
      { name: "Early Bird", icon: "🌅" },
      { name: "Code Ninja", icon: "🥷" },
    ],
    problemsSolved: 8,
    contestPoints: 320,
    isCurrentUser: true,
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 6,
      title: "Code Virtuoso",
    },
    tier: "Platinum",
    xp: 620,
    rank: 5,
    institution: "stanford",
    badges: [
      { name: "JavaScript Guru", icon: "🌟" },
      { name: "Bug Hunter", icon: "🐛" },
    ],
    problemsSolved: 7,
    contestPoints: 300,
    isCurrentUser: false,
  },
  {
    id: 6,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Backend Builder",
    },
    tier: "Silver",
    xp: 580,
    rank: 6,
    institution: "mit",
    badges: [
      { name: "Database Guru", icon: "💾" },
      { name: "API Architect", icon: "🔌" },
    ],
    problemsSolved: 6,
    contestPoints: 280,
    isCurrentUser: false,
  },
  {
    id: 7,
    name: "Olivia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Testing Titan",
    },
    tier: "Silver",
    xp: 520,
    rank: 7,
    institution: "stanford",
    badges: [
      { name: "Bug Hunter", icon: "🐛" },
      { name: "Quality Guardian", icon: "🛡️" },
    ],
    problemsSolved: 5,
    contestPoints: 250,
    isCurrentUser: false,
  },
  {
    id: 8,
    name: "Ethan Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "Mobile Maestro",
    },
    tier: "Silver",
    xp: 480,
    rank: 8,
    institution: "harvard",
    badges: [
      { name: "App Developer", icon: "📱" },
      { name: "UI Designer", icon: "🎨" },
    ],
    problemsSolved: 4,
    contestPoints: 220,
    isCurrentUser: false,
  },
  {
    id: 9,
    name: "Sophia Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "DevOps Dynamo",
    },
    tier: "Bronze",
    xp: 420,
    rank: 9,
    institution: "berkeley",
    badges: [
      { name: "Cloud Expert", icon: "☁️" },
      { name: "CI/CD Master", icon: "🔄" },
    ],
    problemsSolved: 3,
    contestPoints: 180,
    isCurrentUser: false,
  },
  {
    id: 10,
    name: "Noah Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "Security Sentinel",
    },
    tier: "Bronze",
    xp: 380,
    rank: 10,
    institution: "cmu",
    badges: [
      { name: "Ethical Hacker", icon: "🔒" },
      { name: "Firewall Guardian", icon: "🛡️" },
    ],
    problemsSolved: 2,
    contestPoints: 150,
    isCurrentUser: false,
  },
]

// Mock data for friends leaderboard
export const friendsLeaderboardData = [
  {
    id: 3,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 4,
      title: "Syntax Samurai",
    },
    tier: "Gold",
    xp: 2450,
    rank: 1,
    institution: "harvard",
    badges: [
      { name: "Early Bird", icon: "🌅" },
      { name: "Code Ninja", icon: "🥷" },
    ],
    coursesCompleted: 3,
    isCurrentUser: true,
  },
  {
    id: 11,
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "React Ranger",
    },
    tier: "Silver",
    xp: 1950,
    rank: 2,
    institution: "mit",
    badges: [
      { name: "Component Creator", icon: "⚛️" },
      { name: "Hook Hero", icon: "🪝" },
    ],
    coursesCompleted: 2,
    isCurrentUser: false,
  },
  {
    id: 12,
    name: "Jordan Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 3,
      title: "Python Pioneer",
    },
    tier: "Silver",
    xp: 1850,
    rank: 3,
    institution: "stanford",
    badges: [
      { name: "Data Scientist", icon: "📊" },
      { name: "ML Enthusiast", icon: "🤖" },
    ],
    coursesCompleted: 2,
    isCurrentUser: false,
  },
  {
    id: 13,
    name: "Riley Cooper",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 2,
      title: "JavaScript Journeyer",
    },
    tier: "Bronze",
    xp: 1200,
    rank: 4,
    institution: "berkeley",
    badges: [{ name: "DOM Manipulator", icon: "🔧" }],
    coursesCompleted: 1,
    isCurrentUser: false,
  },
  {
    id: 14,
    name: "Casey Morgan",
    avatar: "/placeholder.svg?height=40&width=40",
    level: {
      number: 2,
      title: "CSS Craftsperson",
    },
    tier: "Bronze",
    xp: 1100,
    rank: 5,
    institution: "cmu",
    badges: [{ name: "Flexbox Fanatic", icon: "📦" }],
    coursesCompleted: 1,
    isCurrentUser: false,
  },
]

// Mock data for time periods
export const timePeriods = [
  { id: "all-time", name: "All Time" },
  { id: "this-week", name: "This Week" },
  { id: "this-month", name: "This Month" },
  { id: "last-30-days", name: "Last 30 Days" },
]

// Mock data for contests
export const contests = [
  { id: "current", name: "Current Contest" },
  { id: "weekly-challenge", name: "Weekly Challenge" },
  { id: "monthly-hackathon", name: "Monthly Hackathon" },
  { id: "algorithm-battle", name: "Algorithm Battle" },
  { id: "code-sprint", name: "Code Sprint" },
]

// First, add mock institutions data after the contests array
export const institutions = [
  { id: "all", name: "All Institutions" },
  { id: "mit", name: "MIT" },
  { id: "stanford", name: "Stanford University" },
  { id: "harvard", name: "Harvard University" },
  { id: "berkeley", name: "UC Berkeley" },
  { id: "cmu", name: "Carnegie Mellon University" },
]

export function Leaderboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overall")
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [contestFilter, setContestFilter] = useState("current")
  const [institutionFilter, setInstitutionFilter] = useState("all") // Add this line
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState(overallLeaderboardData)
  const [showFilters, setShowFilters] = useState(false)

  // Apply filters
  useEffect(() => {
    let data

    // Select data based on active tab
    if (activeTab === "overall") {
      data = overallLeaderboardData
    } else if (activeTab === "contest") {
      data = contestLeaderboardData
    } else {
      data = friendsLeaderboardData
    }

    // Apply search filter
    if (searchQuery) {
      data = data.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply institution filter
    if (institutionFilter !== "all") {
      data = data.filter((user) => user.institution === institutionFilter)
    }

    // In a real app, you would apply time and contest filters here
    // For now, we'll just use the mock data

    setFilteredData(data)
  }, [activeTab, timeFilter, contestFilter, institutionFilter, searchQuery])

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank against other students</p>
        </div>
      </div>

      <Tabs defaultValue="overall" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList className="w-full sm:w-auto bg-card border">
            <TabsTrigger
              value="overall"
              className="flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="h-4 w-4" />
              <span>Overall Ranking</span>
            </TabsTrigger>
            <TabsTrigger
              value="contest"
              className="flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Award className="h-4 w-4" />
              <span>Contest Ranking</span>
            </TabsTrigger>
            <TabsTrigger
              value="friends"
              className="flex items-center gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="h-4 w-4" />
              <span>Friends Ranking</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)} className="border">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 p-4 bg-card rounded-md border animate-in fade-in-0 slide-in-from-top-5 duration-300">
            {activeTab === "overall" && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Time Period:</span>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    {timePeriods.map((period) => (
                      <SelectItem key={period.id} value={period.id}>
                        {period.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {activeTab === "contest" && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Contest:</span>
                <Select value={contestFilter} onValueChange={setContestFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Select contest" />
                  </SelectTrigger>
                  <SelectContent>
                    {contests.map((contest) => (
                      <SelectItem key={contest.id} value={contest.id}>
                        {contest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Add institution filter - this should be available in all tabs */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Institution:</span>
              <Select value={institutionFilter} onValueChange={setInstitutionFilter}>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="Select institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((institution) => (
                    <SelectItem key={institution.id} value={institution.id}>
                      {institution.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              {activeTab === "overall" && (
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  {timeFilter === "all-time"
                    ? "All Time"
                    : timeFilter === "this-week"
                      ? "This Week"
                      : timeFilter === "this-month"
                        ? "This Month"
                        : "Last 30 Days"}
                </Badge>
              )}
              {activeTab === "contest" && (
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  {contests.find((c) => c.id === contestFilter)?.name || "Current Contest"}
                </Badge>
              )}

              {/* Add institution badge */}
              {institutionFilter !== "all" && (
                <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                  {institutions.find((i) => i.id === institutionFilter)?.name || "Institution"}
                </Badge>
              )}
            </div>
          </div>
        )}

        <TabsContent value="overall" className="mt-0 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Overall Rankings
                <span className="ml-2 text-sm font-normal text-muted-foreground">(by Level, XP, and Tier)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={filteredData} showTier={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contest" className="mt-0 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                {contests.find((c) => c.id === contestFilter)?.name || "Current Contest"} Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={filteredData} showContestPoints={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friends" className="mt-0 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Friends Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <LeaderboardTable data={filteredData} showTier={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
