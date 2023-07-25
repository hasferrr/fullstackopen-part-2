import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getAll = () => {
  const promise = axios.get(`${baseUrl}/all`)
  return promise.then(response => response.data)
}

const getWeather = city => {
  const promise = axios.get(`${weatherUrl}?q=${city}&units=metric&appid=${api_key}`)
  return promise.then(response => response.data)
}

export default { getAll, getWeather }