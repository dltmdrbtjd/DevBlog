import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextRouter } from 'next/router'

export default function Navigation() {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

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
    <div className="sm:hidden">
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100"
        >
          {navShow ? (
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>
      <div
        className={`fixed top-24 right-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 ease-in-out dark:bg-gray-800 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          aria-label="toggle modal"
          className="fixed h-full w-full cursor-auto focus:outline-none"
          onClick={onToggleNav}
        ></button>
        <nav className="fixed mt-8 h-full">
          <div className="px12 py-4">
            <Link href="/posts/1">
              <a
                onClick={onToggleNav}
                className={`ml-4 font-bold ${
                  isCategoryHover() === 'post' ? 'text-emerald-200' : ''
                } text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100`}
              >
                Post
              </a>
            </Link>
          </div>
          <div className="px12 py-4">
            <Link href="/category">
              <a
                onClick={onToggleNav}
                className={`ml-4 font-bold ${
                  isCategoryHover() === 'category' ? 'text-emerald-200' : ''
                } text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100`}
              >
                Category
              </a>
            </Link>
          </div>
          <div className="px12 py-4">
            <Link href="/about">
              <a
                onClick={onToggleNav}
                className={`ml-4 font-bold ${
                  isCategoryHover() === 'about' ? 'text-emerald-200' : ''
                } text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100`}
              >
                About Me
              </a>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
