import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

// generate a jwt
import generateToken from '../utils/generateToken.js'

// User Model
import User from '../models/userModel.js'

/*
 *   @desc   Auth user & get token
 *   @route  POST /api/users/login
 *   @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      tasks: user.tasks,
      subdepartment: user.subdepartment ? user.subdepartment : '',
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid email or password')
  }
})

/*
 *   @desc   Register a new user
 *   @route  POST /api/users
 *   @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password, role, department } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    department,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      tasks: user.tasks,
      subdepartment: user.subdepartment ? user.subdepartment : '',
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

/*
 *   @desc   Get user profile
 *   @route  GET /api/users/profile
 *   @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      tasks: user.tasks,
      subdepartment: user.subdepartment ? user.subdepartment : '',
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/*
 *   @desc   Get all users
 *   @route  GET /api/users
 *   @access Private
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password')

  res.json(users)
})

/*
 *   @desc   Get user profile by role
 *   @route  GET /api/users/role/:role
 *   @access Private
 */
const getUsersByRole = asyncHandler(async (req, res) => {
  const users = await User.find({ role: req.params.role }).select('-password')

  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw new Error('Users not found')
  }
})

/*
 *   @desc   Get user profile by department
 *   @route  GET /api/users/dpt/:dpt
 *   @access Private
 */
const getUsersByDpt = asyncHandler(async (req, res) => {
  const users = await User.find({ department: req.params.dpt }).select(
    '-password'
  )

  if (users) {
    res.status(200).json(users)
  } else {
    res.status(404)
    throw new Error('Users not found')
  }
})

/*
 *   @desc   Assign task to user
 *   @route  PUT /api/users
 *   @access Private
 */
const assignTask = asyncHandler(async (req, res) => {
  const { employee, subject, description, priority, active, projectRef } =
    req.body

  const user = await User.findById(employee)

  if (user) {
    user.tasks.push({ subject, description, priority, active, projectRef })

    await user.save()

    res.status(204).json({ message: 'Task assigned' }) // updated 204
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/*
 *   @desc   Edit task of User
 *   @route  PUT /api/users/task/
 *   @access Private
 */
const editTask = asyncHandler(async (req, res) => {
  const { employee, taskid, extra, planned, feedback } = req.body

  const user = await User.findById(employee)

  if (user) {
    const task = user.tasks.find(
      (task) => task._id.toString() === taskid.toString()
    )

    task.extra = extra
    task.planned = planned
    task.feedback = feedback

    await user.save()

    res.status(204).json({ message: 'task edited success' }) // updated 204
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

/*
 *   @desc   Get all tasks for an event
 *   @route  return /api/users/tasks/all/:id&:dpt
 *   @access Private
 */
const getAllTasksForEvent = asyncHandler(async (req, res) => {
  const projectRef = req.params.id
  const dpt = req.params.dpt

  const allUsers = await User.find({}).select('-password')

  const tasks = []

  allUsers.map((user) => {
    if (user.department.toString() === dpt.toString()) {
      user.tasks.map((task) => {
        if (task) {
          if (task.projectRef.toString() === projectRef.toString()) {
            task = { task, user: user.name }
            tasks.push(task)
          }
        }
      })
    }
  })

  res.status(200).json(tasks)
})

/*
 *   @desc   Delete user
 *   @route  DELETE /api/users/:id
 *   @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    await user.remove()

    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  getUsersByRole,
  getUsersByDpt,
  assignTask,
  editTask,
  getAllTasksForEvent,
  deleteUser,
}
