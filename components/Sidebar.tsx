'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  TreePine, 
  Thermometer, 
  Droplets, 
  Info, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Globe,
  Database,
  Calendar,
  BarChart3,
  Layers,
  Search,
  X
} from 'lucide-react'

interface SidebarProps {
  selectedDataset: string
  selectedYear: number
  onDatasetChange: (dataset: string) => void
  onYearChange: (year: number) => void
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

const datasets = [
  {
    id: 'airQuality',
    name: 'Air Pollution',
    description: 'MODIS Aerosol Optical Depth',
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    status: 'moderate',
    trend: 'decreasing',
    lastUpdate: '2 hours ago',
    source: 'NASA Earthdata',
    apiLink: 'https://earthdata.nasa.gov/'
  },
  {
    id: 'forestCover',
    name: 'Forest Cover',
    description: 'MODIS Vegetation Index',
    icon: TreePine,
    color: 'from-green-500 to-emerald-500',
    status: 'good',
    trend: 'stable',
    lastUpdate: '1 day ago',
    source: 'NASA GIBS',
    apiLink: 'https://gibs.earthdata.nasa.gov/'
  },
  {
    id: 'temperature',
    name: 'Temperature Changes',
    description: 'MODIS Land Surface Temperature',
    icon: Thermometer,
    color: 'from-orange-500 to-red-500',
    status: 'warning',
    trend: 'increasing',
    lastUpdate: '3 hours ago',
    source: 'NASA GISTEMP',
    apiLink: 'https://data.giss.nasa.gov/gistemp/'
  },
  {
    id: 'waterLevel',
    name: 'Water Levels',
    description: 'AMSR2 Snow Water Equivalent',
    icon: Droplets,
    color: 'from-blue-600 to-indigo-600',
    status: 'critical',
    trend: 'decreasing',
    lastUpdate: '6 hours ago',
    source: 'NASA GRACE',
    apiLink: 'https://grace.jpl.nasa.gov/'
  }
]

const globalAverages = {
  airQuality: 65,
  forestCover: 72,
  temperature: 58,
  waterLevel: 45
}

const dataSources = [
  {
    name: 'NASA Earthdata',
    description: 'Satellite imagery and environmental data',
    lastUpdate: '2 hours ago',
    status: 'live',
    link: 'https://earthdata.nasa.gov/'
  },
  {
    name: 'OpenWeather API',
    description: 'Real-time weather and air quality',
    lastUpdate: '5 minutes ago',
    status: 'live',
    link: 'https://openweathermap.org/api'
  },
  {
    name: 'NOAA Climate Data',
    description: 'Historical climate records',
    lastUpdate: '1 day ago',
    status: 'updated',
    link: 'https://www.ncdc.noaa.gov/'
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'good':
      return 'text-green-500 bg-green-100 dark:bg-green-900/20'
    case 'moderate':
      return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
    case 'warning':
      return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
    case 'critical':
      return 'text-red-500 bg-red-100 dark:bg-red-900/20'
    case 'live':
      return 'text-green-500 bg-green-100 dark:bg-green-900/20'
    case 'updated':
      return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
    default:
      return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20'
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'increasing':
      return <TrendingUp className="w-4 h-4 text-red-500" />
    case 'decreasing':
      return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />
    case 'stable':
      return <CheckCircle className="w-4 h-4 text-blue-500" />
    case 'variable':
      return <TrendingUp className="w-4 h-4 text-purple-500" />
    default:
      return <Clock className="w-4 h-4 text-gray-500" />
  }
}

export default function Sidebar({ 
  selectedDataset, 
  selectedYear, 
  onDatasetChange, 
  onYearChange,
  comparisonMode,
  comparisonDistricts,
  searchQuery
}: SidebarProps) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Climate Dashboard
          </h2>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Info className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Premium environmental monitoring dashboard for Bangladesh. 
              Select datasets, explore districts, and analyze trends with real-time data.
            </p>
          </motion.div>
        )}

        {/* Comparison Mode Indicator */}
        {comparisonMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Comparison Mode
              </span>
              <span className="text-xs text-purple-600 dark:text-purple-400">
                {comparisonDistricts.length}/2 selected
              </span>
            </div>
            {comparisonDistricts.length > 0 && (
              <div className="mt-2 space-y-1">
                {comparisonDistricts.map((district, index) => (
                  <div key={district.id} className="flex items-center justify-between text-xs">
                    <span className="text-purple-700 dark:text-purple-300">{district.name}</span>
                    <button
                      onClick={() => {
                        // Remove district from comparison
                        const updated = comparisonDistricts.filter((_, i) => i !== index)
                        // This would need to be handled by parent component
                      }}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Dataset Selector */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
          <Layers className="w-4 h-4 mr-2" />
          Available Datasets
        </h3>
        
        <div className="space-y-2">
          {datasets.map((dataset) => {
            const IconComponent = dataset.icon
            const isSelected = selectedDataset === dataset.id
            
            return (
              <motion.button
                key={dataset.id}
                onClick={() => onDatasetChange(dataset.id)}
                className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${dataset.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {dataset.name}
                      </h4>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(dataset.trend)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dataset.status)}`}>
                          {dataset.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {dataset.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Updated {dataset.lastUpdate}
                      </span>
                      
                      <a
                        href={dataset.apiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-700 flex items-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {dataset.source}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Global Overview */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
          <Globe className="w-4 h-4 mr-2" />
          Global Overview
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(globalAverages).map(([key, value]) => {
            const dataset = datasets.find(d => d.id === key)
            const IconComponent = dataset?.icon || Cloud
            
            return (
              <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <IconComponent className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {dataset?.name || key}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {value}%
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Live Data Sources */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
          <Database className="w-4 h-4 mr-2" />
          Live Data Sources
        </h3>
        
        <div className="space-y-3">
          {dataSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {source.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                    {source.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {source.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Updated {source.lastUpdate}
                </p>
              </div>
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Time Period
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
              Year: {selectedYear}
            </label>
            <input
              type="range"
              min="2000"
              max="2025"
              value={selectedYear}
              onChange={(e) => onYearChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>2000</span>
              <span>2025</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {[2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedYear === year
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
