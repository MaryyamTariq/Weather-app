function App() {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  console.log("API Key:", apiKey)

  return (
    <div>
      <h1>Weather App</h1>
      <p>Console mein API key check karo</p>
    </div>
  )
}

export default App