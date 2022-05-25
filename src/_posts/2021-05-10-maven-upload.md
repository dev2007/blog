---
category: java
tags: [java,maven]
title: Maven仓库发布组件
date: 2021-05-10 11:00:00 +0800
header-image: /assets/img/maven-logo-black-on-white.png
---

一般，我们如果开发了一个工具组件，肯定想将它发布以供其他人使用。在公司内部，我们可以将其发布到私有仓库，在互联网环境，我们一般将其发布到 maven 中央仓库。以下以我们最近开发的java工具 `flyRafter` 进行介绍，如何将一个组件发布到 maven 中央仓库。

<!-- more -->

首先，我们先要确保组件能正确编译为 jar 包，在这个前提下，我们先提前配置我们项目的 `pom.xml` ，以便发布时使用。

1. 项目基本信息配置

```xml
    <groupId>fun.mortnon</groupId>
    <artifactId>flyrafter</artifactId>
    <version>0.0.1</version>
    <packaging>jar</packaging>

    <name>${project.artifactId}</name>
    <url>https://gitee.com/mortise-and-tenon/flyrafter</url>
    <description>generate sql file from java entity class.</description>
```

这里配置项目的最重要的 `groupId`、`artifactId`、`name`等。

> 需要注意，按照中央库的要求，如果向 maven 中央库提交组件，你需要拥有 `groupId` 使用的域名，如果你没有域名，你也可以使用托管环境的域名作为 `groupId`。比如你项目在 github上，你的用户名叫 ME，你的 `groupId` 可以是 `com.github.me`。

2. 组件的开源协议

```xml
<licenses>
        <license>
            <name>MIT License</name>
            <url>https://opensource.org/licenses/MIT</url>
            <distribution>repo</distribution>
        </license>
    </licenses>
```

你用什么协议，就配置相应协议即可。

3. 项目的源码地址及所属开发者信息

```xml
    <scm>
        <url>http://mortnon.fun</url>
        <connection>scm:git:https://gitee.com/mortise-and-tenon/flyrafter.git</connection>
        <developerConnection>scm:git:https://gitee.com/mortise-and-tenon/flyrafter.git</developerConnection>
    </scm>

    <developers>
        <developer>
            <name>mortnon</name>
            <email>mortnon@outlook.com</email>
            <organization>卯榫 mortise-and-tenon</organization>
            <organizationUrl>https://mortnon.fun</organizationUrl>
        </developer>
    </developers>
```

在这里填写你的项目地址、托管的SCM地址，以及所属开发者的介绍信息。

4. 发布仓库配置

```xml
    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://s01.oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>
        <repository>
            <id>ossrh</id>            <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>
```

这里配置的仓库地址，是中央库最新的地址，新项目都将提交到这里。

> 注意 `id` 值 **ossrh**，这个值要与后面在本地 maven 的 `setting.xml` 配置的 值一致，保持与官方说明使用的 **ossrh** 一致最简单。

5.  插件配置

```xml
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.sonatype.plugins</groupId>
                        <artifactId>nexus-staging-maven-plugin</artifactId>
                        <version>1.6.7</version>
                        <extensions>true</extensions>
                        <configuration>
                            <serverId>ossrh</serverId>
                            <nexusUrl>https://s01.oss.sonatype.org/</nexusUrl>
                            <autoReleaseAfterClose>true</autoReleaseAfterClose>
                        </configuration>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-source-plugin</artifactId>
                        <version>2.2.1</version>
                        <executions>
                            <execution>
                                <id>attach-sources</id>
                                <goals>
                                    <goal>jar-no-fork</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-javadoc-plugin</artifactId>
                        <version>2.9.1</version>
                        <executions>
                            <execution>
                                <id>attach-javadocs</id>
                                <goals>
                                    <goal>jar</goal>
                                </goals>
                            </execution>
                        </executions>
                        <configuration>
                            <additionalJOptions>
                                <additionalJOption>-Xdoclint:none</additionalJOption>
                            </additionalJOptions>
                        </configuration>
                    </plugin>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-gpg-plugin</artifactId>
                        <version>1.6</version>
                        <executions>
                            <execution>
                                <id>sign-artifacts</id>
                                <phase>verify</phase>
                                <goals>
                                    <goal>sign</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                </plugins>
            </build>
```

以上插件是发布到中央库所需要的，与项目本身编译没有直接关系。由于涉及到 source、doc的编译生成，如果只是本地调试，会增加编译耗时，所以官方也建议将这些与发布相关的插件通过 profile进行区分配置，将这些发布相关插件放到发布的 profile中，如：

```xml
    <profiles>
		...
        <profile>
            <id>release</id>
            <build>
                <plugins>
                    ...
                </plugins>
            </build>
        </profile>
    </profiles>
```



以上为对项目的 `pom.xml` 进行配置的介绍。以下介绍对本地 maven 的 `setting.xml`进行配置介绍。打开本地 maven 工具的目录，进入 `conf` 目录下，就可以看到 `setting.xml`文件。打开此文件，按如下添加内容：

1. 向`profiles` 节点添加内容

```xml
	<profile>
      <id>ossrh</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <properties>
        <gpg.executable>gpg</gpg.executable>
        <gpg.passphrase>the_pass_phrase</gpg.passphrase>
      </properties>
    </profile>
```

