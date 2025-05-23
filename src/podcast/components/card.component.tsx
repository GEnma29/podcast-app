"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { decodeToPlainText } from "@/lib/text.utils"
import type { PodcastFeed, ResponseEpisode } from "../models/index"
import useFavoritePodcastStore from "@/podcast/stores/favorite.store"
import { ResponsiveDrawer } from "@/podcast/components/details.component"
import useMediaQuery from "@/hooks/useMediaQuery";
import StarIcon from "@/components/icons/start"
import ArrowIcon from "@/components/icons/arrow"
import { PodcastPlayer } from "./podcast-player"
import useSWR from "swr"
import { fetcher } from "../services/fetcher"

type PodcastCardProps = {
  podcast: PodcastFeed
}

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritePodcastStore()
  const {data: episodes  , isLoading} = useSWR<ResponseEpisode>(`/episodes/byfeedid?id=${podcast.id}&pretty`, fetcher)
   const isMobile = useMediaQuery("(max-width: 768px)");
  const isFavorited = favorites.some((p: PodcastFeed) => p.id === podcast.id)

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(podcast.id)
    } else {
      addFavorite(podcast)
    }
  }

  const cardContent = isMobile ? (
    <Card className="w-full flex flex-row items-center h-[80px] rounded-lg overflow-hidden cursor-pointer relative bg-white border-none shadow-none ">
    
        <div
          className="h-[5.188rem] w-[4.909rem] rounded-[0.75rem] bg-cover bg-center"
          style={{
            backgroundImage: `url(${podcast.image})`,
          }}
        />

      <div className="flex-1 flex flex-col py-3">
        <CardTitle className="text-sm font-bold text-left line-clamp-1">{decodeToPlainText(podcast.title)}</CardTitle>
        <CardDescription className="text-xs text-gray-600 text-left line-clamp-2">
          {decodeToPlainText(podcast.description, true)}
        </CardDescription>
        <div className="text-xs text-gray-500 mt-1">{episodes?.items.length} episodios</div>
      </div>
      <div className="pr-2">
        <ArrowIcon />
      </div>
    </Card>
  ) : (
    <Card
      className="w-full max-w-[271px] h-[344px] rounded-lg overflow-hidden cursor-pointer relative bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
      style={{
        backgroundImage: `url(${podcast.image})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
      <div className="relative z-20 flex flex-col h-full p-4">
        <CardHeader className="p-0 pb-4">
          <div className="flex justify-end w-full">
             <StarIcon isSelected={isFavorited} onClick={handleFavoriteClick} />
          </div>
        </CardHeader>
        <CardContent className="p-0 pb-4 text-sm text-white"></CardContent>
        <CardFooter className="flex flex-col px-2 mt-auto p-0">
          <CardTitle className="text-lg font-bold text-white text-left">{decodeToPlainText(podcast.title)}</CardTitle>
          <CardDescription className="text-sm text-white leading-relaxed text-left md:text-base line-clamp-3">
            {decodeToPlainText(podcast.description, true)}
          </CardDescription>
        </CardFooter>
      </div>
    </Card>
  )

  return (
    <>
      <ResponsiveDrawer trigger={cardContent} podcast={podcast}>
        <PodcastPlayer podcast={podcast} episodes={episodes?.items || []} /> 
      </ResponsiveDrawer>
    </>
  )
}

export default PodcastCard
