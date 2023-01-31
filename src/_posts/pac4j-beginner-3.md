---
category: pac4j
tags: [pac4j]
title: PAC4J 新手入门，之四（更多概念）
date: 2023-02-06 09:00:00 +0800
header-image: /assets/img/pac4j-cover.png
---

## 客户端、授权器与安全配置

在之前的示例中，我们直接对接 pac4j，并让项目运行起来了。在 `Pac4jConfig` 中，我们最先的配置的即是客户端 Client。

```java
        GitHubClient gitHubClient = new GitHubClient("a85f19ea0f51face127a", "84bf0695ea2a62674b8d5961a02a4c793bf23e2a");

        GiteeClient giteeClient = new GiteeClient("da28980047eb2c732b8bcee4be567c6a4f38c6459587063f2607084c9c33b957",
                "4cd81eac1dae28b698044ed5b55e2580da94aca7d872e11e5b47d6c8a3b0a26d");
```

代码中我们配置了两个客户端 `GitHubClient`、`GiteeClient`。我们为客户端配置了其对应的协议所需要参数，如代码中所使用的 OAuth2.0 协议的 `key` 和 `secret`。而对应的服务端的协议相关 API 则封装在客户端的相关实现类中。

然后我们需要将客户端添加到安全配置 `Config` 中，如下：

```java
        Clients clients = new Clients("http://localhost:8888/callback", gitHubClient, giteeClient);
        Config config = new Config(clients);
```

我们还可以为安全配置添加认证器 `Authorizer`，用于进一步细化认证配置，我们没有添加，使用默认的 `csrfCheck`。

最后再依据不同的认证框架，将 `Config` 配置使用，如下：

```java
        protected void configure(HttpSecurity http) throws Exception {
            final SecurityFilter filter = new SecurityFilter(config,"GiteeClient");

            http.antMatcher("/login/gitee")
                    .addFilterBefore(filter, BasicAuthenticationFilter.class)
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);
        }
```

通过这几个配置就可以将整个认证对接起来。

## 匹配器

匹配器 `Matcher` 可以用来做细化扩展，比如我们使用的 `SecurityFilter`，如下：

```java
final SecurityFilter filter = new SecurityFilter(config,"GiteeClient");
```

这个过滤器默认不会对请求的 URL 进行过滤，如果想细化控制，比如只针对某些 URL 生效，可以通过向 `SecurityFilter` 添加自定义 `Matcher` 来实现。当然，在特定的框架中，可以使用框架自己的特性来实现匹配，比如我们使用的 `Spring Security` 中，可以直接在 `HttpSecurity` 声明中配置。

## Profile

当 pac4j 成功认证用户时，将从认证提供者检索其数据，并构建用户配置文件，即 profile。用户配置文件包括：

- 一个标识符 （getId()）
- 属性（getAttributes()、 getAttribute(name)）
- 认证相关属性 （getAuthenticationAttributes()、getAuthenticationAttribute(name)）
- 角色 （getRoles()）
- 权限 （getPermissions()）
- 客户端名称（getClientName()）
- 记住我 （isRemembered()）
- 一个关联标识符（getLinkedId()）

每个客户端会自己定义一个对应的配置文件，这样当客户端获取到服务端响应的用户数据后，可以保存下来供项目代码使用。

## Web Context、Session Store

Web 上下文、会话存储，是比较全局的配置， 一般不需要在配置时指定。

## 结语

以上，就是 pac4j 的新手入门，通过这些简单的介绍，了解了 pac4j 的一些基础概念，并能基于 Spring Security 框架对接上 pac4j，还能照着现有的客户端实现，自定义一个客户端的实现。而实现一个自定义客户端，会是实际工作中最常做的事情。

