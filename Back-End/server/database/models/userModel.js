const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userName: String,
    account: [{
      name: String,
      nbAccount : String,
      solde: Number,
      operations: [
        {
            date: String,
            title: String,
            description: String,
            montant: Number,
          }
        ]
    }]
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
        return ret
      }
    }
  }
)

module.exports = mongoose.model('User', userSchema)
