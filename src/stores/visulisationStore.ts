import { defineStore } from 'pinia';

export const useVisulisationStore = defineStore('visulisationStore', {
  state: () => ({
    diagram: {
      numberOfPoints: 2000,
      factor: 1.005,
    },
    display: {
      outerCircle: true,
      points: true,
      colour: '#9C27B0',
      lineWeight: 0.1,
    },
    animation: {
      play: true,
      pause: true,
      increment: 0.005,
    },
    menuOpen: false,
  }),
});
