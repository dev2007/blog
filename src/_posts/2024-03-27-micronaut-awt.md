---
category: micronaut
tags: [java,micronaut,native image]
title: Micronaut Native Image 编译支持 AWT 图片绘制
date: 2024-03-27 20:00:00 +0800
header-image: /assets/img/summer-stock-zVCgHOv3Tiw-unsplash.jpg
---

当我们不论使用 Micronaut 框架还是其他框架时，如果项目中使用了 AWT 相应特性（仅特性，非 Swing 应用），比如生成图片，在我们将 Java 应用编译为 Native Image 本地应用后，可能就会报出很多和 AWT 相关的异常，导致生成图片相关功能无法使用。

Quarkus 框架给出了官方的解决方案，直接按官方方案使用插件和制作基础镜像即可。

本文将给出一个 Micornaut 框架的完整的指南和项目示例，说明如何配置可以正确正确编译出支持 AWT 特性的项目。

<!-- more -->

## 1. 基础镜像准备

Micronaut 框架的默认编译插件中，如 Maven Plugin，指定的 Docker 基础镜像为：`frolvlad/alpine-glibc:alpine-3.XX`。该镜像中没有图形化所依赖的包 `freetype`，理论上为该镜像安装依赖的包即可。安装命令如下：

```bash
apk add freetype
```

但基于 Micronaut 3.10.3 对应的基础镜像版本 `alpine-3.19`，安装 `freetype` 后，连带的依赖 `brotli-libs` 无法正常运行，此问题一直无法找到解决方法，最后我决定换一个其他的镜像作为基础镜像。

最终验证多种镜像后，推荐两个我觉得不错的镜像，一个是最全的镜像：`centos` ，缺点是镜像比较大，约 204M；另一个是：`redhat/ubi8-minimal`，大小约 93M，本次选用了它。

然后我们基于此镜像，安装图形化相关的依赖，Dockerfile 示例如下：

```bash
FROM redhat/ubi8-minimal:8.9
RUN microdnf install freetype fontconfig
```

## 2. Native Image 镜像准备

由于 Micronaut 插件使用安装 GraalVM Native Image 命令的 Docker 镜像进行多步编译制作最终的制品镜像，所以我们先准备镜像：`ghcr.io/graalvm/native-image:ol7-java11-22.3.2`。

> 注意：对应的版本会由于 Micronaut 框架版本的差异而有差异，可以使用命令 `mvn mn:dockerfile -Dpackagin=docker-native` 生成 Dockerfile，然后查看其中的镜像版本。

