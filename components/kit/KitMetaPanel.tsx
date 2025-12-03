import React from 'react';
import { KitMeta } from '@/lib/types';
import Tag from '../ui/Tag';
import Badge from '../ui/Badge';

interface KitMetaPanelProps {
  meta: KitMeta;
}

export function KitMetaPanel({ meta }: KitMetaPanelProps) {
  return (
    <div className="mb-6 space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        {meta.tags?.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <InfoBlock label="انواع سیستم" value={meta.systemTypes.join('، ')} />
        <InfoBlock label="رفتار" value={`${meta.behavior.dynamics} / ${meta.behavior.complexity}`} />
        <InfoBlock label="مقیاس" value={meta.scale.join('، ')} />
        <InfoBlock label="ساختار" value={meta.architecture.structure.join('، ')} />
        <InfoBlock label="کنترل" value={meta.architecture.control.join('، ')} />
        <InfoBlock label="نسخه" value={meta.version ?? 'v0.1'} />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <InfoList title="ورودی" items={meta.metrics.input} />
        <InfoList title="خروجی" items={meta.metrics.output} />
        <InfoList title="سلامت" items={meta.metrics.health} />
      </div>
      {meta.useCases?.length ? (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900">کاربردها</h4>
          <div className="flex flex-wrap gap-2 text-sm text-slate-700">
            {meta.useCases.map((u) => (
              <Badge key={u}>{u}</Badge>
            ))}
          </div>
        </div>
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

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2">
      <p className="text-xs text-slate-500">{title}</p>
      <ul className="mt-2 space-y-1 text-sm text-slate-800">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default KitMetaPanel;
