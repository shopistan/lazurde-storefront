/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = {
  reactStrictMode: true,
  ...nextTranslate(),
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "cdn.lazurde.com",
      "greatwall-sandbox-sandbox-image.imgix.net",
      "lazurdesandbox.imgix.net",
      "www.google.com",
    ],
  },
};

module.exports = nextConfig;
