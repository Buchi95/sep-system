import request from 'supertest'
import { app } from '../../app.js'

/**
 * @jest-environment node
 */

// tdd approach tests
// create new event request
describe('New Event Request', () => {
  it('creates a new event request with success 201', async () => {
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
  })

  it('returns all requests', async () => {
    const { token, employee } = await global.getAuthToken()

    await request(app)
      .get('/api/event/request')
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200)
  })

  it('returns specific event request by event status', async () => {
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

    await request(app)
      .get(`/api/event/request/${response.body.eventRequestStatus}`)
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200)
  })

  it('updates specific event request status', async () => {
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

    await request(app)
      .put(`/api/event/request`)
      .set('Authorization', 'Bearer ' + token)
      .send({
        id: response.body._id,
        eventRequestStatus: 2,
      })
      .expect(204)
  })

  it('request fails when num of attendees and budget is less', async () => {
    const { token, employee } = await global.getAuthToken()

    const eventRequest = {
      clientName: 'clientName',
      clientContact: 'clientContact',
      eventType: 'CELEBRATION',
      from: Date.now(),
      to: Date.now(),
      numOfAttendees: 2,
      expectedBudget: 800,
      preferences: ['DECORATIONS', 'PARTIES'],
      eventRequestStatus: 1,
      employee,
    }

    const response = await request(app)
      .post('/api/event/request')
      .set('Authorization', 'Bearer ' + token)
      .send(eventRequest)
      .expect(400)
  })
})
