<script>
  import { onMount } from 'svelte';
  import { t, lang, translations } from '../lib/i18n.js';
  import LanguageSwitcher from '../components/LanguageSwitcher.svelte';

  export const trailingSlash = 'always';
  export const prerender = false;

  let randomQuote = '';

  function updateQuote(selectedLang) {
    const quotes = translations[selectedLang].footerQuotes;
    randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  }

  onMount(() => {
    // Subscribe to language changes. The callback will be called immediately
    // with the current value, setting the initial quote.
    const unsubscribe = lang.subscribe(newLang => {
      updateQuote(newLang);
    });

    return unsubscribe; // Cleanup subscription on component destroy
  });
</script>

<LanguageSwitcher />

<div class="layout">
  <header>
    <h1>{$t('title')}</h1>
    <p>{$t('subtitle')}</p>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <p>{randomQuote}</p>
  </footer>
</div>

<style>
  @font-face {
    font-family: 'Patrick Hand';
    src: url('/fonts/PatrickHand-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2rem;
    box-sizing: border-box;
  }

  @media (max-width: 600px) {
    .layout {
      padding: 0 1rem;
    }
  }

  main {
    flex: 1;
  }

  header {
    text-align: center;
    margin-bottom: 3rem;
    padding-top: 2rem;
  }

  h1 {
    font-size: 4rem;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
      font-size: 1.2rem;
  }

  footer {
    text-align: center;
    margin-top: 3rem;
    color: #555;
    padding: 1rem 0 2rem;
  }

  :global(body) {
    font-family: 'Patrick Hand', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #fdfdfd;
    color: #333;
    margin: 0;
  }

  /* --- Custom Scrollbar --- */
  :global(::-webkit-scrollbar) {
    width: 6px;
  }
  :global(::-webkit-scrollbar-track) {
    background: #f1f1f1;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: #ccc;
    border-radius: 6px;
  }
  :global(::-webkit-scrollbar-thumb:hover) {
    background: #aaa;
  }
</style>