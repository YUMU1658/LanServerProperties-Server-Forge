# LAN Server Properties (Server Edition)

[简体中文](README_zh-CN.md)

This is a server-side only Forge mod, adapted from the original [LanServerProperties](https://github.com/rikka0w0/LanServerProperties) mod by rikka0w0.

## Features

This mod has one simple but powerful feature:
*   **Automatic UUID Fix**: When a server is running in offline mode (`online-mode=false`), this mod automatically fetches the genuine UUID for players. This prevents inventory loss when players switch between online and offline servers.

All client-side GUI features from the original mod have been removed.

## Installation

1.  Make sure you have Forge installed on your server.
2.  Download the latest `.jar` file from the [Releases](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY/releases) page.
3.  Place the `.jar` file into your server's `mods` folder.
4.  Start your server.

That's it! The mod will automatically activate when it detects `online-mode=false` in your `server.properties`.

## For Developers

To build this mod from source:
```
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY/forge
./gradlew build
