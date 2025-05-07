import request from 'supertest'
import app from '../app'
import sequelize from '../config/database'
import Text from '../models/text.model'

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

afterAll(async () => {
  await sequelize.close()
})

describe('Text API', () => {
  let textId: string

  it('should create a new text', async () => {
    const response = await request(app)
      .post('/api/texts')
      .send({ content: 'The quick brown fox.', createdBy: 'user1' })

    expect(response.status).toBe(201)
    expect(response.body.content).toBe('The quick brown fox.')
    textId = response.body.id
  })

  it('should fetch all texts', async () => {
    const response = await request(app).get('/api/texts')
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
  })

  it('should fetch a text by ID', async () => {
    const response = await request(app).get(`/api/texts/${textId}`)
    expect(response.status).toBe(200)
    expect(response.body.content).toBe('The quick brown fox.')
  })

  it('should update a text', async () => {
    const response = await request(app)
      .put(`/api/texts/${textId}`)
      .send({ content: 'The quick brown fox jumps over the lazy dog.' })

    expect(response.status).toBe(200)
    expect(response.body.content).toBe(
      'The quick brown fox jumps over the lazy dog.'
    )
  })

  it('should delete a text', async () => {
    const response = await request(app).delete(`/api/texts/${textId}`)
    expect(response.status).toBe(204)
  })

  it('should analyze a text', async () => {
    const createResponse = await request(app).post('/api/texts').send({
      content: 'The quick brown fox jumps over the lazy dog.',
      createdBy: 'user1',
    })

    const analyzeResponse = await request(app).get(
      `/api/texts/${createResponse.body.id}/analyze`
    )
    expect(analyzeResponse.status).toBe(200)
    expect(analyzeResponse.body.wordCount).toBe(9)
  })
})
