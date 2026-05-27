import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Post } from '../model/types';
import { PostDate } from './PostDate';

export type PostListStats = {
  posts: number;
  tags: number;
  years: string;
};

type Props = {
  posts: Post[];
  featured?: Post;
  stats?: PostListStats;
  greeting?: ReactNode;
  listLabel?: string;
  children?: ReactNode;
};

export function PostList({
  posts,
  featured,
  stats,
  greeting,
  listLabel = 'Latest posts',
  children,
}: Props) {
  return (
    <div className="mx-auto max-w-[980px] px-6 pt-10 sm:px-8">
      {(greeting || stats) && (
        <header className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">{greeting}</div>
          {stats && (
            <div className="tnum flex items-end gap-7 self-start sm:self-end">
              <Stat value={`${stats.posts}`} label="Posts" />
              <Stat value={`${stats.tags}`} label="Tags" />
              <Stat value={stats.years} label="Writing" />
            </div>
          )}
        </header>
      )}

      {featured && <FeaturedCard post={featured} />}

      {posts.length > 0 && (
        <div className="mb-3.5 flex items-end justify-between">
          <div className="kicker">{listLabel}</div>
        </div>
      )}

      <ul className="m-0 list-none border-t border-line p-0">
        {posts.map((p) => (
          <li
            key={p.path}
            className="grid grid-cols-1 items-start gap-x-6 gap-y-2 border-b border-line py-5
                       sm:grid-cols-[90px_1fr_auto]"
          >
            <PostDate dateString={p.date} className="font-mono text-xs text-ink-3 sm:pt-1" />
            <div className="min-w-0">
              <Link
                href={`/post/${p.path}`}
                className="mb-1 block text-[17px] font-medium tracking-tight text-ink-0
                           transition-colors hover:text-accent"
              >
                {p.title}
              </Link>
              {p.subheading && (
                <p className="mb-2.5 text-[13px] leading-relaxed text-ink-2">{p.subheading}</p>
              )}
              {p.category.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {p.category.map((c) => (
                    <Link key={c} href={`/category/${c}/1`} className="chip">
                      {c}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <span className="font-mono text-xs text-ink-4 sm:pt-1">{p.readingTime} min</span>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-right">
      <div className="text-[22px] font-semibold leading-none tracking-tight text-ink-0">
        {value}
      </div>
      <div className="kicker kicker-bare mt-1.5">{label}</div>
    </div>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <article
      className="card card-featured mb-10 grid grid-cols-1 gap-8 p-7
                 md:grid-cols-[1.4fr_1fr]"
    >
      <div className="flex flex-col justify-between gap-6">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className="chip chip-accent">★ Featured</span>
            <span className="flex items-center gap-1.5 font-mono text-xs text-ink-3">
              <PostDate dateString={post.date} />
              <span aria-hidden="true">·</span>
              <span>{post.readingTime} min</span>
            </span>
          </div>
          <h2 className="mb-3 text-[26px] font-semibold leading-[1.25] tracking-tight">
            <Link href={`/post/${post.path}`} className="transition-colors hover:text-accent">
              {post.title}
            </Link>
          </h2>
          {post.subheading && (
            <p className="text-sm leading-relaxed text-ink-2">{post.subheading}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {post.category.map((c) => (
            <Link key={c} href={`/category/${c}/1`} className="chip chip-solid">
              {c}
            </Link>
          ))}
          <Link
            href={`/post/${post.path}`}
            className="ml-auto inline-flex items-center gap-1 text-sm text-accent"
          >
            Read post →
          </Link>
        </div>
      </div>

      {post.cover ? (
        <div className="relative h-full min-h-[200px] overflow-hidden rounded-md">
          <Image src={post.cover} alt="" fill className="object-cover" />
        </div>
      ) : (
        <div
          className="flex min-h-[200px] items-center justify-center rounded-md
                     border border-dashed border-line-strong font-mono text-[11px] text-ink-4"
        >
          cover · 16:9
        </div>
      )}
    </article>
  );
}
