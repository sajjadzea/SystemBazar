import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { getAllMetrics } from '@/lib/content';
import { MetricCategory } from '@/lib/types';
import { notFound } from 'next/navigation';

interface MetricCategoryPageProps {
  params: { category: MetricCategory };
}

export async function generateStaticParams() {
  const categories: MetricCategory[] = ['human', 'machine', 'systemic'];
  return categories.map((category) => ({ category }));
}

export default async function MetricCategoryPage({ params }: MetricCategoryPageProps) {
  const metrics = (await getAllMetrics()).filter((m) => m.category === params.category);
  if (!metrics.length) notFound();

  const labels: Record<MetricCategory, string> = {
    human: 'انسانی',
    machine: 'ماشین/فنی',
    systemic: 'سیستمی',
  };

  return (
    <Section title={`سنجه‌های ${labels[params.category]}`} subtitle="تمام سنجه‌های این دسته">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card
            key={metric.slug}
            title={metric.title}
            description={metric.summary}
            href={`/metrics/${params.category}/${metric.slug}`}
          >
            {metric.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Card>
        ))}
      </div>
    </Section>
  );
}
