'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import L from 'leaflet'
import { Cloud, TreePine, Thermometer, Droplets } from 'lucide-react'

// Import Leaflet CSS - this is crucial for map rendering
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapProps {
  selectedDataset: string
  selectedYear: number
  onLocationSelect: (lat: number, lng: number, name: string) => void
}

// NASA GIBS Layer Configuration
// To change default date: modify the 'defaultDate' property below
// To adjust zoom: modify the 'zoom' property in the map initialization
// To switch tile layers: modify the 'layer' property for each dataset
const nasaLayers = {
  airQuality: {
    name: 'MODIS Aerosol Optical Depth',
    layer: 'MODIS_Terra_Aerosol',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.7,
    colorScale: 'viridis',
    min: 0,
    max: 1,
    defaultDate: '2023-08-01' // Change this to set default date
  },
  forestCover: {
    name: 'MODIS Vegetation Index',
    layer: 'MODIS_Terra_NDVI_16Day',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.6,
    colorScale: 'greens',
    min: -0.2,
    max: 1,
    defaultDate: '2023-08-01'
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
    max: 50,
    defaultDate: '2023-08-01'
  },
  waterLevel: {
    name: 'AMSR2 Snow Water Equivalent',
    layer: 'AMSR2_Snow_Water_Equivalent',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.6,
    colorScale: 'blues',
    min: 0,
    max: 100,
    defaultDate: '2023-08-01'
  },
  weather: {
    name: 'MODIS Corrected Reflectance True Color',
    layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.8,
    colorScale: 'natural',
    min: 0,
    max: 1,
    defaultDate: '2023-08-01'
  }
}

// Helper function to get date string from year
const getDateFromYear = (year: number): string => {
  // Use August 1st of the selected year as default
  return `${year}-08-01`
}

