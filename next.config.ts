import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: ["res.cloudinary.com"], // Thêm domain của Cloudinary
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "thecrafthouse.vn",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com", // Thêm hostname mới
      },
    ],
  },
};
module.exports = {
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**", // Cho phép tất cả hostname
//       },
//     ],
//   },
// };

export default nextConfig;
