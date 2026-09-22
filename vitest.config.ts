import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@companion/ai": fileURLToPath(
        new URL("./packages/ai/src/index.ts", import.meta.url),
      ),
      "@companion/memory": fileURLToPath(
        new URL("./packages/memory/src/index.ts", import.meta.url),
      ),
      "@companion/shared": fileURLToPath(
        new URL("./packages/shared/src/index.ts", import.meta.url),
      ),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