// Helper function to get NASA GIBS WMTS URL
const getNASAWMTSUrl = (layer: string, date: string): string => {
  // NASA GIBS WMTS service with EPSG:3857 projection
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${date}/250m/{z}/{y}/{x}.png`
}

// Helper function to get NASA GIBS WMS URL (fallback)
const getNASAWMSUrl = (layer: string, date: string): string => {
  // NASA GIBS WMS service with EPSG:4326 projection
  return `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?service=WMS&version=1.3.0&request=GetMap&layers=${layer}&format=image/png&transparent=true&time=${date}`
}

export default function Map({ selectedDataset, selectedYear, onLocationSelect }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMapReady, setIsMapReady] = useState(false)

  const layer = nasaLayers[selectedDataset as keyof typeof nasaLayers]

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize Leaflet map
    // To adjust zoom: change the zoom value here (default: 2)
    const map = L.map(mapRef.current, {
      center: [20, 0], // Center coordinates: [latitude, longitude]
      zoom: 2, // Change this value to adjust initial zoom level
      zoomControl: true,
      attributionControl: false
    })

    mapInstanceRef.current = map

    // Add base OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    // Add NASA GIBS layer
    const date = getDateFromYear(selectedYear)
    const nasaUrl = getNASAWMTSUrl(layer.layer, date)
    
    const nasaTileLayer = L.tileLayer(nasaUrl, {
      opacity: layer.opacity,
      attribution: 'NASA GIBS'
    }).addTo(map)

    tileLayerRef.current = nasaTileLayer

    // Add click handler
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      
      // Mock location names for demo
      const locationNames = [
        'New York, USA',
        'London, UK',
        'Tokyo, Japan',
        'Sydney, Australia',
        'São Paulo, Brazil',
        'Mumbai, India',
        'Cairo, Egypt',
        'Moscow, Russia'
      ]
      const randomName = locationNames[Math.floor(Math.random() * locationNames.length)]
      
      onLocationSelect(lat, lng, randomName)
    }

    map.on('click', handleMapClick)

    // Enhanced sample points with heatmap data
    const samplePoints = [
      // Air Pollution hotspots
      { lat: 28.6139, lng: 77.2090, name: 'Delhi', value: 0.9, type: 'airQuality', description: 'Severe Pollution', severity: 'danger' },
      { lat: 39.9042, lng: 116.4074, name: 'Beijing', value: 0.8, type: 'airQuality', description: 'High Pollution', severity: 'danger' },
      { lat: 40.7128, lng: -74.0060, name: 'New York', value: 0.6, type: 'airQuality', description: 'Moderate Pollution', severity: 'warning' },
      
      // Forest Cover changes
      { lat: -3.4653, lng: -58.3801, name: 'Amazon Rainforest', value: 0.3, type: 'forestCover', description: 'Heavy Deforestation', severity: 'danger' },
      { lat: 4.5709, lng: -74.2973, name: 'Colombian Amazon', value: 0.5, type: 'forestCover', description: 'Moderate Deforestation', severity: 'warning' },
      { lat: 1.3521, lng: 103.8198, name: 'Singapore', value: 0.8, type: 'forestCover', description: 'Good Forest Cover', severity: 'safe' },
      
      // Temperature anomalies
      { lat: 78.2200, lng: 15.6500, name: 'Svalbard', value: 0.9, type: 'temperature', description: 'Extreme Warming', severity: 'danger' },
      { lat: 64.8255, lng: -147.6444, name: 'Fairbanks', value: 0.7, type: 'temperature', description: 'High Warming', severity: 'warning' },
      { lat: -77.8460, lng: 166.6760, name: 'McMurdo Station', value: 0.8, type: 'temperature', description: 'Rapid Warming', severity: 'danger' },
      
      // Water level changes
      { lat: 25.2048, lng: 55.2708, name: 'Dubai', value: 0.4, type: 'waterLevel', description: 'Water Scarcity', severity: 'warning' },
      { lat: 23.6345, lng: -102.5528, name: 'Mexico City', value: 0.6, type: 'waterLevel', description: 'Groundwater Depletion', severity: 'warning' },
      { lat: 52.3676, lng: 4.9041, name: 'Amsterdam', value: 0.8, type: 'waterLevel', description: 'Sea Level Rise', severity: 'danger' }
    ]

    // Heatmap data points
    const heatmapData = samplePoints.map(point => ({
      lat: point.lat,
      lng: point.lng,
      intensity: point.value
    }))

    samplePoints.forEach((point, index) => {
      // Create custom icon based on severity
      const severityColors = {
        safe: '#10b981',
        warning: '#f59e0b', 
        danger: '#ef4444'
      }
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 20px; 
          height: 20px; 
          background: ${severityColors[point.severity]}; 
          border: 2px solid white; 
          border-radius: 50%; 
          box-shadow: 0 0 10px ${severityColors[point.severity]};
          animation: ${point.severity === 'danger' ? 'pulse 2s infinite' : 'none'};
        "></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
      
      const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map)
      
      const popupContent = `
        <div class="p-3 min-w-[200px]">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-lg">${point.name}</h3>
            <div class="w-3 h-3 rounded-full bg-${point.severity === 'safe' ? 'green' : point.severity === 'warning' ? 'yellow' : 'red'}-500"></div>
          </div>
          <p class="text-sm text-gray-600 mb-2">${point.description}</p>
          <div class="space-y-1 text-xs">
            <div class="flex justify-between">
              <span>Current Value:</span>
              <span class="font-semibold">${(point.value * 100).toFixed(0)}%</span>
            </div>
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="font-semibold text-${point.severity === 'safe' ? 'green' : point.severity === 'warning' ? 'yellow' : 'red'}-600">${point.severity.toUpperCase()}</span>
            </div>
          </div>
          <div class="w-full h-2 mt-2 rounded-full bg-gray-200">
            <div class="h-2 rounded-full bg-${point.severity === 'safe' ? 'green' : point.severity === 'warning' ? 'yellow' : 'red'}-500" style="width: ${point.value * 100}%"></div>
          </div>
        </div>
      `
      
      marker.bindPopup(popupContent)
    })

    // Add custom info control
    const info = L.control({ position: 'bottomleft' })
    
    info.onAdd = function() {
      const div = L.DomUtil.create('div', 'info')
      div.innerHTML = `
        <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h4 class="font-semibold text-sm mb-2">${layer.name}</h4>
          <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Year: ${selectedYear}</p>
          <div class="flex items-center space-x-2 text-xs">
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Safe</span>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Moderate</span>
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Dangerous</span>
          </div>
        </div>
      `
      return div
    }
    
    info.addTo(map)

    setIsMapReady(true)
    setIsLoading(false)

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, []) // Empty dependency array - only run once on mount

  // Update tile layer when dataset or year changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return

    setIsLoading(true)

    // Remove old tile layer
    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current)
    }

    // Add new tile layer with updated date
    const date = getDateFromYear(selectedYear)
    const nasaUrl = getNASAWMTSUrl(layer.layer, date)
    
    const newTileLayer = L.tileLayer(nasaUrl, {
      opacity: layer.opacity,
      attribution: 'NASA GIBS'
    }).addTo(mapInstanceRef.current)

    tileLayerRef.current = newTileLayer

    // Update info control
    const infoElements = document.querySelectorAll('.info')
    infoElements.forEach(element => {
      if (element.innerHTML.includes('font-semibold')) {
        element.innerHTML = `
          <div class="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h4 class="font-semibold text-sm mb-2">${layer.name}</h4>
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Year: ${selectedYear}</p>
            <div class="flex items-center space-x-2 text-xs">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Safe</span>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Moderate</span>
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Dangerous</span>
            </div>
          </div>
        `
      }
    })

    // Simulate loading time
    setTimeout(() => setIsLoading(false), 500)
  }, [selectedDataset, selectedYear, layer])

  const getDatasetIcon = () => {
    const iconClass = "w-5 h-5"
    switch (selectedDataset) {
      case 'airQuality':
        return <Cloud className={iconClass} />
      case 'forestCover':
        return <TreePine className={iconClass} />
      case 'temperature':
        return <Thermometer className={iconClass} />
      case 'waterLevel':
        return <Droplets className={iconClass} />
      case 'weather':
        return <Cloud className={iconClass} />
      default:
        return <Cloud className={iconClass} />
    }
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-lg">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              {getDatasetIcon()}
              <div>
                <p className="font-medium">Loading {layer.name}</p>
                <p className="text-sm text-gray-500">Year: {selectedYear}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Map container - 100vh height and 100% width */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[100vh]"
        style={{ height: '100vh', width: '100%' }}
      />
    </div>
  )
}
