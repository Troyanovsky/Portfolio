/**
 * Vue app bootstrap for the Other Projects page.
 */
import { createApp } from 'vue/dist/vue.esm-browser.js';
import { initAos } from '../shared/initAos.js';
import { initMobileMenu } from '../shared/initMobileMenu.js';

createApp({
  data() {
    return {
      activeModal: null
    };
  },
  methods: {
    closeAllModals() {
      this.activeModal = null;
    }
  },
  mounted() {
    initAos();
    initMobileMenu();

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }
}).mount('#app');
