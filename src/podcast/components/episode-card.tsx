"use client"

import { Play } from "lucide-react"
import type { Episode } from "../models"
import { stripHtml } from "@/lib/text.utils"


interface EpisodeCardProps {
  episode: Episode
  defaultImage?: string
  onSelect: () => void
  isPlaying: boolean
}

export function EpisodeCard({ episode, defaultImage, onSelect, isPlaying }: EpisodeCardProps) {
  console.log("EpisodeCard", typeof(episode.image) , episode.image)
  return (
    <div
      className={`flex items-center p-3 rounded-lg ${isPlaying ? "bg-gray-800" : "hover:bg-gray-800/50"} transition-colors cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 relative rounded overflow-hidden bg-red-500">
          <img
            src={episode.image}
              onError={(e) => {
                    // If the image fails to load, set it to the default image
                    (e.target as HTMLImageElement).src = defaultImage || "";
                }}
            alt="Episode thumbnail"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">{episode.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-3">{stripHtml(episode.description)}</p>
      </div>

      <button
        className="ml-2 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-900"
        onClick={(e) => {
          e.stopPropagation()
          onSelect()
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <Play className="w-4 h-4" fill="currentColor" />
      </button>
    </div>
  )
}
