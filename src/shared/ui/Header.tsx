'use client';

import { Tab } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

export default function AppBar() {
  return (
    <header className="bg-gray-800 py-6 w-full fixed top-0 shadow-xl z-10">
      <Tab.Group>
        <Tab.List className="flex justify-between items-center max-w-2xl mx-auto px-4 text-white">
          <Tab>
            <Link className="ml-4 font-bold flex items-center gap-2" href="/">
              <Image
                src="/images/profile.jpeg"
                alt="profile image"
                height={32}
                width={32}
                className="rounded-full shadow-lg bg-slate-500 z-1"
              />
              dltmdrbtjd
            </Link>
          </Tab>
          <TabLink href="/post/1" title="Post" />
          <TabLink href="/category" title="Category" />
          <TabLink href="/about" title="About Me" />
        </Tab.List>
      </Tab.Group>
    </header>
  );
}

const TabLink = ({ href, title }: { href: string; title: string }) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <Link
          className={`font-bold ${selected ? 'text-emerald-200' : ''} hover:text-emerald-200`}
          href={href}
        >
          {title}
        </Link>
      )}
    </Tab>
  );
};
