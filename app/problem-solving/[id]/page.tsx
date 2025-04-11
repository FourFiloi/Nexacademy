"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  Clock,
  Play,
  CheckCircle,
  ChevronLeft,
  RefreshCw,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Problem {
  id: string
  number: number
  title: string
  description: string
  inputFormat: string
  outputFormat: string
  constraints: string[]
  sampleTestCases: {
    id: string
    input: string
    expectedOutput: string
    explanation?: string
  }[]
  starterCode: string
  level: number
  category: string
}

export default function ProblemSolvingPage() {
  const params = useParams()
  const router = useRouter()
  const problemId = params.id as string

  const [activeTab, setActiveTab] = useState("description")
  const [activeTestCase, setActiveTestCase] = useState("1")
  const [code, setCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isFullscreenLeft, setIsFullscreenLeft] = useState(false)
  const [isFullscreenRight, setIsFullscreenRight] = useState(false)
  const [isFullscreenBottom, setIsFullscreenBottom] = useState(false)

  // Resizable panel states
  const [leftPanelWidth, setLeftPanelWidth] = useState(50) // percentage
  const [editorHeight, setEditorHeight] = useState(70) // percentage
  const isResizingHorizontal = useRef(false)
  const isResizingVertical = useRef(false)
  const startXPos = useRef(0)
  const startYPos = useRef(0)
  const startLeftWidth = useRef(0)
  const startEditorHeight = useRef(0)

  // Mock problem data based on the image
  const problem: Problem = {
    id: problemId,
    number: 3,
    title: "Print Numbers from 1 to N",
    description:
      "Write a program that prints all integers sequentially from 1 to a given number N. The program should take a single integer as input and output the numbers in increasing order, separated by spaces.",
    inputFormat: "The program accepts a single integer num, which represents the upper limit of the sequence (N).",
    outputFormat: "The output should display all numbers from 1 to num, separated by spaces.",
    constraints: [
      "1 ≤ N ≤ 1000 (if applicable, otherwise remove constraints).",
      "The program should ensure efficient execution even for larger values of N.",
    ],
    sampleTestCases: [
      {
        id: "1",
        input: "5",
        expectedOutput: "1 2 3 4 5",
        explanation: "The input number N is 5.",
      },
      {
        id: "2",
        input: "10",
        expectedOutput: "1 2 3 4 5 6 7 8 9 10",
      },
      {
        id: "3",
        input: "5",
        expectedOutput: "1 2 3 4 5",
      },
    ],
    starterCode: "# Write your code here\n\n",
    level: 1,
    category: "Looping",
  }

  useEffect(() => {
    setCode(problem.starterCode)

    // Start timer
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [problem.starterCode])

  // Horizontal resizer handlers
  const startHorizontalResize = (e: React.MouseEvent) => {
    isResizingHorizontal.current = true
    startXPos.current = e.clientX
    startLeftWidth.current = leftPanelWidth
    document.body.style.cursor = "ew-resize"
    document.addEventListener("mousemove", handleHorizontalResize)
    document.addEventListener("mouseup", stopHorizontalResize)
  }

  const handleHorizontalResize = (e: MouseEvent) => {
    if (!isResizingHorizontal.current) return
    const containerWidth = document.getElementById("main-container")?.clientWidth || 1
    const delta = e.clientX - startXPos.current
    const newWidth = startLeftWidth.current + (delta / containerWidth) * 100
    setLeftPanelWidth(Math.min(Math.max(20, newWidth), 80)) // Limit between 20% and 80%
  }

  const stopHorizontalResize = () => {
    isResizingHorizontal.current = false
    document.body.style.cursor = "default"
    document.removeEventListener("mousemove", handleHorizontalResize)
    document.removeEventListener("mouseup", stopHorizontalResize)
  }

  // Vertical resizer handlers
  const startVerticalResize = (e: React.MouseEvent) => {
    isResizingVertical.current = true
    startYPos.current = e.clientY
    startEditorHeight.current = editorHeight
    document.body.style.cursor = "ns-resize"
    document.addEventListener("mousemove", handleVerticalResize)
    document.addEventListener("mouseup", stopVerticalResize)
  }

  const handleVerticalResize = (e: MouseEvent) => {
    if (!isResizingVertical.current) return
    const rightPanelHeight = document.getElementById("right-panel")?.clientHeight || 1
    const delta = e.clientY - startYPos.current
    const newHeight = startEditorHeight.current + (delta / rightPanelHeight) * 100
    setEditorHeight(Math.min(Math.max(20, newHeight), 80)) // Limit between 20% and 80%
  }

  const stopVerticalResize = () => {
    isResizingVertical.current = false
    document.body.style.cursor = "default"
    document.removeEventListener("mousemove", handleVerticalResize)
    document.removeEventListener("mouseup", stopVerticalResize)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      setIsRunning(false)
    }, 1000)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1500)
  }

  const handleBack = () => {
    router.push("/courses")
  }

  const handleNavigate = (index: number) => {
    router.push(`/problem-solving/${index}`)
  }

  const renderDescriptionContent = () => (
    <div className="p-6 space-y-6 bg-[#121212]">
      <div>
        <h1 className="text-xl font-bold text-white mb-4">
          {problem.number}. {problem.title}
        </h1>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Problem Statement:</h2>
        <p className="text-gray-300">{problem.description}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Input Format:</h2>
        <p className="text-gray-300">{problem.inputFormat}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Output Format:</h2>
        <p className="text-gray-300">{problem.outputFormat}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Constraints:</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>• {constraint}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Sample 1:</h2>
        <div className="border border-[#2d2d2d] rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="text-left p-3 text-sm font-medium text-gray-400 border-r border-[#2d2d2d] w-1/2">
                  Input
                </th>
                <th className="text-left p-3 text-sm font-medium text-gray-400 w-1/2">Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 text-gray-300 border-r border-[#2d2d2d] align-top">
                  {problem.sampleTestCases[0].input}
                </td>
                <td className="p-3 text-gray-300 align-top">{problem.sampleTestCases[0].expectedOutput}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-base font-semibold text-white mb-2">Explanation:</h2>
        <p className="text-gray-300">• {problem.sampleTestCases[0].explanation}</p>
      </div>
    </div>
  )

  const renderTestResultContent = () => (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Test Results</h2>
        <p className="text-gray-300">Run your code to see test results</p>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Top navigation bar */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#2d2d2d] z-10">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white hover:bg-[#2d2d2d] rounded-full"
            onClick={handleBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <span className="text-white font-medium">Problem Solving in Python</span>
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1 text-sm bg-[#252525] text-gray-300 rounded-md">{problem.category}</span>
              <span className="px-3 py-1 text-sm bg-[#252525] text-gray-300 rounded-md">Level {problem.level}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#252525] px-3 py-1 rounded-md text-green-500 border border-green-500/30">
            <Clock className="h-4 w-4" />
            <span>{formatTime(timeElapsed)}</span>
          </div>

          <button className="p-1.5 bg-[#252525] rounded-md text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>

          <button className="p-1.5 bg-[#252525] rounded-md text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
      </header>

      {/* Main content with resizable panels */}
      <div id="main-container" className="flex flex-1 overflow-hidden relative">
        {/* Left panel - Problem description */}
        <div
          className={`${isFullscreenLeft ? "fixed inset-0 z-50 bg-[#121212]" : ""} flex flex-col bg-[#121212] shadow-lg m-3 mr-0 rounded-2xl overflow-hidden`}
          style={{ width: isFullscreenLeft ? "100%" : `calc(${leftPanelWidth}% - 8px)` }}
        >
          <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[#2d2d2d] px-2 py-1">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-3 py-1 text-sm rounded-none ${
                  activeTab === "description"
                    ? "text-white border-b-2 border-green-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={activeTab === "description" ? "#ffffff" : "#9ca3af"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Description
                </span>
              </button>
              <button
                onClick={() => setActiveTab("testResult")}
                className={`px-3 py-1 text-sm rounded-none ${
                  activeTab === "testResult"
                    ? "text-white border-b-2 border-green-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={activeTab === "testResult" ? "#ffffff" : "#9ca3af"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Test Result
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsFullscreenLeft(!isFullscreenLeft)}
                className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400"
              >
                {isFullscreenLeft ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400">
                <ChevronLeft size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {activeTab === "description" ? renderDescriptionContent() : renderTestResultContent()}
          </div>
        </div>

        {/* Horizontal resizer */}
        {!isFullscreenLeft && !isFullscreenRight && (
          <div
            className="w-4 cursor-ew-resize flex items-center justify-center hover:bg-blue-500/20 z-10"
            onMouseDown={startHorizontalResize}
          >
            <div className="w-1 h-10 bg-gray-600 rounded-full"></div>
          </div>
        )}

        {/* Right panel - Code editor */}
        <div
          id="right-panel"
          className={`${isFullscreenRight ? "fixed inset-0 z-50 bg-black" : ""} flex flex-col bg-black shadow-lg m-3 ml-0 rounded-2xl overflow-hidden`}
          style={{ width: isFullscreenRight ? "100%" : `calc(${100 - leftPanelWidth}% - 8px)` }}
        >
          {/* Code editor section */}
          <div className="flex flex-col overflow-hidden" style={{ height: `${editorHeight}%` }}>
            <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[#2d2d2d] px-3 py-1 rounded-t-2xl">
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">{"<>"}</span>
                <span className="text-white">Code</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select className="appearance-none bg-[#252525] text-white px-3 py-1 pr-8 rounded border border-[#3d3d3d] text-sm focus:outline-none">
                    <option>Python</option>
                    <option disabled>JavaScript</option>
                    <option disabled>Java</option>
                    <option disabled>C++</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>

                <button
                  onClick={() => setIsFullscreenRight(!isFullscreenRight)}
                  className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400"
                >
                  {isFullscreenRight ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                <button className="p-1 rounded hover:bg-[#2d2d2d] text-gray-400">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-[#1e1e1e] rounded-b-2xl">
              <textarea
                value={code}
                onChange={handleCodeChange}
                className="w-full h-full bg-[#1e1e1e] text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none hide-scrollbar"
                spellCheck="false"
              ></textarea>
            </div>
          </div>

          {/* Vertical resizer */}
          {!isFullscreenRight && !isFullscreenBottom && (
            <div
              className="h-4 cursor-ns-resize flex justify-center hover:bg-blue-500/20 z-10"
              onMouseDown={startVerticalResize}
            >
              <div className="h-1 w-10 bg-gray-600 rounded-full my-auto"></div>
            </div>
          )}

          {/* Sample testcases section */}
          <div
            className={`${isFullscreenBottom ? "fixed inset-0 z-50 bg-black" : ""} flex flex-col overflow-hidden`}
            style={{ height: isFullscreenBottom ? "100%" : `calc(${100 - editorHeight}% - 16px)` }}
          >
            <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-3 border-b border-[#2d2d2d] rounded-t-2xl">
              <div className="text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <polyline points="9 11 12 14 22 4"></polyline>
                </svg>
              </div>
              <span className="text-white text-lg font-medium">Sample Testcases</span>
            </div>

            <div className="p-4 bg-[#1a1a1a] flex-1 overflow-auto hide-scrollbar rounded-b-2xl">
              <div className="flex gap-2 mb-4">
                {problem.sampleTestCases.map((testCase, index) => (
                  <button
                    key={testCase.id}
                    onClick={() => setActiveTestCase(testCase.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-[#252525] hover:bg-[#303030] ${
                      activeTestCase === testCase.id ? "border border-green-500/30" : ""
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className={`${activeTestCase === testCase.id ? "text-white" : "text-gray-300"}`}>
                      Case {index + 1}
                    </span>
                  </button>
                ))}
              </div>

              <div className="border border-[#2d2d2d] rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#252525]">
                      <th className="text-left p-4 text-base font-medium text-white border-r border-[#2d2d2d] w-1/2">
                        Input
                      </th>
                      <th className="text-left p-4 text-base font-medium text-white w-1/2">Output</th>
                    </tr>
                  </thead>
                  <tbody>
                    {problem.sampleTestCases.map((testCase) => (
                      <tr key={testCase.id} className={activeTestCase === testCase.id ? "" : "hidden"}>
                        <td className="p-4 text-white border-r border-t border-[#2d2d2d] align-top font-mono text-lg">
                          {testCase.input}
                        </td>
                        <td className="p-4 text-white border-t border-[#2d2d2d] align-top font-mono text-lg">
                          {testCase.expectedOutput}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Problem navigation */}
        <div className="w-16 bg-[#1a1a1a] border-l border-[#2d2d2d] flex flex-col items-center py-4 shadow-lg m-2 ml-0 rounded-r-lg">
          {Array.from({ length: 10 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleNavigate(index + 1)}
              className={`w-10 h-10 rounded-full mb-2 flex items-center justify-center ${
                index + 1 === 1
                  ? "bg-green-500 text-white"
                  : index + 1 === 2
                    ? "bg-green-500 text-white"
                    : index + 1 === 3
                      ? "bg-blue-500 text-white"
                      : "bg-[#252525] text-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-[#1a1a1a] m-3 mt-0 rounded-2xl border-t border-[#2d2d2d] p-3 flex items-center justify-between z-10">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-300 border-[#2d2d2d] hover:bg-[#252525] hover:text-white"
        >
          Prev
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-500 border-blue-500 hover:bg-blue-500/10"
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? (
              <span className="flex items-center gap-1">
                <div className="animate-spin h-3 w-3 border-2 border-t-transparent border-blue-500 rounded-full"></div>
                Running...
              </span>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                Run
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-green-500 border-green-500 hover:bg-green-500/10"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-1">
                <div className="animate-spin h-3 w-3 border-2 border-t-transparent border-green-500 rounded-full"></div>
                Submitting...
              </span>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Submit
              </>
            )}
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-gray-300 border-[#2d2d2d] hover:bg-[#252525] hover:text-white"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
