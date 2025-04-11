"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Types
type TimeRange = "daily" | "weekly" | "monthly"
type MetricType = "xp" | "problems" | "time"

interface DataPoint {
  date: string
  xp: number
  problems: number
  time: number
}

// Generate mock data
const generateMockData = (timeRange: TimeRange): DataPoint[] => {
  const data: DataPoint[] = []
  const now = new Date()
  const points = timeRange === "daily" ? 7 : timeRange === "weekly" ? 4 : 12

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      date:
        timeRange === "daily"
          ? date.toLocaleDateString("en-US", { weekday: "short" })
          : timeRange === "weekly"
            ? `Week ${i + 1}`
            : date.toLocaleDateString("en-US", { month: "short" }),
      xp: Math.floor(Math.random() * 1000) + 500,
      problems: Math.floor(Math.random() * 20) + 10,
      time: Math.floor(Math.random() * 120) + 60,
    })
  }

  return data
}

// Custom tooltip
interface TooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function LearningAnalyticsGraph() {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly")
  const [metric, setMetric] = useState<MetricType>("xp")
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    setData(generateMockData(timeRange))
  }, [timeRange])

  const getMetricColor = (metricType: MetricType): string => {
    switch (metricType) {
      case "xp":
        return "#4CAF50"
      case "problems":
        return "#2196F3"
      case "time":
        return "#FF9800"
      default:
        return "#4CAF50"
    }
  }

  const getMetricLabel = (metricType: MetricType): string => {
    switch (metricType) {
      case "xp":
        return "XP Earned"
      case "problems":
        return "Problems Solved"
      case "time":
        return "Time Spent (min)"
      default:
        return ""
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Learning Progress</CardTitle>
          <Select value={metric} onValueChange={(value) => setMetric(value as MetricType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xp">XP Earned</SelectItem>
              <SelectItem value="problems">Problems Solved</SelectItem>
              <SelectItem value="time">Time Spent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.1} />
              <XAxis dataKey="date" stroke="#888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey={metric}
                name={getMetricLabel(metric)}
                stroke={getMetricColor(metric)}
                strokeWidth={2}
                dot={{ fill: getMetricColor(metric), r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
