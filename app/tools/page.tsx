import Card from '@/components/ui/Card';
import Section from '@/components/ui/Section';
import Tag from '@/components/ui/Tag';
import Badge from '@/components/ui/Badge';
import { getAllTools } from '@/lib/content';
import { ToolMeta } from '@/lib/types';

function toolHref(tool: ToolMeta) {
  return `/tools/${kindPaths[tool.kind]}/${tool.slug}`;
}

const kindPaths: Record<ToolMeta['kind'], string> = {
  calculator: 'calculators',
  generator: 'generators',
  diagnostic: 'diagnostics',
  decision: 'decisions',
  visualizer: 'visualizers',
  utility: 'utilities',
};

export default async function ToolsPage() {
  const tools = await getAllTools();
  const kinds: ToolMeta['kind'][] = ['diagnostic', 'decision', 'generator', 'calculator', 'visualizer', 'utility'];
  const featured = tools.filter((tool) => ['system-maturity', 'weighted-matrix', 'okr-builder'].includes(tool.slug));

  return (
    <div className="space-y-8">
      <Section title="ابزارهای شاخص" subtitle="سه ابزار تعاملی پرکاربرد برای تیم‌های سیستمی">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <Card key={tool.slug} title={tool.title} description={tool.summary} href={`/tools/${kindPaths[tool.kind]}/${tool.slug}`}>
              <Badge>{tool.kind}</Badge>
              {tool.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      </Section>

      <Section title="ابزارها و قالب‌ها" subtitle="ابزارهای تعاملی، محاسباتی و تصمیم‌گیری">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Card key={tool.slug} title={tool.title} description={tool.summary} href={toolHref(tool)}>
              <Badge>{tool.kind}</Badge>
              {tool.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      </Section>
      <Section title="دسته‌ها" subtitle="دسته‌بندی ابزارها بر اساس کارکرد">
        <div className="flex flex-wrap gap-3">
          {kinds.map((kind) => (
            <Badge key={kind}>
              <a href={`/tools/${kindPaths[kind]}`}>
                {kind}
              </a>
            </Badge>
          ))}
        </div>
      </Section>
    </div>
  );
}
