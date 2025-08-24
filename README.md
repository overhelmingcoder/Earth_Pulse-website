# 🌍 EarthPulse - Environmental Monitoring Dashboard

A comprehensive web application for monitoring environmental changes using real-time NASA satellite data. Visualize air quality, forest cover, temperature, and water level changes with interactive maps and historical trend analysis.

![EarthPulse Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38B2AC)

## ✨ Features

### 🗺️ Interactive Mapping
- **Leaflet.js** integration with NASA GIBS satellite layers
- Real-time environmental data visualization
- Click-to-analyze location-based insights
- Multiple dataset overlays (Air Pollution, Forest Cover, Temperature, Water Level, Weather)
- **Bangladesh-specific map** with all 64 districts and enhanced features

### 📊 Data Visualization
- **Animated color thresholds** (Green → Yellow → Red)
- **Historical trend charts** with Recharts
- **Time slider** for data animation (2000-2025)
- **Impact summary cards** with detailed statistics

### 🛰️ NASA Data Integration
- **MODIS Aerosol Optical Depth** for air quality
- **MODIS Vegetation Index** for forest cover
- **MODIS Land Surface Temperature** for climate data
- **AMSR2 Snow Water Equivalent** for water levels
- **MODIS Corrected Reflectance True Color** for weather visualization

### 🎨 Modern UI/UX
- **Dark theme** with glass morphism effects
- **Framer Motion** animations and transitions
- **Responsive design** for mobile and desktop
- **Real-time status indicators** and alerts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/eartpulse.git
cd eartpulse
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

