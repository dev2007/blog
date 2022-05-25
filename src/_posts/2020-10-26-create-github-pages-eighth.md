---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（八）
date: 2020-10-26 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍GitHub Pages的一些杂项

<!-- more -->

# Disqus和Gitalk

GitHub Pages搭建的博客，有时我们想要看到别人的留言。但鉴于GitHub Pages是一个静态站，不涉及动态站可用的数据存储，所以其本身是无法开发留言系统的。这个时候，第三方的留言系统就是一个比较好的选择。

很多Jekyll主题中都开发了留言模块，而他们一般使用的是Disqus，由于国内的网络环境，Disqus基本是不可用的。所以我们需要选择其他留言组件。

Gitalk是基于Git仓库的issues实现的，使用issues来存储用户留言，利用GitHub API来读取issues进行留言操作。

如果要使用Gitalk，按照[Gitalk](https://github.com/gitalk/gitalk)官方教程配置即可。

![gitalk](/assets/img/githubpages/gitalk.jpg)

- 我们先创建一个git仓库用于专门保存评论的issues
- 在用户设置中为gittalk添加OAuth Apps，如下图所示：

![gitalk1](/assets/img/githubpages/gitalk1.jpg)

![gitalk2](/assets/img/githubpages/gitalk2.jpg)

如上图所示，名称任意填写，`Homepage URL`需要注意，如果用于本地调试，可以填写本地的地址，如：`http://localhost:8181`这种，如果是发布后使用，请正确填写发布后的域名，如：`http://blog.shiyueshuyi.xyz`。

需要注意的是Gitalk的配置属性中的id，由于Gitalk使用id作为Git仓库的issues label，而GitHub要求此值不得大于50。所以，直接使用url地址*location.pathname*作为id值，很大可能会超长，导致留言加载异常。

有一种解决方法是引入一个md5算法的js，用md5加密location.pathname，以解决id的唯一和长度要小于50的限制。

> 示例如下,我们引用一个md5的js库，然后将gitalk要使用的id使用md5函数加密。

```html
<script src="https://cdn.jsdelivr.net/npm/md5@2.3.0/dist/md5.min.js"></script>
  <script>
    const gitalk = new Gitalk({
      clientID: '47e4a50d3acdd19c0a4c',
      clientSecret: 'cfaeaedf2c3e16553b9e4f049422815d0888beda',
      repo: 'gitalk-comment',
      owner: 'dev2007',
      admin: ['dev2007'],
      id: MD5(location.pathname),
      distractionFreeMode: false
    })
  </script>
```

# js库的使用

一般来讲，我们使用js有两种方式，一是本地网站中带有相应js的源文件，引用即可使用。二是使用互联网上专门的CDN服务提供的js文件。

第二种方式，我们常用[JSDELIVR](https://www.jsdelivr.com/)。在这个网站上，我们搜索想要用的js库，然后获取dist的发布路径，引用到网站页面中即可使用。

![js](/assets/img/githubpages/js.jpg)

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
