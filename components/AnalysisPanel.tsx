'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts'
import { 
  Cloud, 
  TreePine, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  BarChart3,
  MapPin,
  Info,
  Download,
  Share2
} from 'lucide-react'

interface AnalysisPanelProps {
  mode: 'single' | 'comparison'
  district?: {
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }
  districts?: Array<{
    id: number
    name: string
    lat: number
    lng: number
    division: string
  }>
  selectedDataset: string
  selectedYear: number
}

const datasets = [
  {
    id: 'airQuality',
    name: 'Air Quality',
    icon: Cloud,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30',
    unit: 'AQI'
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: Thermometer,
    color: 'text-red-500',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30',
    unit: '°C'
  },
  {
    id: 'forestCover',
    name: 'Forest Cover',
    icon: TreePine,
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30',
    unit: '%'
  },
  {
    id: 'waterLevel',
    name: 'Water Level',
    icon: Droplets,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/20',
    borderColor: 'border-cyan-500/30',
    unit: 'm'
  }
]

// Generate historical data for charts
const generateHistoricalData = (dataset: string, baseValue: number, districtName: string) => {
  const data = []
  for (let year = 2000; year <= 2025; year++) {
    const variation = (Math.random() - 0.5) * 0.3
    const value = Math.max(0, Math.min(1, baseValue + variation))
    data.push({
      year,
      value: Math.round(value * 100),
      anomaly: Math.round((value - baseValue) * 100),
      district: districtName
    })
  }
  return data
}

export default function AnalysisPanel({ 
  mode, 
  district, 
  districts, 
  selectedDataset, 
  selectedYear 
}: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState(selectedDataset)
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('area')

  const currentDataset = datasets.find(d => d.id === activeTab)
  const IconComponent = currentDataset?.icon || Cloud

  const getCurrentValue = (districtName: string) => {
    return Math.random() * 100
  }

  const getSeverityColor = (value: number) => {
    if (value < 40) return 'text-green-500'
    if (value < 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getSeverityIcon = (value: number) => {
    if (value < 40) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (value < 70) return <AlertTriangle className="w-4 h-4 text-yellow-500" />
    return <AlertTriangle className="w-4 h-4 text-red-500" />
  }

  if (mode === 'comparison' && districts) {
    return (
      <div className="h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              District Comparison
            </h2>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">{selectedYear}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {districts.map((district, index) => (
              <div key={district.id} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {district.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {datasets.map((dataset) => {
            const IconComponent = dataset.icon
            const isActive = activeTab === dataset.id
            
            return (
              <motion.button
                key={dataset.id}
                onClick={() => setActiveTab(dataset.id)}
                className={`flex-1 p-3 text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <IconComponent className={`w-5 h-5 ${dataset.color}`} />
                  <span>{dataset.name}</span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4"
            >
              <div className="space-y-6">
                {/* Current Metrics Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {districts.map((district, index) => {
                    const value = getCurrentValue(district.name)
                    return (
                      <div key={district.id} className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{district.name}</span>
                          {getSeverityIcon(value)}
                        </div>
                        <div className={`text-2xl font-bold ${getSeverityColor(value)}`}>
                          {value.toFixed(1)}
                          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                            {currentDataset?.unit}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                          <div 
                            className={`h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Comparison Chart */}
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">25-Year Trend Comparison</h3>
                    <BarChart3 className="w-5 h-5 text-gray-500" />
                  </div>
                  
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={generateHistoricalData(activeTab, 0.6, districts[0].name)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        {districts.map((district, index) => (
                          <Line 
                            key={district.id}
                            type="monotone" 
                            dataKey="value" 
                            stroke={index === 0 ? '#3b82f6' : '#8b5cf6'}
                            strokeWidth={2}
                            dot={{ fill: index === 0 ? '#3b82f6' : '#8b5cf6', strokeWidth: 2, r: 4 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (!district) return null

  return (
    <div className="h-full flex flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-800/60">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{district.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{district.division} Division</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{selectedYear}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {district.lat.toFixed(4)}, {district.lng.toFixed(4)}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {datasets.map((dataset) => {
          const IconComponent = dataset.icon
          const isActive = activeTab === dataset.id
          
          return (
            <motion.button
              key={dataset.id}
              onClick={() => setActiveTab(dataset.id)}
              className={`flex-1 p-3 text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center space-y-1">
                <IconComponent className={`w-5 h-5 ${dataset.color}`} />
                <span>{dataset.name}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            <div className="space-y-6">
              {/* Current Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Value</span>
                    {getSeverityIcon(getCurrentValue(district.name))}
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`text-2xl font-bold ${getSeverityColor(getCurrentValue(district.name))}`}
                  >
                    {getCurrentValue(district.name).toFixed(1)}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                      {currentDataset?.unit}
                    </span>
                  </motion.div>
                </div>
                
                <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Trend</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    +2.3%
                  </div>
                </div>
              </div>

              {/* Historical Chart */}
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">25-Year Trend</h3>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-gray-500" />
                    <div className="flex space-x-1">
                      {(['line', 'area', 'bar'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setChartType(type)}
                          className={`px-2 py-1 rounded text-xs ${
                            chartType === type
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'area' ? (
                      <AreaChart data={generateHistoricalData(activeTab, getCurrentValue(district.name) / 100, district.name)}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    ) : chartType === 'line' ? (
                      <LineChart data={generateHistoricalData(activeTab, getCurrentValue(district.name) / 100, district.name)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
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
                    ) : (
                      <BarChart data={generateHistoricalData(activeTab, getCurrentValue(district.name) / 100, district.name)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <YAxis 
                          stroke="#9ca3af"
                          fontSize={12}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Export Data</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
