---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（二）
date: 2020-10-19 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍基本GitHub Pages的搭建流程

# GitHub账号及仓库创建

- 登录[GitHub](https://github.com/)，录入用户名、邮箱、密码，创建成功后登录进入。

![创建账号](/assets/img/githubpages/passport.jpg)

<!-- more -->

> 注册时，邮箱建议不使用QQ邮箱。因为一些第三方部署类网站不支持GitHub的QQ邮箱，如果已经使用QQ邮箱，在遇到这种情况时，可以在GitHub的个人设置中修改主邮箱账号。

> 用户名可选择一个有意思的名称，因为GitHub Pages的默认域名使用的用户名。

- 点击页面右上角的＋号，[新建代码仓库](https://github.com/new)。

![新建仓库](/assets/img/githubpages/repsitory.jpg)

- 仓库地址需要使用GitHub Pages的地特定地址：
**账号名.github.io** 这个地址也是Pages的域名。

![输入仓库名](/assets/img/githubpages/repository2.jpg)

如上图所示，如果地址无冲突，显示绿色的勾，即表示可以创建。点击按钮“Create reposity”创建仓库。成功后显示如下图所示。

![创建仓库成功](/assets/img/githubpages/repository3.jpg)

# Git Pages初始配置
> 通过Git 仓库创建，我们得到一个空仓库，还不具备任何内容。我们先将仓库初始化为GitHub Pages，使之可以通过域名访问。
- 点击仓库右上角的“Settings”，进入仓库的设置页面。

![设置仓库](/assets/img/githubpages/pages.jpg)

- 翻动设置页面，找到“GitHub Pages”选项。由于我们仓库还是空的，此处的设置也是很简单

![设置pages](/assets/img/githubpages/pages2.jpg)

- 点击“Choose a theme”，进入页面，为GitHub Pages选择一个主题，确认后点击“Select theme”选中主题。

![选择主题](/assets/img/githubpages/pages3.jpg)

- 主题选择后，系统会为仓库添加主题的配置文件，页面会跳转到文件编辑提交页面，直接点击“Commit changes”即可。

![仓库文件编辑](/assets/img/githubpages/pages4.jpg)
![仓库文件保存](/assets/img/githubpages/pages5.jpg)

- 提交文件保存后，仓库显示当前文件内容，表明文件已保存，选择的主题配置文件已存入仓库

![仓库文件已保存](/assets/img/githubpages/pages6.jpg)

- 稍等片刻，在浏览器输入仓库名称，也就是GitHub分配的域名，即可访问
> 账号名称.github.io

![访问pages](/assets/img/githubpages/pages7.jpg)

至此，GitHub Pages初始设置完成，我们得到一个可见的静态网站。进一步，如果自己设置网站风格，如何写文章，将在后续介绍。

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
