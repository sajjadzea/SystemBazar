'use client';

import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const heroHighlights = [
  'بازار System Kit با سناریوهای آمادهٔ اجرا.',
  'موج پنج: انسان + ماشین + سیستم، نه فقط ابزار.',
  'هر کیت = هدف، ساختار، سنجه، بازخورد و اقدام.',
];

const valueProps = [
  {
    title: 'تصمیم‌گیری بدون حدس',
    description: 'به جای گزارش‌های پراکنده، سیستم را با سنجه و بازخورد زنده می‌بینید.',
  },
  {
    title: 'اجرای سریع در موج پنج',
    description: 'کیت‌های آماده با چک‌لیست، الگو و اتوماسیون سبک برای تیم‌های ایرانی.',
  },
  {
    title: 'رشد قابل‌پیش‌بینی',
    description: 'حلقهٔ بازخورد و نقشهٔ بهبود شفاف تا بدانید کجا کند شده‌اید و چه باید کرد.',
  },
];

const waveReasons = [
  'داده و AI ارزان شده؛ مزیت در طراحی سیستم است، نه داشتن ابزار.',
  'سازمان‌ها دو پاره می‌شوند: تیم‌های سیستم‌دار در برابر تیم‌های درگیر آتش‌نشانی روزمره.',
  'بدون سنجه و حلقهٔ بازخورد، هیچ داشبوردی به تصمیم نمی‌رسد.',
  'زمان و تمرکز انسان کم شده؛ سیستم باید با کمترین اصطکاک کار کند.',
];

const whatIsSystemBazar = [
  'بازار System Kits: هر کیت یک بستهٔ کامل برای یک مسئلهٔ مشخص (هدف، ساختار، فرایند، سنجه، اقدام).',
  'Metrics Library: سنجه‌های انسانی، فنی و سیستمی با تعریف، دامنهٔ هدف و روش اندازه‌گیری.',
  'System Tools: ارزیابی بلوغ سیستمی، سازندهٔ OKR، ماتریس تصمیم و ابزارهای نقشه‌برداری.',
  'تفاوت با داشبورد و KPI Tool: ما فقط عدد نشان نمی‌دهیم؛ مسیر اجرا و بهبود را می‌دهیم.',
];

const personas = [
  {
    title: 'مدیر محصول و Growth Lead',
    pain: 'داده و گزارش زیاد است، اما تیم روی چند اقدام مشخص همسو نمی‌شود.',
    promise: 'یک کیت رشد با سنجهٔ واضح، حلقهٔ بازخورد و چک‌لیست اجرا برای اسپرینت بعدی.',
  },
  {
    title: 'مدیر میانی در سازمان داده‌محور',
    pain: 'تصمیم‌ها سلیقه‌ای است و همه از ابزارهای مختلف حرف می‌زنند.',
    promise: 'نقشهٔ سیستم + سنجه‌های مشترک + اکشن‌های هماهنگ تا گفتگو از گزارش به تصمیم برسد.',
  },
  {
    title: 'مشاور سیستم و دیتا',
    pain: 'وقت برای تولید از صفر ندارید و مشتری تحویل عملی می‌خواهد، نه تئوری.',
    promise: 'System Kit آماده با Artefact فارسی، نمونه داشبورد و مسیر بهبود برای ارائهٔ سریع.',
  },
];

const steps = [
  {
    title: 'شناسایی نوع سیستم',
    description: 'انسانی، اقتصادی، انسان–ماشین یا سایبر–فیزیکی؛ کیت متناسب با بافت انتخاب می‌شود.',
  },
  {
    title: 'انتخاب کیت مناسب',
    description: 'کیت با هدف، ساختار، فرایند، سنجه و بازخورد در اختیار تیم قرار می‌گیرد.',
  },
  {
    title: 'اجرا، سنجه، تکرار',
    description: 'اکشن‌ها را اجرا می‌کنید، سنجهٔ زنده می‌بینید و چرخهٔ بهبود را می‌بندید.',
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
    title: 'System Kit آماده',
    description: 'مثلاً «مدیریت ریسک پروژه»: هدف، ساختار جلسات، فرایند هشدار و اقدام، سنجهٔ کنترل ریسک.',
    badge: 'نمونه کیت',
  },
  {
    title: 'Metric با دامنهٔ هدف',
    description: 'تعریف Metric، دامنهٔ مطلوب، سیگنال خطر و روش جمع‌آوری داده برای تیم محصول.',
    badge: 'نمونه سنجه',
  },
  {
    title: 'Snapshot داشبورد',
    description: 'یک نمای ساده از وضعیت سیستم + توصیهٔ بعدی تا جلسهٔ بعدی تصمیم شفاف باشد.',
    badge: 'نمونه گزارش',
  },
];

