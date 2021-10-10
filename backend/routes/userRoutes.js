import express from 'express'
import { body } from 'express-validator'
const router = express.Router()

import {
  authUser,
  registerUser,
  getUserProfile,
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

router.route('/profile').get(protect, getUserProfile)

export default router
