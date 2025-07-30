/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/docs",
        destination: "/docs",
      },
      {
        source: "/docs/:path*",
        destination: "/docs/:path*",
      },
    ];
  },
};

export default nextConfig;
