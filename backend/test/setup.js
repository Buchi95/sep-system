import 'regenerator-runtime/runtime'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app.js'
import request from 'supertest'

let mongod

beforeAll(async () => {
  process.env.JWT_KEY = 'testing_jwt'

  mongod = new MongoMemoryServer()
  await mongod.start()
  const mongoUri = mongod.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (let c of collections) {
    await c.deleteMany({})
  }
})

afterAll(async () => {
  await mongod.stop()
  await mongoose.connection.close()
})

global.getAuthToken = async () => {
  const name = 'name'
  const email = 'test@test.com'
  const password = 'password'
  const role = 'Administration_Manager'
  const department = 'Administration_Department'

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name,
      email,
      password,
      role,
      department,
    })
    .expect(201)

  const token = response.body.token
  const employee = response.body._id

  return { token, employee }
}
