import { MockMemoryRepository } from "@companion/memory";
import type { UserId } from "@companion/shared";
import { MemoryView } from "@companion/ui";

export default async function MemoryPage() {
  const repository = new MockMemoryRepository();
  const items = await repository.getRememberedItems("local-user" as UserId);
  return <MemoryView items={items} />;
}
