# Memory Interfaces

## Layers

The current schemas distinguish working memory, daily memory, episodic/long-term remembered items, active threads, and a curiosity queue. `MemoryRepository` exposes retrieval without dictating storage.

Knowledge carries one of three kinds:

- `fact` — directly stated or otherwise explicitly established;
- `inference` — a tentative interpretation;
- `pattern` — a repeated behavior supported by multiple observations.

Every remembered claim supports confidence, evidence references, and first/last observation timestamps. A single inference must never be silently promoted into permanent truth.

## IMPLEMENTED

- Zod schemas and TypeScript types.
- Retrieval and repository ports.
- Confidence/provenance metadata.
- Typed active-thread and curiosity records.

## MOCK

`MockMemoryRepository` returns fixed daily state, threads, curiosity opportunities, and remembered items so frontend work does not depend on unfinished infrastructure.

## PLANNED

- PostgreSQL schema and migrations.
- Extraction and evidence recording.
- Embeddings and hybrid retrieval.
- User-facing remember/forget/matters/stop-asking/ask-later mutations.
- Permission, audit, retention, export, and deletion policies.
