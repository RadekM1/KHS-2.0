import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/khs-zlin/**",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '13mb',
    },
  },
};

export default nextConfig;
