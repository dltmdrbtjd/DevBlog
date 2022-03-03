import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Layout({
  children,
  back,
  title,
  desc,
}: {
  children: React.ReactNode
  back?: boolean
  title?: string
  desc?: string
}) {
  const router = useRouter()
  return (
    <div className="container mx-auto">
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta name="description" content={desc} />
        <meta property="og:image" content="/images/profile.jpeg" />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="prose max-w-2xl mx-auto mt-28 px-4">{children}</main>
      {!back && (
        <div className="max-w-2xl mx-auto text-white font-bold hover:text-emerald-200 px-4 mb-10 mt-10">
          <button onClick={() => router.back()}>← Back to page</button>
        </div>
      )}
    </div>
  )
}
