import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>id: {id}</Text>
    </View>
  )
}
