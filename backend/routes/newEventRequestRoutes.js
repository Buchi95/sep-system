import express from 'express'
import { body } from 'express-validator'
const router = express.Router()

import {
  createNewEventRequest,
  getEventRequest,
  getAllEventRequests,
  updateEventRequestStatus,
} from '../controllers/newEventRequestController.js'

import { protect } from '../middleware/authMiddleware.js'

router
  .route('/request')
  .post(
    protect,
    [
      body('clientName').notEmpty().withMessage('Client name must be valid'),
      body('clientContact')
        .notEmpty()
        .withMessage('Client contact must be valid'),
      body('eventType').notEmpty().withMessage('Event type must be valid'),
      body('from').notEmpty().withMessage('From date must be valid'),
      body('to').notEmpty().withMessage('to date must be valid'),
      body('numOfAttendees')
        .notEmpty()
        .isInt({ min: 10 })
        .withMessage('Number of attendess should be 10 or greater than 10'),
      body('expectedBudget')
        .notEmpty()
        .isInt({ min: 1000 })
        .withMessage(
          'Expected budget must be 1000 sek or greater than 1000 sek'
        ),
      body('eventRequestStatus')
        .notEmpty()
        .withMessage('Event Request Status must be valid'),
    ],
    createNewEventRequest
  )
  .get(protect, getAllEventRequests)
  .put(
    protect,
    [
      body('id').notEmpty().withMessage('Id of event needed for update'),
      body('eventRequestStatus')
        .notEmpty()
        .withMessage('Event Request Status should be valid'),
    ],
    updateEventRequestStatus
  )

router.route('/request/:eventRequestStatus').get(protect, getEventRequest)

export default router
