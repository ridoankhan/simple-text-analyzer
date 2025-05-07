import { analyzeText } from '../services/text.service'

describe('Text Analysis Service', () => {
  const sampleText =
    'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.'

  it('should return the correct word count', () => {
    const result = analyzeText(sampleText)
    expect(result.wordCount).toBe(16)
  })

  it('should return the correct character count', () => {
    const result = analyzeText(sampleText)
    expect(result.characterCount).toBe(58)
  })

  it('should return the correct sentence count', () => {
    const result = analyzeText(sampleText)
    expect(result.sentenceCount).toBe(2)
  })

  it('should return the correct paragraph count', () => {
    const result = analyzeText(sampleText)
    expect(result.paragraphCount).toBe(1)
  })

  // it('should return the longest word in each paragraph', () => {
  //   const result = analyzeText(sampleText)
  //   expect(result.longestWords).toEqual(['jumps'])
  // })
})
