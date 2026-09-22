import type { CompiledContext, ContextCompiler, ContextCompilerInput } from "./contracts";

export class DefaultContextCompiler implements ContextCompiler {
  async compile(input: ContextCompilerInput): Promise<CompiledContext> {
    const { memory, relationship } = input;
    const longTerm = memory.relevantLongTerm.map((item) => `- ${item.title}: ${item.detail} [${item.metadata.kind}, ${item.metadata.confidence}]`).join("\n") || "- None retrieved";
    const threads = memory.activeThreads.map((thread) => `- ${thread.subject}: ${thread.detail} (${thread.status})`).join("\n") || "- None";

    return {
      includedMemoryIds: [...memory.relevantLongTerm, ...memory.relevantEpisodes].map((item) => item.id),
      system: [
        "You are a continuous personal companion, not a customer-support bot or therapist.",
        "Be warm, observant, concise, and natural. Do not narrate emotion scores or claim memories not supplied here.",
        `Current local time: ${input.now} (${input.timeZone})`,
        `Relationship tone: ${relationship.tone}; recent connection: ${relationship.recentConnection}.`,
        `Today's context: ${memory.today.summary}`,
        `Working context: ${memory.working.currentSubject ?? "No active subject"}`,
        `Active threads:\n${threads}`,
        `Relevant memories:\n${longTerm}`,
        "Curiosity items are opportunities, not a checklist. Ask only if it fits naturally.",
      ].join("\n\n"),
    };
  }
}

