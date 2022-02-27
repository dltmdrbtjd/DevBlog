import Image from 'next/image'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'

export default function AppBar() {
  const router: NextRouter = useRouter()
  const path: string = router.pathname
  const isCategoryHover = (): string => {
    console.log(path.split('/'))
    if (path === '/' || path.split('/')[1].startsWith('[y')) {
      return 'post'
    } else if (path === '/about') {
      return 'detail'
    } else {
      return 'tags'
    }
  }
  return (
    <header className="bg-gray-800 py-6 w-full fixed top-0">
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
        <div>
          <Link href="/">
            <a
              className={`font-bold ${
                isCategoryHover() === 'post' ? 'text-emerald-200' : ''
              }`}
            >
              Post
            </a>
          </Link>
          <Link href="/tags">
            <a
              className={`ml-4 font-bold ${
                isCategoryHover() === 'tags' ? 'text-emerald-200' : ''
              }`}
            >
              Tags
            </a>
          </Link>
          <Link href="/about">
            <a
              className={`ml-4 font-bold ${
                isCategoryHover() === 'detail' ? 'text-emerald-200' : ''
              }`}
            >
              About Me
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}
