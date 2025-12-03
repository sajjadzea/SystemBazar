import React from 'react';

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

export default Badge;
