import { GetAllJobs } from "@/app/service/employer";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let jobUrls: MetadataRoute.Sitemap = [];

  try {
    const jobsResponse = await GetAllJobs();
    if (Array.isArray(jobsResponse?.data?.result?.data)) {
      jobUrls = jobsResponse.data.result.data.map((job: any) => ({
        url: `${process.env.SITE_URL}/recruitment/${job.id}`,
        // SỬA LỖI: Kiểm tra job.updatedAt trước khi sử dụng
        lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
      }));
    }
  } catch (error) {
    console.error("Failed to fetch jobs for sitemap:", error);
  }

  return [
    { url: `${process.env.SITE_URL}`, lastModified: new Date() },
    {
      url: `${process.env.SITE_URL}/recruitment`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.SITE_URL}/help`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.SITE_URL}/modal`,
      lastModified: new Date(),
    },
    ...jobUrls,
  ];
}
