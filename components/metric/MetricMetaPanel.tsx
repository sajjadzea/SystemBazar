import React from 'react';
import { MetricMeta } from '@/lib/types';
import Tag from '../ui/Tag';

export function MetricMetaPanel({ meta }: { meta: MetricMeta }) {
  return (
    <div className="mb-6 space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        <Tag>{meta.category}</Tag>
        {meta.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <InfoBlock label="انواع سیستم" value={meta.systemTypes.join('، ')} />
        {meta.unit && <InfoBlock label="واحد" value={meta.unit} />}
        {meta.typicalRange && <InfoBlock label="بازه معمول" value={meta.typicalRange} />}
      </div>
      {meta.authors?.length ? (
        <p className="text-xs text-slate-600">گردآورنده: {meta.authors.join('، ')}</p>
      ) : null}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}

export default MetricMetaPanel;
