/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      undici: false,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "undici": false,
      "net": false,
      "tls": false,
      "fs": false,
      "path": false,
    };
    return config;
  },
};

module.exports = nextConfig;