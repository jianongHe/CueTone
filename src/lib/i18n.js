import { derived } from 'svelte/store';
import { persistent } from './stores.js';

// The lang store is now persistent
export const lang = persistent('lang', 'zh');

export const translations = {
  zh: {
    title: '音准准',
    subtitle: '一个简单的音准练习工具',
    footer: '由 Gemini & Jiang 制作',
    loading: '正在加载钢琴音源，请稍候...',
    welcome: '欢迎来到音准准！选择一个功能开始练习',
    playingScale: '正在播放C大调音阶...',
    selectFunction: '选择一个功能开始练习',
    selectNote: '请在钢琴上选择你听到的音符',
    correct: '对啦！你选择了 {note}',
    incorrect: "错啦～是 {note} 而不是 {selected}",
    playScaleButton: '播放音阶',
    startTestButton: '听力测试',
    playingButton: '正在播放...',
    footerQuotes: [
      // '“耳朵会唱歌~”',
      // '“今天也要开心呀！”',
      // '“弹奏属于你的旋律。”',
      // '“每个音符都可可爱爱。”',
      '“Do Re Mi Fa So La Ti~”'
    ],
  },
  en: {
    title: 'CueTone',
    subtitle: 'A simple tool for pitch training',
    footerQuotes: [
      '“Your ears are singing~”',
      '“Don\'t forget to be happy!”',
      '“Play your own melody.”',
      '“Every note is adorable.”',
      '“Do Re Mi Fa So La Ti~”'
    ],
    loading: 'Loading piano samples, please wait...',
    welcome: 'Welcome to CueTone! Select a function to start.',
    playingScale: 'Playing C Major scale...',
    selectFunction: 'Select a function to start.',
    selectNote: 'Please select the note you heard on the piano.',
    correct: 'Correct! You chose {note}.',
    incorrect: 'Incorrect. The right note was {note}, you chose {selected}.',
    playScaleButton: 'Play Scale',
    startTestButton: 'Start Listening Test',
    playingButton: 'Playing...',
  },
};

function translate(lang, key, vars) {
  let text = translations[lang][key];
  if (!text) throw new Error(`No translation found for ${lang}.${key}`);

  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      const regex = new RegExp(`{${key}}`, 'g');
      text = text.replace(regex, value);
    }
  }

  return text;
}

export const t = derived(lang, ($lang) => (key, vars) => translate($lang, key, vars));
