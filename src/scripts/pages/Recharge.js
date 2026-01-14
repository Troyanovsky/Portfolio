/**
 * Vue app bootstrap for the Recharge case study page.
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
          question: 'How do I customize reminder intervals in the Recharge extension?',
          answer:
            'To set personalized reminder intervals for your breaks, click on the Recharge extension icon in the Chrome toolbar. Within the settings popup, use the sliders to customize timing for each type of break, including eye breaks, water breaks, movement breaks, and stretch breaks. You can adjust the timing from 0 to 60 minutes, making it easy to fit reminders into your work schedule.'
        },
        {
          question:
            'Can I disable specific types of break reminders, like water or movement reminders?',
          answer:
            "Absolutely! Recharge allows you to disable any reminder you don't need. Open the extension popup, where you'll see switches to toggle each reminder type—such as eye, water, movement, or stretch reminders—on or off. This flexibility helps you receive only the notifications that suit your work and wellness routine."
        },
        {
          question: 'Will Recharge interrupt my work with frequent notifications?',
          answer:
            'No, Recharge is designed to enhance productivity by running quietly in the background. It sends gentle, unobtrusive desktop notifications at the specific intervals you choose for each type of break. These reminders help you maintain healthy habits, like staying hydrated or moving around, without disrupting your workflow.'
        },
        {
          question: 'Is the Recharge extension free to download and use from the Chrome Web Store?',
          answer:
            "Yes, Recharge is completely free! You can easily download and use this productivity-boosting Chrome extension directly from the Chrome Web Store. It's an excellent, no-cost tool for maintaining healthier work habits at your computer."
        },
        {
          question:
            'Does Recharge allow me to customize break types like eye strain relief, hydration, or stretching?',
          answer:
            'Yes! Recharge is fully customizable to include different break types such as blink breaks, hydration reminders, movement prompts, and stretch breaks. You can adjust each reminder type individually to support various aspects of wellness during long hours at your computer, making it easy to focus on the health reminders that matter most to you.'
        },
        {
          question: 'How does the Recharge extension help with productivity and well-being?',
          answer:
            "Recharge is designed to support your productivity and well-being by providing timely, adjustable reminders for essential breaks. These breaks help reduce eye strain, encourage hydration, prompt movement, and support muscle stretching, which all contribute to better health and more effective work sessions. The extension's notifications keep you mindful of your health while working efficiently."
        },
        {
          question: 'Are there notification sound options for the reminders in Recharge?',
          answer:
            'Yes, Recharge includes optional notification sounds to accompany each reminder. You can enable or disable sound alerts in the settings popup to ensure notifications are noticeable but not disruptive. This feature adds a layer of customization, helping you choose a reminder style that fits your working environment best.'
        },
        {
          question: "How do I know when it's time for a break with the Recharge Chrome extension?",
          answer:
            "Recharge makes it easy to remember your breaks by sending desktop notifications according to the interval you set. Each notification is clearly labeled by break type (eye, hydration, movement, or stretch), making it straightforward to identify which reminder is active and take the appropriate action. You'll receive gentle prompts throughout the day, helping you maintain healthy habits."
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
