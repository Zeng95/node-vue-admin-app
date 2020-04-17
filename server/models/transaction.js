const { Schema, model } = require('mongoose')

const transactionSchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    income: {
      type: Number,
      required: true
    },
    expense: {
      type: Number,
      required: true
    },
    balance: {
      type: Number,
      required: true
    },
    remark: {
      type: String
    },
    photo: {
      type: String
    }
  },
  { timestamps: true }
)

module.exports = model('Transaction', transactionSchema)
