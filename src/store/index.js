import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    state: {
      diagram: {
        numberOfPoints: 2000,
        factor: 0.05
      },
      display: {
        outerCircle: false,
        points: true,
        colour: "#9C27B0",
        lineWeight: 0.2
      },
      animation: {
        play: false,
        position: 40
      }
    },
    getters: { 
      diagramNumberOfPoints: state => state.diagram.numberOfPoints,
      diagramFactor: state => state.diagram.factor,
      displayOuterCircle: state => state.display.outerCircle,
      displayPoints: state => state.display.points,
      displayColour: state => state.display.colour,
      display_LineWeight: state => state.display.lineWeight,
      animationPlay: state => state.animation.play,
      animationPosition: state => state.animation.position /* * state.diagram.factor */
    },
    mutations: {
      setDiagramNumberOfPoints (state, value) { state.diagram.numberOfPoints = value },
      setDiagramFactor (state, value) { state.diagram.factor = value },
      setDisplayOuterCircle (state, value) { state.display.outerCircle = value },
      setDisplayPoints (state, value) { state.display.points = value },
      setDisplayColour (state, value) { state.display.colour = value },
      setDisplay_LineWeight (state, value) { state.display.lineWeight = value },
      setAnimationPlay (state, value) { 
        state.animation.play = value
        if (!value) state.animation.position = Math.round(state.animation.position) 
      },
      setAnimationPosition (state, value) { state.animation.position = value /* / state.diagram.factor */ }
    },
    strict: process.env.DEV
  })

  return Store
}