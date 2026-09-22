import type { ActiveThread, DailyMemory } from "@companion/memory";

export interface TodayViewProps {
  today: DailyMemory;
  threads: ActiveThread[];
}

export function TodayView({ today, threads }: TodayViewProps) {
  return (
    <main className="reflection-page">
      <header className="reflection-header">
        <p className="eyebrow">Today · {today.localDate}</p>
        <h1>The shape of your day</h1>
        <p>{today.summary}</p>
      </header>
      <div className="today-mood">
        <span>Right now</span>
        <strong>{today.mood ?? "Still unfolding"}</strong>
      </div>
      <section className="day-section">
        <p className="eyebrow">In motion</p>
        <div className="thread-list">
          {threads.map((thread) => (
            <article key={thread.id}>
              <span className={`thread-status status-${thread.status}`} />{" "}
              <div>
                <h2>{thread.subject}</h2>
                <p>{thread.detail}</p>
              </div>
              <small>{thread.status}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="day-section quiet-grid">
        <div>
          <p className="eyebrow">Moments</p>
          {today.activities.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div>
          <p className="eyebrow">Still open</p>
          {today.unresolvedTopics.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
      <p className="mock-note">
        A quiet preview of what your companion understands today · mock data
      </p>
    </main>
  );
}
