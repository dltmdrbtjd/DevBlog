import Link from 'next/link'

export default function Pagination({
  pageNum,
  isNextPage,
  prevPath,
  nextPath,
}: {
  pageNum: number
  isNextPage: boolean
  prevPath?: string
  nextPath?: string
}) {
  return (
    <div className="max-w-2xl mt-6 mb-8 flex justify-between itesm-center">
      <div className="flex w-1/2 justify-start">
        {pageNum > 1 && (
          <Link href={prevPath || `/posts/${pageNum - 1}`}>
            <a
              href="#"
              className="inline-flex justify-start no-underline items-center py-2 px-4 mr-3 text-sm font-medium text-gray-700 bg-white rounded-lg border border-white hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
            >
              <svg
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Previous
            </a>
          </Link>
        )}
      </div>
      <div className="flex w-1/2 justify-end">
        {isNextPage && (
          <Link href={nextPath || `/posts/${pageNum + 1}`}>
            <a
              href="#"
              className="inline-flex no-underline items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white rounded-lg border border-white hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
            >
              Next
              <svg
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </Link>
        )}
      </div>
    </div>
  )
}
