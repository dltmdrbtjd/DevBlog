import { PostDate } from "./PostDate";
import type { Post } from "@/src/entities/post/model/types";
import Link from "next/link";

export function PostList({ posts, title }: { posts: Post[]; title: string }) {
  return (
    <section className="text-white pb-4">
      <h1 className="text-[1.75rem] font-bold">{title}</h1>
      <ul className="px-0">
        {posts.map(({ path, date, title, subheading, category }) => (
          <li
            key={path}
            className="border-b pt-3 pb-3 border-gray-400 list-none"
          >
            <Link
              className="text-cyan-100 no-underline text-xl hover:text-emerald-500"
              href={`/post/${path}`}
            >
              {title}
            </Link>
            <p className="my-2">{subheading}</p>
            <div className="flex flex-wrap my-2 gap-2">
              {category.map((c) => {
                return (
                  <Link
                    className="cursor-pointer px-4 py-1 rounded-xl bg-gray-400 font-semibold text-sm flex align-center text-gray-800 no-underline"
                    href={`/category/${c}/1`}
                    key={c}
                  >
                    {c}
                  </Link>
                );
              })}
            </div>
            <small>
              <PostDate dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
