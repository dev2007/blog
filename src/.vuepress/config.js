module.exports = {
  title: "阿呜的边城-Awu's World",
  description:
    "分享一切与开发编程以及开发者相关的文章。微信公众号：程序员爱读书",
  head: [
    ["link", { rel: "icon", href: "/favicon/favicon.ico" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "开发者,程序员,程序猿,程序媛,极客,码农,编程,代码,软件开发,开源,IT网站,技术社区,Developer,Programmer,Coder,Geek,Coding,Code,阿呜的边程,阿呜的编程",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    },
  },

  theme: "meteorlxy",

  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "",
      },
    ],
    [
      "@renovamen/vuepress-plugin-baidu-tongji",
      {
        ba: "9ddaa27308563507685bc2eb3c09ec28",
      },
    ],
  ],

  themeConfig: {
    lang: Object.assign(require("vuepress-theme-meteorlxy/lib/langs/zh-CN"), {
      home: "❤️学而不思则罔，思而不学则殆❤️",
      posts: "文章列表",
    }),

    personalInfo: {
      nickname: "阿呜",
      description:
        '‍📢云原生框架 Micronaut 推广者<br/>☁️云计算从业者<br/>🌱高级软件工程师<br/>☘️系统架构师<br/>💻个人空间：<a href="https://luansheng.fun">https://luansheng.fun</a><br/>📱公众号：程序员爱读书</br><img src="https://images.bookhub.tech/mp/mp.png" width="60%"/>',
      location: "中国·成都",
      organization: "MortNon",
      avatar: "https://images.bookhub.tech/mp/avatar.jpg",
      email: "mortnon@outlook.com",
      sns: {
        github: {
          account: "dev2007",
          link: "https://github.com/dev2007",
        },
        juejin: {
          account: "dev2007",
          link: "https://juejin.cn/user/2620868693599405",
        },
      },
    },

    header: {
      background: {
        url: "/bg.jpg",
        useGeo: false,
      },
      showTitle: true,
    },

    footer: {
      poweredBy: false,
      poweredByTheme: false,
      custom:
        `<div style="display:flex;flex-direction:column"><span>&copy; 2022~2024 阿呜</span>
        <div style="display:flex;flex-direction:row;justify-content:center">
        <a href="https://beian.miit.gov.cn" target="_blank" style="color: rgb(102, 102, 102);" onmouseover="this.style.color='rgb(30, 144, 255)'" onmouseout="this.style.color='rgb(102,102,102)'">蜀ICP备2024097210号</a>
        
        <div style="display:flex;align-items:center;margin-left:8px">
        <img src="logo01.png" style="width:16px;height:16px">
        <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51018002000252" target="_blank" style="color: rgb(102, 102, 102);" onmouseover="this.style.color='rgb(30, 144, 255)'" onmouseout="this.style.color='rgb(102,102,102)'">川公网安备51018002000252号</a>
        </div>
        </div></div>`,
    },

    infoCard: {
      headerBackground: {
        url: "",
        useGeo: true,
      },
    },

    lastUpdated: true,

    nav: [
      { text: "程序员爱读书", link: "/", exact: true },
      { text: "文章列表", link: "/posts/", exact: false },
      { text: "GitHub", link: "https://github.com/dev2007" },
      { text: "Micronaut", link: "https://micronaut.bookhub.tech" },
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
    comments: false,

    // 分页配置 (可选)
    pagination: {
      perPage: 10,
    },

    // 默认页面（可选，默认全为 true）
    defaultPages: {
      // 是否允许主题自动添加 Home 页面 (url: /)
      home: true,
      // 是否允许主题自动添加 Posts 页面 (url: /posts/)
      posts: true,
    },
  },
};
