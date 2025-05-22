import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
  CardFooter,
} from "../../components/ui/card";
import StarIcon from "@/components/icons/start"; // Fixed typo: start → star
import type { PodcastFeed } from "../models";
import { decodeToPlainText } from "@/lib/text.utils";
import useFavoritePodcastStore from "../stores/favorite.store";

interface PodcastCardProps {
  podcast: PodcastFeed;
}

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritePodcastStore();

  const isFavorited = favorites.some((p) => p.id === podcast.id);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(podcast.id);
    } else {
      addFavorite(podcast);
    }
  };

  return (
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
};

export default PodcastCard;
