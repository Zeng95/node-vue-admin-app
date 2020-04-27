import httpClient from './httpClient'

const END_POINT = '/transactions'

const getTransaction = (id) => {
  return httpClient.get(END_POINT, {
    params: { id }
  })
}

const getTransactionsByCategory = (category) => {
  return httpClient.get(`${END_POINT}/category`, {
    params: { name: category }
  })
}

const getAllTransactions = (page, size) => {
  return httpClient.get(END_POINT, {
    params: { pageNumber: page, pageSize: size }
  })
}

const exportAllTransactions = () => {
  return httpClient.get(`${END_POINT}/export`)
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

const deleteManyTransactions = (ids) => {
  return httpClient.delete(END_POINT, {
    data: { ids }
  })
}

const deleteTransactionPhoto = (photo) => {
  return httpClient.delete(`${END_POINT}/upload/photo`, photo)
}

export {
  getTransaction,
  getTransactionsByCategory,
  getAllTransactions,
  exportAllTransactions,
  createTransactionPhoto,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  deleteManyTransactions,
  deleteTransactionPhoto
}
