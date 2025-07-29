<script>
  import { createEventDispatcher } from 'svelte';

  export let activeNote = ''; // Note to be highlighted by parent
  export let feedbackNote = '';
  export let feedbackType = ''; // 'correct' or 'incorrect'
  export let correctNoteForFeedback = '';

  let clickedNote = ''; // Note to be highlighted on direct click
  let isSweeping = false; // True when mouse is down and moving over keys

  const dispatch = createEventDispatcher();

  const allKeys = [
    { note: 'C4', color: 'white', label: 'C' }, { note: 'C#4', color: 'black', label: 'C#' },
    { note: 'D4', color: 'white', label: 'D' }, { note: 'D#4', color: 'black', label: 'D#' },
    { note: 'E4', color: 'white', label: 'E' },
    { note: 'F4', color: 'white', label: 'F' }, { note: 'F#4', color: 'black', label: 'F#' },
    { note: 'G4', color: 'white', label: 'G' }, { note: 'G#4', color: 'black', label: 'G#' },
    { note: 'A4', color: 'white', label: 'A' }, { note: 'A#4', color: 'black', label: 'A#' },
    { note: 'B4', color: 'white', label: 'B' },
    { note: 'C5', color: 'white', label: 'C' },
  ];

  const row1Keys = allKeys.slice(0, 5);
  const row2Keys = allKeys.slice(5);

  function playNote(note) {
    dispatch('noteclick', { note });
    clickedNote = note;
  }

  function handleMouseDown(note) {
    isSweeping = true;
    playNote(note);
  }

  function handleMouseEnter(note) {
    if (isSweeping) {
      playNote(note);
    }
  }

  function stopSweeping() {
    isSweeping = false;
    clickedNote = '';
  }
</script>

