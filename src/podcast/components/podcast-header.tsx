"use client"

import { X } from "lucide-react"
import type { PodcastFeed } from "../models"
import StarIcon from "@/components/icons/start"
import useFavoritePodcastStore from "../stores/favorite.store"

interface PodcastHeaderProps {
  podcast?: PodcastFeed
  onClose: () => void
}

export function PodcastHeader({ podcast, onClose }: PodcastHeaderProps) {
  const { addFavorite, removeFavorite, favorites } = useFavoritePodcastStore()

  if (!podcast) {
    return null // or a fallback UI
  }

  const isFavorited = favorites.some((fav) => fav.id === podcast.id)

  const handleFavorite = () => {
    if (isFavorited) {
      removeFavorite(podcast.id)
    } else {
      addFavorite(podcast)
    }
  }

  return (
    <div className="flex items-center rounded-t-lg justify-between p-4 bg-gray-900">
      <button 
        className="text-white hover:text-yellow-400 transition-colors" 
        aria-label={isFavorited ? "Unfavorite" : "Favorite"} 
        onClick={handleFavorite}
      >
        <StarIcon isSelected={isFavorited} />
      </button>
      
      <div className="h-1 w-10 bg-gray-700 rounded-full" />

      <button 
        className="text-white hover:text-gray-400 transition-colors" 
        onClick={onClose} 
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  )
}