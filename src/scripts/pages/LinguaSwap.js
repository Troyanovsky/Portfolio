/**
 * Vue app bootstrap for the LinguaSwap case study page.
 */
import { createApp } from 'vue/dist/vue.esm-browser.js';
import { initAos } from '../shared/initAos.js';
import { initMobileMenu } from '../shared/initMobileMenu.js';

createApp({
  data() {
    return {
      openAccordions: [0], // Start with first FAQ open
      faqs: [
        {
          question: 'What is the best Chrome extension for learning vocabulary while browsing?',
          answer:
            "LinguaSwap is an innovative Chrome extension that seamlessly integrates vocabulary learning into your daily browsing. It automatically replaces words you're learning with their translations, making it an effective tool for passive language learning while reading online content."
        },
        {
          question: 'How can I learn a new language while browsing the internet?',
          answer:
            'LinguaSwap offers a unique approach to learning language while browsing by allowing you to create a personalized vocabulary list and automatically replacing words you know in your native language with their translations in your target language, creating an immersive learning experience during regular web browsing.'
        },
        {
          question: 'What is LinguaSwap and how does it work?',
          answer:
            'LinguaSwap is a Chrome extension that transforms everyday browsing into a language learning experience. It works by allowing users to highlight words in their native language while browsing, save them with translations, and automatically replace these words with their target language equivalents during future browsing sessions.'
        },
        {
          question: 'Is there a free tool to learn vocabulary while reading online?',
          answer:
            'Yes, LinguaSwap is a free Chrome extension that helps you learn vocabulary while reading online. It includes a hosted backend for translations and features like word list management, making it an accessible tool for language learners without requiring additional API subscriptions.'
        },
        {
          question: 'How do I set up LinguaSwap in my browser?',
          answer:
            'Setting up LinguaSwap is a simple three-step process: First, install the extension from the Chrome Web Store. Then, open the LinguaSwap extension to configure your default (native) and target (learning) languages. Finally, you can start browsing and adding words to your vocabulary list.'
        },
        {
          question: 'What are the main features of LinguaSwap?',
          answer:
            "LinguaSwap's main features include interactive vocabulary building through language pair setup, effortless word addition via right-click menu, dynamic word replacement while browsing, and user-friendly word list management through the extension popup. The latest version also includes search, sort, and export capabilities for your word list."
        },
        {
          question: 'Do I need a DeepL API key to use LinguaSwap?',
          answer:
            "No, you don't need a DeepL API key anymore. While version 1.0.0 required users to have their own DeepL API key, the current version (1.0.1) includes a hosted backend that handles translations without requiring individual API keys."
        },
        {
          question: 'How can I manage my saved words in LinguaSwap?',
          answer:
            'You can manage your saved words through the LinguaSwap popup interface, which allows you to edit translations, delete words, adjust language settings, and use new features like searching, sorting, and exporting your word list.'
        },
        {
          question: 'What makes LinguaSwap different from other language learning extensions?',
          answer:
            'LinguaSwap stands out by offering a unique approach to vocabulary acquisition through natural reading. Instead of traditional flashcards or exercises, it seamlessly integrates target language words into your everyday browsing, creating an immersive learning experience without disrupting your regular online activities.'
        },
        {
          question: 'Can LinguaSwap help with passive language learning?',
          answer:
            'Yes, LinguaSwap is specifically designed for passive language learning. By automatically replacing familiar words with their translations in your target language, it helps you naturally absorb vocabulary while reading content you’re interested in, making language learning an effortless part of your daily routine.'
        },
        {
          question: 'How can I support LinguaSwap?',
          answer:
            'Since LinguaSwap now offers hosted translation API for free, the best way to support the project is through Buy Me a Coffee at buymeacoffee.com/troyanovsky. Your support helps maintain the free translation service and enables continued development of new features.'
        }
      ]
    };
  },
  methods: {
    toggleAccordion(index) {
      const accordionIndex = this.openAccordions.indexOf(index);
      if (accordionIndex > -1) {
        this.openAccordions.splice(accordionIndex, 1);
      } else {
        this.openAccordions.push(index);
      }
    },
    isAccordionOpen(index) {
      return this.openAccordions.includes(index);
    }
  },
  mounted() {
    initAos();
    initMobileMenu();
  }
}).mount('#app');
