const passport = require('passport')
const Transaction = require('../models/transaction')

exports.getTransactions = (req, res) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }

        if (info) {
          return res.status(401).json({
            success: false,
            message: info.message
          })
        }

        /**
         * 查询数据库
         * 异步操作
         */
        const foundTransactions = await Transaction.find()

        if (!foundTransactions) {
          return res.status(404).json({
            success: false,
            message: '交易记录不存在'
          })
        }

        res.status(200).json({
          success: true,
          transactions: foundTransactions
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  )(req, res)
}

exports.getTransactionById = (req, res) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }

        if (info) {
          return res.status(401).json({
            success: false,
            message: info.message
          })
        }

        /**
         * 通过 Id 查询数据库
         * 异步操作
         */
        const { id } = req.params
        const foundTransaction = await Transaction.findById(id)

        if (!foundTransaction) {
          return res.status(404).json({
            success: false,
            message: '交易记录不存在'
          })
        }

        res.status(200).json({
          success: true,
          transaction: foundTransaction
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  )(req, res)
}

exports.createTransaction = (req, res) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }

        if (info) {
          return res.status(401).json({
            success: false,
            message: info.message
          })
        }

        const newTransaction = new Transaction(req.body)

        await newTransaction.save()

        res.status(200).json({
          success: true,
          message: '创建成功',
          transaction: newTransaction
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  )(req, res)
}

exports.updateTransaction = (req, res) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }

        if (info) {
          return res.status(401).json({
            success: false,
            message: info.message
          })
        }

        const { id } = req.params
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        )

        res.status(200).json({
          success: true,
          message: '更新成功',
          transaction: updatedTransaction
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  )(req, res)
}

exports.deleteTransaction = (req, res) => {
  passport.authenticate(
    'jwt',
    {
      session: false
    },
    async (err, user, info) => {
      try {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          })
        }

        if (info) {
          return res.status(401).json({
            success: false,
            message: info.message
          })
        }

        const { id } = req.params
        await Transaction.findByIdAndRemove(id)

        res.status(200).json({
          success: true,
          message: '删除成功'
        })
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message
        })
      }
    }
  )(req, res)
}
