import Head from 'next/head'
import { useRouter } from 'next/router'

export const siteTitle = 'Next.js Sample Website'

export default function Layout({
  children,
  back,
}: {
  children: React.ReactNode
  back?: boolean
}) {
  const router = useRouter()
  return (
    <div className="container mx-auto">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="prose max-w-2xl mx-auto mt-28 px-4">{children}</main>
      {!back && (
        <div className="max-w-2xl mx-auto text-white font-bold hover:text-emerald-200 px-4 mb-10">
          <button onClick={() => router.back()}>← Back to page</button>
        </div>
      )}
    </div>
  )
}
