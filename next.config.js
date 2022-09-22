/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COLLECTIBLE_1155: process.env.INSTANCE_1155,
    COLLECTIBLE_721: process.env.INSTANCE_721,
    NFT_FACTORY: process.env.NFT_FACTORY,
    MARKETPLACE: process.env.MARKETPLACE,
    GOVERNANCE: process.env.GOVERNANCE,
    PAYMENT_TOKEN: process.env.PAYMENT_TOKEN,
    TOKEN_UTIL: process.env.TOKEN_UTIL
  }
}

module.exports = nextConfig

