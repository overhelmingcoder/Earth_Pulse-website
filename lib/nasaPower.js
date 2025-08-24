// NASA POWER API for weather data
// https://power.larc.nasa.gov/api/

export async function fetchWeatherData(lat, lng) {
  try {
    const baseUrl = 'https://power.larc.nasa.gov/api/temporal/daily/regional'
    const params = new URLSearchParams({
      parameters: 'T2M,PRECTOT,WS2M,RH2M',
      community: 'RE',
      longitude: lng,
      latitude: lat,
      start: '20240101',
      end: '20241231',
      format: 'JSON'
    })
    
    const response = await fetch(`${baseUrl}?${params}`)
    
    if (!response.ok) {
      throw new Error('NASA POWER API request failed')
    }
    
    const data = await response.json()
    
    // Get latest values
    const latest = data.properties.parameter
    const dates = Object.keys(latest.T2M)
    const latestDate = dates[dates.length - 1]
    
    return {
      temperature: latest.T2M[latestDate],
      precipitation: latest.PRECTOT[latestDate],
      windSpeed: latest.WS2M[latestDate],
      humidity: latest.RH2M[latestDate],
      date: latestDate
    }
  } catch (error) {
    console.warn('NASA POWER API failed, using mock data:', error.message)
    
    // Mock weather data
    return {
      temperature: 20 + (Math.random() - 0.5) * 20, // 10-30°C
      precipitation: Math.random() * 10, // 0-10mm
      windSpeed: Math.random() * 15, // 0-15 m/s
      humidity: 40 + Math.random() * 40, // 40-80%
      date: new Date().toISOString().split('T')[0]
    }
  }
}

export function getWeatherDescription(temperature, precipitation, windSpeed, humidity) {
  let tempDesc = ''
  if (temperature < 0) tempDesc = 'Freezing'
  else if (temperature < 10) tempDesc = 'Cold'
  else if (temperature < 20) tempDesc = 'Cool'
  else if (temperature < 30) tempDesc = 'Warm'
  else tempDesc = 'Hot'
  
  let precipDesc = ''
  if (precipitation < 1) precipDesc = 'Dry'
  else if (precipitation < 5) precipDesc = 'Light rain'
  else precipDesc = 'Heavy rain'
  
  let windDesc = ''
  if (windSpeed < 5) windDesc = 'Calm'
  else if (windSpeed < 10) windDesc = 'Breezy'
  else windDesc = 'Windy'
  
  return `${tempDesc}, ${precipDesc}, ${windDesc}`
}
