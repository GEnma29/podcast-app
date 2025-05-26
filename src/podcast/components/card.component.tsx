"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { decodeToPlainText } from "@/lib/text.utils";
import type { PodcastFeed, ResponseEpisode } from "../models/index";
import useFavoritePodcastStore from "@/podcast/stores/favorite.store";
import { ResponsiveDrawer } from "@/podcast/components/details.component";
import useMediaQuery from "@/hooks/useMediaQuery";
import StarIcon from "@/components/icons/start";
import ArrowIcon from "@/components/icons/arrow";
import { PodcastPlayer } from "./players/podcast-player";
import useSWR from "swr";
import { fetcher } from "../services/fetcher";
import { useState } from "react";

type PodcastCardProps = {
  podcast: PodcastFeed;
  episodeCount?: number;
  defaultImage?: string;
};

function isEmptyString(value: any): boolean {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
}

function EpisodeItemSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-4">
      <div className="flex items-center space-x-4">
        {/* Episode Thumbnail Skeleton */}
        <div className="w-12 h-12 bg-slate-700 rounded-lg animate-pulse flex-shrink-0" />

        {/* Episode Info Skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-slate-700 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-slate-700 rounded w-16 animate-pulse" />
        </div>

        {/* Play Button Skeleton */}
        <div className="w-10 h-10 bg-slate-700 rounded-full animate-pulse flex-shrink-0" />
      </div>
    </Card>
  )
}

const PodcastCard = ({ podcast, episodeCount }: PodcastCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritePodcastStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Solo hacer la llamada cuando se necesite (cuando se abra el drawer)
  const { data: episodes, isLoading } = useSWR<ResponseEpisode>(
    isDrawerOpen ? `/episodes/byfeedid?id=${podcast.id}&pretty` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isFavorited = favorites.some((p: PodcastFeed) => p.id === podcast.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(podcast.id);
    } else {
      addFavorite(podcast);
    }
  };

  const handleCardClick = () => {
    setIsDrawerOpen(true);
  };

  const cardContent = isMobile ? (
    <Card
      className="w-full flex flex-row items-center h-[80px] rounded-lg overflow-hidden cursor-pointer relative bg-white border-none shadow-none"
      onClick={handleCardClick}
    >
      <div
        className="h-[5.188rem] w-[4.909rem] rounded-[0.75rem] bg-cover bg-center flex-shrink-0"
        style={{
          backgroundImage: `url(${
            isEmptyString(podcast.image)
              ? "https://via.placeholder.com/150"
              : podcast.image
          })`,
        }}
      />
      <div className="flex-1 flex flex-col py-3 px-3 min-w-0">
        <CardTitle className="text-sm font-bold text-left line-clamp-1">
          {decodeToPlainText(podcast.title)}
        </CardTitle>
        <CardDescription className="text-xs text-gray-600 text-left line-clamp-2">
          {decodeToPlainText(podcast.description, true)}
        </CardDescription>
        <div className="text-xs text-gray-500 mt-1">
          {episodeCount  ?  `${podcast.episodeCount || 0} episodes` : 'no disponible' } 
        </div>
      </div>
      <div className="pr-2 flex-shrink-0">
        <ArrowIcon />
      </div>
    </Card>
  ) : (
    <Card
      className="w-full max-w-[271px] h-[344px] rounded-lg overflow-hidden cursor-pointer relative bg-cover bg-center transition-transform duration-300 ease-in-out hover:scale-110"
      style={{
        backgroundImage: `url(${
          isEmptyString(podcast.image)
            ? "https://via.placeholder.com/150"
            : podcast.image
        })`,
      }}
      onClick={handleCardClick}
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
          <CardTitle className="text-lg font-bold text-white text-left">
            {decodeToPlainText(podcast.title)}
          </CardTitle>
          <CardDescription className="text-sm text-white leading-relaxed text-left md:text-base line-clamp-3">
            {decodeToPlainText(podcast.description, true)}
          </CardDescription>
        </CardFooter>
      </div>
    </Card>
  );

  return (
    <ResponsiveDrawer
      trigger={cardContent}
      podcast={podcast}
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      {isDrawerOpen && (
        <>
          {isLoading ? (
            <div className="flex justify-center py-8">
                  <div className="w-full px-4 space-y-6">
                    {/* Podcast Cover Art Skeleton */}
                    <div className="flex justify-center">
                      <div className="w-32 h-32 bg-slate-700 rounded-2xl animate-pulse" />
                    </div>

                    {/* Title Skeleton */}
                    <div className="text-center">
                      <div className="h-8 bg-slate-700 rounded-lg w-48 mx-auto animate-pulse" />
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-700 rounded w-full animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-full animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-full animate-pulse" />
                      <div className="h-4 bg-slate-700 rounded w-3/4 animate-pulse" />
                    </div>

                    {/* Episodes Count Skeleton */}
                    <div className="h-6 bg-slate-700 rounded w-32 animate-pulse" />

                    {/* Episodes List Skeleton */}
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <EpisodeItemSkeleton key={index} />
                      ))}
                    </div>
                  </div>
                </div>
      
          ) : (
            <PodcastPlayer podcast={podcast} episodes={episodes?.items || []} />
          )}
        </>
      )}
    </ResponsiveDrawer>
  );
};

PodcastCard.displayName = "PodcastCard";

export default PodcastCard;
