const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")

const Schema = mongoose.Schema
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                validator.isEmail(value)
            },
            message: function () {
                return 'Invalid email format'
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    role: {
      type: String,
      default: "admin"
    },
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

adminSchema.pre('save', function (next) {
  const admin = this
  if (admin.isNew) {
      bcryptjs.genSalt(10)
          .then(function (salt) {
              bcryptjs.hash(admin.password, salt)
                  .then(function (encryptedPassword) {
                      admin.password = encryptedPassword
                      next()
                  })
          })
  } else {
      next()
  }
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = {
    Admin
}