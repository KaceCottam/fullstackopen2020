import axios from 'axios'

const BASE_URL = process.env.BASE_URL || `/persons`

const getAll = () => axios.get(BASE_URL).then(res => res.data)
const create = (obj) => axios.post(BASE_URL, obj).then(res => res.data)
const update = (id, obj) => axios.put(`${BASE_URL}/${id}`, obj)
  .then(res => res.data)

export default { getAll, create, update }
