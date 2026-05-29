'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export function CodeBlock({ className, children, ...rest }: Props) {
  const match = /language-(\w+)/.exec(className ?? '');
  const code = String(children ?? '').replace(/\n$/, '');

  if (!match) {
    return (
      <code
        className="rounded border border-line bg-bg-2 px-1.5 py-0.5 font-mono text-[0.9em] text-ink-1"
        {...rest}
      >
        {children}
      </code>
    );
  }

  const lang = match[1];

  return (
    <div className="codeblock">
      <CodeHead lang={lang} code={code} />
      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '14px',
          background: 'transparent',
          fontSize: '12px',
          lineHeight: '1.55',
        }}
        codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function CodeHead({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently noop
    }
  };

  return (
    <div className="codeblock-head">
      <div className="flex items-center gap-2.5">
        <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
        <span className="lang">{lang}</span>
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="codeblock-copy"
        aria-label={copied ? 'Code copied' : 'Copy code'}
      >
        <CopyIcon />
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <title>Copy</title>
      <rect x="4" y="4" width="9" height="9" rx="1.5" />
      <path d="M10 4V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h1" />
    </svg>
  );
}
