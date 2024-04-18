import Pagination from '@/components/post/Pagination';
import PostList from '@/components/post/PostList';
import { DefaultNumberOfPosts } from '@/constant';
import { getAllCategory, getSortedPostsData } from '@/service/post';

interface Props {
  params: {
    slugs: string[];
  };
}

export async function generateMetadata({ params }: Props) {
  const posts = await getSortedPostsData();
  const { slugs } = params;
  const category = decodeURIComponent(slugs[0]);
  const id = slugs[1];
  const pageNum = parseInt(id);

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

  const paths = categories.flatMap(({ category }) => {
    const categoryPosts = posts.filter((post) => post.category.find((t) => t === category));
    const categoryCnt = categoryPosts.length;

    return [...new Array(Math.round(categoryCnt / DefaultNumberOfPosts)).keys()].map((i) => ({
      params: { category, id: `${i + 1}` },
    }));
  });

  return paths;
}

export default async function Category({ params }: Props) {
  const posts = await getSortedPostsData();
  const { slugs } = params;
  const category = decodeURIComponent(slugs[0]);
  const id = slugs[1];
  const pageNum = parseInt(id);

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts;
  const lastIdx = startIdx + DefaultNumberOfPosts;

  const postsWithCategory = posts.filter((post) => post.category.find((t) => t === category));

  const post = postsWithCategory.slice(startIdx, lastIdx);
  const isNextPage = postsWithCategory.length / DefaultNumberOfPosts > pageNum;

  return (
    <div>
      <PostList posts={post} title={category} />
      <Pagination
        isNextPage={isNextPage}
        pageNum={pageNum}
        prevPath={`/category/${category}/${pageNum - 1}`}
        nextPath={`/category/${category}/${pageNum + 1}`}
      />
    </div>
  );
}
