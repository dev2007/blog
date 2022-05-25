---
category: github
tags: [github pages]
title: GitHub Pages Jekyll 代码高亮
date: 2020-11-16 10:20:00 +0800
header-image: /assets/img/terry-vlisidis-SFEvfN01-ao-unsplash.jpg
---

> 本文介绍Jekyll代码高亮

GitHub Pages目前使用的Jekyll 3.0，和我们博客相关的特性就有：

- 仅支持kramdown解析Markdown
- 仅支持Rouge作为Markdown代码语法高亮

<!-- more -->

我们可以在`_config.yml`文件中看到相关配置如下：

{% highlight yaml %}
markdown: kramdown
highlighter: rouge
kramdown:
  syntax_highlighter: rouge
{% endhighlight %}

按以上配置后，通过Jekyll编译生成的静态网页就会使用Rouge进行代码高亮。但是代码风格如何，还需要我们添加Rouge使用的`css`文件。

官方讲，本地安装了Jekyll一整套环境和Rouge后，可能通过命令生成相应主题的`css`文件到指定目录下，命令如下：

{% highlight shell %}
rougify style monokai.sublime > assets/css/syntax.css
{% endhighlight %}

然后将在我们的GitHub Pages的`html`页面中引用该文件。一般我们会使用一个`head.html`文件作为所有`html`文件的头部，所以可以直接将该`css`文件在`head.html`引用即可。

{% highlight html %}
<link rel="stylesheet" href="/assets/css/syntax.css">
{% endhighlight %}

代码块高亮，我们使用`html`块进行包裹，示例如下：

{% raw %}
{% highlight java %}
///代码部分
{% endhighlight %}
{% endraw %}

语言高亮示例：

![](/assets/img/githubpages/hightlight.jpg)

`java`:

{% highlight java %}
package xyz.shiyueshuyi.esclientplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EsClientPlusApplication {

	public static void main(String[] args) {
		SpringApplication.run(EsClientPlusApplication.class, args);
	}

}
{% endhighlight %}

如果按常见的&#96;&#96;&#96;java形式进行代码包裹，效果如下：

```java
package xyz.shiyueshuyi.esclientplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EsClientPlusApplication {

	public static void main(String[] args) {
		SpringApplication.run(EsClientPlusApplication.class, args);
	}
}
```

rouge支持的语言高亮可查看[rouge-languages](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers)
