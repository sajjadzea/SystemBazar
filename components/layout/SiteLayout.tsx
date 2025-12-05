import React from 'react';
import Footer from './Footer';
import Header from './Header';

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-slate-100">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default SiteLayout;
