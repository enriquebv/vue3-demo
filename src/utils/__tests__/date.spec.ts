import { dateToRelative } from '../date'
import { describe, expect, it } from 'vitest'

describe('date utils', () => {
  describe('dateToRelative', () => {
    it('should return a relative date', () => {
      const now = new Date()
      const TWO_MONTS_IN_MS = 1000 * 60 * 60 * 24 * 30 * 2
      const isoDate = new Date(now.getTime() - TWO_MONTS_IN_MS).toISOString()
      expect(dateToRelative(isoDate)).toBe('hace 2 meses')
    })

    it('should throw an error if the date is invalid', () => {
      const isoDate = 'invalid date'
      expect(() => dateToRelative(isoDate)).toThrow('Invalid date')
    })
  })
})
