/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manitosilk.com"
      }
    ]
  }
};

export default nextConfig;
