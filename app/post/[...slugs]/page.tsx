import PostLayout from '@/components/post/Post';
import { getSortedPostsData } from '@/service/post';

interface Props {
  params: {
    slugs: string[];
  };
}

export async function generateMetadata({ params }: Props) {
  const posts = await getSortedPostsData();
  const fullPath = decodeURIComponent([...(params.slugs as string[])].join('/'));

  const post = posts.find((p) => p?.path === fullPath);

  return {
    title: post?.title,
    description: post?.content.replaceAll('\n', '').slice(0, 150),
    robots: 'index, follow',
    openGraph: {
      title: post?.title,
      description: post?.content.replaceAll('\n', '').slice(0, 150),
      type: 'article',
      locale: 'ko_KR',
      siteName: 'Dev Blog',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  const paths = posts.map((post) => ({
    params: { slugs: post.path.split('/') },
  }));

  return paths;
}

export default async function PostDetail({ params }: Props) {
  const posts = await getSortedPostsData();
  const fullPath = decodeURIComponent([...(params.slugs as string[])].join('/'));

  const post = posts.find((p) => p?.path === fullPath);

  if (!post) {
    return <div>Not Found</div>;
  }

  return <PostLayout post={post} />;
}
