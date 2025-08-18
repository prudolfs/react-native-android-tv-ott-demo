import React from 'react'
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import LoadingIndicator from '@/components/LoadingIndicator'
import ErrorMessage from '@/components/ErrorMessage'
import { formatDuration } from '@/utils/formatDuration'
import { fetchCatalog } from '@/services/api'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
  })

  if (isLoading) {
    return <LoadingIndicator />
  }

  const video = data?.items.find((item) => item.id === id)

  if (error || !video) {
    return <ErrorMessage message="Video details not found" />
  }

  const handlePlayVideo = () => {
    if (video) {
      router.push({
        pathname: '/player/[id]',
        params: { id: video.id },
      })
    }
  }

  const handleBackPress = () => {
    router.back()
  }

  return (
    <View style={styles.container} testID="details-screen">
      <Pressable
        style={({ focused }) => [
          styles.backButton,
          focused && styles.focusedButton,
        ]}
        onPress={handleBackPress}
        hasTVPreferredFocus={false}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <View style={styles.content}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          testID="video-thumbnail"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.duration}>{formatDuration(video.duration)}</Text>
          <Text style={styles.description}>{video.description}</Text>

          <Pressable
            style={({ focused }) => [
              styles.playButton,
              focused && styles.focusedButton,
            ]}
            onPress={handlePlayVideo}
            hasTVPreferredFocus={true}
          >
            <Text style={styles.playButtonText}>▶ Play</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: '40%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginRight: 40,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  duration: {
    color: '#999',
    fontSize: 18,
    marginBottom: 20,
  },
  description: {
    color: 'white',
    fontSize: 20,
    lineHeight: 28,
    marginBottom: 40,
  },
  playButton: {
    backgroundColor: '#E50914',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  focusedButton: {
    backgroundColor: '#F40612',
    transform: [{ scale: 1.05 }],
  },
  playButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
})
