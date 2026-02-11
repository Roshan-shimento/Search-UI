"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, ThumbsUp, ThumbsDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SourceLink } from "@/lib/search-types"

interface AISummaryProps {
  summary: string
  sources: SourceLink[]
  onFeedback?: (isPositive: boolean) => void
  compact?: boolean
}

export function AISummary({ summary, sources = [], onFeedback, compact = false }: AISummaryProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFeedback = (isPositive: boolean) => {
    const feedbackType = isPositive ? "positive" : "negative"
    // Allow users to change their feedback
    if (feedback === feedbackType) {
      setFeedback(null) // Deselect if clicking the same button
    } else {
      setFeedback(feedbackType)
      setShowThankYou(true)
      onFeedback?.(isPositive)

      setTimeout(() => {
        setShowThankYou(false)
      }, 2000)
    }
  }

  const truncatedSummary =
    summary.length > 260 ? `${summary.slice(0, 260).trimEnd()}...` : summary
  const displaySummary = isExpanded ? summary : truncatedSummary

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-100">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 bg-primary/10 rounded">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-xs font-semibold text-foreground">AI Summary</span>
        </div>
        <p className="text-xs text-foreground/80 leading-relaxed mb-2">{summary}</p>

        {sources?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {sources?.slice(0, 3).map((source, index) => (
              <Link
                key={index}
                href={source.url}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                <span className="w-4 h-4 flex items-center justify-center bg-primary/10 rounded text-[10px] font-medium">
                  {index + 1}
                </span>
                {source.title}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t border-blue-100">
          <span className="text-[10px] text-muted-foreground">Helpful?</span>
          <button
            onClick={() => handleFeedback(true)}
            className={cn(
              "p-1 rounded transition-colors",
              feedback === "positive"
                ? "bg-green-100 text-green-600"
                : "hover:bg-white text-muted-foreground"
            )}
            aria-label="Helpful"
          >
            <ThumbsUp className="h-3 w-3" />
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className={cn(
              "p-1 rounded transition-colors",
              feedback === "negative"
                ? "bg-red-100 text-red-600"
                : "hover:bg-white text-muted-foreground"
            )}
            aria-label="Not helpful"
          >
            <ThumbsDown className="h-3 w-3" />
          </button>
          {showThankYou && (
            <span className="text-[10px] text-green-600 animate-fade-in font-medium">Thank you!</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 rounded-xl p-5 mb-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">AI-Generated Summary</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Powered by GenAI</span>
      </div>

      {/* Summary Content + Sources (collapsible) */}
      <p className="text-foreground/90 leading-relaxed mb-4">
        {displaySummary}
      </p>

      {isExpanded && sources?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">Based on these sources:</p>
          <div className="flex flex-col gap-1.5">
            {sources?.slice(0, 3).map((source, index) => (
              <Link
                key={index}
                href={source.url}
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 hover:underline group"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-primary/10 rounded text-xs font-semibold group-hover:bg-primary/20">
                  {index + 1}
                </span>
                {source.title}
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Feedback / Show more */}
      <div className="flex items-center justify-between pt-4 border-t border-blue-100">
        {isExpanded ? (
          <>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Was this summary helpful?</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleFeedback(true)}
                  disabled={feedback !== null}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    feedback === "positive"
                      ? "bg-green-100 text-green-700"
                      : "bg-white border border-border hover:bg-muted text-muted-foreground",
                    feedback !== null && feedback !== "positive" && "opacity-40"
                  )}
                  aria-label="Helpful"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  Yes
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  disabled={feedback !== null}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    feedback === "negative"
                      ? "bg-red-100 text-red-700"
                      : "bg-white border border-border hover:bg-muted text-muted-foreground",
                    feedback !== null && feedback !== "negative" && "opacity-40"
                  )}
                  aria-label="Not helpful"
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                  No
                </button>
              </div>
              {showThankYou && (
                <span className="text-sm text-green-600 animate-fade-in font-medium">
                  Thank you for your feedback!
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="ml-4 text-xs font-medium text-primary hover:text-primary/80"
            >
              Show less
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            Show more
            <ChevronRight className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  )
}
