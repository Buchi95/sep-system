import mongoose from 'mongoose'


// schema for taks
const newTaskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    assign: {
      type: String,
      enum: ['Marc', 'Aksel'],
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true,
    },
  },
)

//Creating new task
const NewTask = mongoose.model('NewTask', newTaskSchema)

export default NewTask
