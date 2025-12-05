'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { href: '/kits', label: 'کیت‌ها' },
  { href: '/metrics', label: 'سنجه‌ها' },
  { href: '/tools', label: 'ابزارها' },
  { href: '/system-theory', label: 'نظریه سیستم' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          سیستم‌بازار
        </Link>
        <nav className="flex items-center gap-2 text-sm text-slate-200">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 transition ${
                  active
                    ? 'bg-accent/20 text-white shadow-glass border border-accent/40'
                    : 'text-slate-300 hover:bg-slate-800/80 border border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
