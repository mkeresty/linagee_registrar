/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  env: {
    INURA_API: process.env.INFURA_API,
    ALCHEMY_API: process.env.ALCHEMY_API,
  },
};
