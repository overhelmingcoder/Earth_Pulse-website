// NASA GISTEMP API for temperature anomaly data
// Mock data fallback for demo purposes

export async function fetchTemperatureAnomaly(lat, lng, year = 2024) {
  try {
    // In a real implementation, you would call the GISTEMP API
    // For demo purposes, we'll use mock data
    const response = await fetch(`https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.txt`)
    
    if (!response.ok) {
      throw new Error('GISTEMP API request failed')
    }
    
    // Parse the GISTEMP data format
    const text = await response.text()
    const lines = text.split('\n')
    
    // Find the year in the data
    const yearLine = lines.find(line => line.includes(year.toString()))
    if (yearLine) {
      const parts = yearLine.split(/\s+/)
      const anomaly = parseFloat(parts[13]) // Annual mean anomaly
      return {
        year: year,
        anomaly: anomaly,
        source: 'NASA GISTEMP'
      }
    }
    
    throw new Error('Year not found in GISTEMP data')
  } catch (error) {
    console.warn('GISTEMP API failed, using mock data:', error.message)
    
    // Mock temperature anomaly data
    const baseAnomaly = 0.8 // Base warming since pre-industrial
    const yearVariation = (year - 2000) * 0.02 // Linear trend
    const randomVariation = (Math.random() - 0.5) * 0.3 // Random variation
    
    return {
      year: year,
      anomaly: baseAnomaly + yearVariation + randomVariation,
      source: 'Mock Data'
    }
  }
}

export function getTemperatureTrend(anomaly) {
  if (anomaly < 0.5) return { trend: 'Cooling', color: '#3b82f6', severity: 'low' }
  if (anomaly < 1.0) return { trend: 'Moderate Warming', color: '#f59e0b', severity: 'medium' }
  if (anomaly < 1.5) return { trend: 'Significant Warming', color: '#ef4444', severity: 'high' }
  return { trend: 'Extreme Warming', color: '#dc2626', severity: 'critical' }
}

export function getHistoricalTrend() {
  // Mock historical trend data
  const years = Array.from({ length: 26 }, (_, i) => 2000 + i)
  return years.map(year => {
    const baseAnomaly = 0.3
    const yearVariation = (year - 2000) * 0.025
    const randomVariation = (Math.random() - 0.5) * 0.2
    
    return {
      year: year,
      anomaly: baseAnomaly + yearVariation + randomVariation
    }
  })
}
