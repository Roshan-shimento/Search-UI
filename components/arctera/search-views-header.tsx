"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

type MainViewType = "wolken-support" | "aem-site" | "community-invision" | "wolken-agent" | "wolken-full"

interface SearchViewsHeaderProps {
  activeView: MainViewType
  onViewChange: (view: MainViewType) => void
}

export function SearchViewsHeader({ activeView, onViewChange }: SearchViewsHeaderProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-start gap-4 mb-2 flex-wrap">
          <h2 className="text-1xl font-bold text-foreground shrink-0">Search Views</h2>
          <div className="flex items-center gap-2 rounded-md border border-amber-400 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
            <span>This prototype is intended for demonstration purposes only and may differ from the final production implementation.</span>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={() => onViewChange("wolken-support")}
            variant={activeView === "wolken-support" ? "default" : "outline"}
            size="lg"
            className={cn(
              "font-semibold",
              activeView === "wolken-support"
                ? "bg-primary text-primary-foreground"
                : "bg-white hover:bg-accent"
            )}
          >
            Wolken Support Site
          </Button>
          <Button
            onClick={() => onViewChange("wolken-agent")}
            variant={activeView === "wolken-agent" ? "default" : "outline"}
            size="lg"
            className={cn(
              "font-semibold",
              activeView === "wolken-agent"
                ? "bg-primary text-primary-foreground"
                : "bg-white hover:bg-accent"
            )}
          >
            Wolken Agent Panel
          </Button>
          <Button
            onClick={() => onViewChange("wolken-full")}
            variant={activeView === "wolken-full" ? "default" : "outline"}
            size="lg"
            className={cn(
              "font-semibold",
              activeView === "wolken-full" ? "bg-primary text-primary-foreground" : "bg-white hover:bg-accent"
            )}
          >
            Wolken Full Search
          </Button>
          <Button
            onClick={() => onViewChange("aem-site")}
            variant={activeView === "aem-site" ? "default" : "outline"}
            size="lg"
            className={cn(
              "font-semibold",
              activeView === "aem-site" ? "bg-primary text-primary-foreground" : "bg-white hover:bg-accent"
            )}
          >
            AEM Site
          </Button>
          <Button
            onClick={() => onViewChange("community-invision")}
            variant={activeView === "community-invision" ? "default" : "outline"}
            size="lg"
            className={cn(
              "font-semibold",
              activeView === "community-invision"
                ? "bg-primary text-primary-foreground"
                : "bg-white hover:bg-accent"
            )}
          >
            Community/Invision
          </Button>
        </div>
      </div>
    </div>
  )
}
