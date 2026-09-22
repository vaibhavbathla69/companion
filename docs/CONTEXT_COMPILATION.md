# Context Compilation

The compiler receives already-retrieved, typed context:

```text
current time
+ relationship state
+ working and daily memory
+ active threads
+ relevant long-term memories and episodes
+ bounded recent conversation
= provider-neutral context
```

## IMPLEMENTED

`DefaultContextCompiler` builds a compact system instruction and reports which memory IDs it included. It distinguishes retrieved knowledge kinds/confidence and tells the model not to claim unsupplied memories.

## MOCK

Relevance is currently determined by the mock repository, not semantic search. Curiosity items exist as opportunities but the mock provider does not mechanically enumerate them.

## PLANNED

- Token budgeting by model.
- Ranked retrieval with diversity and temporal relevance.
- Protection against prompt injection from remembered text.
- Context provenance and debugging traces.
- Summarization policies for recent conversation.
- Evaluation fixtures for continuity, restraint, and memory correctness.
