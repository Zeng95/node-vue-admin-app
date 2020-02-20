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
  User
    .getUserByNameAndEmail(req.body)
    .then(result => {
      if (result === '用户不存在') {
        User
          .addUser(req.body)
          .then(user => res.status(200).json(user))
          .catch(err => res.status(500).send(err))
      } else {
        res.status(400).json({ email: '用户名或者邮箱已被注册!' })
      }
    })
    .catch(err => res.status(500).send(err))
})

module.exports = router