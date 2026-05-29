import Link from 'next/link';
import type { Post } from '../model/types';
import { PostDate } from './PostDate';

type Props = {
  prev?: Post;
  next?: Post;
};

export function PrevNext({ prev, next }: Props) {
  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
      {prev ? <NavCard post={prev} kind="prev" /> : <div className="hidden md:block" />}
      {next ? <NavCard post={next} kind="next" /> : <div className="hidden md:block" />}
    </div>
  );
}

function NavCard({ post, kind }: { post: Post; kind: 'prev' | 'next' }) {
  const isNext = kind === 'next';

  return (
    <Link
      href={`/post/${post.path}`}
      className={`card group block transition-colors hover:border-line-strong ${
        isNext ? 'text-right' : ''
      }`}
    >
      <div
        className={`kicker kicker-bare mb-2 flex items-center gap-1 ${isNext ? 'justify-end' : ''}`}
      >
        {isNext ? 'Next →' : '← Previous'}
      </div>
      <div className="mb-2 text-[15px] font-medium tracking-tight text-ink-0 transition-colors group-hover:text-accent">
        {post.title}
      </div>
      <div
        className={`flex items-center gap-1.5 font-mono text-xs text-ink-3 ${
          isNext ? 'justify-end' : ''
        }`}
      >
        <PostDate dateString={post.date} />
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min</span>
      </div>
    </Link>
  );
}
