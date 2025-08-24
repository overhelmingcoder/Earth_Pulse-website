'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Satellite, 
  TrendingUp, 
  AlertTriangle, 
  MapPin,
  Cloud,
  TreePine,
  Thermometer,
  Droplets,
  Search,
  BarChart3,
  Clock,
  ExternalLink,
  Settings,
  Layers,
  Home
} from 'lucide-react'
import Link from 'next/link'

// Dynamically import components to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <Globe className="w-12 h-12 mx-auto mb-4 text-green-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading interactive map...</p>
      </div>
    </div>
  )
})

const Sidebar = dynamic(() => import('@/components/Sidebar'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <Settings className="w-12 h-12 mx-auto mb-4 text-green-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading sidebar...</p>
      </div>
    </div>
  )
})

const AnalysisPanel = dynamic(() => import('@/components/AnalysisPanel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 text-green-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading analysis panel...</p>
      </div>
    </div>
  )
})

const WeatherWidget = dynamic(() => import('@/components/WeatherWidget'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <Cloud className="w-12 h-12 mx-auto mb-4 text-green-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading weather data...</p>
      </div>
    </div>
  )
})

export default function PremiumClimateDashboard() {
  const [selectedDataset, setSelectedDataset] = useState('airQuality')
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedDistrict, setSelectedDistrict] = useState<{
    id: number
    name: string
    lat: number
    lng: number
    division: string
  } | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [comparisonDistricts, setComparisonDistricts] = useState<Array<{
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }>>([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleDistrictSelect = (district: {
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }) => {
    if (comparisonMode) {
      if (comparisonDistricts.length < 2) {
        setComparisonDistricts([...comparisonDistricts, district])
      }
    } else {
      setSelectedDistrict(district)
    }
  }

  const handleDatasetChange = (dataset: string) => {
    setSelectedDataset(dataset)
  }

  const handleYearChange = (year: number) => {
    setSelectedYear(year)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Bangladesh Climate Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Premium Environmental Monitoring</p>
              </div>
            </div>

            {/* Navigation and Search */}
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </motion.button>
              </Link>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <motion.button
                onClick={() => setComparisonMode(!comparisonMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  comparisonMode
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {comparisonMode ? 'Exit Compare' : 'Compare Districts'}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <Sidebar
            selectedDataset={selectedDataset}
            selectedYear={selectedYear}
            onDatasetChange={handleDatasetChange}
            onYearChange={handleYearChange}
            comparisonMode={comparisonMode}
            comparisonDistricts={comparisonDistricts}
            searchQuery={searchQuery}
          />
        </div>

        {/* Center - Sticky Map */}
        <div className="flex-1 relative">
          <MapComponent
            selectedDataset={selectedDataset}
            selectedYear={selectedYear}
            onDistrictSelect={handleDistrictSelect}
            selectedDistrict={selectedDistrict}
            comparisonMode={comparisonMode}
            comparisonDistricts={comparisonDistricts}
            searchQuery={searchQuery}
          />

          {/* Weather Widget Overlay */}
          {selectedDistrict && (
            <div className="absolute top-4 right-4 z-10">
              <WeatherWidget district={selectedDistrict} />
            </div>
          )}

          {/* Heatmap Legend */}
          <div className="absolute bottom-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <Layers className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Legend</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Good</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Alarming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Analysis */}
        <div className="w-96 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          {comparisonMode && comparisonDistricts.length > 0 ? (
            <AnalysisPanel
              mode="comparison"
              districts={comparisonDistricts}
              selectedDataset={selectedDataset}
              selectedYear={selectedYear}
            />
          ) : selectedDistrict ? (
            <AnalysisPanel
              mode="single"
              district={selectedDistrict}
              selectedDataset={selectedDataset}
              selectedYear={selectedYear}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center p-8">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Select a District
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Click on any district marker to view detailed environmental analysis and historical trends.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Data Sources: NASA Earthdata, OpenWeather, NOAA</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Real-time Environmental Monitoring</span>
            </div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-500">
            Built for NASA Space Apps Challenge 2025 • Premium Bangladesh Climate Dashboard
          </div>
        </div>
      </footer>
    </div>
  )
}
