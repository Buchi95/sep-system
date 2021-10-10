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

  const { name, email, password, role } = req.body

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
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
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
  const users = await User.find({})

  res.json(users)
})

/*
 *   @desc   Delete user
 *   @route  DELETE /api/users/:id
 *   @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()

    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, registerUser, getUserProfile, getUsers, deleteUser }
