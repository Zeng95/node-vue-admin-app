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

const getUserByEmail = (data) => {
  const query = {
    email: data.email
  }

  return new Promise((resolve, reject) => {
    User
      .findOne(query)
      .then(user => {
        !user ? resolve('用户不存在') : resolve('用户已存在')
      })
      .catch(err => reject(err))
  })
}

const getUserByNameAndEmail = (data) => {
  const query = {
    email: data.email,
    name: data.name
  }

  return new Promise((resolve, reject) => {
    User
      .findOne(query)
      .then(user => {
        !user ? resolve('用户不存在') : resolve('用户已存在')
      })
      .catch(err => reject(err))
  })
}

const addUser = (data) => {
  const newUser = new User(data)

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err

      newUser.password = hash

      return new Promise((resolve, reject) => {
        newUser
          .save()
          .then(user => resolve(user))
          .catch(err => reject(err))
      })
    })
  })
}

module.exports.getUserById = getUserById
module.exports.getUserByEmail = getUserByEmail
module.exports.getUserByNameAndEmail = getUserByNameAndEmail
module.exports.addUser = addUser