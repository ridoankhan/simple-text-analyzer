import request from 'supertest'
import app from '../app'
import sequelize from '../config/database'
import Text from '../models/text.model'

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Force sync to ensure the database is clean
})

afterAll(async () => {
  await sequelize.close()
})

describe('Text Analysis API', () => {
  let textId: string

  it('should create a new text', async () => {
    const response = await request(app).post('/api/v1/texts').send({
      content: 'The quick brown fox jumps over the lazy dog.',
      createdBy: 'user1',
    })

    expect(response.status).toBe(201)
    expect(response.body.content).toBe(
      'The quick brown fox jumps over the lazy dog.'
    )
    textId = response.body.id
  })

  it('should return the word count of a text', async () => {
    const response = await request(app).get(
      `/api/v1/texts/${textId}/word-count`
    )
    expect(response.status).toBe(200)
    expect(response.body.wordCount).toBe(9)
  })

  it('should return the character count of a text', async () => {
    const response = await request(app).get(
      `/api/v1/texts/${textId}/character-count`
    )
    expect(response.status).toBe(200)
    expect(response.body.characterCount).toBe(35)
  })

  it('should return the sentence count of a text', async () => {
    const response = await request(app).get(
      `/api/v1/texts/${textId}/sentence-count`
    )
    expect(response.status).toBe(200)
    expect(response.body.sentenceCount).toBe(1)
  })

  it('should return the paragraph count of a text', async () => {
    const response = await request(app).get(
      `/api/v1/texts/${textId}/paragraph-count`
    )
    expect(response.status).toBe(200)
    expect(response.body.paragraphCount).toBe(1)
  })

  // write the test for the longest words in paragraphs of a text
  it('should return the longest words in paragraphs of a text', async () => {
    const response = await request(app).get(
      `/api/v1/texts/${textId}/longest-words`
    )
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.longestWords).toContain('quick')
    expect(response.body.longestWords).toContain('brown')
    expect(response.body.longestWords).toContain('jumps')
  })
})
