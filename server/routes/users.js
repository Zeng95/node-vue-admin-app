const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')
const { verifyToken } = require('../middlewares/verify-token')

/**
 * 获取用户信息
 *
 * @access Private
 */
router.get('/users/:id', verifyToken, controller.getUser)

module.exports = router
