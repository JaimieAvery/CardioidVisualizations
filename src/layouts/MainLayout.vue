<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="fade">
      <q-toolbar>
        <q-toolbar-title> Modular Arithmetic Circle </q-toolbar-title>
        <div class="q-pr-md">Create cardioid visualisations.</div>
        <q-btn flat dense round :icon="!store.menuOpen ? 'menu' : 'close'" aria-label="Menu" @click="toggleMenu()" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="store.menuOpen" overlay side="right" style="background: black">
      <q-list>
        <q-item>
          <q-item-section>
            <q-item-label style="font-weight: bolder; font-size: larger">
              Visualisation Options
            </q-item-label>
            <q-item-label caption style="font-size: larger">
              Change the rendering of the visulisation.
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item>
          <q-item-section>
            <q-item-label>Number of points ({{
              store.diagram.numberOfPoints
            }})</q-item-label>
            <q-item-label caption>Set the number of points around the circle to draw lines
              from.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-slider v-model="store.diagram.numberOfPoints" :min="10" :max="2000" :step="1" label />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item v-ripple tag="label">
          <q-item-section>
            <q-item-label>Outer circle</q-item-label>
            <q-item-label caption>Line draw the containing circle.</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle color="primary" v-model="store.display.outerCircle" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item v-ripple tag="label">
          <q-item-section class="menuItem">
            <q-item-label>Points</q-item-label>
            <q-item-label caption>Draw the points around the circle.</q-item-label>
          </q-item-section>
          <q-item-section side class="menuItem">
            <q-toggle color="primary" v-model="store.display.points" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item>
          <q-item-section class="menuItem">
            <q-item-label>Line weight ({{ store.display.lineWeight }})</q-item-label>
            <q-item-label caption>Adding more weight to the line increases the
              brightness.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="menuItem">
            <q-slider v-model="store.display.lineWeight" :min="0.1" :max="1" :step="0.1" label color="primary" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item>
          <q-item-section class="menuItem">
            <q-item-label>Colour</q-item-label>
            <q-item-label caption>Sets the draw colour.</q-item-label>
          </q-item-section>
          <q-item-section side class="menuItem">
            <q-input dense v-model="store.display.colour" style="max-width: 100px">
              <template v-slot:append>
                <q-icon name="colorize" class="cursor-pointer" color="primary">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color no-header no-footer v-model="store.display.colour" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-separator inset spaced />
        <q-item>
          <q-item-section class="menuItem">
            <q-item-label>Factor Increment ({{ store.animation.increment }})</q-item-label>
            <q-item-label caption>Control the speed of the animation by adding decimal amount, rather than a whole number,
              when playing.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="menuItem">
            <q-slider v-model="store.animation.increment" :min="0.0001" :max="0.0999" :step="0.0001" label
              color="primary" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item>
          <q-item-section>
            <q-item-label>Factor({{ store.diagram.factor }})</q-item-label>
            <q-item-label caption>Set the multiplication value used to draw the visualisation.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="menuItem">
            <q-slider :disable="store.animation.play" v-model="store.diagram.factor" :min="1" :max="1000" label
              color="primary" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item v-ripple tag="label">
          <q-item-section class="menuItem">
            <q-item-label>Play</q-item-label>
            <q-item-label caption>Increments the factor by the step amount below to animate the
              visualisation.</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle color="primary" v-model="store.animation.play" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

        <q-item v-ripple tag="label">
          <q-item-section class="menuItem">
            <q-item-label>Pause</q-item-label>
            <q-item-label caption>Pause the visualisation at the next whole number.</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle color="primary" v-model="store.animation.pause" />
          </q-item-section>
        </q-item>

        <q-separator inset spaced />

      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useVisulisationStore } from 'src/stores/visulisationStore';

const store = useVisulisationStore();
const toggleMenu = () => (store.menuOpen = !store.menuOpen);
</script>

<style scoped>
.fade {
  background: linear-gradient(145deg, #027be3 11%, #4846ad 75%);
}

.menu {
  background: black;
}

.menuItem {
  background: black;
  color: white;
  max-width: 295px;
}
</style>
