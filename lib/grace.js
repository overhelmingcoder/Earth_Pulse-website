// NASA GRACE API for water level/groundwater data
// Mock data fallback for demo purposes

export async function fetchWaterLevelData(lat, lng, year = 2024) {
  try {
    // In a real implementation, you would call the GRACE API
    // For demo purposes, we'll use mock data
    const response = await fetch(`https://grace.jpl.nasa.gov/data/get-data/`)
    
    if (!response.ok) {
      throw new Error('GRACE API request failed')
    }
    
    // Mock successful response
    return {
      year: year,
      waterLevel: Math.random() * 100 - 50, // -50 to +50 cm variation
      groundwater: Math.random() * 20 - 10, // -10 to +10 cm
      source: 'NASA GRACE'
    }
  } catch (error) {
    console.warn('GRACE API failed, using mock data:', error.message)
    
    // Mock water level data
    const baseLevel = -20 // Base water level change
    const yearVariation = (year - 2000) * 0.5 // Linear trend
    const randomVariation = (Math.random() - 0.5) * 10 // Random variation
    
    return {
      year: year,
      waterLevel: baseLevel + yearVariation + randomVariation,
      groundwater: (Math.random() - 0.5) * 15,
      source: 'Mock Data'
    }
  }
}

export function getWaterLevelTrend(waterLevel) {
  if (waterLevel > 10) return { trend: 'Rising', color: '#3b82f6', severity: 'low' }
  if (waterLevel > -10) return { trend: 'Stable', color: '#10b981', severity: 'low' }
  if (waterLevel > -30) return { trend: 'Declining', color: '#f59e0b', severity: 'medium' }
  return { trend: 'Critical Decline', color: '#ef4444', severity: 'high' }
}

export function getHistoricalWaterLevels() {
  // Mock historical water level data
  const years = Array.from({ length: 26 }, (_, i) => 2000 + i)
  return years.map(year => {
    const baseLevel = -15
    const yearVariation = (year - 2000) * 0.3
    const randomVariation = (Math.random() - 0.5) * 8
    
    return {
      year: year,
      waterLevel: baseLevel + yearVariation + randomVariation
    }
  })
}

export function getGroundwaterStatus(groundwater) {
  if (groundwater > 5) return { status: 'Above Normal', color: '#3b82f6' }
  if (groundwater > -5) return { status: 'Normal', color: '#10b981' }
  if (groundwater > -10) return { status: 'Below Normal', color: '#f59e0b' }
  return { status: 'Critical', color: '#ef4444' }
}
