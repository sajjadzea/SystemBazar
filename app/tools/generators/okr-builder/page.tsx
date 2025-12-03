import ToolLayout from '@/components/tool/ToolLayout';
import { getToolBySlug } from '@/lib/content';
import React from 'react';

interface GeneratedOKR {
  objective: string;
  keyResults: string[];
}

const templates: Record<string, GeneratedOKR[]> = {
  'sales-company': [
    {
      objective: 'افزایش رشد پایدار فروش سازمان',
      keyResults: [
        'افزایش نرخ تبدیل سرنخ به مشتری به اندازه ۱۵٪',
        'کاهش چرخه فروش متوسط از ۴۵ روز به ۳۰ روز',
        'ایجاد دو کانال فروش جدید با بازدهی مشخص',
      ],
    },
  ],
  'product-team': [
    {
      objective: 'تحویل مستمر ارزش محصول با کیفیت بالا',
      keyResults: [
        'افزایش رضایت کاربر (CSAT) به بالای ۴.۵',
        'کاهش زمان چرخه تحویل فیچر به زیر دو هفته',
        'بهبود نرخ حفظ کاربر ۱۰٪ نسبت به سه‌ماهه قبل',
      ],
    },
  ],
  'operations-team': [
    {
      objective: 'پایداری و بهره‌وری عملیات',
      keyResults: [
        'کاهش حوادث با شدت بالا ۲۰٪',
        'کاهش زمان رفع حادثه متوسط به زیر ۳۰ دقیقه',
        'افزایش اتوماسیون کارهای تکراری به ۳۰٪',
      ],
    },
  ],
};

function buildKey(domain: string, level: string) {
  return `${domain}-${level}`;
}

function OKRBuilderTool() {
  'use client';

  const [domain, setDomain] = React.useState('product');
  const [level, setLevel] = React.useState('team');
  const [goal, setGoal] = React.useState('بهبود تجربه مشتری در محصول اصلی');
  const [results, setResults] = React.useState<GeneratedOKR[]>([]);

  const generate = () => {
    const key = buildKey(domain, level);
    const preset = templates[key] ?? [
      {
        objective: `پیشبرد ${goal} در حوزه ${domain}`,
        keyResults: [
          'تعریف ۳ شاخص موفقیت قابل اندازه‌گیری',
          'راه‌اندازی یک داشبورد پیگیری پیشرفت',
          'برگزاری بازبینی دو هفته‌ای برای هم‌ترازی',
        ],
      },
    ];

    const adapted = preset.map((item) => ({
      objective: `${item.objective} (${goal})`,
      keyResults: item.keyResults.map((kr) => kr.replace('هدف', goal)),
    }));

    setResults(adapted);
  };

  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-800">دامنه</label>
          <select
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          >
            <option value="sales">فروش</option>
            <option value="marketing">بازاریابی</option>
            <option value="operations">عملیات</option>
            <option value="product">محصول</option>
            <option value="hr">منابع انسانی</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-800">سطح</label>
          <select
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="company">شرکت</option>
            <option value="team">تیم</option>
            <option value="individual">فردی</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-800">هدف کوتاه</label>
          <input
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="مثلاً افزایش رضایت مشتری"
          />
        </div>
      </div>
      <button className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white" onClick={generate}>
        تولید OKR
      </button>

      <div className="space-y-4">
        {results.map((item, idx) => (
          <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-2">
              <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-indigo-700">O{idx + 1}</span>
              <textarea
                className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                value={item.objective}
                onChange={(e) =>
                  setResults((prev) =>
                    prev.map((r, i) => (i === idx ? { ...r, objective: e.target.value } : r)),
                  )
                }
              />
            </div>
            <div className="mt-3 space-y-2">
              {item.keyResults.map((kr, krIdx) => (
                <div key={krIdx} className="flex items-start gap-2">
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">KR{krIdx + 1}</span>
                  <textarea
                    className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                    value={kr}
                    onChange={(e) =>
                      setResults((prev) =>
                        prev.map((r, i) =>
                          i === idx
                            ? { ...r, keyResults: r.keyResults.map((k, j) => (j === krIdx ? e.target.value : k)) }
                            : r,
                        ),
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function OKRBuilderPage() {
  const { meta } = await getToolBySlug('okr-builder');
  return (
    <ToolLayout meta={meta}>
      <OKRBuilderTool />
    </ToolLayout>
  );
}
