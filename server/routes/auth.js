const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const User = require('../models/user')

// $route  GET api/auth/login
// @desc   返回token jwt passport
// @access public
router.post('/login', (req, res) => {
  const { name, email, password } = req.body

  if (name) {
    // 查询数据库
    User.getUserByName(name)
      .then(result => {
        if (result === '用户不存在') {
          res.status(404).json({ message: '用户不存在！' })
        } else {
          const user = result
          // 密码匹配
          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (result) {
                res.json({ messgae: '登录成功！' })
              } else {
                res.status(400).json({ message: '密码错误！' })
              }
            })
            .catch(err => res.status(500).send(err))
        }
      })
      .catch(err => res.status(500).send(err))
  } else if (email) {
    // 查询数据库
    User.getUserByEmail(email)
      .then(result => {
        if (result === '用户不存在') {
          res.status(404).json({ message: '用户不存在！' })
        } else {
          const user = result
          // 密码匹配
          bcrypt
            .compare(password, user.password)
            .then(result => {
              if (result) {
                res.json({ messgae: '登录成功！' })
              } else {
                res.status(400).json({ message: '密码错误！' })
              }
            })
            .catch(err => res.status(500).send(err))
        }
      })
      .catch(err => res.status(500).send(err))
  }
})

// $route  POST api/auth/register
// @desc   返回请求的 json 数据
// @access public
router.post('/register', (req, res) => {
  User.addUser(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).send(err))
})

// $route  POST api/auth/register/check/name
// @desc   返回请求的 json 数据
// @access public
router.post('/register/check/name', (req, res) => {
  // 查询数据库
  User.getUserByName(req.body)
    .then(result => {
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
    })
    .catch(err => res.status(500).send(err))
})

// $route  POST api/auth/register/check/email
// @desc   返回请求的 json 数据
// @access public
router.post('/register/check/email', (req, res) => {
  // 查询数据库
  User.getUserByEmail(req.body)
    .then(result => {
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
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router
