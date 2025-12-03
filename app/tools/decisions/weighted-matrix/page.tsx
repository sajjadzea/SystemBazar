import ToolLayout from '@/components/tool/ToolLayout';
import { getToolBySlug } from '@/lib/content';
import React from 'react';

type Criterion = { id: string; name: string; weight: number };
type Option = { id: string; name: string; scores: Record<string, number> };

function WeightedMatrixTool() {
  'use client';

  const [criteria, setCriteria] = React.useState<Criterion[]>([
    { id: 'impact', name: 'اثر', weight: 40 },
    { id: 'effort', name: 'هزینه/تلاش', weight: 30 },
    { id: 'risk', name: 'ریسک', weight: 30 },
  ]);
  const [options, setOptions] = React.useState<Option[]>([
    { id: 'option-1', name: 'گزینه ۱', scores: { impact: 4, effort: 3, risk: 4 } },
    { id: 'option-2', name: 'گزینه ۲', scores: { impact: 3, effort: 4, risk: 2 } },
  ]);

  const totalWeight = criteria.reduce((sum, c) => sum + (Number.isFinite(c.weight) ? c.weight : 0), 0) || 1;

  const updateWeight = (id: string, weight: number) => {
    setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, weight } : c)));
  };

  const updateScore = (optionId: string, criterionId: string, score: number) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === optionId ? { ...opt, scores: { ...opt.scores, [criterionId]: score } } : opt,
      ),
    );
  };

  const addCriterion = () => {
    const id = `c-${Date.now()}`;
    setCriteria((prev) => [...prev, { id, name: `معیار جدید ${prev.length + 1}`, weight: 10 }]);
    setOptions((prev) => prev.map((opt) => ({ ...opt, scores: { ...opt.scores, [id]: 3 } })));
  };

  const addOption = () => {
    const id = `o-${Date.now()}`;
    setOptions((prev) => [...prev, { id, name: `گزینه جدید ${prev.length + 1}`, scores: {} }]);
  };

  const removeOption = (id: string) => {
    setOptions((prev) => prev.filter((o) => o.id !== id));
  };

  const removeCriterion = (id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
    setOptions((prev) => prev.map((opt) => {
      const { [id]: _remove, ...rest } = opt.scores;
      return { ...opt, scores: rest };
    }));
  };

  const scores = options.map((opt) => {
    const total = criteria.reduce((sum, criterion) => {
      const weightFactor = criterion.weight / totalWeight;
      const score = opt.scores[criterion.id] ?? 0;
      return sum + weightFactor * score;
    }, 0);
    return { option: opt, total: Number(total.toFixed(2)) };
  });

  const best = scores.reduce((top, current) => (current.total > top.total ? current : top), scores[0]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 text-sm">
        <button className="rounded-md bg-indigo-600 px-3 py-2 font-semibold text-white" onClick={addOption}>
          افزودن گزینه
        </button>
        <button className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-800" onClick={addCriterion}>
          افزودن معیار
        </button>
      </div>

      <div className="overflow-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-right">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-sm font-semibold text-slate-900">گزینه / معیار</th>
              {criteria.map((criterion) => (
                <th key={criterion.id} className="px-3 py-2 text-sm font-semibold text-slate-900">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      value={criterion.name}
                      onChange={(e) => setCriteria((prev) => prev.map((c) => (c.id === criterion.id ? { ...c, name: e.target.value } : c)))}
                      className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-sm"
                    />
                    <button className="text-xs text-rose-600" onClick={() => removeCriterion(criterion.id)}>
                      حذف
                    </button>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
                    وزن (%)
                    <input
                      type="number"
                      value={criterion.weight}
                      onChange={(e) => updateWeight(criterion.id, Number(e.target.value))}
                      className="w-20 rounded border border-slate-200 bg-white px-2 py-1 text-xs"
                    />
                  </div>
                </th>
              ))}
              <th className="px-3 py-2 text-sm font-semibold text-slate-900">امتیاز کل</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {options.map((option) => (
              <tr key={option.id}>
                <td className="whitespace-nowrap px-3 py-2 text-sm font-medium text-slate-900">
                  <input
                    value={option.name}
                    onChange={(e) => setOptions((prev) => prev.map((o) => (o.id === option.id ? { ...o, name: e.target.value } : o)))}
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-sm"
                  />
                </td>
                {criteria.map((criterion) => (
                  <td key={criterion.id} className="px-3 py-2">
                    <input
                      type="number"
                      min={0}
                      max={5}
                      value={option.scores[criterion.id] ?? 0}
                      onChange={(e) => updateScore(option.id, criterion.id, Number(e.target.value))}
                      className="w-20 rounded border border-slate-200 bg-white px-2 py-1 text-sm"
                    />
                  </td>
                ))}
                <td className="px-3 py-2 text-sm font-semibold text-slate-900">{scores.find((s) => s.option.id === option.id)?.total}</td>
                <td className="px-3 py-2 text-xs">
                  <button className="text-rose-600" onClick={() => removeOption(option.id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {best ? (
        <div className="rounded-lg border border-green-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-green-700">بهترین گزینه فعلی</p>
          <p className="text-lg font-bold text-slate-900">{best.option.name}</p>
          <p className="text-sm text-slate-700">امتیاز: {best.total}</p>
          <p className="text-xs text-slate-500">مجموع وزن‌ها: {totalWeight}</p>
        </div>
      ) : null}
    </div>
  );
}

export default async function WeightedMatrixPage() {
  const { meta } = await getToolBySlug('weighted-matrix');
  return (
    <ToolLayout meta={meta}>
      <WeightedMatrixTool />
    </ToolLayout>
  );
}
