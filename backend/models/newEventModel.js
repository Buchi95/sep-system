import mongoose from 'mongoose'

const EventStatus = Object.freeze({
  CREATED: 1,
  SUB_TEAM_TASKS_DIVIDED: 2,
  SUB_TEAM_RESPONDED: 3,
  EVENT_UNDER_FINANCIAL_MANAGER_REVIEW: 3,
})

const newEventSchema = mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    eventType: {
      type: String,
      required: true,
      default: 1,
    },
    description: {
      type: String,
      required: true,
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
    plannedBudget: {
      type: Number,
      required: true,
    },
    preferences: {
      decorations: {
        type: String,
        required: false,
      },
      food_drinks: {
        type: String,
        required: false,
      },
      filming_photos: {
        type: String,
        required: false,
      },
      music: {
        type: String,
        required: false,
      },
      artwork: {
        type: String,
        required: false,
      },
      it: {
        type: String,
        required: false,
      },
      other: {
        type: String,
        required: false,
      },
    },
    eventStatus: {
      type: Number,
      enum: Object.values(EventStatus),
      required: true,
      default: 1,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

Object.assign(newEventSchema.statics, {
  EventStatus,
})

const NewEvent = mongoose.model('NewEvent', newEventSchema)

export default NewEvent
