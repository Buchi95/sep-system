import mongoose from 'mongoose'

const clientSchema = mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    clientContact: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Client = mongoose.model('Client', clientSchema)

export default Client
