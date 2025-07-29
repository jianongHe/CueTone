<script>
  import { lang } from '../lib/i18n.js';

  function toggleLanguage() {
    lang.update(current => (current === 'zh' ? 'en' : 'zh'));
  }
</script>

<button class="lang-btn" on:click={toggleLanguage}>
  {$lang === 'zh' ? 'EN' : '中'}
</button>

<style>
  .lang-btn {
    background-color: #fff;
    color: #333;
    border: 3px solid #333;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    font-family: 'Patrick Hand', cursive;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 3px 3px 0px #333;
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 10;
  }

  .lang-btn:hover {
    box-shadow: 5px 5px 0px #333;
    transform: translate(-2px, -2px);
  }

  .lang-btn:active {
    box-shadow: 0px 0px 0px #333;
    transform: translate(3px, 3px);
  }

  @media (max-width: 600px) {
    .lang-btn {
      top: 1rem;
      right: 1rem;
      padding: 0.3rem 0.8rem;
      font-size: 1rem;
    }
  }
</style>
