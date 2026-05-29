'use client';

import { useState } from 'react';
import type { Post } from '../model/types';
import { PostDate } from './PostDate';

type Props = {
  post: Post;
};

export function PostSidebar({ post }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently noop
    }
  };

  const shareUrl = (platform: 'twitter' | 'linkedin') => {
    if (typeof window === 'undefined') {
      return '#';
    }
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    return platform === 'twitter'
      ? `https://twitter.com/intent/tweet?text=${text}&url=${url}`
      : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  };

  return (
    <aside className="hidden border-l border-line pl-4 lg:block">
      <div className="sticky top-24">
        <Label>Share</Label>
        <div className="mb-7 flex flex-col gap-2 text-xs text-ink-2">
          <a
            href={shareUrl('twitter')}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink-0"
          >
            ↗ Twitter / X
          </a>
          <a
            href={shareUrl('linkedin')}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink-0"
          >
            ↗ LinkedIn
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="text-left transition-colors hover:text-ink-0"
          >
            {copied ? '✓ Copied!' : '↗ Copy link'}
          </button>
        </div>

        {post.category.length > 0 && (
          <>
            <Label>Tags</Label>
            <div className="mb-7 flex flex-wrap gap-1.5">
              {post.category.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </>
        )}

        <Label>Last edited</Label>
        <PostDate dateString={post.updated ?? post.date} className="font-mono text-xs text-ink-2" />
      </div>
    </aside>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 font-mono text-[10px] tracking-[0.1em] text-ink-3 uppercase">
      {children}
    </div>
  );
}
