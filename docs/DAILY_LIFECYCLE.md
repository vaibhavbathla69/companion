# Daily Lifecycle

```text
morning → daily state begins
day     → messages and events update working/daily state
evening → conversation continues with full daily continuity
end day → consolidation candidates are prepared and classified
```

## IMPLEMENTED

Daily state is represented by a typed schema and can be requested by local date through `MemoryRepository`.

## MOCK

The Today view reads a fixed daily summary and active threads from `MockMemoryRepository`.

## PLANNED

The `DailyConsolidationService` will prepare reviewable candidates and apply an explicit disposition:

- `delete`
- `archive-as-episode`
- `promote-to-long-term`
- `keep-as-active-thread`

Open decisions include how the user's day boundary is detected, how late-night sessions attach to a day, idempotency, retries, and whether automatic decisions require a confidence threshold or review. No scheduler or consolidation implementation exists yet.
