# LAN Server Properties (服务端版)

这是一个纯服务端的 Forge Mod，修改自 rikka0w0 的原版 [LanServerProperties](https://github.com/rikka0w0/LanServerProperties) 模组。

## 功能

本模组只有一个简单但强大的功能：
*   **自动UUID修复**：当服务器在离线模式下（`online-mode=false`）运行时，本模组会自动获取玩家的正版UUID。这可以防止玩家在正版和离线服务器之间切换时丢失物品栏。

所有来自原版模组的客户端GUI功能都已被移除。此改编主要通过AI辅助完成。

## 安装

1.  确保你的服务器已经安装了Forge。
2.  从 [Releases](https://github.com/YUMU1658/LanServerProperties-Server-Forge/releases) 页面下载最新的 `.jar` 文件。
3.  将 `.jar` 文件放入你服务器的 `mods` 文件夹中。
4.  启动服务器。

就这样！当模组在你的 `server.properties` 文件中检测到 `online-mode=false` 时，它会自动激活。

## 开发者

从源码构建：
```
git clone https://github.com/YUMU1658/LanServerProperties-Server-Forge.git
cd LanServerProperties-Server-Forge/forge
./gradlew build
