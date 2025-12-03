import Link from 'next/link';
import { getAllKits, getAllMetrics, getAllTools } from '@/lib/content';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Tag from '@/components/ui/Tag';
import Badge from '@/components/ui/Badge';
import { ToolMeta } from '@/lib/types';

function toolHref(tool: ToolMeta) {
  if (tool.slug === 'system-maturity') return '/tools/diagnostics/system-maturity';
  if (tool.slug === 'weighted-matrix') return '/tools/decisions/weighted-matrix';
  if (tool.slug === 'okr-builder') return '/tools/generators/okr-builder';
  return `/tools/${tool.slug}`;
}

export default async function HomePage() {
  const [kits, metrics, tools] = await Promise.all([getAllKits(), getAllMetrics(), getAllTools()]);
  const featuredKits = kits.slice(0, 3);
  const featuredMetrics = metrics.slice(0, 3);
  const featuredTools = tools.filter((t) => ['system-maturity', 'weighted-matrix', 'okr-builder'].includes(t.slug)).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-indigo-600">SystemBazar.ir</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            سیستم‌بازار – بازار کیت‌ها، سنجه‌ها و ابزارهای سیستم‌سازی برای ایران
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            چهار ستون اصلی: کیت‌های سیستمی، کتابخانه سنجه‌ها، نظریه سیستم و ابزارهای عملی. همه چیز برای ساخت، اندازه‌گیری و بهبود سیستم‌ها.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-sm" href="/kits">
              مشاهده کیت‌ها
            </Link>
            <Link className="rounded-lg border border-indigo-100 bg-white px-4 py-2 font-semibold text-indigo-700" href="/metrics">
              کتابخانه سنجه‌ها
            </Link>
            <Link className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-800" href="/tools">
              ابزارها و قالب‌ها
            </Link>
          </div>
        </div>
      </section>

      <Section title="کیت‌های منتخب" subtitle="نمونه‌ای از کیت‌های آماده برای شروع کار سیستمی">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredKits.map((kit) => (
            <Card key={kit.slug} title={kit.title} description={kit.summary} href={`/kits/${kit.slug}`}>
              {kit.systemTypes.map((type) => (
                <Tag key={type}>{type}</Tag>
              ))}
            </Card>
          ))}
        </div>
      </Section>

      <Section title="سنجه‌های محبوب" subtitle="سه سنجه پرکاربرد برای تیم‌ها و سامانه‌ها">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMetrics.map((metric) => (
            <Card
              key={metric.slug}
              title={metric.title}
              description={metric.summary}
              href={`/metrics/${metric.category}/${metric.slug}`}
            >
              <Badge>{metric.category}</Badge>
              {metric.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      </Section>

      <Section title="ابزارهای آماده" subtitle="چند ابزار تعاملی برای تصمیم و سنجش">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <Card key={tool.slug} title={tool.title} description={tool.summary} href={toolHref(tool)}>
              <Badge>{tool.kind}</Badge>
              {tool.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
