import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <p>سیستم‌بازار – بازار کیت‌ها و ابزارهای سیستم‌سازی</p>
        <p className="text-xs text-slate-500">نسخه اولیه آزمایشی</p>
      </div>
    </footer>
  );
}

export default Footer;
