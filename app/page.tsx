import { getSortedPostsData, PostList } from "@/src/entities/post";
import { DefaultNumberOfPosts } from "@/src/shared/model";

export default async function Home() {
  const posts = await getSortedPostsData();
  const slicesPosts = posts.slice(0, DefaultNumberOfPosts);

  return <PostList posts={slicesPosts} title="Latest" />;
}
