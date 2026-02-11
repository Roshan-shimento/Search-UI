"use client"

import { SearchResultItem } from "@/lib/search-types"
import { Play } from "lucide-react"
import Link from "next/link"

interface VideoGridProps {
  videos: SearchResultItem[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <Link
          key={video.id}
          href={video.url}
          className="group block bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all"
        >
          {/* Video Thumbnail */}
          <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            {/* Citrix Logo */}
            <div className="absolute top-4 left-4 bg-green-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-sm">
              citrix
            </div>
            
            {/* Video Title Overlay */}
            <div className="absolute top-4 right-4 text-right max-w-[60%]">
              <h3 className="text-white font-semibold text-sm drop-shadow-lg line-clamp-2">
                {video.title}
              </h3>
            </div>

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 rounded-2xl w-20 h-14 flex items-center justify-center group-hover:bg-red-700 transition-colors shadow-xl">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Video Preview Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-blue-600/20" />
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="font-semibold text-primary hover:underline mb-1 line-clamp-2">
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground">Citrix</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
