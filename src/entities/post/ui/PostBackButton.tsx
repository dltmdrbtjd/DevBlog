"use client";

import { useRouter } from "next/navigation";

export function PostBackButton() {
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto text-white font-bold hover:text-emerald-200 mb-10 mt-10">
      <button type="button" onClick={() => router.back()}>
        ← Back to page
      </button>
    </div>
  );
}
