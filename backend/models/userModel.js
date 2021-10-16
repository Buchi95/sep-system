import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const taskSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      required: false,
    },
    extra: {
      type: String,
      required: false,
    },
    projectRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'NewEvent',
    },
  },
  {
    timestamps: true,
  }
)

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    tasks: [taskSchema],
    subdepartment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
