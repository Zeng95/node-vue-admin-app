const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const { Schema } = mongoose

// Define a Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// Create a Model
const User = module.exports = mongoose.model('User', userSchema)

const getUserById = () => {
  User.findById(id, callback)
}

const getUserByEmail = (data, callback) => {
  const query = {
    email: data.email
  }

  User
    .findOne(query)
    .then(user => {
      !user ? callback('用户不存在') : callback('用户存在')
    })
    .catch(err => {
      throw err
    })
}

const addUser = (data, callback) => {
  const newUser = new User(data)

  if (!newUser.password) {
    callback('密码不能为空')
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err

      newUser.password = hash

      newUser
        .save()
        .then(doc => callback(doc))
        .catch(err => {
          throw err
        })
    })
  })
}

module.exports.getUserById = getUserById
module.exports.getUserByEmail = getUserByEmail
module.exports.addUser = addUser