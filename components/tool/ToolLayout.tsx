import React from 'react';
import Tag from '../ui/Tag';
import Badge from '../ui/Badge';
import { ToolMeta } from '@/lib/types';

interface ToolLayoutProps {
  meta?: ToolMeta;
  children: React.ReactNode;
}

export function ToolLayout({ meta, children }: ToolLayoutProps) {
  return (
    <div className="space-y-4">
      {meta ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{meta.kind}</Badge>
            {meta.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-600">{meta.summary}</p>
        </div>
      ) : null}
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">{children}</div>
    </div>
  );
}

export default ToolLayout;
