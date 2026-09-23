import { CompanionOrb, ThinkingOrbStrip } from "@companion/ui";

export default function HomePage() {
  return (
    <main className="orb-composition-stage">
      <CompanionOrb state="solving" intensity={0.8} />
      <ThinkingOrbStrip />
    </main>
  );
}
