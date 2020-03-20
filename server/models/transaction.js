const { Schema, model } = require('mongoose')

const transactionSchema = new Schema(
  {
    category: {
      type: String
    },
    description: {
      type: String
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
    }
  },
  { timestamps: true }
)

module.exports = model('Transaction', transactionSchema)
