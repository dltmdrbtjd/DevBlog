// ------------- Styles ----------------------
import '@/styles/global.css';
//-------------- Components ------------------
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="container mx-auto">
          {/* <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta name="description" content={desc} />
        <meta property="og:image" content="/images/profile.jpeg" />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head> */}
          <Header />
          <main className="prose max-w-2xl mx-auto mt-28 px-4">{children}</main>
          {/* {!back && (
        <div className="max-w-2xl mx-auto text-white font-bold hover:text-emerald-200 px-4 mb-10 mt-10">
          <button onClick={() => router.back()}>← Back to page</button>
        </div>
      )} */}
        </div>
      </body>
    </html>
  );
}
