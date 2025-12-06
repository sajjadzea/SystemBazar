import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">systembazar — بازار بسته‌های سیستم‌سازی و ابزارهای اندازه‌گیری</p>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} همهٔ حقوق محفوظ است.</p>
        </div>
        <nav className="flex flex-wrap gap-3 text-xs text-slate-300">
          <a href="/kits" className="transition hover:text-accent">بسته‌های سیستم</a>
          <a href="/metrics" className="transition hover:text-accent">سنجه‌ها</a>
          <a href="/tools" className="transition hover:text-accent">ابزارها</a>
          <a href="/contact" className="transition hover:text-accent">تماس</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
