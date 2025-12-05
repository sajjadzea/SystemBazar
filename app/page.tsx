'use client';

import React, { useEffect, useState } from 'react';
import AuroraBackground from '@/components/reactbits/aurora-background';

type GraphNode = {
  id: string;
  label: string;
  baseX: number;
  baseY: number;
};

interface InteractiveForceGraphProps {
  className?: string;
  variant?: 'compact' | 'expanded';
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'kits', label: 'کیت‌ها', baseX: 200, baseY: 40 },
  { id: 'metrics', label: 'سنجش‌ها', baseX: 330, baseY: 145 },
  { id: 'tools', label: 'ابزارها', baseX: 200, baseY: 240 },
  { id: 'theory', label: 'نظریه', baseX: 70, baseY: 145 },
];

const GRAPH_EDGES: [string, string][] = [
  ['kits', 'metrics'],
  ['kits', 'tools'],
  ['kits', 'theory'],
  ['metrics', 'tools'],
  ['metrics', 'theory'],
  ['tools', 'theory'],
];

const InteractiveForceGraph: React.FC<InteractiveForceGraphProps> = ({
  className,
  variant = 'compact',
}) => {
  const [time, setTime] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setTime((prev) => (prev + 0.015) % (Math.PI * 2));
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const baseWidth = 400;
  const baseHeight = 260;
  const scale = variant === 'compact' ? 1 : 1.4;

  const width = baseWidth * scale;
  const height = baseHeight * scale;

  const nodes = GRAPH_NODES.map((node, index) => {
    const floatRadius = variant === 'compact' ? 7 : 10;
    const speed = 0.35 + index * 0.08;
    const offsetX = Math.sin(time * speed + index) * floatRadius;
    const offsetY = Math.cos(time * speed + index) * floatRadius;

    return {
      ...node,
      x: node.baseX * scale + offsetX,
      y: node.baseY * scale + offsetY,
    };
  });

  const findNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div
      className={["relative", className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        role="presentation"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {GRAPH_EDGES.map(([sourceId, targetId], index) => {
          const source = findNode(sourceId);
          const target = findNode(targetId);
          const isActive =
            hoveredId && (hoveredId === source.id || hoveredId === target.id);

          return (
            <line
              key={`${sourceId}-${targetId}-${index}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={isActive ? '#0ea5e9' : '#cbd5f5'}
              strokeWidth={isActive ? 1.9 : 1.1}
              strokeOpacity={isActive ? 0.9 : 0.6}
              strokeLinecap="round"
            />
          );
        })}

        {nodes.map((node, index) => {
          const isHovered = hoveredId === node.id;
          const radius = variant === 'compact' ? 15 : 20;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-default transition-transform duration-300"
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={radius + (isHovered ? 3 : 0)}
                fill={isHovered ? '#0ea5e9' : '#e0f2fe'}
                stroke={isHovered ? '#0369a1' : '#7dd3fc'}
                strokeWidth={1.2}
                filter={isHovered ? 'url(#nodeGlow)' : 'none'}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={radius - 7}
                fill={isHovered ? '#f9fafb' : '#ffffff'}
                opacity={0.96}
              />
              <text
                x={node.x}
                y={node.y + 2}
                textAnchor="middle"
                fontSize={variant === 'compact' ? 11 : 13}
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif"
                fill="#0f172a"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

interface GraphBackgroundProps {
  children: React.ReactNode;
}

/**
 * کانتینر بک‌گراند برای گراف
 * اینجا جاییه که باید یک Background از reactbits.dev رو رندر کنی.
 * گراف روی این بک‌گراند شناور میشه.
 */
const GraphBackground: React.FC<GraphBackgroundProps> = ({ children }) => {
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-slate-950/[0.02] shadow-sm backdrop-blur-sm overflow-hidden">
      {/* لایهٔ React Bits Background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <AuroraBackground className="w-full h-full" />
      </div>

      {/* لایهٔ گرادیان نرم به‌عنوان Blend روی بک‌گراند */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-50/70 via-slate-50/60 to-indigo-50/70" />

      {/* لایهٔ محتوا (خود گراف) */}
      <div className="relative z-10 p-4 sm:p-5 lg:p-6">
        {children}
      </div>
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse gap-10 lg:grid lg:grid-cols-2 lg:items-center">
          {/* ستون گراف (چپ روی دسکتاپ) */}
          <div className="lg:pl-8">
            <GraphBackground>
              <InteractiveForceGraph variant="compact" />
            </GraphBackground>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 text-center lg:text-right">
              شبکهٔ آرام و هوشمند بین «کیت‌ها»، «سنجش‌ها»، «ابزارها» و «نظریه» برای ساختن سیستم‌های زنده.
            </p>
          </div>

          {/* ستون متن (راست) */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] sm:text-xs text-slate-600">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              systembazar.ir — کتابخانهٔ کیت‌ها و سنجه‌های سیستم‌سازی برای کسب‌وکارهای ایرانی
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
                سیستم بساز، نه آتش‌نشانی کن
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                کیت‌ها و سنجه‌های استاندارد برای تصمیم‌گیری در عصر انفجار داده و هوش مصنوعی؛ سیستم‌عامل سیستم‌سازی برای کسب‌وکارهای ایرانی.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-colors">
                شروع ارزیابی بلوغ سیستمی
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors">
                دیدن کتابخانهٔ کیت‌ها
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-[11px] sm:text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                داده‌محور و قابل‌اندازه‌گیری
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                طراحی آرام و بدون شلوغی
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                برای مدیران موج پنج تکنولوژی
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ValueCardProps {
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, items, icon }) => {
  return (
    <div className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white/90 p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-50 via-white to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between gap-3">
          <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
            {icon}
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 text-right">
            {title}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 text-right leading-relaxed">
          {description}
        </p>
        <ul className="mt-1 space-y-1.5 text-xs sm:text-sm text-slate-600 text-right">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-slate-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const IconStack: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <rect x="4" y="5" width="16" height="4" rx="1.5" fill="currentColor" opacity="0.25" />
    <rect x="4" y="10" width="16" height="4" rx="1.5" fill="currentColor" opacity="0.5" />
    <rect x="4" y="15" width="16" height="4" rx="1.5" fill="currentColor" />
  </svg>
);

const IconOutcome: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M5 18c3-3.5 5-5.5 7.5-8.5L19 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15.5 5H19v3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPeople: React.FC = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <circle cx="16" cy="9" r="3" fill="currentColor" opacity="0.7" />
    <circle cx="8" cy="11" r="2.6" fill="currentColor" opacity="0.45" />
    <path
      d="M5 18c0-2.2 1.7-4 3.8-4h0.4c1.1 0 2.1 0.5 2.8 1.3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 18c0-2.4 1.7-4 3.7-4H17c1.9 0 3.5 1.6 3.5 3.6V19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ValueTriadSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 lg:py-16 border-y border-slate-100 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-10 text-right">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            سه‌گانهٔ ارزش systembazar
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            systembazar.ir کتابخانه‌ای است از کیت‌ها، سنجه‌ها و ابزارهای سیستم‌سازی که کمک می‌کند کسب‌وکارهای ایرانی در عصر موج پنج و انفجار داده،
            از حالت آتش‌نشانی و بحران دائمی، به سیستم‌سازی آرام و قابل‌پیش‌بینی حرکت کنند.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <ValueCard
            title="چه چیزی دریافت می‌کنید؟"
            description="همه‌چیز برای شروع سیستم‌سازی؛ بدون گم شدن در تئوری‌های انتزاعی و ابزارهای پراکنده."
            items={[
              'کیت‌های آماده برای سناریوهای متداول کسب‌وکار',
              'سنجه‌ها و KPIهای استاندارد و قابل تطبیق با ایران',
              'ابزارهای اندازه‌گیری و ارزیابی بلوغ سیستمی',
            ]}
            icon={<IconStack />}
          />
          <ValueCard
            title="نتیجه چیست؟"
            description="از تصمیم‌گیری واکنشی به تصمیم‌سازی داده‌محور؛ از آشفتگی به وضوح."
            items={[
              'کاهش آشفتگی و آتش‌نشانی‌های روزمره',
              'تصمیم‌گیری سریع‌تر و دقیق‌تر بر اساس سنجه‌های روشن',
              'ساختاردهی به فرایندها، نقش‌ها و جریان داده',
            ]}
            icon={<IconOutcome />}
          />
          <ValueCard
            title="این برای چه کسانی است؟"
            description="برای کسانی که می‌خواهند روی سیستم کار کنند، نه فقط درون سیستم."
            items={[
              'مدیران کسب‌وکار و واحدهای عملیاتی',
              'مشاوران سیستم‌ها و تحول دیجیتال',
              'کارآفرینان و سازندگان در موج پنج تکنولوژی',
            ]}
            icon={<IconPeople />}
          />
        </div>
      </div>
    </section>
  );
};

const SystemMapSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-18">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            نقشهٔ سیستم
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            تصویری از رابطهٔ بین کیت‌ها، سنجه‌ها، ابزارها و نظریه؛ جایی که طراحی سیستم، داده و اجرا به‌هم می‌رسند و یک زبان مشترک برای تصمیم‌گیری می‌سازند.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <GraphBackground>
            <InteractiveForceGraph variant="expanded" />
          </GraphBackground>
        </div>
      </div>
    </section>
  );
};

interface ChecklistItemProps {
  label: string;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ label }) => (
  <li className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M5 10.5 8.2 14 15 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span>{label}</span>
  </li>
);

const AIChallengesSection: React.FC = () => {
  const items = [
    'همه ابزار دارند، اما سیستم ندارند',
    'سنجه درست انتخاب نمی‌شود',
    'تصمیم‌ها احساسی و لحظه‌ای است',
    'داده زیاد است، اما ساختار کم است',
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-18 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
          <div className="space-y-4 text-right">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              چالش‌های عصر هوش مصنوعی
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              در موج پنج تکنولوژی، ابزارهای هوش مصنوعی برای همه در دسترس‌اند؛ اما مزیت رقابتی واقعی از «سیستم‌سازی» می‌آید، نه از تعداد ابزارها.
              systembazar کمک می‌کند این شکاف را ببینید و پل بزنید.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 sm:p-6 shadow-sm">
            <ul className="space-y-3 sm:space-y-4">
              {items.map((item) => (
                <ChecklistItem key={item} label={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterSection: React.FC = () => {
  const beforeItems = [
    'آشفتگی و خاموش کردن آتش‌ها به‌صورت دائمی',
    'تصمیم‌گیری بدون سنجه و فقط با حس و تجربه',
    'فرایندهای نامشخص و وابسته به افراد کلیدی',
    'هزینه‌های پنهان، هدررفت زمان و انرژی تیم',
  ];

  const afterItems = [
    'وضوح در نقشهٔ سیستم، فرایندها و جریان داده',
    'سنجه‌های شفاف برای پیگیری تصمیم‌ها و نتایج',
    'فرایندهای استاندارد و مستند، مستقل از افراد',
    'کنترل هزینه، افزایش بهره‌وری و یادگیری مستمر سیستم',
  ];

  const renderList = (items: string[]) => (
    <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-700">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-slate-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-18">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            قبل و بعد از systembazar
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            تفاوت بین کسب‌وکاری که هر روز درگیر آتش‌نشانی و بحران است، با کسب‌وکاری که با سنجه و سیستم کار می‌کند، در وضوح، آرامش و پیش‌بینی‌پذیری است.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-rose-100 bg-rose-50/80 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-rose-700">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                قبل از systembazar
              </div>
              <span className="text-[11px] sm:text-xs text-rose-500/80">
                حالت آتش‌نشانی دائمی
              </span>
            </div>
            {renderList(beforeItems)}
          </div>

          <div className="rounded-3xl border border-sky-100 bg-sky-50/90 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-sky-700">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sky-500" />
                بعد از systembazar
              </div>
              <span className="text-[11px] sm:text-xs text-sky-600/80">
                سیستم‌سازی آرام و داده‌محور
              </span>
            </div>
            {renderList(afterItems)}
          </div>
        </div>
      </div>
    </section>
  );
};

interface CatalogCardProps {
  title: string;
  description: string;
}

const CatalogCard: React.FC<CatalogCardProps> = ({ title, description }) => {
  return (
    <div className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white/90 p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-3 text-right">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>
      <button className="mt-4 inline-flex items-center justify-start text-xs sm:text-sm font-medium text-sky-700 group-hover:text-sky-800">
        <span>دیدن بیشتر</span>
        <span className="mr-1.5 inline-flex -scale-x-100">
          {/* arrow right, flipped for RTL */}
          <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
            <path
              d="M8 5.5 12.5 10 8 14.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

const CatalogSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-18 bg-slate-50/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            کتابخانهٔ اصلی systembazar
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            سه ستون اصلی سیستم‌سازی: ابزارها، سنجه‌ها و کیت‌ها. هرکدام می‌توانند مستقل استفاده شوند، اما در کنار هم یک سیستم‌عامل کامل برای مدیریت داده و تصمیم‌گیری می‌سازند.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <CatalogCard
            title="ابزارها"
            description="ابزارهای تعاملی برای ارزیابی بلوغ سیستمی، پایش فرایندها، مدل‌سازی جریان داده و طراحی ساختارهای مدیریتی در عصر هوش مصنوعی."
          />
          <CatalogCard
            title="سنجش‌ها"
            description="کتابخانه‌ای از KPIها، شاخص‌ها و سنجه‌های استاندارد، متناسب با فضای اقتصادی و سازمانی ایران؛ آماده برای اتصال به داشبوردها و گزارش‌ها."
          />
          <CatalogCard
            title="کیت‌ها"
            description="بسته‌های آماده برای سناریوهای پرتکرار: از راه‌اندازی سیستم OKR تا طراحی فرایندهای خدمات و پشتیبانی؛ همراه با قالب‌ها، چک‌لیست‌ها و نقشهٔ سیستم."
          />
        </div>
      </div>
    </section>
  );
};

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16">
      <div className="bg-gradient-to-l from-sky-600 via-indigo-600 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14 flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 sm:space-y-4 text-right max-w-xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              آماده‌اید تا سیستم بسازید؟
            </h2>
            <p className="text-sm sm:text-base text-sky-50/90 leading-relaxed">
              از یک ارزیابی سادهٔ بلوغ سیستمی شروع کنید، شکاف‌ها را ببینید و قدم‌به‌قدم سیستم‌سازی را در کسب‌وکار خود نهادینه کنید.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
            <button className="inline-flex items-center justify-center rounded-full bg-white px-5 sm:px-6 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100 transition-colors">
              شروع ارزیابی رایگان
            </button>
            <button className="inline-flex items-center justify-center rounded-full border border-sky-100/80 bg-transparent px-5 sm:px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              تماس با ما
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-xs sm:text-sm text-slate-600">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-900">محصول</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="hover:text-slate-900">
                  کیت‌ها
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  سنجه‌ها
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  ابزارها
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-900">درباره ما</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="hover:text-slate-900">
                  داستان systembazar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  همکاری و مشارکت
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-900">قانونی</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="hover:text-slate-900">
                  شرایط استفاده
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-900">شبکه‌های اجتماعی</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#" className="hover:text-slate-900">
                  تلگرام
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  لینکدین
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-slate-900">
                  اینستاگرام
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] sm:text-xs text-slate-500">
          <span>© {year} systembazar.ir — همهٔ حقوق محفوظ است.</span>
          <span>systembazar = سیستم‌عامل سیستم‌سازی برای عصر انفجار داده‌ها</span>
        </div>
      </div>
    </footer>
  );
};

const SystemBazarLandingPage: React.FC = () => {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col"
    >
      <main className="flex-1">
        <HeroSection />
        <ValueTriadSection />
        <SystemMapSection />
        <AIChallengesSection />
        <BeforeAfterSection />
        <CatalogSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default SystemBazarLandingPage;