5. **Explore Bangladesh Map**
Navigate to [http://localhost:3000/bangladesh](http://localhost:3000/bangladesh) for the Bangladesh-specific dashboard

## 🏗️ Project Structure

```
eartpulse/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main landing page
│   ├── bangladesh/        # Bangladesh-specific pages
│   │   └── page.tsx       # Bangladesh dashboard
│   └── interactive-map/   # Interactive map pages
│       └── page.tsx       # Interactive map component
├── components/            # React components
│   ├── Map.tsx           # Global interactive Leaflet map
│   ├── BangladeshMap.tsx # Bangladesh-specific map
│   ├── Sidebar.tsx       # Dataset selector & controls
│   ├── TimeSlider.tsx    # Historical data slider
│   └── ImpactCard.tsx    # Location analysis modal
├── lib/                   # Utilities and API
│   ├── api.ts            # NASA data fetching & mock data
│   ├── bangladeshDistricts.js # Bangladesh districts data
│   ├── openWeather.ts    # OpenWeather API integration
│   ├── nasaPower.ts      # NASA POWER API integration
│   ├── gistemp.ts        # NASA GISTEMP integration
│   └── grace.ts          # NASA GRACE integration
├── public/               # Static assets
├── styles/               # Additional styling
└── package.json          # Dependencies & scripts
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Mapping & Visualization
- **Leaflet.js** - Interactive maps
- **React Leaflet** - React wrapper for Leaflet
- **Recharts** - Chart library for data visualization
- **NASA GIBS** - Satellite data layers

### APIs & Data Sources
- **OpenWeather API** - Air quality data
- **NASA POWER API** - Weather and climate data
- **NASA GISTEMP** - Temperature anomaly data
- **NASA GRACE** - Water level and groundwater data
- **NASA GIBS** - Satellite imagery and environmental data
- **Bangladesh Districts Data** - All 64 districts with environmental metrics

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial EarthPulse deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Environment Variables:**
   - Add `NEXT_PUBLIC_OPENWEATHER_API_KEY` in Vercel dashboard
   - Get API key from [OpenWeather](https://openweathermap.org/api)
   - Create `.env.local` file locally with your API key

4. **Custom Domain (Optional):**
   - Add your domain in Vercel dashboard
   - Update DNS records as instructed

### Environment Setup

Create a `.env.local` file in your project root:

```bash
# OpenWeather API Key (get from https://openweathermap.org/api)
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here

# NASA APIs are free and don't require keys
# NASA POWER API: https://power.larc.nasa.gov/api/
# NASA GISTEMP: https://data.giss.nasa.gov/gistemp/
# NASA GRACE: https://grace.jpl.nasa.gov/data/get-data/
```

### Icons & UI
- **Lucide React** - Beautiful icon library
- **Custom animations** - Tailwind + Framer Motion

## 📡 NASA Data Sources

### Current Implementation (Mock Data)
The app currently uses realistic mock data for demonstration purposes. Each dataset includes:

- **Air Quality**: Aerosol Optical Depth (AOD) values 0-1
- **Forest Cover**: Vegetation Index percentages 0-100%
- **Temperature**: Land surface temperature in °C
- **Water Levels**: Groundwater anomaly in cm

### Real NASA API Integration
To connect to real NASA data, update the API functions in `lib/api.ts`:

```typescript
// Replace mock data with real NASA API calls
export async function fetchEnvironmentalData(
  dataset: string,
  lat: number,
  lng: number,
  year: number
): Promise<EnvironmentalData | null> {
  // NASA GIBS API endpoint
  const nasaUrl = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi`
  
  // Add your NASA API key and parameters
  const params = {
    service: 'WMS',
    version: '1.3.0',
    request: 'GetMap',
    layers: nasaLayers[dataset].layer,
    // ... additional parameters
  }
  
  // Make API call and return real data
}
```

## 🎯 Key Features Explained

### 1. Interactive Map
- **Base Layer**: OpenStreetMap tiles
- **Overlay Layers**: NASA GIBS satellite data
- **Click Events**: Location-based analysis
- **Real-time Updates**: Live data refresh
- **Bangladesh Map**: All 64 districts with CircleMarkers and heatmaps
- **District-specific Data**: Environmental metrics for each district

### 2. Time Slider
- **Range**: 2000-2025 (historical + projections)
- **Animation**: Play/pause historical changes
- **Speed Control**: Slow/Normal/Fast playback
- **Event Timeline**: Key environmental milestones

### 3. Impact Analysis
- **Current Values**: Real-time measurements
- **Historical Comparison**: Baseline vs current
- **Trend Analysis**: Increasing/decreasing patterns
- **Status Indicators**: Color-coded risk levels

### 4. Responsive Design
- **Mobile-first**: Optimized for all screen sizes
- **Touch-friendly**: Gesture support for mobile
- **Progressive enhancement**: Works without JavaScript

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Configure environment variables** if needed
3. **Deploy automatically** on git push

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack hosting
- **DigitalOcean App Platform** - Container hosting

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# NASA API Configuration (for real data)
NASA_API_KEY=your_nasa_api_key_here
NASA_GIBS_URL=https://gibs.earthdata.nasa.gov

# Optional: Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Customization
- **Colors**: Update `tailwind.config.js` for brand colors
- **Data Sources**: Modify `lib/api.ts` for different APIs
- **Map Layers**: Add new layers in `components/Map.tsx`

## 📊 Data Accuracy

### Current Status
- **Mock Data**: Realistic simulations based on environmental trends
- **Historical Patterns**: Based on real climate change data
- **Projections**: Scientific estimates for 2025

### Real Data Integration
When connected to NASA APIs:
- **Update Frequency**: 1-6 hours for satellite data
- **Spatial Resolution**: 1km to 10km depending on dataset
- **Temporal Coverage**: 2000-present for most datasets

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Add animations with Framer Motion
- Test on mobile and desktop
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** for providing satellite data and GIBS services
- **Leaflet.js** community for the mapping library
- **Vercel** for hosting and deployment
- **OpenStreetMap** for base map tiles

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/eartpulse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/eartpulse/discussions)
- **Email**: support@eartpulse.com

---

**Made with ❤️ for environmental awareness and climate action**
