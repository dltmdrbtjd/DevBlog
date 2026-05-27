import { getAllCategory, getSortedPostsData, Pagination, PostList } from '@/src/entities/post';
import { DefaultNumberOfPosts } from '@/src/shared/model';

interface Props {
  params: Promise<{
    slugs: string[];
  }>;
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const posts = await getSortedPostsData();
  const { slugs } = params;
  const category = decodeURIComponent(slugs[0]);
  const id = slugs[1];
  const pageNum = Number.parseInt(id, 10);

  const postsWithCategory = posts.filter((post) => post.category.find((t) => t === category));

  const postList = postsWithCategory.slice(
    (pageNum - 1) * DefaultNumberOfPosts,
    pageNum * DefaultNumberOfPosts,
  );

  const description = postList.map((post) => post.title).join(', ');

  return {
    title: `${category} - ${id}`,
    description,
    robots: 'index, follow',
    openGraph: {
      title: `${category} - ${id}`,
      description,
      type: 'website',
      locale: 'ko_KR',
      siteName: 'Post List By Category',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const categories = await getAllCategory();

  return categories.flatMap(({ category }) => {
    const categoryPosts = posts.filter((post) => post.category.find((t) => t === category));
    const totalPages = Math.max(1, Math.ceil(categoryPosts.length / DefaultNumberOfPosts));
    return Array.from({ length: totalPages }, (_, i) => ({
      params: { category, id: `${i + 1}` },
    }));
  });
}

export default async function Category(props: Props) {
  const params = await props.params;
  const posts = await getSortedPostsData();
  const { slugs } = params;
  const category = decodeURIComponent(slugs[0]);
  const id = slugs[1];
  const pageNum = Number.parseInt(id, 10);

  const postsWithCategory = posts.filter((post) => post.category.find((t) => t === category));

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts;
  const lastIdx = startIdx + DefaultNumberOfPosts;
  const slicedPosts = postsWithCategory.slice(startIdx, lastIdx);
  const totalPages = Math.max(1, Math.ceil(postsWithCategory.length / DefaultNumberOfPosts));
  const isNextPage = pageNum < totalPages;

  return (
    <PostList
      posts={slicedPosts}
      listLabel={`${category} · ${postsWithCategory.length} posts`}
      greeting={
        <>
          <div className="kicker">category</div>
          <h1 className="mt-3 text-[36px] font-bold leading-[1.15] tracking-tight">
            {category}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-ink-2">
            {category} 주제로 정리한 글 모음입니다.
          </p>
        </>
      }
    >
      <Pagination
        isNextPage={isNextPage}
        pageNum={pageNum}
        prevPath={`/category/${category}/${pageNum - 1}`}
        nextPath={`/category/${category}/${pageNum + 1}`}
      />
    </PostList>
  );
}
