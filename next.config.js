/** @type {import('next').NextConfig} */
// 2026-07-03: Optimizaciones SEO/rendimiento — sin header X-Powered-By y formatos modernos de imagen.
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig 