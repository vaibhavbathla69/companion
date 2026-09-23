import {
  CompanionOrb,
  TypingLiquidBar,
  ViewportBorderBeam,
} from "@companion/ui";

export default function HomePage() {
  return (
    <ViewportBorderBeam>
      <main className="orb-composition-stage">
        <CompanionOrb state="solving" intensity={0.8} />
        <TypingLiquidBar />
      </main>
    </ViewportBorderBeam>
  );
}
