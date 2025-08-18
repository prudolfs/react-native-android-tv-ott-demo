global.__ExpoImportMetaRegistry = {}

import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    navigate: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({ id: 'bbb-hls' }),
}))
jest.mock('react-native-video', () => 'Video')
jest.mock('expo-constants', () => ({ manifest: {} }))
