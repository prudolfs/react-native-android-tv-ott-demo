import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="details/[id]" options={{ title: 'Details' }} />
        <Stack.Screen name="player/[id]" options={{ title: 'Player' }} />
      </Stack>
    </QueryClientProvider>
  )
}
