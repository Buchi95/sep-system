import request from 'supertest'
import { app } from '../../app.js'

/**
 * @jest-environment node
 */

// tdd approach tests
// create new event request
describe('New Event Request', () => {
  it('creates a new event request with success 201', async () => {
    const token = await global.getAuthToken()

    const eventRequest = {
      clientName: 'clientName',
      clientContact: 'clientContact',
      eventType: 1,
      from: Date.now(),
      to: Date.now(),
      numOfAttendees: 20,
      expectedBudget: 1000,
      preferences: [1, 2, 3],
      eventRequestStatus: 1,
    }

    const response = await request(app)
      .post('/api/event/request/create')
      .set('Authorization', 'Bearer ' + token)
      .send(eventRequest)
      .expect(201)
  })
})
