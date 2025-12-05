'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

const cardFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const HeroSection: React.FC<{ onPrimaryClick: () => void }> = ({ onPrimaryClick }) => {
  const vantaRef = useRef<HTMLDivElement | null>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      vantaEffect.current = NET({
        el: vantaRef.current,
        THREE,
        color: 0x14f1db,
        backgroundColor: 0x0b1021,
        points: 14.0,
        maxDistance: 22.0,
        spacing: 18.0,
      });
    }

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-background py-10 sm:py-14 lg:py-16">
      <div ref={vantaRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 text-right lg:max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/40 px-3 py-1 text-xs text-accent">
              شبکه‌ای از داده و تصمیم، فقط در Hero
            </span>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              سیستم بسازید؛ موج پنجم را رهبری کنید
            </h1>
            <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
              کتابخانهٔ کیت‌ها، سنجه‌ها و فرآیندهای آماده برای تیم‌هایی که می‌خواهند تصمیم‌سازی داده‌محور را جایگزین آتش‌نشانی روزمره کنند. با Vanta.NET یک هرو غوطه‌ور در شبکهٔ روشن روی پس‌زمینهٔ تاریک.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onPrimaryClick}
                className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
              >
                شروع ارزیابی رایگان
              </button>
              <a
                href="#features"
                className="rounded-full border border-accent/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent hover:bg-accent/10"
              >
                دیدن مزیت‌ها
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-accent" />
                همگام با زبان و نیازهای فارسی
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-accent-soft" />
                کیت‌های آماده + سنجه‌های استاندارد
              </span>
            </div>
          </div>
          <div className="relative grid w-full max-w-xl gap-4 rounded-3xl border border-accent/20 bg-surface/70 p-6 shadow-glass backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-200">لایه‌های سیستم شما</p>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent">Net Visual</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-slate-100">
              <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                <p className="text-xs text-slate-400">ورودی</p>
                <p className="text-base font-semibold text-white">مشتریان بالقوه + داده</p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                <p className="text-xs text-slate-400">فرایند</p>
                <p className="text-base font-semibold text-white">کیت‌های آماده + اتوماسیون</p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                <p className="text-xs text-slate-400">خروجی</p>
                <p className="text-base font-semibold text-white">رشد قابل‌پیش‌بینی</p>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-black/30 p-4 shadow-inner">
                <p className="text-xs text-slate-400">سنجه + اقدام</p>
                <p className="text-base font-semibold text-white">داشبورد، تصمیم، تکرار</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: 'کیت‌های عملیاتی',
    description: 'الگوهای آماده برای فروش، محتوا، پشتیبانی و عملیات با دستورالعمل‌های فارسی.',
    points: ['چک‌لیست‌های مرحله‌به‌مرحله', 'قالب‌های مستندات و SOP', 'نمونه داشبورد و سنجه‌های قابل استفاده بلافاصله'],
  },
  {
    title: 'سنجه‌های شفاف',
    description: 'KPIهای استاندارد و بومی‌سازی‌شده برای تصمیم‌گیری بی‌ابهام.',
    points: ['تعریف دقیق هر سنجه', 'دامنهٔ هدف و هشدار', 'نمودارهای پیشنهادی برای گزارش‌دهی'],
  },
  {
    title: 'ابزار تصمیم‌سازی',
    description: 'ارزیابی بلوغ سیستمی، اولویت‌بندی اقدامات و نقشهٔ اجرا برای ۶ هفته آینده.',
    points: ['فرم ارزیابی رایگان', 'مسیر حرکت پیشنهادی', 'کتابخانهٔ اقدام‌های سریع برای تیم'],
  },
];

const personas = [
  {
    title: 'مدیران عملیات و رشد',
    description: 'نیازمند نظم در فرایند و داده تا تیم بدون اتکا به چند فرد کلیدی کار کند.',
  },
  {
    title: 'کارآفرینان موج پنج',
    description: 'به دنبال سیستم‌سازی آرام، داده‌محور و سازگار با زبان و فرهنگ بازار ایران.',
  },
  {
    title: 'تیم‌های محصول و پشتیبانی',
    description: 'می‌خواهند تصمیم‌ها را با سنجه بسنجند و تجربهٔ مشتری را تکرارپذیر کنند.',
  },
];

