import React from 'react'
import { waitFor } from '@testing-library/react-native'
import * as api from '@/services/api';
import { catalogData } from '@/data/catalog';

jest.mock('@/services/api');
const fetchCatalogMock = api.fetchCatalog as jest.Mock;
fetchCatalogMock.mockResolvedValue(catalogData);

import HomeScreen from '@/app/index'
import { renderWithQueryClient } from '@/utils/test-utils'


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
  const { findAllByTestId } = renderWithQueryClient(<HomeScreen />);

  const videoItems = await findAllByTestId('video-item', {});
  expect(videoItems.length).toBe(catalogData.items.length);
});

test('HomeScreen handles empty data gracefully', async () => {
  (api.fetchCatalog as jest.Mock).mockResolvedValueOnce({ items: [] })

  const { getByText } = renderWithQueryClient(<HomeScreen />)

  await waitFor(() => {
    expect(getByText('No videos available')).toBeTruthy()
  })
})
