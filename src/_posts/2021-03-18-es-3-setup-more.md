---
category: elasticsearch
tags: [elasticsearch]
title: Elasticsearch 从入门到学会之三（Elasticsearch 安装使用的一些碎碎念）
date: 2021-03-18 11:00:00 +0800
header-image: /assets/img/elastic-logo.svg
---

上一篇中，我们按照官方文档直接体验了对 Elasticsearch 的安装，以及安装成功的校验。本篇我们按照官方对各种平台的安装方式，学习一下Elasticsearch 安装相关的基础信息，如目录结构，常见参数等。

<!-- more -->

> [Installing Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/install-elasticsearch.html)
> [安装 Elasticsearch](https://elasticsearch.bookhub.tech/#/setup/install)

在文档中，分别对 Linux 和 MacOS 上使用压缩包、在 Windows 上使用 `.zip` 包、单独的 Debian 包、单独的 RPM 包、使用 Docker 等方式安装 Elasticsearch 分别进行了介绍。

以上各种方式都具有各自独立的操作方式，但最终本质都是将 Elasticsearch 运行起来。

针对 Windows 环境，官方提醒：

> 在 Windows 上，Elasticsearch 机器学习特性需要 Microsoft 通用 C 运行时库。它内置于 Windows 10、Windows Server 2016 和更高版本的 Windows 中。对于老版本的 Windows，它可以通过 Windows Update 安装，也可以从[独立下载](https://support.microsoft.com/en-us/help/2999226/update-for-universal-c-runtime-in-windows)安装。如果你不能安装 Microsoft 通用 C 运行时库，禁用机器学习特性你也能使用 Elasticsearch 的其他特性。

也就是说，Windows 环境上，系统版本太低，不用机器学习，Elasticsearch也能用基本功能。

## 关于目录结构

不论是使用哪种安装形式，Elasticsearch 的目录结构基本是一致的。示例如下：

| 目录名称 | 描述                                                         | 默认位置           |
| -------- | ------------------------------------------------------------ | ------------------ |
| 根目录   | 根目录                                                       | ${es_home}         |
| bin      | 脚本目录，包括启动脚本 `elasticsearch` 和安装插件脚本 `elasticsearch-plugin` | ${es_home}/bin     |
| conf     | 配置文件目录，包括 `elasticsearch.yml`                       | ${es_home}/conf    |
| data     | 索引和数据文件目录，可以有多个                               | ${es_home}/data    |
| logs     | elasticsearch 日志目录                                       | ${es_home}/logs    |
| plugins  | 插件目录                                                     | ${es_home}/plugins |

Elasticsearch 是 java 开发的程序，Elasticsearch 压缩包还贴心的自带了一个 JDK，在目录 jdk中。可以使用本机的 JDK 运行 Elasticsearch，也可用自带的 JDK。而适用的 JDK 版本，可以看[官方介绍](https://www.elastic.co/guide/en/elasticsearch/reference/current/setup.html#jvm-version)。

另外，还有一个 `repo` 目录，它是共享文件系统仓库位置，可以配置多个位置。文件系统仓库可以放在指定的任何目录的任何子目录中。可以通过参数指定。

在以上表格中，我们可以看到，启动 Elasticsearch 的脚本放在 `bin` 目录中，所以如果是压缩包解压出来的 Elasticsearch，我们进入此目录，执行启动脚本就可启动 Elasticsearh。而其他形式，如 RPM 或者 docker 的形式，它们的启动也是调用此目录中的启动脚本。

而 Elasticsearch 启动需要的配置信息，来源于 `conf` 目录中的 `elasticsearch.yml` 文件，如果有必要，可以直接修改此配置文件中的配置。当然也可以在执行启动脚本时，以参数的形式传递进去。

> 对 Windows 下使用 `.zip` 安装 Elasticsearch，官方文档中建议：任意集群范围设置（如 `cluster.name`）应该添加到 `elasticsearch.yml` 配置文件中，而任何节点特定设置，如 `node.name`，应该在命令行中指定。

也就是说通用的配置写入配置文件中，动态的配置在执行时指定即可。

Elasticsearch 还可以使用密钥库进行保护，启动它时会提示输入密码。

## 关于 Docker

现在我们用得很多的是 Docker 环境，用 Docker 镜像启动 Elasticsearch 的话，需要注意一些特别的事项。

如果想启一个单节点的集群来测试，那必须要指定参数来绕过检查：

```bash
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.11.2
```

如果要启动一个三节点集群，可以用 Docker Compose 或者 K8S。

环境变量 `ES_JAVA_OPTS` 中可以指定 Elasticsearch 使用的 JVM 堆大小，但是并不推荐在生产环境这样设置。默认情况下，Elasticsearch 基于节点的角色和节点容器总可用内存，自动地设置 JVM 堆大小。对大多数生产环境，官方推荐这种默认大小设置。

当然一定要手工设置也是可以的。在生产环境手工设置堆大小，绑定挂载包含了你期望的[堆大小](http://localhost:3000/#/setup/config/advanced?id=设置-jvm-堆大小)设置的 [JVM 选项](http://localhost:3000/#/setup/config/jvm)文件（在 `/usr/share/elasticsearch/config/jvm.options.d`中）。

还要注意，在生产环境使用，`vm.max_map_count` 内核设置必须至少为 `262144`。在 Linux 环境中，`vm.max_map_count` 应该永久设置在 `/etc/sysctl.conf`：

```bash
grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144
```

在运行的系统中应用此配置，执行：

```bash
sysctl -w vm.max_map_count=262144
```

### 关于 Docker 中的用户

默认情况下，Elasticsearch 通过 uid:gid `1000:0`，以用户 `elasticsearch` 在容器中运行。所以要注意这个用户的相关目录读写权限，以避免出现用户权限不足，导致的 Elasticsearch 无法正常运行。

特别要注意，使用 Docker 时，我们会向容器挂载本地目录、文件，或者存储中的目录、文件，就需要用户对这些目录、文件有读写权限。如，对配置（`config`）、数据（`data`）、日志（`logs`）目录需要有写权限。

比较方便的方法是直接对本地目录 gid `0` 分配组访问权限。

你也可以使用自定义 UID 和 GID 来运行 Elasticsearch 容器。除非你绑定挂载每个 `config`、`data` 和 `logs` 目录，否则必须为 `docker run` 传递命令行选项 `--group-add 0`。这样可以确保运行 Elasticsearch 的用户也是容器 `root` （GID 0）组的成员。

还可以通过环境变量 `TAKE_FILE_OWNERSHIP` 强制容器更改用于数据和日志目录的绑定挂载的所有权。当你这样做的时候，它们将属于 uid:gid `1000:0`，它提供了 Elasticsearch 进程所需的读写访问权限。

### 关于 Docker 文件挂载和环境变量

在 Docker 中运行时， Elasticsearch 配置文件从 `/usr/share/elasticsearch/config/`加载。为了使用自定义配置文件，你要绑定挂载文件到镜像中的配置文件上。

而如果想通过读取文件中的值对环境变量设置值，需要给**环境变量名字加上后缀 `_FILE`**。如，为了从文件设置 Elasticsearch 的启动密码，你可以绑定挂载这个文件，然后在挂载路径中设置环境变量`ELASTIC_PASSWORD_FILE`。如果你挂载的密码文件为 `/run/secrets/bootstrapPassword.txt`,如下指定：

```bash
-e ELASTIC_PASSWORD_FILE=/run/secrets/bootstrapPassword.txt
```

如果使用自定义配置文件，并将其绑定挂载到 Docker 镜像的相应文件上。例如，使用 `docker run` 绑定挂载 `custom_elasticsearch.yml`，如下：

```bash
-v full_path_to/custom_elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
```

以上就是针对各种环境安装使用 Elasticsearch 需要注意的一些很特别的点的碎碎念。更多的文档资料，可以查看 [Elasticsearch 中文文档](https://elasticsearch.bookhub.tech/)。

接下来，我们将先跳过官方文档中关于如何配置 Elasticsearch 的更多的讲解，直接进入对 Elasticsearch 相关模块的讲解，并结合 Http API 进行学习。请关注后续文章。
