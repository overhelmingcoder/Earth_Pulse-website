// NASA GIBS API Configuration and Data Fetching Utilities
// This file contains functions to fetch real NASA satellite data and mock data for development

export interface NASALayer {
  name: string
  layer: string
  format: string
  version: string
  transparent: boolean
  opacity: number
  colorScale: string
  min: number
  max: number
}

export interface EnvironmentalData {
  lat: number
  lng: number
  value: number
  unit: string
  status: 'good' | 'moderate' | 'warning' | 'critical'
  trend: 'increasing' | 'decreasing' | 'stable'
  timestamp: string
}

export interface HistoricalData {
  year: number
  value: number
  change: number
}

// NASA GIBS Layer Configuration
export const nasaLayers: Record<string, NASALayer> = {
  air: {
    name: 'MODIS Aerosol Optical Depth',
    layer: 'MODIS_Terra_Aerosol',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.7,
    colorScale: 'viridis',
    min: 0,
    max: 1
  },
  forest: {
    name: 'MODIS Vegetation Index',
    layer: 'MODIS_Terra_NDVI_Monthly',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.6,
    colorScale: 'greens',
    min: -0.2,
    max: 1
  },
  temperature: {
    name: 'MODIS Land Surface Temperature',
    layer: 'MODIS_Terra_Land_Surface_Temp_Day',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.7,
    colorScale: 'plasma',
    min: -50,
    max: 50
  },
  water: {
    name: 'GRACE Groundwater Anomaly',
    layer: 'GRACE_Tellus_Liquid_Water_Equivalent_Thickness_Mascon_CRI',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.6,
    colorScale: 'blues',
    min: -20,
    max: 20
  }
}

