import httpClient from './httpClient'

const END_POINT = '/transactions'

const getAllTransactions = () => {
  return httpClient.get(END_POINT)
}

const getTransaction = (id) => {
  return httpClient.get(`${END_POINT}/${id}`)
}

const createTransaction = (transaction) => {
  return httpClient.get(END_POINT, transaction)
}

/**
 * Pass arguments to use as request parameters/data
 */
const updateTransaction = (id, transaction) => {
  return httpClient.get(`${END_POINT}/${id}`, transaction)
}

const deleteTransaction = (id) => {
  return httpClient.get(`${END_POINT}/${id}`)
}

export {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
}
