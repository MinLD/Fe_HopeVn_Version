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
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  };
}
