/**
 * Vue app bootstrap for the PineCones case study page.
 */
import { createApp } from 'vue/dist/vue.esm-browser.js';
import { initAos } from '../shared/initAos.js';
import { initMobileMenu } from '../shared/initMobileMenu.js';

createApp({
  data() {
    return {
      // Collapsible sections
      showProjectBackground: false,
      showPreliminary: false,
      showMARSFlow: false,
      showTeacherFlow: false,

      // Button states
      projectBackgroundButton: 'See project background',
      preliminaryButton: 'See Details',
      flowButton: 'See Details',
      teacherFlowButton: 'See Details',

      // Modal states
      isConceptVideoActive: false,
      isMatrixActive: false,
      isWasteFeatureActive: false,

      // Carousel states
      currentPreliminarySlide: 0,
      currentMARSSlide: 0,
      currentTeacherSlide: 0,

      // Carousel data
      preliminaryResearch: [
        { link: 'PineCones/preliminaryStakeholderMap.png', text: 'Stakeholder Map' },
        { link: 'PineCones/preliminaryCompetitive.png', text: 'Competitive Analysis' }
      ],
      MARSFlow: [
        { link: 'PineCones/flowCollection.png', text: 'Collection Step' },
        { link: 'PineCones/flowSelectionAnnotation.png', text: 'Selection and Annotation Steps' },
        { link: 'PineCones/flowReview.png', text: 'Review Step' }
      ],
      teacherFlow: [
        { link: 'PineCones/teacherFlow 1.png', text: 'Teacher Flow 1' },
        { link: 'PineCones/teacherFlow 2.png', text: 'Teacher Flow 2' },
        { link: 'PineCones/teacherFlow 3.png', text: 'Teacher Flow 3' }
      ]
    };
  },
  methods: {
    // Toggle methods for collapsible content
    toggleProjectBackground() {
      this.showProjectBackground = !this.showProjectBackground;
      this.projectBackgroundButton = this.showProjectBackground
        ? 'Show Less'
        : 'See project background';
    },

    togglePreliminary() {
      this.showPreliminary = !this.showPreliminary;
      this.preliminaryButton = this.showPreliminary ? 'Show Less' : 'See Details';
    },

    toggleMARSFlow() {
      this.showMARSFlow = !this.showMARSFlow;
      this.flowButton = this.showMARSFlow ? 'Show Less' : 'See Details';
    },

    toggleTeacherFlow() {
      this.showTeacherFlow = !this.showTeacherFlow;
      this.teacherFlowButton = this.showTeacherFlow ? 'Show Less' : 'See Details';
    },

    // Carousel methods
    nextSlide(slideType) {
      const mapping = {
        preliminary: { slide: 'currentPreliminarySlide', array: this.preliminaryResearch },
        MARS: { slide: 'currentMARSSlide', array: this.MARSFlow },
        teacher: { slide: 'currentTeacherSlide', array: this.teacherFlow }
      };
      const config = mapping[slideType];
      if (config) {
        this[config.slide] = (this[config.slide] + 1) % config.array.length;
      }
    },

    prevSlide(slideType) {
      const mapping = {
        preliminary: { slide: 'currentPreliminarySlide', array: this.preliminaryResearch },
        MARS: { slide: 'currentMARSSlide', array: this.MARSFlow },
        teacher: { slide: 'currentTeacherSlide', array: this.teacherFlow }
      };
      const config = mapping[slideType];
      if (config) {
        this[config.slide] =
          this[config.slide] === 0 ? config.array.length - 1 : this[config.slide] - 1;
      }
    },

    setSlide(index, slideType) {
      const mapping = {
        preliminary: 'currentPreliminarySlide',
        MARS: 'currentMARSSlide',
        teacher: 'currentTeacherSlide'
      };
      const slideProperty = mapping[slideType];
      if (slideProperty) {
        this[slideProperty] = index;
      }
    }
  },
  mounted() {
    initAos();
    initMobileMenu();
  }
}).mount('#app');
