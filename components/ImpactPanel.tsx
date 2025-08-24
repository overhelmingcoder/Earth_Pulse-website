'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { 
  Cloud, 
  TreePine, 
  Thermometer, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Calendar,
  BarChart3
} from 'lucide-react'

interface ImpactPanelProps {
  location: {
    lat: number
    lng: number
    name: string
    district: string
  }
  selectedDataset: string
  selectedYear: number
  onDatasetChange: (dataset: string) => void
  onYearChange: (year: number) => void
}

const datasets = [
  {
    id: 'airQuality',
    name: 'Air Quality',
    icon: Cloud,
    color: 'text-blue-400'
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: Thermometer,
    color: 'text-red-400'
  },
  {
    id: 'forestCover',
    name: 'Forest Cover',
    icon: TreePine,
    color: 'text-green-400'
  },
  {
    id: 'waterLevel',
    name: 'Water Level',
    icon: Droplets,
    color: 'text-cyan-400'
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: Activity,
    color: 'text-purple-400'
  }
]

export default function ImpactPanel({ 
  location, 
  selectedDataset, 
  selectedYear, 
  onDatasetChange, 
  onYearChange 
}: ImpactPanelProps) {
  const [activeTab, setActiveTab] = useState(selectedDataset)

  const getCurrentValue = (dataset: string) => {
    return Math.random() * 100
  }

  const generateHistoricalData = () => {
    const data = []
    for (let year = 2000; year <= 2025; year++) {
      data.push({
        year,
        value: Math.round(Math.random() * 100)
      })
    }
    return data
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-green-500/20 bg-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-white">{location.district}</h2>
            <p className="text-sm text-gray-400">{location.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-300">{selectedYear}</span>
          </div>
        </div>
        
        {/* Time Slider */}
        <div className="mb-4">
          <input
            type="range"
            min="2000"
            max="2025"
            value={selectedYear}
            onChange={(e) => onYearChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2000</span>
            <span>2025</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-green-500/20">
        {datasets.map((dataset) => {
          const IconComponent = dataset.icon
          const isActive = activeTab === dataset.id
          
          return (
            <motion.button
              key={dataset.id}
              onClick={() => setActiveTab(dataset.id)}
              className={`flex-1 p-3 text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'text-green-500 border-b-2 border-green-500 bg-gray-800' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center space-y-1">
                <IconComponent className={`w-5 h-5 ${dataset.color}`} />
                <span>{dataset.name}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                )}
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
                <div className="bg-gray-800 rounded-lg p-4 border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Current Value</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-green-500"
                  >
                    {getCurrentValue(activeTab).toFixed(1)}
                  </motion.div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4 border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Trend</span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-500">
                    +2.3%
                  </div>
                </div>
              </div>

              {/* Historical Chart */}
              <div className="bg-gray-800 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">25-Year Trend</h3>
                  <BarChart3 className="w-5 h-5 text-green-500" />
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={generateHistoricalData()}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                        stroke="#10b981" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                      />
                    </AreaChart>
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
