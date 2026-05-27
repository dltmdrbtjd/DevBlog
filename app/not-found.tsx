'use client';

import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-[980px] flex-col items-start gap-6 px-6 pt-20 sm:px-8">
      <div className="kicker">404 · not found</div>
      <h1 className="text-[40px] font-bold leading-[1.15] tracking-tight">
        길을 잃었<span className="text-accent">어요</span>.
      </h1>
      <p className="max-w-[520px] text-sm leading-relaxed text-ink-2">
        찾으시려는 페이지가 사라졌거나, 주소가 바뀌었을 수 있어요. 홈에서 다시 시작해 보세요.
      </p>
      <button
        type="button"
        onClick={() => router.push('/')}
        className="inline-flex items-center gap-2 rounded-md border border-line bg-bg-1 px-4 py-2
                   text-sm text-ink-0 transition-colors hover:border-line-strong"
      >
        <span aria-hidden="true">←</span>
        Home으로 돌아가기
      </button>
    </div>
  );
}
