import Head from 'next/head'
import { Post } from '../../types'
import Date from '../date'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function PostLayout({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className="mb-2">{post.title}</h1>
        <div className="flex justify-between w-max mb-2">
          {post?.category.map((t, i) => {
            return (
              <span
                key={i}
                className="px-4 py-1 mr-2 mt-1 rounded-full text-gray-800 bg-gray-400 font-semibold text-sm flex align-center w-max"
              >
                {t}
              </span>
            )
          })}
        </div>
        <div>
          <Date dateString={post.date} />
        </div>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code>{children}</code>
              )
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </>
  )
}
