"use client"

import { useState, useRef, useEffect } from "react"
import { Pause, Play } from "lucide-react"
import type { Episode, PodcastFeed } from "@/podcast/models"

interface AudioPlayerProps {
  episode: Episode
  podcast: PodcastFeed
}

export function AudioPlayer({ episode, podcast }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio element if not already created
    if (!audioRef.current) {
      audioRef.current = new Audio()
      
      const audio = audioRef.current

      const updateTime = () => setCurrentTime(audio.currentTime)
      const updateDuration = () => setDuration(audio.duration)
      const handleEnded = () => setIsPlaying(false)

      audio.addEventListener("timeupdate", updateTime)
      audio.addEventListener("loadedmetadata", updateDuration)
      audio.addEventListener("ended", handleEnded)

      return () => {
        audio.pause()
        audio.removeEventListener("timeupdate", updateTime)
        audio.removeEventListener("loadedmetadata", updateDuration)
        audio.removeEventListener("ended", handleEnded)
      }
    }

    const audio = audioRef.current
    audio.src = episode.enclosureUrl
    audio.load()

    if (isPlaying) {
      audio.play().catch((e) => console.error("Error playing audio:", e))
    }

    return () => {
      if (audio) {
        audio.pause()
      }
    }
  }, [episode.enclosureUrl])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch((e) => console.error("Error playing audio:", e))
    }

    setIsPlaying(!isPlaying)
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-3 flex items-center">
      <div className="flex-shrink-0 mr-3">
        <img
          src={podcast.artwork || podcast.image || "/placeholder.svg?height=40&width=40"}
          alt={podcast.title}
          width={40}
          height={40}
          className="rounded"
        />
      </div>

      <div className="flex-1 min-w-0 mr-3">
        <h4 className="text-sm font-medium truncate">{episode.title}</h4>
        <p className="text-xs text-gray-400 truncate">{podcast.title}</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" fill="currentColor" />
          ) : (
            <Play className="w-5 h-5" fill="currentColor" />
          )}
        </button>

        <div className="text-xs text-gray-400 w-10">{formatTime(duration)}</div>
      </div>
    </div>
  )
}