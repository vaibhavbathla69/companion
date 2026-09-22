import type { ConversationMessage, UserId } from "@companion/shared";
import type {
  ActiveThread,
  CuriosityItem,
  DailyMemory,
  MemoryContext,
  RememberedItem,
  WorkingMemory,
} from "./schemas";

export interface RetrievalQuery {
  userId: UserId;
  query: string;
  at: string;
  limit?: number;
}

export interface MemoryRepository {
  getWorkingMemory(userId: UserId): Promise<WorkingMemory>;
  getDailyMemory(userId: UserId, localDate: string): Promise<DailyMemory>;
  getActiveThreads(userId: UserId): Promise<ActiveThread[]>;
  getCuriosityQueue(userId: UserId, at: string): Promise<CuriosityItem[]>;
  getRememberedItems(userId: UserId): Promise<RememberedItem[]>;
  retrieveRelevant(query: RetrievalQuery): Promise<MemoryContext>;
}

export type ConsolidationDisposition =
  | "delete"
  | "archive-as-episode"
  | "promote-to-long-term"
  | "keep-as-active-thread";

export interface ConsolidationCandidate {
  id: string;
  sourceMessages: ConversationMessage[];
  suggestedDisposition: ConsolidationDisposition;
  rationale: string;
}

export interface DailyConsolidationService {
  prepare(userId: UserId, localDate: string): Promise<ConsolidationCandidate[]>;
  consolidate(
    userId: UserId,
    decisions: ReadonlyArray<{
      candidateId: string;
      disposition: ConsolidationDisposition;
    }>,
  ): Promise<void>;
}
