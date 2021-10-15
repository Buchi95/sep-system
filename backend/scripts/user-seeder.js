import dotenv from 'dotenv'
import colors from 'colors'

import users from './system-users.js'

import User from '../models/userModel.js'
import Client from '../models/clientModel.js'
import NewEventRequest from '../models/newRequestModel.js'
import NewEvent from '../models/newEventModel.js'

import connectDB from '../config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // wipe out db
    await User.deleteMany()
    await Client.deleteMany()
    await NewEventRequest.deleteMany()
    await NewEvent.deleteMany()

    // insert users
    const createdUsers = await User.insertMany(users)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // wipe out db
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
