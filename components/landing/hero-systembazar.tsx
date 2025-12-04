'use client';

import { InteractiveGridPattern } from '@/components/landing/interactive-grid-pattern';
import { SystemGraph } from '@/components/landing/system-graph';
import { cn } from '@/lib/utils';

export function HeroSystembazar() {
  return (
    <section className='relative overflow-hidden border-b border-slate-200 bg-slate-50'>
      <div className='absolute inset-0 pointer-events-none'>
        <InteractiveGridPattern
          width={48}
          height={48}
          squares={[24, 12]}
          className='border-transparent opacity-[0.25]'
          squaresClassName='stroke-slate-200/70'
        />
      </div>

      <div className='relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:py-24 lg:py-28'>
        <div className='flex-1 space-y-6'>
          <span className='inline-flex items-center rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur'>
            systembazar.ir · کتابخانه سیستم‌سازی
          </span>

          <h1 className='text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl'>
            <span>سیستم بساز، نه آتش‌نشانی کن</span>
            <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500'>
              کیت، سنجه و ابزار برای کسب‌وکار ایرانی
            </span>
          </h1>

          <p className='max-w-xl text-sm md:text-base leading-relaxed text-slate-600'>
            systembazar کتابخانه‌ای از کیت‌های سیستم‌سازی و سنجه‌های استاندارد است تا تصمیم‌گیری و مدیریت در کسب‌وکارهای کوچک و متوسط ایرانی از حس و تجربه به سیستم قابل اندازه‌گیری تبدیل شود.
          </p>

          <div className='grid gap-3 text-sm text-slate-700 sm:grid-cols-3 sm:gap-4'>
            <div className='rounded-lg bg-white/80 p-3 shadow-sm ring-1 ring-slate-200/70'>
              <div className='mb-1 font-semibold'>برای چه کسانی؟</div>
              <div className='text-xs text-slate-600'>
                مدیران، مشاوران و سیستم‌فکرهایی که می‌خواهند کارشان را از حالت آتش‌نشانی دربیاورند.
              </div>
            </div>
            <div className='rounded-lg bg-white/80 p-3 shadow-sm ring-1 ring-slate-200/70'>
              <div className='mb-1 font-semibold'>چه می‌گیرید؟</div>
              <div className='text-xs text-slate-600'>
                کیت‌های آماده، سنجه‌های تعریف‌شده و ابزارهای تصمیم‌یار که می‌شود مستقیم در کسب‌وکار ایرانی استفاده‌شان کرد.
              </div>
            </div>
            <div className='rounded-lg bg-white/80 p-3 shadow-sm ring-1 ring-slate-200/70'>
              <div className='mb-1 font-semibold'>نتیجه چیست؟</div>
              <div className='text-xs text-slate-600'>
                تصمیم‌های شفاف‌تر، وابستگی کمتر به مدیر و سیستمی که می‌شود آن را اندازه گرفت و به‌مرور بهتر کرد.
              </div>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-3 pt-2'>
            <a
              href='#kits'
              className={cn(
                'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold',
                'bg-slate-900 text-white hover:bg-slate-800',
                'transition-colors'
              )}
            >
              دیدن کیت‌ها
            </a>
            <a
              href='#metrics'
              className='inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold border border-slate-300 bg-white/80 text-slate-900 hover:bg-slate-100 transition-colors'
            >
              دیدن سنجه‌ها
            </a>
          </div>
        </div>

        <div className='flex-1'>
          <div className='relative mx-auto max-w-md rounded-2xl bg-slate-950 px-6 py-6 shadow-xl ring-1 ring-slate-900/60'>
            <div className='absolute inset-0 opacity-40'>
              <InteractiveGridPattern
                width={32}
                height={32}
                squares={[16, 12]}
                className='border-slate-800'
                squaresClassName='stroke-slate-800'
              />
            </div>
            <div className='relative space-y-4'>
              <p className='text-xs font-semibold text-slate-300/80'>نمای سیستم</p>
              <p className='text-sm text-slate-200/90'>
                هر گره یک کیت است و هر خط یک سنجه یا ابزار مشترک. می‌توانید گره‌ها را با موس جابجا کنید و شبکهٔ systembazar را لمس کنید.
              </p>
              <div className='mt-4 rounded-xl border border-slate-700/80 bg-slate-900/80 p-3'>
                <SystemGraph className='h-56 w-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

