import { useState, useEffect } from 'react'

import Country from './components/Country'
import Filter from './components/Filter'
import Result from './components/Result'
import Weather from './components/Weather'
import restCountries from './services/countries'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    restCountries
      .getAll()
      .then(data => {
        setCountryList(data)
      })
  }, [])

  useEffect(() => {
    if (country === null) {
      return
    }
    restCountries
      .getWeather(country.capital)
      .then(data => {
        setWeather(data)
      })
      .catch(error => {
        setWeather(null)
      })
  }, [country])

  const handleFilter = event => setInputSearch(event.target.value)

  const countryListToShow = inputSearch
    ? countryList.filter(country =>
      country.name.common
        .toLowerCase()
        .includes(inputSearch.toLowerCase()))
    : []

  return (
    <div>
      Find Countries
      <Filter
        value={inputSearch}
        onChange={handleFilter}
      />
      <Result countryList={countryListToShow} setCountry={setCountry} />
      <Country country={country} />
      <Weather country={country} weather={weather} />
    </div>
  )
}

export default App