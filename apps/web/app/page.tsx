import { CompanionOrb } from "@companion/ui";

export default function HomePage() {
  return (
    <main className="orb-only-stage">
      <CompanionOrb state="solving" intensity={0.8} />
    </main>
  );
}
