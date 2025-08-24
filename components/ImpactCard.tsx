'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Cloud, 
  TreePine, 
  Thermometer, 
  Droplets,
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { fetchAirQuality, getAQICategory } from '@/lib/openWeather'
import { fetchWeatherData, getWeatherDescription } from '@/lib/nasaPower'
import { fetchTemperatureAnomaly, getTemperatureTrend } from '@/lib/gistemp'
import { fetchWaterLevelData, getWaterLevelTrend } from '@/lib/grace'

interface ImpactCardProps {
  location: {
    lat: number
    lng: number
    name: string
  }
  dataset: string
  year: number
  onClose: () => void
}

// Mock data for different datasets
const mockData = {
  airQuality: {
    current: 0.65,
    baseline: 0.45,
    trend: 'increasing',
    status: 'moderate',
    unit: 'AOD',
    description: 'Air Quality Index',
    chartData: [
      { year: 2000, value: 0.45 },
      { year: 2005, value: 0.48 },
      { year: 2010, value: 0.52 },
      { year: 2015, value: 0.58 },
      { year: 2020, value: 0.62 },
      { year: 2024, value: 0.65 }
    ]
  },
  forestCover: {
    current: 0.72,
    baseline: 0.85,
    trend: 'decreasing',
    status: 'warning',
    unit: '%',
    description: 'Forest Cover',
    chartData: [
      { year: 2000, value: 85 },
      { year: 2005, value: 82 },
      { year: 2010, value: 79 },
      { year: 2015, value: 76 },
      { year: 2020, value: 74 },
      { year: 2024, value: 72 }
    ]
  },
  temperature: {
    current: 18.5,
    baseline: 16.2,
    trend: 'increasing',
    status: 'critical',
    unit: '°C',
    description: 'Average Temperature',
    chartData: [
      { year: 2000, value: 16.2 },
      { year: 2005, value: 16.8 },
      { year: 2010, value: 17.1 },
      { year: 2015, value: 17.6 },
      { year: 2020, value: 18.1 },
      { year: 2024, value: 18.5 }
    ]
  },
  waterLevel: {
    current: -12.5,
    baseline: -2.1,
    trend: 'decreasing',
    status: 'critical',
    unit: 'cm',
    description: 'Groundwater Level',
    chartData: [
      { year: 2000, value: -2.1 },
      { year: 2005, value: -4.2 },
      { year: 2010, value: -6.8 },
      { year: 2015, value: -9.1 },
      { year: 2020, value: -11.3 },
      { year: 2024, value: -12.5 }
    ]
  },
  weather: {
    current: 22.5,
    baseline: 20.1,
    trend: 'variable',
    status: 'live',
    unit: '°C',
    description: 'Current Temperature',
    chartData: [
      { year: 2000, value: 20.1 },
      { year: 2005, value: 20.8 },
      { year: 2010, value: 21.2 },
      { year: 2015, value: 21.7 },
      { year: 2020, value: 22.1 },
      { year: 2024, value: 22.5 }
    ]
  }
}

const getDatasetIcon = (dataset: string) => {
  const iconClass = "w-6 h-6"
  switch (dataset) {
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
    default:
      return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20'
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'increasing':
      return <TrendingUp className="w-4 h-4 text-red-500" />
    case 'decreasing':
      return <TrendingDown className="w-4 h-4 text-green-500" />
    default:
      return <TrendingUp className="w-4 h-4 text-gray-500" />
  }
}

const getInsightMessage = (dataset: string, data: any) => {
  const change = ((data.current - data.baseline) / data.baseline * 100).toFixed(1)
  
  switch (dataset) {
    case 'airQuality':
      return change > 0 
        ? `Air quality has deteriorated by ${Math.abs(change)}% since 2000`
        : `Air quality has improved by ${Math.abs(change)}% since 2000`
    case 'forestCover':
      return `Forest cover has decreased by ${Math.abs(change)}% since 2000`
    case 'temperature':
      return `Temperature has increased by ${Math.abs(change)}% since 2000`
    case 'waterLevel':
      return `Groundwater levels have decreased by ${Math.abs(change)}% since 2000`
    case 'weather':
      return `Weather patterns have changed by ${Math.abs(change)}% since 2000`
    default:
      return 'Environmental changes detected'
  }
}

