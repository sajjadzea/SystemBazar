'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { ISourceOptions } from 'tsparticles-engine';

const Particles = dynamic(() => import('react-tsparticles'), {
  ssr: false,
});

const particlesOptions: ISourceOptions = {
  fpsLimit: 60,
  background: {
    color: 'transparent',
  },
  fullScreen: false,
  detectRetina: true,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: 'grab',
      },
      onClick: {
        enable: false,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 140,
        links: {
          opacity: 0.4,
        },
      },
    },
  },
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: '#38bdf8',
    },
    links: {
      enable: true,
      distance: 140,
      color: '#38bdf8',
      opacity: 0.25,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: 'none',
      outModes: {
        default: 'bounce',
      },
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: 2,
      random: {
        enable: true,
        minimumValue: 1,
      },
    },
  },
};

export default function SystemBazarHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* particles background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Particles id="systembazar-hero-particles" options={particlesOptions} />
        {/* optional gradient overlay to improve text contrast */}
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-slate-950/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-16 text-right" dir="rtl">
        <div className="inline-flex items-center justify-end gap-2 self-end rounded-full border border-sky-500/40 bg-slate-900/60 px-4 py-1 text-xs font-medium text-sky-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
          <span>جعبه‌ابزار سیستم‌سازی برای موج پنج</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-tight text-slate-50 sm:text-4xl lg:text-5xl">
            سیستم‌بازار؛ کیت‌ها، سنجه‌ها و ابزارهای تصمیم
            <span className="block text-sky-300">برای کسب‌وکارهای ایرانی در عصر هوش مصنوعی</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-300 ml-auto">
            اگر هنوز کسب‌وکارت با شهود و آتش‌نشانی می‌چرخد، سیستم‌بازار کمک می‌کند آن را به یک سیستم قابل اندازه‌گیری تبدیل کنی؛
            با کیت‌های سیستم‌سازی، کتابخانهٔ سنجه‌ها و ابزارهای تعاملی تصمیم‌گیری که برای شرایط اقتصادی ایران طراحی شده‌اند.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/tools/diagnostics/system-maturity"
            className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition"
          >
            شروع با تست بلوغ سیستمی
          </Link>

          <Link
            href="/kits"
            className="rounded-full border border-slate-600 px-6 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-200 transition"
          >
            دیدن همه کیت‌ها
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap justify-end gap-2 text-[11px] text-slate-400">
          <span className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1">
            کیت‌های سیستم‌سازی
          </span>
          <span className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1">
            کتابخانهٔ سنجه‌ها
          </span>
          <span className="rounded-full border border-slate-700/80 bg-slate-900/60 px-3 py-1">
            ابزارهای تصمیم و تشخیص
          </span>
        </div>
      </div>
    </section>
  );
}