const steps = [
  {
    title: 'ارزیابی سریع بلوغ',
    desc: 'با چند پرسش، گلوگاه‌های سیستم را شناسایی کنید و امتیاز موج پنج بگیرید.',
  },
  {
    title: 'چیدمان کیت و سنجه',
    desc: 'کیت مناسب را انتخاب کنید، سنجه‌ها را در داشبورد بچینید و مالک هر مرحله را مشخص کنید.',
  },
  {
    title: 'راه‌اندازی آرام و تکرار',
    desc: 'فرایندها را مستند و اجرا کنید، بازخورد بگیرید و در چرخهٔ بهبود مستمر بچرخید.',
  },
];

const trustSignals = [
  {
    title: 'طراحی برای پس‌زمینهٔ تاریک',
    desc: 'تمام کارت‌ها با حاشیه، سایه و بلور سبک طراحی شده‌اند تا روی افکت Hero خوانا بمانند.',
  },
  {
    title: 'لهجهٔ بصری فیروزه‌ای',
    desc: 'تیترها و نشانه‌ها با رنگ Accent هماهنگ شده‌اند تا در تمام سکشن‌ها یکپارچه باشند.',
  },
  {
    title: 'انیمیشن ورود نرم',
    desc: 'کارت‌ها هنگام اسکرول با fade-in ظاهر می‌شوند تا حرکت چشم را هدایت کنند.',
  },
];

const FeaturesSection = () => (
  <section id="features" className="bg-surface/80 py-14 shadow-[0_-1px_0_rgba(255,255,255,0.04)]">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10 space-y-3 text-right">
        <p className="text-sm font-semibold text-accent">چرا systembazar</p>
        <h2 className="text-3xl font-bold text-white">کیت + سنجه + اقدام، مخصوص بازار ایران</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-300">کارت‌های ویژگی‌ها با پس‌زمینهٔ تاریک و رنگ Accent برای تیترها ساخته شده‌اند تا خوانایی و انسجام بصری حفظ شود.</p>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            {...cardFade}
            className="rounded-3xl border border-slate-800/80 bg-black/30 p-6 shadow-glass backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-accent-soft">{feature.title}</h3>
            <p className="mt-3 text-sm text-slate-200">{feature.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {feature.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PersonasSection = () => (
  <section className="bg-background py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-8 space-y-2 text-right">
        <p className="text-sm font-semibold text-accent">برای چه کسانی؟</p>
        <h2 className="text-2xl font-bold text-white">پرسوناهای اصلی systembazar</h2>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {personas.map((persona) => (
          <motion.div
            key={persona.title}
            {...cardFade}
            className="rounded-3xl border border-slate-800 bg-surface/70 p-5 shadow-glass"
          >
            <h3 className="text-lg font-semibold text-accent-soft">{persona.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{persona.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = React.forwardRef<HTMLElement>((_, ref) => (
  <section ref={ref} id="process" className="bg-surface/90 py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-10 space-y-2 text-right">
        <p className="text-sm font-semibold text-accent">مسیر اجرا</p>
        <h2 className="text-2xl font-bold text-white">فرآیند سه‌مرحله‌ای برای شروع</h2>
        <p className="text-sm text-slate-300">دکمهٔ Hero به این بخش اسکرول می‌کند؛ کارت‌ها با انیمیشن fade-in ظاهر می‌شوند.</p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            {...cardFade}
            className="relative rounded-3xl border border-accent/25 bg-black/40 p-6 shadow-glass"
          >
            <span className="absolute -top-3 left-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/25 text-lg font-bold text-accent">
              {index + 1}
            </span>
            <h3 className="mb-3 text-lg font-semibold text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-slate-200">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));
ProcessSection.displayName = 'ProcessSection';

const TrustSection = () => (
  <section className="bg-background py-14">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-8 space-y-2 text-right">
        <p className="text-sm font-semibold text-accent">هماهنگی بصری</p>
        <h2 className="text-2xl font-bold text-white">کارت‌های قابل‌خواندن روی پس‌زمینهٔ تاریک</h2>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-3">
        {trustSignals.map((signal) => (
          <motion.div
            key={signal.title}
            {...cardFade}
            className="rounded-3xl border border-slate-800 bg-surface/80 p-5 shadow-glass"
          >
            <h3 className="text-lg font-semibold text-accent-soft">{signal.title}</h3>
            <p className="mt-2 text-sm text-slate-200">{signal.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default function HomePage() {
  const processRef = useRef<HTMLElement | null>(null);

  const scrollToProcess = () => {
    processRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex w-full flex-col">
      <HeroSection onPrimaryClick={scrollToProcess} />
      <FeaturesSection />
      <PersonasSection />
      <ProcessSection ref={processRef} />
      <TrustSection />
    </div>
  );
}
