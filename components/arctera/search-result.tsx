"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Book,
  FileText,
  MessageSquare,
  ShieldAlert,
  Newspaper,
  PlayCircle,
  Eye,
  FolderOpen,
  FileCode2,
  FileCheck2,
  ExternalLink,
  Paperclip,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { SearchResultItem, ContentType } from "@/lib/search-types"

interface SearchResultProps {
  item: SearchResultItem
  searchQuery: string
  onQuickView?: (item: SearchResultItem) => void
  onAttach?: (item: SearchResultItem) => void
  onPreview?: (item: SearchResultItem) => void
  showAttach?: boolean
  compact?: boolean
}

const typeConfig: Record<ContentType, { icon: typeof Book; label: string; color: string }> = {
  "support-article": { icon: FileText, label: "Support Article", color: "text-blue-600 bg-blue-50" },
  documentation: { icon: Book, label: "Documentation", color: "text-emerald-600 bg-emerald-50" },
  "security-alert": { icon: ShieldAlert, label: "Security Alert", color: "text-red-600 bg-red-50" },
  community: { icon: MessageSquare, label: "Community", color: "text-purple-600 bg-purple-50" },
  blog: { icon: Newspaper, label: "Blog", color: "text-orange-600 bg-orange-50" },
  video: { icon: PlayCircle, label: "Video", color: "text-pink-600 bg-pink-50" },
  case: { icon: FolderOpen, label: "Case", color: "text-amber-600 bg-amber-50" },
  "internal-article": { icon: FileCode2, label: "Internal", color: "text-slate-600 bg-slate-100" },
  "prod-doc": { icon: FileCheck2, label: "Product Doc", color: "text-teal-600 bg-teal-50" },
  jira: { icon: ExternalLink, label: "Jira", color: "text-blue-500 bg-blue-50" },
  confluence: { icon: FileText, label: "Confluence", color: "text-blue-700 bg-blue-50" },
}

export function SearchResult({
  item,
  searchQuery,
  onQuickView,
  onAttach,
  onPreview,
  showAttach = false,
  compact = false,
}: SearchResultProps) {
  const [visited, setVisited] = useState(false)
  const config = typeConfig[item.type]
  const Icon = config.icon

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const words = query.trim().split(/\s+/).filter(Boolean)
    const regex = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      words.some(w => part.toLowerCase() === w.toLowerCase()) ? (
        <mark key={i} className="bg-yellow-100 text-yellow-900 font-medium rounded px-0.5">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    )
  }

  const canAttach = showAttach && item.isAttachable

  return (
    <article
      className={cn(
        "group transition-colors hover:bg-muted/30",
        compact ? "py-3 px-3" : "py-4 px-4"
      )}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div
            className={cn(
              "flex items-center justify-center rounded-lg",
              compact ? "w-9 h-9" : "w-11 h-11",
              config.color
            )}
          >
            <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5")} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {/* Type badge */}
              <span
                className={cn(
                  "inline-block text-xs font-medium px-2 py-0.5 rounded mb-1",
                  config.color
                )}
              >
                {config.label}
              </span>

              {/* Title */}
              <Link
                href={item.url}
                onClick={() => setVisited(true)}
                className={cn(
                  "font-semibold hover:underline block leading-snug",
                  compact ? "text-sm" : "text-base",
                  visited ? "text-arctera-link-visited" : "text-arctera-link"
                )}
              >
                {highlightText(item.title, searchQuery)}
              </Link>

              {item.subtitle && (
                <p className={cn("text-muted-foreground mt-0.5", compact ? "text-xs" : "text-sm")}>
                  {item.subtitle}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Attach Button */}
              {canAttach && onAttach && (
                <button
                  onClick={() => onAttach(item)}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    item.isAttached
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                  aria-label={item.isAttached ? "Attached" : "Attach article"}
                  title={item.isAttached ? "Attached to case" : "Attach to case"}
                >
                  {item.isAttached ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Paperclip className="h-4 w-4" />
                  )}
                </button>
              )}


            </div>
          </div>

          {/* Metadata row */}
          <div
            className={cn(
              "flex items-center gap-2 text-muted-foreground mt-1.5",
              compact ? "text-xs" : "text-sm"
            )}
          >
            {item.product && (
              <>
                <span className="font-medium">{item.product}</span>
                <span className="text-border">|</span>
              </>
            )}
            <time dateTime={item.date}>{new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</time>
          </div>

          {/* Summary */}
          <p
            className={cn(
              "text-foreground/80 mt-2 leading-relaxed line-clamp-2",
              compact ? "text-xs" : "text-sm"
            )}
          >
            {highlightText(item.summary, searchQuery)}
          </p>
        </div>
      </div>
    </article>
  )
}
