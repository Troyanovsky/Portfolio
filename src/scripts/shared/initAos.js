/**
 * Initializes AOS with shared defaults while allowing overrides.
 */
import AOS from 'aos';

const defaultOptions = {
  duration: 800,
  easing: 'ease-in-out',
  once: true
};

export function initAos(overrides = {}) {
  AOS.init({ ...defaultOptions, ...overrides });
}
