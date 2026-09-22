import {
  DefaultContextCompiler,
  DeterministicModelRouter,
} from "@companion/ai";
import { MockMemoryRepository } from "@companion/memory";
import {
  conversationRequestSchema,
  type RelationshipState,
  type UserId,
} from "@companion/shared";
import { describe, expect, it } from "vitest";

const userId = "test-user" as UserId;

describe("architecture boundaries", () => {
  it("routes development work deterministically", async () => {
    const router = new DeterministicModelRouter("test-model");
    await expect(router.selectModel("conversation")).resolves.toEqual({
      providerId: "mock",
      modelId: "test-model",
      reason: "Deterministic local route for conversation",
    });
  });

  it("compiles a bounded context from retrieved memory", async () => {
    const repository = new MockMemoryRepository();
    const memory = await repository.retrieveRelevant({
      userId,
      query: "What am I building?",
      at: "2026-09-22T20:30:00+01:00",
    });
    const relationship: RelationshipState = {
      relationshipStartedAt: "2026-09-22T09:00:00+01:00",
      relationshipAgeDays: 0,
      closeness: 0.2,
      interactionFrequency: "new",
      tone: "warm",
      humourLevel: 0.4,
      affectionLevel: 0.3,
      recentConnection: "connected",
      boundaries: [],
    };
    const result = await new DefaultContextCompiler().compile({
      now: "2026-09-22T20:30:00+01:00",
      timeZone: "Europe/London",
      relationship,
      memory,
      recentConversation: [],
    });
    expect(result.system).toContain("Today's context");
    expect(result.system).toContain("Building something personal");
    expect(result.includedMemoryIds).toContain("mem-building-companion");
  });

  it("rejects invalid external conversation data", () => {
    expect(conversationRequestSchema.safeParse({ message: "" }).success).toBe(
      false,
    );
  });
});
