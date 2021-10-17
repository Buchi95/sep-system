import mongoose from 'mongoose'

const staffRequestSchema = mongoose.Schema(
  {
    requestingDepartment: {
      type: String,
      required: true,
    },
    projectRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'NewEvent',
    },
    contract: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const StaffRequest = mongoose.model('StaffRequest', staffRequestSchema)

export default StaffRequest
