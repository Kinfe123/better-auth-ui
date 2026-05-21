# Agent Instructions
Use this file when an AI coding agent edits the generated documentation PR.
## Documentation Source
- The docs source lives in `apps/docs`.
- `docs.json` is the Docs Cloud configuration for publishing, previews, and content roots.
- Keep every page grounded in README, package metadata, source exports, CLI help, environment examples, or existing docs.
## Generated Docs Map
- /docs - Better-Auth UI
- /docs/installation - Installation
- /docs/quickstart - Quickstart
- /docs/features - Features
- /docs/features/readme-feature-integration - Integration
- /docs/features/readme-feature-ui-components - UI Components
- /docs/frontend - Frontend
- /docs/frontend/application - Frontend Application
## Editing Rules
- Prefer reader-facing task explanations over source inventories.
- Do not add commands, flags, environment variables, routes, imports, or framework names unless they are present in the repository.
- If you add or rename a page, keep its frontmatter title and description accurate and make sure the navigation ordering still includes it.
- Avoid analyzer language such as generated from, source evidence, implementation map, source surface, or detected in files.
## Verification
- Build the docs site with `cd apps/docs && pnpm install && pnpm build` before handing off a docs PR.
- Open `/docs` and at least one generated leaf page to confirm the sidebar and page content match the PR.
