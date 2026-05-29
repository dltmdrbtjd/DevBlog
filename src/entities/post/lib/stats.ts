import type { Post } from '../model/types';

const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;

export function calcStats(posts: Post[]) {
  const tags = new Set(posts.flatMap((p) => p.category));
  const oldest = posts.at(-1)?.date;
  const years = oldest
    ? Math.max(1, Math.floor((Date.now() - new Date(oldest).getTime()) / YEAR_IN_MS))
    : 1;

  return {
    posts: posts.length,
    tags: tags.size,
    years: `${years}y`,
  };
}
