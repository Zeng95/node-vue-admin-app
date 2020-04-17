import httpClient from './httpClient'

const END_POINT = '/transactions'

const getAllTransactions = () => {
  return httpClient.get(END_POINT)
}

const getTransaction = (id) => {
  return httpClient.get(`${END_POINT}/${id}`)
}

const createTransactionPhoto = (photo) => {
  return httpClient.post(`${END_POINT}/upload/photo`, photo)
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

const deleteTransactionPhoto = (photo) => {
  return httpClient.delete(`${END_POINT}/upload/photo`, photo)
}

export {
  getAllTransactions,
  getTransaction,
  createTransactionPhoto,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  deleteTransactionPhoto
}
