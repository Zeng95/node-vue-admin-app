// 搭建本地服务器
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const { success, error } = require('consola')

const app = express()
const port = 5000

dotenv.config()
require('./database')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/auth')

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', authRouter)
app.use('/api', userRouter)

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
