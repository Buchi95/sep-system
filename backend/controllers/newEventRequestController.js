import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import Client from '../models/clientModel.js'
import NewRequest from '../models/newRequestModel.js'

/*
 *   @desc   Create a new event request
 *   @route  POST /api/event/request/create
 *   @access Private
 */
const createNewEventRequest = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    clientName,
    clientContact,
    eventType,
    from,
    to,
    numOfAttendees,
    expectedBudget,
    preferences,
    eventRequestStatus,
  } = req.body

  const clientExists = await Client.findOne({ clientContact })

  if (clientExists) {
    const newEventRequest = await NewRequest.create({
      client: clientExists._id,
      eventType,
      from,
      to,
      numOfAttendees,
      expectedBudget,
      preferences,
      eventRequestStatus,
    })

    if (newEventRequest) {
      res.status(201).json({
        _id: newEventRequest._id,
        eventType: newEventRequest.eventType,
        from: newEventRequest.from,
        to: newEventRequest.to,
        numOfAttendees: newEventRequest.numOfAttendees,
        expectedBudget: newEventRequest.expectedBudget,
        preferences: newEventRequest.preferences,
        eventRequestStatus: newEventRequest.eventRequestStatus,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } else {
    const newClient = await Client.create({
      clientName,
      clientContact,
    })

    if (newClient) {
      const newEventRequestWithNewClient = await NewRequest.create({
        client: newClient._id,
        eventType,
        from,
        to,
        numOfAttendees,
        expectedBudget,
        preferences,
        eventRequestStatus,
      })

      if (newEventRequestWithNewClient) {
        res.status(201).json({
          _id: newEventRequestWithNewClient._id,
          eventType: newEventRequestWithNewClient.eventType,
          from: newEventRequestWithNewClient.from,
          to: newEventRequestWithNewClient.to,
          numOfAttendees: newEventRequestWithNewClient.numOfAttendees,
          expectedBudget: newEventRequestWithNewClient.expectedBudget,
          preferences: newEventRequestWithNewClient.preferences,
          eventRequestStatus: newEventRequestWithNewClient.eventRequestStatus,
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  }
})

export { createNewEventRequest }
