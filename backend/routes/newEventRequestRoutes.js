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
        .withMessage('Number of attendess should be valid number'),
      body('expectedBudget')
        .notEmpty()
        .withMessage('Expected budget must be valid'),
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