// Mock data for development and testing
export const mockEnvironmentalData: Record<string, EnvironmentalData[]> = {
  air: [
    { lat: 40.7128, lng: -74.0060, value: 0.65, unit: 'AOD', status: 'moderate', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 51.5074, lng: -0.1278, value: 0.42, unit: 'AOD', status: 'good', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 35.6762, lng: 139.6503, value: 0.78, unit: 'AOD', status: 'warning', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -33.8688, lng: 151.2093, value: 0.31, unit: 'AOD', status: 'good', trend: 'stable', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -23.5505, lng: -46.6333, value: 0.89, unit: 'AOD', status: 'critical', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' }
  ],
  forest: [
    { lat: 40.7128, lng: -74.0060, value: 72, unit: '%', status: 'warning', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 51.5074, lng: -0.1278, value: 85, unit: '%', status: 'good', trend: 'stable', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 35.6762, lng: 139.6503, value: 68, unit: '%', status: 'warning', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -33.8688, lng: 151.2093, value: 91, unit: '%', status: 'good', trend: 'stable', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -23.5505, lng: -46.6333, value: 45, unit: '%', status: 'critical', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' }
  ],
  temperature: [
    { lat: 40.7128, lng: -74.0060, value: 18.5, unit: '°C', status: 'critical', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 51.5074, lng: -0.1278, value: 12.3, unit: '°C', status: 'moderate', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 35.6762, lng: 139.6503, value: 22.1, unit: '°C', status: 'warning', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -33.8688, lng: 151.2093, value: 16.8, unit: '°C', status: 'moderate', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -23.5505, lng: -46.6333, value: 25.4, unit: '°C', status: 'critical', trend: 'increasing', timestamp: '2024-01-15T10:00:00Z' }
  ],
  water: [
    { lat: 40.7128, lng: -74.0060, value: -12.5, unit: 'cm', status: 'critical', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 51.5074, lng: -0.1278, value: -3.2, unit: 'cm', status: 'moderate', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: 35.6762, lng: 139.6503, value: -8.7, unit: 'cm', status: 'warning', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -33.8688, lng: 151.2093, value: -1.8, unit: 'cm', status: 'good', trend: 'stable', timestamp: '2024-01-15T10:00:00Z' },
    { lat: -23.5505, lng: -46.6333, value: -15.2, unit: 'cm', status: 'critical', trend: 'decreasing', timestamp: '2024-01-15T10:00:00Z' }
  ]
}

// Historical data for trend analysis
export const mockHistoricalData: Record<string, HistoricalData[]> = {
  air: [
    { year: 2000, value: 0.45, change: 0 },
    { year: 2005, value: 0.48, change: 6.7 },
    { year: 2010, value: 0.52, change: 15.6 },
    { year: 2015, value: 0.58, change: 28.9 },
    { year: 2020, value: 0.62, change: 37.8 },
    { year: 2024, value: 0.65, change: 44.4 }
  ],
  forest: [
    { year: 2000, value: 85, change: 0 },
    { year: 2005, value: 82, change: -3.5 },
    { year: 2010, value: 79, change: -7.1 },
    { year: 2015, value: 76, change: -10.6 },
    { year: 2020, value: 74, change: -12.9 },
    { year: 2024, value: 72, change: -15.3 }
  ],
  temperature: [
    { year: 2000, value: 16.2, change: 0 },
    { year: 2005, value: 16.8, change: 3.7 },
    { year: 2010, value: 17.1, change: 5.6 },
    { year: 2015, value: 17.6, change: 8.6 },
    { year: 2020, value: 18.1, change: 11.7 },
    { year: 2024, value: 18.5, change: 14.2 }
  ],
  water: [
    { year: 2000, value: -2.1, change: 0 },
    { year: 2005, value: -4.2, change: -100 },
    { year: 2010, value: -6.8, change: -223.8 },
    { year: 2015, value: -9.1, change: -333.3 },
    { year: 2020, value: -11.3, change: -438.1 },
    { year: 2024, value: -12.5, change: -495.2 }
  ]
}

// Function to get NASA GIBS WMS URL
export function getNASAWMSUrl(layer: NASALayer, year: number, bbox?: string): string {
  const baseUrl = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi'
  const params = new URLSearchParams({
    service: 'WMS',
    version: layer.version,
    request: 'GetMap',
    layers: layer.layer,
    format: layer.format,
    transparent: layer.transparent.toString(),
    time: `${year}-01-01/${year}-12-31`,
    width: '512',
    height: '512'
  })

  if (bbox) {
    params.append('bbox', bbox)
  }

  return `${baseUrl}?${params.toString()}`
}

// Function to fetch environmental data for a specific location
export async function fetchEnvironmentalData(
  dataset: string,
  lat: number,
  lng: number,
  year: number
): Promise<EnvironmentalData | null> {
  try {
    // In a real implementation, this would call NASA's API
    // For now, we'll return mock data based on location
    const mockData = mockEnvironmentalData[dataset]
    if (!mockData) return null

    // Find the closest data point (simplified)
    const closest = mockData.reduce((prev, curr) => {
      const prevDist = Math.sqrt(Math.pow(prev.lat - lat, 2) + Math.pow(prev.lng - lng, 2))
      const currDist = Math.sqrt(Math.pow(curr.lat - lat, 2) + Math.pow(curr.lng - lng, 2))
      return currDist < prevDist ? curr : prev
    })

    // Adjust value based on year (simplified trend)
    const historicalData = mockHistoricalData[dataset]
    if (historicalData) {
      const baseline = historicalData.find(d => d.year === 2000)?.value || closest.value
      const current = historicalData.find(d => d.year === year)?.value || closest.value
      const factor = current / baseline
      
      return {
        ...closest,
        value: closest.value * factor,
        timestamp: new Date().toISOString()
      }
    }

    return closest
  } catch (error) {
    console.error('Error fetching environmental data:', error)
    return null
  }
}

// Function to fetch historical data for trend analysis
export async function fetchHistoricalData(
  dataset: string,
  lat: number,
  lng: number,
  startYear: number = 2000,
  endYear: number = 2024
): Promise<HistoricalData[]> {
  try {
    // In a real implementation, this would call NASA's historical API
    // For now, we'll return mock data
    const historicalData = mockHistoricalData[dataset]
    if (!historicalData) return []

    return historicalData.filter(data => 
      data.year >= startYear && data.year <= endYear
    )
  } catch (error) {
    console.error('Error fetching historical data:', error)
    return []
  }
}

// Function to get global statistics
export async function getGlobalStatistics(dataset: string): Promise<{
  total: number
  critical: number
  warning: number
  moderate: number
  good: number
}> {
  try {
    const data = mockEnvironmentalData[dataset]
    if (!data) return { total: 0, critical: 0, warning: 0, moderate: 0, good: 0 }

    const stats = data.reduce((acc, item) => {
      acc.total++
      acc[item.status]++
      return acc
    }, { total: 0, critical: 0, warning: 0, moderate: 0, good: 0 })

    return stats
  } catch (error) {
    console.error('Error fetching global statistics:', error)
    return { total: 0, critical: 0, warning: 0, moderate: 0, good: 0 }
  }
}

// Function to get status color based on value and dataset
export function getStatusColor(value: number, dataset: string): string {
  const layer = nasaLayers[dataset]
  if (!layer) return 'gray'

  const normalizedValue = (value - layer.min) / (layer.max - layer.min)
  
  if (dataset === 'air') {
    if (normalizedValue < 0.3) return 'green'
    if (normalizedValue < 0.6) return 'yellow'
    if (normalizedValue < 0.8) return 'orange'
    return 'red'
  }
  
  if (dataset === 'forest') {
    if (normalizedValue > 0.8) return 'green'
    if (normalizedValue > 0.6) return 'yellow'
    if (normalizedValue > 0.4) return 'orange'
    return 'red'
  }
  
  if (dataset === 'temperature') {
    if (normalizedValue < 0.3) return 'green'
    if (normalizedValue < 0.6) return 'yellow'
    if (normalizedValue < 0.8) return 'orange'
    return 'red'
  }
  
  if (dataset === 'water') {
    if (normalizedValue > 0.7) return 'green'
    if (normalizedValue > 0.4) return 'yellow'
    if (normalizedValue > 0.2) return 'orange'
    return 'red'
  }
  
  return 'gray'
}

// Function to get trend direction based on historical data
export function getTrendDirection(historicalData: HistoricalData[]): 'increasing' | 'decreasing' | 'stable' {
  if (historicalData.length < 2) return 'stable'
  
  const first = historicalData[0]
  const last = historicalData[historicalData.length - 1]
  const change = last.value - first.value
  
  if (Math.abs(change) < 0.1) return 'stable'
  return change > 0 ? 'increasing' : 'decreasing'
}

// Export constants for use in components
export const DATASET_NAMES = {
  air: 'Air Quality',
  forest: 'Forest Cover',
  temperature: 'Temperature',
  water: 'Water Levels'
}

export const STATUS_LABELS = {
  good: 'Good',
  moderate: 'Moderate',
  warning: 'Warning',
  critical: 'Critical'
}
