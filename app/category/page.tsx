import Link from 'next/link';
import { getAllCategory } from '@/src/entities/post';

export default async function CategoryPage() {
  const categories = await getAllCategory();

  return (
    <div className="mx-auto max-w-[980px] px-6 pt-10 sm:px-8">
      <header className="mb-9">
        <div className="kicker">browse</div>
        <h1 className="mt-3 text-[36px] font-bold leading-[1.15] tracking-tight">
          카테고리별로 <span className="text-accent">살펴보기</span>.
        </h1>
        <p className="mt-2 max-w-[520px] text-sm leading-relaxed text-ink-2">
          관심 있는 주제부터 가볍게 둘러보세요.
        </p>
      </header>

      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 md:grid-cols-4">
        {categories.map(({ category, count }) => (
          <li key={category}>
            <Link
              href={`/category/${category}/1`}
              className="flex items-center justify-between rounded-md border border-line
                         bg-bg-1 px-4 py-3 text-sm text-ink-1 transition-colors
                         hover:border-line-strong hover:text-ink-0"
            >
              <span className="truncate">{category}</span>
              <span className="font-mono text-xs text-ink-3">{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
