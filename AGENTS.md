# Repository Guide

## Runtime and Structure

- Run commands from the repository root. `src/server.ts` resolves `index.html` from `process.cwd()`.
- `npm run web` starts the server on `127.0.0.1:8888`; override with `PORT`. `npm run web:watch` restarts it on source changes.
- There is no frontend build step: `src/server.ts` serves the single-file UI in `index.html`. The browser calls the local `/api/*` routes; the server keeps remote bearer tokens in an in-memory, sliding eight-hour session map.
- Remote API behavior is split between payload/orchestration in `src/services/institucional.service.ts` and HTTP endpoints in `src/services/institucional.request.ts`.

## Environment and Secrets

- Keep separate `.env.dev` and `.env.hml` files for integration tests; they require `BASE_URL_API`, `LOGIN_CPF`, and `LOGIN_SENHA`. The web login receives its environment URL from `index.html` and validates it against the fixed DEV/HML URLs in `src/server.ts`.
- `.env*`, institutional credentials, bearer tokens, and the tracked `auth.json` are sensitive. Do not print their contents or introduce credentials into source files.

## Tests and Verification

- `npm run test:dev` and `npm run test:hml` are live integration suites, not isolated tests: they authenticate to the selected remote environment and create real person records. Do not run them as routine verification without explicit intent and valid credentials.
- Focus one integration case with `npm run test:dev -- -t "CRIAR DEFENSOR"` (or the HML script). Test names are in `src/services/institucional.spec.ts`.
- Do not use `npm test` as the project suite in its current state. It starts a headed Playwright watcher for missing `src/test.spec.ts`; the legacy browser flow instead lives at `src/services/test.ts` and is not wired to that script.
- No lint, formatter, build, or standalone typecheck command is configured. Do not invent an `npm run` target when reporting verification.

## Change Coupling

- Keep `environmentBaseUrls` synchronized between `index.html` and `src/server.ts`; the server rejects mismatched environment/URL pairs.
- When adding or renaming a vínculo or natureza, update all three representations: controls and `naturezas` in `index.html`, `CreateInput`/constants/payload branches in `src/services/institucional.service.ts`, and `createInputSchema` in `src/server.ts`.
- Preserve exact accented and uppercase remote enum strings such as `ESTÁGIO`, `SERVIDOR(A)`, and `Não Obrigatório`; they are API values, not display-only labels.
- Creation tests depend on mutable remote lookup data and hard-coded payload IDs, UUIDs, dates, and labels in `institucional.service.ts`; a remote failure is not automatically a local regression.
