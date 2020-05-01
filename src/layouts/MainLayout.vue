<template>
   <q-layout view="hHh lpR fFf">
    <q-header elevated class="fade">
      <q-toolbar>
        <q-toolbar-title>
          Modular Multiplication Circle
        </q-toolbar-title>
        <div class="q-pr-md">Create cardioid visualisations.</div>
        <q-btn
          flat
          dense
          round
          :icon="!leftDrawerOpen?'menu':'close'"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      class="q-mlg"
      side="right"
      content-class="bg-grey-1"
    >
      <div class="q-pl-lg fit" style="background: black;">
        <q-list dense class="q-pt-sm" style="background: white;">
  <!-- Visualisation-->
          <q-ribbon
            position="left"
            color="white"
            background-color="primary"
            :leaf-color="displayColour"
            decoration="point-in">
              Visualisation
          </q-ribbon>
          <q-item>
            <q-item-section>
              <q-item-label>Number of points</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-slider
                :value="diagramNumberOfPoints"
                @input="setDiagramNumberOfPoints"
                :min="10"
                :max="2000"
                :step="1"
                label
                color="primary"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Step Factor</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-slider
                :disable="animationPlay"
                :value="diagramFactor"
                @input="setDiagramFactor"
                :min="0.01"
                :max="0.2"
                :step="0.01"
                label
                color="primary"
              />
            </q-item-section>
          </q-item>
  <!-- Display-->
          <q-ribbon
            position="left"
            color="white"
            background-color="primary"
            :leaf-color="displayColour" 
            decoration="point-in">
              Display
          </q-ribbon>
          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Outer circle</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="primary" :value="displayOuterCircle" @input="setDisplayOuterCircle"/>
            </q-item-section>
          </q-item>
          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Points</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="primary" :value="displayPoints" @input="setDisplayPoints"/>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Line weight</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-slider
                :value="display_LineWeight"
                @input="setDisplay_LineWeight"
                :min=".1"
                :max="1"
                :step=".1"
                label
                color="primary"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Colour</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-input
                dense
                :value="displayColour"
                @input="setDisplayColour"
                style="max-width: 100px"
              >
                <template v-slot:append>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-color 
                        no-header
                        no-footer
                        :value="displayColour" 
                        @input="setDisplayColour" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-item-section>
          </q-item>
  <!-- Animation-->
          <q-ribbon
            position="left"
            color="white"
            background-color="primary"
            :leaf-color="displayColour"
            decoration="point-in">
              Animation
          </q-ribbon>
          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Play</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle color="primary" :value="animationPlay" @input="setAnimationPlay"/>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Position</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-slider
                :value="animationPosition"
                @input="setAnimationPosition"
                :min="0"
                :max="diagramNumberOfPoints * diagramNumberOfPoints"
                :step="1"
                label
                color="primary"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',
 data () {
    return {
      leftDrawerOpen: false,
      x: .1
    }
  },
  computed: {
    diagramNumberOfPoints () { return this.$store.getters.diagramNumberOfPoints },
    diagramFactor () { return this.$store.getters.diagramFactor },
    displayOuterCircle () { return this.$store.getters.displayOuterCircle },
    displayPoints () { return this.$store.getters.displayPoints },
    displayColour () { return this.$store.getters.displayColour },
    display_LineWeight () { return this.$store.getters.display_LineWeight },
    animationPlay () { return this.$store.getters.animationPlay },
    animationPosition () { return this.$store.getters.animationPosition }
  },
  methods: {
    setDiagramNumberOfPoints (value) { this.$store.commit('setDiagramNumberOfPoints', value) },
    setDiagramFactor (value) { this.$store.commit('setDiagramFactor', value) },
    setDisplayOuterCircle (value) { this.$store.commit('setDisplayOuterCircle', value) },
    setDisplayPoints (value) { this.$store.commit('setDisplayPoints', value) },
    setDisplayColour (value) { this.$store.commit('setDisplayColour', value) },
    setDisplay_LineWeight (value) { this.$store.commit('setDisplay_LineWeight', value) },
    setAnimationPlay (value) { this.$store.commit('setAnimationPlay', value) },
    setAnimationPosition (value) { this.$store.commit('setAnimationPosition', parseInt(value)) }
  }
}
</script>
<style scoped>
.fade{
  background: linear-gradient(145deg,#027be3 11%,#4846ad 75%);
}
</style>
