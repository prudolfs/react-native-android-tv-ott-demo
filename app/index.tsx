import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native'
import { useRouter } from 'expo-router'
import { catalogData } from '@/data/catalog'
import LoadingIndicator from '@/components/LoadingIndicator'
import ErrorMessage from '@/components/ErrorMessage'
import type { VideoItem } from '@/types'

export default function HomeScreen() {
  const router = useRouter()
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setVideos(catalogData.items)
        setLoading(false)
      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingIndicator />
  }

  if (error) {
    return <ErrorMessage message="Failed to load video catalog" />
  }

  const handleVideoSelect = (id: string) => {
    router.push({
      pathname: '/details/[id]',
      params: { id },
    })
  }

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <Pressable
      style={({ focused }) => [
        styles.itemContainer,
        focused && styles.focusedItem,
      ]}
      onPress={() => handleVideoSelect(item.id)}
      hasTVPreferredFocus={item.id === videos[0]?.id}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
    </Pressable>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Video Catalog</Text>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 40,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  grid: {
    paddingBottom: 20,
  },
  itemContainer: {
    width: '30%',
    marginHorizontal: '1.65%',
    marginBottom: 30,
  },
  focusedItem: {
    transform: [{ scale: 1.05 }],
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
})
