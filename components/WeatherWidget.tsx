'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind,
  Sun,
  CloudRain,
  CloudLightning,
  Eye
} from 'lucide-react'

interface WeatherWidgetProps {
  district: {
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }
}

// Mock weather data - in real app, this would come from OpenWeather API
const getMockWeatherData = (districtName: string) => {
  const baseTemp = 25 + Math.random() * 10
  const baseHumidity = 60 + Math.random() * 30
  const baseWind = 5 + Math.random() * 15
  
  return {
    temperature: baseTemp.toFixed(1),
    humidity: baseHumidity.toFixed(0),
    windSpeed: baseWind.toFixed(1),
    aqi: Math.floor(50 + Math.random() * 150),
    visibility: (5 + Math.random() * 10).toFixed(1),
    description: getWeatherDescription(baseTemp, baseHumidity),
    icon: getWeatherIcon(baseTemp, baseHumidity)
  }
}

const getWeatherDescription = (temp: number, humidity: number) => {
  if (temp > 30) return 'Hot'
  if (temp > 25) return 'Warm'
  if (temp > 20) return 'Mild'
  if (temp > 15) return 'Cool'
  return 'Cold'
}

const getWeatherIcon = (temp: number, humidity: number) => {
  if (humidity > 80) return CloudRain
  if (temp > 30) return Sun
  if (temp < 15) return Cloud
  return Cloud
}

const getAQICategory = (aqi: number) => {
  if (aqi <= 50) return { category: 'Good', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20' }
  if (aqi <= 100) return { category: 'Moderate', color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' }
  if (aqi <= 150) return { category: 'Unhealthy for Sensitive Groups', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20' }
  if (aqi <= 200) return { category: 'Unhealthy', color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' }
  if (aqi <= 300) return { category: 'Very Unhealthy', color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/20' }
  return { category: 'Hazardous', color: 'text-red-600', bgColor: 'bg-red-200 dark:bg-red-900/40' }
}

export default function WeatherWidget({ district }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState(getMockWeatherData(district.name))
  const [isLoading, setIsLoading] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(getMockWeatherData(district.name))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [district.name])

  const aqiInfo = getAQICategory(weatherData.aqi)
  const WeatherIcon = weatherData.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 min-w-[280px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {district.name}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {district.division} Division
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <WeatherIcon className="w-6 h-6 text-blue-500" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {weatherData.description}
          </span>
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-red-500" />
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {weatherData.temperature}°C
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Temperature</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-blue-500" />
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {weatherData.humidity}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Humidity</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {weatherData.windSpeed} km/h
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Wind Speed</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-gray-500" />
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {weatherData.visibility} km
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Visibility</div>
          </div>
        </div>
      </div>

      {/* Air Quality Index */}
      <div className={`p-3 rounded-lg ${aqiInfo.bgColor} border border-gray-200 dark:border-gray-600`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Air Quality Index
          </span>
          <span className={`text-sm font-bold ${aqiInfo.color}`}>
            {weatherData.aqi}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-xs ${aqiInfo.color}`}>
            {aqiInfo.category}
          </span>
          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
            <div 
              className={`h-2 rounded-full ${aqiInfo.color.replace('text-', 'bg-')}`}
              style={{ 
                width: `${Math.min((weatherData.aqi / 300) * 100, 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Update Indicator */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Live Data</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          Updated just now
        </span>
      </div>
    </motion.div>
  )
}
