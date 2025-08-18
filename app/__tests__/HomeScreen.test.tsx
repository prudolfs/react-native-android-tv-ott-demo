import React from 'react'
import { waitFor } from '@testing-library/react-native'
import HomeScreen from '@/app/index'
import { renderWithQueryClient } from '@/utils/test-utils'

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

test('HomeScreen displays loading indicator initially', () => {
  const { getByTestId } = renderWithQueryClient(<HomeScreen />)
  expect(getByTestId('loading-indicator')).toBeTruthy()
})

test('HomeScreen displays video catalog after loading', async () => {
  const { getByText } = renderWithQueryClient(<HomeScreen />)

  await waitFor(() => {
    expect(getByText('Video Catalog')).toBeTruthy()
  })
})

test('HomeScreen displays correct number of video items', async () => {
  const { getAllByTestId } = renderWithQueryClient(<HomeScreen />)

  await waitFor(() => {
    const videoItems = getAllByTestId('video-item')
    expect(videoItems.length).toBe(6)
  })
})

test('HomeScreen handles empty data gracefully', async () => {
  // Mock the catalog data to be empty
  jest.mock('../data/catalog', () => ({
    catalogData: { items: [] },
  }))

  const { getByText } = renderWithQueryClient(<HomeScreen />)

  await waitFor(() => {
    expect(getByText('No videos available')).toBeTruthy()
  })

  // Reset mock to not affect other tests
  jest.resetModules()
})
