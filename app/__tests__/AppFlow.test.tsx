import React from 'react'
import { fireEvent, waitFor } from '@testing-library/react-native'
import HomeScreen from '../index'
import DetailsScreen from '../details/[id]'
import PlayerScreen from '../player/[id]'
import { renderWithQueryClient } from './test-utils'

let mockPush = jest.fn()
let mockNavigate = jest.fn()
let mockBack = jest.fn()

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: (...args) => mockPush(...args),
    navigate: (...args) => mockNavigate(...args),
    back: () => mockBack(),
  }),
  useLocalSearchParams: () => ({
    id: 'bbb-hls',
  }),
}))

jest.mock('react-native-video', () => 'Video')

test('User can navigate from Home to Details screen', async () => {
  const { getAllByTestId } = renderWithQueryClient(<HomeScreen />)

  await waitFor(() => {
    const videoItems = getAllByTestId('video-item')
    expect(videoItems.length).toBeGreaterThan(0)
  })

  const firstVideo = getAllByTestId('video-item')[0]
  fireEvent.press(firstVideo)

  expect(mockPush).toHaveBeenCalled()
})

test('Details screen displays video information correctly', async () => {
  const { getByText, getByTestId } = renderWithQueryClient(<DetailsScreen />)

  await waitFor(() => {
    expect(getByTestId('video-thumbnail')).toBeTruthy()
    expect(getByText('Play')).toBeTruthy()
  })
})

test('User can navigate from Details to Player screen', async () => {
  const { getByText } = renderWithQueryClient(<DetailsScreen />)

  await waitFor(() => {
    const playButton = getByText('Play')
    expect(playButton).toBeTruthy()

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
