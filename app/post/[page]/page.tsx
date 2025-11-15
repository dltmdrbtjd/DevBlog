import { getSortedPostsData, Pagination, PostList } from "@/src/entities/post";
import { DefaultNumberOfPosts } from "@/src/shared/model";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Post List",
  description: "Post List",
  robots: "index, follow",
  openGraph: {
    title: "Post List",
    description: "Post List",
    type: "website",
    locale: "ko_KR",
    siteName: "Post List",
  },
};

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const paths = [
    ...new Array(Math.round(posts.length / DefaultNumberOfPosts)).keys(),
  ].map((i) => ({
    params: { page: `${i + 1}` },
  }));

  return paths;
}

interface Params {
  page: string;
}

export default async function PostListPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const allPosts = await getSortedPostsData();
  const { page } = params;
  const pageNum = Number.parseInt(page);

  if (Number.isNaN(pageNum) || pageNum < 1) {
    notFound();
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
