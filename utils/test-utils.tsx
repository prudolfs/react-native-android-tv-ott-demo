import React from 'react'
import { render } from '@testing-library/react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function renderWithQueryClient(
  ui: React.ReactElement,
  preloadedData?: Record<string, any>,
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  })
  

  if (preloadedData) {
    for (const key in preloadedData) {
      queryClient.setQueryData([key], preloadedData[key])
    }
  }

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}
