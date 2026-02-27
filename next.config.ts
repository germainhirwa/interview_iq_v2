/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['130.58.167.212'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logos.hunter.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig