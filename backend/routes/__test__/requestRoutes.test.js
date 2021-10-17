import request from 'supertest'
import { app } from '../../app.js'

describe('New Budget Request', () => {
  it('creates a new budget and staff request with success 201', async () => {
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
      description: 'event',
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
      eventStatus: 1,
      employee: employee,
    }

    const eventResponse = await request(app)
      .post('/api/detailedevent/')
      .set('Authorization', 'Bearer ' + token)
      .send(event)
      .expect(201)

    const budgetRequest = {
      requestingDepartment: 'Production_Department',
      projectRef: eventResponse.body._id,
      requiredAmount: 2000,
      reason: 'extra decorations',
      status: 1,
    }

    const staffRequest = {
      requestingDepartment: 'Production_Department',
      projectRef: eventResponse.body._id,
      contract: 'part_time',
      experience: '1 year',
      jobTitle: 'Graphic Designer',
      jobDescription:
        'A experience graphic designer having an eye for UX Design',
      status: 1,
    }

    await request(app)
      .post('/api/request/budget')
      .set('Authorization', 'Bearer ' + token)
      .send(budgetRequest)
      .expect(201)

    await request(app)
      .post('/api/request/staff')
      .set('Authorization', 'Bearer ' + token)
      .send(staffRequest)
      .expect(201)
  })
})
