import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllTheoryTopics, getTheoryBySlug } from '@/lib/content';

interface SystemTheoryProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const topics = await getAllTheoryTopics();
  return topics.map((topic) => ({ slug: topic.slug }));
}

export default async function SystemTheoryTopicPage({ params }: SystemTheoryProps) {
  try {
    const { meta, content } = await getTheoryBySlug(params.slug);
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">{meta.title}</h1>
          <p className="text-sm text-slate-600">{meta.summary}</p>
        </div>
        <article className="prose prose-slate max-w-none">
          <MDXRemote source={content} />
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
