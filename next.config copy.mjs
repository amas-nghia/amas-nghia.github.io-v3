/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
   output: 'export', 
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
      assetPrefix: isProd ? '/amas-nghia.github.io' : '',
      basePath: isProd ? '/amas-nghia.github.io' : '',
}

export default nextConfig
