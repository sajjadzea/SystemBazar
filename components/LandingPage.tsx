'use client';

import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const heroHighlights = [
  'تمام اجزای UI راست‌چین و فارسی هستند.',
  'پس‌زمینهٔ تیره با گرادیان ملایم برای کنتراست بهتر.',
  'افکت Vanta.NET برای حس شبکه و سیستم زنده.',
];

const valueProps = [
  {
    title: 'تصمیم‌گیری بدون حدس',
    description: 'سنجه‌های استاندارد و داشبوردهای ساده، به‌جای گزارش‌های پراکنده و حدس و گمان.',
  },
  {
    title: 'اجرای سریع و منظم',
    description: 'کیت‌های آماده با چک‌لیست، الگوها و فرایندهای عملی برای فروش، محتوا، پشتیبانی و عملیات.',
  },
  {
    title: 'رشد قابل‌پیش‌بینی',
    description: 'با حلقه‌های بازخورد، می‌بینید کجا سیستم کند شده و چطور می‌شود دوباره به رشد برگشت.',
  },
];

const steps = [
  {
    title: 'ارزیابی سریع سیستم',
    description: 'با چند سؤال، وضعیت کنونی سیستم‌تان را می‌سنجید.',
  },
  {
    title: 'انتخاب کیت مناسب',
    description: 'کیت و سنجه‌های مناسب را برای تیم و مسئله‌ی خود انتخاب می‌کنید.',
  },
  {
    title: 'اجرا، بازخورد، تکرار',
    description: 'اقدام‌ها را اجرا می‌کنید، سنجه‌ها را می‌بینید و در چرخه‌ی بهبود می‌چرخید.',
  },
];

const pillars = [
  {
    title: 'کیت‌ها',
    description: 'بسته‌های آماده برای طراحی و اجرای سیستم در موضوعاتی مثل مدیریت ریسک، حاکمیت داده، بهره‌وری تیم محصول.',
    href: '/kits',
  },
  {
    title: 'سنجه‌ها',
    description: 'کتابخانه‌ی سنجه‌های انسانی، فنی و سیستمی با تعریف، دامنه‌ی هدف و نحوه‌ی اندازه‌گیری.',
    href: '/metrics',
  },
  {
    title: 'ابزارها',
    description: 'ابزارهایی مثل ارزیابی بلوغ سیستمی، سازنده‌ی OKR و ماتریس تصمیم برای کمک به انتخاب‌های بهتر.',
    href: '/tools',
  },
];

const outputs = [
  {
    title: 'چک‌لیست عملیاتی',
    description: 'یک چک‌لیست سادهٔ فارسی که دقیقاً می‌گوید امروز چه اقدام‌هایی را انجام دهید.',
    badge: 'نمونه کیت',
  },
  {
    title: 'سنجهٔ حیاتی',
    description: 'تعریف سنجه، دامنهٔ هدف و نحوهٔ اندازه‌گیری تا تیم بداند چه چیزی مهم است.',
    badge: 'نمونه سنجه',
  },
  {
    title: 'نمای داشبورد',
    description: 'اسنپ‌شات داشبورد با وضعیت لحظه‌ای و توصیهٔ بعدی برای حفظ رشد پایدار.',
    badge: 'نمونه گزارش',
  },
];

const waveBullets = [
  'داده به‌تنهایی کافی نیست؛ باید در ساختار و فرایند قرار بگیرد.',
  'سیستم‌های بدون سنجه، قابل‌کنترل نیستند.',
  'موج پنج یعنی انسان + ماشین + سیستم، نه فقط تکنولوژی.',
];

