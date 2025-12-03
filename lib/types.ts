export type SystemType =
  | 'natural'
  | 'technical'
  | 'software'
  | 'cyber_physical'
  | 'human'
  | 'organizational'
  | 'social'
  | 'economic'
  | 'ecological'
  | 'cognitive'
  | 'ai'
  | 'conceptual'
  | 'complex_adaptive';

export type BehaviorDynamics = 'static' | 'dynamic';
export type BehaviorComplexity = 'simple' | 'complex' | 'complex_adaptive';

export interface Behavior {
  dynamics: BehaviorDynamics;
  complexity: BehaviorComplexity;
}

export type Scale = 'micro' | 'meso' | 'macro';

export type ArchitectureStructure = 'hierarchical' | 'networked' | 'distributed' | 'heterarchical';
export type ArchitectureControl = 'centralized' | 'decentralized' | 'distributed';

export interface Architecture {
  structure: ArchitectureStructure[];
  control: ArchitectureControl[];
}

export interface SystemComponents {
  purpose: boolean;
  structure: boolean;
  processes: boolean;
  feedback_loops: boolean;
  stocks_flows: boolean;
  rules_constraints: boolean;
  information: boolean;
  paradigm: boolean;
  identity: boolean;
  measurement: boolean;
}

export interface BaseMeta {
  title: string;
  slug: string;
  summary: string;
  tags?: string[];
  version?: string;
  lastUpdated?: string;
  authors?: string[];
}

export interface KitMeta extends BaseMeta {
  systemTypes: SystemType[];
  behavior: Behavior;
  scale: Scale[];
  architecture: Architecture;
  components: SystemComponents;
  useCases: string[];
  metrics: { input: string[]; output: string[]; health: string[] };
  tools?: { calculators?: string[]; templates?: string[]; checklists?: string[] };
}

export type MetricCategory = 'human' | 'machine' | 'systemic';

export interface MetricMeta extends BaseMeta {
  category: MetricCategory;
  unit?: string;
  typicalRange?: string;
  systemTypes: SystemType[];
}

export type ToolKind = 'calculator' | 'generator' | 'diagnostic' | 'decision' | 'visualizer' | 'utility';

export interface ToolMeta extends BaseMeta {
  kind: ToolKind;
  relatedKits?: string[];
  relatedMetrics?: string[];
}

export type TheoryMeta = BaseMeta;

export interface ContentWithMeta<TMeta extends BaseMeta> {
  meta: TMeta;
  content: string;
}
