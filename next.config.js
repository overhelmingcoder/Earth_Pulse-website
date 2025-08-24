/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['gibs.earthdata.nasa.gov', 'worldview.earthdata.nasa.gov'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
}

module.exports = nextConfig
