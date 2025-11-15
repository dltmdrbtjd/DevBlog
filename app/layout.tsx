import "@/src/app/styles/global.css";
import { GlobalLayout, Header } from "@/src/shared/ui";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://dltmdrbtjd.dev"),
  title: {
    default: "Dev Blog",
    template: "%s | Dev Blog",
  },
  description: "프론트엔드 개발자의 이것저것 끄적끄적 블로그",
  keywords:
    "프론트엔드, 개발자, 개발, 블로그, Blog, Next.js, React, Vue, Nuxt.js, Tailwind CSS, TypeScript, JavaScript, Nest.js, Express, MySQL, MongoDB, Prisma, Emotion",
  authors: [{ name: "dltmdrbtjd", url: "https://dltmdrbtjd.dev" }],
  creator: "dltmdrbtjd",
  robots: "index, follow",
  alternates: {
    canonical: "https://dltmdrbtjd.dev",
  },
  openGraph: {
    title: "Dev Blog",
    description: "프론트엔드 개발자의 이것저것 끄적끄적 블로그",
    type: "website",
    locale: "ko_KR",
    url: "https://dltmdrbtjd.dev",
    siteName: "Dev Blog",
    images: [
      {
        url: "/images/profile.jpeg",
        width: 1200,
        height: 630,
        alt: "Dev Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Blog",
    description: "프론트엔드 개발자의 이것저것 끄적끄적 블로그",
    images: ["/images/profile.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dev Blog",
    description: "프론트엔드 개발자의 이것저것 끄적끄적 블로그",
    url: "https://dltmdrbtjd.dev",
    author: {
      "@type": "Person",
      name: "dltmdrbtjd",
      url: "https://dltmdrbtjd.dev",
    },
    inLanguage: "ko-KR",
  };

  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <GlobalLayout>{children}</GlobalLayout>
      </body>
      {process.env.NEXT_PUBLIC_STAGE === "prod" &&
        process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID} />
        )}
    </html>
  );
}
