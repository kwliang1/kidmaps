/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domain: ['maps.googleapis.com'],
  }
}

module.exports = nextConfig
