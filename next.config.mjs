/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
