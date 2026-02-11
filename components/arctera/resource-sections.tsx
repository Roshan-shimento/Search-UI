"use client"

import { SearchResultItem } from "@/lib/search-types"
import { FileText, Book, MessageSquare, Newspaper, PlayCircle, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ResourceSectionProps {
  title: string
  icon: typeof FileText
  items: SearchResultItem[]
  onViewAll: () => void
  maxItems?: number
  isVideo?: boolean
}

function ResourceSection({ title, icon: Icon, items, onViewAll, maxItems = 4, isVideo = false }: ResourceSectionProps) {
  const displayItems = items.slice(0, maxItems)

  if (isVideo) {
    return (
      <div className="border rounded-lg bg-white mb-6">
        <div className="p-4 border-b bg-muted/30">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
              {displayItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="flex-shrink-0 w-[350px] group"
                >
                  <div className="bg-muted rounded-lg overflow-hidden mb-3 relative aspect-video">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                      <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full" />
                        citrix
                      </div>
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-primary font-medium mb-1 group-hover:underline line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">Citrix</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center pt-2">
            <button
              onClick={onViewAll}
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg bg-white mb-6">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-green-600" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm text-primary hover:underline font-medium"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="divide-y">
        {displayItems.map((item) => (
          <div key={item.id} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Link href={item.url} className="text-primary hover:underline font-medium block mb-1">
                  {item.title}
                </Link>
                <div className="text-xs text-muted-foreground mb-2">
                  {item.product} | {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </div>
                <p className="text-sm text-foreground line-clamp-2">{item.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ResourceSectionsProps {
  results: SearchResultItem[]
  onViewAll: (type: string) => void
}

export function ResourceSections({ results, onViewAll }: ResourceSectionsProps) {
  // Group results by type
  const supportArticles = results.filter((r) => r.type === "support-article")
  const documentation = results.filter((r) => r.type === "documentation")
  const community = results.filter((r) => r.type === "community")
  const blogs = results.filter((r) => r.type === "blog")
  const videos = results.filter((r) => r.type === "video")

  return (
    <div className="space-y-6">
      {supportArticles.length > 0 && (
        <ResourceSection
          title="Support Articles"
          icon={FileText}
          items={supportArticles}
          onViewAll={() => onViewAll("support-articles")}
        />
      )}
      {documentation.length > 0 && (
        <ResourceSection
          title="Product Docs"
          icon={Book}
          items={documentation}
          onViewAll={() => onViewAll("documentation")}
        />
      )}
      {community.length > 0 && (
        <ResourceSection
          title="Community"
          icon={MessageSquare}
          items={community}
          onViewAll={() => onViewAll("community")}
        />
      )}
      {blogs.length > 0 && (
        <ResourceSection
          title="Blogs"
          icon={Newspaper}
          items={blogs}
          onViewAll={() => onViewAll("blogs")}
        />
      )}
      {videos.length > 0 && (
        <ResourceSection
          title="Videos"
          icon={PlayCircle}
          items={videos}
          onViewAll={() => onViewAll("videos")}
          isVideo={true}
        />
      )}
    </div>
  )
}
