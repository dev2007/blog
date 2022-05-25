---
category: elasticsearch
tags: [elasticsearch]
title: Elasticsearch 从入门到学会之一（什么是Elasticsearch）
date: 2021-02-26 09:00:00 +0800
header-image: /assets/img/elastic-logo.svg
---

官方概要介绍如下：

Elasticsearch 是位于 Elastic Stack 中心的分布式搜索和分析引擎。Logstach 和 Beats 促进采集、合计以及充实你的数据并在 Elasticsearch 中存储它们。Kibana 允许你去交互式的探索、可视化和共享对数据的见解，以及监视这个栈（Elastic Stack）。Elasticsearch 是索引、搜索和分析的神奇所在。

<!-- more -->

Elasticsearch 为各种数据类型提供接近实时的搜索和分析。不论你有结构化或非结构化的文本、数字数据，还是地理空间数据，Elasticsearch 能以支持快速搜索的方式高效地存储和索引它。你可以远超简单数据检索和聚合信息的方式去发现你数据中的趋势和模式。而且，随着你数据和查询量的增长，Elasticsearch 分布式的特性允许你的部署能随着它无缝地增长匹配。

虽然不是每个问题都是搜索问题，但 Elasticsearch 在大量实例中提供了处理数据的速度和灵活性：

- 为应用或者网站添加搜索框
- 存储和分析日志、度量和安全事件数据
- 使用机器学习，实时自动建模你的数据行为
- 使用 Elasticsearch 作为存储引擎来自动化业务工作流
- 使用 Elasticsearch 作为地理信息系统（GIS）管理、集成和分析空间信息，以及使用 Elasticsearch 作为生物学信息研究工具处理基因数据

我们一直对人们使用搜索的新奇方式感觉惊奇。但是不论你的实例与其中一个相似，还是你正使用 Elasticsearch 来解决一个新的问题，你在 Elasticsearch处理数据、文档和索引的方式是相同的。

> [What is Elasticsearch?](https://www.elastic.co/guide/en/elasticsearch/reference/current/elasticsearch-intro.html)

> [什么是 Elasticsearch？](https://docs.es.shiyueshuyi.xyz/#/es)

更多的介绍：
> [数据输入：文档和索引](https://docs.es.shiyueshuyi.xyz/#/intro/datain)
> [信息输出：搜索和分析](https://docs.es.shiyueshuyi.xyz/#/intro/inforout)
> [可伸缩性和弹性](https://docs.es.shiyueshuyi.xyz/#/intro/scalability)

我们可以知道，Elastic 整个体系中，除了 Elasticsearch，还有 Logstash 和 Beats，可以用来配合 Elasticseach 进行数据采集和合计等，而 Kibana 提供界面进行数据展示和操作。

我们可以看到几个关键的描述：
1. Elasticsearch 是分布式搜索和分析引擎
2. Elasticsearch 为各种数据类型提供接近实时的搜索和分析
3. Elasticsearch 支持多种数据

从这几点中，我们可以很模糊了解一些 Elasticsearch 的特性：

- Elasticsearch 是分布式的，一个集群中可以有多个Elasticsearch节点，任何节点都可以访问节点中的文档。
- Elasticsearch 支持主从集群，依赖跨集群复制（CCR）
- Elasticsearch 可以将各种数据序列化为 JSON 文档来存储，存储后可以进行搜索。
- Elasticsearch 使用倒排索引的数据结构，可以支持快速搜索。
- Elasticsearch 中，`字段`是包含数据的键值对，`文档`是字段的集合，而`索引`是文档的优化集合（索引 -> 文档 -> 字段 -> 数据）。
- Elasticsearch 启用动态映射时，会自动向索引中添加新的字段，也可以自己定义映射。
- 索引是一个或多个物理分片的逻辑组；索引中的文档分布在多个分片上，并将这些分片分布在多个节点上
- 索引创建时指定了主分片数就定了，而副本分片随时可能更改
- 分片数的配置需要权衡

在进一步的文档中，可以知道。Elasticsearch 基于 Apache Lucene。且 Elasticsearch 还提供 REST API，并且支持多种语言的客户端。

而且，Elasticsearch REST API支持`结构化查询`、`全文查询`和二者结合。

- 结构化查询，类型于SQL
- 全文查询，匹配查询的字符串

搜索中，除去单个词语的搜索，也支持`短语搜索`、`相似性搜索`和`前缀搜索`。

Elasticsearch 还有一个特性`聚合`，能够构建数据的复杂摘要，并深入了解关键度量、模式和趋势。

以上，就是对 Elasticsearch 的一个概要了解，请关注后续文章。
