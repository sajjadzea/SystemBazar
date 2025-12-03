'use client';

import { useMemo, useState } from 'react';
import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { maturityQuestions } from './questions';

type AnswersState = Record<string, number>;

type MaturityLevel = {
  name: string;
  range: [number, number];
  description: string;
};

const levels: MaturityLevel[] = [
  { name: 'Level 1: Tribal / Ad-hoc', range: [0, 24], description: 'اتکا بر قهرمان‌های فردی، فرایندها غیررسمی و پیش‌بینی‌ناپذیر.' },
  { name: 'Level 2: Emerging Processes', range: [25, 49], description: 'چند فرایند تعریف شده است اما اجرا و پیگیری ناپایدار است.' },
  { name: 'Level 3: Systematic', range: [50, 74], description: 'فرایندها مستند، اندازه‌گیری و به شکل یکنواخت اجرا می‌شوند.' },
  { name: 'Level 4: Learning & Improving', range: [75, 100], description: 'تیم بهبود مستمر، یادگیری و خودکارسازی را به صورت منظم پیش می‌برد.' },
];

function initialAnswers(): AnswersState {
  return maturityQuestions.reduce<AnswersState>((acc, q) => {
    acc[q.id] = 3;
    return acc;
  }, {});
}

export default function SystemMaturityPage() {
  const [answers, setAnswers] = useState<AnswersState>(initialAnswers);
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    const total = maturityQuestions.reduce((sum, q) => sum + (answers[q.id] ?? 0), 0);
    const max = maturityQuestions.length * 5;
    return Math.round((total / max) * 100);
  }, [answers]);

  const level = useMemo(() => levels.find((l) => score >= l.range[0] && score <= l.range[1]), [score]);

  const handleChange = (id: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers(initialAnswers());
    setSubmitted(false);
  };

  return (
    <div className="space-y-8">
      <Section
        title="ارزیابی بلوغ سیستمی"
        subtitle="به ۲۰ سوال پاسخ دهید تا سطح بلوغ سازمان را بین Tribal تا Learning & Improving مشاهده کنید."
        actions={
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            شروع مجدد
          </button>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {maturityQuestions.map((question) => (
              <Card key={question.id} title={question.prompt}>
                <div className="mt-3 flex items-center gap-3 text-sm text-slate-700">
                  <label className="text-xs text-slate-500">۱ (ضعیف) تا ۵ (قوی)</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={answers[question.id] ?? 1}
                    onChange={(e) => handleChange(question.id, Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="w-8 text-center text-sm font-semibold text-indigo-700">{answers[question.id] ?? 1}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              محاسبه سطح بلوغ
            </button>
            <p className="text-xs text-slate-500">مقیاس ۱ تا ۵ است؛ مجموع به مقیاس ۰ تا ۱۰۰ تبدیل می‌شود.</p>
          </div>
        </form>
      </Section>

      {submitted && (
        <Section title="نتیجه ارزیابی">
          <div className="grid gap-4 md:grid-cols-3">
            <Card title="امتیاز کل">
              <p className="mt-2 text-3xl font-bold text-indigo-700">{score} / 100</p>
              <p className="text-sm text-slate-600">بر اساس پاسخ‌های شما</p>
            </Card>
            <Card title="سطح بلوغ">
              <p className="mt-2 text-xl font-semibold text-slate-900">{level?.name ?? 'نامشخص'}</p>
              <p className="text-sm text-slate-600">{level?.description ?? 'برای مشاهده سطح، پرسش‌ها را تکمیل کنید.'}</p>
            </Card>
            <Card title="پیشنهادهای بعدی">
              <p className="mt-2 text-sm text-slate-700">Suggested kits:</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Tag>risk-management</Tag>
                <Tag>data-governance</Tag>
                <Tag>team-productivity</Tag>
              </div>
              <p className="mt-3 text-xs text-slate-500">این پیشنهادها ثابت هستند و بعدا می‌توانند با منطق هوشمند جایگزین شوند.</p>
            </Card>
          </div>
        </Section>
      )}
    </div>
  );
}
