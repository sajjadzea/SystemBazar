import Link from 'next/link';
import React from 'react';

const systemCards = [
  {
    title: 'سیستم‌های انسانی و سازمانی',
    definition:
      'جایی که رفتار، احساس، انگیزه و فرهنگ نقش اصلی را بازی می‌کنند؛ مثل تیم‌ها، واحدها، شرکت‌ها و شبکه‌های غیررسمی در سازمان.',
    examples: 'تیم فروش در یک شرکت خدماتی، واحد برنامه‌ریزی در سازمان دولتی، هسته‌های غیررسمی قدرت در یک اداره.',
    metrics: [
      'سطح اعتماد و همکاری بین واحدها (مثلاً از طریق نظرسنجی داخلی)',
      'درصد جلساتی که با تصمیم مشخص تمام می‌شوند',
      'نرخ جابه‌جایی نیروی انسانی در یک سال',
      'احساس فرسودگی (Burnout) در تیم‌های کلیدی',
    ],
    pitfall:
      'اندازه‌گیری فقط حضور فیزیکی و خروجی عددی، بدون لمس کیفیت رابطه و اعتماد؛ بعد هم تعجب از اینکه چرا تصمیم‌ها گیر می‌کند.',
    microCta: 'اگر سیستم‌ات بیشتر انسانی و سازمانی است، بسته‌های سیستم‌سازی و سنجه‌هایت باید از همین‌جا شروع شوند.',
  },
  {
    title: 'سیستم‌های اقتصادی و بیزنسی',
    definition:
      'جایی که پول، ریسک، جریان نقدی و مدل درآمد در مرکز سیستم قرار دارد؛ از مغازه محلی تا هلدینگ.',
    examples: 'مدل درآمد یک استارتاپ، شبکه تأمین کالا در شهر، سبد محصول یک شرکت تولیدی.',
    metrics: [
      'حاشیه سود ناخالص و خالص',
      'نوسان جریان نقدی ماهانه',
      'وابستگی درآمد به چند مشتری محدود',
      'سهم هر محصول/خدمت در سودآوری کل',
    ],
    pitfall:
      'تمرکز روی فروش و حجم، بدون نگاه به سودآوری و ریسک؛ KPIها حول عدد فروش می‌چرخند، نه سلامت سیستم اقتصادی.',
    microCta: 'اگر سیستم‌ات اقتصادی است، اول تصویر سود، ریسک و نقدینگی را شفاف کن؛ بعد سراغ اهداف رشد برو.',
  },
  {
    title: 'سیستم‌های داده، اطلاعات و دیجیتال',
    definition:
      'داشبوردها، پایگاه‌های داده، سیستم‌های اتوماسیون و هرجایی که داده از یک نقطه به نقطه دیگر می‌رود و تصمیم‌ها باید روی این داده سوار شوند.',
    examples: 'سیستم اتوماسیون اداری یک سازمان، گزارش‌های اکسل پراکنده در یک شرکت، CRM نیمه‌کاره.',
    metrics: [
      'درصد رکوردهای ناقص یا اشتباه در پایگاه داده',
      'زمان متوسط دسترسی به گزارش قابل‌اعتماد',
      'تعداد منابع داده‌ای جزیره‌ای برای یک موضوع مشترک',
      'میزان استفاده واقعی از داشبوردها (مثلاً بازدید ماهانه)',
    ],
    pitfall:
      'ساختن چندین داشبورد و گزارش، بدون اینکه کیفیت داده و استفاده واقعی از آن‌ها را اندازه بگیریم؛ در نتیجه داده هست، ولی تصمیم روشن نیست.',
    microCta: 'اگر سیستم‌ات داده‌محور است، اول کیفیت و دسترسی داده را بسنج؛ نه فقط تعداد گزارش‌ها را.',
  },
  {
    title: 'سیستم‌های انسان–ماشین و سایبر–فیزیکی',
    definition:
      'ترکیب انسان، ماشین و سنسور؛ جایی که تصمیم‌ها و خطاها می‌توانند هم فنی باشند هم انسانی؛ مثل خطوط تولید، شبکه‌های آب و برق، مراکز تماس.',
    examples: 'مرکز تماس یک اپراتور، سیستم توزیع آب در یک شهر، خط بسته‌بندی در کارخانه.',
    metrics: [
      'نرخ خرابی و توقف (Downtime) تجهیزات',
      'میانگین زمان رفع مشکل (MTTR)',
      'تعداد خطاهای انسانی ثبت‌شده در یک دوره',
      'حجم کار انجام‌شده به ازای هر اپراتور در شیفت',
    ],
    pitfall:
      'سرزنش نیروها یا دستگاه‌ها به‌صورت جداگانه، بدون دیدن کل سیستم انسان–ماشین و طراحی سنجه‌هایی که این تعامل را نشان بدهند.',
    microCta: 'اگر سیستم‌ات این‌جاست، لازم است هم سنجه‌های فنی و هم انسانی را کنار هم ببینی.',
  },
  {
    title: 'سیستم‌های محیطی و زیربنایی',
    definition:
      'آب، انرژی، ترافیک، آلودگی و زیرساخت‌هایی که هم فنی‌اند، هم اجتماعی و هم سیاسی؛ و مستقیم با زندگی روزمره مردم گره خورده‌اند.',
    examples: 'شبکه آب شهری، مصرف گاز در زمستان، ترافیک یک کلان‌شهر.',
    metrics: [
      'مصرف سرانه',
      'نابرابری دسترسی بین مناطق',
      'شدت هدررفت (مثلاً آب بدون درآمد)',
      'ریسک و حساسیت سیستم به شوک‌ها (مثلاً سرمای شدید یا خشکسالی)',
    ],
    pitfall:
      'اندازه‌گیری فقط حجم کل (مثلاً تولید یا مصرف)، بدون دیدن توزیع، هدررفت و تاب‌آوری سیستم.',
    microCta: 'اگر با آب، انرژی یا شهر سروکار داری، نوع سیستم‌ات این‌جاست؛ سنجه‌هایت هم باید سیستم‌محور باشند، نه فقط عدد کل.',
  },
];

