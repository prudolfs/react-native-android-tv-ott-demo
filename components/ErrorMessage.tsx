import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type ErrorMessageProps = {
  testID?: string
  message?: string
}

export default function ErrorMessage({
  testID = 'error-message',
  message = 'Something went wrong. Please try again.',
}: ErrorMessageProps) {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#FF3B30',
    fontSize: 20,
    textAlign: 'center',
  },
})
