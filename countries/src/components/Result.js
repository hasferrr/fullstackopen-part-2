const Result = ({ countryList }) => {
  if (countryList.length === 0) {
    return null
  }

  if (countryList.length === 1) {
    return <Country country={countryList[0]} />
  }

  if (countryList.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countryList.map(country =>
        <div key={country.name.common}>
          {country.name.common}
        </div>
      )}
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>
            {lang}
          </li>
        )}
      </ul>

      <div>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          style={{ maxWidth: 320 }}
        />
      </div>
    </div>
  )
}

export default Result