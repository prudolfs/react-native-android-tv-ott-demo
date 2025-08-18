import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type ErrorMessageProps = {
  message?: string
}

export default function ErrorMessage({
  message = 'Something went wrong. Please try again.',
}: ErrorMessageProps) {
  return (
    <View style={styles.container} testID="error-message">
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
