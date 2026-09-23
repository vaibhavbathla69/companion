import { CompanionOrb } from "@companion/ui";

export default function HomePage() {
  return (
    <main className="orb-row-stage">
      <div className="orb-row" aria-label="Companions solving">
        {Array.from({ length: 11 }, (_, index) => (
          <CompanionOrb
            key={index}
            state="solving"
            intensity={0.65 + (index % 3) * 0.08}
          />
        ))}
      </div>
    </main>
  );
}
