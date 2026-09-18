import { useState, useEffect } from 'react'

function App() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [city, setCity] = useState('')

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
    if (city.trim()) {
      fetchWeather(city)
      setCity('')
    }
  }

  function getWeatherEmoji(condition) {
    const c = condition.toLowerCase()
    if (c.includes('clear')) return '☀️'
    if (c.includes('cloud')) return '☁️'
    if (c.includes('rain')) return '🌧️'
    if (c.includes('snow')) return '❄️'
    if (c.includes('thunder')) return '⛈️'
    if (c.includes('mist') || c.includes('fog')) return '🌫️'
    return '🌤️'
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  })

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1><b>Weather</b></h1>
          <p className="date">{today}</p>
        </header>

        <form onSubmit={handleSubmit} className="search-form">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search any city..."
          />
          <button type="submit">Search</button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Fetching weather...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-card">
            <div className="main-info">
              <span className="weather-emoji">
                {getWeatherEmoji(weather.weather[0].description)}
              </span>
              <h2 className="city-name">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="condition">{weather.weather[0].description}</p>
              <p className="temperature">{Math.round(weather.main.temp)}°C</p>
              <p className="feels-like">
                Feels like {Math.round(weather.main.feels_like)}°C
              </p>
            </div>

            <div className="details-grid">
              <div className="detail-box">
                <span className="detail-icon">💧</span>
                <p className="detail-label">Humidity</p>
                <p className="detail-value">{weather.main.humidity}%</p>
              </div>
              <div className="detail-box">
                <span className="detail-icon">💨</span>
                <p className="detail-label">Wind</p>
                <p className="detail-value">{weather.wind.speed} m/s</p>
              </div>
              <div className="detail-box">
                <span className="detail-icon">🌡️</span>
                <p className="detail-label">Pressure</p>
                <p className="detail-value">{weather.main.pressure} hPa</p>
              </div>
              <div className="detail-box">
                <span className="detail-icon">👁️</span>
                <p className="detail-label">Visibility</p>
                <p className="detail-value">
                  {(weather.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>Built with React + OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  )
}

export default App