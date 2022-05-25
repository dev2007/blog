---
category: github
tags: [github pages]
title: GitHub Pages jekyll Liquid 时区timezone问题
date: 2020-11-13 13:50:00 +0800
header-image: /assets/img/terry-vlisidis-SFEvfN01-ao-unsplash.jpg
---

在之前的文章**GitHub Pages**系列中，介绍了使用GitHub Pages搭建博客。但实际运行一段时间后发现，文章显示的时间是UTC时间，而不是北京时间。

显示效果如图所示：

<!-- more -->

![UTC时间](/assets/img/article/showzone.jpg)

实际文章中的时间配置为东八区，北京时间。

如图：

![文章时间](/assets/img/article/sourcezone.jpg)

检查模板可知，我们使用的是jekyll来编译网站，而jekyll使用了Liquid来进行日期格式化。然而liquid并没有直接配置时区的地方。liquid命令介绍：[Liquid](https://liquid.bootcss.com/filters/date/)

如图所示：

![liquid日期](/assets/img/article/liquid.jpg)

通过搜索jekyll相关资料得知，时区配置，是jekyll的属性配置，而不是Liquid格式化时间时进行。

在`_config.yml`文件中添加时区配置：

{% highlight shell %}
  timezone: Asia/Shanghai
{% endhighlight %}

如图：

![配置时区](/assets/img/article/config.jpg)

如果你需要其他时区，配置其他时区即可。

按以上配置后，提交GitHub仓库编译后，显示的日期就是配置的北京时间了。

如图：

![显示北京时间](/assets/img/article/modifyzone.jpg)

*题图来源 ：[unsplash](https://unsplash.com)*
