import {
  knowledgeMetadataSchema,
  isoDateTimeSchema,
  userIdSchema,
} from "@companion/shared";
import { z } from "zod";

export const workingMemorySchema = z.object({
  currentActivity: z.string().nullable(),
  currentLocation: z.string().nullable(),
  currentSubject: z.string().nullable(),
  expiresAt: isoDateTimeSchema.nullable(),
});

export const activeThreadSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  detail: z.string().min(1),
  status: z.enum(["open", "waiting", "resolved"]),
  relevantAfter: isoDateTimeSchema.optional(),
  updatedAt: isoDateTimeSchema,
});

export const curiosityItemSchema = z.object({
  id: z.string().min(1),
  subject: z.string().min(1),
  priority: z.enum(["low", "medium", "high"]),
  reason: z.string().min(1),
  earliestAppropriateAt: isoDateTimeSchema,
  expiresAt: isoDateTimeSchema.optional(),
  status: z.enum(["pending", "asked", "dismissed", "expired"]),
});

export const dailyMemorySchema = z.object({
  userId: userIdSchema,
  localDate: z.iso.date(),
  summary: z.string(),
  mood: z.string().nullable(),
  activities: z.array(z.string()),
  peopleMentioned: z.array(z.string()),
  plans: z.array(z.string()),
  unresolvedTopics: z.array(z.string()),
  updatedAt: isoDateTimeSchema,
});

export const rememberedItemSchema = z.object({
  id: z.string().min(1),
  category: z.enum([
    "about",
    "people",
    "memory",
    "goal",
    "current-life",
    "pattern",
  ]),
  title: z.string().min(1),
  detail: z.string().min(1),
  metadata: knowledgeMetadataSchema,
});

export const memoryContextSchema = z.object({
  working: workingMemorySchema,
  today: dailyMemorySchema,
  activeThreads: z.array(activeThreadSchema),
  relevantLongTerm: z.array(rememberedItemSchema),
  relevantEpisodes: z.array(rememberedItemSchema),
  curiosityOpportunities: z.array(curiosityItemSchema),
});

export type WorkingMemory = z.infer<typeof workingMemorySchema>;
export type ActiveThread = z.infer<typeof activeThreadSchema>;
export type CuriosityItem = z.infer<typeof curiosityItemSchema>;
export type DailyMemory = z.infer<typeof dailyMemorySchema>;
export type RememberedItem = z.infer<typeof rememberedItemSchema>;
export type MemoryContext = z.infer<typeof memoryContextSchema>;
