'use client';

import React, { useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const heroHighlights = [
  'بازار بسته‌های سیستم‌سازی با سناریوی آمادهٔ اجرا.',
  'موج پنج: انسان + ماشین + سیستم، نه فقط ابزار.',
  'هر بسته سیستم = هدف، ساختار، سنجه، بازخورد و اقدام.',
];

const valueProps = [
  {
    title: 'تصمیم‌گیری بدون حدس',
    description: 'به جای گزارش‌های پراکنده، سیستم را با سنجه و بازخورد زنده می‌بینید.',
  },
  {
    title: 'اجرای سریع در موج پنج',
    description: 'بسته‌های سیستم آماده با چک‌لیست، سنجه روشن و اتوماسیون سبک برای تیم‌های ایرانی.',
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
  'بازار بسته سیستم‌سازی (System Pack): هر بسته سیستم برای یک مسئله مشخص، نقشه، سنجه و اقدام را کنار هم می‌دهد.',
  'Metrics Library: سنجه‌های انسانی، فنی و سیستمی با تعریف، دامنهٔ هدف و روش اندازه‌گیری شفاف.',
  'System Tools: ارزیابی بلوغ سیستمی، سازندهٔ OKR، ماتریس تصمیم و ابزارهای نقشه‌برداری برای دیدن جریان‌ها.',
  'تفاوت با داشبورد و KPI Tool: فقط عدد نمی‌بینید؛ مسیر اجرا، اندازه‌گیری و بهبود مستمر می‌گیرید.',
];

const personas = [
  {
    title: 'مدیر محصول و Growth Lead',
    pain: 'داده و گزارش زیاد است، اما تیم روی چند اقدام مشخص همسو نمی‌شود.',
    promise: 'یک بسته سیستم رشد با سنجهٔ واضح، حلقهٔ بازخورد و چک‌لیست اجرا برای اسپرینت بعدی.',
  },
  {
    title: 'مدیر میانی در سازمان داده‌محور',
    pain: 'تصمیم‌ها سلیقه‌ای است و همه از ابزارهای مختلف حرف می‌زنند.',
    promise: 'نقشهٔ سیستم + سنجه‌های مشترک + اکشن‌های هماهنگ تا گفتگو از گزارش به تصمیم برسد.',
  },
  {
    title: 'مشاور سیستم و دیتا',
    pain: 'وقت برای تولید از صفر ندارید و مشتری تحویل عملی می‌خواهد، نه تئوری.',
    promise: 'بسته سیستم آماده با Artefact فارسی، نمونه داشبورد و مسیر بهبود برای تحویل سریع.',
  },
];

const steps = [
  {
    title: 'شناسایی نوع سیستم',
    description: 'انسانی، اقتصادی، انسان–ماشین یا سایبر–فیزیکی؛ بسته متناسب با بافت انتخاب می‌شود.',
  },
  {
    title: 'انتخاب بسته سیستم',
    description: 'بسته سیستم با هدف، ساختار، فرایند، سنجه و بازخورد در اختیار تیم‌تان قرار می‌گیرد.',
  },
  {
    title: 'اجرا، اندازه‌گیری، تکرار',
    description: 'اکشن‌ها را اجرا می‌کنید، سنجهٔ زنده می‌بینید و چرخهٔ بهبود و یادگیری را تکرار می‌کنید.',
  },
];

const measurementQuotes = [
  { text: 'What gets measured gets managed.', name: 'Peter Drucker' },
  {
    text: 'The most important numbers for management are unknown or unknowable, yet good managers still act on them.',
    name: 'W. Edwards Deming',
  },
  {
    text: 'You can’t control a system, but you can redesign information and incentives so the system changes its own behavior.',
    name: 'Donella Meadows',
  },
  {
    text: 'Balanced Scorecard turns strategy into a daily language that people can see, measure, and improve.',
    name: 'Robert Kaplan',
  },
];

const pillars = [
  {
    title: 'بسته‌های سیستم‌سازی',
    description:
      'برای هر مسئله مدیریتی، یک بسته سیستم می‌گیرید: نقشه سیستم، نقش‌ها و مسیر اقدام. به‌جای شروع از صفر، از یک مدل تست‌شده شروع می‌کنید.',
    href: '/kits',
    cta: 'دیدن نمونه بسته‌ها',
  },
  {
    title: 'سنجه‌ها و شاخص‌ها',
    description:
      'کتابخانه‌ای از سنجه‌های انسانی، فنی و سیستمی؛ کمک می‌کند KPIهای واقعی بسازید و از متریک‌های فانتزی (Vanity) فاصله بگیرید.',
    href: '/metrics',
    cta: 'دیدن مثال سنجه‌ها',
  },
  {
    title: 'ابزارهای اندازه‌گیری و تصمیم',
    description:
      'ابزارهایی مثل ارزیابی بلوغ سیستمی، ماتریس‌های ریسک و OKR Board؛ تا سنجه‌ها فقط روی اسلاید نمانند و وارد تصمیم‌های روزانه شوند.',
    href: '/tools',
    cta: 'دیدن ابزارهای ارزیابی',
  },
];

const outputs = [
  {
    title: 'نقشهٔ سیستم',
    description:
      'سیستم را روی یک صفحه می‌بینید؛ حلقه‌ها، گره‌ها و عوامل اصلی. این نقشه می‌شود زبان مشترک جلسه بعدی شما.',
    badge: 'زبان مشترک',
  },
  {
    title: 'برد سنجه‌ها',
    description:
      'لیستی شفاف از سنجه‌های مهم، با تعریف، هدف و منبع داده. می‌دانید چه چیزی را باید اندازه بگیرید و چه چیزهایی فقط سر و صدا هستند.',
    badge: 'تعریف سنجه',
  },
  {
    title: 'چرخهٔ بازخورد و یادگیری',
    description:
      'برنامه‌ای ساده برای مرور دوره‌ای داده‌ها و تصمیم‌ها؛ تا سیستم‌تان هر ماه کمی بهتر شود، نه فقط گزارش‌ها بیشتر شوند.',
    badge: 'بهبود مستمر',
  },
];

const systemMap = [
  'دسته‌بندی بر اساس نوع سیستم: انسانی، اقتصادی، انسان–ماشین، سایبر–فیزیکی، پیچیده‌سازگار.',
  'سطح‌بندی بر اساس مقیاس: خرد (تیم)، میانی (واحد)، کلان (سازمان/شبکه).',
  'هر بسته سیستم دقیقاً می‌گوید برای کدام نوع و مقیاس طراحی شده و چه سنجه‌ای را پایش می‌کند.',
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
                systembazar | بازار بسته‌های سیستم‌سازی در موج پنجم
              </p>
              <h1 id="hero-title" className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                سیستم زنده بساز، نه ابزارِ بیشتر.
              </h1>
              <div className="space-y-2 text-base leading-relaxed text-slate-200 sm:text-lg">
                <p>
                  systembazar بازارِ بسته‌های سیستم‌سازی (System Pack)، سنجه‌ها و ابزارهای ارزیابی است.
                </p>
                <p>
                  برای هر مسئله مدیریتی، به تیم‌تان یک بسته سیستم می‌دهد: نقشه سیستم، شاخص‌های اندازه‌گیری و چرخه بازخورد.
                </p>
                <p>
                  نتیجه؟ تصمیم‌گیری شفاف در عصر طغیان داده‌ها؛ نه از روی حدس، بلکه از روی اندازه‌گیری.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => scrollTo('how-it-works')}
                    className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
                  >
                    شروع ارزیابی رایگان سیستم
                  </button>
                  <button
                    onClick={() => scrollTo('kits')}
                    className="rounded-full border border-accent/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent/10"
                  >
                    دیدن نمونه بسته‌ها
                  </button>
                </div>
                <p className="text-xs leading-relaxed text-slate-300">
                  کمتر از ۵ دقیقه، بدون نیاز به کارت بانکی، یک Snapshot از وضعیت سیستم تیم‌تان بگیرید.
                </p>
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
                  <p className="text-base font-semibold text-white">بسته سیستم + نقش‌ها + اتوماسیون سبک</p>
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
            <h2 className="text-3xl font-bold text-white">بازار بسته سیستم + سنجه + ابزار ارزیابی</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              systembazar نرم‌افزار حسابداری یا ERP نیست؛ بازار بسته‌های سیستم‌سازی (System Pack) است تا تیم‌تان در موج پنج، سیستم را طراحی، اندازه‌گیری و پایش کند.
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

      <section id="measurement" className="bg-surface/90 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">چرا اندازه‌گیری، سیستم عصبی سیستم‌هاست؟</p>
            <h2 className="text-3xl font-bold text-white">اگر نمی‌بینید و نمی‌سنجید، فقط حدس می‌زنید.</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              سیستم بدون سنجه، مثل بدن بدون حواس است. systembazar کمک می‌کند قبل از تصمیم، سیستم‌تان را ببینید، اندازه‌گیری کنید و از حلقه‌های بازخورد یاد بگیرید.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {measurementQuotes.map((quote) => (
              <div
                key={quote.name}
                className="flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-black/30 p-5 text-right shadow-inner transition hover:border-accent/40 hover:bg-black/40"
              >
                <p className="text-base leading-relaxed text-slate-100">{quote.text}</p>
                <span className="text-xs text-slate-400">{quote.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kits" className="bg-background py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-3 text-right">
            <p className="text-sm font-semibold text-accent">سه ستون systembazar</p>
            <h2 className="text-3xl font-bold text-white">سه ستون systembazar: بسته سیستم + سنجه‌ها + ابزارهای اندازه‌گیری</h2>
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
                  {pillar.cta ?? 'دیدن بیشتر'}
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
            <h2 className="text-3xl font-bold text-white">بعد از کار با systembazar، چه چیزهایی یاد می‌گیرید و می‌سازید؟</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {outputs.map((output) => (
              <div key={output.title} className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-black/50 via-surface to-surface/80 p-6 shadow-glass">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{output.title}</span>
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">{output.badge}</span>
                </div>
                <div className="mb-4 rounded-2xl border border-dashed border-accent/30 bg-black/30 p-4" aria-hidden>
                  <div className="mb-3 h-2 w-24 rounded-full bg-accent/50" />
                  <div className="mb-2 flex gap-2">
                    <div className="h-16 w-full rounded-xl border border-accent/20 bg-white/5" />
                    <div className="h-16 w-14 rounded-xl border border-accent/20 bg-white/5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-10 rounded-full bg-accent/40" />
                    <div className="h-2 w-20 rounded-full bg-accent-soft/60" />
                    <div className="h-2 w-8 rounded-full bg-slate-600/70" />
                  </div>
                </div>
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
            <h2 className="text-3xl font-bold text-white">هر بسته سیستم دقیقاً برای کدام سیستم طراحی شده است</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-slate-200">
              برای هر بسته سیستم، نوع سیستم، مقیاس و سنجه‌های کنترل مشخص است تا بدانید کجا اجرا و چگونه اندازه‌گیری کنید.
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
            اگر می‌خواهید به‌جای آتش‌نشانی روزمره، سیستم‌های آرام و قابل‌پیش‌بینی بسازید، از همین‌جا شروع کنید. systembazar به تیم‌تان بسته سیستم، سنجه و ابزار می‌دهد تا تصمیم‌ها سریع و شفاف شوند.
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
              دیدن بسته‌ها
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
