import {
  CompanionOrb,
  ThinkingOrbStrip,
  ViewportBorderBeam,
} from "@companion/ui";

export default function HomePage() {
  return (
    <ViewportBorderBeam>
      <main className="orb-composition-stage">
        <CompanionOrb state="solving" intensity={0.8} />
        <ThinkingOrbStrip />
      </main>
    </ViewportBorderBeam>
  );
}
