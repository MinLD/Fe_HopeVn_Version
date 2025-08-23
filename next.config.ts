import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Cấu hình rewrite để proxy API
  async rewrites() {
    return [
      {
        // BẤT KỲ request nào đến /api/abc sẽ được chuyển tiếp
        source: "/api/:path*",
        // đến địa chỉ backend tương ứng là ${process.env.BACKEND_URL}/abc
        destination: `${
          process.env.BACKEND_URL || "https://ourhope.io.vn/api"
        }/:path*`,
      },
    ];
  },

  // Giữ nguyên cấu hình images của bạn
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "thecrafthouse.vn" },
      { protocol: "https", hostname: "cdn.shopify.com" },
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
};

export default nextConfig;
