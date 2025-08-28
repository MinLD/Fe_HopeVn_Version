import { MetadataRoute } from "next";

// Giả sử bạn có các hàm lấy dữ liệu từ API
async function getAllJobs() {
  const res = await fetch("https://your-api.com/jobs");
  return res.json();
}
async function getAllArticles() {
  const res = await fetch("https://your-api.com/articles");
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ourhope.io.vn/";

  // Lấy các URL động
  const jobs = await getAllJobs();
  const articles = await getAllArticles();

  const jobUrls = jobs.map((job: any) => ({
    url: `${baseUrl}/tuyen-dung/${job.slug}`,
    lastModified: new Date(job.updatedAt),
  }));

  const articleUrls = articles.map((article: any) => ({
    url: `${baseUrl}/ho-tro/${article.slug}`,
    lastModified: new Date(article.updatedAt),
  }));

  // Trả về mảng các URL, bao gồm cả các trang tĩnh
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/tuyen-dung`, lastModified: new Date() },
    { url: `${baseUrl}/ho-tro`, lastModified: new Date() },
    ...jobUrls,
    ...articleUrls,
  ];
}
