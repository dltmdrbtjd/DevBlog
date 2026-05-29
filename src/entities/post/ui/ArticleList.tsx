import { notFound } from 'next/navigation';
import { DefaultNumberOfPosts } from '@/src/shared/model';
import { getSortedPostsData } from '../api/posts';
import { Pagination } from './Pagination';
import { PostList } from './PostList';

export async function ArticleList({ pageNum }: { pageNum: number }) {
  const allPosts = await getSortedPostsData();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / DefaultNumberOfPosts));

  if (Number.isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts;
  const posts = allPosts.slice(startIdx, startIdx + DefaultNumberOfPosts);

  // 1페이지는 /post, 2페이지부터는 /post/N
  const prevPath = pageNum <= 1 ? undefined : pageNum === 2 ? '/post' : `/post/${pageNum - 1}`;
  const nextPath = pageNum < totalPages ? `/post/${pageNum + 1}` : undefined;

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
      <Pagination
        pageNum={pageNum}
        isNextPage={pageNum < totalPages}
        prevPath={prevPath}
        nextPath={nextPath}
      />
    </PostList>
  );
}
