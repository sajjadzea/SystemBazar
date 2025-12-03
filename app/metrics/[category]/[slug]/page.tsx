import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllMetrics, getMetricBySlug } from '@/lib/content';
import MetricMetaPanel from '@/components/metric/MetricMetaPanel';
import { MetricCategory } from '@/lib/types';

interface MetricPageProps {
  params: { category: MetricCategory; slug: string };
}

export async function generateStaticParams() {
  const metrics = await getAllMetrics();
  return metrics.map((metric) => ({ category: metric.category, slug: metric.slug }));
}

export default async function MetricPage({ params }: MetricPageProps) {
  try {
    const { meta, content } = await getMetricBySlug(params.category, params.slug);
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">{meta.title}</h1>
          <p className="text-slate-600">{meta.summary}</p>
        </div>
        <MetricMetaPanel meta={meta} />
        <article className="prose prose-slate max-w-none">
          <MDXRemote source={content} />
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
