'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import L from 'leaflet'
import { Cloud, TreePine, Thermometer, Droplets } from 'lucide-react'
import { bangladeshDistricts, getSeverityLevel, getSeverityColor, getHeatmapData } from '@/lib/bangladeshDistricts'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Import leaflet.heat plugin
import 'leaflet.heat'

// Extend Leaflet types to include heatLayer
declare module 'leaflet' {
  function heatLayer(latlngs: any[], options?: any): any
}

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface BangladeshMapProps {
  selectedDataset: string
  selectedYear: number
  onLocationSelect: (lat: number, lng: number, name: string, district: string) => void
}

// NASA GIBS Layer Configuration for Bangladesh
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
    defaultDate: '2023-08-01'
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
  return `${year}-08-01`
}

// Helper function to get NASA GIBS WMTS URL
const getNASAWMTSUrl = (layer: string, date: string): string => {
  return `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${date}/250m/{z}/{y}/{x}.png`
}

export default function BangladeshMap({ selectedDataset, selectedYear, onLocationSelect }: BangladeshMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const heatmapLayerRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMapReady, setIsMapReady] = useState(false)

  const layer = nasaLayers[selectedDataset as keyof typeof nasaLayers]

  // Initialize map on component mount
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize Leaflet map centered on Bangladesh
    const map = L.map(mapRef.current, {
      center: [23.685, 90.3563], // Bangladesh center
      zoom: 6, // Zoom level for Bangladesh
      zoomControl: true,
      attributionControl: false,
      scrollWheelZoom: true
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

    // Add click handler for map clicks
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng
      
      // Find the closest district
      let closestDistrict = bangladeshDistricts[0]
      let minDistance = Infinity
      
      bangladeshDistricts.forEach(district => {
        const distance = Math.sqrt(
          Math.pow(lat - district.lat, 2) + Math.pow(lng - district.lng, 2)
        )
        if (distance < minDistance) {
          minDistance = distance
          closestDistrict = district
        }
      })
      
              onLocationSelect(closestDistrict.lat, closestDistrict.lng, closestDistrict.name, closestDistrict.name)
    }

    map.on('click', handleMapClick)

    // Add district markers
    bangladeshDistricts.forEach((district) => {
      const datasetValue = district[selectedDataset as keyof typeof district] || 0.5
      const severity = getSeverityLevel(datasetValue)
      const color = getSeverityColor(severity)
      
      // Create custom icon based on severity
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width: 15px; 
          height: 15px; 
          background: ${color}; 
          border: 2px solid white; 
          border-radius: 50%; 
          box-shadow: 0 0 10px ${color};
          animation: ${severity === 'alarming' ? 'pulse 2s infinite' : 'none'};
        "></div>`,
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5]
      })
      
      const marker = L.circleMarker([district.lat, district.lng], {
        radius: 15,
        fillColor: color,
        color: 'white',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map)
      
      // Enhanced popup content
      const popupContent = `
        <div class="p-3 min-w-[250px]">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-lg">${district.name}</h3>
            <div class="w-3 h-3 rounded-full" style="background: ${color}"></div>
          </div>
          <p class="text-sm text-gray-600 mb-2">${district.division} Division</p>
          <div class="space-y-2 text-xs">
            <div class="flex justify-between">
              <span>Air Quality:</span>
              <span class="font-semibold">${(district.airQuality * 100).toFixed(0)}%</span>
            </div>
            <div class="flex justify-between">
              <span>Forest Cover:</span>
              <span class="font-semibold">${(district.forestCover * 100).toFixed(0)}%</span>
            </div>
            <div class="flex justify-between">
              <span>Temperature:</span>
              <span class="font-semibold">${(district.temperature * 100).toFixed(0)}%</span>
            </div>
            <div class="flex justify-between">
              <span>Water Level:</span>
              <span class="font-semibold">${(district.waterLevel * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div class="w-full h-2 mt-2 rounded-full bg-gray-200">
            <div class="h-2 rounded-full" style="width: ${(Number(datasetValue) * 100).toFixed(0)}%; background: ${color}"></div>
          </div>
          <div class="mt-2 text-xs">
            <span class="font-semibold" style="color: ${color}">${severity.toUpperCase()}</span>
          </div>
        </div>
      `
      
      marker.bindPopup(popupContent)
      
      // Add click handler for markers
      marker.on('click', () => {
        onLocationSelect(district.lat, district.lng, district.name, district.name)
      })
    })

    // Add heatmap layer
    const heatmapData = getHeatmapData(bangladeshDistricts, selectedDataset)
    if (typeof L.heatLayer === 'function') {
      const heatmapLayer = L.heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        max: 1.0,
        gradient: { 0.4: '#10b981', 0.7: '#f59e0b', 1: '#ef4444' }
      }).addTo(map)
      
      heatmapLayerRef.current = heatmapLayer
    }

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
            <span>Good</span>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Warning</span>
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Alarming</span>
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

    // Update heatmap
    if (heatmapLayerRef.current) {
      mapInstanceRef.current.removeLayer(heatmapLayerRef.current)
    }
    
    const heatmapData = getHeatmapData(bangladeshDistricts, selectedDataset)
    if (typeof L.heatLayer === 'function') {
      const heatmapLayer = L.heatLayer(heatmapData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        max: 1.0,
        gradient: { 0.4: '#10b981', 0.7: '#f59e0b', 1: '#ef4444' }
      }).addTo(mapInstanceRef.current)
      
      heatmapLayerRef.current = heatmapLayer
    }

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
              <span>Good</span>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Warning</span>
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Alarming</span>
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
      
      {/* Map container */}
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[100vh]"
        style={{ height: '100vh', width: '100%' }}
      />
    </div>
  )
}
