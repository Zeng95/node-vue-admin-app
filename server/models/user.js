const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
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
const User = (module.exports = mongoose.model('User', userSchema))

const getUserById = () => {
  User.findById(id)
}

const getUserByName = data => {
  return new Promise((resolve, reject) => {
    User.findOne(data)
      .then(user => resolve(user))
      .catch(err => reject(err))
  })
}

const getUserByEmail = data => {
  return new Promise((resolve, reject) => {
    User.findOne(data)
      .then(user => resolve(user))
      .catch(err => reject(err))
  })
}

const getUserByNameAndEmail = data => {
  return new Promise((resolve, reject) => {
    const query = {
      email: data.email,
      name: data.name
    }

    User.findOne(query)
      .then(user => {
        !user ? resolve('用户不存在') : resolve('用户已存在')
      })
      .catch(err => reject(err))
  })
}

const addUser = data => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)

      bcrypt.hash(data.password, salt, (err, hash) => {
        if (err) reject(err)

        const newUser = new User({
          name: data.name,
          password: hash,
          email: data.email,
          avatar: gravatar.url(data.email, {
            protocol: 'https',
            s: '200',
            d: 'retro'
          })
        })

        newUser
          .save()
          .then(() => resolve(newUser))
          .catch(err => reject(err))
      })
    })
  })
}

module.exports.getUserById = getUserById
module.exports.getUserByName = getUserByName
module.exports.getUserByEmail = getUserByEmail
module.exports.getUserByNameAndEmail = getUserByNameAndEmail
module.exports.addUser = addUser
