import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout'
import { DefaultNumberOfPosts } from '../../../../constant'
import { getAllCategory, getAllPosts } from '../../../../lib/posts'
import { Post } from '../../../../types'
import PostList from '../../../../components/layouts/List'
import Pagination from '../../../../components/pagination'

export default function Category({
  post,
  isNextPage,
  category,
  pageNum,
}: {
  post: Post[]
  isNextPage: boolean
  category: string
  pageNum: number
}) {
  return (
    <Layout back>
      <Head>
        <title>dltmdrbtjd | {category}</title>
      </Head>
      <PostList posts={post} title={category}></PostList>
      <Pagination
        isNextPage={isNextPage}
        pageNum={pageNum}
        prevPath={`/category/${category}/pages/${pageNum - 1}`}
        nextPath={`/category/${category}/pages/${pageNum + 1}`}
      />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategory = await getAllCategory()
  const posts = await getAllPosts()

  const paths: { params: { category: string; id: string } }[] = []
  allCategory.forEach(({ category }) => {
    const categoryCnt: number = posts.filter((post) =>
      post.category.find((t) => t === category),
    ).length

    ;[
      ...new Array(Math.round(categoryCnt / DefaultNumberOfPosts)).keys(),
    ].forEach((i) => {
      paths.push({ params: { category, id: `${i + 1}` } })
    })
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

interface ParamInterface {
  [key: string]: string | undefined
  category: string
  id: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getAllPosts()
  const { category, id } = params as ParamInterface
  const pageNum = parseInt(id)

  const postsWithCategory = posts.filter((post) =>
    post.category.find((t) => t === category),
  )

  if (isNaN(pageNum) || pageNum < 1) {
    return {
      notFound: true,
    }
  }

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts
  const lastIdx = startIdx + DefaultNumberOfPosts

  const post = postsWithCategory.slice(startIdx, lastIdx)
  const isNextPage = postsWithCategory.length / DefaultNumberOfPosts > pageNum

  return {
    props: {
      post,
      isNextPage,
      category,
      pageNum,
    },
  }
}
