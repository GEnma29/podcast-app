import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PodcastFeed } from '../models';

interface FavoritePodcastsState {
  favorites: PodcastFeed[];
  count: number;
  addFavorite: (podcast: PodcastFeed) => void;
  removeFavorite: (podcastId: number) => void;
}

const useFavoritePodcastStore = create<FavoritePodcastsState>()(
  persist(
    (set) => ({
      favorites: [],
      count: 0,
      addFavorite: (podcast) =>
        set((state) => {
          const exists = state.favorites.some((p) => p.id === podcast.id);
          if (exists) return {};
          return {
            favorites: [...state.favorites, podcast],
            count: state.count + 1,
          };
        }),
      removeFavorite: (podcastId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== podcastId),
          count: state.count - 1,
        })),
    }),
    {
      name: 'favorite-podcasts-storage', 
    }
  )
);

export default useFavoritePodcastStore;
