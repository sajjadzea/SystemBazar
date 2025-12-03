'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { okrTemplates, OKRDomain, OKRLevel } from './okrTemplates';

type EditableOKR = {
  objective: string;
  keyResults: string[];
};

function hydrateTemplates(domain: OKRDomain, level: OKRLevel, goal: string): EditableOKR[] {
  const selected = okrTemplates[domain][level] ?? [];
  const safeGoal = goal.trim() || 'هدف مورد نظر';
  return selected.map((template) => ({
    objective: template.objective.replace('{goal}', safeGoal),
    keyResults: template.keyResults.map((kr) => kr.replace('{goal}', safeGoal)),
  }));
}

export default function OKRBuilderPage() {
  const [domain, setDomain] = useState<OKRDomain>('sales');
  const [level, setLevel] = useState<OKRLevel>('company');
  const [goal, setGoal] = useState('افزایش رشد پایدار');
  const [okrs, setOkrs] = useState<EditableOKR[]>(() => hydrateTemplates('sales', 'company', 'افزایش رشد پایدار'));

  const options = useMemo(
    () => ({
      domains: [
        { value: 'sales', label: 'فروش' },
        { value: 'marketing', label: 'بازاریابی' },
        { value: 'operations', label: 'عملیات' },
        { value: 'product', label: 'محصول' },
        { value: 'hr', label: 'منابع انسانی' },
      ] satisfies { value: OKRDomain; label: string }[],
      levels: [
        { value: 'company', label: 'شرکت' },
        { value: 'team', label: 'تیم' },
        { value: 'individual', label: 'فردی' },
      ] satisfies { value: OKRLevel; label: string }[],
    }),
    [],
  );

  const regenerate = () => {
    setOkrs(hydrateTemplates(domain, level, goal));
  };

  const updateObjective = (index: number, value: string) => {
    setOkrs((prev) => prev.map((okr, i) => (i === index ? { ...okr, objective: value } : okr)));
  };

  const updateKeyResult = (okrIndex: number, krIndex: number, value: string) => {
    setOkrs((prev) =>
      prev.map((okr, i) =>
        i === okrIndex ? { ...okr, keyResults: okr.keyResults.map((kr, j) => (j === krIndex ? value : kr)) } : okr,
      ),
    );
  };

  const copyAll = async () => {
    const block = okrs
      .map((okr) => {
        const lines = [`Objective: ${okr.objective}`, ...okr.keyResults.map((kr, idx) => `KR${idx + 1}: ${kr}`)];
        return lines.join('\n');
      })
      .join('\n\n');
    await navigator.clipboard.writeText(block);
    alert('OKR ها در کلیپ‌بورد کپی شد.');
  };

  return (
    <div className="space-y-8">
      <Section
        title="سازنده OKR"
        subtitle="دامنه و سطح را انتخاب کنید، هدف را بنویسید و OKR پیشنهادی را دریافت کنید."
        actions={
          <button
            type="button"
            onClick={copyAll}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            کپی همه
          </button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="domain">
              دامنه
            </label>
            <select
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value as OKRDomain)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {options.domains.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-800" htmlFor="level">
              سطح
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value as OKRLevel)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            >
              {options.levels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 sm:col-span-1">
            <label className="text-sm font-semibold text-slate-800" htmlFor="goal">
              توصیف هدف (جمله کوتاه)
            </label>
            <input
              id="goal"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              placeholder="مثلاً رشد پایدار مشترکان"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <p className="text-xs text-slate-500">الگوها ثابت هستند و بعداً می‌توانند قابل پیکربندی شوند.</p>
          <button
            type="button"
            onClick={regenerate}
            className="rounded-lg border border-indigo-100 bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50"
          >
            ساخت OKR
          </button>
        </div>
      </Section>

      <Section title="خروجی OKR" subtitle="هر خط قابل ویرایش و سپس کپی است">
        <div className="space-y-4">
          {okrs.map((okr, okrIndex) => (
            <Card key={okrIndex} title={`Objective ${okrIndex + 1}`}>
              <textarea
                value={okr.objective}
                onChange={(e) => updateObjective(okrIndex, e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                rows={2}
              />
              <div className="mt-3 space-y-2">
                {okr.keyResults.map((kr, krIndex) => (
                  <div key={krIndex} className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">KR {krIndex + 1}</label>
                    <textarea
                      value={kr}
                      onChange={(e) => updateKeyResult(okrIndex, krIndex, e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
