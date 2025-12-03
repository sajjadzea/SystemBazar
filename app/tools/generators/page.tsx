import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { getAllTools } from '@/lib/content';

export default async function GeneratorsPage() {
  const tools = (await getAllTools()).filter((t) => t.kind === 'generator');

  return (
    <Section title="ژنراتورها" subtitle="ابزارهای تولید محتوا یا ساختار سیستمی">
      {tools.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.slug} title={tool.title} description={tool.summary} href={`/tools/generators/${tool.slug}`}>
              {tool.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600">ابزار تولیدی هنوز اضافه نشده است.</p>
      )}
    </Section>
  );
}
