---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（六）
date: 2020-10-23 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍GitHub Pages网站加速

在上一篇提到如何对GitHub Pages配置自定义域名。其实，不论GitHub Pages的默认域名还是自定义域名，都使用了GitHub的CDN进行加速，虽然速度还行，但总还是觉得有点慢。

<!-- more -->

在互联网，目前有一些提供域名解析、CDN加速的免费网站，其还可以在GitHub中挂载触发器，一旦发现GitHub Pages仓库变化了，立即同步编译发布，减少人工操作。

此处以[Vercel](https://vercel.com)为例进行介绍。

# 账号登录

Vercel支持GitHub账号直接登录，直接使用GitHub账号登录即可。

![vercel0](/assets/img/githubpages/vercel.jpg)

![vercel1](/assets/img/githubpages/vercel1.jpg)

> 此处需要注意，如果使用GitHub账号登录vercel，GitHub账号的主邮箱不能是QQ邮箱，最好用gmail，否则是无法正确登录使用的。

> 如果没有注意，登录失败，提示如下所示的文字，可按提示信息给技术支持邮箱发邮件，要求解禁即可。从对方时区看，只要上班了，很快就会帮你解禁。

*$\color{red}{Error:This user account is blocked. Contact}$ support@vercel.com $\color{red}{for more information.}$*

![vercel blocked](/assets/img/githubpages/block.jpg)

# 导入项目及部署

首次登录Vercel会展示一个大大的“Import Project”，点击这个按钮，输入项目的地址即可

> 项目地址，此处是项目的url地址，即浏览器中看到的地址

![vercel2](/assets/img/githubpages/vercel2.jpg)

![vercel3](/assets/img/githubpages/vercel3.jpg)

只要输入的项目是属于你登录的GitHub账号所有的，Vercel就会开始同步项目，中间可能还会提示为项目安装Vercel插件，同意即可。如果导入时提示无权限，如下图所示，按提示点击“GitHub App Settings”，进入GitHub设置项，为相应项目开启Vercel访问权限即可。

![vercel4](/assets/img/githubpages/vercel4.jpg)

![vercel5](/assets/img/githubpages/vercel5.jpg)

![vercel6](/assets/img/githubpages/vercel6.jpg)

项目导入成功后，会自动识别出项目为Jekyll，并自动配置编译项，什么都不用动，直接点击“Deploy”进行部署即可。

![vercel7](/assets/img/githubpages/vercel7.jpg)

开始部署后，等待即可，成功后页面会撒花。

![vercel8](/assets/img/githubpages/vercel8.jpg)

![vercel9](/assets/img/githubpages/vercel9.jpg)

# 自定义域名

部署成功后，我们点击“Visit”，可以通过Vercel分配的域名访问我们的GitHub Pages网站。

![vercel10](/assets/img/githubpages/vercel10.jpg)

我们使用Vercel的目的，就是想通过它进行网站访问加速，所以此处，我们要将上一篇配置的自定义域名解析到Vercel上来，这样，访问将会直接导向Vercel，而不是GitHub。

部署成功后点击“Open Dashboard”或者回到网站首页，找到项目点击进入详情后，点击项目的“Settings”进入设置页面。

![vercel11](/assets/img/githubpages/vercel11.jpg)

点击左侧“Domains”，进入域名配置页面，输入我们的自定义域名，点击“Add”，页面将提示我们如何在域名服务商网站上进行解析配置。

![vercel12](/assets/img/githubpages/vercel12.jpg)

![vercel13](/assets/img/githubpages/vercel13.jpg)

按上图的提示信息，我们将上一篇[用GitHub Pages搭建博客（五）](/create-github-pages-fifth)中配置的域名修改指向Vercel地址即可。

![vercel14](/assets/img/githubpages/vercel14.jpg)

修改成功后，对自定义域名的访问将指向Vercel网站。可以很明显看到访问速度大辐提升。

至此，通过Vercel配置加速网站访问介绍完成。

> 需要注意的一点是，当把自定义域名指向Vercel的域名后，按[用GitHub Pages搭建博客（五）](/create-github-pages-fifth)中，对GitHub仓库中设置的域名配置将失效，进入项目设置，查看GitHUb Pages配置项时也会看到相应提示信息。如果有洁癖的话，可以按提示移除域名配置，当然，不移除也没有影响。


***上一篇：[用GitHub Pages搭建博客（五）](/create-github-pages-fifth)***

***下一篇：[用GitHub Pages搭建博客（七）](/create-github-pages-seventh)***

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*