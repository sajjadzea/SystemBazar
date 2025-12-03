import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import { getAllKits } from '@/lib/content';

export default async function KitsPage() {
  const kits = await getAllKits();

  return (
    <Section title="کیت‌های سیستم‌سازی" subtitle="کیت‌ها را مرور کنید و برای کار خود انتخاب کنید">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kits.map((kit) => (
          <Card key={kit.slug} title={kit.title} description={kit.summary} href={`/kits/${kit.slug}`}>
            {kit.systemTypes.map((type) => (
              <Tag key={type}>{type}</Tag>
            ))}
            {kit.scale.map((scale) => (
              <Tag key={scale}>{scale}</Tag>
            ))}
          </Card>
        ))}
      </div>
    </Section>
  );
}
