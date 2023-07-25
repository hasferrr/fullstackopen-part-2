const Weather = ({ country, weather }) => {
  if (country === null) {
    return null
  }

  if (weather === null) {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>weather data is not found</div>
      </div>
    )
  }

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <div>temperature {weather.main.temp} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        style={{ maxWidth: 100 }}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather