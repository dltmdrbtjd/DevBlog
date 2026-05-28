'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import type { Post } from '../model/types';
import { CodeBlock } from './CodeBlock';
import { PostDate } from './PostDate';
import { PostSidebar } from './PostSidebar';
import { PrevNext } from './PrevNext';
import { ScrollProgress } from './ScrollProgress';
import { Toc, type TocSection } from './Toc';

type Props = {
  post: Post;
  prev?: Post;
  next?: Post;
};

export function PostDetail({ post, prev, next }: Props) {
  const [sections, setSections] = useState<TocSection[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('article h2[id], article h3[id]'),
    );
    setSections(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? '',
        level: Number(h.tagName.slice(1)),
      })),
    );

    if (headings.length === 0) {
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const activeLine = 120;
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top > activeLine) {
          break;
        }
        current = h.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <div
        className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 pt-10 sm:px-8
                   lg:grid-cols-[1fr_220px]"
      >
        <article className="min-w-0">
          <Link
            href="/post/1"
            className="mb-4 inline-flex items-center gap-1.5 font-mono text-xs text-ink-3
                       transition-colors hover:text-ink-0"
          >
            <span aria-hidden="true">←</span>
            All posts
          </Link>

          {post.category.length > 0 && (
            <div className="mb-3.5 flex flex-wrap gap-1.5">
              {post.category.map((c, i) => (
                <Link
                  key={c}
                  href={`/category/${c}/1`}
                  className={i === 0 ? 'chip chip-accent' : 'chip'}
                >
                  {c}
                </Link>
              ))}
            </div>
          )}

          <h1 className="mb-3 text-[28px] font-bold leading-tight tracking-tight text-ink-0 sm:text-[32px]">
            {post.title}
          </h1>

          {post.subheading && (
            <p className="mb-3.5 text-[15px] leading-relaxed text-ink-2">{post.subheading}</p>
          )}

          <div className="mb-6 flex items-center gap-1.5 font-mono text-xs text-ink-3">
            <span>dltmdrbtjd</span>
            <span aria-hidden="true">·</span>
            <PostDate dateString={post.date} />
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>

          <Toc sections={sections} activeId={activeId} totalMinutes={post.readingTime} />

          <div className="prose-serif">
            <Markdown
              rehypePlugins={[rehypeSlug]}
              components={{
                h1: ({ node: _node, ...props }) => (
                  <h1
                    className="mt-10 mb-4 text-[26px] font-bold tracking-tight text-ink-0"
                    {...props}
                  />
                ),
                h2: ({ node: _node, ...props }) => (
                  <h2
                    className="mt-10 mb-4 scroll-mt-24 text-[22px] font-semibold tracking-tight text-ink-0"
                    {...props}
                  />
                ),
                h3: ({ node: _node, ...props }) => (
                  <h3
                    className="mt-8 mb-3 scroll-mt-24 text-[18px] font-semibold tracking-tight text-ink-0"
                    {...props}
                  />
                ),
                h4: ({ node: _node, ...props }) => (
                  <h4
                    className="mt-6 mb-3 text-[16px] font-semibold tracking-tight text-ink-0"
                    {...props}
                  />
                ),
                p: ({ node: _node, ...props }) => <p {...props} />,
                ul: ({ node: _node, ...props }) => (
                  <ul className="my-4 ml-5 list-disc marker:text-ink-3" {...props} />
                ),
                ol: ({ node: _node, ...props }) => (
                  <ol className="my-4 ml-5 list-decimal marker:text-ink-3" {...props} />
                ),
                li: ({ node: _node, ...props }) => (
                  <li className="my-1.5 leading-[1.8] text-ink-1" {...props} />
                ),
                a: ({ node: _node, ...props }) => (
                  <a
                    className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                  />
                ),
                blockquote: ({ node: _node, ...props }) => (
                  <blockquote
                    className="my-5 border-l-2 border-accent pl-4 text-ink-2 italic"
                    {...props}
                  />
                ),
                hr: () => <hr className="my-8 border-line" />,
                pre: ({ children }) => <>{children}</>,
                code: CodeBlock,
              }}
            >
              {post.content}
            </Markdown>
          </div>

          <PrevNext prev={prev} next={next} />
        </article>

        <PostSidebar post={post} />
      </div>
    </>
  );
}
