import React, { useEffect, useState, useRef } from 'react'
import { View, StyleSheet, BackHandler, Text, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Video, { VideoRef } from 'react-native-video'
import { catalogData } from '@/data/catalog'
import LoadingIndicator from '@/components/LoadingIndicator'
import ErrorMessage from '@/components/ErrorMessage'
import type { VideoItem } from '@/types'

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const videoRef = useRef<VideoRef>(null)
  const [video, setVideo] = useState<VideoItem | null>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [videoLoading, setVideoLoading] = useState(true)
  const [error, setError] = useState(false)
  const [playerError, setPlayerError] = useState(false)

  useEffect(() => {
    try {
      const foundVideo = catalogData.items.find((item) => item.id === id)
      if (foundVideo) {
        setVideo(foundVideo)
      } else {
        setError(true)
      }
    } catch (err) {
      setError(true)
    } finally {
      setDataLoading(false)
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        router.back()
        return true
      },
    )

    return () => backHandler.remove()
  }, [id])

  const handleBackPress = () => {
    router.back()
  }

  if (dataLoading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    )
  }

  if (error || !video) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Failed to load video. The stream might be unavailable." />
      </View>
    )
  }

  if (playerError) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Failed to play video. The stream might be unavailable." />
        <Pressable
          style={({ focused }) => [
            styles.backButton,
            focused && styles.focusedButton,
          ]}
          onPress={handleBackPress}
          hasTVPreferredFocus={true}
        >
          <Text style={styles.backButtonText}>Back to Details</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: video?.streamUrl }}
        style={styles.videoPlayer}
        resizeMode="contain"
        controls={Boolean(!videoLoading && true)}
        onError={() => setPlayerError(true)}
        onLoadStart={() => setVideoLoading(true)}
        onLoad={() => setVideoLoading(false)}
      />
      {videoLoading && <LoadingIndicator />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  focusedButton: {
    backgroundColor: '#555',
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
  },
})
