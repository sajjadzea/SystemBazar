import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  href?: string;
  children?: React.ReactNode;
  tags?: string[];
}

export function Card({ title, description, href, children }: CardProps) {
  const content = (
    <div className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {description && <p className="mt-2 text-sm text-slate-600">{description}</p>}
      </div>
      {children && <div className="mt-3 flex flex-wrap gap-2 text-xs">{children}</div>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}

export default Card;
