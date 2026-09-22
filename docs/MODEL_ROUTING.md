# Model Routing

`ModelRouter.selectModel(task)` returns a provider ID, model ID, and reason. Tasks currently include conversation, memory extraction, consolidation, and reasoning.

## IMPLEMENTED

The deterministic router always returns a configured local development model. This makes local work reproducible and does not require Jev or credentials.

## PLANNED

Jev may later implement this contract using task complexity, latency budget, cost budget, privacy needs, and provider availability. It remains a decision layer—not the conversational personality. The deterministic router should remain available as a fallback and in tests.
