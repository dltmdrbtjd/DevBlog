"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    href: "/",
    label: "Home",
    match: (p: string) => p === "/",
  },
  {
    href: "/post",
    label: "Posts",
    match: (p: string) => p.startsWith("/post"),
  },
  {
    href: "/category",
    label: "Category",
    match: (p: string) => p.startsWith("/category"),
  },
  {
    href: "/about",
    label: "About",
    match: (p: string) => p.startsWith("/about"),
  },
] as const;

export default function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg-0/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3.5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-ink-0"
        >
          <Image
            src="/images/profile.jpeg"
            alt="profile"
            width={26}
            height={26}
            className="rounded-full"
          />
          dltmdrbtjd
        </Link>

        <nav className="flex items-center gap-5 text-sm sm:gap-7">
          {NAV.map(({ href, label, match }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors hover:text-ink-0 ${
                  active ? "font-medium text-ink-0" : "text-ink-2"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
