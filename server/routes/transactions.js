const express = require('express')
const router = express.Router()
const controller = require('../controllers/transactions')

router.get('/transactions', controller.getTransactions)

module.exports = router
