"use client"

import { useEffect, useRef, useState } from "react"
import { EpisodeCard } from "./episode-card"
import type { Episode, ResponseEpisode } from "../models"
import useSWR from "swr"
import { fetcher } from "../services/fetcher"

interface EpisodeListProps {
  podcastId: number
  onSelectEpisode: (episode: Episode) => void
  currentEpisode: Episode | null
}

export function EpisodeList({ podcastId, onSelectEpisode, currentEpisode }: EpisodeListProps) {
  const limit = 10 // Number of episodes per page
  const [offset, setOffset] = useState(0)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const { data, error } = useSWR<ResponseEpisode>(`/episodes/byfeedid?id=${podcastId}&limit=${limit}&offset=${offset}`, fetcher)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastEpisodeRef = useRef<HTMLDivElement>(null)

  // Reset episodes when podcastId changes
  useEffect(() => {
    setEpisodes([])
    setOffset(0)
    setHasMore(true)
  }, [podcastId])

  // When new data is fetched
  useEffect(() => {
    if (data?.items && Array.isArray(data.items)) {
      setEpisodes((prev) => [...prev, ...data.items])
      setLoading(false)

      // If less than limit returned, no more episodes
      if (data.items.length < limit) {
        setHasMore(false)
      }
    }

    if (error) {
      setLoading(false)
      console.error("Failed to load episodes", error)
    }
  }, [data, error])

  // Load more episodes
  const loadMoreEpisodes = () => {
    if (loading || !hasMore) return

    setLoading(true)
    setOffset((prev) => prev + limit)
  }

  // Setup intersection observer
  useEffect(() => {
    if (!hasMore) return

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreEpisodes()
      }
    })

    if (lastEpisodeRef.current) {
      observer.current.observe(lastEpisodeRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [hasMore, loading])

  return (
    <div className="px-4 pb-20">
      <div className="space-y-3">
        {episodes.map((episode, index) => {
          const isLast = index === episodes.length - 1
          return (
            <div key={episode.id} ref={isLast ? lastEpisodeRef : undefined}>
              <EpisodeCard
                episode={episode}
                onSelect={() => onSelectEpisode(episode)}
                isPlaying={currentEpisode?.id === episode.id}
              />
            </div>
          )
        })}
      </div>

      {loading && <div className="py-4 text-center text-gray-400">Cargando más episodios...</div>}
      {!hasMore && episodes.length > 0 && <div className="py-4 text-center text-gray-400">No hay más episodios</div>}
    </div>
  )
}