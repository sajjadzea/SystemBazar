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
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          سیستم‌بازار
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-3 py-2 transition hover:bg-slate-100 ${
                  active ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600'
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
