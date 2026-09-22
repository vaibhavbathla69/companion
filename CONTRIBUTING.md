# Contributing

## Working agreement

1. Create a focused branch from `main`: `feature/...`, `fix/...`, `docs/...`, or `chore/...`.
2. Keep changes inside the owning package when possible.
3. Discuss changes to exported contracts before implementation because multiple packages may consume them.
4. Run `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` before requesting review.
5. Never commit `.env`, `.env.local`, credentials, access tokens, production data, or copied private conversations.

## Commits

Use concise Conventional Commit-style subjects:

```text
feat(ui): add listening state transition
feat(memory): implement postgres active-thread repository
fix(ai): bound retrieved episode count
docs: clarify daily consolidation ownership
```

Prefer meaningful milestones over commits for every edited file. Avoid combining formatting, contract redesign, and feature work in one commit.

## Contract changes

Schemas crossing package boundaries should:

- remain provider- and database-neutral;
- validate data at external boundaries;
- distinguish required data from future optional data;
- preserve evidence, confidence, and knowledge kind for remembered claims;
- include tests demonstrating the intended behavior.

## Pull requests

Describe what is **implemented**, **mocked**, and **planned**. Include screenshots for visual changes and migration/recovery notes for persistence changes. Do not describe a placeholder adapter as an integration.
