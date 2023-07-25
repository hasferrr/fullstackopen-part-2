import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Result from './components/Result'
import restCountries from './services/countries'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    restCountries
      .getAll()
      .then(data => {
        const countryNameList = data.map(c => c.name.common)
        setCountryList(countryNameList)
      })
  }, [])

  return (
    <div>
      Find Countries
      <Filter
        value={inputSearch}
        onChange={event => setInputSearch(event.target.value)}
      />
      <Result countryList={countryList} />
    </div>
  )
}

export default App