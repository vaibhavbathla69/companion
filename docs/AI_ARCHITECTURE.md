# AI Architecture

## IMPLEMENTED

`AIProvider` defines `generate`, `stream`, and `generateStructured`. The first two are exercised by `MockAIProvider`; structured mock generation intentionally throws instead of fabricating a feature.

`DeterministicModelRouter` always selects the local mock provider. Application and UI code do not know which provider generated a response.

The `/api/conversation` route is the composition root for the current flow. It validates input, retrieves memory context, compiles the provider-neutral context, selects a model, and streams output.

## MOCK

`MockAIProvider` produces a few deterministic, tone-aware development responses. It is for UI development and contract testing—not model quality evaluation.

## PLANNED

- Provider adapters for selected hosted or local models.
- A registry resolving `providerId` to a configured adapter.
- Retry, timeout, observability, rate-limit, and safety policies.
- Structured extraction with runtime schema validation.
- Jev behind `ModelRouter`, with deterministic fallback retained for development.

Provider credentials must live in environment variables and be read only by server-side adapters.
