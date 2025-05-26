import React, { useState, useCallback } from "react";
import useSWR from "swr";
import { fetcher } from "../services/fetcher";
import type { PodcastSearchResponse } from "../models";
import Layout from "../components/layout/layout.component";
import ExpandableSearch from "../components/common/expandable-search";
import PodcastCard from "../components/card.component";
import { useNavigate, useParams } from "react-router";
import { InfiniteScroll } from "../components/common/infinity-scroll.component";
import TabSwitcher from "../components/layout/tab-switcher";
import useFavoritePodcastStore from "../stores/favorite.store";

const ITEMS_PER_PAGE = 16;

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { tab } = useParams<{ tab: "trending" | "favorites" }>();
  const { favorites } = useFavoritePodcastStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [allFeeds, setAllFeeds] = useState<any[]>([]);

  const isFavoritesTab = tab === "favorites";
  const isEmptySearch = searchQuery.trim() === "";

  const apiUrl = isFavoritesTab
    ? null
    : isEmptySearch
    ? `/podcasts/trending?max=${ITEMS_PER_PAGE}&page=${page}`
    : `/search/bytitle?q=${encodeURIComponent(searchQuery)}&max=${ITEMS_PER_PAGE}&page=${page}`;

  const { data, isLoading } = useSWR<PodcastSearchResponse>(
    apiUrl,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      onSuccess: (newData) => {
        if (newData?.feeds) {
          setAllFeeds((prev) =>
            page === 1 ? newData.feeds : [...prev, ...newData.feeds]
          );
        }
      },
    }
  );

  const loadMore = useCallback(() => {
    if (!isFavoritesTab) setPage((prevPage) => prevPage + 1);
  }, [isFavoritesTab]);


  const handleSearch = useCallback((query: string) => {
    navigate(`/trending`);
    setSearchQuery(query);
    setPage(1);
    setAllFeeds([]);
  }, []);

  const hasMore = !isFavoritesTab && !isEmptySearch && data?.feeds?.length === ITEMS_PER_PAGE;

  const displayedItems = isFavoritesTab
    ? Array.from(favorites.values())
    : allFeeds;

  return (
    <Layout>
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">Podcasts</h1>
        <ExpandableSearch onSearch={handleSearch} />
      </header>
      <main className="p-4">
        <TabSwitcher />
        <InfiniteScroll
          data={displayedItems}
          isLoading={isLoading}
          itemsPerPage={ITEMS_PER_PAGE}
          hasMore={hasMore}
          onLoadMore={loadMore}
          renderItem={(item) => <PodcastCard key={item.id} podcast={item} />}
          loadingComponent={
            <div className="col-span-full flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          }
        />
      </main>
    </Layout>
  );
};

export default Home;