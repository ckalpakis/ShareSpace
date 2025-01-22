/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["drasjnxbtwrtjeduqttz.supabase.co"],
  },
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Temporary fix for deployment
  },
};

module.exports = nextConfig;
