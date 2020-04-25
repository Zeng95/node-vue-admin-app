const express = require('express')
const router = express.Router()
const controller = require('../controllers/transactions')

const {
  uploadSingle,
  uploadPhoto,
  DeletePhoto
} = require('../middlewares/upload-photo')
const { verifyToken } = require('../middlewares/verify-token')

/**
 * 通过 category 获取交易记录
 *
 * @access Private
 */
router.get(
  '/transactions/search',
  verifyToken,
  controller.getTransactionByCategory
)

/**
 * 通过 id 获取交易记录
 *
 * @access Private
 */
router.get('/transactions/:id', verifyToken, controller.getTransaction)

/**
 * 获取所有交易记录
 *
 * @access Private
 */
router.get('/transactions', verifyToken, controller.getAllTransactions)

/**
 * 创建新的交易记录
 *
 * @access Private
 */
router.post('/transactions', verifyToken, controller.createTransaction)

/**
 * 创建新的交易记录的图片
 *
 * @access Private
 */
router.post(
  '/transactions/upload/photo',
  [verifyToken, uploadSingle.single('photo'), uploadPhoto],
  controller.createTransactionPhoto
)

/**
 * 修改指定交易记录
 *
 * @access Private
 */
router.put('/transactions/:id', verifyToken, controller.updateTransaction)

/**
 * 删除指定交易记录
 *
 * @access Private
 */
router.delete('/transactions/:id', verifyToken, controller.deleteTransaction)

/**
 * 删除多个交易记录
 *
 * @access Private
 */
router.delete('/transactions', verifyToken, controller.deleteManyTransactions)

/**
 * 删除所有交易记录
 *
 * @access Private
 */
router.delete('/transactions', verifyToken, controller.deleteAllTransactions)

/**
 * 删除指定交易记录的图片
 *
 * @access Private
 */
router.delete(
  '/transactions/upload/photo',
  [verifyToken, DeletePhoto],
  controller.deleteTransactionPhoto
)

module.exports = router
