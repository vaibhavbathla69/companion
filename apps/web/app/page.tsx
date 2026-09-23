import { CompanionOrb, ViewportBorderBeam } from "@companion/ui";

export default function HomePage() {
  return (
    <ViewportBorderBeam>
      <main className="orb-composition-stage">
        <CompanionOrb state="solving" intensity={0.8} />
        <div
          className="input-mode-buttons"
          role="group"
          aria-label="Input mode"
        >
          <button
            className="input-mode-button"
            type="button"
            aria-label="Voice input"
          >
            <span aria-hidden="true">◉</span>
            <span>Voice</span>
          </button>
          <button
            className="input-mode-button"
            type="button"
            aria-label="Keyboard input"
          >
            <span aria-hidden="true">⌨</span>
            <span>Keyboard</span>
          </button>
        </div>
      </main>
    </ViewportBorderBeam>
  );
}
