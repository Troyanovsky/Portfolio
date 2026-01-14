/**
 * Vue app bootstrap for the main landing page.
 */
import { createApp } from 'vue/dist/vue.esm-browser.js';
import { initAos } from '../shared/initAos.js';
import { initMobileMenu } from '../shared/initMobileMenu.js';
import { scrollToView } from '../shared/scrollToView.js';

createApp({
  data() {
    return {};
  },
  methods: {
    scrollToView(viewId) {
      scrollToView(viewId);
    }
  },
  mounted() {
    initAos();
    initMobileMenu();
  }
}).mount('#app');
