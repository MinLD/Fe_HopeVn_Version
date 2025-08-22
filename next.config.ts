import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cấu hình headers cho API route
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", // Thay bằng domain thực tế khi triển khai
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Authorization, Content-Type",
          },
        ],
      },
    ];
  },

  // Cấu hình images (loại bỏ Cloudinary nếu không cần)
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // Giữ các domain khác nếu cần
      },
      {
        protocol: "https",
        hostname: "thecrafthouse.vn",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.udemycdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "han01.vstorage.vngcloud.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "elearning.iigvietnam.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Cấu hình rewrite
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
};

export default nextConfig;
