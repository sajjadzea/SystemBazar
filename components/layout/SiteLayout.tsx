import React from 'react';
import Footer from './Footer';
import Header from './Header';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:py-8 lg:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
