import type { RememberedItem } from "@companion/memory";

const labels: Record<RememberedItem["category"], string> = {
  about: "About me",
  people: "People",
  memory: "Important memories",
  goal: "Goals",
  "current-life": "Current life",
  pattern: "Patterns",
};

export function MemoryView({ items }: { items: RememberedItem[] }) {
  const grouped = items.reduce<
    Partial<Record<RememberedItem["category"], RememberedItem[]>>
  >((result, item) => {
    (result[item.category] ??= []).push(item);
    return result;
  }, {});
  return (
    <main className="reflection-page memory-page">
      <header className="reflection-header">
        <p className="eyebrow">Memory</p>
        <h1>What I carry with me</h1>
        <p>
          Not a transcript. Just the pieces that help me know you—and which you
          will always be able to change.
        </p>
      </header>
      <div className="memory-groups">
        {Object.entries(grouped).map(([category, group]) => (
          <section className="memory-group" key={category}>
            <h2>{labels[category as RememberedItem["category"]]}</h2>
            <div>
              {group?.map((item) => (
                <article className="memory-card" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <span className={`memory-kind kind-${item.metadata.kind}`}>
                    {item.metadata.kind}
                  </span>
                  <button
                    type="button"
                    aria-label={`Memory controls for ${item.title}`}
                  >
                    •••
                  </button>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mock-note">
        Memory controls and persistence are planned · mock data
      </p>
    </main>
  );
}
