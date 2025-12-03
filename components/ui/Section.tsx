import React from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Section({ title, subtitle, children, actions }: SectionProps) {
  return (
    <section className="space-y-4 py-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export default Section;