const systemMap = [
  'دسته‌بندی بر اساس نوع سیستم: انسانی، اقتصادی، انسان–ماشین، سایبر–فیزیکی، پیچیده‌سازگار.',
  'سطح‌بندی بر اساس مقیاس: خرد (تیم)، میانی (واحد)، کلان (سازمان/شبکه).',
  'هر کیت دقیقاً می‌گوید برای کدام نوع و مقیاس طراحی شده و چه سنجه‌ای را پایش می‌کند.',
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
                systembazar | بازار کیت‌های سیستم‌سازی در موج پنجم
              </p>
              <h1 id="hero-title" className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                سیستم بساز، نه فقط داشبورد.
              </h1>
              <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                systembazar بازار System Kit، Metric و Tool است تا تیم‌های ایرانی در عصر طغیان داده‌ها از حدس و گزارش‌زدگی عبور کنند و یک سیستم زنده، قابل‌مشاهده و قابل‌اندازه‌گیری بسازند.
              </p>
              <p className="text-sm leading-relaxed text-slate-300">
                مخاطب ما: مدیران محصول، Growth Leadها و مشاوران سیستم که می‌خواهند تصمیم را از «حس» به «سیستم» تبدیل کنند.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
                >
                  شروع ارزیابی سیستم
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
                <p>نگاشت سیستم موج پنج</p>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">Net Visual</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-100">
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">هدف</p>
                  <p className="text-base font-semibold text-white">نتیجهٔ قابل‌مشاهده برای تیم</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">ساختار و فرایند</p>
                  <p className="text-base font-semibold text-white">کیت آماده + نقش‌ها + اتوماسیون سبک</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">بازخورد</p>
                  <p className="text-base font-semibold text-white">سیگنال خطر + حلقهٔ یادگیری</p>
                </div>
                <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                  <p className="text-xs text-slate-400">سنجه و اقدام</p>
                  <p className="text-base font-semibold text-white">Metric + توصیهٔ بعدی</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="wave" className="bg-surface/90 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-right">
            <p className="text-sm font-semibold text-accent">چرا در موج پنجم، سیستم حرف اول را می‌زند؟</p>
            <h2 className="text-3xl font-bold text-white">عصر طغیان داده‌ها با سیستم کنترل می‌شود، نه ابزار</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              AI و ابزار برای همه در دسترس شده‌اند. در موج پنج، تیمی می‌برد که بتواند داده، انسان و فرایند را در یک سیستم زنده بچیند تا تصمیم‌ها از «حس» به «واقعیت اندازه‌گیری‌شده» تبدیل شود.
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              {waveReasons.map((item) => (
                <li key={item} className={listMarker}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="what-is" className="bg-background py-14 shadow-[0_-1px_0_rgba(255,255,255,0.04)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">systembazar دقیقاً چیست؟</p>
            <h2 className="text-3xl font-bold text-white">بازار System Kits + Metrics + Tools</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              systembazar نرم‌افزار حسابداری یا ERP نیست؛ ما یک بازار کیت‌های سیستم‌سازی هستیم تا تیم‌ها در موج پنج، سیستم را طراحی، اجرا و پایش کنند.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {whatIsSystemBazar.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800/80 bg-black/30 p-4 text-sm text-slate-200 shadow-inner">
                <span className={listMarker}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="value" className="bg-surface/80 py-14">
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

      <section id="personas" className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">برای چه کسانی است؟</p>
            <h2 className="text-3xl font-bold text-white">مدیران و مشاورانی که سیستم می‌خواهند، نه ابزار</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {personas.map((persona) => (
              <div key={persona.title} className="flex flex-col gap-4 rounded-3xl border border-slate-800/80 bg-surface/80 p-6 shadow-glass">
                <div className="space-y-1 text-right">
                  <h3 className="text-lg font-semibold text-accent-soft">{persona.title}</h3>
                  <p className="text-xs uppercase tracking-[0.12em] text-accent/70">Pain → Promise</p>
                </div>
                <div className="space-y-3 text-sm text-slate-200">
                  <p className="rounded-2xl bg-black/30 p-3 leading-relaxed">{persona.pain}</p>
                  <p className="rounded-2xl border border-accent/30 bg-accent/5 p-3 leading-relaxed text-accent-soft">{persona.promise}</p>
                </div>
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
              شروع ارزیابی سیستم
            </button>
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

      <section id="system-map" className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">نقشهٔ سیستم‌ها در systembazar</p>
            <h2 className="text-3xl font-bold text-white">هر کیت دقیقاً برای کدام سیستم طراحی شده است</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              برای هر System Kit، نوع سیستم، مقیاس و سنجه‌های کنترل مشخص است تا بدانید دقیقاً کجا و چگونه باید اجرا شود.
            </p>
          </div>
          <ul className="grid gap-3 md:grid-cols-3">
            {systemMap.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-800/80 bg-surface/80 p-4 text-sm leading-relaxed text-slate-200 shadow-inner">
                <span className={listMarker}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="final-cta" className="relative overflow-hidden bg-gradient-to-l from-surface/70 via-background to-background py-14">
        <div className="absolute inset-y-0 right-20 hidden h-full w-64 rotate-6 bg-accent/5 blur-3xl lg:block" aria-hidden />
        <div className="absolute inset-y-0 left-20 hidden h-full w-64 -rotate-6 bg-accent-soft/5 blur-3xl lg:block" aria-hidden />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-right sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">در موج پنج، مزیت رقابتی = سیستم زنده، نه ابزار بیشتر.</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            اگر می‌خواهید به‌جای آتش‌نشانی روزمره، سیستم‌های آرام و قابل‌پیش‌بینی بسازید، از همین‌جا شروع کنید. systembazar به شما کیت، سنجه و ابزار می‌دهد تا تصمیم‌ها سریع و شفاف شوند.
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
