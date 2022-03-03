import { Post } from '../../types'
import Link from 'next/link'
import Date from '../date'

export default function ListLayout({
  posts,
  title,
}: {
  posts: Post[]
  title: string
}) {
  return (
    <section>
      <h1>{title}</h1>
      <ul className="px-0">
        {posts.map(({ path, date, title, subheading, category }) => (
          <li
            key={path}
            className="border-b-[1px] pt-3 pb-3 border-gray-400 list-none"
          >
            <Link href={`/detail/${path}`} passHref>
              <a className="text-cyan-100 no-underline text-xl hover:text-emerald-500">
                {title}
              </a>
            </Link>
            <p className="my-0">{subheading}</p>
            <div className="flex justify-between w-max">
              {category.map((t) => {
                return (
                  <Link href={`/category/${t}/pages/1`} key={t}>
                    <span className="cursor-pointer px-4 py-1 mr-2 mt-1 rounded-full bg-gray-400 font-semibold text-sm flex align-center w-max">
                      <a className="text-gray-800 no-underline">{t}</a>
                    </span>
                  </Link>
                )
              })}
            </div>
            <small>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}
