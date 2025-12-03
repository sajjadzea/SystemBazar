import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import { getAllTheoryTopics } from '@/lib/content';
import Tag from '@/components/ui/Tag';

export default async function SystemTheoryPage() {
  const topics = await getAllTheoryTopics();

  return (
    <Section title="نظریه سیستم" subtitle="مفاهیم پایه برای درک و طراحی سیستم‌ها">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <Card key={topic.slug} title={topic.title} description={topic.summary} href={`/system-theory/${topic.slug}`}>
            {topic.tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Card>
        ))}
      </div>
    </Section>
  );
}
