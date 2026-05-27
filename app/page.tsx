import { calcStats, getSortedPostsData, PostList } from '@/src/entities/post';
import { DefaultNumberOfPosts } from '@/src/shared/model';

export default async function Home() {
  const allPosts = await getSortedPostsData();
  const featured = allPosts.find((p) => p.featured) ?? allPosts[0];
  const restPosts = allPosts.filter((p) => p.path !== featured?.path);
  const posts = restPosts.slice(0, DefaultNumberOfPosts);
  const stats = calcStats(allPosts);

  return (
    <PostList
      posts={posts}
      featured={featured}
      stats={stats}
      greeting={
        <>
          <div className="kicker">devlog · est. 2021</div>
          <h1 className="mt-3 text-[40px] font-bold leading-[1.15] tracking-tight">
            차근차근 쌓아온 <span className="text-accent">기록들</span>.
          </h1>
          <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-ink-2">
            프론트엔드, 운영, 그리고 그 사이의 작은 결정들. 함께 고민하고 배운 것들을 짧게
            정리합니다.
          </p>
        </>
      }
    />
  );
}
