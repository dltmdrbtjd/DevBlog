import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/layout'
import ListLayout from '../../components/layouts/List'
import Pagination from '../../components/pagination'
import { DefaultNumberOfPosts } from '../../constant'
import { getAllPosts } from '../../lib/posts'
import { Post } from '../../types'

export default function PostList({
  posts,
  pageNum,
  isNextPage,
}: {
  posts: Array<Post>
  pageNum: number
  isNextPage: boolean
}) {
  return (
    <Layout back>
      <ListLayout posts={posts} title={'Post'} />
      <Pagination pageNum={pageNum} isNextPage={isNextPage} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()

  const paths = [
    ...new Array(Math.round(posts.length / DefaultNumberOfPosts)).keys(),
  ].map((i) => ({ params: { page: `${i + 1}` } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

interface PageInterface {
  [key: string]: string | undefined
  page: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params as PageInterface
  const pageNum = parseInt(page)
  const allPosts = await getAllPosts()

  if (isNaN(pageNum) || pageNum < 1) {
    return {
      notFound: true,
    }
  }

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts
  const lastIdx = startIdx + DefaultNumberOfPosts
  const posts = allPosts.slice(startIdx, lastIdx)

  const isNextPage = allPosts.length / DefaultNumberOfPosts > pageNum
  return {
    props: {
      posts,
      pageNum,
      isNextPage,
    },
  }
}
