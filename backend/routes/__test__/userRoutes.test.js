import request from 'supertest'
import { app } from '../../app.js'

// babel = transcompiler = convert backwords the new es6 back to old version
// babel plugins

/**
 * @jest-environment node
 */

// tdd approach tests
// user registration
describe('User Registration', () => {
  it(`returns a 201 on successful signup of user`, async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(201)
      .expect('Content-Type', /json/)
  })

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'testtest',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(400)
  })

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'testtest',
        password: 'pa',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(400)
  })

  it('returns a 400 with missing email and password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(400)
  })

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(201)

    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(400)
  })

  it('sets a token after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(201)

    expect(response.body.token).toBeDefined()
  })
})

// tdd approach tests
// user login
describe('User Login', () => {
  it('fails when a email that does not exists in system is supplied', async () => {
    return request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400)
  })

  it('fails when incorrect password is supplied', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(201)

    await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: 'passw',
      })
      .expect(400)
  })

  it('response with a token when given valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'name',
        email: 'test@test.com',
        password: 'password',
        role: 'Administration_Manager',
        department: 'Administration_Department',
      })
      .expect(201)

    const response = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200)

    expect(response.body.token).toBeDefined()
  })
})

describe('User Profile', () => {
  it('responds with details about current user', async () => {
    const { token, employee } = await global.getAuthToken()

    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', 'Bearer ' + token)
      .send()
      .expect(200)

    expect(response.body.email).toEqual('test@test.com')
  })

  it('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .send()
      .expect(401)

    expect(response.body.currentUser).toEqual(undefined)
  })
})

describe('Assign task to User', () => {
  it('responds with assigned task to user', async () => {
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

    const eventRes = await request(app)
      .post('/api/detailedevent/')
      .set('Authorization', 'Bearer ' + token)
      .send(event)
      .expect(201)

    const response = await request(app)
      .put('/api/users')
      .set('Authorization', 'Bearer ' + token)
      .send({
        employee: employee,
        description: 'Simple Task',
        priority: 'Medium',
        active: true,
        projectRef: eventRes.body._id,
      })
      .expect(204)
  })
})
