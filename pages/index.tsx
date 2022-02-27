import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getAllPosts } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string
    title: string
    subheading: string
    path: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1>Post</h1>
        <ul>
          {allPostsData.map(({ path, date, title, subheading }) => (
            <li key={path}>
              <Link href={`/${path}`} passHref>
                <a className="text-cyan-100 no-underline text-xl">{title}</a>
              </Link>
              <p className="my-0">{subheading}</p>
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getAllPosts()
  return {
    props: {
      allPostsData,
    },
  }
}
