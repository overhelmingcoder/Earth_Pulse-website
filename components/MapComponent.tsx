'use client'

import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  TreePine, 
  Thermometer, 
  Droplets,
  MapPin,
  Info
} from 'lucide-react'
import { bangladeshDistricts, getSeverityLevel, getSeverityColor, getHeatmapData } from '@/lib/bangladeshDistricts'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface MapComponentProps {
  selectedDataset: string
  selectedYear: number
  onDistrictSelect: (district: {
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }) => void
  selectedDistrict: {
    id: number
    name: string
    lat: number
    lng: number
    division: string
  } | null
  comparisonMode: boolean
  comparisonDistricts: Array<{
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }>
  searchQuery: string
}

// NASA GIBS Layer Configuration
const nasaLayers = {
  airQuality: {
    name: 'Air Pollution',
    layer: 'MODIS_Terra_Aerosol',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.7,
    colorScale: 'viridis',
    min: 0,
    max: 1,
    defaultDate: '2023-08-01',
    icon: Cloud,
    color: 'text-blue-500'
  },
  forestCover: {
    name: 'Forest Cover',
    layer: 'MODIS_Terra_NDVI_16Day',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.6,
    colorScale: 'greens',
    min: -0.2,
    max: 1,
    defaultDate: '2023-08-01',
    icon: TreePine,
    color: 'text-green-500'
  },
  temperature: {
    name: 'Temperature Changes',
    layer: 'MODIS_Terra_Land_Surface_Temp_Day',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.7,
    colorScale: 'plasma',
    min: -50,
    max: 50,
    defaultDate: '2023-08-01',
    icon: Thermometer,
    color: 'text-red-500'
  },
  waterLevel: {
    name: 'Water Levels',
    layer: 'AMSR2_Snow_Water_Equivalent',
    format: 'image/png',
    version: '1.3.0',
    transparent: true,
    opacity: 0.6,
    colorScale: 'blues',
    min: 0,
    max: 100,
    defaultDate: '2023-08-01',
    icon: Droplets,
    color: 'text-cyan-500'
  }
}

// Helper function to get date string from year
const getDateFromYear = (year: number): string => {
  return `${year}-08-01`
}

