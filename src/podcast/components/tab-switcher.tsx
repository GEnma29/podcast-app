"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import StartSm from "@/components/icons/start-sm"
import useFavoritePodcastStore from "../stores/favorite.store"

export default function TabSwitcher() {
  const navigate = useNavigate()
  const { tab } = useParams<{tab: "trending" | "favorites"}>()
  const [activeTab, setActiveTab] = useState<"trending" | "favorites">(tab ?? "trending")
  const { count } = useFavoritePodcastStore();

   const handleTabClick = (tab: "trending" | "favorites") => {
    setActiveTab(tab)
    navigate(`/${tab}`) // Adjust this route to match your structure
  }

  return (
    <div className="flex py-4 items-center space-x-3 font-medium">
      <button
        onClick={() => handleTabClick("trending")}
        className={`px-5 py-2 rounded-full transition-colors ${
          activeTab === "trending" ? "bg-[#0f0b26] text-white" : "bg-white text-gray-700 border border-gray-300"
        }`}
      >
        Trending
      </button>
      <button
        onClick={() => handleTabClick("favorites")}
        className={`px-5 py-2 rounded-full flex items-center space-x-2 transition-colors ${
          activeTab === "favorites" ? "bg-[#0f0b26] text-white" : "bg-white text-gray-700 border border-gray-300"
        }`}
      >
        <StartSm isActive ={ activeTab === 'favorites'} />
        <span>Favoritos</span>
        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full">
          {count}
        </span>
      </button>
    </div>
  )
}
