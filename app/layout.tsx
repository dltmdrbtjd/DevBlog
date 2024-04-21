import '@/styles/global.css';
import Header from '@/components/common/Header';
import GlobalLayout from '@/components/common/GlobalLayout';
import { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Dev Blog',
  description: '프론트엔드 개발자의 이것저것 끄적끄적 블로그',
  keywords:
    '프론트엔드, 개발자, 개발, 블로그, Blog, Next.js, React, Vue, Nuxt.js, Tailwind CSS, TypeScript, JavaScript, Nest.js, Express, MySQL, MongoDB, Prisma, Emotion,',
  robots: 'index, follow',
  openGraph: {
    title: 'Dev Blog',
    description: '프론트엔드 개발자의 이것저것 끄적끄적 블로그',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dltmdrbtjd.dev',
    siteName: 'Dev Blog',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        <GlobalLayout>{children}</GlobalLayout>
      </body>
      {process.env.NEXT_PUBLIC_STAGE === 'prod' && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!} />
      )}
    </html>
  );
}
