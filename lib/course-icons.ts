import { Code, BookOpen, Database, Server, Globe, Cpu, Zap, FileCode, PenTool } from "lucide-react"

// Define course themes with pastel colors
export function getCourseTheme(title: string, tags: string[] = []) {
  const titleLower = title.toLowerCase()
  const tagsLower = tags.map((tag) => tag.toLowerCase())

  // Python - Lavender
  if (titleLower.includes("python") || tagsLower.includes("python")) {
    return {
      icon: Code,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      borderColor: "border-purple-200 dark:border-purple-800",
    }
  }

  // JavaScript - Peach
  if (titleLower.includes("javascript") || tagsLower.includes("javascript")) {
    return {
      icon: FileCode,
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      borderColor: "border-orange-200 dark:border-orange-800",
    }
  }

  // React - Light Blue
  if (titleLower.includes("react") || tagsLower.includes("react")) {
    return {
      icon: Zap,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-200 dark:border-blue-800",
    }
  }

  // Web Development - Mint Green
  if (titleLower.includes("web") || tagsLower.includes("web development") || tagsLower.includes("frontend")) {
    return {
      icon: Globe,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-200 dark:border-green-800",
    }
  }

  // Data Structures - Pink
  if (titleLower.includes("data structures") || tagsLower.includes("data structures")) {
    return {
      icon: Database,
      color: "text-pink-500",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      borderColor: "border-pink-200 dark:border-pink-800",
    }
  }

  // Machine Learning - Yellow
  if (titleLower.includes("machine learning") || tagsLower.includes("machine learning") || tagsLower.includes("ai")) {
    return {
      icon: Cpu,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    }
  }

  // Backend - Teal
  if (titleLower.includes("backend") || tagsLower.includes("backend") || tagsLower.includes("server")) {
    return {
      icon: Server,
      color: "text-teal-500",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
      borderColor: "border-teal-200 dark:border-teal-800",
    }
  }

  // Design - Pink
  if (titleLower.includes("design") || tagsLower.includes("design") || tagsLower.includes("ui")) {
    return {
      icon: PenTool,
      color: "text-pink-500",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      borderColor: "border-pink-200 dark:border-pink-800",
    }
  }

  // Default - Light Blue
  return {
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
  }
}
