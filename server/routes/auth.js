const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

/**
 * 用户登录
 *
 * @access Public
 */
router.post('/auth/login', controller.login)

/**
 * 用户注册
 *
 * @access Public
 */
router.post('/auth/register', controller.register)

/**
 * 检查用户名是否可用
 *
 * @access Public
 */
router.post('/auth/register/check_name', controller.checkName)

/**
 * 检查邮箱是否可用
 *
 * @access Public
 */
router.post('/auth/register/check_email', controller.checkEmail)

module.exports = router
