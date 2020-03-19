const passport = require('passport')
const express = require('express')
const router = express.Router()

const controller = require('../controllers/user')

/**
 * 获取用户信息
 *
 * @access Private
 */
router.get('/users/:id', controller.currentUser)

module.exports = router
