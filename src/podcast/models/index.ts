
export interface PodcastFeed {
  id: number;
  title: string;
  url: string;
  originalUrl: string;
  link: string;
  description: string;
  author: string;
  ownerName: string;
  image: string;
  artwork: string;
  lastUpdateTime: number;
  lastCrawlTime: number;
  lastParseTime: number;
  inPollingQueue: number;
  priority: number;
  lastGoodHttpStatusTime: number;
  lastHttpStatus: number;
  contentType: string;
  itunesId: number | null;
  generator: string;
  language: string;
  type: number;
  dead: number;
  crawlErrors: number;
  parseErrors: number;
  categories: Record<string, string>;
  locked: number;
  explicit: boolean;
  podcastGuid: string;
  medium: string;
  episodeCount: number;
  imageUrlHash: number;
  newestItemPubdate: number;
}

export interface PodcastSearchResponse {
  status: string;
  feeds: PodcastFeed[];
  count: number;
  query: string;
  description: string;
}

// models/PodcastClip.ts
export interface ResponseEpisode {
    status:      string;
    liveItems:   any[];
    items:       Episode[];
    count:       number;
    query:       string;
    description: string;
}

export interface Episode {
    id:                  number;
    title:               string;
    link:                string;
    description:         string;
    guid:                string;
    datePublished:       number;
    datePublishedPretty: string;
    dateCrawled:         number;
    enclosureUrl:        string;
    enclosureType:       EnclosureType;
    enclosureLength:     number;
    duration:            number;
    explicit:            number;
    episode:             number | null;
    episodeType:         EpisodeType;
    season:              number;
    image:               string;
    feedItunesId:        null;
    feedUrl:             string;
    feedImage:           string;
    feedId:              number;
    podcastGuid:         string;
    feedLanguage:        FeedLanguage;
    feedDead:            number;
    feedDuplicateOf:     null;
    chaptersUrl:         null;
    transcriptUrl:       null | string;
    transcripts?:        Transcript[];
}

export type EnclosureType = "audio/mpeg";

export type EpisodeType = "full" | "trailer";

export type FeedLanguage = "en";

export interface Transcript {
    url:  string;
    type: Type;
}

export type Type = "text/html";
