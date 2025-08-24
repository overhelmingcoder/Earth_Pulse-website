'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Database, 
  MapPin, 
  Users, 
  Shield,
  TrendingUp,
  AlertTriangle,
  Brain,
  Award,
  ArrowRight,
  Home,
  Satellite,
  BarChart3,
  Cloud,
  TreePine,
  Thermometer,
  Droplets,
  Zap,
  Target,
  Lightbulb,
  Heart,
  BookOpen,
  Rocket,
  Mail
} from 'lucide-react'
import Link from 'next/link'

export default function EarthPulseLanding() {
  const floatingStats = [
    {
      icon: Database,
      value: "25 Years",
      label: "of Data",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      value: "64",
      label: "Districts",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      value: "160M+",
      label: "People Protected",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      value: "Trusted",
      label: "Data Source",
      color: "from-orange-500 to-red-500"
    }
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-Time AQI Monitoring",
      description: "Live air quality data with instant alerts and comprehensive pollution tracking across all districts.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MapPin,
      title: "District-wise Breakdown",
      description: "Comprehensive environmental mapping with detailed insights for each of Bangladesh's 64 districts.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Forecasting",
      description: "Advanced machine learning models predicting environmental trends and climate patterns.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "Environmental Postcards",
      description: "Generate detailed environmental reports and postcards for each district with comprehensive data visualization and insights.",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const impactReasons = [
    {
      icon: Heart,
      title: "Protecting Human Lives",
      description: "Safeguarding the health and well-being of 160+ million people through proactive environmental monitoring.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Data-Driven Policy Making",
      description: "Providing evidence-based insights for environmental policies and climate action initiatives.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Scientific Research & Innovation",
      description: "Foundation for climate research, academic studies, and environmental innovation projects.",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const nasaPillars = [
    {
      icon: Shield,
      title: "Climate Resilience",
      description: "Building adaptive capacity for climate change impacts",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Data Democracy",
      description: "Making environmental data accessible to all citizens",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Rocket,
      title: "Future Ready",
      description: "Preparing for tomorrow's environmental challenges",
      color: "from-purple-500 to-pink-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Primary Background Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse delay-1000 opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl animate-pulse delay-500 opacity-10"></div>
        
        {/* Secondary Floating Elements */}
        <div className="absolute top-40 right-40 w-32 h-32 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-2xl animate-pulse delay-700 opacity-30"></div>
        <div className="absolute bottom-40 left-40 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl animate-pulse delay-300 opacity-25"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl animate-pulse delay-1200 opacity-20"></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
            backgroundSize: '200px 200px'
          }}></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000 opacity-40"></div>
        <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-500 opacity-50"></div>
        <div className="absolute top-1/2 right-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping delay-1500 opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  EarthPulse
                </h1>
              </div>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Animated Globe */}
          <motion.div
            className="relative mx-auto w-28 h-28 mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <Globe className="w-14 h-14 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              EarthPulse
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-slate-300 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            25 Years of Environmental Insights, Protecting Our Planet
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-base text-slate-400 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Visualize comprehensive environmental data across 64 districts of Bangladesh with real-time monitoring and AI-powered insights
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link href="/dashboard">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
            
            <motion.button
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-slate-300 rounded-xl font-semibold text-lg hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Our Mission
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Floating Stats Cards */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {floatingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 text-center hover:bg-slate-700/50 transition-all duration-300 shadow-2xl"
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Advanced Features</h2>
            <p className="text-xl text-slate-400">Cutting-edge environmental monitoring capabilities</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-700/50 transition-all duration-300 shadow-xl"
                whileHover={{ 
                  y: -15, 
                  scale: 1.03,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Significance Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why This Project Matters</h2>
            <p className="text-xl text-slate-400">Understanding the critical importance of environmental monitoring in Bangladesh</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Visual Elements */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-80 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl backdrop-blur-sm border border-slate-700/50 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-30 animate-pulse delay-500"></div>
                
                {/* Central Globe with Pulse Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="relative"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                      <Globe className="w-16 h-16 text-white" />
                    </div>
                    {/* Pulse Rings */}
                    <motion.div
                      className="absolute inset-0 w-32 h-32 border-2 border-emerald-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 0, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 w-32 h-32 border-2 border-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    />
                  </motion.div>
                </div>

                {/* Floating Data Points */}
                <motion.div
                  className="absolute top-8 right-8 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="text-emerald-400 text-sm font-semibold">AQI: 45</div>
                  <div className="text-xs text-slate-400">Good</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-8 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-600/50"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="text-blue-400 text-sm font-semibold">Temp: 28°C</div>
                  <div className="text-xs text-slate-400">Normal</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-6">
                <motion.div
                  className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Climate Crisis Impact</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Bangladesh faces severe climate challenges with rising sea levels, extreme weather events, and air pollution affecting 160+ million people. This project provides critical data to understand and mitigate these threats.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Data-Driven Solutions</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    By providing comprehensive environmental data across all 64 districts, we enable evidence-based policy making, scientific research, and community awareness to build climate resilience.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Community Empowerment</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Making environmental data accessible to citizens, researchers, and policymakers creates a collaborative approach to environmental protection and sustainable development.
                  </p>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div
                className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-white mb-2">Join the Mission</h4>
                <p className="text-slate-300 text-sm mb-4">
                  Be part of the solution. Explore our comprehensive environmental monitoring system and contribute to protecting Bangladesh's future.
                </p>
                <Link href="/dashboard">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Exploring
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

             {/* Why EarthPulse Matters - Enhanced Visual Section */}
       <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
         <div className="max-w-7xl mx-auto">
           <motion.div
             className="text-center mb-12"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
             <h2 className="text-4xl font-bold text-white mb-4">
               Why <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">EarthPulse</span> Matters
             </h2>
             <p className="text-xl text-slate-400 max-w-3xl mx-auto">
               Bangladesh stands at the forefront of climate change impact. Our mission is to provide the tools and insights needed to protect this vital ecosystem and its people.
             </p>
           </motion.div>

           {/* Visual Impact Cards Grid */}
           <motion.div
             className="grid lg:grid-cols-2 gap-12 mb-12"
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
             {/* Climate Crisis Impact Card */}
             <motion.div
               className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-500/30 rounded-3xl p-8 relative overflow-hidden group"
               whileHover={{ 
                 y: -10, 
                 scale: 1.02,
                 boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.3)"
               }}
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
             >
               {/* Animated Background Elements */}
               <div className="absolute top-4 right-4 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
               <div className="absolute bottom-4 left-4 w-16 h-16 bg-orange-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
               
               <div className="relative z-10">
                 <div className="flex items-center space-x-4 mb-6">
                   <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                     <AlertTriangle className="w-8 h-8 text-white" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-white">Climate Crisis Impact</h3>
                     <p className="text-red-300">Critical Environmental Threats</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                     <div className="text-2xl font-bold text-red-400">160M+</div>
                     <div className="text-sm text-slate-300">People at Risk</div>
                   </div>
                   <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                     <div className="text-2xl font-bold text-orange-400">64</div>
                     <div className="text-sm text-slate-300">Districts Affected</div>
                   </div>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                     <span className="text-slate-300">Rising sea levels threatening coastal areas</span>
                   </div>
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                     <span className="text-slate-300">Extreme weather events increasing</span>
                   </div>
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                     <span className="text-slate-300">Air pollution affecting public health</span>
                   </div>
                 </div>
               </div>
             </motion.div>

             {/* Data-Driven Solutions Card */}
             <motion.div
               className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden group"
               whileHover={{ 
                 y: -10, 
                 scale: 1.02,
                 boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.3)"
               }}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
             >
               {/* Animated Background Elements */}
               <div className="absolute top-4 left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
               <div className="absolute bottom-4 right-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
               
               <div className="relative z-10">
                 <div className="flex items-center space-x-4 mb-6">
                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                     <TrendingUp className="w-8 h-8 text-white" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-white">Data-Driven Solutions</h3>
                     <p className="text-blue-300">Evidence-Based Action</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                     <div className="text-2xl font-bold text-blue-400">25</div>
                     <div className="text-sm text-slate-300">Years of Data</div>
                   </div>
                   <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                     <div className="text-2xl font-bold text-cyan-400">Real-time</div>
                     <div className="text-sm text-slate-300">Monitoring</div>
                   </div>
                 </div>
                 
                 <div className="space-y-3">
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                     <span className="text-slate-300">Comprehensive environmental mapping</span>
                   </div>
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                     <span className="text-slate-300">AI-powered forecasting models</span>
                   </div>
                   <div className="flex items-center space-x-3">
                     <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                     <span className="text-slate-300">Policy-making insights</span>
                   </div>
                 </div>
               </div>
             </motion.div>
           </motion.div>

           {/* Community Empowerment Card */}
           <motion.div
             className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-500/30 rounded-3xl p-8 relative overflow-hidden"
             whileHover={{ 
               y: -10, 
               scale: 1.02,
               boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.3)"
             }}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.7 }}
           >
             {/* Animated Background Elements */}
             <div className="absolute top-4 left-1/4 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
             <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-emerald-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
             
             <div className="relative z-10">
               <div className="flex items-center space-x-4 mb-6">
                 <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                   <Users className="w-8 h-8 text-white" />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-white">Community Empowerment</h3>
                   <p className="text-green-300">Collaborative Environmental Protection</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-3 gap-4 mb-6">
                 <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                   <div className="text-2xl font-bold text-green-400">Citizens</div>
                   <div className="text-sm text-slate-300">Public Access</div>
                 </div>
                 <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                   <div className="text-2xl font-bold text-emerald-400">Researchers</div>
                   <div className="text-sm text-slate-300">Academic Use</div>
                 </div>
                 <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                   <div className="text-2xl font-bold text-green-400">Policymakers</div>
                   <div className="text-sm text-slate-300">Decision Making</div>
                 </div>
               </div>
               
               <div className="text-center">
                 <p className="text-slate-300 mb-6">
                   Making environmental data accessible to everyone creates a collaborative approach to environmental protection and sustainable development.
                 </p>
                 <Link href="/dashboard">
                   <motion.button
                     className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Join the Mission
                   </motion.button>
                 </Link>
               </div>
             </div>
           </motion.div>
         </div>
       </section>

       {/* Impact Section with Counters */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-slate-400">Numbers that tell the story of environmental protection</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">25</div>
              <div className="text-xl text-slate-300">Years of Data</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">64</div>
              <div className="text-xl text-slate-300">Districts Covered</div>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-4">160M+</div>
              <div className="text-xl text-slate-300">People Protected</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Explore?</h2>
            <p className="text-xl text-emerald-100 mb-8">
              Dive into comprehensive environmental data and discover insights that protect our planet
            </p>
            <Link href="/dashboard">
              <motion.button
                className="px-10 py-4 bg-white text-emerald-700 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-200 shadow-lg flex items-center mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Launch Dashboard
                <Rocket className="w-5 h-5 ml-2" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-md border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                    EarthPulse
                  </h3>
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Built for NASA Space Apps Challenge 2025
              </p>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>Technology:</span>
                <span className="bg-slate-800 px-2 py-1 rounded">Next.js</span>
                <span className="bg-slate-800 px-2 py-1 rounded">React</span>
                <span className="bg-slate-800 px-2 py-1 rounded">TypeScript</span>
                <span className="bg-slate-800 px-2 py-1 rounded">TailwindCSS</span>
                <span className="bg-slate-800 px-2 py-1 rounded">Framer Motion</span>
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-slate-400">
                <li>NASA Earth Data</li>
                <li>Environmental APIs</li>
                <li>Real-time Sensors</li>
                <li>Satellite Imagery</li>
              </ul>
            </div>

            {/* Impact Metrics */}
            <div>
              <h4 className="text-white font-semibold mb-4">Impact</h4>
              <ul className="space-y-2 text-slate-400">
                <li>160M+ People</li>
                <li>64 Districts</li>
                <li>25 Years of Data</li>
                <li>Real-time Monitoring</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-500">
            <p>&copy; 2025 EarthPulse. Built for NASA Space Apps Challenge 2025.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
