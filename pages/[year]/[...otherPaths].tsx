import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import { GetStaticProps, GetStaticPaths } from 'next'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function Post({
  post,
}: {
  post: {
    title: string
    date: string
    content: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1>{post.title}</h1>
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
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts()
  const paths: Array<{ params: { year: string; otherPaths: string[] } }> =
    allPosts.reduce<Array<{ params: { year: string; otherPaths: string[] } }>>(
      (prev, { path }) => {
        const [year, ...otherPaths] = `${path.replace('.md', '')}`.split('/')
        prev.push({ params: { year, otherPaths } })
        return prev
      },
      [],
    )
  return {
    paths,
    fallback: 'blocking',
  }
}

interface PathInterface {
  [key: string]: string | string[] | undefined
  year: string
  otherPaths: string[]
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { year, otherPaths } = params as PathInterface
  const fullPath = [year, ...(otherPaths as string[])].join('/')
  const posts = await getAllPosts()
  const post = posts.find((p) => p?.path === fullPath)
  console.log(post)
  return {
    props: {
      post,
    },
  }
}
