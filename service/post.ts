import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { globSync } from 'glob';
import { Post } from '../types';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

export const dynamic = 'error';

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const files = globSync(`${postsDirectory}/**/*.md`);
  const posts = files
    .reduce((prev: Post[], cur) => {
      const file = fs.readFileSync(cur, { encoding: 'utf-8' });
      const { data, content } = matter(file);
      const { date, completed } = data as Post;

      const path = cur
        .slice(cur.indexOf(postsDirectory) + postsDirectory.length + 1)
        .replace('.md', '');

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
        return [...prev, result];
      }
      return prev;
    }, [] as Post[])
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  return posts;
});

export const getAllCategory = async (): Promise<Array<{ category: string; count: number }>> => {
  const categories: string[] = (await getSortedPostsData()).reduce<string[]>((prev, cur) => {
    cur.category.forEach((tag: string) => {
      prev.push(tag);
    });
    return prev;
  }, []);

  const categoryWithCount = [...new Set(categories)].map((tag) => ({
    category: tag,
    count: categories.filter((t) => t === tag).length,
  }));

  return categoryWithCount.sort((a, b) => b.count - a.count);
};
