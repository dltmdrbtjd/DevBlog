import { Post } from '../../types';
import Link from 'next/link';
import Date from '../date';

export default function PostList({ posts, title }: { posts: Post[]; title: string }) {
  return (
    <section className="text-white pb-10">
      <h1>{title}</h1>
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
            <div className="flex justify-between w-max my-2">
              {category.map((name) => {
                return (
                  <Link
                    className="cursor-pointer px-4 py-1 mr-2 mt-1 rounded-full bg-gray-400 font-semibold text-sm flex align-center w-max text-gray-800 no-underline"
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
