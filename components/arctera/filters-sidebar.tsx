"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FilterGroup } from "@/lib/search-types"

interface FiltersSidebarProps {
  filters: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (groupId: string, optionId: string) => void
  compact?: boolean
}

export function FiltersSidebar({
  filters = [],
  selectedFilters,
  onFilterChange,
  compact = false,
}: FiltersSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    filters?.reduce((acc, group) => ({ ...acc, [group.id]: group.expanded ?? true }), {}) ?? {}
  )

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  return (
    <aside
      className={cn(
        "bg-white rounded-lg border border-border shadow-sm",
        compact ? "w-48" : "w-60 shrink-0"
      )}
    >
      <div className={cn("font-semibold text-foreground border-b border-border", compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm")}>
        Refine Results
      </div>
      <div className="divide-y divide-border">
        {filters.map((group) => (
          <div key={group.id} className={compact ? "px-3 py-2" : "px-4 py-3"}>
            <button
              onClick={() => toggleGroup(group.id)}
              className={cn(
                "flex items-center justify-between w-full text-left font-medium text-foreground",
                compact ? "text-xs mb-1.5" : "text-sm mb-2"
              )}
            >
              {group.label}
              {expandedGroups[group.id] ? (
                <ChevronUp className={cn("text-muted-foreground", compact ? "h-3 w-3" : "h-4 w-4")} />
              ) : (
                <ChevronDown className={cn("text-muted-foreground", compact ? "h-3 w-3" : "h-4 w-4")} />
              )}
            </button>

            {expandedGroups[group.id] && (
              <div className={cn("space-y-0.5", compact ? "mt-1" : "mt-2")}>
                {group.options.map((option) => {
                  const isSelected = selectedFilters[group.id]?.includes(option.value)
                  return (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange(group.id, option.value)}
                      className={cn(
                        "flex items-center gap-2 w-full rounded-md transition-colors group",
                        compact ? "px-1.5 py-1 text-xs" : "px-2 py-1.5 text-sm",
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center rounded border",
                          compact ? "w-3.5 h-3.5" : "w-4 h-4",
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-border group-hover:border-muted-foreground"
                        )}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </span>
                      <span className="flex-1 text-left truncate">{option.label}</span>
                      <span
                        className={cn(
                          "text-muted-foreground",
                          compact ? "text-[10px]" : "text-xs"
                        )}
                      >
                        {option.count}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
