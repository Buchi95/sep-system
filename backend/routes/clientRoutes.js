import express from 'express'

const router = express.Router()

import { getClient, getAllClients } from '../controllers/clientController.js'

import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getAllClients)

router.route('/:id').get(protect, getClient)

export default router