// Helper function to get NASA GIBS WMTS URL
const getNASAWMTSUrl = (layer: string, date: string): string => {
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${date}/250m/{z}/{y}/{x}.png`
}

export default function MapComponent({ 
  selectedDataset, 
  selectedYear, 
  onDistrictSelect, 
  selectedDistrict,
  comparisonMode,
  comparisonDistricts,
  searchQuery
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const heatmapLayerRef = useRef<any>(null)
  const markersRef = useRef<L.CircleMarker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMapReady, setIsMapReady] = useState(false)

  const layer = nasaLayers[selectedDataset as keyof typeof nasaLayers]

  // Filter districts based on search query
  const filteredDistricts = bangladeshDistricts.filter(district =>
    district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    district.division.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize Leaflet map centered on Bangladesh
    const map = L.map(mapRef.current, {
      center: [23.685, 90.3563], // Bangladesh center
      zoom: 6, // Zoom level for Bangladesh
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true,
      doubleClickZoom: true
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

    // Add district markers
    addDistrictMarkers(map)

    // Add heatmap layer
    addHeatmapLayer(map)

    // Add custom info control
    addInfoControl(map)

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

  // Update map when dataset, year, or search changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    setIsLoading(true)

    // Update tile layer
    updateTileLayer()

    // Update markers
    updateMarkers()

    // Update heatmap
    updateHeatmap()

    // Update info control
    updateInfoControl()

    // Simulate loading time
    setTimeout(() => setIsLoading(false), 500)
  }, [selectedDataset, selectedYear, searchQuery, comparisonMode, comparisonDistricts])

  const addDistrictMarkers = (map: L.Map) => {
    filteredDistricts.forEach((district) => {
      const datasetValue = district[selectedDataset as keyof typeof district] || 0.5
      const severity = getSeverityLevel(datasetValue)
      const color = getSeverityColor(severity)
      
      const marker = L.circleMarker([district.lat, district.lng], {
        radius: 12,
        fillColor: color,
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map)

      markersRef.current.push(marker)

      // Enhanced popup content with charts
      const popupContent = createPopupContent(district, datasetValue, severity, color)
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      })

      // Add click handler
      marker.on('click', () => {
        onDistrictSelect({
          id: district.id,
          name: district.name,
          lat: district.lat,
          lng: district.lng,
          division: district.division
        })
      })

      // Add hover effects
      marker.on('mouseover', function(this: any) {
        this.setRadius(16)
        this.setStyle({ fillOpacity: 1 })
      })

      marker.on('mouseout', function(this: any) {
        this.setRadius(12)
        this.setStyle({ fillOpacity: 0.8 })
      })
    })
  }

  const createPopupContent = (district: any, datasetValue: string | number, severity: string, color: string) => {
    const IconComponent = layer.icon
    return `
      <div class="p-4 min-w-[280px]">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-bold text-lg text-gray-800">${district.name}</h3>
          <div class="w-3 h-3 rounded-full" style="background: ${color}"></div>
        </div>
        <p class="text-sm text-gray-600 mb-3">${district.division} Division</p>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Air Quality:</span>
            <span class="font-semibold">${(district.airQuality * 100).toFixed(0)}%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Forest Cover:</span>
            <span class="font-semibold">${(district.forestCover * 100).toFixed(0)}%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Temperature:</span>
            <span class="font-semibold">${(district.temperature * 100).toFixed(0)}%</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Water Level:</span>
            <span class="font-semibold">${(district.waterLevel * 100).toFixed(0)}%</span>
          </div>
        </div>
        
        <div class="w-full h-2 mt-3 rounded-full bg-gray-200">
          <div class="h-2 rounded-full transition-all duration-300" style="width: ${(Number(datasetValue) * 100).toFixed(0)}%; background: ${color}"></div>
        </div>
        
        <div class="mt-2 text-xs">
          <span class="font-semibold" style="color: ${color}">${severity.toUpperCase()}</span>
        </div>
        
        <div class="mt-3 pt-3 border-t border-gray-200">
          <p class="text-xs text-gray-500">Click for detailed analysis</p>
        </div>
      </div>
    `
  }

  const addHeatmapLayer = (map: L.Map) => {
    const heatmapData = getHeatmapData(filteredDistricts, selectedDataset)
    if (typeof L.heatLayer === 'function') {
      const heatmapLayer = L.heatLayer(heatmapData, {
        radius: 30,
        blur: 20,
        maxZoom: 10,
        max: 1.0,
        gradient: { 0.4: '#10b981', 0.7: '#f59e0b', 1: '#ef4444' }
      }).addTo(map)
      
      heatmapLayerRef.current = heatmapLayer
    }
  }

  const addInfoControl = (map: L.Map) => {
    const InfoControl = L.Control.extend({
      onAdd: function() {
        const div = L.DomUtil.create('div', 'info')
        div.innerHTML = `
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <div class="flex items-center space-x-2 mb-2">
            <div class="w-4 h-4 rounded-full" style="background: ${layer.color.replace('text-', '')}"></div>
            <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-200">${layer.name}</h4>
          </div>
          <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Year: ${selectedYear}</p>
          <p class="text-xs text-gray-600 dark:text-gray-400">Districts: ${filteredDistricts.length}/64</p>
          <div class="flex items-center space-x-2 text-xs mt-2">
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <span class="text-gray-600 dark:text-gray-400">Good</span>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span class="text-gray-600 dark:text-gray-400">Moderate</span>
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span class="text-gray-600 dark:text-gray-400">Alarming</span>
          </div>
        </div>
      `
      return div
    }
    })
    
    const info = new InfoControl({ position: 'bottomleft' })
    info.addTo(map)
  }

  const updateTileLayer = () => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return

    // Remove old tile layer
    mapInstanceRef.current.removeLayer(tileLayerRef.current)

    // Add new tile layer with updated date
    const date = getDateFromYear(selectedYear)
    const nasaUrl = getNASAWMTSUrl(layer.layer, date)
    
    const newTileLayer = L.tileLayer(nasaUrl, {
      opacity: layer.opacity,
      attribution: 'NASA GIBS'
    }).addTo(mapInstanceRef.current)

    tileLayerRef.current = newTileLayer
  }

  const updateMarkers = () => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current!.removeLayer(marker)
    })
    markersRef.current = []

    // Add new markers
    addDistrictMarkers(mapInstanceRef.current)
  }

  const updateHeatmap = () => {
    if (!mapInstanceRef.current) return

    // Remove old heatmap
    if (heatmapLayerRef.current) {
      mapInstanceRef.current.removeLayer(heatmapLayerRef.current)
    }

    // Add new heatmap
    addHeatmapLayer(mapInstanceRef.current)
  }

  const updateInfoControl = () => {
    const infoElements = document.querySelectorAll('.info')
    infoElements.forEach(element => {
      if (element.innerHTML.includes('font-semibold')) {
        element.innerHTML = `
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
            <div class="flex items-center space-x-2 mb-2">
              <div class="w-4 h-4 rounded-full" style="background: ${layer.color.replace('text-', '')}"></div>
              <h4 class="font-semibold text-sm text-gray-800 dark:text-gray-200">${layer.name}</h4>
            </div>
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Year: ${selectedYear}</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">Districts: ${filteredDistricts.length}/64</p>
            <div class="flex items-center space-x-2 text-xs mt-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-gray-600 dark:text-gray-400">Good</span>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-gray-600 dark:text-gray-400">Moderate</span>
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span class="text-gray-600 dark:text-gray-400">Alarming</span>
            </div>
          </div>
        `
      }
    })
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 rounded-lg"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-3">
              <layer.icon className="w-5 h-5 text-green-500 animate-spin" />
              <div>
                <p className="font-medium">Loading {layer.name}</p>
                <p className="text-sm text-gray-500">Year: {selectedYear}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ height: '100vh', width: '100%' }}
      />
    </div>
  )
}
