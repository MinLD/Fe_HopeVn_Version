import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/employer",
          "/authenticate/loggin",
          "/account/profile",
          "register/partner",
          "wallet",
        ],
      },
    ],
    sitemap: `https://ourhope.io.vn/sitemap.xml`,
  };
}
