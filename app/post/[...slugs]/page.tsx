import { notFound } from 'next/navigation';
import { getSortedPostsData, PostDetail } from '@/src/entities/post';

interface Props {
  params: Promise<{
    slugs: string[];
  }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const posts = await getSortedPostsData();
  const fullPath = decodeURIComponent([...(params.slugs as string[])].join('/'));

  const post = posts.find((p) => p?.path === fullPath);
  const baseUrl = 'https://dltmdrbtjd.dev';
  const url = `${baseUrl}/post/${fullPath}`;
  const description = post?.content.replaceAll('\n', '').slice(0, 150) || '';
  const ogImage = `${baseUrl}/images/profile.jpeg`;

  return {
    title: post?.title,
    description,
    keywords: post?.category.join(', '),
    robots: 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post?.title,
      description,
      type: 'article',
      locale: 'ko_KR',
      url,
      siteName: 'Dev Blog',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
      publishedTime: post?.date,
      modifiedTime: post?.updated ?? post?.date,
      authors: ['dltmdrbtjd'],
      tags: post?.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts.map((post) => ({
    params: { slugs: post.path.split('/') },
  }));
}

export default async function PostDetailPage(props: Props) {
  const params = await props.params;
  const posts = await getSortedPostsData();
  const fullPath = decodeURIComponent([...(params.slugs as string[])].join('/'));

  const idx = posts.findIndex((p) => p?.path === fullPath);
  const post = idx >= 0 ? posts[idx] : undefined;

  if (!post) {
    notFound();
  }

  // posts is sorted by date desc → older posts come at idx + 1, newer at idx - 1
  const prev = posts[idx + 1];
  const next = posts[idx - 1];

  const baseUrl = 'https://dltmdrbtjd.dev';
  const url = `${baseUrl}/post/${fullPath}`;
  const ogImage = `${baseUrl}/images/profile.jpeg`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.replaceAll('\n', '').slice(0, 150),
    image: ogImage,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      '@type': 'Person',
      name: 'dltmdrbtjd',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'dltmdrbtjd',
      url: baseUrl,
    },
    keywords: post.category.join(', '),
    articleSection: post.category[0],
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetail post={post} prev={prev} next={next} />
    </>
  );
}
