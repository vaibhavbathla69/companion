import type {
  AIProvider,
  GenerationChunk,
  GenerationRequest,
  GenerationResult,
  StructuredGenerationRequest,
} from "./contracts";

function replyFor(message: string): string {
  const value = message.toLowerCase();
  if (value.includes("hello") || value.includes("hey") || value.includes("hi"))
    return "Hey. I was wondering when you'd appear. How's the evening treating you?";
  if (value.includes("tired"))
    return "Then let's not make tonight carry more than it needs to. Was it the work, or just one of those strangely heavy days?";
  if (value.includes("prototype") || value.includes("build"))
    return "The prototype is starting to feel real. The interesting question now isn't what it can do—it’s what you want it to feel like when you come back tomorrow.";
  return "I’m with you. Tell me the part of that which is still circling in your head.";
}

export class MockAIProvider implements AIProvider {
  readonly id = "mock";

  async generate(request: GenerationRequest): Promise<GenerationResult> {
    const latest = request.messages.at(-1)?.content ?? "";
    return { text: replyFor(latest), model: request.model };
  }

  async *stream(request: GenerationRequest): AsyncIterable<GenerationChunk> {
    const result = await this.generate(request);
    const words = result.text.split(" ");
    for (let index = 0; index < words.length; index += 1) {
      yield {
        text: `${index === 0 ? "" : " "}${words[index]}`,
        done: index === words.length - 1,
      };
    }
  }

  async generateStructured<T>(
    _request: StructuredGenerationRequest<T>,
  ): Promise<T> {
    throw new Error(
      "Structured generation is planned and is not fabricated by the mock provider.",
    );
  }
}
