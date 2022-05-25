---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（三）
date: 2020-10-19 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍通过git工具替换网站主题，并发布

<!-- more -->

# Jekyll和Hexo的简要介绍

&emsp;&emsp;GitHub Pages是基于Jekyll构建的，Jekyll 是一个简单的博客形态的静态站点生产工具，它有一个模版目录，其中包含原始文本格式的文档，通过一个转换器（如 Markdown）和Liquid 渲染器，将我们的的原始文章（Markdown格式文件）转化成静态页面，将整个仓库的文件生成一个完整的可发布的静态网站，而不用手工去对每篇文章都写一个html页面。

&emsp;&emsp;Jekyll依赖于Ruby，如果我们想在本地运行Jekyll，需要安装相应的依赖，而Hexo只依赖于Nodejs，相对要简单些，所以不少人选择使用Hexo来生成网站。

> 本文不介绍本地安装Jekyll和Hexo，因为本地安装的目的，是为了本地可运行、查看网站效果。我们只介绍如何生成Pages网站、如何使用现成的主题，并介绍如何写文章发布，不进行Jekyll主题开发，有需要的可自行研究学习。

# Jekyll主题

&emsp;&emsp;在互联网上有很多开源爱好者，发布了他们开发的Jekyll样式，我们如果不需要自行开发主题，可以选择别人的主题，稍微配置后，即可用于自己的博客。互联网上有很多Jekyll主题站，此处推荐一个[jekyllthemes](http://jekyllthemes.org/)。

![jekyllthemes示例](/assets/img/githubpages/themes.jpg)

- 主题选择和下载

在网站上，我们选择一个自己心仪的主题，点击进入详情页面，可以看到“Download”按钮，点击可进入下载页面。

![jekyll主题选择](/assets/img/githubpages/themes2.jpg)

下载页面一般分为两种：
1. git仓库代码页面
2. git仓库发布页面

代码页面，我们可以点击右上角的“Code”，如果本地电脑上安装有git插件，可以复制Https下载链接，然后在本地git上克隆仓库代码；如果没有，可以直接点击“Download ZIP”下载代码压缩文件。

![jekyll主题下载1](/assets/img/githubpages/themes3.jpg)

发布页面，我们直接点击“Source code”下载源码即可。

![jekyll主题下载2](/assets/img/githubpages/themes4.jpg)

以上两种方式都一样，我们得到别人开发的Jekyll主题代码。

- 主题使用

由于下载的主题文件很多，不方便在GitHub网站上直接进行添加，我们需要在本地使用git工具将主题代码放进我们自己的仓库。

# 安装主题

> 如果你熟悉git的安装和使用，安装及使用可直接跳过。此处我们选择最简单的Git工具进行介绍。

- GitHub官方Desktop安装

官方介绍文档[GitHub Desktop Doc](https://docs.github.com/en/free-pro-team@latest/desktop/installing-and-configuring-github-desktop)

官方下载链接[GitHub Desktop Download](https://desktop.github.com/)

- Git工具安装

[下载链接](https://git-scm.com/download/win)

下载相应的安装程序后，安装git，安装完成后，鼠标右键菜单中就可以看到git相关菜单项。

![git菜单](/assets/img/githubpages/git.jpg)

- GitHub Pages仓库克隆

回到我们的[GitHub](https://github.com/)页面，进入我们的Pages仓库页面。

![git仓库](/assets/img/githubpages/git2.jpg)

点击“Code”，复制HTTPS链接。在本地电脑中，右键选择“Git GUI Here”，再选择“Clone Existing Repository”，将仓库代码克隆到本地。

![git仓库克隆](/assets/img/githubpages/git3.jpg)

![git仓库克隆2](/assets/img/githubpages/git4.jpg)

由于仓库中还有篇二中初始化时添加的文件，现在要使用下载的主题，进入仓库文件夹，先将之前的文件删除，如下图中的index.md和_config.yml文件（注意.git文件夹不可删除）。

![git仓库文件](/assets/img/githubpages/git5.jpg)

原文件删除后，我们将之前下载的主题代码全部复制到文件夹中,然后右键“Git GUI Here”，准备提交代码。

![git添加主题文件](/assets/img/githubpages/git6.jpg)

![git添加主题文件2](/assets/img/githubpages/git7.jpg)

按下快捷键<kbd>Ctrl+I</kbd>,并在弹窗中确认，将当前文件添加，准备提交到仓库。

在右下角“Commit Message”里输入描述，然后点击“Commit”，再点击"Push"推送到GitHub网站上，如果需要账号和密码，输入即可。

![git添加主题文件](/assets/img/githubpages/git8.jpg)

提交成功后，在GitHub仓库中将看到提交的新的主题代码，稍后即可通过域名访问到新的网站风格。

![pages新主题页面](/assets/img/githubpages/git9.jpg)

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
