import httpClient from './httpClient'

const END_POINT = '/transactions'

const getTransaction = (id) => {
  return httpClient.get(`${END_POINT}/${id}`)
}

const getAllTransactions = (page, size) => {
  return httpClient.get(`${END_POINT}?pageNumber=${page}&pageSize=${size}`)
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

const deleteManyTransaction = (ids) => {
  return httpClient.delete(END_POINT, ids)
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
  deleteManyTransaction,
  deleteTransactionPhoto
}