const listMarker = 'relative pr-4 before:absolute before:right-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent';

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const vantaInstance = useRef<any>(null);

  useEffect(() => {
    if (!vantaInstance.current && heroRef.current) {
      vantaInstance.current = NET({
        el: heroRef.current,
        THREE,
        color: 0x0bd1c5,
        backgroundColor: 0x050816,
        points: 16.0,
        maxDistance: 22.0,
        spacing: 18.0,
      });
    }

    return () => {
      if (vantaInstance.current) vantaInstance.current.destroy();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20" aria-labelledby="hero-title">
        <div ref={heroRef} className="absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/80 to-background" />
        <div className="absolute -left-20 top-24 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden />
        <div className="absolute -right-24 bottom-10 h-48 w-48 rounded-full bg-accent-soft/10 blur-3xl" aria-hidden />

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-5 text-right lg:max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/5 px-4 py-2 text-xs text-accent shadow-glass">
                سیستم‌بازار | بازار کیت‌ها، سنجه‌ها و ابزارهای سیستم‌سازی
              </p>
              <h1 id="hero-title" className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                سیستمت را بساز؛ آینده را پیش‌بینی کن.
              </h1>
              <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                systembazar مجموعه‌ای از کیت‌ها، سنجه‌ها و ابزارهای هوشمند است تا تیم‌ها در عصر طغیان داده‌ها سریع‌تر تصمیم بگیرند، رفتار سیستم‌هایشان را ببینند و رشد قابل‌پیش‌بینی بسازند.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
                >
                  شروع ارزیابی رایگان
                </button>
                <button
                  onClick={() => scrollTo('kits')}
                  className="rounded-full border border-accent/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent/10"
                >
                  دیدن کیت‌ها
                </button>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                {heroHighlights.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-xl rounded-3xl border border-accent/20 bg-surface/70 p-6 shadow-glass backdrop-blur">
              <div className="flex items-center justify-between text-sm text-slate-200">
                <p>نگاشت سیستم</p>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">Net Visual</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-100">
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">ورودی</p>
                  <p className="text-base font-semibold text-white">داده، سرنخ، مشتری</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">فرایند</p>
                  <p className="text-base font-semibold text-white">کیت‌های آماده + اتوماسیون</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">خروجی</p>
                  <p className="text-base font-semibold text-white">تجربه پایدار + رشد</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">سنجه و اقدام</p>
                  <p className="text-base font-semibold text-white">داشبورد، تصمیم، تکرار</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="value" className="bg-surface/80 py-14 shadow-[0_-1px_0_rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">چرا systembazar؟</p>
            <h2 className="text-3xl font-bold text-white">از حدس‌زدن تا تصمیم‌گیری شفاف</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {valueProps.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-800/80 bg-black/30 p-6 shadow-glass backdrop-blur">
                <h3 className="text-lg font-semibold text-accent-soft">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">systembazar چطور کار می‌کند؟</p>
            <h2 className="text-3xl font-bold text-white">سه گام تا سیستم زنده</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-3xl border border-accent/25 bg-surface/80 p-6 shadow-glass">
                <span className="absolute -top-3 left-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 text-lg font-bold text-accent">
                  {index + 1}
                </span>
                <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-200">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => scrollTo('final-cta')}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
            >
              شروع ارزیابی رایگان
            </button>
          </div>
        </div>
      </section>

      <section id="wave" className="bg-surface/90 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-right">
            <p className="text-sm font-semibold text-accent">چرا موج پنجم مهم است؟</p>
            <h2 className="text-3xl font-bold text-white">چرا در موج پنجم، سیستم حرف اول را می‌زند؟</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              در عصر هوش مصنوعی و طغیان داده‌ها، داشتن ابزار کافی نیست. تیمی برنده است که بتواند داده، انسان و فرایند را در قالب یک سیستم زنده و یادگیرنده کنار هم بنشاند. systembazar با کیت‌ها و سنجه‌های موج پنج، این سیستم‌ها را برای شما قابل‌طراحی و قابل‌اجرا می‌کند.
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              {waveBullets.map((item) => (
                <li key={item} className={listMarker}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="kits" className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">سه ستون systembazar</p>
            <h2 className="text-3xl font-bold text-white">کیت‌ها + سنجه‌ها + ابزارها</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="flex flex-col justify-between rounded-3xl border border-slate-800/80 bg-surface/80 p-6 shadow-glass">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-accent-soft">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-200">{pillar.description}</p>
                </div>
                <a
                  href={pillar.href}
                  className="mt-6 inline-flex w-fit items-center justify-center rounded-full border border-accent/40 px-4 py-2 text-xs font-semibold text-accent transition hover:border-accent hover:bg-accent/10"
                >
                  دیدن بیشتر
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="outputs" className="bg-surface/80 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">نمونه خروجی</p>
            <h2 className="text-3xl font-bold text-white">خروجی‌های واقعی systembazar چه شکلی‌اند؟</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {outputs.map((output) => (
              <div key={output.title} className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/50 via-surface to-surface/80 p-6 shadow-glass">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{output.title}</span>
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">{output.badge}</span>
                </div>
                <div className="mb-4 h-32 rounded-2xl border border-dashed border-accent/30 bg-black/30" aria-hidden />
                <p className="text-sm leading-relaxed text-slate-200">{output.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="relative overflow-hidden bg-gradient-to-l from-surface/70 via-background to-background py-14">
        <div className="absolute inset-y-0 right-20 hidden h-full w-64 rotate-6 bg-accent/5 blur-3xl lg:block" aria-hidden />
        <div className="absolute inset-y-0 left-20 hidden h-full w-64 -rotate-6 bg-accent-soft/5 blur-3xl lg:block" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-right sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">اگر می‌خواهید سیستم‌های آرام و قابل‌پیش‌بینی بسازید، از همین‌جا شروع کنید.</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            در موج پنجم، تیمی می‌برد که بتواند داده، انسان و فرایند را روی یک بوم سیستم زنده به حرکت درآورد. systembazar کنار شماست تا این بوم را سریع بسازید، بسنجید و بهبود دهید.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('how-it-works')}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
            >
              شروع ارزیابی رایگان
            </button>
            <button
              onClick={() => scrollTo('kits')}
              className="rounded-full border border-accent/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent/10"
            >
              گشت‌وگذار در کیت‌ها
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
