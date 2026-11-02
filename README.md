# GitHub / Reddit 汉化扩展

## 1.2.0 升级

已安装的用户：打开扩展管理页，找到此扩展，点击“重新加载”，再刷新 GitHub 或 Reddit 页面。保持原文件夹路径，可以保留原扩展设置。

新增 www.reddit.com、reddit.com、old.reddit.com 常用界面汉化，包括导航、帖子操作、评论操作、搜索提示和部分设置菜单。支持动态内容与可访问的开放 Shadow DOM。Reddit 使用独立的本地词库，并非直接套用 GitHub 词库，不翻译帖子及评论正文。新界面或词库未覆盖的内容仍显示英文。

“GitHub 汉化”和“Reddit 汉化”分别控制两个网站，互不影响；旧版总开关设置会自动迁移；“增强匹配”在 Reddit 上包含评论数量等动态文字的匹配。保存设置后刷新页面生效。

## 安装

1. 在 Chrome 打开 chrome://extensions（Edge 使用 edge://extensions）。
2. 开启“开发者模式”，点击“加载已解压的扩展程序”。
3. 选择下载并解压后的项目文件夹（包含 manifest.json 的目录）。
4. 刷新已打开的 GitHub 页面。无需 Tampermonkey。

点击工具栏扩展图标可开关汉化、增强匹配，然后刷新页面生效。GitHub 部分支持 github.com、gist.github.com、skills.github.com、education.github.com、www.githubstatus.com。

基于 maboloshi/github-chinese 的完整本地词库与页面规则，包含动态页面、菜单、导航等适配。界面汉化不等于翻译 README、Issue 正文或源代码；词库可能滞后于 GitHub 页面更新。默认保留上游的内容忽略规则。

所有汉化代码及词库随扩展提供，运行时无需调用翻译服务，不上传页面内容。不请求后台服务或额外跨站网络权限。

## 开发

修改 adapter-start.js、adapter-end.js 或上游文件后执行 node build.mjs，再到扩展管理页重新加载并刷新 GitHub。弹窗文件可以直接修改。

content.js 是打包产物，请修改对应源文件。上游原始脚本保留用于溯源，不需要另行安装。

授权和来源见 NOTICE.md、LICENSE。
