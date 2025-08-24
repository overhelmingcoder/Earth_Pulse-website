'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Play, Pause, RotateCcw } from 'lucide-react'

interface TimeSliderProps {
  selectedYear: number
  onYearChange: (year: number) => void
}

export default function TimeSlider({ selectedYear, onYearChange }: TimeSliderProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1000) // milliseconds per year

  const minYear = 2000
  const maxYear = 2025
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        const nextYear = selectedYear + 1
        if (nextYear > maxYear) {
          setIsPlaying(false)
          onYearChange(minYear)
        } else {
          onYearChange(nextYear)
        }
      }, playbackSpeed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, playbackSpeed, onYearChange, maxYear, minYear])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(e.target.value)
    onYearChange(year)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const resetToCurrent = () => {
    setIsPlaying(false)
    onYearChange(2024)
  }

  const getYearColor = (year: number) => {
    const progress = (year - minYear) / (maxYear - minYear)
    if (progress < 0.3) return 'text-green-500'
    if (progress < 0.7) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getYearLabel = (year: number) => {
    if (year === 2000) return '2000'
    if (year === 2010) return '2010'
    if (year === 2020) return '2020'
    if (year === 2025) return '2025'
    return ''
  }

  return (
    <div className="sidebar-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Time Period
          </h3>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={togglePlayback}
            className={`p-1 rounded-full transition-colors ${
              isPlaying 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
            }`}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          
          <button
            onClick={resetToCurrent}
            className="p-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Year Display */}
      <div className="text-center mb-4">
        <motion.div
          key={selectedYear}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-2xl font-bold ${getYearColor(selectedYear)}`}
        >
          {selectedYear}
        </motion.div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {selectedYear === 2024 ? 'Current Year' : 
           selectedYear > 2024 ? 'Projected' : 'Historical Data'}
        </p>
      </div>

      {/* Slider */}
      <div className="relative mb-4">
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={selectedYear}
          onChange={handleSliderChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, 
              #10b981 0%, #10b981 ${((selectedYear - minYear) / (maxYear - minYear)) * 100}%, 
              #e5e7eb ${((selectedYear - minYear) / (maxYear - minYear)) * 100}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Year Labels */}
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          {years.map((year) => (
            <span key={year} className={getYearLabel(year) ? 'block' : 'hidden'}>
              {getYearLabel(year)}
            </span>
          ))}
        </div>
      </div>

      {/* Playback Speed */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Playback Speed
        </label>
        <div className="flex space-x-2">
          {[
            { label: 'Slow', value: 2000 },
            { label: 'Normal', value: 1000 },
            { label: 'Fast', value: 500 }
          ].map((speed) => (
            <button
              key={speed.value}
              onClick={() => setPlaybackSpeed(speed.value)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                playbackSpeed === speed.value
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {speed.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Events */}
      <div className="mt-4 space-y-2">
        <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Key Events
        </h4>
        <div className="space-y-1">
          {[
            { year: 2000, event: 'Baseline Data Collection' },
            { year: 2010, event: 'Major Climate Agreement' },
            { year: 2020, event: 'Global Pandemic Impact' },
            { year: 2024, event: 'Current Monitoring' },
            { year: 2025, event: 'Projected Trends' }
          ].map((event) => (
            <div
              key={event.year}
              className={`text-xs p-1 rounded ${
                selectedYear >= event.year
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <span className="font-medium">{event.year}:</span> {event.event}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}
