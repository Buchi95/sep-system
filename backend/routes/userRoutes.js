import express from 'express'
import { body } from 'express-validator'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
  getUsersByRole,
  getUsersByDpt,
  assignTask,
  editTask,
  getAllTasksForEvent,
} from '../controllers/userController.js'

import { protect } from '../middleware/authMiddleware.js'

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  registerUser
)

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  authUser
)

router.route('/').put(protect, assignTask)

router.route('/profile').get(protect, getUserProfile)

router.route('/role/:role').get(protect, getUsersByRole)

router.route('/dpt/:dpt').get(protect, getUsersByDpt)

router.route('/task').put(protect, editTask)

router.route('/tasks/all/:id').get(getAllTasksForEvent)

export default router
