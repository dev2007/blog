module.exports = {
  title: '阿呜的边城-Awu\'s blog',
  description: '分享一切与开发编程以及开发者相关的文章。微信公众号：阿呜的编程',
  head: [
    ['link', { rel: 'icon', href: '/favicon/favicon.ico' }],
    ['meta', { name: 'keywords', content: '开发者,程序员,程序猿,程序媛,极客,码农,编程,代码,软件开发,开源,IT网站,技术社区,Developer,Programmer,Coder,Geek,Coding,Code,阿呜的边程,阿呜的编程' }]
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },

  theme: 'meteorlxy',

  plugins: [
    [
      '@vuepress/google-analytics', {
        'ga': ''
      }
    ],
    [
      '@renovamen/vuepress-plugin-baidu-tongji', {
        'ba': '9ddaa27308563507685bc2eb3c09ec28'
      }
    ]
  ],

  themeConfig: {
    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/zh-CN'), {
      home: '阿呜的边城',
      posts: '文章列表',
    }),

    personalInfo: {
      nickname: '阿呜',
      description: '分享与开发者相关的文章。<br/>学而不思则罔，思而不学则殆。',
      location: '中国·成都',
      organization: 'MortNon',
      avatar: '/wolf.png',
      email: 'mortnon@outlook.com',
      sns: {
        github: {
          account: 'dev2007',
          link: 'https://github.com/dev2007',
        },
        juejin: {
          account: 'dev2007',
          link: 'https://juejin.cn/user/2620868693599405',
        },
      },
    },

    header: {
      background: {
        url: '/bg.jpg',
        useGeo: false,
      },
      showTitle: true,
    },

    footer: {
      poweredBy: false,
      poweredByTheme: false,
      custom: '&copy; 2022 <a href="https://github.com/dev2007" target="_blank">阿呜</a>',
    },

    infoCard: {
      headerBackground: {
        url: '',
        useGeo: true,
      },
    },

    lastUpdated: true,

    nav: [
      { text: '阿呜的边城', link: '/', exact: true },
      { text: '文章列表', link: '/posts/', exact: false },
      { text: 'GitHub', link: 'https://github.com/dev2007'}
    ],

    smoothScroll: true,

    // vuepress-plugin-zooming 的配置项
    zooming: {
      // @see https://vuepress.github.io/en/plugins/zooming
    },

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      proxy: 'https://cors-server.bookhub.tech/github_access_token',
      owner: 'dev2007',
      repo: 'gitalk-comment',
      clientId: '2a33e1cb0be96f2d43a3',
      clientSecret: '0da0b8b354365388cceffecd8c62e35393b635af',
    },

    // 分页配置 (可选)
    pagination: {
      perPage: 5,
    },

    // 默认页面（可选，默认全为 true）
    defaultPages: {
      // 是否允许主题自动添加 Home 页面 (url: /)
      home: true,
      // 是否允许主题自动添加 Posts 页面 (url: /posts/)
      posts: true,
    },
  },
}