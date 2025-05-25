import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Pause } from "lucide-react"
import PlayIcon from "@/components/icons/play"
import type { Episode, PodcastFeed } from "@/podcast/models"

interface AudioPlayerProps {
  episode: Episode
  podcast: PodcastFeed
}

export function AudioPlayer({ episode, podcast }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(episode.duration)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressBarRef = useRef<HTMLInputElement>(null)

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(episode.enclosureUrl)
    } else {
      audioRef.current.src = episode.enclosureUrl
    }

    const audio = audioRef.current

    // Set up event listeners
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    // Load audio
    audio.load()

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
      audio.pause()
    }
  }, [episode.enclosureUrl])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed bottom-12 left-0 right-0 bg-gray-800 border-t border-gray-700 p-3">


      <div className="flex items-center">
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
          <div className="text-xs text-gray-400 w-14 text-right">{formatTime(currentTime)}</div>

          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <PlayIcon />
            )}
          </button>

          <div className="text-xs text-gray-400 w-14">{formatTime(duration)}</div>
        </div>
      </div>
       <div className="w-full mb-2 px-1">
        <input
          ref={progressBarRef}
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, white ${progressPercentage}%, #4b5563 ${progressPercentage}%)`,
          }}
        />
      </div>
    </div>
  )
}
