# Architecture

## Intent

The system models one relationship moving through time. A request is therefore more than a chat turn: it combines the user's current time, relationship state, today's state, unfinished threads, selectively retrieved memories, and a small recent conversation window.

```text
validated message
  → memory retrieval port
  → context compiler
  → model router
  → provider
  → streamed response
```

The application never assumes that the entire historical transcript belongs in a model prompt.

## Package boundaries

```text
shared ← memory
shared ← ai ← memory contracts
shared ← ui ← memory view types
shared + memory + ai + ui ← web
```

`apps/web` is the composition root. Concrete adapters are created there and injected through contracts. Provider SDKs, database clients, and vector indexes must not leak into shared or UI code.

### Ownership

**Design / frontend owner:** `apps/web`, `packages/ui`.

**Memory / backend owner:** `packages/memory` and future database migrations/adapters.

**Shared review required:** schemas and public exports in `packages/shared`, `packages/ai`, and `packages/memory`.

This separation gives each developer broad areas where changes do not overlap. Contract changes should be small, reviewed commits rather than mixed into UI or storage work.

## Orb visual adapter

`packages/ui/src/companion-orb.tsx` owns the boundary to `thinking-orbs`. The application speaks in product states (`idle`, `thinking`, `speaking`, and so on); only this adapter knows the library's rendering states (`breathing`, `searching`, `composing`, etc.). This keeps a future visual replacement local to the UI package and prevents the animation library from becoming a domain dependency.

## Runtime boundaries

- External request data is validated with Zod in the API route.
- Memory retrieval returns a bounded `MemoryContext`.
- `ContextCompiler` turns typed state into provider-neutral instructions.
- `ModelRouter` returns a provider/model selection and explanation.
- `AIProvider` owns generation semantics, including streaming and structured output.
- The web route streams provider output without exposing provider-specific response objects.

## PostgreSQL readiness

The code uses repository ports rather than an ORM because table design, migrations, vector search, and tenant/auth boundaries have not been decided. A future PostgreSQL adapter belongs under `packages/memory/src/adapters/postgres` and should implement `MemoryRepository`. Selecting Prisma, Drizzle, pgvector, or another persistence tool is deliberately deferred.

## Status legend

- **IMPLEMENTED** — executed by the running prototype.
- **MOCK** — typed and runnable but backed by fixed development behavior/data.
- **PLANNED** — a contract or documented seam exists; no working integration is claimed.
