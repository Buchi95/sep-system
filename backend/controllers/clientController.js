import asyncHandler from 'express-async-handler'

import Client from '../models/clientModel.js'

/*
 *   @desc   Get client by Id
 *   @route  POST /api/client/:id
 *   @access Private
 */
const getClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id)

  if (client) {
    res.status(200).json(client)
  } else {
    res.status(404)
    throw new Error('Client not found')
  }
})

/*
 *   @desc   Get all clients
 *   @route  GET /api/client
 *   @access Private
 */
const getAllClients = asyncHandler(async (_req, res) => {
  const clients = await Client.find({})

  res.status(200).json(clients)
})

export { getClient, getAllClients }
