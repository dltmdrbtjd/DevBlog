import Link from 'next/link';
import Date from '@/components/post/Date';
import { Post } from '@/types';

export default function PostList({ posts, title }: { posts: Post[]; title: string }) {
  return (
    <section className="text-white pb-4">
      <h1 className="text-[1.75rem] font-bold">{title}</h1>
      <ul className="px-0">
        {posts.map(({ path, date, title, subheading, category }) => (
          <li key={path} className="border-b-[1px] pt-3 pb-3 border-gray-400 list-none">
            <Link
              className="text-cyan-100 no-underline text-xl hover:text-emerald-500"
              href={`/post/${path}`}
            >
              {title}
            </Link>
            <p className="my-2">{subheading}</p>
            <div className="flex flex-wrap my-2 gap-2">
              {category.map((name) => {
                return (
                  <Link
                    className="cursor-pointer px-4 py-1 rounded-xl bg-gray-400 font-semibold text-sm flex align-center text-gray-800 no-underline"
                    href={`/category/${name}/pages/1`}
                    key={name}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
