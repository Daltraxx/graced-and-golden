import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://gracedandgolden.com",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/services",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/services/mobile-spray-tanning",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/services/the-training",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/bridal-spray-tans",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/tan-care",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://gracedandgolden.com/contact",
      lastModified: new Date(),
    },
  ];
}