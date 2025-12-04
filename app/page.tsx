import { HeroGeometric } from "@/components/landing/hero-geometric";
import { InteractiveGridPattern } from "@/components/landing/interactive-grid-pattern";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* background grid layer */}
      <div className="absolute inset-0 -z-10">
        <InteractiveGridPattern
          width={40}
          height={40}
          squares={[32, 20]}
          className="border-zinc-900/40"
          squaresClassName="stroke-zinc-800/40"
        />
      </div>

      {/* placeholder for future system graph overlay */}
      {/**
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <MySystemGraph />
      </div>
      **/}

      {/* main hero content */}
      <HeroGeometric />
    </main>
  );
}
