# CueTone

[English](./README.md)

<img width="500" height="382" alt="image" src="https://github.com/user-attachments/assets/c2c14dbf-1ba2-49db-9133-dd59e6b87e99" />

一个简单有趣的音准训练工具，中文名为音准准，帮助你提升音乐听力技能！界面采用手绘涂鸦风格，让练习过程更加轻松愉快。

## 功能

- **播放音阶**：一键播放 C 大调音阶，熟悉各个音符。
- **听音识别**：随机播放一个音符，考验你是否能准确识别并在钢琴键盘上点击出来。
- **双语支持**：支持中文和英文界面，方便不同用户使用。
- **手绘涂鸦风格**：独特的视觉设计，让学习过程更有趣。

## 使用方法

1. 点击 **"播放音阶"** 按钮，先听一遍 C 大调音阶。
2. 点击 **"开始听力测试"** 按钮，系统会随机播放一个音符。
3. 在下方的虚拟钢琴键盘上，点击你认为刚才听到的音符。
4. 系统会立即告诉你是否正确，并提供反馈。

## 技术栈

- [SvelteKit](https://kit.svelte.dev/): 用于构建用户界面的现代 JavaScript 框架。
- [Vite](https://vitejs.dev/): 快速的构建工具。
- [Tone.js](https://tonejs.github.io/): 用于在浏览器中处理和播放音频。
- 钢琴音色采样来自 [Salamander Grand Piano](https://archive.org/details/SalamanderGrandPianoV3)。

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173`。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```