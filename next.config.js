const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/webgpu': path.resolve(__dirname, 'lib/three-webgpu-stub.js'),
      'three/tsl': path.resolve(__dirname, 'lib/three-tsl-stub.js'),
    }
    return config
  },
}

module.exports = nextConfig
