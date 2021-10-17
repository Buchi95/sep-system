import mongoose from 'mongoose'

const budgetRequestSchema = mongoose.Schema(
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
    requiredAmount: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const BudgetRequest = mongoose.model('BudgetRequest', budgetRequestSchema)

export default BudgetRequest
