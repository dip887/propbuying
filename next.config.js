/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "i.pravatar.cc",
      "cdn.sanity.io",
      "picsum.photos",
    ],
  },
  optimizeFonts: true,
};

module.exports = nextConfig;
