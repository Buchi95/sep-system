import mongoose from 'mongoose'


// schema for taks
const newRecruitmentSchema = mongoose.Schema(
  {
    contracttype: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    jobtitle: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
  },
)

//Creating new task
const NewTask = mongoose.model('NewTask', newRecruitmentSchema)

export default NewTask
