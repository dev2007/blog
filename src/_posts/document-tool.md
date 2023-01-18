---
category: document
tags: [document]
title: 文档工具怎么选？一次性告诉你
date: 2023-01-18 09:00:00 +0800
header-image: /assets/img/safar-safarov-MSN8TFhJ0is-unsplash.jpg
---

一个好的软件，需要一个好的文档，一个好的文档，需要一个好的工具。工欲善其事，必先利其器。

在我们写文档之前，选择一个好的工具，将会使用我们的工作事半工倍。

## 百花齐放的工具

文档工具的本质，其实都是将我们的文档内容标准化，在互联网环境上的文档，一般目前比较主流的是生成文档的 html 网页内容，而文档内容的作者都比较倾向于使用纯文本的 Markdown 进行书写，所以文档工具的核心内容主要就是将 Markdown 转换为一个 html 的网站内容。

目前市面上比较常见的工具有如下这些，以首字母排序：

- Gitbook
- Docsify
- Docute
- Docusaurus
- Hexo
- Loppo
- Vuepress

这些工具我们一一道来。

## GitBook

首先不推荐 GitBook，原因是项目已经几年没有维护了，列在此处，仅做对比。

GitBook 的项目地址为 [GitBook GitHub](https://github.com/GitbookIO/gitbook)，官网为 [GitBook 官网](https://www.gitbook.com/)。

页面效果如下图：

![gitbook demo](/assets/img/tool/1.png)

由于不推荐，更多信息不再介绍。

## Docsify

Docsify 的项目地址为 [Docsify GitHub](https://github.com/docsifyjs/docsify)，官网为 [Docsify 官网](https://docsify.js.org/#/zh-cn/)。

页面效果如下，有一个封面页和正文页：

![docsify cover](/assets/img/tool/2.png)

![docsify demo](/assets/img/tool/3.png)

Docsify 是一个文档网站生成器，它依赖于 `node.js`，但不生成静态 html 文件，运行速度快，有很多插件。

环境配置难度低于编译型工具，同时有一个很炫酷的封面页，很好看，支持页内搜索和搜索插件，但它不会生成静态 html 文件，不利于搜索引擎收录，并且对于段落引用不支持，很多文档中的“解释”、“提示”项难以实现。

## Docute

不推荐 Docute，原因同样是项目已不再维护。

Docute 项目地址为 [Docute GitHub](https://github.com/egoist/docute)，官网已不可访问。

## Docusaurus

Docusaurus 项目地址为 [Docusaurus GitHub](https://github.com/facebook/docusaurus)，官网为 [Docusaurus 官网](https://docusaurus.io/zh-CN/)


页面效果如下，有一个封面页和正文页：

![Docusaurus cover](/assets/img/tool/4.png)

![Docusaurus demo](/assets/img/tool/5.png)

Docusaurus 可以帮助你在极短时间内搭建漂亮的文档网站。它依赖于 `node.js`，同时前端框架为 `React`，也支持 `TypeScript`，能够开箱即用。

它有着漂亮的首页，支持不同的主题切换，支持页面搜索和搜索插件，支持连续的引用符号 `<` 生成好看的段落引用，还能为每页生成元数据，利于搜索引擎收录。

## Hexo

Hexo 项目地址为 [Hexo GitHub](https://github.com/hexojs/hexo)，官网为 [Hexo 官网](https://hexo.io/zh-cn/)。

![Hexo cover](/assets/img/tool/10.png)

![Hexo demo](/assets/img/tool/7.png)

Hexo 是一个快速、简洁、高效的博客框架，基于 `node.js`，由于本身只是框架，更多功能还需要主题插件支持，它更适合用作博客网站，而非文档网站。

## Loppo

Loppo 项目地址为 [Loppo GitHub](https://github.com/ruanyf/loppo)，示例网站为 [Loppo 示例](http://redux.ruanyifeng.com/)。

页面效果如下：

![Loppo demo](/assets/img/tool/6.png)

Loppo 是阮一峰大佬的一个项目，目前还比较简单，不推荐用于正式的文档网站。

## Vuepress

Vuepress 项目地址为 [Vuepress GitHub](https://github.com/vuejs/vuepress)，官网为 [Vuepress 官网](https://vuepress.vuejs.org/zh/)。

页面效果如下，有一个封面页和正文页：

![Vuepress cover](/assets/img/tool/8.png)

![Vuepress demo](/assets/img/tool/9.png)

Vuepress 依赖于 `node.js`，有很多插件，会进行本地编译，为每个页面生成单独的 html 文件，有利于搜索引擎收录，支持页内搜索和搜索插件，支持段落引用扩展语法 `:::tip`。

## 整体对比


|工具|入门难度|目录菜单|导航栏菜单|搜索|段落引用|文档易读性|
|--|--|--|--|--|--|--|
|`Docsify`|低|手工/自动配置|支持|支持|难看|一般|
|`Docusaurus`|低|手工/自动配置|支持|支持|好|好|
|`Hexo`|低|主题支持|支持|支持|未知|一般|
|`Loppo`|中|不支持|不支持|不支持|未知|无|
|`Vuepress`|低|手工/自动配置|支持|支持|好|好|

从对比看，常见的这些文档工具都是基于 `node.js` 构建，区别只在于插件定制化、段落引用、搜索引擎支持等点上。从实际应用及对比来看，推荐优先选择 `Docusaurus` 和 `Vuepress` 工具来构建文档网站。

