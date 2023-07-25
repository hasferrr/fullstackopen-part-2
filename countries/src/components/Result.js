const Result = ({ countryList }) => {
  if (countryList.length === 0) {
    return null
  }

  if (countryList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countryList.map(country =>
        <div key={country}>
          {country}
        </div>
      )}
    </div>
  )
}

export default Result