---
category: 微服务
tags: [microservices,微服务,翻译]
title: 如何理解微服务架构中的事件溯源
date: 2022-10-09 09:00:00 +0800
header-image: /assets/img/featured-3.jpg
---

本文翻译自 [How To Understand Event Sourcing In Microservices Architecture](https://datamify.com/architecture/how-to-understand-event-sourcing-in-microservices-architecture/)，作者 [OLEKSII](https://datamify.com/author/vader/)。

<!-- more -->

## 问题状态

`CQRS` 模型的局限性实际在于只保存领域实体的最新状态。对于某些应用程序，这已经足够了。然而，其他系统需要更大的弹性。这可以通过*事件溯源*（Event Sourcing）实现。

## 事件溯源

*事件溯源*可以描述为一组以下的原则。

- *事件溯源* 通常与 *CQRS* 结合使用。
- 实体的所有更新操作都表现为命令。通常，这些命令与领域区域相关，对业务也有一定意义。
- 每个命令都保存到追加事件日志中。因此，命令是不可变更的。这使审计功能开箱即用。
- 服务订阅到事件日志，是为了处理事件并能提供一些业务价值。

## 事件溯源示例

让我们回顾一个例子。

![EventSourcingInitial](/assets/img/EventSourcingInitial.jpg)

这是一个 `CQRS` 模型（详情参阅文章 [How To Understand CQRS In Microservices Architecture](https://datamify.com/architecture/how-to-understand-cqrs-in-microservices-architecture/)）。

假设我们只对电影评分功能感兴趣。用户以评分的形式（例如从 0 到 10）留下对电影的意见。这样：

- 用户在 *Movie Actions Service* 上启动**添加评分**命令。
- *Movie Actions Service* 找到指定的电影。它可以包含许多字段。然而，我们只对计算评分的字段感兴趣：*电影投票总数*和*所有电影投票总数*。
- 评分信息已更新。一个被添加到*电影投票总数*中。来自**添加评分**命令的新评分将添加到*所有电影投票总数*中。
- 完整的电影快照被发送到 *Message Broker*。
- 所有用户都可以通过 *Movie Summary Service* 查看更新的电影评分（*所有电影投票总数*除以*电影投票总数*）。

这种设计的问题在于，只保存了最新的评分状态。整个历史已经丢失了。

让我们回顾一个*事件溯源*模型。

![EventSourcing](/assets/img/EventSourcing.jpg)

此图几乎与上一个图一样。*CQRS* 模型也可以用在这里。

- 用户在 *Movie Actions Service* 上启动**添加评分**命令。
- 事件还有以下信息：向电影《指环王》**添加评分** 8。
- *Movie Actions Service* 将此事件保存到*事件日志*中（例如 [Kafka](https://kafka.apache.org/)）。
- *Movie Summary Service* 以前使用了其数据库中每部电影的*电影投票总数*和*所有电影投票总数*字段。
- *Movie Summary Service* 处理事件日志中的记录并更新评分。
- 所有用户都可以看到更新的电影评分（*所有电影投票总数*除以*电影投票总数*）。

乍一看，一切都没有改变。然而，它给系统带来了更多的弹性。

电影评分的问题在于人们有不同的口味。一般评分值（如 7.35）仅显示基于多人意见计算的平均分数。作为一家提供电影流媒体功能的公司，我们有意为用户提供良好的建议。我们如何才能做到这一点？为了简化逻辑，我们可以用一条语句来完成。推荐那些与该用户高度评价的电影类型相似的电影。

这样，引入了一种新的服务——*Movie Recommendation Service*。

![EventSourcingFinal](/assets/img/EventSourcingFinal.jpg)

我们正在扩展现有系统。因此，*Movie Recommendation Service* 应该处理所有以前分配的评分。通过事件溯源，这是可能的，因为我们将此信息保存在 [Kafka](https://kafka.apache.org/) 中（电影《指环王》**添加评分** 8）。在第一个示例中，由于我们只存储了最后一个电影评分值，因此做不到。

## 事件溯源的优势

- 关注点的分离。
- 每个服务的缩放都是独立的。
- 可以为每个服务选择合适的数据存储及其模式（schema）。
- 所有服务中的简单高效的查询。
- 新服务可以轻松添加到现有应用程序中。

## 事件溯源的劣势

- 复杂性。
- 最终一致性。
- 新服务可能需要大量时间来处理已有事件。

## 总结

在本文中，我们回顾了*事件溯源*模式。它通常与 *CQRS* 搭配使用。值得一提的是，这种模式的必要性可能发生在复杂的系统中。因此，应谨慎选择，以免给系统带来不必要的复杂性。
