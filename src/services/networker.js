import axios from 'axios'

const DATA_PORT = Number(process.env.DATA_PORT) || 3001

const baseURL = `http://localhost:${DATA_PORT}/persons`

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const get = (url) => {
  const request = axios.get(`${baseURL}/${url}`)
  return request.then(response => response.data)
}

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson)
  return request.then(response => response.data)
}

const deleteID = (id) => {
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(response => response.data)
}

const change = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson)
  return request.then(response => response.data)
}

export default { getAll, create, deleteID, change }
