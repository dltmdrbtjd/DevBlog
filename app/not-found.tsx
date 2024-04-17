'use client';

import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col gap-10">
        <h1 className="text-white text-[3rem] font-semibold text-center">404 - Page Not Found</h1>
        <button
          className="text-[1.5rem] px-4 py-2 bg-blue-500 text-white flex justify-center items-center rounded-md cursor-pointer hover:bg-blue-600 transition-colors"
          onClick={() => router.push('/')}
        >
          Go back to home
        </button>
      </div>
    </div>
  );
}
