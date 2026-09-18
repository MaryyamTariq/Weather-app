import { useState, useEffect } from 'react'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('Lahore')

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    fetchWeather('Lahore')
  }, [])

  async function fetchWeather(cityName) {
    try {
      setLoading(true)
      setError(null)

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      const response = await fetch(url)

      if (!response.ok) throw new Error('City not found')

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (city.trim()) fetchWeather(city)
  }

  return (
    <div className="app">
      <h1>🌤️ Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}

      {weather && !loading && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <div className="details">
            <span>💧 {weather.main.humidity}%</span>
            <span>🌡️ Feels like {Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App