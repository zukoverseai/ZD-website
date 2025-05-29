import { createRequire } from "module";
const require = createRequire(import.meta.url);
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Alias Node's deprecated punycode to the npm 'punycode' package
    config.resolve.alias = {
      ...config.resolve.alias,
      punycode: require.resolve("punycode/"),
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
