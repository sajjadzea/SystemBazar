'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';

interface Criterion {
  id: string;
  name: string;
  weight: number;
}

interface Option {
  id: string;
  name: string;
}

type ScoreState = Record<string, Record<string, number>>;

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function WeightedMatrixPage() {
  const [criteria, setCriteria] = useState<Criterion[]>([
    { id: createId('criteria'), name: 'هزینه', weight: 1 },
    { id: createId('criteria'), name: 'کیفیت', weight: 1 },
  ]);
  const [options, setOptions] = useState<Option[]>([
    { id: createId('option'), name: 'گزینه A' },
    { id: createId('option'), name: 'گزینه B' },
  ]);
  const [scores, setScores] = useState<ScoreState>({});

  const totals = useMemo(() => {
    return options.map((option) => {
      const total = criteria.reduce((sum, criterion) => {
        const score = scores[criterion.id]?.[option.id] ?? 0;
        return sum + score * criterion.weight;
      }, 0);
      return { optionId: option.id, value: Number(total.toFixed(2)) };
    });
  }, [criteria, options, scores]);

  const bestScore = totals.length ? Math.max(...totals.map((t) => t.value)) : 0;

  const updateCriterion = (id: string, patch: Partial<Criterion>) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const updateOption = (id: string, name: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, name } : o)));
  };

  const updateScore = (criterionId: string, optionId: string, value: number) => {
    setScores((prev) => ({
      ...prev,
      [criterionId]: {
        ...prev[criterionId],
        [optionId]: value,
      },
    }));
  };

  const addCriterion = () => {
    setCriteria((prev) => [...prev, { id: createId('criteria'), name: 'معیار جدید', weight: 1 }]);
  };

  const addOption = () => {
    setOptions((prev) => [...prev, { id: createId('option'), name: `گزینه ${String.fromCharCode(65 + prev.length)}` }]);
  };

  const removeCriterion = (id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
    setScores((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const removeOption = (id: string) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
    setScores((prev) => {
      const next: ScoreState = {};
      Object.entries(prev).forEach(([criterionId, criterionScores]) => {
        const { [id]: _, ...rest } = criterionScores;
        next[criterionId] = rest;
      });
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <Section
        title="ماتریس وزن‌دار تصمیم"
        subtitle="معیارها را وزن بدهید، گزینه‌ها را امتیازدهی کنید و بهترین انتخاب را ببینید."
        actions={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addCriterion}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              افزودن معیار
            </button>
            <button
              type="button"
              onClick={addOption}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              افزودن گزینه
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-right font-semibold text-slate-700">گزینه / معیار</th>
                {criteria.map((criterion) => (
                  <th key={criterion.id} className="px-4 py-3 text-right font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={criterion.name}
                        onChange={(e) => updateCriterion(criterion.id, { name: e.target.value })}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeCriterion(criterion.id)}
                        className="text-xs text-slate-500 hover:text-red-600"
                        aria-label="حذف معیار"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      <span>وزن</span>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={criterion.weight}
                        onChange={(e) => updateCriterion(criterion.id, { weight: Number(e.target.value) })}
                        className="w-20 rounded border border-slate-200 px-2 py-1"
                      />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold text-slate-700">امتیاز کل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {options.map((option) => (
                <tr key={option.id} className={bestScore === (totals.find((t) => t.optionId === option.id)?.value ?? 0) ? 'bg-indigo-50' : ''}>
                  <td className="px-4 py-3 align-top">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option.name}
                        onChange={(e) => updateOption(option.id, e.target.value)}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(option.id)}
                        className="text-xs text-slate-500 hover:text-red-600"
                        aria-label="حذف گزینه"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                  {criteria.map((criterion) => (
                    <td key={criterion.id} className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={scores[criterion.id]?.[option.id] ?? ''}
                        onChange={(e) => updateScore(criterion.id, option.id, Number(e.target.value))}
                        className="w-full rounded border border-slate-200 px-2 py-1 text-sm"
                        placeholder="نمره"
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                    {totals.find((t) => t.optionId === option.id)?.value ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="خلاصه نتایج" subtitle="امتیاز هر گزینه بر اساس وزن‌ها و نمرات فعلی">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => {
            const total = totals.find((t) => t.optionId === option.id)?.value ?? 0;
            const isBest = total === bestScore && totals.length > 1;
            return (
              <Card key={option.id} title={option.name}>
                <p className="mt-2 text-2xl font-bold text-slate-900">{total}</p>
                {isBest && <p className="text-sm font-semibold text-indigo-700">بهترین گزینه فعلی</p>}
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
