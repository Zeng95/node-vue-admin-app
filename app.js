// 搭建本地服务器
const express = require('express')

require('./database')

const app = express()
const port = 5000

const usersRouter = require('./routes/api/users')

app.use('/api/users', usersRouter)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))