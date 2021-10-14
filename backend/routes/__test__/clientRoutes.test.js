import request from 'supertest'
import { app } from '../../app.js'

describe('Client Data', () => {
  it('get client data by id', async () => {
    const { token, employee } = await global.getAuthToken()

    const eventRequest = {
      clientName: 'clientName',
      clientContact: 'clientContact',
      eventType: 'CELEBRATION',
      from: Date.now(),
      to: Date.now(),
      numOfAttendees: 20,
      expectedBudget: 1000,
      preferences: ['DECORATIONS', 'PARTIES'],
      eventRequestStatus: 1,
      employee,
    }

    const response = await request(app)
      .post('/api/event/request')
      .set('Authorization', 'Bearer ' + token)
      .send(eventRequest)
      .expect(201)

    const response2 = await request(app)
      .get(`/api/event/request/${response.body.eventRequestStatus}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200)

    await request(app)
      .get(`/api/client/${response2.body[0].client}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200)
  })

  it('get all clients', async () => {
    const { token, _employee } = await global.getAuthToken()

    await request(app)
      .get(`/api/client/`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200)
  })
})
