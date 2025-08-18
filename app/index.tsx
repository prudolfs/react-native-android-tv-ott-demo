import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import LoadingIndicator from '@/components/LoadingIndicator'
import ErrorMessage from '@/components/ErrorMessage'
import type { VideoItem } from '@/types'
import { fetchCatalog } from '@/services/api'

export default function HomeScreen() {
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog'],
    queryFn: fetchCatalog,
  })

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingIndicator />
      </View>
    )
  }

  if (error || !data) {
    return (
      <View style={styles.container}>
        <ErrorMessage message="Failed to load video catalog" />
      </View>
    )
  }

  const handleVideoSelect = (id: string) => {
    router.push({
      pathname: '/details/[id]',
      params: { id },
    })
  }

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <Pressable
      testID={`video-item-${item.id}`}
      style={({ focused }) => [
        styles.itemContainer,
        focused && styles.focusedItem,
      ]}
      onPress={() => handleVideoSelect(item.id)}
      hasTVPreferredFocus={item.id === data?.items[0]?.id}
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
        data={data.items}
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
