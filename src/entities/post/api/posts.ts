import fs from "node:fs";
import path from "node:path";
import { globSync } from "glob";
import matter from "gray-matter";
import { cache } from "react";
import type { Post } from "../model/types";

const postsDirectory = path.join(
  process.cwd(),
  "src/entities/post/model/constants/posts"
);

export const dynamic = "error";

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const files = globSync(`${postsDirectory}/**/*.md`);
  const posts = files
    .reduce((prev: Post[], cur) => {
      const file = fs.readFileSync(cur, { encoding: "utf-8" });
      const { data, content } = matter(file);
      const { date, completed } = data as Post;

      const path = cur
        .slice(cur.indexOf(postsDirectory) + postsDirectory.length + 1)
        .replace(".md", "");

      if (completed) {
        const result: Post = {
          title: data.title,
          subheading: data.subheading,
          category: data.category,
          completed,
          content,
          date,
          path,
        };
        prev.push(result);
      }
      return prev;
    }, [] as Post[])
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      return -1;
    });
  return posts;
});

export const getAllCategory = async (): Promise<
  Array<{ category: string; count: number }>
> => {
  const categories: string[] = (await getSortedPostsData()).reduce<string[]>(
    (prev, cur) => {
      for (const tag of cur.category) {
        prev.push(tag);
      }
      return prev;
    },
    []
  );

  const categoryWithCount = [...new Set(categories)].map((tag) => ({
    category: tag,
    count: categories.filter((t) => t === tag).length,
  }));

  return categoryWithCount.sort((a, b) => b.count - a.count);
};
