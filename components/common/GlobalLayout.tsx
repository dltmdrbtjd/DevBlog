export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto">
      {/* <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta name="description" content={desc} />
        <meta property="og:image" content="/images/profile.jpeg" />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head> */}
      <main className="prose max-w-2xl mx-auto mt-28 px-4">{children}</main>
      {/* {!back && (
        <div className="max-w-2xl mx-auto text-white font-bold hover:text-emerald-200 px-4 mb-10 mt-10">
          <button onClick={() => router.back()}>← Back to page</button>
        </div>
      )} */}
    </div>
  );
}
