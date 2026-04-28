import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'tr-TR',
  title: 'Mr-RedM-Scripts',
  description: 'FiveM ve RedM script dokümantasyonu',

  // Repo serves at https://mr-redm-scripts.github.io/docs/
  base: '/docs/',
  cleanUrls: true,

  // Synced READMEs may reference repo-relative files (./config.lua, ./sql/install.sql)
  // that don't exist in the docs site context. Don't fail the build for those.
  ignoreDeadLinks: [
    /^\.\/.+\.lua$/,
    /^\.\/sql\//,
    /^\.\/config\.lua$/,
  ],

  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#7c2d12' }],
  ],

  themeConfig: {
    logo: undefined, // bir logo eklendiğinde '/logo.svg'

    nav: [
      { text: 'Ana sayfa', link: '/' },
      { text: 'Başlangıç', link: '/guide/getting-started' },
      {
        text: 'Scriptler',
        items: [
          { text: 'mr-bridge', link: '/scripts/mr-bridge' },
          { text: 'redm-vineyard', link: '/scripts/redm-vineyard' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Başlangıç',
          items: [
            { text: 'Genel bakış', link: '/guide/getting-started' },
            { text: 'Bridge mimarisi', link: '/guide/bridge' },
            { text: 'Convention\'lar', link: '/guide/conventions' },
          ],
        },
      ],
      '/scripts/': [
        {
          text: 'Altyapı',
          items: [
            { text: 'mr-bridge', link: '/scripts/mr-bridge' },
          ],
        },
        {
          text: 'Resource\'lar',
          items: [
            { text: 'redm-vineyard', link: '/scripts/redm-vineyard' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Mr-RedM-Scripts' },
    ],

    footer: {
      message: 'MIT lisansı altında yayınlanmıştır.',
      copyright: 'Mr-RedM-Scripts',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Ara', buttonAriaLabel: 'Ara' },
          modal: {
            displayDetails: 'Detayları göster',
            resetButtonTitle: 'Sıfırla',
            backButtonTitle: 'Geri',
            noResultsText: 'Sonuç yok',
            footer: {
              selectText: 'seç',
              navigateText: 'gez',
              closeText: 'kapat',
            },
          },
        },
      },
    },

    outline: { label: 'Bu sayfada' },
    docFooter: { prev: 'Önceki', next: 'Sonraki' },
    lastUpdated: { text: 'Son güncelleme', formatOptions: { dateStyle: 'medium' } },
  },

  lastUpdated: true,
})