export default function ImpactCard({ location, dataset, year, onClose }: ImpactCardProps) {
  const [currentValue, setCurrentValue] = useState(0)
  const [showChart, setShowChart] = useState(false)
  const [apiData, setApiData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const data = mockData[dataset as keyof typeof mockData]
  const change = ((data.current - data.baseline) / data.baseline * 100).toFixed(1)

  // Fetch API data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [airQuality, weatherData, tempAnomaly, waterData] = await Promise.all([
          fetchAirQuality(location.lat, location.lng),
          fetchWeatherData(location.lat, location.lng),
          fetchTemperatureAnomaly(location.lat, location.lng, year),
          fetchWaterLevelData(location.lat, location.lng, year)
        ])

        setApiData({
          airQuality,
          weatherData,
          tempAnomaly,
          waterData
        })
      } catch (error) {
        console.error('Error fetching API data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [location.lat, location.lng, year])

  useEffect(() => {
    // Animate the current value
    const timer = setTimeout(() => {
      setCurrentValue(data.current)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [data.current])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="impact-card w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              {getDatasetIcon(dataset)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {data.description}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {location.name}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Current Value */}
        <div className="text-center mb-6">
          <motion.div
            key={currentValue}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-4xl font-bold ${
              data.status === 'critical' ? 'text-red-500 danger-flash' :
              data.status === 'warning' ? 'text-orange-500' :
              data.status === 'moderate' ? 'text-yellow-500' : 'text-green-500 safe-pulse'
            }`}
          >
            {currentValue.toFixed(1)}{data.unit}
          </motion.div>
          
          <div className="flex items-center justify-center space-x-2 mt-2">
            {getTrendIcon(data.trend)}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
              {data.status}
            </span>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Impact Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Change since 2000:</span>
              <span className={`text-sm font-bold ${
                parseFloat(change) > 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                {change}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Baseline (2000):</span>
              <span className="text-sm font-medium">{data.baseline}{data.unit}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current ({year}):</span>
              <span className="text-sm font-medium">{data.current}{data.unit}</span>
            </div>
          </div>
        </div>

        {/* Insight Message */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {getInsightMessage(dataset, data)}
          </p>
        </div>

        {/* API Data Section */}
        {!isLoading && apiData && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Real-time Data
            </h3>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Air Quality */}
              <div className="flex items-center space-x-2">
                <Cloud className="w-3 h-3 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">AQI:</span>
                <span className="font-medium">{apiData.airQuality.aqi}/5</span>
              </div>
              
              {/* Temperature */}
              <div className="flex items-center space-x-2">
                <Thermometer className="w-3 h-3 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">Temp:</span>
                <span className="font-medium">{apiData.weatherData.temperature.toFixed(1)}°C</span>
              </div>
              
              {/* Humidity */}
              <div className="flex items-center space-x-2">
                <Droplets className="w-3 h-3 text-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Humidity:</span>
                <span className="font-medium">{apiData.weatherData.humidity.toFixed(0)}%</span>
              </div>
              
              {/* Wind */}
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-3 h-3 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Wind:</span>
                <span className="font-medium">{apiData.weatherData.windSpeed.toFixed(1)} m/s</span>
              </div>
            </div>
            
            <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
              <span className="text-gray-600 dark:text-gray-400">Weather: </span>
              <span className="font-medium">{getWeatherDescription(
                apiData.weatherData.temperature,
                apiData.weatherData.precipitation,
                apiData.weatherData.windSpeed,
                apiData.weatherData.humidity
              )}</span>
            </div>
          </div>
        )}

        {/* Chart Toggle */}
        <button
          onClick={() => setShowChart(!showChart)}
          className="w-full flex items-center justify-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-medium">
            {showChart ? 'Hide' : 'Show'} Historical Trend
          </span>
        </button>

        {/* Chart */}
        <AnimatePresence>
          {showChart && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4"
            >
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#f9fafb'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <MapPin className="w-3 h-3" />
            <span>{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-3 h-3" />
            <span>Data: {year}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
