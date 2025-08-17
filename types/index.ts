type VideoItem = {
  id: string
  title: string
  description: string
  thumbnail: string
  streamUrl: string
  duration: number
}

type CatalogData = {
  items: VideoItem[]
}

export type { VideoItem, CatalogData }
