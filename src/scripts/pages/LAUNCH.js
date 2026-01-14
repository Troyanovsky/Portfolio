/**
 * Vue app bootstrap for the LAUNCH case study page.
 */
import { createApp } from 'vue/dist/vue.esm-browser.js';
import { initAos } from '../shared/initAos.js';
import { initMobileMenu } from '../shared/initMobileMenu.js';

createApp({
  data() {
    return {
      showDiagnosticDetails: false,
      showSpeedDatingDetails: false,
      showPaperDetails: false,
      diagnosticMap: 'Documentation',
      currentStudentContextSlide: 0,
      currentLearningSlide: 0,
      currentWizardSlide: 0,
      studentContextImages: [
        { link: 'LAUNCH/Observation 1.png', text: 'Observation: Notebook' },
        { link: 'LAUNCH/Observation 2.png', text: 'Observation: Prototype' },
        { link: 'LAUNCH/Observation 3.png', text: 'Observation: Whiteboard' },
        { link: 'LAUNCH/Survey.png', text: 'Survey' },
        { link: 'LAUNCH/Survey Response.png', text: 'Survey Response' }
      ],
      learningExperiences: [
        { link: 'LAUNCH/Learning Experience 1.png', text: 'Learning Experience Map 1' },
        { link: 'LAUNCH/Learning Experience 2.png', text: 'Learning Experience Map 2' },
        { link: 'LAUNCH/Learning Experience 3.png', text: 'Learning Experience Map 3' }
      ],
      wizardOfOz: [
        { link: 'LAUNCH/WizardOfOz 1.png', text: 'Wizard Of Oz 1' },
        { link: 'LAUNCH/WizardOfOz 2.png', text: 'Wizard Of Oz 2' },
        { link: 'LAUNCH/WizardOfOz 3.png', text: 'Wizard Of Oz 3' },
        { link: 'LAUNCH/WizardOfOz 4.png', text: 'Wizard Of Oz 4' }
      ]
    };
  },
  computed: {
    diagnosticMapSource() {
      const mapping = {
        Documentation: 'LAUNCH/Diagnostic Map 1.png',
        Assessment: 'LAUNCH/Diagnostic Map 2.png',
        Feedback: 'LAUNCH/Diagnostic Map 3.png',
        Showcase: 'LAUNCH/Diagnostic Map 4.png'
      };
      return mapping[this.diagnosticMap] || mapping.Documentation;
    },
    diagnosticButtonText() {
      return this.showDiagnosticDetails ? 'Show Less' : 'Show More';
    },
    speedDatingButtonText() {
      return this.showSpeedDatingDetails ? 'Show Less' : 'Show More';
    },
    paperButtonText() {
      return this.showPaperDetails ? 'Show Less' : 'Show More';
    }
  },
  methods: {
    toggleDiagnosticDetails() {
      this.showDiagnosticDetails = !this.showDiagnosticDetails;
    },
    toggleSpeedDatingDetails() {
      this.showSpeedDatingDetails = !this.showSpeedDatingDetails;
    },
    togglePaperDetails() {
      this.showPaperDetails = !this.showPaperDetails;
    },

    // Carousel methods
    nextSlide(type) {
      const carousels = {
        studentContext: { slide: 'currentStudentContextSlide', array: this.studentContextImages },
        learning: { slide: 'currentLearningSlide', array: this.learningExperiences },
        wizard: { slide: 'currentWizardSlide', array: this.wizardOfOz }
      };
      const config = carousels[type];
      if (config) {
        this[config.slide] = (this[config.slide] + 1) % config.array.length;
      }
    },
    prevSlide(type) {
      const carousels = {
        studentContext: { slide: 'currentStudentContextSlide', array: this.studentContextImages },
        learning: { slide: 'currentLearningSlide', array: this.learningExperiences },
        wizard: { slide: 'currentWizardSlide', array: this.wizardOfOz }
      };
      const config = carousels[type];
      if (config) {
        this[config.slide] = (this[config.slide] - 1 + config.array.length) % config.array.length;
      }
    },
    setSlide(index, type) {
      const carousels = {
        studentContext: 'currentStudentContextSlide',
        learning: 'currentLearningSlide',
        wizard: 'currentWizardSlide'
      };
      if (carousels[type]) {
        this[carousels[type]] = index;
      }
    }
  },
  mounted() {
    initAos();
    initMobileMenu();
  }
}).mount('#app');