由于国内的 Docker 镜像仓库代理都是代理的 Docker Hub，而 Graal 的镜像分发在 ghcr.io，如果你没有合规的 VPN 途径，是无法下载到此镜像的。
推荐通过 GitHub 项目 [hub-mirror](https://github.com/togettoyou/hub-mirror) 将镜像下载到你的的阿里云个人仓库中后再下载即可。

如果你连 GitHub 都上不去了，就先装一个 [Watt Toolkit](https://steampp.net/)。

由于我们编译的项目具有图形组件，所以编译环境也需要相应的图形组件，我们需要给 `graalvm/native-image` 安装 `freetype` 库

```bash
FROM ghcr.io/graalvm/native-image:ol7-java11-22.3.2
RUN yum install -y freetype-devel
```

制作好镜像后，我们将原版镜像备份，如： `docker tag ghcr.io/graalvm/native-image:ol7-java11-22.3.2 native:back`，然后将的镜像改为原版的 tag。

## 3.项目配置文件准备

我们的目标是要编译得到一个本地应用，按照 GraalVM 的官方指南，我们需要**将要保留反射信息的类，将其信息添加到配置文件中**，然后在编译时指定该文件，这样在编译后，本地应用就不会报错找不到类了。

按照官方的指南，我们不用手工去编写这个文件，我们只要先编译出 jar，然后我们本地安装 GraalVM，接着使用 java 命令，带着 agent 运行 jar，最后执行相应的业务逻辑，代码所涉及的、需要保留反射信息的类信息，就会自动添加到指定的配置文件中。

运行代理的代码示例如下：

```bash
java -agentlib:native-image-agent=config-output-dir=./output -jar mortnon-micronaut-0.1.jar
```

jar 运行后，我们只要调用生成图片相关的 API 触发相应的逻辑，对应的 AWT 的类信息就会自动添加到配置文件中。

在我们停止运行后，最终生成的配置文件将会放到 `target` 目录下的 `output` 目录中。

> 如果需要生成整个项目的反射信息，可以在运行后，遍历所有的业务逻辑。但我更推荐按需要添加，缺少再加。

最终生成的文件，我们主要需要三个： `jni-config.json`、`reflect-config.json` 和 `resource-config.json`。

AWT 由于要使用原生 API 进行图形操作，所以还会涉及到 JNI。

这个时候生成的这些文件中只包含了运行时的所识别的反射类信息，但实际还会缺少一些个别类的字段或特定类的信息。比如报错： `java.awt.AWTError: Toolkit not found: sun.awt.X11.XToolkit`，就是没有自动识别到的类，需要我们手动添加到配置文件中。

最终以我的项目为例，得到的与 AWT 有关，用于项目的文件内容示例如下：

- `jni-config.json`

```bash
[
  {
    "name": "[Lsun.java2d.loops.GraphicsPrimitive;"
  },
  {
    "name": "java.awt.AlphaComposite",
    "fields": [
      {
        "name": "extraAlpha"
      },
      {
        "name": "rule"
      }
    ]
  },
  {
    "name": "java.awt.Color",
    "methods": [
      {
        "name": "getRGB",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "java.awt.GraphicsEnvironment",
    "methods": [
      {
        "name": "isHeadless",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "java.awt.geom.AffineTransform",
    "fields": [
      {
        "name": "m00"
      },
      {
        "name": "m01"
      },
      {
        "name": "m02"
      },
      {
        "name": "m10"
      },
      {
        "name": "m11"
      },
      {
        "name": "m12"
      }
    ]
  },
  {
    "name": "java.awt.geom.GeneralPath",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      },
      {
        "name": "<init>",
        "parameterTypes": [
          "int",
          "byte[]",
          "int",
          "float[]",
          "int"
        ]
      }
    ]
  },
  {
    "name": "java.awt.geom.Path2D",
    "fields": [
      {
        "name": "numTypes"
      },
      {
        "name": "pointTypes"
      },
      {
        "name": "windingRule"
      }
    ]
  },
  {
    "name": "java.awt.geom.Path2D$Float",
    "fields": [
      {
        "name": "floatCoords"
      }
    ]
  },
  {
    "name": "java.awt.geom.Point2D$Float",
    "fields": [
      {
        "name": "x"
      },
      {
        "name": "y"
      }
    ],
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "float",
          "float"
        ]
      }
    ]
  },
  {
    "name": "java.awt.geom.Rectangle2D$Float",
    "fields": [
      {
        "name": "height"
      },
      {
        "name": "width"
      },
      {
        "name": "x"
      },
      {
        "name": "y"
      }
    ],
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      },
      {
        "name": "<init>",
        "parameterTypes": [
          "float",
          "float",
          "float",
          "float"
        ]
      }
    ]
  },
  {
    "name": "java.awt.image.BufferedImage",
    "fields": [
      {
        "name": "colorModel"
      },
      {
        "name": "imageType"
      },
      {
        "name": "raster"
      }
    ],
    "methods": [
      {
        "name": "getRGB",
        "parameterTypes": [
          "int",
          "int",
          "int",
          "int",
          "int[]",
          "int",
          "int"
        ]
      },
      {
        "name": "setRGB",
        "parameterTypes": [
          "int",
          "int",
          "int",
          "int",
          "int[]",
          "int",
          "int"
        ]
      }
    ]
  },
  {
    "name": "java.awt.image.ColorModel",
    "fields": [
      {
        "name": "colorSpace"
      },
      {
        "name": "colorSpaceType"
      },
      {
        "name": "isAlphaPremultiplied"
      },
      {
        "name": "is_sRGB"
      },
      {
        "name": "nBits"
      },
      {
        "name": "numComponents"
      },
      {
        "name": "pData"
      },
      {
        "name": "supportsAlpha"
      },
      {
        "name": "transparency"
      }
    ],
    "methods": [
      {
        "name": "getRGBdefault",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "java.awt.image.IndexColorModel",
    "fields": [
      {
        "name": "allgrayopaque"
      },
      {
        "name": "colorData"
      },
      {
        "name": "map_size"
      },
      {
        "name": "rgb"
      },
      {
        "name": "transparent_index"
      }
    ]
  },
  {
    "name": "java.awt.image.Raster",
    "fields": [
      {
        "name": "dataBuffer"
      },
      {
        "name": "height"
      },
      {
        "name": "minX"
      },
      {
        "name": "minY"
      },
      {
        "name": "numBands"
      },
      {
        "name": "numDataElements"
      },
      {
        "name": "sampleModel"
      },
      {
        "name": "sampleModelTranslateX"
      },
      {
        "name": "sampleModelTranslateY"
      },
      {
        "name": "width"
      }
    ]
  },
  {
    "name": "java.awt.image.SampleModel",
    "fields": [
      {
        "name": "height"
      },
      {
        "name": "width"
      }
    ],
    "methods": [
      {
        "name": "getPixels",
        "parameterTypes": [
          "int",
          "int",
          "int",
          "int",
          "int[]",
          "java.awt.image.DataBuffer"
        ]
      },
      {
        "name": "setPixels",
        "parameterTypes": [
          "int",
          "int",
          "int",
          "int",
          "int[]",
          "java.awt.image.DataBuffer"
        ]
      }
    ]
  },
  {
    "name": "java.awt.image.SinglePixelPackedSampleModel",
    "fields": [
      {
        "name": "bitMasks"
      },
      {
        "name": "bitOffsets"
      },
      {
        "name": "bitSizes"
      },
      {
        "name": "maxBitSize"
      }
    ]
  },
  {
    "name": "sun.awt.SunHints",
    "fields": [
      {
        "name": "INTVAL_STROKE_PURE"
      }
    ]
  },
  {
    "name": "sun.awt.image.BufImgSurfaceData$ICMColorData",
    "fields": [
      {
        "name": "pData"
      }
    ],
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long"
        ]
      }
    ]
  },
  {
    "name": "sun.awt.image.IntegerComponentRaster",
    "fields": [
      {
        "name": "data"
      },
      {
        "name": "dataOffsets"
      },
      {
        "name": "pixelStride"
      },
      {
        "name": "scanlineStride"
      },
      {
        "name": "type"
      }
    ]
  },
  {
    "name": "sun.font.CharToGlyphMapper",
    "methods": [
      {
        "name": "charToGlyph",
        "parameterTypes": [
          "int"
        ]
      }
    ]
  },
  {
    "name": "sun.font.Font2D",
    "methods": [
      {
        "name": "canDisplay",
        "parameterTypes": [
          "char"
        ]
      },
      {
        "name": "charToGlyph",
        "parameterTypes": [
          "int"
        ]
      },
      {
        "name": "charToVariationGlyph",
        "parameterTypes": [
          "int",
          "int"
        ]
      },
      {
        "name": "getMapper",
        "parameterTypes": []
      },
      {
        "name": "getTableBytes",
        "parameterTypes": [
          "int"
        ]
      }
    ]
  },
  {
    "name": "sun.font.FontStrike",
    "methods": [
      {
        "name": "getGlyphMetrics",
        "parameterTypes": [
          "int"
        ]
      }
    ]
  },
  {
    "name": "sun.font.FreetypeFontScaler",
    "methods": [
      {
        "name": "invalidateScaler",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "sun.font.GlyphList",
    "fields": [
      {
        "name": "len"
      },
      {
        "name": "maxLen"
      },
      {
        "name": "maxPosLen"
      },
      {
        "name": "glyphData"
      },
      {
        "name": "chData"
      },
      {
        "name": "images"
      },
      {
        "name": "positions"
      },
      {
        "name": "x"
      },
      {
        "name": "y"
      },
      {
        "name": "gposx"
      },
      {
        "name": "gposy"
      },
      {
        "name": "usePositions"
      },
      {
        "name": "lcdRGBOrder"
      },
      {
        "name": "lcdSubPixPos"
      }
    ]
  },
  {
    "name": "sun.font.PhysicalStrike",
    "fields": [
      {
        "name": "pScalerContext"
      }
    ],
    "methods": [
      {
        "name": "adjustPoint",
        "parameterTypes": [
          "java.awt.geom.Point2D$Float"
        ]
      },
      {
        "name": "getGlyphPoint",
        "parameterTypes": [
          "int",
          "int"
        ]
      }
    ]
  },
  {
    "name": "sun.font.StrikeMetrics",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "float",
          "float",
          "float",
          "float",
          "float",
          "float",
          "float",
          "float",
          "float",
          "float"
        ]
      }
    ]
  },
  {
    "name": "sun.font.TrueTypeFont",
    "methods": [
      {
        "name": "readBlock",
        "parameterTypes": [
          "java.nio.ByteBuffer",
          "int",
          "int"
        ]
      },
      {
        "name": "readBytes",
        "parameterTypes": [
          "int",
          "int"
        ]
      }
    ]
  },
  {
    "name": "sun.font.Type1Font",
    "methods": [
      {
        "name": "readFile",
        "parameterTypes": [
          "java.nio.ByteBuffer"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.Disposer",
    "methods": [
      {
        "name": "addRecord",
        "parameterTypes": [
          "java.lang.Object",
          "long",
          "long"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.InvalidPipeException"
  },
  {
    "name": "sun.java2d.NullSurfaceData"
  },
  {
    "name": "sun.java2d.SunGraphics2D",
    "fields": [
      {
        "name": "clipRegion"
      },
      {
        "name": "composite"
      },
      {
        "name": "eargb"
      },
      {
        "name": "lcdTextContrast"
      },
      {
        "name": "pixel"
      },
      {
        "name": "strokeHint"
      }
    ]
  },
  {
    "name": "sun.java2d.SurfaceData",
    "fields": [
      {
        "name": "pData"
      },
      {
        "name": "valid"
      }
    ]
  },
  {
    "name": "sun.java2d.loops.Blit",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.BlitBg",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.CompositeType",
    "fields": [
      {
        "name": "AnyAlpha"
      },
      {
        "name": "Src"
      },
      {
        "name": "SrcNoEa"
      },
      {
        "name": "SrcOver"
      },
      {
        "name": "SrcOverNoEa"
      },
      {
        "name": "Xor"
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawGlyphList",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawGlyphListAA",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawGlyphListLCD",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawLine",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawParallelogram",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawPath",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawPolygons",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.DrawRect",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.FillParallelogram",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.FillPath",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.FillRect",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.FillSpans",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.GraphicsPrimitive",
    "fields": [
      {
        "name": "pNativePrim"
      }
    ]
  },
  {
    "name": "sun.java2d.loops.GraphicsPrimitiveMgr",
    "methods": [
      {
        "name": "register",
        "parameterTypes": [
          "sun.java2d.loops.GraphicsPrimitive[]"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.MaskBlit",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.MaskFill",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.ScaledBlit",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.SurfaceType",
    "fields": [
      {
        "name": "Any3Byte"
      },
      {
        "name": "Any4Byte"
      },
      {
        "name": "AnyByte"
      },
      {
        "name": "AnyColor"
      },
      {
        "name": "AnyInt"
      },
      {
        "name": "AnyShort"
      },
      {
        "name": "ByteBinary1Bit"
      },
      {
        "name": "ByteBinary2Bit"
      },
      {
        "name": "ByteBinary4Bit"
      },
      {
        "name": "ByteGray"
      },
      {
        "name": "ByteIndexed"
      },
      {
        "name": "ByteIndexedBm"
      },
      {
        "name": "FourByteAbgr"
      },
      {
        "name": "FourByteAbgrPre"
      },
      {
        "name": "Index12Gray"
      },
      {
        "name": "Index8Gray"
      },
      {
        "name": "IntArgb"
      },
      {
        "name": "IntArgbBm"
      },
      {
        "name": "IntArgbPre"
      },
      {
        "name": "IntBgr"
      },
      {
        "name": "IntRgb"
      },
      {
        "name": "IntRgbx"
      },
      {
        "name": "OpaqueColor"
      },
      {
        "name": "ThreeByteBgr"
      },
      {
        "name": "Ushort4444Argb"
      },
      {
        "name": "Ushort555Rgb"
      },
      {
        "name": "Ushort555Rgbx"
      },
      {
        "name": "Ushort565Rgb"
      },
      {
        "name": "UshortGray"
      },
      {
        "name": "UshortIndexed"
      }
    ]
  },
  {
    "name": "sun.java2d.loops.TransformHelper",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "long",
          "sun.java2d.loops.SurfaceType",
          "sun.java2d.loops.CompositeType",
          "sun.java2d.loops.SurfaceType"
        ]
      }
    ]
  },
  {
    "name": "sun.java2d.loops.XORComposite",
    "fields": [
      {
        "name": "alphaMask"
      },
      {
        "name": "xorColor"
      },
      {
        "name": "xorPixel"
      }
    ]
  },
  {
    "name": "sun.java2d.pipe.Region",
    "fields": [
      {
        "name": "bands"
      },
      {
        "name": "endIndex"
      },
      {
        "name": "hix"
      },
      {
        "name": "hiy"
      },
      {
        "name": "lox"
      },
      {
        "name": "loy"
      }
    ]
  },
  {
    "name": "sun.java2d.pipe.RegionIterator",
    "fields": [
      {
        "name": "curIndex"
      },
      {
        "name": "numXbands"
      },
      {
        "name": "region"
      }
    ]
  },
  {
    "name": "sun.nio.ch.FileChannelImpl",
    "fields": [
      {
        "name": "fd"
      }
    ]
  }
]

```

- `relect-config.json`

```bash
[
  {
    "name": "fun.mortnon.framework.log.LazyInitRollingFileAppender",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.RollingFileAppender",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.FileAppender",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.TimeBasedRollingPolicy",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.RollingPolicyBase",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.helper.IntegerTokenConverter",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.helper.DateTokenConverter",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.rolling.helper.FileNamePattern",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.util.FileSize",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.classic.PatternLayout",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.pattern.PatternLayoutBase",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "ch.qos.logback.core.OutputStreamAppender",
    "allDeclaredFields": true,
    "allPublicConstructors": true,
    "allDeclaredMethods": true
  },
  {
    "name": "com.sun.mail.smtp.SMTPTransport",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": [
          "javax.mail.Session",
          "javax.mail.URLName"
        ]
      }
    ]
  },
  {
    "name": "javax.activation.DataContentHandler"
  },
  {
    "name": "javax.activation.MailcapCommandMap"
  },
  {
    "name": "sun.awt.X11FontManager",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "sun.awt.X11.XToolkit",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "sun.awt.X11GraphicsEnvironment",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "sun.java2d.marlin.DMarlinRenderingEngine",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      }
    ]
  },
  {
    "name": "io.netty.channel.epoll.EpollSocketChannel",
    "methods": [
      {
        "name": "<init>",
        "parameterTypes": []
      }
    ]
  }
]
```

然后我们将配置文件添加到项目的 `resource` 目录中，如图：

![](./imgs/micronaut/1.png)

## 4.编译项目

我们将以上文件配置到编译参数中，在 `pom.xml` 的 `properties` 中添加参数如下：

```xml
<micronaut.native-image.args>-H:ReflectionConfigurationFiles=./classes/reflect-config.json -H:ResourceConfigurationFiles=./classes/resource-config.json -H:JNIConfigurationFiles=./classes/jni-config.json</micronaut.native-image.args>
```

最后使用我们制作好的基础镜像，执行项目编译命令，制作制品：

```bash
mvn package -Dpackaging=docker-native -Dmicronaut.native-image.base-image-run=ubi8:freetype
```

## 6. 小结

从以上描述中看，好像整个方法并不困难，但这些问题的解决在国内外的网站上都没有一个统一的解答，都是非常零碎的。甚至我直接向 Micronaut 开源组提问，官方也含糊的让我自己去找 GraalVM 的资料。

经过很长一段时间的查找资料、实践、总结，不断尝试，最终才有了以上成果，并能给大家分享。

Native Image 编译使用 AWT 组件的项目遇到的问题，其实抽象化以后，可以看到其实是编译环境、运行环境、应用三者的一致性问题，我们可以总结其他类似问题的解决思路：

1. 编译失败，查看报错信息，分析编译环境需要相应的环境依赖，解决编译环境问题
2. 运行应用报错，找不到 *.so，分析运行环境需要相应的环境依赖，安装依赖，解决运行环境问题
3. 运行应用，执行逻辑找不到类，分析缺少反射信息，需要在反射文件中添加反射信息，重新编译

以上三步反复验证调整，最终达成三者的统一，使得制作出来的应用能和本地应用一样运行。

当然，还有另一种思路，如果暂时没有办法解决，换一个其他 java 依赖框架或者换一种写法，避开这种无法解决的依赖问题，也是一种策略。

最后，分享制作好的镜像文件，可以直接下载后导入使用：

1. 安装了 freetype 的 Native Image Docker 镜像：链接：https://share.weiyun.com/gJqtyozL 密码：fe4e8n
2. 安装了 freetype 的 Ubi8-minimal 镜像：链接：https://share.weiyun.com/a6ahCJxD 密码：4xutik

示例项目可以参看：[Mortnon GitHub](https://github.com/mortise-and-tenon/mortnon-micronaut) [Mortnon Gitee](https://gitee.com/mortise-and-tenon/mortnon-micronaut)，相应的配置文件可以复制参考。

