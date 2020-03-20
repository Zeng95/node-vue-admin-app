const { Schema, model } = require('mongoose')

const roleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = model('Role', roleSchema)
