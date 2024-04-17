import Pagination from '@/components/post/Pagination';
import PostList from '@/components/post/PostList';
import { DefaultNumberOfPosts } from '@/constant';
import { getSortedPostsData } from '@/service/post';
import { Metadata } from 'next';

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
  const paths = [...new Array(Math.round(posts.length / DefaultNumberOfPosts)).keys()].map((i) => ({
    params: { page: `${i + 1}` },
  }));

  return paths;
}

interface Params {
  page: string;
}

export default async function PostListPage({ params }: { params: Params }) {
  const allPosts = await getSortedPostsData();
  const { page } = params;
  const pageNum = parseInt(page);

  if (isNaN(pageNum) || pageNum < 1) {
    return {
      notFound: true,
    };
  }

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts;
  const lastIdx = startIdx + DefaultNumberOfPosts;
  const posts = allPosts.slice(startIdx, lastIdx);

  const isNextPage = allPosts.length / DefaultNumberOfPosts > pageNum;

  return (
    <div>
      <PostList posts={posts} title="Post" />
      <Pagination pageNum={pageNum} isNextPage={isNextPage} />
    </div>
  );
}
