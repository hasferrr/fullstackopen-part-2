const Country = ({ country }) => {
  if (country === null) {
    return null
  }

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

export default Country