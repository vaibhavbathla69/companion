import type { ModelRouter, ModelSelection, ModelTask } from "./contracts";

export class DeterministicModelRouter implements ModelRouter {
  constructor(private readonly developmentModel = "local-companion-v1") {}

  async selectModel(task: ModelTask): Promise<ModelSelection> {
    return {
      providerId: "mock",
      modelId: this.developmentModel,
      reason: `Deterministic local route for ${task}`,
    };
  }
}
