const express = require('express')
const router = express.Router()

// $route  GET api/users/test 
// @desc   返回请求的 json 数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'Login works' })
})

module.exports = router