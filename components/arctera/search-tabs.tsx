"use client"

import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  FileText,
  Book,
  MessageSquare,
  Newspaper,
  PlayCircle,
  FolderOpen,
  FileCode2,
  FileCheck2,
  ExternalLink,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Tab<T> {
  id: T
  label: string
  icon?: LucideIcon
}

// Define types locally to avoid import issues
type SupportSiteTabType =
  | "all"
  | "support-articles"
  | "documentation"
  | "community"
  | "blogs"
  | "videos"

type WolkenTabType =
  | "all"
  | "cases"
  | "support-articles"
  | "internal-articles"
  | "prod-docs"
  | "jira"
  | "confluence"
  | "community"
  | "blogs"

// Support Site tabs (unified for Wolken Support Site, AEM Site, and Community/Invision)
export const supportSiteTabs: Tab<SupportSiteTabType>[] = [
  { id: "all", label: "All Resources", icon: LayoutGrid },
  { id: "support-articles", label: "Support Articles", icon: FileText },
  { id: "documentation", label: "Documentation", icon: Book },
  { id: "community", label: "Community", icon: MessageSquare },
  { id: "blogs", label: "Blogs", icon: Newspaper },
  { id: "videos", label: "Videos", icon: PlayCircle },
]

// Wolken Full Search tabs  
export const wolkenTabs: Tab<WolkenTabType>[] = [
  { id: "all", label: "All", icon: LayoutGrid },
  { id: "cases", label: "Cases", icon: FolderOpen },
  { id: "support-articles", label: "Support Articles", icon: FileText },
  { id: "internal-articles", label: "Internal Articles", icon: FileCode2 },
  { id: "prod-docs", label: "Prod Docs", icon: FileCheck2 },
  { id: "jira", label: "Jira", icon: ExternalLink },
  { id: "confluence", label: "Confluence", icon: Book },
  { id: "community", label: "Community", icon: MessageSquare },
  { id: "blogs", label: "Blogs", icon: Newspaper },
]

interface SearchTabsProps<T extends string> {
  tabs: Tab<T>[]
  activeTab: T
  onTabChange: (tab: T) => void
  resultCounts?: Partial<Record<T, number>>
  compact?: boolean
}

export function SearchTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  resultCounts,
  compact = false,
}: SearchTabsProps<T>) {
  return (
    <div className="border-b border-border bg-white overflow-x-auto">
      <div className="flex flex-nowrap min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "transition-all relative whitespace-nowrap border-b-2 flex items-center gap-2",
              compact ? "px-4 py-2.5 text-xs" : "px-5 py-3.5 text-sm",
              "font-medium",
              activeTab === tab.id
                ? "border-primary text-primary bg-accent/30"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {tab.icon && <tab.icon className={cn(compact ? "h-3.5 w-3.5" : "h-4 w-4")} />}
            {tab.label}
            {resultCounts && resultCounts[tab.id] !== undefined && (
              <span
                className={cn(
                  "ml-1.5 px-1.5 py-0.5 rounded-full text-xs",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {resultCounts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
