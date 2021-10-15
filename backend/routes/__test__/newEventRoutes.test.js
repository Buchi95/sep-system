import request from 'supertest'
import { app } from '../../app.js'

/**
 * @jest-environment node
 */

// tdd approach tests
// create new event request
describe('New Event', () => {
  it('creates a new event with success 201', async () => {
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

    await request(app)
      .post('/api/event/request')
      .set('Authorization', 'Bearer ' + token)
      .send(eventRequest)
      .expect(201)

    const event = {
      clientName: 'clientName',
      clientContact: 'clientContact',
      eventType: 'CELEBRATION',
      description: 'Motherfucker',
      from: Date.now(),
      to: Date.now(),
      numOfAttendees: 20,
      plannedBudget: 1000,
      preferences: {
        decorations: 'Hello',
        food_drinks: 'its me',
        filming_photos: 'i was wondering',
        music: 'if after all these years',
        artwork: 'you want to meet',
        it: 'to go over everything',
        other: 'no.',
      },
      employee: employee,
    }

    await request(app)
      .post('/api/detailedevent/')
      .set('Authorization', 'Bearer ' + token)
      .send(event)
      .expect(201)
  })

  it('new event request fails with 400 for less budget and attendees', async () => {
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

    await request(app)
      .post('/api/event/request')
      .set('Authorization', 'Bearer ' + token)
      .send(eventRequest)
      .expect(201)

    const event = {
      clientName: 'clientName',
      clientContact: 'clientContact',
      eventType: 'CELEBRATION',
      description: 'Motherfucker',
      from: Date.now(),
      to: Date.now(),
      numOfAttendees: 2,
      plannedBudget: 100,
      preferences: {
        decorations: 'Hello',
        food_drinks: 'its me',
        filming_photos: 'i was wondering',
        music: 'if after all these years',
        artwork: 'you want to meet',
        it: 'to go over everything',
        other: 'no.',
      },
      employee: employee,
    }

    await request(app)
      .post('/api/detailedevent/')
      .set('Authorization', 'Bearer ' + token)
      .send(event)
      .expect(400)
  })
})
