'use client';

import type { TocSection } from './Toc';

type Props = {
  sections: TocSection[];
  activeId: string | null;
};

export function ProgressRail({ sections, activeId }: Props) {
  if (sections.length === 0) {
    return <div className="hidden lg:block" aria-hidden="true" />;
  }

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  );
  const railHeight = Math.max(360, Math.min(560, sections.length * 36 + 100));
  const span = sections.length > 1 ? sections.length - 1 : 1;

  return (
    <div className="hidden lg:block">
      <div className="sticky top-24" style={{ height: railHeight }}>
        <div className="relative h-full border-l border-dashed border-line">
          {sections.map((s, i) => {
            const top = (i / span) * 100;
            const isActive = s.id === activeId;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`absolute left-2 -translate-y-1/2 font-mono text-[10px] transition-colors ${
                  isActive ? 'text-accent' : 'text-ink-4 hover:text-ink-2'
                }`}
                style={{ top: `${top}%` }}
              >
                {String(i + 1).padStart(2, '0')}
              </a>
            );
          })}
          <div
            className="absolute -left-px w-0.5 rounded bg-accent transition-all"
            style={{
              top: `${(activeIndex / span) * 100}%`,
              height: `${100 / Math.max(sections.length, 1)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
