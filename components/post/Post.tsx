'use client';

import Date from '@/components/post/Date';
import type { Post } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function PostLayout({ post }: { post: Post }) {
  const router = useRouter();

  return (
    <article className="pb-20">
      <div className="max-w-2xl mx-auto text-white font-bold hover:text-emerald-200 mb-10 mt-10">
        <button type="button" onClick={() => router.back()}>
          ← Back to page
        </button>
      </div>
      <h1 className="mb-2 text-[2rem] text-white font-bold">{post.title}</h1>
      <div className="flex justify-between w-max mb-2">
        {post?.category.map((t) => {
          return (
            <Link
              href={`/category/${t}/pages/1`}
              key={t}
              className="cursor-pointer px-4 py-1 mr-2 mt-1 rounded-full bg-gray-400 font-semibold text-sm flex align-center w-max text-gray-800 no-underline"
            >
              {t}
            </Link>
          );
        })}
      </div>
      <div className="text-white text-[1.25rem] my-2">
        <Date dateString={post.date} />
      </div>
      <Markdown
        className="text-white"
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-[1.75rem] font-bold text-white mt-6" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-[1.5rem] font-bold text-white mt-6" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-[1.25rem] font-bold text-white mt-6" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="text-[1.125rem] font-bold text-white mt-6" {...props} />
          ),
          ul: ({ node, ...props }) => <ul className="ml-3 list-disc" {...props} />,
          li: ({ node, ...props }) => (
            <li className="font-light leading-[1.75rem] ml-3 my-3" {...props} />
          ),
          ol: ({ node, ...props }) => <ol className="ml-3 list-decimal" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-cyan-100 hover:text-emerald-500" {...props} target="_blank" />
          ),
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={tomorrow}
                ref={null} // Add a null ref to fix the type error
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {post.content}
      </Markdown>
    </article>
  );
}
