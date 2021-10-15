import asyncHandler from 'express-async-handler'
import { validationResult } from 'express-validator'

// generate a jwt
import generateToken from '../utils/generateToken.js'

// User Model
import User from '../models/userModel.js'
import tasksModel from '../models/tasksModel.js'


// Waiting for task response
const createNewTask = asyncHandler(async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty(req)){
      console.log(req)
      return res.status(400).json({ errors: errors.array() })
  }

    const {
        reference,
        description,
        assign,
        priority
    } = req.body

    const newTask = await tasksModel.create({
        reference,
        description,
        assign,
        priority
    })

    if (newTask) {
        console.log(newTask),
        res.status(201).json({
            reference: newTask.reference,
            description: newTask.description,
            assign: newTask.assign,
            priority: newTask.priority
        })
    }
})

const getTask = asyncHandler(async (req, res) => {
    const currentTask = await tasksModel.find({
            ref: req.params.ref,
    })

    if(currentTask){
        res.status(200).json(currentTask)
    } else {
        res.status(404)
        throw new Error('Task not found')
    }
})


export { createNewTask, getTask }
