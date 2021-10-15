import express from 'express'
import { body } from 'express-validator'
const router = express.Router()
/*
import {
  //import controllers
} from '../controllers/newEventRequestController.js'
*/

import { protect } from '../middleware/authMiddleware.js'
import { createNewTask } from '../controllers/tasksController.js'

router
  .route('/tasks')
  .post(
    protect,
    [
      body('reference').notEmpty().withMessage('Client name must be valid'),
      body('description')
        .notEmpty()
        .withMessage('Client contact must be valid'),
      body('assign').notEmpty().withMessage('Event type must be valid'),
      body('priority').notEmpty().withMessage('From date must be valid'),
    ],
    createNewTask 
  )

  /* Get My tasks
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
  */

  // Get My tasks (manager)


//route to controller!
// router.route('/tasks').get(protect, getTask)

export default router