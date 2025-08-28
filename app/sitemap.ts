import { GetAllJobs } from "@/app/service/employer";
import { getAllPost } from "@/app/service/User";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ourhope.io.vn/";

  let jobUrls: MetadataRoute.Sitemap = [];
  let articleUrls: MetadataRoute.Sitemap = [];

  try {
    const jobsResponse = await GetAllJobs();
    if (Array.isArray(jobsResponse?.data?.result?.data)) {
      jobUrls = jobsResponse.data.result.data.map((job: any) => ({
        url: `${baseUrl}/recruitment/${job.id}`,
        // SỬA LỖI: Kiểm tra job.updatedAt trước khi sử dụng
        lastModified: job.updatedAt ? new Date(job.updatedAt) : new Date(),
      }));
    }
  } catch (error) {
    console.error("Failed to fetch jobs for sitemap:", error);
  }

  try {
    const articlesResponse = await getAllPost();
    if (Array.isArray(articlesResponse?.data?.result?.data)) {
      articleUrls = articlesResponse.data.result.data.map((article: any) => ({
        url: `${baseUrl}/help/${article.id}`,
        // SỬA LỖI: Kiểm tra article.updatedAt trước khi sử dụng
        lastModified: article.updatedAt
          ? new Date(article.updatedAt)
          : new Date(),
      }));
    }
  } catch (error) {
    console.error("Failed to fetch articles for sitemap:", error);
  }

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/recruitment`, lastModified: new Date() },
    { url: `${baseUrl}/help`, lastModified: new Date() },
    ...jobUrls,
    ...articleUrls,
  ];
}
