import { z } from "zod";

export const isoDateTimeSchema = z.iso.datetime({ offset: true });
export const userIdSchema = z.string().min(1).brand<"UserId">();
export const messageIdSchema = z.string().min(1).brand<"MessageId">();

export const knowledgeKindSchema = z.enum(["fact", "inference", "pattern"]);

export const evidenceReferenceSchema = z.object({
  sourceId: z.string().min(1),
  sourceType: z.enum(["message", "event", "observation", "memory"]),
  observedAt: isoDateTimeSchema,
  excerpt: z.string().max(280).optional(),
});

export const knowledgeMetadataSchema = z.object({
  kind: knowledgeKindSchema,
  confidence: z.number().min(0).max(1),
  evidence: z.array(evidenceReferenceSchema),
  firstObservedAt: isoDateTimeSchema,
  lastObservedAt: isoDateTimeSchema,
});

export const relationshipStateSchema = z.object({
  relationshipStartedAt: isoDateTimeSchema,
  relationshipAgeDays: z.number().nonnegative(),
  closeness: z.number().min(0).max(1),
  interactionFrequency: z.enum(["new", "occasional", "regular", "frequent"]),
  tone: z.enum(["gentle", "playful", "direct", "quiet", "warm"]),
  humourLevel: z.number().min(0).max(1),
  affectionLevel: z.number().min(0).max(1),
  recentConnection: z.enum(["distant", "neutral", "connected"]),
  boundaries: z.array(z.string().min(1)),
});

export const conversationMessageSchema = z.object({
  id: messageIdSchema,
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(12_000),
  createdAt: isoDateTimeSchema,
});

export const conversationRequestSchema = z.object({
  userId: userIdSchema,
  message: z.string().trim().min(1).max(12_000),
  recentMessages: z.array(conversationMessageSchema).max(24).default([]),
  localTime: isoDateTimeSchema,
  timeZone: z.string().min(1).max(100),
});
