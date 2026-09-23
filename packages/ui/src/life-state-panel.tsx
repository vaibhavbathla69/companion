"use client";

import { useState } from "react";

export type LifeStateView = "today" | "open" | "later";

export interface LifeStateItem {
  title: string;
  meta?: string;
  description?: string;
  state?: "completed" | "upcoming" | "now" | "important";
}

export interface LifeStateData {
  date: { day: string; month: string; time: string };
  today: LifeStateItem[];
  open: LifeStateItem[];
  later: LifeStateItem[];
}

export interface LifeStatePanelProps {
  data: LifeStateData;
  initialView?: LifeStateView;
}

const labels: Record<LifeStateView, string> = {
  today: "Today",
  open: "Open",
  later: "Later",
};

/** Quiet, structured context for what is active in the user's life. */
export function LifeStatePanel({
  data,
  initialView = "today",
}: LifeStatePanelProps) {
  const [view, setView] = useState<LifeStateView>(initialView);
  const items = data[view];

  return (
    <aside className="life-state-panel" aria-label="Life state">
      <header className="life-state-date">
        <time dateTime="2026-09-23">
          <span className="life-state-day">{data.date.day}</span>
          <span className="life-state-month">{data.date.month}</span>
        </time>
        <time className="life-state-time">{data.date.time}</time>
      </header>

      <nav className="life-state-nav" aria-label="Life state sections">
        {(Object.keys(labels) as LifeStateView[]).map((key) => (
          <button
            key={key}
            type="button"
            className={view === key ? "is-selected" : ""}
            aria-pressed={view === key}
            onClick={() => setView(key)}
          >
            {labels[key]}
          </button>
        ))}
      </nav>

      <section className="life-state-section" aria-label={labels[view]}>
        <h2>{labels[view]}</h2>
        <div className="life-state-items">
          {items.map((item) => (
            <article
              key={`${item.meta ?? ""}-${item.title}`}
              className={`life-state-item state-${item.state ?? "upcoming"}`}
            >
              <div className="life-state-item-meta">
                {item.state === "now" && (
                  <span className="life-state-now-dot" aria-hidden="true" />
                )}
                {item.meta}
              </div>
              <p className="life-state-item-title">{item.title}</p>
              {item.description && (
                <p className="life-state-item-description">
                  {item.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </aside>
  );
}
