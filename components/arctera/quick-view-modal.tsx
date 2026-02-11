"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  X,
  ExternalLink,
  Book,
  FileText,
  MessageSquare,
  ShieldAlert,
  Newspaper,
  PlayCircle,
  FolderOpen,
  FileCode2,
  FileCheck2,
  Calendar,
  Tag,
} from "lucide-react"
import type { SearchResultItem, ContentType } from "@/lib/search-types"
import { contentTypeLabels } from "@/lib/search-types"
import { cn } from "@/lib/utils"

interface QuickViewModalProps {
  result: SearchResultItem | null
  onClose: () => void
}

const typeConfig: Record<ContentType, { icon: typeof Book; color: string }> = {
  "support-article": { icon: FileText, color: "text-blue-600 bg-blue-50" },
  documentation: { icon: Book, color: "text-emerald-600 bg-emerald-50" },
  "security-alert": { icon: ShieldAlert, color: "text-red-600 bg-red-50" },
  community: { icon: MessageSquare, color: "text-purple-600 bg-purple-50" },
  blog: { icon: Newspaper, color: "text-orange-600 bg-orange-50" },
  video: { icon: PlayCircle, color: "text-pink-600 bg-pink-50" },
  case: { icon: FolderOpen, color: "text-amber-600 bg-amber-50" },
  "internal-article": { icon: FileCode2, color: "text-slate-600 bg-slate-100" },
  "prod-doc": { icon: FileCheck2, color: "text-teal-600 bg-teal-50" },
  jira: { icon: ExternalLink, color: "text-blue-500 bg-blue-50" },
  confluence: { icon: FileText, color: "text-blue-700 bg-blue-50" },
}

export function QuickViewModal({ result, onClose }: QuickViewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    if (result) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [result, onClose])

  if (!result) return null

  const config = typeConfig[result.type]
  const Icon = config.icon

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-border bg-gradient-to-r from-muted/50 to-white">
          <div
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0",
              config.color
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={cn(
                "inline-block text-xs font-medium px-2 py-0.5 rounded mb-1.5",
                config.color
              )}
            >
              {contentTypeLabels[result.type]}
            </span>
            <h2
              id="quick-view-title"
              className="text-xl font-bold text-foreground leading-tight"
            >
              {result.title}
            </h2>
            {result.subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{result.subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors -mt-1 -mr-1"
            aria-label="Close preview"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Metadata Bar */}
        <div className="flex items-center gap-4 px-5 py-3 bg-muted/30 border-b border-border text-sm">
          {result.product && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Tag className="h-3.5 w-3.5" />
              <span className="font-medium text-foreground">{result.product}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={result.date}>
              {new Date(result.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="prose prose-sm max-w-none">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-primary rounded-full" />
              Summary
            </h3>
            <p className="text-foreground/90 leading-relaxed">{result.summary}</p>

            {result.highlight && (
              <>
                <h3 className="text-sm font-semibold text-foreground mt-6 mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full" />
                  Relevant Excerpt
                </h3>
                <blockquote className="border-l-4 border-primary/30 pl-4 py-2 bg-muted/30 rounded-r-lg">
                  <p className="text-muted-foreground italic m-0">
                    &quot;...{result.highlight}...&quot;
                  </p>
                </blockquote>
              </>
            )}

            {/* Placeholder content for preview */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                This is a preview of the article. Click the button below to view the full content with all details, images, and related resources.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-border rounded text-xs font-mono">Esc</kbd> to close
          </p>
          <Link
            href={result.url}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            Open Full Article
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
