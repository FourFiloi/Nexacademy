"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface DataPoint {
  name: string
  xp: number
  problems: number
  time: number
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    dataKey: string
    name: string
    color: string
  }>
  label?: string
}

// Types
type TimeRange = "daily" | "weekly" | "monthly"
type MetricType = "xp" | "problems" | "time"

// Generate mock data
const generateChartData = (timeRange: TimeRange): DataPoint[] => {
  const data: DataPoint[] = []
  const now = new Date()
  const points = timeRange === "daily" ? 7 : timeRange === "weekly" ? 4 : 12
  
  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    data.push({
      name: timeRange === "daily" 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : timeRange === "weekly"
        ? `Week ${i + 1}`
        : date.toLocaleDateString('en-US', { month: 'short' }),
      xp: Math.floor(Math.random() * 1000) + 500,
      problems: Math.floor(Math.random() * 20) + 10,
      time: Math.floor(Math.random() * 120) + 60
    })
  }
  
  return data
}

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

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border rounded-lg shadow-sm">
        <p className="text-sm font-medium">{label}</p>
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

  // Initialize data on component mount
  useEffect(() => {
    setData(generateChartData(timeRange))
  }, []) // Empty dependency array for initial load only

  // Handle metric change
  const handleMetricChange = (value: MetricType) => {
    setMetric(value)
  }

  // Handle time range change
  const handleTimeRangeChange = (value: TimeRange) => {
    setTimeRange(value)
    setData(generateChartData(value)) // Regenerate data when time range changes
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Learning Progress</CardTitle>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={handleTimeRangeChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={metric} onValueChange={handleMetricChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xp">XP Earned</SelectItem>
                <SelectItem value="problems">Problems Solved</SelectItem>
                <SelectItem value="time">Time Spent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey={metric}
                name={getMetricLabel(metric)}
                stroke={getMetricColor(metric)}
                strokeWidth={2}
                dot={{ fill: getMetricColor(metric), r: 4 }}
                activeDot={{ r: 6, fill: getMetricColor(metric) }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
