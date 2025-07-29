<script>
  import * as Tone from 'tone';
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { t } from '../lib/i18n.js';
  import Piano from '../components/Piano.svelte';

  // --- State ---
  let sampler;
  let activeNote = '';
  let currentTestNote = '';
  let messageKey = 'loading'; // Key for the translation
  let messageVars = {}; // Variables for the translation
  let uiState = 'loading'; // loading, idle, playing_scale, awaiting_answer

  // --- Visual Feedback State ---
  let feedbackNote = '';
  let feedbackType = ''; // 'correct' or 'incorrect'
  let correctNoteForFeedback = '';


  // --- Lifecycle ---
  onMount(() => {
    if (browser) {
      sampler = new Tone.Sampler({
        urls: {
          A0: "A0.mp3", C1: "C1.mp3", "D#1": "Ds1.mp3", "F#1": "Fs1.mp3", A1: "A1.mp3",
          C2: "C2.mp3", "D#2": "Ds2.mp3", "F#2": "Fs2.mp3", A2: "A2.mp3",
          C3: "C3.mp3", "D#3": "Ds3.mp3", "F#3": "Fs3.mp3", A3: "A3.mp3",
          C4: "C4.mp3", "D#4": "Ds4.mp3", "F#4": "Fs4.mp3", A4: "A4.mp3",
          C5: "C5.mp3", "D#5": "Ds5.mp3", "F#5": "Fs5.mp3", A5: "A5.mp3", C6: "C6.mp3",
        },
        release: 1,
        baseUrl: `${base}/samples/salamander/`,
        onload: () => {
          uiState = 'idle';
          messageKey = 'welcome';
        }
      }).toDestination();
      sampler.volume.value = 15;
    }
  });

  onDestroy(() => {
    if (browser && sampler) {
      sampler.dispose();
      Tone.Transport.stop();
      Tone.Transport.cancel();
    }
  });

  // --- Logic ---
  const scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const testableNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];

  async function playScale() {
    if (uiState !== 'idle') return;

    // Reset feedback from previous test
    feedbackNote = '';
    feedbackType = '';
    correctNoteForFeedback = '';

    uiState = 'playing_scale';
    messageKey = 'playingScale';
    await Tone.start();

    const now = Tone.now();
    scale.forEach((note, i) => {
      const time = now + i * 0.5;
      sampler.triggerAttackRelease(note, '8n', time);
      Tone.Draw.schedule(() => { activeNote = note; }, time);
    });

    if (Tone.Transport.state !== 'started') Tone.Transport.start();

    const duration = scale.length * 0.5 * 1000;
    setTimeout(() => {
      activeNote = '';
      uiState = 'idle';
      messageKey = 'selectFunction';
    }, duration);
  }

  async function startTest() {
    if (uiState !== 'idle') return;
    // Reset feedback from previous test
    feedbackNote = '';
    feedbackType = '';
    correctNoteForFeedback = '';

    uiState = 'awaiting_answer';
    await Tone.start();

    const now = Tone.now();
    const referenceNote = 'C4';
    const testNote = testableNotes[Math.floor(Math.random() * testableNotes.length)];
    currentTestNote = testNote;

    // Schedule reference tones with visual feedback
    sampler.triggerAttackRelease(referenceNote, '8n', now);
    Tone.Draw.schedule(() => { activeNote = referenceNote; }, now);
    Tone.Draw.schedule(() => { activeNote = ''; }, now + 0.5);

    sampler.triggerAttackRelease(referenceNote, '8n', now + 1);
    Tone.Draw.schedule(() => { activeNote = referenceNote; }, now + 1);
    Tone.Draw.schedule(() => { activeNote = ''; }, now + 1.5);

    // Play the actual test note after a delay
    sampler.triggerAttackRelease(testNote, '8n', now + 2);
    // Play the actual test note after a delay
    sampler.triggerAttackRelease(testNote, '8n', now + 3);

    messageKey = 'selectNote';
  }

  function handlePianoClick(event) {
    const selectedNote = event.detail.note;
    if (uiState !== 'loading') sampler.triggerAttackRelease(selectedNote, '8n');

    if (uiState === 'awaiting_answer') {
      feedbackNote = selectedNote;
      if (selectedNote === currentTestNote) {
        feedbackType = 'correct';
        correctNoteForFeedback = '';
        messageKey = 'correct';
        messageVars = { note: selectedNote.slice(0, -1) };
      } else {
        feedbackType = 'incorrect';
        correctNoteForFeedback = currentTestNote;
        messageKey = 'incorrect';
        messageVars = { note: currentTestNote.slice(0, -1), selected: selectedNote.slice(0, -1) };
      }
      currentTestNote = '';
      uiState = 'idle';
    }
  }
</script>

<svelte:head>
  <title>CueTone - Train Your Ear</title>
  <meta name="description" content="A simple, fun, and stylish web app to help you improve your pitch recognition and musical ear." />
  <meta property="og:type" content="website">
  <meta property="og:title" content="CueTone - Train Your Ear">
  <meta property="og:description" content="A simple, fun, and stylish web app to help you improve your pitch recognition and musical ear.">
  <meta property="og:image" content="{base}/cuetone-logo.png">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content="CueTone - Train Your Ear">
  <meta property="twitter:description" content="A simple, fun, and stylish web app to help you improve your pitch recognition and musical ear.">
  <meta property="twitter:image" content="{base}/cuetone-logo.png">
</svelte:head>

<div class="main-card">
  <Piano {activeNote} {feedbackNote} {feedbackType} {correctNoteForFeedback} on:noteclick={handlePianoClick} />
  <div class="controls">
    <button class="btn" on:click={playScale} disabled={uiState !== 'idle'}>
      {#if uiState === 'playing_scale'}{$t('playingButton')}{:else}{$t('playScaleButton')}{/if}
    </button>
    <button class="btn" on:click={startTest} disabled={uiState !== 'idle'}>
      {$t('startTestButton')}
    </button>
  </div>
  {#if messageKey}
    <p class="message">{$t(messageKey, messageVars)}</p>
  {/if}
</div>

<style>
  .main-card {
    background-color: #fff;
    border: 3px solid #333;
    border-radius: 15px 255px 15px 255px / 255px 15px 255px 15px;
    padding: 2rem;
    text-align: center;
    box-shadow: 5px 5px 0px #333;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    .main-card { padding: 1rem; }
  }

  .controls { display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; }

  .btn {
    min-width: 8em;
    background-color: #fff;
    color: #333;
    border: 3px solid #333;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    padding: 0.8rem 1.5rem;
    font-size: 1.2rem;
    font-family: 'Patrick Hand', cursive;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 3px 3px 0px #333;
  }

  .btn:hover:not(:disabled) {
    box-shadow: 5px 5px 0px #333;
    transform: translate(-2px, -2px);
  }

  .btn:active:not(:disabled) {
    box-shadow: 0px 0px 0px #333;
    transform: translate(3px, 3px);
  }

  .btn:disabled {
    background-color: #eee;
    color: #aaa;
    box-shadow: none;
    cursor: not-allowed;
  }

  .message { margin-top: 2rem; font-size: 1.5rem; font-weight: 500; color: #333; min-height: 1.5em; }
</style>