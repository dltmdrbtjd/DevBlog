import {
  getAllCategory,
  getSortedPostsData,
  Pagination,
  PostList,
} from "@/src/entities/post";
import { DefaultNumberOfPosts } from "@/src/shared/model";

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
  const pageNum = Number.parseInt(id);

  const postsWithCategory = posts.filter((post) =>
    post.category.find((t) => t === category)
  );

  const postList = postsWithCategory.slice(
    (pageNum - 1) * DefaultNumberOfPosts,
    pageNum * DefaultNumberOfPosts
  );

  const description = postList.map((post) => post.title).join(", ");

  return {
    title: `${category} - ${id}`,
    description,
    robots: "index, follow",
    openGraph: {
      title: `${category} - ${id}`,
      description,
      type: "website",
      locale: "ko_KR",
      siteName: "Post List By Category",
    },
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const categories = await getAllCategory();

  const paths = categories.flatMap(({ category }) => {
    const categoryPosts = posts.filter((post) =>
      post.category.find((t) => t === category)
    );
    const categoryCnt = categoryPosts.length;

    return [
      ...new Array(Math.round(categoryCnt / DefaultNumberOfPosts)).keys(),
    ].map((i) => ({
      params: { category, id: `${i + 1}` },
    }));
  });

  return paths;
}

export default async function Category(props: Props) {
  const params = await props.params;
  const posts = await getSortedPostsData();
  const { slugs } = params;
  const category = decodeURIComponent(slugs[0]);
  const id = slugs[1];
  const pageNum = Number.parseInt(id);

  const startIdx = (pageNum - 1) * DefaultNumberOfPosts;
  const lastIdx = startIdx + DefaultNumberOfPosts;

  const postsWithCategory = posts.filter((post) =>
    post.category.find((t) => t === category)
  );

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
