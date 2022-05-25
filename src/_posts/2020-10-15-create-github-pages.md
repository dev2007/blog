---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（一）
date: 2020-10-15 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

# 什么是GitHub Pages

GitHub官网介绍 [GitHub Pages](https://pages.github.com/)

官网是这样介绍的：
> Websites for you and your projects.

> 给你和你的项目的网站。

> Hosted directly from your GitHub repository. Just edit, push, and your changes are live.

> 从你的GitHub仓库中直接托管。只用编辑、发布，你的修改直接生效。

<!-- more -->

从官网的介绍讲，GitHub Pages是GitHub提供的一个网站托管服务，它将你指定的git仓库托管为网站进行展示。而托管的这个仓库中的静态网页内容，一般用于介绍你的其他git项目。

大白话就是，你做了个git项目，你要怎么宣传它，怎么介绍它，GitHub帮你想好了，你直接写点静态网页，它帮你托管成网站。真的贴心。

有同学要提问了：我又没有git项目要介绍，这对我有什么用？

非也。由于GitHub Pages并不真的要求只用于介绍git项目，所以Pages其实可以用于任何静态网页内容的展示，比如你将它定位为一个博客（技术博客、美食博客、旅游博客），发布自己的博客内容也是可以的。

本博客就是使用GitHub Pages托管的静态网页内容。

# GitHub Pages网站基础介绍

* 网站只支持静态网页，即html+css+js
* Pages支持Jekyll（Jekyll可以将md文件使用转换为静态网页，维护更方便）
* Pages网站本质是git仓库，所以更新网站就是使用git更新仓库
* GitHub Pages可以绑定自己的域名

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
