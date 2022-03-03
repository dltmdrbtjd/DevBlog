import Head from 'next/head'
import Layout from '../components/layout'
import PostList from '../components/layouts/List'
import { getAllPosts } from '../lib/posts'
import { Post } from '../types'
import { GetStaticProps } from 'next'
import { DefaultNumberOfPosts } from '../constant'

export default function Home({ posts }: { posts: Array<Post> }) {
  return (
    <Layout back title="DevBlog" desc="dltmdrbtjd | DevBlog">
      <Head>
        <title>dltmdrbtjd | Home</title>
      </Head>
      <PostList posts={posts} title={'Latest'} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getAllPosts()
  const posts = allPostsData.slice(0, DefaultNumberOfPosts)
  return {
    props: {
      posts,
    },
  }
}
