import Layout from '../components/layout'
import { getAllCategory } from '../lib/posts'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'

export default function Category({
  categories,
}: {
  categories: Array<{ category: string; count: number }>
}) {
  return (
    <Layout back title="Category" desc="dltmdrbtjd | Category">
      <Head>
        <title>dltmdrbtjd | Category</title>
      </Head>
      <h2 className="text-5xl text-center border-b-[2px] border-b-gray-500 pb-5 mb-8">
        Category
      </h2>
      <div className="flex flex-wrap max-w-xl mx-auto">
        {categories.map(({ category, count }) => {
          return (
            <div
              key={category}
              className="flex justfiy-center items-center mt-2 mr-8 ml-8 mb-2 h-6"
            >
              <Link href={`/category/${category}/pages/1`}>
                <a className="text-xl no-underline text-green-200 hover:text-green-400">
                  {category}
                </a>
              </Link>
              <p className="ml-2 font-bold text-white">{count}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getAllCategory()
  return {
    props: {
      categories,
    },
  }
}
