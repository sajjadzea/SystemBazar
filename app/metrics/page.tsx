import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { getAllMetrics, getMetricCategories } from '@/lib/content';

export default async function MetricsLanding() {
  const [categories, metrics] = await Promise.all([getMetricCategories(), getAllMetrics()]);

  const group = categories.map((cat) => ({
    category: cat,
    count: metrics.filter((m) => m.category === cat).length,
  }));

  const categoryLabels: Record<string, string> = {
    human: 'انسانی',
    machine: 'ماشین/فنی',
    systemic: 'سیستمی',
  };

  return (
    <Section title="کتابخانه سنجه‌ها" subtitle="سنجه‌ها بر اساس سه دسته اصلی گروه‌بندی شده‌اند">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.map((item) => (
          <Card
            key={item.category}
            title={categoryLabels[item.category] ?? item.category}
            description={`تعداد سنجه: ${item.count}`}
            href={`/metrics/${item.category}`}
          />
        ))}
      </div>
    </Section>
  );
}
