import type { z } from "zod";
import type {
  conversationMessageSchema,
  conversationRequestSchema,
  evidenceReferenceSchema,
  knowledgeKindSchema,
  knowledgeMetadataSchema,
  relationshipStateSchema,
  userIdSchema,
} from "./schemas";

export type UserId = z.infer<typeof userIdSchema>;
export type KnowledgeKind = z.infer<typeof knowledgeKindSchema>;
export type EvidenceReference = z.infer<typeof evidenceReferenceSchema>;
export type KnowledgeMetadata = z.infer<typeof knowledgeMetadataSchema>;
export type RelationshipState = z.infer<typeof relationshipStateSchema>;
export type ConversationMessage = z.infer<typeof conversationMessageSchema>;
export type ConversationRequest = z.infer<typeof conversationRequestSchema>;

export type LifecycleStatus = "implemented" | "mock" | "planned";

