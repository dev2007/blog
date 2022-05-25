---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（七）
date: 2020-10-24 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍百度统计、百度搜索

一般来讲，部署了一个网站后，我们需要知道网站的浏览量，以便知道网站是否有人访问。

<!-- more -->

在Jekyll的模板中，由于国外开发者更多，一般的主题默认都开发了谷歌统计（Google analytics）。但由于谷歌在国内不可访问，如果使用谷歌统计是难用的。所以建议国内还是使用百度统计。

我们在_config.yml中就可以看到，很多主题都有针对谷歌统计的配置项，如下图所示：

![统计](/assets/img/githubpages/search.jpg)

> 如果使用谷歌统计，可以在此填入自己申请的谷歌统计的相应id。

# 百度统计

首先，登录[百度统计](https://tongji.baidu.com/)，进入网站后，有百度账号可以直接登录，没有的话，注册一个账号登录即可。

然后，进入管理页面，默认后进入“网站列表”页面，如下图所示。

![统计1](/assets/img/githubpages/tongji.jpg)

在“网站列表”中，点击“新增网站”，进入页面就可以添加我们的Pages网站。

![统计2](/assets/img/githubpages/tongji2.jpg)

![统计3](/assets/img/githubpages/tongji3.jpg)

如上图，在添加页面中，正确填写要统计的网站的域名。注意，如果Pages网站使用的是子域名，那这里就填写子域名。添加完成后，将会跳转到代码获取页面。

![统计4](/assets/img/githubpages/tongji4.jpg)

按照页面指引，我们复制这段js到我们的Pages网站的页面中即可，提交后，等GitHub编译完成或者Vercel编译完成后，在百度统计页面检测代码成功，就验证统计代码配置成功。

针对Jekyll特别说明一下。由于博文这些都是由md文件生成的，如果要访问统计这些页面，是没有直接的html页面可以添加统计代码的。这个时候，需要观察主题项，找一下是否有谷歌统计的子页面，如果有的话，可以修改内容为百度统计的代码即可。实在不行，在index.html中引入百度统计代码也行。如下图所示，就是谷歌统计在我的主题中的情况。

![统计5](/assets/img/githubpages/tongji5.jpg)

![统计6](/assets/img/githubpages/tongji6.jpg)

# 百度搜索

如果我们还是将域名指向GitHub的网站页面，百度搜索是不会收录的！原因听说是百度以前爬GitHub太狠了，所以GitHub屏蔽了百度的爬虫。

如果你想让网站被百度收录，[用GitHub Pages搭建博客（六）](/create-github-pages-sixth)中提到的Vercel就是一种解决方法。把域名指向部署在在Vercel的GitHub Pages网站，而Vercel不会拒绝百度的爬虫。

另外，如果想加速百度收录，还可以在[百度资源](https://ziyuan.baidu.com/)添加自己的网站，主动向百度提交网站链接。

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
