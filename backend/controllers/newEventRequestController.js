import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import Client from '../models/clientModel.js'
import NewRequest from '../models/newRequestModel.js'

/*
 *   @desc   Create a new event request
 *   @route  POST /api/event/request
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
    employee,
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
      employee,
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
        employee: newEventRequest.employee,
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
        employee,
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
          employee: newEventRequestWithNewClient.employee,
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

/*
 *   @desc   Get an event on the basis of status
 *   @route  GET /api/event/request/:eventRequestStatus
 *   @access Private
 */
const getEventRequest = asyncHandler(async (req, res) => {
  const eventRequest = await NewRequest.find({
    eventRequestStatus: req.params.eventRequestStatus,
  })

  if (eventRequest) {
    res.status(200).json(eventRequest)
  } else {
    res.status(404)
    throw new Error('Event request not found')
  }
})

/*
 *   @desc   Get all event requests for senior customer service
 *   @route  GET /api/event/request/
 *   @access Private
 */
const getAllEventRequests = asyncHandler(async (_req, res) => {
  const requests = await NewRequest.find({})

  res.status(200).json(requests)
})

/*
 *   @desc   Update Event request status
 *   @route  PUT /api/event/request/
 *   @access Private
 */
const updateEventRequestStatus = asyncHandler(async (req, res) => {
  const { id, eventRequestStatus } = req.body

  const request = await NewRequest.findById(id)

  if (request) {
    if (eventRequestStatus) {
      request.eventRequestStatus = eventRequestStatus
    }

    const updatedRequest = await request.save()

    res.status(204).json(updatedRequest) // updated 204
  } else {
    res.status(404)
    throw new Error('Event request not found')
  }
})

export {
  createNewEventRequest,
  getEventRequest,
  getAllEventRequests,
  updateEventRequestStatus,
}
