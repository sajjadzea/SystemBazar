import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { getAllTools } from '@/lib/content';

export default async function UtilitiesPage() {
  const tools = (await getAllTools()).filter((t) => t.kind === 'utility');

  return (
    <Section title="ابزارهای کمکی" subtitle="ابزارهای کوچک برای کار روزمره">
      {tools.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.slug} title={tool.title} description={tool.summary} href={`/tools/utilities/${tool.slug}`}>
              {tool.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600">ابزار کمکی هنوز اضافه نشده است.</p>
      )}
    </Section>
  );
}
