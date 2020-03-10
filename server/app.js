// 搭建本地服务器
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const app = express()
const port = 5000

dotenv.config()
require('./database')

const authRouter = require('./routes/auth')
const userRouter = require('./routes/auth')

const corsOptions = {
  origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
