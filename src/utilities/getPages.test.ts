import { describe, expect, it } from 'vitest'

import getPages from './getPages'

describe('getPages', () => {
  describe('small total (total ≤ maxVisible)', () => {
    it('returns all pages when total equals maxVisible', () => {
      expect(getPages(1, 7, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it('returns all pages when total is less than maxVisible', () => {
      expect(getPages(1, 7, 3)).toEqual([1, 2, 3])
    })

    it('handles single page', () => {
      expect(getPages(1, 7, 1)).toEqual([1])
    })
  })

  describe('near-start zone (no left ellipsis)', () => {
    it('page 1 → [1 2 3 4 … 79 80]', () => {
      expect(getPages(1, 7, 80)).toEqual([1, 2, 3, 4, NaN, 79, 80])
    })

    it('page 2 → [1 2 3 4 … 79 80]', () => {
      expect(getPages(2, 7, 80)).toEqual([1, 2, 3, 4, NaN, 79, 80])
    })

    it('page 3 → [1 2 3 4 … 79 80]', () => {
      expect(getPages(3, 7, 80)).toEqual([1, 2, 3, 4, NaN, 79, 80])
    })
  })

  describe('middle zone (both ellipses)', () => {
    it('page 4 → [1 … 3 4 5 … 80]', () => {
      expect(getPages(4, 7, 80)).toEqual([1, NaN, 3, 4, 5, NaN, 80])
    })

    it('page 5 → [1 … 4 5 6 … 80]', () => {
      expect(getPages(5, 7, 80)).toEqual([1, NaN, 4, 5, 6, NaN, 80])
    })

    it('page 40 → [1 … 39 40 41 … 80]', () => {
      expect(getPages(40, 7, 80)).toEqual([1, NaN, 39, 40, 41, NaN, 80])
    })

    it('page 77 → [1 … 76 77 78 … 80]', () => {
      expect(getPages(77, 7, 80)).toEqual([1, NaN, 76, 77, 78, NaN, 80])
    })
  })

  describe('near-end zone (no right ellipsis)', () => {
    it('page 78 → [1 2 … 77 78 79 80]', () => {
      expect(getPages(78, 7, 80)).toEqual([1, 2, NaN, 77, 78, 79, 80])
    })

    it('page 79 → [1 2 … 77 78 79 80]', () => {
      expect(getPages(79, 7, 80)).toEqual([1, 2, NaN, 77, 78, 79, 80])
    })

    it('page 80 → [1 2 … 77 78 79 80]', () => {
      expect(getPages(80, 7, 80)).toEqual([1, 2, NaN, 77, 78, 79, 80])
    })
  })

  describe('output length', () => {
    it('always returns maxVisible items when total > maxVisible', () => {
      for (const page of [1, 4, 40, 77, 80]) {
        expect(getPages(page, 7, 80)).toHaveLength(7)
      }
    })
  })
})
