/**
 * Vue app bootstrap for the water-breaks-stay-hydrated blog page.
 */
import { createApp } from 'vue/dist/vue.esm-browser.js';
import { initAos } from '../../shared/initAos.js';
import { initMobileMenu } from '../../shared/initMobileMenu.js';

createApp({
  data() {
    return {};
  },
  mounted() {
    initAos();
    initMobileMenu();
  }
}).mount('#app');
