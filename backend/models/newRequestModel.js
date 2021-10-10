import mongoose from 'mongoose'

const EventType = Object.freeze({
  CELEBRATION: 1,
  WORKSHOP: 2,
  CONFERENCE: 3,
  EXPO: 4,
  SEMINAR: 5,
  SUMMER_SCHOOL: 6,
  OTHER: 0,
})

const Preferences = Object.freeze({
  DECORATIONS: 1,
  PARTIES: 2,
  PHOTOS_FILMING: 3,
  FOOD: 4,
  SOFT_HOT_DRINKS: 5,
  OTHER: 0,
})

const RequestStatus = Object.freeze({
  UNDER_SENIOR_CUSTOMER_REVIEW: 1,
  REJECTED_BY_SENIOR_CUSTOMER: 11,
  UNDER_FINANCIAL_MANAGER_REVIEW: 2,
  REJECTED_BY_FINANCIAL_MANAGER: 22,
  UNDER_ADMINISTRATION_MANAGER_REVIEW: 3,
  REJECTED_BY_ADMINISTRATION_MANAGER: 33,
  APPROVED: 4,
  CONTINUED_IN_EVENT: 5,
  CLOSED: 6,
})

const newRequestSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    eventType: {
      type: Number,
      enum: Object.values(EventType),
      required: true,
      default: 1,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      required: true,
    },
    numOfAttendees: {
      type: Number,
      required: true,
    },
    expectedBudget: {
      type: Number,
      required: true,
    },
    preferences: {
      type: [Number],
      enum: Object.values(Preferences),
      required: true,
    },
    eventRequestStatus: {
      type: Number,
      enum: Object.values(RequestStatus),
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
)

Object.assign(newRequestSchema.statics, {
  EventType,
  Preferences,
  RequestStatus,
})

const NewRequest = mongoose.model('NewRequest', newRequestSchema)

export default NewRequest
