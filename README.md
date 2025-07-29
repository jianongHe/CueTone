# CueTone

[中文版](./README_CN.md)

<img width="500" height="382" alt="image" src="https://github.com/user-attachments/assets/c2c14dbf-1ba2-49db-9133-dd59e6b87e99" />

A simple and fun tool for pitch training to help you improve your musical ear! The interface features a hand-drawn sketch style, making the practice process more relaxed and enjoyable.

## Features

- **Play Scale**: Play the C Major scale with one click to get familiar with the notes.
- **Listening Test**: A random note is played, and you need to identify it by clicking on the virtual piano keyboard.
- **Bilingual Support**: Supports both Chinese and English interfaces for user convenience.
- **Hand-drawn Sketch Style**: Unique visual design that makes learning more fun.

## How to Use

1. Click the **"Play Scale"** button to hear the C Major scale.
2. Click the **"Start Listening Test"** button, and the system will play a random note.
3. Click on the note you think you heard on the virtual piano keyboard below.
4. The system will immediately tell you if you're right and provide feedback.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/): Modern JavaScript framework for building user interfaces.
- [Vite](https://vitejs.dev/): Fast build tool.
- [Tone.js](https://tonejs.github.io/): For handling and playing audio in the browser.
- Piano samples are from [Salamander Grand Piano](https://archive.org/details/SalamanderGrandPianoV3).

## Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```
