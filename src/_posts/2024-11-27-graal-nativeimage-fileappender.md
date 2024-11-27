---
category: micronaut
tags: [java,micronaut,native image]
title: 解决Graal Native Image使用FileAppender编译报错
date: 2024-11-27 20:00:00 +0800
header-image: /assets/img/summer-stock-zVCgHOv3Tiw-unsplash.jpg
---

在Micronaut 项目中，使用了 Logback 输出日志。在添加了RollingFileAppender 后，编译 Native Image 就会报错了。

反复搜索后，发现问题原因是：编译 Native Image 也会使用 logback 进行日志输出，这个时候就会打开日志文件句柄，然后编译器发现有文件句柄被打开了，编译就被中止了。

按 GitHub 上大佬的建议，解决文案是定义一个延迟加载的 FileAppender。

<!-- more -->

![image.png](./imgs/micronaut/2.png)

具体文案如下：

1.  自定义 FileAppender

示例代码如下：

```java
package fun.mortnon.framework.log;


import ch.qos.logback.core.rolling.RollingFileAppender;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * 自定义的日志文件 appender
 * 避免 GraalVM Native Image 编译时 logback 进程占用日志文件导致编译失败
 *
 * @author dev2007
 * @date 2024/3/13
 */
public class LazyInitRollingFileAppender<E> extends RollingFileAppender<E> {
    private AtomicBoolean started = new AtomicBoolean(false);

    @Override
    public void start() {
        if (!inGraalImageBuildtimeCode()) {
            super.start();
            this.started.set(true);
        }
    }

    /**
     * This method is synchronized to avoid double start from doAppender().
     */
    protected void maybeStart() {
        lock.lock();
        try {
            if (!this.started.get()) {
                this.start();
            }
        } finally {
            lock.unlock();
        }
    }

    @Override
    public void doAppend(E eventObject) {
        if (!inGraalImageBuildtimeCode()) {
            if (!this.started.get()) {
                maybeStart();
            }
            super.doAppend(eventObject);
        }
    }

    private static final String PROPERTY_IMAGE_CODE_VALUE_BUILDTIME = "buildtime";
    private static final String PROPERTY_IMAGE_CODE_KEY = "org.graalvm.nativeimage.imagecode";

    private static boolean inGraalImageBuildtimeCode() {
        return PROPERTY_IMAGE_CODE_VALUE_BUILDTIME.equals(System.getProperty(PROPERTY_IMAGE_CODE_KEY));
    }

}
```

说明：实现一个延迟加载，当 Graal 编译 Native Image 时不输出日志。

注意：

*   需要添加 logback 依赖和 Graal 依赖（`org.graalvm.sdk:graal-sdk`）
*   `lock` 锁对象来源于父类 `OutputStreamAppender`，如果是较高版本的 logback，锁对象的名为 `streamWriteLock`，要注意检查

2.  配置 Logback

示例配置如下：

```xml
    <appender name="file" class="fun.mortnon.framework.log.LazyInitRollingFileAppender">
        <file>logs/${service}.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>logs/${service}-%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <!--每天1个文件-->
            <maxHistory>30</maxHistory>
            <!--每个文件最大50M-->
            <maxFileSize>50MB</maxFileSize>
            <!--最大容量1GB-->
            <totalSizeCap>1GB</totalSizeCap>
        </rollingPolicy>
        <layout class="ch.qos.logback.classic.PatternLayout">
            <pattern>${pattern}</pattern>
        </layout>
    </appender>
```

说明：配置应用自定义的 FileAppender

3.  在 GraalVM Native Image 的 `reflect-config.json` 中添加自定义的 FileAppender

示例配置如下：

```json
  {
    "name": "fun.mortnon.framework.log.LazyInitRollingFileAppender",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  }
```

以上就是解决方法，如果你有好的方法，欢迎一起探讨。
