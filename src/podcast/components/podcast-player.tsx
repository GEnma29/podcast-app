"use client"

import { useEffect, useRef, useState } from "react"
import { PodcastDetails } from "./podcast-details"
import { EpisodeList } from "./episode-list"
import { AudioPlayer } from "./audio-player"
import type { Episode, PodcastFeed } from "@/podcast/models"

interface PodcastPlayerProps {
  podcast: PodcastFeed
  episodes: Episode[]
}

export function PodcastPlayer({ podcast, episodes}: PodcastPlayerProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<any | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Simulated episodes data
  // const episodes = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   title: i === 0 ? "3 - La historia de pennang" : `${884 - i} - Find Pennang`,
  //   duration: "45 mins",
  //   pubDate: new Date().toISOString(),
  //   audioUrl: "#",
  //   imageUrl: "https://via.placeholder.com/150",
  // }))

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

  // Calculate opacity and scale based on scroll position
  // Faster transition for a more dramatic effect
  const detailsOpacity = Math.max(0, 1 - scrollPosition / 100)
  const imageScale = Math.max(0.7, 1 - scrollPosition / 200)

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white  relative">
      <div ref={containerRef} className="flex-1 overflow-y-auto scrollbar-hide" style={{ height: "calc(100% - 140px)" }}>
        <PodcastDetails podcast={podcast} opacity={detailsOpacity} scale={imageScale} />
        <EpisodeList podcastId={podcast.id} onSelectEpisode={setSelectedEpisode} currentEpisode={selectedEpisode} />
      </div>

      {selectedEpisode && <AudioPlayer episode={selectedEpisode} podcast={podcast} />}
    </div>
  )
}
