/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: [
      'static.wixstatic.com',
      'image.lexica.art',
      'storage.googleapis.com',
    ],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
