import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const promise = axios.get(`${baseUrl}/all`)
  return promise.then(response => response.data)
}

export default { getAll }