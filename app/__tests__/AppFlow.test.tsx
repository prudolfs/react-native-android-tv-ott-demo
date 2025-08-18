import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'
import HomeScreen from '@/app/index'
import DetailsScreen from '@/app/details/[id]'
import PlayerScreen from '@/app/player/[id]'
import { renderWithQueryClient } from '@/utils/test-utils'
import * as api from '@/services/api';
import { catalogData } from '@/data/catalog';

jest.mock('@/services/api');
const fetchCatalogMock = api.fetchCatalog as jest.Mock;
fetchCatalogMock.mockResolvedValue(catalogData);


const mockPush = jest.fn<void, [unknown]>()
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, navigate: mockPush, back: jest.fn() }),
  useLocalSearchParams: () => ({ id: 'bbb-hls' }),
}))

jest.mock('react-native-video', () => 'Video')

test('User can navigate from Home to Details screen', async () => {
  const { getAllByTestId } = renderWithQueryClient(<HomeScreen />)

  await waitFor(() => {
    const videoItems = getAllByTestId('video-item')
    expect(videoItems.length).toBeGreaterThan(0)
  })

  fireEvent.press(getAllByTestId('video-item')[0])
  expect(mockPush).toHaveBeenCalled()
})

test('Details screen displays video information correctly', async () => {
  const { getByText, getByTestId } = renderWithQueryClient(<DetailsScreen />)

  await waitFor(() => {
    expect(getByTestId('video-thumbnail')).toBeTruthy()
    expect(getByText('▶ Play')).toBeTruthy()
  })
})

test('User can navigate from Details to Player screen', async () => {
  const { getByText } = renderWithQueryClient(<DetailsScreen />)

  await waitFor(() => {
    const playButton = getByText('▶ Play')
    fireEvent.press(playButton)
    expect(mockPush).toHaveBeenCalled()
  })
})

test('Player screen renders video component', async () => {
  const { getByTestId } = renderWithQueryClient(<PlayerScreen />)

  await waitFor(() => {
    expect(getByTestId('video-player')).toBeTruthy()
  })
})
