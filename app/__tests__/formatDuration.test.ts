import { formatDuration } from '@/utils/formatDuration'

test('formatDuration correctly formats seconds to minutes:seconds', () => {
  expect(formatDuration(65)).toBe('1:05')
  expect(formatDuration(3600)).toBe('60:00')
  expect(formatDuration(0)).toBe('0:00')
})
