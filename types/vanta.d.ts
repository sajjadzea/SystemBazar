declare module 'vanta/dist/vanta.net.min' {
  import type * as THREE from 'three';

  type VantaBaseInstance = {
    destroy: () => void;
  };

  type VantaNetOptions = {
    el: HTMLElement | string | null;
    THREE?: typeof THREE;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
  } & Record<string, unknown>;

  export default function NET(options: VantaNetOptions): VantaBaseInstance;
}