const cheatSheetRows = [
  {
    system: 'انسانی و سازمانی',
    example: 'تیم فروش، واحد برنامه‌ریزی، شبکه‌های غیررسمی در اداره',
    metrics: 'اعتماد و همکاری / جلسات با خروجی روشن / نرخ جابه‌جایی نیرو',
    pitfall: 'اندازه‌گیری فقط حضور و خروجی، بدون توجه به کیفیت رابطه',
  },
  {
    system: 'اقتصادی و بیزنسی',
    example: 'مدل درآمد استارتاپ، زنجیره تأمین، سبد محصول',
    metrics: 'حاشیه سود / نوسان جریان نقدی / وابستگی به چند مشتری محدود',
    pitfall: 'تمرکز روی فروش به‌جای سود و ریسک',
  },
  {
    system: 'داده، اطلاعات و دیجیتال',
    example: 'اتوماسیون اداری، گزارش‌های اکسل، CRM نیمه‌کاره',
    metrics: 'کیفیت داده / زمان دسترسی به گزارش درست / استفاده واقعی از داشبورد',
    pitfall: 'افتخار به تعداد گزارش‌ها، بدون سنجش کیفیت و استفاده',
  },
  {
    system: 'انسان–ماشین و سایبر–فیزیکی',
    example: 'مرکز تماس، خط تولید، شبکه توزیع آب',
    metrics: 'خرابی و توقف / زمان رفع مشکل / خطاهای انسانی ثبت‌شده',
    pitfall: 'سرزنش جداگانه انسان یا ماشین، بدون دیدن کل سیستم',
  },
  {
    system: 'محیطی و زیربنایی',
    example: 'شبکه آب شهری، مصرف گاز، ترافیک شهر',
    metrics: 'مصرف سرانه / نابرابری دسترسی / شدت هدررفت',
    pitfall: 'نگاه فقط به عدد کل، بدون توجه به توزیع و تاب‌آوری',
  },
];

