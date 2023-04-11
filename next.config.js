/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  compiler: {
    reactRemoveProperties: process.env.VERCEL_ENV === 'production' ? { properties: ['^data-cy$'] } : false,
  },
};

module.exports = nextConfig;
