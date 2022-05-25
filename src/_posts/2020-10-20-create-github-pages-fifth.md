---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（五）
date: 2020-10-22 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍GitHub Pages自定义域名

在**用GitHub Pages搭建博客（二）**中介绍到，默认的GitHub Pages域名就是仓库地址，即：
> 账号名.github.io

<!-- more -->

如果我们要使用自定义域名访问GitHub Pages网站，我们需要进行相应的配置。

# 域名服务商的配置

具体操作可以在域名服务商的网站是查看，以通用方法进行讲解。假设我们的自定义域名为：

> www.shiyueshuyi.xyz

GitHub Pages域名为：

> dev200709.github.io

在域名服务商网站上，我们配置解析规格CNAME，将域名shiyueshuyi.xyz指向域名dev200709.github.io，示例如下图：

![域名配置3](/assets/img/githubpages/domain3.jpg)

此处 **@** 代表所有子域名解析都到*dev200709.github.io*，如果我们只想把子域名解析到相应网站上，我们就填写子域名名称*test*，示例如下图。

![域名配置4](/assets/img/githubpages/domain4.jpg)

通过这个配置，就将自定义域名*test.shiyueshuyi.xyz*指向了GitHub Pages域名，但此时域名还无法使用，需要进一步在GitHub上配置。

# GitHub上配置

点击仓库的“Settings”页签，进入设置页面。

![域名配置1](/assets/img/githubpages/domain.jpg)

在配置页面中，找到"GitHub Pages"配置项，里面可见“Custom domain”，在这里输入你的自定义域名*test.shiyueshuyi.xyz*即可。

![域名配置2](/assets/img/githubpages/domain2.jpg)

配置后，页面将刷新显示检测状态。

![域名配置5](/assets/img/githubpages/domain5.jpg)

如果域名解析正确，将显示如下信息“Your site is published at *自定义域名*”。

![域名配置6](/assets/img/githubpages/domain6.jpg)

同时，在下方的“Enforce Https”可以选择开启，开启后，对网站的访问将只通过https链接。

以上配置成功后，通过自定义域名就可以访问Pags网站。

![域名配置7](/assets/img/githubpages/domain7.jpg)

**注意！注意！注意！**

在[用GitHub Pages搭建博客（四）](/create-github-pages-fourth)中提到_config.yml文件中常有一个属性为自定义域名。

- url

> url 一般是网站部署后的域名，用于访问网页时正确定位资源路径，如果涉及到自定义域名，需要在此配置，才能正确访问。

如果我们按此篇介绍配置域名后，发现网站访问页面异常，出现图片链接不正确、无法加载的情况，就要检查_config.yml文件，将自定义域名加入配置中，并通过Git工具提交更新即可。

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
