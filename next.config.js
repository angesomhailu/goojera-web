/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'image.tmdb.org'  // Also adding TMDB for movie images
    ],
    unoptimized: true // Add this for static exports
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Specify the output
  output: 'standalone',
  // Disable static optimization for auth pages
  experimental: {
    appDir: false,
  },
  // Add custom webpack config to handle client-side only code
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig 