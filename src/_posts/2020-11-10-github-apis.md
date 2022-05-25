---
category: github
tags: [github pages]
title: 使用GitHub API 上传文件到仓库及GitHub做图床
date: 2020-11-10 10:40:20 +0800
header-image: /assets/img/elastic-logo.svg
---

> 本文介绍GitHub API基础及上传文件到仓库API，并应用API将GitHub作为图床

[GitHub API官方页面](https://docs.github.com/en/free-pro-team@latest/rest/overview/resources-in-the-rest-api)

<!-- more -->

## GitHub API版本

当前版本为`v3`，官方推荐在请求头中显示添加版本标识。

```bash
Accept: application/vnd.github.v3+json
```

Postman示例如图：

![api版本](/assets/img/github/version.jpg)

## 请求认证

- 基础认证|Basic authentication

shell示例：

```bash
curl -u "username" https://api.github.com
```

Postman示例如图：

![api认证](/assets/img/github/auth.jpg)

- 令牌认证|OAuth2 token (sent in a header)

shell示例：

```bash
curl -H "Authorization: token OAUTH-TOKEN" https://api.github.com
```

Postman示例如图：

![api token](/assets/img/github/token.jpg)

## 主API，获取所有API

`请求API：`

```bash
GET https://api.github.com
```

> 这个API返回常见API

Postman示例如图：

![basic api response](/assets/img/github/basicapi.jpg)

## 公开仓库查询API

`请求API:`

```bash
GET https://api.github.com/user/repos
```

`header：`
| name | value |
| ---- | ---- |
| Accept | application/vnd.github.v3+json |
| Authorization | token`空格`*oauth_token*|

Postman示例如图：

![list repo](/assets/img/github/list_repo.jpg)

## 仓库创建API

`请求API：`

```bash
POST https://api.github.com/user/repos
```

`headers：`

- Accept : application/vnd.github.v3+json

- Authorization : token`空格`*oauth_token*|

`请求体|Request body：`

> name，代表仓库名，必须。其他的可选参数参看[官方文档](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#create-a-repository-for-the-authenticated-user)

```json
{
    "name":"imgs"
}
```

Postman示例如图：

![create repo](/assets/img/github/create_repo.jpg)

## 为仓库上传/更新文件API

`请求API：`

```bash
PUT https://api.github.com/repos/{user}/imgs/contents/{path}/{filename}
```

- user：仓库所属用户名
- path：上传文件存放的路径，如果文件夹不存在，会自动创建
- filename：上传的文件名称

`请求体|Request body：`

```json
{
  "message": "提交说明",
  "content": "base64编码的文件内容",
  "sha": "文件的blob sha"
}
```

> content：文件内容的base64编码后的字符串

> sha：文件更新或删除时必填，先用GET接口查询文件信息，可在响应体中获取

Postman示例如图：

![upload file](/assets/img/github/upload.jpg)

## 从仓库删除文件API

`请求API：`

```bash
DELETE https://api.github.com/repos/{user}/imgs/contents/{path}/{filename}
```

- user：仓库所属用户名
- path：上传文件存放的路径，如果文件夹不存在，会自动创建
- filename：上传的文件名称

`请求体|Request body：`

```json
{
  "message": "提交说明",
  "sha": "文件的blob sha"
}
```

> sha：文件更新或删除时必填，先用GET接口查询文件信息，可在响应体中获取

## token的生成

token需要在GitHub网站上右上角`Settings`中去生成，生成后需要立即保存。

- 点击`Settings`

![setting](/assets/img/github/setting.jpg)

- 点击`Developer settings`

![setting2](/assets/img/github/setting2.jpg)

- 点击`Personal access tokens`

![setting3](/assets/img/github/setting3.jpg)

- 点击`Generate new token`，生成token并记录

![setting4](/assets/img/github/setting4.jpg)

## 仓库作为图床

仓库要想作为图床，图床的前提是文件内容能外链使用，需要将其作为GitHub Pages才能实现。

将仓库作为图床的整体操作步骤如下：

- 1 创建一个仓库，将添加一个index.html

由于我们要将此仓库作为图床，所以虽不需要静态网站相关内容，但为了GitHub能将此仓库识别为GitHub Pages，还是至少需要一个index.html在仓库中。（当然，你也可以找寻一个静态网站模板放进仓库）

index.html示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width-device-width,initial-scale-1">
    <title>Images</title>
  </head>
  <body></body>
</html>
```

示例如图：

![repo index](/assets/img/github/index.jpg)

- 2 将此仓库配置为GitHub Pages

相关配置可以参看[多项目部署为同一个GitHub Pages](/multi-project-github-pages)

![pages](/assets/img/github/pages.jpg)

开启GitHub Pages成功后，当前仓库文件就可通过GitHub Pages地址访问，图中示例为`https://dev2007.github.io/imgs`

- 3 将图片上传到仓库中

> {仓库}/{路径}/{文件名}

示例如图：

![repo img](/assets/img/github/testimg.jpg)

- 4 获取图片链接，使用链接

> 链接格式为：https://{Pages域名}/{仓库}/{路径}/{文件名}

示例的地址为：`https://dev2007.github.io/imgs/myfolder/panda.png`

[示例图床图片](https://dev2007.github.io/imgs/myfolder/panda.png)

示例如图：

![pages img](/assets/img/github/pagesimg.jpg)

- 5 使用自定义域名，配置好后`Pages域名`换为自定义域名即可

相关GitHub Pages配置域名，可参看[用GitHub Pages搭建博客（五）](/create-github-pages-fifth)

- 6 CDN加速

可以使用Vercel进行加速，可参看[用GitHub Pages搭建博客（六）](/create-github-pages-sixth)

*题图来源 ：[unsplash](https://unsplash.com)*
