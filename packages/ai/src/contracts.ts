import type { MemoryContext } from "@companion/memory";
import type { ConversationMessage, RelationshipState } from "@companion/shared";
import type { z } from "zod";

export type ModelTask = "conversation" | "memory-extraction" | "consolidation" | "reasoning";

export interface ModelSelection {
  providerId: string;
  modelId: string;
  reason: string;
}

export interface GenerationRequest {
  model: ModelSelection;
  system: string;
  messages: ConversationMessage[];
  temperature?: number;
}

export interface GenerationResult { text: string; model: ModelSelection; }
export interface GenerationChunk { text: string; done: boolean; }

export interface StructuredGenerationRequest<T> extends GenerationRequest {
  schema: z.ZodType<T>;
}

export interface AIProvider {
  readonly id: string;
  generate(request: GenerationRequest): Promise<GenerationResult>;
  stream(request: GenerationRequest): AsyncIterable<GenerationChunk>;
  generateStructured<T>(request: StructuredGenerationRequest<T>): Promise<T>;
}

export interface ModelRouter {
  selectModel(task: ModelTask): Promise<ModelSelection>;
}

export interface ContextCompilerInput {
  now: string;
  timeZone: string;
  relationship: RelationshipState;
  memory: MemoryContext;
  recentConversation: ConversationMessage[];
}

export interface CompiledContext {
  system: string;
  includedMemoryIds: string[];
}

export interface ContextCompiler {
  compile(input: ContextCompilerInput): Promise<CompiledContext>;
}

