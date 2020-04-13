import httpClient from './httpClient'

const END_POINT = '/transactions'

const getAllTransactions = () => {
  return httpClient.get(END_POINT)
}

const getTransaction = (id) => {
  return httpClient.get(`${END_POINT}/${id}`)
}

const createTransaction = (transaction) => {
  return httpClient.post(END_POINT, transaction)
}

const updateTransaction = (id, transaction) => {
  return httpClient.put(`${END_POINT}/${id}`, transaction)
}

const deleteTransaction = (id) => {
  return httpClient.delete(`${END_POINT}/${id}`)
}

export {
  getAllTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
}