> 注意这里的`gpg`是在发布时调的命令，根据gpg的版本，这里也可以是 `gpg2`，而 `passphrase`代表你的私钥的密码，这里可不用填写，在发布时，一般还会弹窗要求输入。

2. 向 `servers` 节点添加内容

```xml
<server>
      <id>ossrh</id>
      <username>NAME</username>
      <password>PWD</password>
    </server>
```

> 注意这里的用户名和密码，是中央库 sonatype 的用户名与密码，后面将介绍相关的使用，注册地址为 [sonatype](https://issues.sonatype.org/)

以上发布插件、maven `setting.xml` 中都涉及gpg配置，因为项目编译后发布前要使用gpg进行签名校验，所以我们需要先用这个工具生成公私钥。Linux 环境下这个工具很简单，此处不讨论，仅讨论 Windows 环境下。

我们先去gpg4win 官方下载 Windows 环境的安装包，地址：[gpg4win](https://www.gpg4win.org/download.html)。下载页面上，会让你选择是否使用 paypal 捐助，没钱选择捐 0 元，直接下载即可。下载成功后，双击安装程序，按提示不断下一步安装即可。

安装成功后，打开gpg4win（名为Kleopatra，图标头像是一个齐留海的女头），如果出现如下提示信息 “Kleopatra cannot be run as administrator without breaking file permissions in the GnuPG data folder.”。遇到这种情况，可以直接点击另一个安装时生成的快捷图标 `GPA` 来打开gpg应用，然后点击图标中靠右的 `Keyring` 来打开生成界面。

![kelopatra](/assets/img/article/kelopatra.JPG)

![gpa](/assets/img/article/GPA.JPG)

![gpa2](/assets/img/article/GPA2.JPG)

在GPA界面中点击生成新的密钥，按照提示一步步操作即可，注意记住自己的密钥的密码。密钥生成成功后，右键点击密钥，然后选择“Send Keys”，将公钥发送给服务器。

以上所有配置、操作完成后，本地的配置基本完成。以下进入 sonatype 进行账号注册。

进入官网[sonatype](https://issues.sonatype.org/)，注册一个账号，注意密码要有大小写和特殊符号。注册成功后，点击上方的“新建”，然后新建一个问题（issue）,选择项目`Community Support - Open Source Project Repository Hosting (OSSRH)`，问题类型选择 `New Project`。

- `概要`输入自己的项目名称或者相应的描述即可。
- `Group Id`输入自己项目的Group Id，注意上面提过的规则（要么用自己的域名，要么用托管网站的域名，官方文档[Group Id](https://central.sonatype.org/publish/requirements/coordinates/)）。

- `Project URL` 输入自己的项目网站地址
- `SCM url` 输入项目的git下载地址
- 其他项保持默认为空，即可

最后，点击新建，提交问题，然后等待官方回复操作指南。

![sonatype](/assets/img/article/sonatype.JPG)

官方会提示，你确认是否拥有相应域名所有权，只要在域名的DNS解析中，添加一条txt记录，将内容填写为自己的问题单url即可，如果是托管网站的名字，如com.github.xxx，官方会直接检查。

当DNS解析添加后，点击备注，添加一条备注，告诉已添加dns解析即可。

官方审核后，会给出上传组件的指导手册，手册中会指导如何在`pom.xml`中添加配置，也就是我们上面介绍的配置。在此，我们就去进行发布即可，可以先回到上面的`setting.xml`中添加自己的 sonatype 账号和密码。

在本地的命令行中对项目执行mvn发布命令 `mvn clean deploy` 即可在编译成功后，并将组件发布到中央库 stage 库中。同时，如果 artifact id 不以 `-SNAPSHOT` 结尾的话，mvn 的 stage 插件会自动将stage 库的组件正式发布到公开仓库中。

> 需要注意，如果 `pom.xml` 使用了 profile 对开发、发布进行了区分，发布命令中需要带上指定的 profile 名称，如 `mvn clean deploy -Prelease`，而更多的参数可以按照 mvn 命令的说明进行添加

发布后，我们可以在仓库中搜索发布的组件，地址：[Nexus Repository Manager](https://s01.oss.sonatype.org/#welcome)，并且，如果组件处于 stage 库，可以在这里管理。官方也提示，发布后可以直接在[仓库]([Central Repository: (maven.org)](https://repo1.maven.org/maven2/))中查看，但要在[Maven Central Repository Search](https://search.maven.org/)查看的话，需要等2小时。

![sonatype](/assets/img/article/sonatype2.JPG)

以上，就是整个组件向中央库发布的操作过程。以上示例中，我们发布了最后开发的 `flyRafter` 第一个预览版，这个工具是用于 java 中将 @Entity 注解的实体类自动生成建表 SQL 文件的工具，同时，它结合 flyway 使用，可以达成效果：

> 不用单独写sql定义表，只要建好数据库，在实体类中定义好字段名称和定义，就可以动态的对数据库表进行变化，类似于 Hibernate的 `ddl-auto:update`，但比它更好用。

gitee地址: [FlyRafter: 实体转为SQL，并结合flyway应用的工具 (gitee.com)](https://gitee.com/mortise-and-tenon/flyrafter)，maven 地址：[Maven FlyRafter](https://search.maven.org/search?q=flyrafter)该工具正在完善中，欢迎大家试用，并提交 issue。
