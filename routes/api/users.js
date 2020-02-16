const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// $route  GET api/users/test 
// @desc   返回请求的 json 数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'Login works' })
})

// $route  POST api/users/signup 
// @desc   返回请求的 json 数据
// @access public
router.post('/signup', (req, res) => {
  User.getUserByEmail(req.body, result => {
    if (result === '用户存在') {
      res.status(400).json({ email: '邮箱已被注册!' })
    } else {
      User.addUser(req.body, result => {
        if (result === '密码不能为空') {
          res.status(400).json({ message: result })
        } else {
          res.json(result)
        }
      })
    }
  })
})

module.exports = router