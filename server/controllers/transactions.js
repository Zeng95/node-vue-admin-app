const { parse } = require('json2csv')
const Transaction = require('../models/transaction')

exports.getTransaction = async (req, res) => {
  try {
    // 通过 id 查询数据库
    // 异步操作
    const foundTransaction = await Transaction.findById(req.params.id)

    if (!foundTransaction) {
      return res.status(404).json({
        success: false,
        message: '交易记录不存在'
      })
    }

    res.status(200).json({
      success: true,
      data: {
        transaction: foundTransaction
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.getTransactionsByCategory = async (req, res) => {
  try {
    // 通过 category 查询数据库
    // 异步操作
    const foundTransaction = await Transaction.find({
      category: req.query.name
    })

    if (foundTransaction.length === 0) {
      return res.status(404).json({
        success: false,
        message: '交易记录不存在'
      })
    }

    res.status(200).json({
      success: true,
      data: {
        transaction: foundTransaction
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.getAllTransactions = async (req, res) => {
  try {
    const currentPage = Number(req.query.pageNumber)
    const pageLimit = Number(req.query.pageSize)

    // 查询数据库
    // 异步操作
    const foundTransactions = await Transaction.find()
      .skip(pageLimit * currentPage - pageLimit)
      .limit(pageLimit)

    const numOfTransactions = await Transaction.estimatedDocumentCount()

    if (!foundTransactions) {
      return res.status(404).json({
        success: false,
        message: '交易记录不存在'
      })
    }

    res.status(200).json({
      success: true,
      data: {
        transactions: foundTransactions,
        pageNumber: currentPage,
        pageSize: pageLimit,
        totalCount: numOfTransactions
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.exportAllTransactions = async (req, res) => {
  try {
    // 查询数据库
    // 异步操作
    const foundTransactions = await Transaction.find()

    if (!foundTransactions) {
      return res.status(404).json({
        success: false,
        message: '交易记录不存在'
      })
    }

    const csv = parse(foundTransactions)

    res.status(200).json({
      success: true,
      data: csv
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.createTransaction = async (req, res) => {
  try {
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

exports.createTransactionPhoto = (req, res) => {
  res.status(200).json({
    success: true,
    message: '上传成功',
    photo: {
      url: req.file.url,
      filename: req.file.filename
    }
  })
}

exports.updateTransaction = async (req, res) => {
  try {
    console.log(req)
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
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

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findByIdAndRemove(req.params.id)

    res.status(200).json({
      success: true,
      message: '删除成功',
      data: true
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

exports.deleteManyTransactions = async (req, res) => {
  try {
    const { ids } = req.body

    await Transaction.deleteMany({
      _id: { $in: ids }
    })

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

exports.deleteTransactionPhoto = (req, res) => {
  res.status(200).json({
    success: true,
    message: '删除图片成功'
  })
}
