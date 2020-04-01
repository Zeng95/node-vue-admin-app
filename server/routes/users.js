const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')

/**
 * 获取用户信息
 *
 * @access Private
 */
router.get('/users/:id', controller.getUser)

module.exports = router
