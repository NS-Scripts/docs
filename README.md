# Mr-RedM-Scripts Docs

Documentation site for the [Mr-RedM-Scripts](https://github.com/Mr-RedM-Scripts) FiveM/RedM script ecosystem.

🌐 **Live site:** https://mr-redm-scripts.github.io/docs/

Built with [VitePress](https://vitepress.dev/). Deployed automatically to GitHub Pages on every push to `main`.

## Local development

```bash
npm install
npm run docs:dev      # http://localhost:5173/docs/
```

Build:

```bash
npm run docs:build
npm run docs:preview
```

## How docs get updated

Each script's `README.md` is the source of truth for its docs page. From the parent `RedM-Scripts/` workspace:

```bash
# inside a Claude Code session
/sync-docs <script-name>
```

This copies `scripts/<script-name>/README.md` → `scripts/docs/scripts/<script-name>.md`, commits, and pushes. GitHub Actions then rebuilds and redeploys.

For new scripts, also update `.vitepress/config.ts` to add the entry to `nav` and `sidebar`.

## Structure

```
docs/
├── .vitepress/config.ts      # site config (nav, sidebar, theme)
├── .github/workflows/deploy.yml
├── index.md                  # landing page
├── guide/
│   ├── getting-started.md
│   ├── bridge.md
│   └── conventions.md
└── scripts/
    ├── mr-bridge.md          # synced from Mr-RedM-Scripts/mr-bridge/README.md
    └── redm-vineyard.md      # synced from Mr-RedM-Scripts/redm-vineyard/README.md
```

## Why this repo is public

GitHub Pages requires the source repo to be public on the free plan. Documentation is also intended to be publicly accessible — readers shouldn't need org membership. All other Mr-RedM-Scripts repos remain private.

## License

MIT
