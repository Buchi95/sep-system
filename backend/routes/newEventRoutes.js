import express from 'express'
import { body } from 'express-validator'
const router = express.Router()

import { protect } from '../middleware/authMiddleware.js'
import {
  createNewEvent,
  getEvent,
  getAllEvents,
  updateEventStatus,
} from '../controllers/eventController.js'

router
  .route('/')
  .post(
    protect,
    [
      body('clientName').notEmpty().withMessage('Client name must be valid'),
      body('clientContact')
        .notEmpty()
        .withMessage('Client contact must be valid'),
      body('eventType').notEmpty().withMessage('Event type must be valid'),
      body('description').notEmpty().withMessage('Description needed'),
      body('from').notEmpty().withMessage('From date must be valid'),
      body('to').notEmpty().withMessage('to date must be valid'),
      body('numOfAttendees')
        .notEmpty()
        .isInt({ min: 10 })
        .withMessage('Number of attendess should be 10 or greater than 10'),
      body('plannedBudget')
        .notEmpty()
        .isInt({ min: 1000 })
        .withMessage(
          'Expected budget must be 1000 sek or greater than 1000 sek'
        ),
      body('eventStatus').notEmpty().withMessage('Event Status must be valid'),
    ],
    createNewEvent
  )
  .get(protect, getAllEvents)
  .put(
    protect,
    [
      body('id').notEmpty().withMessage('Id of event needed for update'),
      body('eventStatus')
        .notEmpty()
        .withMessage('Event Status should be valid'),
    ],
    updateEventStatus
  )

router.route('/:eventStatus').get(protect, getEvent)

export default router
