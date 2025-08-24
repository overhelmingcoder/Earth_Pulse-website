'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Sidebar from '@/components/Sidebar'
import ImpactCard from '@/components/ImpactCard'
import TimeSlider from '@/components/TimeSlider'
import { Globe, Satellite, TrendingUp, AlertTriangle, MapPin } from 'lucide-react'

// Dynamically import BangladeshMap component to avoid SSR issues with Leaflet
const BangladeshMap = dynamic(() => import('@/components/BangladeshMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="text-center">
        <Globe className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
        <p className="text-gray-600 dark:text-gray-400">Loading Bangladesh map...</p>
      </div>
    </div>
  )
})

export default function BangladeshPage() {
  const [selectedDataset, setSelectedDataset] = useState('airQuality')
  const [selectedYear, setSelectedYear] = useState(2024)
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    name: string
  } | null>(null)
  const [showImpactCard, setShowImpactCard] = useState(false)

  const handleLocationSelect = (lat: number, lng: number, name: string) => {
    setSelectedLocation({ lat, lng, name })
    setShowImpactCard(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">EarthPulse Bangladesh</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Environmental Monitoring Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Satellite className="w-4 h-4" />
                <span>NASA GIBS Data</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>Real-time Updates</span>
              </div>
              <a 
                href="/" 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Global View
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Sidebar 
              selectedDataset={selectedDataset}
              onDatasetChange={setSelectedDataset}
            />
            
            <TimeSlider 
              selectedYear={selectedYear}
              onYearChange={setSelectedYear}
            />
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3 relative">
            <div className="h-full map-container">
              <BangladeshMap 
                selectedDataset={selectedDataset}
                selectedYear={selectedYear}
                onLocationSelect={handleLocationSelect}
              />
            </div>
            
            {/* Map Controls Overlay */}
            <div className="absolute top-4 right-4 glass-effect rounded-lg p-3">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Good</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Warning</span>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Alarming</span>
              </div>
            </div>

            {/* Bangladesh Info */}
            <div className="absolute bottom-4 left-4 glass-effect rounded-lg p-3">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                <p className="font-semibold">🇧🇩 Bangladesh</p>
                <p>64 Districts • 8 Divisions</p>
                <p>Real-time Environmental Data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Card Modal */}
        {showImpactCard && selectedLocation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full">
              <ImpactCard 
                location={selectedLocation}
                dataset={selectedDataset}
                year={selectedYear}
                onClose={() => setShowImpactCard(false)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span>Data Source: NASA GIBS</span>
              <span>•</span>
              <span>Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Click on districts to view detailed analysis</span>
            </div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500 dark:text-gray-500">
            Built for NASA Space Apps Challenge 2025 • Bangladesh Environmental Monitoring
          </div>
        </div>
      </footer>
    </div>
  )
}
