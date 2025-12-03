import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { getAllTools } from '@/lib/content';

export default async function CalculatorsPage() {
  const tools = (await getAllTools()).filter((t) => t.kind === 'calculator');

  return (
    <Section title="محاسبه‌گرها" subtitle="ابزارهای محاسباتی و عددی">
      {tools.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.slug} title={tool.title} description={tool.summary} href={`/tools/calculators/${tool.slug}`}>
              {tool.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600">ابزار محاسباتی هنوز اضافه نشده است.</p>
      )}
    </Section>
  );
}
