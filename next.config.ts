import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
