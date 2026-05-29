import type { Metadata } from 'next';
import { ArticleList } from '@/src/entities/post';

export const metadata: Metadata = {
  title: 'Posts',
  description: '전체 글 목록',
  robots: 'index, follow',
  openGraph: {
    title: 'Posts',
    description: '전체 글 목록',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Dev Blog',
  },
};

export default function PostListPage() {
  return <ArticleList pageNum={1} />;
}
