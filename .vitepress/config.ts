import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-US',
  title: 'NS-Development',
  description: 'NS-Development — FiveM and RedM script documentation',

  // Repo serves at https://ns-developments.github.io/docs/
  base: '/docs/',
  cleanUrls: true,

  // Synced READMEs may reference repo-relative files (./config.lua, ./sql/install.sql)
  // that don't exist in the docs site context. Don't fail the build for those.
  ignoreDeadLinks: [
    /^\.\/.+\.lua$/,
    /^\.\/sql\//,
    /^\.\/config\.lua$/,
    /^\.\/html\//,
    /^html\/README/,
  ],

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/docs/logo.png' }],
    ['meta', { name: 'theme-color', content: '#7c2d12' }],
  ],

  markdown: {
    // Custom slugify mirrors GitHub's anchor algorithm exactly. VitePress's
    // default prepends '_' to slugs starting with a digit (legacy HTML4 rule),
    // which breaks links like #7-discord-server-only that READMEs use to point
    // at numbered sections. Our slugify keeps the digit, matching GitHub.
    anchor: {
      slugify: (str: string) =>
        str
          .toLowerCase()
          .trim()
          .replace(/[\s_]+/g, '-')      // spaces & underscores → hyphen
          .replace(/[^\w\-]+/g, '')     // strip everything except word chars and hyphens
          .replace(/--+/g, '-')         // collapse runs of hyphens
          .replace(/^-+|-+$/g, ''),     // trim leading/trailing hyphens
    },
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'NS-Development',

    // No top nav — GitBook-style sidebar-first navigation. The sidebar
    // below is registered globally so every page (including '/') shows it.
    nav: [],

    sidebar: [
      {
        text: 'Core',
        collapsed: false,
        items: [
          { text: 'ns-lib', link: '/scripts/ns-lib' },
        ],
      },
      {
        text: 'Resources',
        collapsed: false,
        items: [
          { text: 'ns-kits', link: '/scripts/ns-kits' },
          { text: 'ns-vineyard', link: '/scripts/ns-vineyard' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/UyyngemnF8' },
      {
        // Store icon (shopping cart SVG) for the Tebex / store link.
        // TODO: replace 'https://example.com' with the actual store URL.
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
        },
        link: 'https://example.com',
        ariaLabel: 'Store',
      },
      { icon: 'github', link: 'https://github.com/NS-Developments' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'NS-Development',
    },

    search: {
      provider: 'local',
    },

    outline: { label: 'On this page' },
    docFooter: { prev: 'Previous', next: 'Next' },
    lastUpdated: { text: 'Last updated', formatOptions: { dateStyle: 'medium' } },
  },

  lastUpdated: true,
})
