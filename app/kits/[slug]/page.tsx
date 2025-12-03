import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getAllKits, getKitBySlug } from '@/lib/content';
import KitMetaPanel from '@/components/kit/KitMetaPanel';

interface KitPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const kits = await getAllKits();
  return kits.map((kit) => ({ slug: kit.slug }));
}

export default async function KitPage({ params }: KitPageProps) {
  try {
    const { meta, content } = await getKitBySlug(params.slug);
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">{meta.title}</h1>
          <p className="text-slate-600">{meta.summary}</p>
        </div>
        <KitMetaPanel meta={meta} />
        <article className="prose prose-slate max-w-none">
          <MDXRemote source={content} />
        </article>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
