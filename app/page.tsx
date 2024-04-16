import PostList from '@/components/post/PostList';
import { DefaultNumberOfPosts } from '@/constant';
import { getSortedPostsData } from '@/service/post';

export default async function Home() {
  const posts = await getSortedPostsData();
  const slicesPosts = posts.slice(0, DefaultNumberOfPosts);

  return <PostList posts={slicesPosts} title="Latest" />;
}