export default function SystemsMapPage() {
  return (
    <div className="relative isolate overflow-hidden bg-background py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background to-background" aria-hidden />
      <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" aria-hidden />
      <div className="absolute -right-24 bottom-20 h-48 w-48 rounded-full bg-accent-soft/10 blur-3xl" aria-hidden />

      <section className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <header className="space-y-6 text-right">
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/5 px-4 py-2 text-xs text-accent shadow-glass">
            نقشهٔ سیستم‌ها و سنجه‌ها
          </p>
          <div className="space-y-4">
            <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
              نقشهٔ سیستم‌ها و سنجه‌ها برای سازمان‌های ایرانی
            </h1>
            <div className="space-y-2 text-lg leading-relaxed text-slate-200">
              <p>قبل از اینکه KPI انتخاب کنیم، باید بفهمیم با چه نوع سیستمی طرفیم.</p>
              <p>سیستم انسانی، اقتصادی، داده‌ای یا انسان–ماشین هرکدام خط‌کش خودشان را دارند.</p>
              <p>این صفحه یک نقشهٔ عملی است تا نوع سیستم‌تان را پیدا کنید و بفهمید چه چیزهایی ارزش اندازه‌گیری دارند.</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-surface/70 p-4 shadow-glass backdrop-blur">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <p className="font-semibold text-white">چطور از این صفحه استفاده کنم؟</p>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs text-accent">۳ گام سریع</span>
            </div>
            <div className="mt-3 grid gap-3 text-sm leading-relaxed text-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-slate-800/80 sm:text-base">
              <div className="flex flex-col gap-1 pr-0 sm:pr-3">
                <p className="text-xs text-slate-400">گام ۱</p>
                <p>نوع سیستم خودتان را بین دسته‌ها پیدا کنید.</p>
              </div>
              <div className="flex flex-col gap-1 pr-0 sm:pr-3">
                <p className="text-xs text-slate-400">گام ۲</p>
                <p>مثال‌های ایرانی و سنجه‌های پیشنهادی را بخوانید.</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-slate-400">گام ۳</p>
                <p>از چیت‌شیت انتهای صفحه برای طراحی سنجه‌های خودتان استفاده کنید.</p>
              </div>
            </div>
          </div>
        </header>

        <section aria-labelledby="system-categories" className="space-y-6">
          <div className="flex flex-col gap-2 text-right">
            <h2 id="system-categories" className="text-2xl font-extrabold text-white sm:text-3xl">
              دسته‌های اصلی سیستم‌ها
            </h2>
            <p className="text-base text-slate-300">
              هر کارت، تعریف، مثال‌های ایرانی، سنجه‌های قابل‌سنجش و یک اشتباه رایج را به زبان ساده نشان می‌دهد.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {systemCards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col gap-4 rounded-2xl border border-slate-800 bg-surface/70 p-6 shadow-glass transition hover:border-accent/60 hover:bg-surface/90"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 text-right">
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-200">{card.definition}</p>
                  </div>
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden />
                </div>

                <div className="space-y-2 rounded-xl border border-slate-800/70 bg-black/20 p-4">
                  <p className="text-xs font-semibold text-slate-400">مثال‌های ایرانی</p>
                  <p className="text-sm leading-relaxed text-slate-200">{card.examples}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-400">سنجه‌های پیشنهادی</p>
                  <ul className="grid list-disc list-inside gap-2 text-sm leading-relaxed text-slate-200">
                    {card.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-xs font-semibold text-amber-300">اشتباه رایج در ایران</p>
                  <p className="text-sm leading-relaxed text-amber-100">{card.pitfall}</p>
                </div>

                <p className="text-sm font-semibold text-emerald-400">{card.microCta}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="cheatsheet" className="space-y-4 rounded-2xl border border-slate-800 bg-surface/70 p-6 shadow-glass">
          <div className="flex flex-col gap-2 text-right">
            <h2 id="cheatsheet" className="text-2xl font-extrabold text-white sm:text-3xl">
              چیت‌شیت اندازه‌گیری انواع سیستم (برای سازمان‌های ایرانی)
            </h2>
            <p className="text-sm leading-relaxed text-slate-200">
              این جدول، نسخهٔ فشردهٔ همین صفحه است. می‌توانی آن را به‌عنوان نقطه شروع طراحی سنجه‌هایت در جلسات تیمی استفاده کنی.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-black/30">
            <div className="hidden grid-cols-[1.05fr_1.2fr_1.25fr_1.25fr] border-b border-slate-800/80 bg-black/40 text-right text-sm font-semibold text-white sm:grid">
              <div className="px-4 py-3">نوع سیستم</div>
              <div className="px-4 py-3">مثال ایرانی</div>
              <div className="px-4 py-3">۳ سنجهٔ پیشنهادی</div>
              <div className="px-4 py-3">اشتباه رایج در ایران</div>
            </div>

            <div className="divide-y divide-slate-800/70">
              {cheatSheetRows.map((row) => (
                <div
                  key={row.system}
                  className="grid grid-cols-1 gap-3 px-4 py-4 text-right text-[15px] leading-relaxed text-slate-100 sm:grid-cols-[1.05fr_1.2fr_1.25fr_1.25fr] sm:gap-4 sm:text-base"
                >
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 sm:hidden">نوع سیستم</p>
                    <p className="font-semibold text-white">{row.system}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 sm:hidden">مثال ایرانی</p>
                    <p>{row.example}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 sm:hidden">۳ سنجهٔ پیشنهادی</p>
                    <p>{row.metrics}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 sm:hidden">اشتباه رایج در ایران</p>
                    <p className="text-amber-100">{row.pitfall}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-400">
            نسخهٔ قابل‌چاپ و نسخهٔ Notion این چیت‌شیت به‌زودی از همین‌جا قابل دانلود خواهد بود.
          </p>
        </section>

        <section className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-right shadow-glass">
          <h3 className="text-xl font-extrabold text-white sm:text-2xl">نمی‌دانی سیستم‌ات دقیقاً در کدام دسته است؟</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-200">
            در یک گفتگوی ۳۰ دقیقه‌ای، کمک می‌کنیم نوع سیستم‌ات و سنجه‌های اولویت‌دارش را مشخص کنی؛ مخصوص واقعیت سازمان‌های ایرانی.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-accent/30 transition hover:bg-accent-soft"
            >
              درخواست جلسه مشاورهٔ اولیه
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
