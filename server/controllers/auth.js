const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const User = require('../models/user')

const addUser = data => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err)

      bcrypt.hash(data.password, salt, async (err, hash) => {
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

        try {
          await newUser.save()
          resolve(newUser)
        } catch (err) {
          reject(err)
        }
      })
    })
  })
}

exports.login = () => {}

exports.register = async (req, res) => {
  try {
    const user = await addUser(req.body)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.checkName = async (req, res) => {
  try {
    const result = await User.findOne(req.body)

    if (result) {
      // 用户名已存在
      res.status(409).json({
        timestamp: Date.now(),
        status: 409,
        error: 'Conflict',
        message: '用户名已存在'
      })
    } else {
      // 用户名不存在
      res.sendStatus(200)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.checkEmail = async (req, res) => {
  try {
    const result = await User.findOne(req.body)

    if (result) {
      // 邮箱已存在
      res.status(409).json({
        timestamp: Date.now(),
        status: 409,
        error: 'Conflict',
        message: '邮箱已存在'
      })
    } else {
      // 邮箱不存在
      res.sendStatus(200)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}
