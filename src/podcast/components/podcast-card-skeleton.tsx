import useMediaQuery from "@/hooks/useMediaQuery"
import { PodcastCardMobileSkeleton } from "./podcast-card-mobile-skeleton"
import { PodcastCardDesktopSkeleton } from "./podcast-card-desktop-skeleton"

export const PodcastCardSkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return isMobile ? <PodcastCardMobileSkeleton /> : <PodcastCardDesktopSkeleton />
}
