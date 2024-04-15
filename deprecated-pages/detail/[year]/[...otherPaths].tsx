import Layout from '../../layout'
import PostLayout from '../../../components/layouts/Post'
import { getAllPosts } from '../../../lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Post } from '../../../types'

export default function PostDetail({ post }: { post: Post }) {
  return (
    <Layout title={post.title} desc={`${post.subheading} - ${post.category}`}>
      <PostLayout post={post} />
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
  return {
    props: {
      post,
    },
  }
}
