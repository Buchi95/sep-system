import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import Client from '../models/clientModel.js'
import NewEvent from '../models/newEventModel.js'

/*
 *   @desc   Create a new event
 *   @route  POST /api/detailedevent/
 *   @access Private
 */
const createNewEvent = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    _clientName,
    clientContact,
    eventType,
    description,
    from,
    to,
    numOfAttendees,
    plannedBudget,
    preferences,
    eventStatus,
    employee,
  } = req.body

  const clientExists = await Client.findOne({ clientContact })

  if (clientExists) {
    const newEvent = await NewEvent.create({
      client: clientExists._id,
      eventType,
      description,
      from,
      to,
      numOfAttendees,
      plannedBudget,
      preferences,
      eventStatus,
      employee,
    })

    if (newEvent) {
      res.status(201).json({
        _id: newEvent._id,
        eventType: newEvent.eventType,
        description: newEvent.description,
        from: newEvent.from,
        to: newEvent.to,
        numOfAttendees: newEvent.numOfAttendees,
        plannedBudget: newEvent.plannedBudget,
        preferences: newEvent.preferences,
        eventStatus: newEvent.eventStatus,
        employee: newEvent.employee,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } else {
    res.status(400)
    throw new Error('Invalid client data')
  }
})

/*
 *   @desc   Get an event on the basis of status
 *   @route  GET /api/detailedevent/:eventStatus
 *   @access Private
 */
const getEvent = asyncHandler(async (req, res) => {
  const event = await NewEvent.find({
    eventStatus: req.params.eventStatus,
  })

  if (event) {
    res.status(200).json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

/*
 *   @desc   Get an event on the basis of status
 *   @route  GET /api/detailedevent/eve/:eveid
 *   @access Private
 */
const getEventById = asyncHandler(async (req, res) => {
  const event = await NewEvent.findById(req.params.eveid)

  if (event) {
    res.status(200).json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

/*
 *   @desc   Get all events
 *   @route  GET /api/detailedevent/
 *   @access Private
 */
const getAllEvents = asyncHandler(async (_req, res) => {
  const events = await NewEvent.find({})

  res.status(200).json(events)
})

/*
 *   @desc   Update Event request status
 *   @route  PUT /api/detailedevent/
 *   @access Private
 */
const updateEventStatus = asyncHandler(async (req, res) => {
  const { id, eventStatus } = req.body

  const event = await NewEvent.findById(id)

  if (event) {
    if (eventStatus) {
      event.eventStatus = eventStatus
    }

    const updatedEvent = await event.save()

    res.status(204).json(updatedEvent) // updated 204
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

export {
  createNewEvent,
  getEvent,
  getAllEvents,
  updateEventStatus,
  getEventById,
}
