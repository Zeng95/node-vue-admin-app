const express = require('express')
const router = express.Router()
const controller = require('../controllers/transactions')

const {
  upload,
  handleUploadPhoto,
  handleDeletePhoto
} = require('../middlewares/upload-photo')
const { verifyToken } = require('../middlewares/verify-token')

/**
 * 获取所有交易记录
 *
 * @access Private
 */
router.get('/transactions', verifyToken, controller.getAllTransactions)

/**
 * 获取指定交易记录
 *
 * @access Private
 */
router.get('/transactions/:id', verifyToken, controller.getTransaction)

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
  [verifyToken, upload.single('photo'), handleUploadPhoto],
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
 * 删除指定交易记录的图片
 *
 * @access Private
 */
router.delete(
  '/transactions/upload/photo',
  [verifyToken, handleDeletePhoto],
  controller.deleteTransactionPhoto
)

module.exports = router
