// 搭建本地服务器
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const { success, error } = require('consola')

require('dotenv').config()
require('./config/database')
require('./config/passport')(passport)

const app = express()
const port = process.env.APP_PORT || 5000
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')

// 中间件
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

app.use('/api', authRouter)
app.use('/api', usersRouter)

app.listen(port, err => {
  if (err) {
    error({
      message: err,
      badge: true
    })
  } else {
    success({
      message: `Example app listening on port ${port}!`,
      badge: true
    })
  }
})
