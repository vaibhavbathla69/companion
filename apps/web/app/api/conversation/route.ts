import {
  DefaultContextCompiler,
  DeterministicModelRouter,
  MockAIProvider,
} from "@companion/ai";
import { MockMemoryRepository } from "@companion/memory";
import {
  conversationRequestSchema,
  type ConversationMessage,
  type RelationshipState,
} from "@companion/shared";

const relationship: RelationshipState = {
  relationshipStartedAt: "2026-09-22T09:00:00+01:00",
  relationshipAgeDays: 0,
  closeness: 0.18,
  interactionFrequency: "new",
  tone: "warm",
  humourLevel: 0.45,
  affectionLevel: 0.3,
  recentConnection: "connected",
  boundaries: [],
};

export async function POST(request: Request) {
  const parsed = conversationRequestSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return Response.json(
      { error: "Invalid conversation request", issues: parsed.error.issues },
      { status: 400 },
    );

  const input = parsed.data;
  const memoryRepository = new MockMemoryRepository();
  const router = new DeterministicModelRouter();
  const provider = new MockAIProvider();
  const compiler = new DefaultContextCompiler();
  const memory = await memoryRepository.retrieveRelevant({
    userId: input.userId,
    query: input.message,
    at: input.localTime,
    limit: 8,
  });
  const context = await compiler.compile({
    now: input.localTime,
    timeZone: input.timeZone,
    relationship,
    memory,
    recentConversation: input.recentMessages,
  });
  const model = await router.selectModel("conversation");
  const userMessage: ConversationMessage = {
    id: crypto.randomUUID() as ConversationMessage["id"],
    role: "user",
    content: input.message,
    createdAt: input.localTime,
  };

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of provider.stream({
          model,
          system: context.system,
          messages: [...input.recentMessages, userMessage],
        }))
          controller.enqueue(encoder.encode(chunk.text));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-companion-provider": provider.id,
    },
  });
}
