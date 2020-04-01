const express = require('express')
const router = express.Router()
const controller = require('../controllers/transactions')

/**
 * 获取所有交易纪录
 *
 * @access Private
 */
router.get('/transactions', controller.getAllTransactions)

/**
 * 获取指定交易纪录
 *
 * @access Private
 */
router.get('/transactions/:id', controller.getTransaction)

/**
 * 新增交易纪录
 *
 * @access Private
 */
router.post('/transactions', controller.createTransaction)

/**
 * 修改指定交易纪录
 *
 * @access Private
 */
router.put('/transactions/:id', controller.updateTransaction)

/**
 * 删除指定交易纪录
 *
 * @access Private
 */
router.delete('/transactions/:id', controller.deleteTransaction)

module.exports = router
