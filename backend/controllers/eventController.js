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

export { createNewEvent }
