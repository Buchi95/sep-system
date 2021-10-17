import express from 'express'

const router = express.Router()

import {
  addBudgetRequest,
  getAllBudgetRequests,
  updateBudgetRequest,
  addResourceRequest,
  getAllResourceRequests,
  updateResourceRequest,
} from '../controllers/requestController.js'

import { protect } from '../middleware/authMiddleware.js'

router
  .route('/budget')
  .post(protect, addBudgetRequest)
  .get(getAllBudgetRequests)
  .put(protect, updateBudgetRequest)

router
  .route('/staff')
  .post(protect, addResourceRequest)
  .get(protect, getAllResourceRequests)
  .put(protect, updateResourceRequest)

export default router
