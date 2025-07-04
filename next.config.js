/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "yourdomain.com" }],
        destination: "https://www.yourdomain.com/:path*",
        permanent: true,
      },
    ];
  },
  // For App Router API routes (which we're using)
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
};

module.exports = nextConfig;
