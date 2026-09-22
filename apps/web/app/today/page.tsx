import { MockMemoryRepository } from "@companion/memory";
import type { UserId } from "@companion/shared";
import { TodayView } from "@companion/ui";

export default async function TodayPage() {
  const repository = new MockMemoryRepository();
  const userId = "local-user" as UserId;
  const [today, threads] = await Promise.all([
    repository.getDailyMemory(userId, new Date().toISOString().slice(0, 10)),
    repository.getActiveThreads(userId),
  ]);
  return <TodayView today={today} threads={threads} />;
}
