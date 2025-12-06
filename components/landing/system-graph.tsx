'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type SystemNode = {
  id: string;
  label: string;
  x: number;
  y: number;
};

type SystemLink = {
  source: string;
  target: string;
};

const initialNodes: SystemNode[] = [
  { id: 'kits', label: 'بسته‌های سیستم', x: 160, y: 40 },
  { id: 'metrics', label: 'سنجه‌ها', x: 40, y: 130 },
  { id: 'tools', label: 'ابزارها', x: 280, y: 130 },
  { id: 'theory', label: 'نظریه سیستم', x: 160, y: 210 },
];

const links: SystemLink[] = [
  { source: 'kits', target: 'metrics' },
  { source: 'kits', target: 'tools' },
  { source: 'metrics', target: 'theory' },
  { source: 'tools', target: 'theory' },
  { source: 'metrics', target: 'tools' },
];

export function SystemGraph({ className }: { className?: string }) {
  const [nodes, setNodes] = useState<SystemNode[]>(initialNodes);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function handlePointerDown(id: string, event: React.PointerEvent) {
    event.stopPropagation();
    try {
      (event.target as Element).setPointerCapture(event.pointerId);
    } catch {
      // ignore
    }
    setDraggingId(id);
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (draggingId) {
      try {
        (event.target as Element).releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
    }
    setDraggingId(null);
  }

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (!draggingId) return;

    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setNodes(prev =>
      prev.map(node =>
        node.id === draggingId ? { ...node, x, y } : node
      )
    );
  }

  function getNode(id: string): SystemNode | undefined {
    return nodes.find(node => node.id === id);
  }

  return (
    <svg
      viewBox='0 0 320 240'
      className={cn('h-56 w-full', className)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {links.map(link => {
        const source = getNode(link.source);
        const target = getNode(link.target);
        if (!source || !target) return null;

        return (
          <line
            key={source.id + '-' + target.id}
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            className='stroke-slate-500/50'
            strokeWidth={1.5}
          />
        );
      })}

      {nodes.map(node => (
        <g
          key={node.id}
          transform={`translate(${node.x}, ${node.y})`}
          className='cursor-pointer'
          onPointerDown={event => handlePointerDown(node.id, event)}
        >
          <circle
            r={22}
            className='fill-indigo-500/80 stroke-white/40 shadow-lg'
          />
          <text
            textAnchor='middle'
            dominantBaseline='middle'
            className='text-[10px] font-medium fill-slate-50'
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

