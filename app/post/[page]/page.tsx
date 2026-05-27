import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSortedPostsData, Pagination, PostList } from '@/src/entities/post';
import { DefaultNumberOfPosts } from '@/src/shared/model';

export const metadata: Metadata = {
  title: 'Post List',
  description: 'Post List',
  robots: 'index, follow',
  openGraph: {
    title: 'Post List',
    description: 'Post List',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Post List',
  },
};

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const totalPages = Math.max(1, Math.ceil(posts.length / DefaultNumberOfPosts));
  return Array.from({ length: totalPages }, (_, i) => ({
    params: { page: `${i + 1}` },
  }));
}

interface Params {
  page: string;
}

export default async function PostListPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const allPosts = await getSortedPostsData();
  const { page } = params;
  const pageNum = Number.parseInt(page, 10);

  if (Number.isNaN(pageNum) || pageNum < 1) {
    notFound();
  }

  const totalPages = Math.max(1, Math.ceil(allPosts.length / DefaultNumberOfPosts));
  const startIdx = (pageNum - 1) * DefaultNumberOfPosts;
  const lastIdx = startIdx + DefaultNumberOfPosts;
  const posts = allPosts.slice(startIdx, lastIdx);
  const isNextPage = pageNum < totalPages;

  return (
    <PostList
      posts={posts}
      listLabel={`Page ${pageNum} of ${totalPages}`}
      greeting={
        <>
          <div className="kicker">devlog · archive</div>
          <h1 className="mt-3 text-[36px] font-bold leading-[1.15] tracking-tight">
            모든 글<span className="text-accent">.</span>
          </h1>
          <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-ink-2">
            오래된 순서대로 차근차근 살펴볼 수 있도록 정리해 두었어요.
          </p>
        </>
      }
    >
      <Pagination pageNum={pageNum} isNextPage={isNextPage} />
    </PostList>
  );
}
