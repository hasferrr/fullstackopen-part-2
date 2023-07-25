import { useState, useEffect } from 'react'

import Country from './components/Country'
import Filter from './components/Filter'
import Result from './components/Result'
import restCountries from './services/countries'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [inputSearch, setInputSearch] = useState('')
  const [showCountry, setShowCountry] = useState(null)

  useEffect(() => {
    restCountries
      .getAll()
      .then(data => {
        setCountryList(data)
      })
  }, [])

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
      <Result countryList={countryListToShow} setShowCountry={setShowCountry}/>
      <Country country={showCountry} />
    </div>
  )
}

export default App