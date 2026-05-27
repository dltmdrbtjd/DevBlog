import Link from 'next/link';

export function Pagination({
  pageNum,
  isNextPage,
  prevPath,
  nextPath,
}: {
  pageNum: number;
  isNextPage: boolean;
  prevPath?: string;
  nextPath?: string;
}) {
  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between border-t border-line pt-6"
    >
      <div>
        {pageNum > 1 ? (
          <Link
            href={prevPath ?? `/post/${pageNum - 1}`}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2
                       font-mono text-xs text-ink-2 transition-colors
                       hover:border-line-strong hover:text-ink-0"
          >
            <span aria-hidden="true">←</span>
            Previous
          </Link>
        ) : (
          <span />
        )}
      </div>

      <span className="font-mono text-xs text-ink-3">page {pageNum}</span>

      <div>
        {isNextPage ? (
          <Link
            href={nextPath ?? `/post/${pageNum + 1}`}
            className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2
                       font-mono text-xs text-ink-2 transition-colors
                       hover:border-line-strong hover:text-ink-0"
          >
            Next
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
