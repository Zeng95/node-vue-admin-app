const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

// 模型
const User = require('../models/user')
const Role = require('../models/role')

// 环境变量
const { APP_JWT_SECRET } = process.env

/**
 * 用户登录
 *
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { name, email, password } = req.body

    /**
     * 根据请求主体中 name 字段在数据库查找
     */
    if (name) {
      foundUser = await User.findOne({ name })
    }

    /**
     * 根据请求主体中 email 字段在数据库查找
     */
    if (email) {
      foundUser = await User.findOne({ email })
    }

    /**
     * 如果数据库中没找到对应的用户则返回 404
     */
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: '用户名不存在'
      })
    }

    /**
     * 将数据库中找到的用户的密码和请求主体中 password 字段做比较
     * 同步操作
     */
    let passwordIsValid = foundUser.comparePassword(password)

    /**
     * 如果密码不匹配则返回 403
     */
    if (!passwordIsValid) {
      return res.status(403).send({
        success: false,
        message: '密码错误'
      })
    }

    /**
     * 创建 Token，7 天后过期
     * Token 是一个能唯一标识用户身份的 key
     */
    const accessToken = jwt.sign({ userId: foundUser._id }, APP_JWT_SECRET, {
      expiresIn: '7d'
    })

    /**
     * 登录成功
     */
    res.status(200).json({
      success: true,
      message: '登录成功',
      token: `Bearer ${accessToken}`,
      user: {
        id: foundUser._id
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * 用户注册
 *
 * @access Public
 */
const register = async (req, res) => {
  try {
    const foundRole = await Role.findOne({ name: req.body.role })

    /**
     * 实例化 User 模型
     * 生成默认头像
     */
    const newUser = new User({
      ...req.body,
      role: foundRole._id,
      avatar: gravatar.url(req.body.email, {
        protocol: 'https',
        s: '200',
        d: 'retro'
      })
    })

    /**
     * 创建 Token，7 天后过期
     * Token 是一个能唯一标识用户身份的 key
     */
    const accessToken = jwt.sign(
      { userId: newUser._id },
      APP_JWT_SECRET,
      { expiresIn: '7d' } // one week
    )

    /**
     * 在数据库中创建新的用户
     */
    await newUser.save()

    /**
     * 注册成功
     */
    res.status(200).json({
      success: true,
      message: '注册成功',
      token: `Bearer ${accessToken}`,
      user: {
        id: newUser._id
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * 检查用户名是否可用
 *
 * @access Public
 */
const checkName = async (req, res) => {
  try {
    const { name } = req.body
    const foundUser = await User.findOne({ name })

    if (foundUser) {
      /**
       * 如果用户名已存在，说明不可用则返回 409
       */
      return res.status(409).json({
        success: false,
        message: '用户名已存在'
      })
    }

    /**
     * 用户名可用
     */
    res.status(200).json({
      success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

/**
 * 检查邮箱是否可用
 *
 * @access Public
 */
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      /**
       * 如果邮箱已存在，说明不可用则返回 409
       */
      return res.status(409).json({
        success: false,
        message: '邮箱已存在'
      })
    }

    /**
     * 邮箱可用
     */
    res.status(200).json({
      success: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = {
  login,
  register,
  checkName,
  checkEmail
}
