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
    welcome: '欢迎来到 CueTone！选择一个功能开始练习。',
    playingScale: '正在播放C大调音阶...',
    selectFunction: '选择一个功能开始练习。',
    selectNote: '请在钢琴上选择你听到的音符。',
    correct: '正确！你选择了 {note}',
    incorrect: '错误。正确的音符是 {note}，你选择了 {selected}。',
    playScaleButton: '播放音阶',
    startTestButton: '听力测试',
    playingButton: '正在播放...',
    footerQuotes: [
      '“没有音乐，生命就是一个错误。” - 尼采',
      '“音乐是世界的语言。” - 亨利·沃兹沃斯·朗费罗',
      '“音乐表达的是无法用言语表达，也无法保持沉默的东西。” - 维克多·雨果',
      '“唯一的真理是音乐。” - 杰克·凯鲁亚克',
      '“音乐能在石头上种出花朵。” - 柯尔克孜族谚语'
    ],
  },
  en: {
    title: 'CueTone',
    subtitle: 'A simple tool for pitch training',
    footerQuotes: [
      '“Without music, life would be a mistake.” - Friedrich Nietzsche',
      '“Music is the universal language of mankind.” - Henry Wadsworth Longfellow',
      '“Music expresses that which cannot be put into words and that which cannot remain silent.” - Victor Hugo',
      '“The only truth is music.” - Jack Kerouac',
      '“Music can plant flowers on stones.” - Kyrgyz Proverb'
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
