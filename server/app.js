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

const corsOptions = {
  origin: 'http://localhost:8080'
}

// Middlewares
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

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
