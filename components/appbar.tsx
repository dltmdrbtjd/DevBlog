import Image from 'next/image'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'

export default function AppBar() {
  const router: NextRouter = useRouter()
  const path: string = router.pathname
  const isCategoryHover = (): string => {
    if (path === '/' || path.split('/')[1] === 'posts') {
      return 'post'
    } else if (path === '/about') {
      return 'detail'
    }
  }
  return (
    <header className="bg-gray-800 py-6 w-full fixed top-0">
      <div className="flex justify-between items-center max-w-2xl mx-auto px-4 text-white">
        <div className="flex items-center">
          <Image
            src="/images/profile.jpg"
            alt="profile image"
            height={32}
            width={32}
          />
          <h2 className="ml-4 font-bold">dltmdrbtjd</h2>
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
