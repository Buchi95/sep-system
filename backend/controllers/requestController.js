import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

import BudgetRequest from '../models/budgetRequestModel.js'
import StaffRequest from '../models/staffRequestModel.js'
import NewEvent from '../models/newEventModel.js'

/*
 *   @desc   Add new request for budget
 *   @route  POST /api/request/budget
 *   @access Private
 */
const addBudgetRequest = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { requestingDepartment, projectRef, requiredAmount, reason, status } =
    req.body

  const budgetRequest = await BudgetRequest.create({
    requestingDepartment,
    projectRef,
    requiredAmount,
    reason,
    status,
  })

  if (budgetRequest) {
    res.status(201).json(budgetRequest)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

/*
 *   @desc   Add new request for resource hiring
 *   @route  POST /api/request/staff
 *   @access Private
 */
const addResourceRequest = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {
    requestingDepartment,
    projectRef,
    contract,
    experience,
    jobTitle,
    jobDescription,
    status,
  } = req.body

  const resourceRequest = await StaffRequest.create({
    requestingDepartment,
    projectRef,
    contract,
    experience,
    jobTitle,
    jobDescription,
    status,
  })

  if (resourceRequest) {
    res.status(201).json(resourceRequest)
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

const eventData = async (id) => {
  const event = await NewEvent.findById(id)

  return event
}

/*
 *   @desc   get all budget requests
 *   @route  GET /api/request/budget
 *   @access Private
 */
const getAllBudgetRequests = asyncHandler(async (req, res) => {
  const allBudgetRequests = await BudgetRequest.find({})

  let requests = []

  await Promise.all(
    allBudgetRequests.map(async (request) => {
      const eventData = await NewEvent.findById(request.projectRef.toString())
      request = { request, event: eventData }
      requests.push(request)
    })
  )

  res.status(200).json(requests)
})

/*
 *   @desc   get all resource requests
 *   @route  GET /api/request/staff
 *   @access Private
 */
const getAllResourceRequests = asyncHandler(async (req, res) => {
  const allResourceRequests = await StaffRequest.find({})

  let requests = []

  await Promise.all(
    allResourceRequests.map(async (request) => {
      const eventData = await NewEvent.findById(request.projectRef.toString())
      request = { request, event: eventData }
      requests.push(request)
    })
  )

  res.status(200).json(requests)
})

/*
 *   @desc   update budget request by id
 *   @route  PUT /api/request/budget
 *   @access Private
 */
const updateBudgetRequest = asyncHandler(async (req, res) => {
  const { id, status } = req.body

  const request = await BudgetRequest.findById(id)

  if (request) {
    if (status) {
      request.status = status
    }
    await request.save()

    res.status(204).json({ message: 'updaed request success' }) // updated 204
  } else {
    res.status(404)
    throw new Error('Request not found')
  }
})

/*
 *   @desc   update staff request by id
 *   @route  PUT /api/request/staff
 *   @access Private
 */
const updateResourceRequest = asyncHandler(async (req, res) => {
  const { id, status } = req.body

  const request = await StaffRequest.findById(id)

  if (request) {
    if (status) {
      request.status = status
    }
    await request.save()

    res.status(204).json({ message: 'updaed request success' }) // updated 204
  } else {
    res.status(404)
    throw new Error('Request not found')
  }
})

export {
  addBudgetRequest,
  addResourceRequest,
  getAllBudgetRequests,
  getAllResourceRequests,
  updateBudgetRequest,
  updateResourceRequest,
}
