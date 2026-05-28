'use client';

import { useState } from 'react';

export type TocSection = {
  id: string;
  text: string;
  level: number;
};

type Props = {
  sections: TocSection[];
  activeId: string | null;
  totalMinutes: number;
};

export function Toc({ sections, activeId, totalMinutes }: Props) {
  const [open, setOpen] = useState(true);

  if (sections.length === 0) {
    return null;
  }

  return (
    <nav className="mb-9 rounded-md border border-line bg-bg-1 px-5 py-4">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-mono text-[10px] tracking-[0.1em] text-ink-3 uppercase">
          Table of contents
        </span>
        <span className="flex items-center gap-3 font-mono text-[11px] text-ink-4">
          <span>
            {sections.length} sections · {totalMinutes} min
          </span>
          <span
            aria-hidden="true"
            className={`text-ink-3 transition-transform ${open ? '' : '-rotate-90'}`}
          >
            ▾
          </span>
        </span>
      </button>

      {open && (
        <ol className="mt-3.5 m-0 grid list-none grid-cols-1 gap-x-6 gap-y-1.5 p-0 sm:grid-cols-2">
          {sections.map((s, i) => {
            const isActive = s.id === activeId;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex gap-2 text-[13px] transition-colors ${
                    isActive ? 'text-ink-0' : 'text-ink-2 hover:text-ink-0'
                  }`}
                >
                  <span
                    className={`w-[18px] shrink-0 font-mono text-[11px] transition-colors ${
                      isActive ? 'text-accent' : 'text-ink-4'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate">{s.text}</span>
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}
