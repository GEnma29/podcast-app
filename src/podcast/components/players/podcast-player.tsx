"use client"

import { useEffect, useRef, useState } from "react"
import { PodcastDetails } from "../podcast-details"
import { EpisodeList } from "../episodes/episode-list"
import { AudioPlayer } from "./audio-player"
import type { Episode, PodcastFeed } from "@/podcast/models"

interface PodcastPlayerProps {
  podcast: PodcastFeed
  episodes: Episode[]
}

export function PodcastPlayer({ podcast}: PodcastPlayerProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<any | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)


  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollTop)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  
  const detailsOpacity = Math.max(0, 1 - scrollPosition / 100)
  const imageScale = Math.max(0.7, 1 - scrollPosition / 200)

  return (
    <div className="flex flex-col h-full  text-white  relative">
      <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar-hide" style={{ height: "calc(100% - 140px)" }}>
        <PodcastDetails podcast={podcast} opacity={detailsOpacity} scale={imageScale} />
        <EpisodeList podcastId={podcast.id} onSelectEpisode={setSelectedEpisode} defaultImage={podcast.image} currentEpisode={selectedEpisode} />
      </div>
      {selectedEpisode && <AudioPlayer episode={selectedEpisode} podcast={podcast} />}
    </div>
  )
}
