import { CatalogData } from '../types'

export const catalogData: CatalogData = {
  items: [
    {
      id: 'bbb-hls',
      title: 'Big Buck Bunny (HLS)',
      description: 'Short animated film used as a demo stream.',
      thumbnail: 'https://i.imgur.com/8GVG6Zp.jpeg',
      streamUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      duration: 596,
    },
    {
      id: 'sintel-mp4',
      title: 'Sintel (MP4)',
      description: 'Open movie — MP4 fallback.',
      thumbnail: 'https://i.imgur.com/DvpvklR.png',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      duration: 888,
    },
    {
      id: 'tears-hls',
      title: 'Tears of Steel (HLS)',
      description: 'Open movie — HLS stream.',
      thumbnail: 'https://i.imgur.com/fHyEMsl.png',
      streamUrl: 'https://test-streams.mux.dev/tears-of-steel/playlist.m3u8',
      duration: 734,
    },
    {
      id: 'elephants-mp4',
      title: 'Elephant Dream (MP4)',
      description: 'Open movie — MP4 demo.',
      thumbnail: 'https://i.imgur.com/Yo3j8kG.png',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: 653,
    },
    {
      id: 'bbb-mp4',
      title: 'Big Buck Bunny (MP4)',
      description: 'MP4 fallback of BBB.',
      thumbnail: 'https://i.imgur.com/8GVG6Zp.jpeg',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: 596,
    },
    {
      id: 'for-bigger-joyrides',
      title: 'For Bigger Joyrides (MP4)',
      description: 'Short demo clip.',
      thumbnail: 'https://i.imgur.com/DvpvklR.png',
      streamUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      duration: 75,
    },
  ],
}
