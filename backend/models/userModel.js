import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const Roles = Object.freeze({
  ADMINISTRATION_MANAGER: 'Administration_Manager',
  SENIOR_CUSTOMER_SERVICE_OFFICER: 'Senior_Customer_Service_Officer',
  CUSTOMER_SERVICE_OFFICER: 'Customer_Service_Officer',
  FINANCIAL_MANAGER: 'Financial_Manager',
})

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
      enum: Object.values(Roles),
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

Object.assign(userSchema.statics, {
  Roles,
})

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
