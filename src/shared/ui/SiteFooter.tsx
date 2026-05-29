export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div
        className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-2 px-6 py-6
                   font-mono text-xs text-ink-3 sm:flex-row sm:items-center sm:px-8"
      >
        <span>© {new Date().getFullYear()} dltmdrbtjd</span>
        <span className="flex items-center gap-3">
          <a
            href="https://github.com/dltmdrbtjd"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink-0"
          >
            github
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/승규-이-b2847521b/"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink-0"
          >
            linkedin
          </a>
        </span>
      </div>
    </footer>
  );
}
