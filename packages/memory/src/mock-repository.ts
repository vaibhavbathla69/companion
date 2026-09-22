import type { UserId } from "@companion/shared";
import type { MemoryRepository, RetrievalQuery } from "./contracts";
import type { ActiveThread, CuriosityItem, DailyMemory, MemoryContext, RememberedItem, WorkingMemory } from "./schemas";

const now = "2026-09-22T20:30:00+01:00";
const userId = "local-user" as UserId;

export const mockRememberedItems: RememberedItem[] = [
  {
    id: "mem-building-companion",
    category: "current-life",
    title: "Building something personal",
    detail: "You are shaping an AI companion that should feel continuous, calm, and genuinely present.",
    metadata: { kind: "fact", confidence: 1, evidence: [], firstObservedAt: now, lastObservedAt: now },
  },
  {
    id: "mem-evening-focus",
    category: "pattern",
    title: "Evening focus",
    detail: "You often seem to settle into creative work later in the day.",
    metadata: { kind: "inference", confidence: 0.46, evidence: [], firstObservedAt: now, lastObservedAt: now },
  },
  {
    id: "mem-sam",
    category: "people",
    title: "Sam",
    detail: "A collaborator you are waiting to hear from about a potential partnership.",
    metadata: { kind: "fact", confidence: 0.92, evidence: [], firstObservedAt: now, lastObservedAt: now },
  },
];

const working: WorkingMemory = {
  currentActivity: "Planning the companion product",
  currentLocation: null,
  currentSubject: "The first working prototype",
  expiresAt: null,
};

const threads: ActiveThread[] = [
  { id: "thread-prototype", subject: "First prototype", detail: "Get the architectural foundation running.", status: "open", updatedAt: now },
  { id: "thread-sam", subject: "Sam's reply", detail: "Waiting on thoughts about the partnership.", status: "waiting", updatedAt: now },
];

const curiosities: CuriosityItem[] = [
  { id: "curiosity-feel", subject: "The companion's presence", priority: "medium", reason: "The desired feeling will guide future visual and voice decisions.", earliestAppropriateAt: now, status: "pending" },
];

function daily(localDate: string): DailyMemory {
  return { userId, localDate, summary: "A focused day spent turning the companion idea into a real product foundation.", mood: "quietly energised", activities: ["Architecture planning", "Visual exploration"], peopleMentioned: ["Sam"], plans: ["Run the first prototype"], unresolvedTopics: ["The companion's eventual voice"], updatedAt: now };
}

export class MockMemoryRepository implements MemoryRepository {
  async getWorkingMemory(): Promise<WorkingMemory> { return working; }
  async getDailyMemory(_userId: UserId, localDate: string): Promise<DailyMemory> { return daily(localDate); }
  async getActiveThreads(): Promise<ActiveThread[]> { return threads; }
  async getCuriosityQueue(): Promise<CuriosityItem[]> { return curiosities; }
  async getRememberedItems(): Promise<RememberedItem[]> { return mockRememberedItems; }

  async retrieveRelevant(query: RetrievalQuery): Promise<MemoryContext> {
    const localDate = query.at.slice(0, 10);
    return { working, today: daily(localDate), activeThreads: threads, relevantLongTerm: mockRememberedItems.filter((item) => item.category !== "memory"), relevantEpisodes: [], curiosityOpportunities: curiosities };
  }
}

