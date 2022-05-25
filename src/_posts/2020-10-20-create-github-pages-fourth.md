---
category: github
tags: [github pages]
title: 用GitHub Pages搭建博客（四）
date: 2020-10-20 09:00:00 +0800
header-image: /assets/img/linus-nylund-unsplash-small.jpg
---

> 本篇介绍配置网站参数及发布文章

GitHub Pages一般使用的Jekyll，配置项基本都设置在_config.yml文件中，在此文件中，按参数描述进行配置即可。此处以上一篇使用的Jekyll主题为例进行介绍。

<!-- more -->

# 网站参数配置

![_config.yml](/assets/img/githubpages/config.jpg)

如上图所示，常规的_config.yml中，常见的配置有以下：

- title

> title一般是网站的名称，显示在浏览器的页签上。

- description

> descripton一般是网站的描述，由Jekyll生成html元素添加在静态网页中

- url

> url 一般是网站部署后的域名，用于访问网页时正确定位资源路径，如果涉及到自定义域名，需要在此配置，才能正确访问。

- baseurl

> baseurl一般是指当前网站的内容路径，如果就在根目录下，就默认为“/”或“”，如果放在下一级目录中，需要在此配置指定。

- author

> author相关项，一般是主题作者定义的属性，用于配置在网站上显示的作者相关信息，按_config.yml中的注释进行配置即可

- 其他项

> 其他项可以看主题作者的注释，一般涉及到网站的访问统计、搜索、留言组件的相关配置。除去作者定义的其他项，剩下的就是Jekyll本身的一般配置项，如plugins、kramdown之类的。这些Jekyll相关的，只有需要自行修改、开发主题的才涉及，我们只使用现在主题，不涉及。

# 创建文章

一般来说，GitHub Pages使用Jekyll主题，文章一般是放在目录_posts下，我们只要使用Markdown语法书写好文章放入此目录即可。

文章由于要被Jekyll转换为静态网页，所以需要按主题作者的配置，在文件中添加相关的属性说明，比如文章的名称等，详情的介绍。在[用GitHub Pages搭建博客（三）](/create-github-pages-third)中，挑选Jekyll主题时，每个主题的详情网站中都有介绍。

我们可以直接看我们下载的主题_posts目录中的示例文章的格式，按此格式创建我们的文章即可。此处还是以上一篇使用的Jekyll主题为例进行介绍。

![文章样式](/assets/img/githubpages/post.jpg)

如上图，我们看到文章的文件名格式，是日期+文章名，文件扩展名为md。我们新建文章时，按此规则创建文件名即可。

![文章样式2](/assets/img/githubpages/post2.jpg)
如上图，我们看具体文件内容。在文件头部，由“---”包围的是文章的相关属性，在“---”之后的是文章具体内容。我们新建的文章，也按此规则先填写文章属性，再写文章内容即可。以上图为例，文章属性有如下：

- title

> title一般是文章标题，为在网页中显示

- layout

> layout推荐代表文章所属，具体需要看作者的说明

- categories

> categories指文章的分类

- image

> image指文章的配图，一般显示在文章开头

- description

> description指文章的描述信息，常显示在生成的静态网页的head中，用于搜索网站采集。

按照以上规则，在文件中填写文章的属性后，开始书写文章内容，完成后，将文件保存在_posts目录中，然后按照：[用GitHub Pages搭建博客（三）](/create-github-pages-third)中提交主题的方式，将文章提交到仓库即可。

稍等片刻，如果没有异常，在网站中即可看到我们新加的文章。
> 网站地址：用户名.github.io

*题图来源 ：[unsplash @doto](https://unsplash.com/@doto)*
