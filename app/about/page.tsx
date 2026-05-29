import type { Metadata } from "next";
import Image from "next/image";
import { CAREER, SKILLS } from "@/src/entities/about";

export const metadata: Metadata = {
  title: "About",
  description: "Lee Seung Gyu · Frontend Engineer · Seoul",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-6 pt-10 sm:px-8">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[260px_1fr] md:gap-14">
        <ProfileRail />
        <Main />
      </div>
    </div>
  );
}

function ProfileRail() {
  return (
    <aside className="flex flex-col gap-6 md:sticky md:top-24">
      <div className="flex flex-col items-start gap-1.5">
        <div className="relative mb-3 h-[84px] w-[84px]">
          <Image
            src="/images/profile.jpeg"
            alt="Lee Seung Gyu"
            width={84}
            height={84}
            className="rounded-full"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: "0 0 0 6px var(--body-bg), 0 0 0 7px var(--line)",
            }}
          />
        </div>
        <div className="text-xl font-semibold tracking-tight">
          Lee Seung Gyu
        </div>
        <div className="text-[13px] text-ink-2">Frontend Engineer · Seoul</div>
        <a
          href="mailto:dltmdrbtjd@gmail.com"
          className="mt-1 font-mono text-xs text-accent transition-colors hover:underline"
        >
          dltmdrbtjd@gmail.com
        </a>
        <div className="mt-2.5 flex gap-2">
          <a
            href="https://github.com/dltmdrbtjd"
            target="_blank"
            rel="noreferrer"
            className="chip transition-colors hover:text-ink-0"
          >
            ↗ GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/승규-이-b2847521b/"
            target="_blank"
            rel="noreferrer"
            className="chip transition-colors hover:text-ink-0"
          >
            ↗ LinkedIn
          </a>
        </div>
      </div>

      <div>
        <div className="kicker mb-2">Now</div>
        <p className="text-[13px] leading-[1.6] text-ink-1">
          현재 금융 콘텐츠 플랫폼을 만들고 있습니다. 최근에는 AI를 통하여 유저가
          서비스를 더 가치있게 느낄수있도록 만드는 작업들에 관심을 많이 가지고
          진행하고 있습니다.
        </p>
      </div>

      <div>
        <div className="kicker mb-2">Interests</div>
        <div className="flex flex-wrap gap-1.5">
          {["AI", "DX", "Performance", "Observability"].map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}

function Main() {
  return (
    <div className="min-w-0">
      <div className="kicker">about me</div>
      <h1 className="mt-3 mb-3.5 text-[36px] font-bold leading-[1.15] tracking-tight">
        함께 고민하며 만드는 <span className="text-accent">사람</span>.
      </h1>
      <p className="mb-10 max-w-[640px] text-[15px] leading-[1.75] text-ink-2">
        TypeScript와 React 생태계 안에서 프로덕트를 만들어 왔습니다. 콘텐츠 기반
        서비스를 설계·운영하며 조직의 기술 표준과 공통 라이브러리 구축을 통해
        개발 생산성 향상에 기여했습니다. 코드가 만들어내는 비즈니스 임팩트에
        관심이 많습니다. 최근에는 AI를 통하여 생산성을 향상시키는것과 더불어
        유저가 서비스를 더 가치있게 사용할 수 있도록 하게끔 하는것에 관심이
        많습니다.
      </p>
      <section className="mt-10 border-t border-line py-6">
        <div className="kicker mb-4">Key Expertise</div>
        <dl className="m-0 flex flex-row gap-3 p-0">
          {SKILLS.map((s) => (
            <dd className="m-0 flex flex-wrap gap-1.5">
              <span key={s} className="chip">
                {s}
              </span>
            </dd>
          ))}
        </dl>
      </section>
      <div className="mb-5 flex items-baseline justify-between">
        <div className="kicker">career</div>
        <span className="font-mono text-xs text-ink-3">2021 — now · 4y+</span>
      </div>
      <div className="relative pl-7">
        <div className="tl-rail" style={{ left: 5 }} />

        {CAREER.map((c) => (
          <article key={c.company} className="relative mb-10 last:mb-0">
            <span
              className={`tl-dot absolute top-0 -left-7 ${c.current ? "" : "tl-dot-muted"}`}
            />

            <header className="mb-1 flex flex-wrap items-baseline gap-2.5">
              <h2 className="text-lg font-semibold tracking-tight">
                {c.company}
              </h2>
              <span className="text-xs text-ink-3">{c.role}</span>
              <span className="ml-auto font-mono text-[11px] text-ink-3">
                {c.period}
                {c.current && <span className="ml-2 text-accent">● now</span>}
              </span>
            </header>

            <div className="mb-3 text-[13px] text-ink-2">{c.service}</div>

            <div className="mb-3.5 flex flex-wrap gap-1.5">
              {c.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <ol className="m-0 list-none p-0 text-[13.5px] leading-[1.75] text-ink-1">
              {c.bullets.map((b, i) => (
                <li key={b} className="mb-1 flex gap-2.5">
                  <span className="shrink-0 pt-1 font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}
