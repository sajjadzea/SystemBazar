import path from 'node:path';
import { promises as fs } from 'node:fs';
import matter from 'gray-matter';
import {
  ContentWithMeta,
  KitMeta,
  MetricCategory,
  MetricMeta,
  TheoryMeta,
  ToolMeta,
} from './types';

const contentRoot = path.join(process.cwd(), 'content');

async function readMDXFile<T>(filePath: string): Promise<ContentWithMeta<T>> {
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { meta: data as T, content };
}

async function listMDXFiles(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.endsWith('.mdx')).map((entry) => entry.name);
}

export async function getAllKits(): Promise<KitMeta[]> {
  const dir = path.join(contentRoot, 'kits');
  const files = await listMDXFiles(dir);
  const kits: KitMeta[] = [];

  for (const file of files) {
    const { meta } = await readMDXFile<KitMeta>(path.join(dir, file));
    kits.push({ ...meta, slug: meta.slug || file.replace(/\.mdx$/, '') });
  }

  return kits.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getKitBySlug(slug: string): Promise<ContentWithMeta<KitMeta>> {
  const filePath = path.join(contentRoot, 'kits', `${slug}.mdx`);
  const { meta, content } = await readMDXFile<KitMeta>(filePath);
  return { meta: { ...meta, slug }, content };
}

export async function getMetricCategories(): Promise<MetricCategory[]> {
  const metricsDir = path.join(contentRoot, 'metrics');
  const entries = await fs.readdir(metricsDir, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name as MetricCategory);
}

export async function getAllMetrics(): Promise<MetricMeta[]> {
  const categories = await getMetricCategories();
  const results: MetricMeta[] = [];

  for (const category of categories) {
    const dir = path.join(contentRoot, 'metrics', category);
    const files = await listMDXFiles(dir);
    for (const file of files) {
      const { meta } = await readMDXFile<MetricMeta>(path.join(dir, file));
      const slug = meta.slug || file.replace(/\.mdx$/, '');
      results.push({ ...meta, slug, category });
    }
  }

  return results.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getMetricBySlug(
  category: MetricCategory,
  slug: string,
): Promise<ContentWithMeta<MetricMeta>> {
  const filePath = path.join(contentRoot, 'metrics', category, `${slug}.mdx`);
  const { meta, content } = await readMDXFile<MetricMeta>(filePath);
  return { meta: { ...meta, slug, category }, content };
}

export async function getAllTools(): Promise<ToolMeta[]> {
  const dir = path.join(contentRoot, 'tools', 'descriptions');
  const files = await listMDXFiles(dir);
  const tools: ToolMeta[] = [];

  for (const file of files) {
    const { meta } = await readMDXFile<ToolMeta>(path.join(dir, file));
    tools.push({ ...meta, slug: meta.slug || file.replace(/\.mdx$/, '') });
  }

  return tools.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getToolBySlug(slug: string): Promise<ContentWithMeta<ToolMeta>> {
  const filePath = path.join(contentRoot, 'tools', 'descriptions', `${slug}.mdx`);
  const { meta, content } = await readMDXFile<ToolMeta>(filePath);
  return { meta: { ...meta, slug }, content };
}

export async function getAllTheoryTopics(): Promise<TheoryMeta[]> {
  const dir = path.join(contentRoot, 'system-theory');
  const files = await listMDXFiles(dir);
  const topics: TheoryMeta[] = [];

  for (const file of files) {
    const { meta } = await readMDXFile<TheoryMeta>(path.join(dir, file));
    topics.push({ ...meta, slug: meta.slug || file.replace(/\.mdx$/, '') });
  }

  return topics.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getTheoryBySlug(slug: string): Promise<ContentWithMeta<TheoryMeta>> {
  const filePath = path.join(contentRoot, 'system-theory', `${slug}.mdx`);
  const { meta, content } = await readMDXFile<TheoryMeta>(filePath);
  return { meta: { ...meta, slug }, content };
}
