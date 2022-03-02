import Image from 'next/image'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import Navigation from './Navigation'

export default function AppBar() {
  const router: NextRouter = useRouter()
  const path: string = router.pathname
  const isCategoryHover = (): string => {
    if (path.includes('posts') || path.includes('detail')) {
      return 'post'
    } else if (path.includes('category')) {
      return 'category'
    } else if (path.includes('about')) {
      return 'about'
    }
  }
  return (
    <header className="bg-gray-800 py-6 w-full fixed top-0 shadow-xl">
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4 text-white">
        <div className="flex items-center">
          <Image
            src="/images/profile.jpeg"
            alt="profile image"
            height={32}
            width={32}
            className="rounded-full shadow-lg bg-slate-500"
          />
          <Link href="/">
            <a className="ml-4 font-bold">dltmdrbtjd</a>
          </Link>
        </div>
        <div className="hidden sm:block">
          <Link href="/posts/1">
            <a
              className={`font-bold ${
                isCategoryHover() === 'post' ? 'text-emerald-200' : ''
              } hover:text-emerald-200`}
            >
              Post
            </a>
          </Link>
          <Link href="/category">
            <a
              className={`ml-4 font-bold ${
                isCategoryHover() === 'category' ? 'text-emerald-200' : ''
              } hover:text-emerald-200`}
            >
              Category
            </a>
          </Link>
          <Link href="/about">
            <a
              className={`ml-4 font-bold ${
                isCategoryHover() === 'about' ? 'text-emerald-200' : ''
              } hover:text-emerald-200`}
            >
              About Me
            </a>
          </Link>
        </div>
        <Navigation />
      </div>
    </header>
  )
}
