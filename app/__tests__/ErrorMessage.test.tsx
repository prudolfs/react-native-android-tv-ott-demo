import React from 'react'
import { render } from '@testing-library/react-native'
import ErrorMessage from '@/components/ErrorMessage'

test('ErrorMessage displays the default error message', () => {
  const { getByText } = render(<ErrorMessage />)
  expect(getByText('Something went wrong. Please try again.')).toBeTruthy()
})

test('ErrorMessage displays custom error message', () => {
  const customMessage = 'Custom error occurred'
  const { getByText } = render(<ErrorMessage message={customMessage} />)
  expect(getByText(customMessage)).toBeTruthy()
})

test('ErrorMessage has the correct styling', () => {
  const { getByTestId } = render(<ErrorMessage testID="error-container" />)
  const errorContainer = getByTestId('error-container')

  expect(errorContainer.props.style).toMatchObject({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  })
})
