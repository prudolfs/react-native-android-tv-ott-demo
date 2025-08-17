import { CatalogData } from '../types'

const reliableVideoUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
]

export const catalogData: CatalogData = {
  items: [
    {
      id: 'big-buck-bunny',
      title: 'Big Buck Bunny',
      description:
        'Three rodents amuse themselves by harassing creatures of the forest. However, the woodland creatures have a rather nasty response.',
      thumbnail:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      streamUrl: reliableVideoUrls[0],
      duration: 596,
    },
    {
      id: 'elephant-dream',
      title: 'Elephant Dream',
      description: 'The first Blender Open Movie from 2006',
      thumbnail:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg',
      streamUrl: reliableVideoUrls[1],
      duration: 653,
    },
    {
      id: 'for-bigger-blazes',
      title: 'For Bigger Blazes',
      description:
        'HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV.',
      thumbnail:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg',
      streamUrl: reliableVideoUrls[2],
      duration: 15,
    },
    {
      id: 'for-bigger-escapes',
      title: 'For Bigger Escapes',
      description:
        'Introducing Chromecast. The easiest way to enjoy online video and music on your TV.',
      thumbnail:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg',
      streamUrl: reliableVideoUrls[3],
      duration: 15,
    },
    {
      id: 'sintel',
      title: 'Sintel',
      description:
        'Sintel is an independently produced short film, initiated by the Blender Foundation.',
      thumbnail:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg',
      streamUrl: reliableVideoUrls[4],
      duration: 600,
    },
    {
      id: 'tears-of-steel',
      title: 'Tears of Steel',
      description:
        'Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender.',
      thumbnail:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg',
      streamUrl: reliableVideoUrls[5],
      duration: 734,
    },
  ],
}
