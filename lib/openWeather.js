// OpenWeather API for air quality data
// Requires OPENWEATHER_API_KEY in .env.local

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo_key'

export async function fetchAirQuality(lat, lng) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('OpenWeather API request failed')
    }
    
    const data = await response.json()
    
    return {
      aqi: data.list[0].main.aqi, // 1-5 scale
      co: data.list[0].components.co,
      no2: data.list[0].components.no2,
      o3: data.list[0].components.o3,
      pm2_5: data.list[0].components.pm2_5,
      pm10: data.list[0].components.pm10,
      so2: data.list[0].components.so2,
      timestamp: data.list[0].dt
    }
  } catch (error) {
    console.warn('OpenWeather API failed, using mock data:', error.message)
    
    // Mock air quality data
    return {
      aqi: Math.floor(Math.random() * 5) + 1,
      co: Math.random() * 1000,
      no2: Math.random() * 50,
      o3: Math.random() * 100,
      pm2_5: Math.random() * 50,
      pm10: Math.random() * 100,
      so2: Math.random() * 20,
      timestamp: Date.now() / 1000
    }
  }
}

export function getAQICategory(aqi) {
  if (aqi <= 1) return { level: 'Good', color: '#00e400', description: 'Air quality is satisfactory' }
  if (aqi <= 2) return { level: 'Fair', color: '#ffff00', description: 'Air quality is acceptable' }
  if (aqi <= 3) return { level: 'Moderate', color: '#ff7e00', description: 'Some pollutants may be elevated' }
  if (aqi <= 4) return { level: 'Poor', color: '#ff0000', description: 'Health effects may be experienced' }
  return { level: 'Very Poor', color: '#8f3f97', description: 'Health alert: everyone may experience effects' }
}
