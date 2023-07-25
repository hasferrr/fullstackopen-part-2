const Result = ({ countryList, setCountry }) => {
  if (countryList.length === 0) {
    return null
  }

  if (countryList.length === 1) {
    setTimeout(() => {
      setCountry(countryList[0])
    }, 0);
    return null
  }

  if (countryList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countryList.map(country =>
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => setCountry(country)}>show</button>
        </div>
      )}
    </div>
  )
}

export default Result