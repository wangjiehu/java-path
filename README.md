# java-path

java-path 是一个面向初学者的 Java 学习网站原型，包含 13 个 Level、104 个练习关卡。页面把课程讲解、官方资料、学习路径、代码编辑器、标准输入、控制台输出和提交验证放在同一个工作台里。

## 直接体验

在线访问：

<https://wangjiehu.github.io/java-path/>

这是 GitHub Pages 静态体验版，不需要安装 JDK。线上页面会自动使用浏览器端教学预览模式，支持基础输出语句、简单变量输出和字符串拼接预览。真实 Java 编译运行需要本地 Node 服务或后续接入云端 JDK 沙箱。

## 课程基线

课程以 Java 核心语法、标准库和后端工程常用路径为主，练习代码尽量使用单文件 `Main.java`，方便初学者专注在一个概念上。官方资料会优先引用 Oracle、OpenJDK、Spring、Maven、Gradle、JUnit 等一手文档；其中 API 链接可能同时出现 Java LTS 版本和当前版本，课程讲解只依赖稳定语法和通用 API，不要求学习者追随某个非 LTS 版本。

## 学习进度

页面会把完成进度和每一关的编辑器草稿记录在当前浏览器的 `localStorage` 中。标准输入只用于本次运行，不会被长期保存。提交当前关卡并通过验证后，下一关才会解锁，并可直接进入下一关；未解锁关卡会在左侧目录中置灰并禁止点击。点击右上角重置按钮会清空本机进度和草稿，并重新锁定后续关卡。

## 本地运行

```powershell
cd "D:\Wonderful\Pursuing coding\java-path"
npm start
```

打开：

```text
http://localhost:4173
```

如果 `4173` 已被占用，可以临时换端口：

```powershell
$env:PORT=4273
npm start
```

然后打开 `http://localhost:4273`。

本地服务会优先检测 `java` 命令。如果当前机器有可用 JDK，会把页面中的标准输入一起传给进程，并通过服务端执行单文件程序：

```powershell
java Main.java
```

如果没有 JDK，本地服务会退回教学预览模式，不会把预览结果伪装成真实编译结果。

## 项目检查

首次在本机检查前安装依赖和 Playwright 浏览器：

```powershell
npm ci
npx playwright install chromium
npm run verify
```

`verify` 会先检查课程文件数量、13 个 Level 的 104 关完整性、必填字段、标题匹配、重复 ID、内容长度和官方资料链接来源白名单，然后启动本地页面并用 Playwright 做桌面/移动端 UI 回归，覆盖关卡锁定、提交解锁、进度恢复、重置确认、答案抽屉、专注模式和横向溢出检查。

## GitHub Pages 发布

推送到 `main` 分支后，`.github/workflows/deploy-pages.yml` 会自动：

1. 检出仓库。
2. 使用 Node.js 24 安装依赖，并运行 `npm run verify`。
3. 将 `public/` 目录发布到 GitHub Pages。

仓库 Pages 入口应保持为：

<https://wangjiehu.github.io/java-path/>

如果首次启用 Pages，需要在 GitHub 仓库 `Settings -> Pages` 中把 `Source` 设为 `GitHub Actions`。

## 代码结构

- `server.js`：静态资源服务、健康检查和 Java 运行接口。
- `public/index.html`：页面骨架和脚本加载顺序。
- `public/course-outline.js`：13 个 Level、104 关的目录大纲。
- `public/lesson-content-level*.js`：每个 Level 的完整课程内容。
- `public/app.js`：课程加载、编辑器、答案面板、进度和交互逻辑。
- `public/styles.css`：日夜模式、桌面和移动端布局、编辑器和弹窗样式。
- `scripts/validate-lessons.js`：课程结构、数量、来源和内容完整度校验。

## 练习台原则

学习者不需要安装 JDK，也不需要配置本地编译器。正式产品应采用：

```text
浏览器 -> 后端 API -> 云端 JDK 沙箱 -> 返回编译和运行结果
```

当前原型的提交验证不要求代码和参考答案逐字一致，会按关卡类型做基础检查，例如 Java 主结构、输出语句、SQL 关键字、Spring 类/注解、工程命令或配置片段。正式产品应进一步接入运行结果、测试用例和隐藏用例。

## 云端编译器设计

- 每次运行创建一次隔离任务。
- 使用 JDK LTS 镜像作为主线运行环境。
- 限制用户代码的 CPU、内存、磁盘、网络和运行时间。
- 每次运行后销毁临时文件和容器。
- 返回标准输出、标准错误、退出码、耗时和友好的中文解释。
- 后续支持多文件项目、JUnit 判题、Maven/Gradle 项目和 Spring Boot 练习。
