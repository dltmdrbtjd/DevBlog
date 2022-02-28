import Layout from '../components/layout'
import { getAllCategory } from '../lib/posts'
import { GetStaticProps } from 'next'

export default function Category() {
  return (
    <Layout>
      <h2 className="text-5xl text-center border-b-[2px] border-b-gray-500 pb-5">
        Category
      </h2>
      <div>tagslist</div>
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
