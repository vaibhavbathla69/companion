# Companion

This is an early foundation for a continuous, time-aware AI companion. It is intentionally built around one ongoing relationship rather than separate chat threads.

The current repository provides a runnable visual and conversational prototype plus stable boundaries for model providers, routing, context compilation, and future memory infrastructure. It does **not** claim to provide durable AI memory yet.

## Status

| Area                           | Status          | Notes                                                                         |
| ------------------------------ | --------------- | ----------------------------------------------------------------------------- |
| Main companion experience      | **IMPLEMENTED** | Responsive UI, reusable 3D orb, reduced-motion/WebGL fallback                 |
| Conversation transport         | **IMPLEMENTED** | Validated request and streamed response                                       |
| Model provider                 | **MOCK**        | Deterministic local replies; no API key required                              |
| Model router                   | **IMPLEMENTED** | Deterministic development router; Jev integration planned                     |
| Context compiler               | **IMPLEMENTED** | Builds a bounded package from time, relationship, memory, and recent messages |
| Today and Memory views         | **MOCK**        | Working views backed by typed mock data                                       |
| Persistent memory and database | **PLANNED**     | Ports exist; no database or vector index is fabricated                        |
| Consolidation                  | **PLANNED**     | Contract and lifecycle documented only                                        |

## Run locally

Requirements: Node.js 22 or newer.

```bash
corepack enable
pnpm install
pnpm dev
```

If pnpm's Corepack shim is unavailable on Windows, use:

```bash
npx pnpm@12.5.1 install
npx pnpm@12.5.1 dev
```

Open `http://localhost:3000`. No environment variables are required for the mock experience. Copy `.env.example` to `.env.local` only when implementing a real adapter.

## Commands

```bash
pnpm dev          # Start the web app
pnpm typecheck    # Strict TypeScript across workspaces
pnpm lint         # ESLint
pnpm test         # Contract tests
pnpm build        # Production build
```

## Repository map

- `apps/web` — Next.js routes, application wiring, streaming API boundary.
- `packages/ui` — visual system, orb, conversation, Today, and Memory views.
- `packages/ai` — provider, model router, and context compiler contracts.
- `packages/memory` — memory schemas, retrieval/consolidation ports, mock adapter.
- `packages/shared` — cross-boundary Zod schemas and domain types.
- `docs` — focused architectural notes and implementation status.

See [ARCHITECTURE.md](./ARCHITECTURE.md) before adding infrastructure.
