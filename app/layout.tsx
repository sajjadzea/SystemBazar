import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import SiteLayout from '@/components/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'سیستم‌بازار – بازار بسته‌های سیستم‌سازی (System Pack)، سنجه‌ها و ابزارهای اندازه‌گیری',
  description: 'SystemBazar – دیدن سیستم، سنجش شفاف و ابزارهای تصمیم‌یار برای تیم‌های ایرانی.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
