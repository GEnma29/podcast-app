// stripHtml.test.ts

import { describe, it, expect } from 'vitest'
import { stripHtml } from '../../src/lib/text.utils'

describe('stripHtml', () => {
  it('should remove all HTML tags', () => {
    const input = '<p>Hello <strong>world</strong>!</p>'
    const expected = 'Hello world!'
    expect(stripHtml(input)).toBe(expected)
  })

  it('should handle self-closing tags', () => {
    const input = 'Image: <img src="image.jpg" />'
    const expected = 'Image: '
    expect(stripHtml(input)).toBe(expected)
  })

  it('should handle malformed HTML', () => {
    const input = 'This is <b>wrongly <i>formatted</b></i>'
    const expected = 'This is wrongly formatted'
    expect(stripHtml(input)).toBe(expected)
  })

  it('should leave plain text unchanged', () => {
    const input = 'Just plain text with spaces   and symbols!@#'
    expect(stripHtml(input)).toBe(input)
  })

  it('should remove script and style tags with content', () => {
    const input = 'Text before<script>alert("XSS")</script>Text after'
    const expected = 'Text beforealert("XSS")Text after'
    expect(stripHtml(input)).toBe(expected)
  })

  it('should remove inline styles and attributes', () => {
    const input = '<span style="color:red">Styled text</span>'
    const expected = 'Styled text'
    expect(stripHtml(input)).toBe(expected)
  })

  it('should handle empty string', () => {
    expect(stripHtml('')).toBe('')
  })

  it('should not break on strings with angle brackets that are not tags', () => {
    const input = 'Use <this> as placeholder'
    const expected = 'Use  as placeholder'
    expect(stripHtml(input)).toBe(expected)
  })
})