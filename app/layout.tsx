import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import SiteLayout from '@/components/layout/SiteLayout';

export const metadata: Metadata = {
  title: 'سیستم‌بازار – بازار کیت‌ها، سنجه‌ها و ابزارهای سیستم‌سازی',
  description: 'SystemBazar – سیستم‌سازی برای ایران با کیت‌ها، سنجه‌ها و ابزارهای سیستمی.',
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
