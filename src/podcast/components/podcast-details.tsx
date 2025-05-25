import { stripHtml } from "@/lib/text.utils"

interface PodcastDetailsProps {
  podcast: {
    artwork: string
    image: string
    title: string
    description: string
    episodeCount: number
  }
  opacity: number
  scale: number
}

//TODO: move this function to a utils file


export function PodcastDetails({ podcast, opacity, scale }: PodcastDetailsProps) {

  const descriptionOpacity = Math.max(0, opacity * 2 - 1)

  return (
    <div className="flex flex-col items-center px-6 pt-2 pb-6 transition-all duration-200">
      <div className="relative mb-4 transition-all duration-200" style={{ transform: `scale(${scale})` }}>
        <img
          src={podcast.artwork || podcast.image}
          alt={podcast.title}
          width={120}
          height={120}
          className="rounded-2xl"
        />
      </div>

      <h1
        className="text-2xl font-bold text-center mb-2 transition-all duration-200"
        style={{
          transform: `scale(${Math.max(0.8, scale)})`,
          marginBottom: scale < 0.9 ? "0" : "0.5rem",
        }}
      >
        {podcast.title}
      </h1>

      <div
        className="text-sm text-center text-gray-300 mb-4 transition-opacity duration-200"
        style={{
          opacity: descriptionOpacity,
          maxHeight: descriptionOpacity > 0 ? "200px" : "0",
          overflow: "hidden",
        }}
      >
        {stripHtml(podcast.description)}
      </div>

      <div
        className="text-gray-400 text-sm mb-4 transition-opacity duration-200"
        style={{ opacity: Math.min(1, opacity * 1.5) }}
      >
        {podcast.episodeCount} episodios
      </div>
    </div>
  )
}
