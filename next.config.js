/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'image.tmdb.org'  // Also adding TMDB for movie images
    ],
  },
}

module.exports = nextConfig 