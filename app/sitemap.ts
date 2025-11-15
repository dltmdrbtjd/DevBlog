import type { MetadataRoute } from "next";
import { getSortedPostsData, getAllCategory } from "@/src/entities/post";
import { DefaultNumberOfPosts } from "@/src/shared/model";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dltmdrbtjd.dev";

  // Get all posts and categories
  const posts = await getSortedPostsData();
  const categories = await getAllCategory();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Individual blog post pages
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/post/${post.path}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Post pagination pages
  const totalPostPages = Math.ceil(posts.length / DefaultNumberOfPosts);
  const postPaginationPages: MetadataRoute.Sitemap = Array.from(
    { length: totalPostPages },
    (_, i) => ({
      url: `${baseUrl}/post/${i + 1}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })
  );

  // Category pagination pages
  const categoryPages: MetadataRoute.Sitemap = categories.flatMap(
    ({ category, count }) => {
      const totalPages = Math.ceil(count / DefaultNumberOfPosts);
      return Array.from({ length: totalPages }, (_, i) => ({
        url: `${baseUrl}/category/${encodeURIComponent(category)}/${i + 1}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  );

  return [
    ...staticPages,
    ...postPages,
    ...postPaginationPages,
    ...categoryPages,
  ];
}
