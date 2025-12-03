import ToolLayout from '@/components/tool/ToolLayout';
import { getToolBySlug } from '@/lib/content';
import React from 'react';

const MATURITY_QUESTIONS = [
  'اهداف سیستم مکتوب و شفاف هستند.',
  'مالکیت فرایندها مشخص و مستند است.',
  'شاخص‌های عملکرد کلیدی (KPI) برای نتایج تعریف شده‌اند.',
  'حلقه‌های بازخورد دوره‌ای برای یادگیری وجود دارد.',
  'آزمون سناریو یا مانور بحران برگزار می‌شود.',
  'داده‌ها برای تصمیم‌گیری در دسترس و قابل اعتماد هستند.',
  'مدل‌های ذهنی مشترک بین تیم‌ها ساخته شده است.',
  'وابستگی‌ها و ریسک‌های کلیدی شناسایی شده‌اند.',
  'الگوهای خطا ثبت و مرور می‌شوند.',
  'تصمیم‌ها مستند و قابل ردیابی هستند.',
  'مسیرهای جایگزین یا افزونگی برای خدمات حیاتی وجود دارد.',
  'فرهنگ به اشتراک‌گذاری دانش تشویق می‌شود.',
  'پایش سلامت سیستم به صورت مداوم انجام می‌شود.',
  'تعامل با ذی‌نفعان به صورت ساختارمند انجام می‌شود.',
  'بهبود مستمر در چرخه‌های کوتاه برنامه‌ریزی می‌شود.',
  'تجربه کاربر یا مشتری به صورت منظم سنجیده می‌شود.',
  'تیم‌ها اختیار تصمیم‌گیری در سطح مناسب دارند.',
  'سیستم مدیریت تغییر و انتشار تعریف شده است.',
  'سطوح خدمت یا SLA مشخص و پایش می‌شوند.',
  'ابزارها و مستندات به‌روز هستند.',
];

function SystemMaturityTool() {
  'use client';

  const [answers, setAnswers] = React.useState<Record<number, number>>({});

  const updateAnswer = (index: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const totalScore = React.useMemo(() => {
    const values = MATURITY_QUESTIONS.map((_, idx) => answers[idx] ?? 0);
    const normalized = values.reduce((sum, val) => sum + val, 0) / (MATURITY_QUESTIONS.length * 5);
    return Math.round(normalized * 100);
  }, [answers]);

  const level = React.useMemo(() => {
    if (totalScore < 25) return { title: 'سطح ۱: قبیله‌ای / آتش‌نشانی', desc: 'کارها واکنشی انجام می‌شود و ساختار مشخصی وجود ندارد.' };
    if (totalScore < 50) return { title: 'سطح ۲: فرایندهای نوپا', desc: 'پاره‌ای از فرایندها تعریف شده‌اند اما پایش و بهبود منظم نیست.' };
    if (totalScore < 75) return { title: 'سطح ۳: سیستماتیک', desc: 'اهداف، فرایند و سنجه‌ها وجود دارند و بهبود تکرارشونده انجام می‌شود.' };
    return { title: 'سطح ۴: یادگیرنده', desc: 'یادگیری مستمر، آزمایش و بهبود ساختاری در جریان است.' };
  }, [totalScore]);

  const suggestedKits = ['risk-management', 'data-governance', 'team-productivity'];

  return (
    <div className="space-y-6">
      <form className="space-y-4">
        {MATURITY_QUESTIONS.map((q, index) => (
          <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-900">{q}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-700">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1">
                  <input
                    type="radio"
                    name={`q-${index}`}
                    value={value}
                    checked={answers[index] === value}
                    onChange={() => updateAnswer(index, value)}
                  />
                  {value}
                </label>
              ))}
              <span className="text-slate-500">۱ = اصلاً برقرار نیست ، ۵ = کاملاً برقرار است</span>
            </div>
          </div>
        ))}
      </form>

      <div className="rounded-lg border border-indigo-100 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-indigo-700">امتیاز بلوغ</p>
        <p className="text-3xl font-bold text-slate-900">{totalScore} / 100</p>
        <p className="mt-2 text-lg font-semibold text-slate-900">{level.title}</p>
        <p className="text-sm text-slate-700">{level.desc}</p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-900">کیت‌های پیشنهادی برای ارتقا</p>
        <ul className="mt-2 list-disc space-y-1 pr-6 text-sm text-slate-700">
          {suggestedKits.map((kit) => (
            <li key={kit}>{kit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default async function SystemMaturityPage() {
  const { meta } = await getToolBySlug('system-maturity');
  return (
    <ToolLayout meta={meta}>
      <SystemMaturityTool />
    </ToolLayout>
  );
}
