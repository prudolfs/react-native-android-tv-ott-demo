export type VideoItem = {
  id: string
  title: string
  description: string
  thumbnail: string
  streamUrl: string
  duration: number
}

export type CatalogData = {
  items: VideoItem[]
}