<div class="piano-container" on:mouseup={stopSweeping} on:mouseleave={stopSweeping}>
  <div class="piano single-row">
    {#each allKeys as key}
      <button
        type="button"
        class="key {key.color}"
        class:active={(activeNote === key.note) || (clickedNote === key.note)}
        class:correct-highlight={key.note === correctNoteForFeedback || (feedbackType === 'correct' && feedbackNote === key.note)}
        class:incorrect-highlight={feedbackType === 'incorrect' && feedbackNote === key.note}
        on:mousedown={() => handleMouseDown(key.note)}
        on:mouseenter={() => handleMouseEnter(key.note)}
      >
        <span class="label">{key.label.replace(/#/, '♯')}</span>
        {#if feedbackType === 'correct' && feedbackNote === key.note}
          <div class="feedback-icon">✓</div>
        {/if}
      </button>
    {/each}
  </div>
  <div class="piano two-rows">
    <div class="piano-row">
      {#each row1Keys as key}
        <button
          type="button"
          class="key {key.color}"
          class:active={(activeNote === key.note) || (clickedNote === key.note)}
          class:correct-highlight={key.note === correctNoteForFeedback || (feedbackType === 'correct' && feedbackNote === key.note)}
          class:incorrect-highlight={feedbackType === 'incorrect' && feedbackNote === key.note}
          on:mousedown={() => handleMouseDown(key.note)}
          on:mouseenter={() => handleMouseEnter(key.note)}
        >
          <span class="label">{key.label.replace(/#/, '♯')}</span>
          {#if feedbackType === 'correct' && feedbackNote === key.note}
            <div class="feedback-icon">✓</div>
          {/if}
        </button>
      {/each}
    </div>
    <div class="piano-row">
      {#each row2Keys as key}
        <button
          type="button"
          class="key {key.color}"
          class:active={(activeNote === key.note) || (clickedNote === key.note)}
          class:correct-highlight={key.note === correctNoteForFeedback || (feedbackType === 'correct' && feedbackNote === key.note)}
          class:incorrect-highlight={feedbackType === 'incorrect' && feedbackNote === key.note}
          on:mousedown={() => handleMouseDown(key.note)}
          on:mouseenter={() => handleMouseEnter(key.note)}
        >
          <span class="label">{key.label.replace(/#/, '♯')}</span>
          {#if feedbackType === 'correct' && feedbackNote === key.note}
            <div class="feedback-icon">✓</div>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .piano-container { width: 100%; max-width: 500px; margin: 2rem auto; }
  .key {
    position: absolute;
    box-sizing: border-box;
    border: 3px solid #333;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 10% 0 8px;
    transition: all 0.1s ease;
    -webkit-appearance: none;
    appearance: none;
    background: none;
  }

  /* --- Highlight Styles --- */

  /* Black Keys: Downward Glow */
  .black::before {
    content: '';
    position: absolute;
    top: -10px; left: -10px; right: -10px; bottom: -10px;
    border-radius: inherit;
    background: linear-gradient(to bottom, transparent 40%, var(--highlight-color, transparent) 80%);
    filter: blur(8px);
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
    z-index: -1; /* Place glow behind the key */
  }

  .black.correct-highlight {
    --highlight-color: #28a745;
  }

  .black.incorrect-highlight {
    --highlight-color: #ffc107;
  }

  .black.correct-highlight::before,
  .black.incorrect-highlight::before {
    opacity: 1;
  }

  /* White Keys: Surrounding Glow */
  .white.correct-highlight {
    border-color: #28a745;
    box-shadow: 0 0 15px #28a745;
  }

  .white.incorrect-highlight {
    border-color: #ffc107;
    box-shadow: 0 0 15px #ffc107;
  }

  .white {
    height: 100%;
    background-color: white;
    color: #333;
    z-index: 1;
    top: 0;
  }
  .black {
    height: 60%;
    background-color: #333;
    color: white;
    z-index: 2;
    top: 0;
  }
  .white.active {
    background: repeating-linear-gradient(45deg, #fff, #fff 10px, #eee 10px, #eee 20px);
    transform: translate(2px, 2px);
  }
  .black.active {
    background: #777777;
    transform: translate(1px, 1px);
  }
  .label { font-size: 1.5em; user-select: none; font-family: 'Patrick Hand', cursive; }
  .white .label { align-self: flex-end; }
  .black .label { font-size: 1.2em; }

  .feedback-icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3em;
    font-family: 'Patrick Hand', cursive;
    pointer-events: none;
    color: #28a745;
    z-index: 4; /* Ensure it's above the key and glow */
  }

  /* --- DESKTOP: Single Row Fluid Layout --- */
  .two-rows { display: none; }
  .single-row { display: block; position: relative; height: 0; padding-bottom: 41.66%; }
  .single-row .white { width: 12.5%; }
  .single-row .black { width: 7.5%; }
  .single-row .key:nth-child(1) { left: 0; }
  .single-row .key:nth-child(3) { left: 12.5%; }
  .single-row .key:nth-child(5) { left: 25%; }
  .single-row .key:nth-child(6) { left: 37.5%; }
  .single-row .key:nth-child(8) { left: 50%; }
  .single-row .key:nth-child(10) { left: 62.5%; }
  .single-row .key:nth-child(12) { left: 75%; }
  .single-row .key:nth-child(13) { left: 87.5%; }
  .single-row .key:nth-child(2) { left: calc(12.5% - 3.75%); }
  .single-row .key:nth-child(4) { left: calc(25% - 3.75%); }
  .single-row .key:nth-child(7) { left: calc(50% - 3.75%); }
  .single-row .key:nth-child(9) { left: calc(62.5% - 3.75%); }
  .single-row .key:nth-child(11) { left: calc(75% - 3.75%); }

  /* --- MOBILE: Two Row Fixed-Key Layout --- */
  @media (max-width: 520px) {
    .single-row { display: none; }
    .two-rows { display: flex; flex-direction: column; align-items: center; gap: 5px; }
    .piano-row { position: relative; height: 110px; }
    .two-rows .key { height: 100%; }
    .two-rows .black { height: 60%; }
    .feedback-icon {
      bottom: 10%;
    }

    /* Row 1: 3 white keys (C, D, E) */
    .two-rows .piano-row:nth-child(1) { width: 150px; }
    .two-rows .piano-row:nth-child(1) .white { width: 50px; }
    .two-rows .piano-row:nth-child(1) .black { width: 30px; }
    .two-rows .piano-row:nth-child(1) .key:nth-child(1) { left: 0px; }
    .two-rows .piano-row:nth-child(1) .key:nth-child(3) { left: 50px; }
    .two-rows .piano-row:nth-child(1) .key:nth-child(5) { left: 100px; }
    .two-rows .piano-row:nth-child(1) .key:nth-child(2) { left: calc(50px - 15px); }
    .two-rows .piano-row:nth-child(1) .key:nth-child(4) { left: calc(100px - 15px); }

    /* Row 2: 5 white keys (F, G, A, B, C) */
    .two-rows .piano-row:nth-child(2) { width: 250px; }
    .two-rows .piano-row:nth-child(2) .white { width: 50px; }
    .two-rows .piano-row:nth-child(2) .black { width: 30px; }
    .two-rows .piano-row:nth-child(2) .key:nth-child(1) { left: 0px; }
    .two-rows .piano-row:nth-child(2) .key:nth-child(3) { left: 50px; }
    .two-rows .piano-row:nth-child(2) .key:nth-child(5) { left: 100px; }
    .two-rows .piano-row:nth-child(2) .key:nth-child(7) { left: 150px; }
    .two-rows .piano-row:nth-child(2) .key:nth-child(8) { left: 200px; }
    .two-rows .piano-row:nth-child(2) .key:nth-child(2) { left: calc(50px - 15px); }
    .two-rows .piano-row:nth-child(2) .key:nth-child(4) { left: calc(100px - 15px); }
    .two-rows .piano-row:nth-child(2) .key:nth-child(6) { left: calc(150px - 15px); }

    .two-rows .black .label { font-size: 1em; }

    .feedback-icon {
      font-size: 2em;
    }
  }
</style>