<template>
  <q-page tag="page" class="flex flex-center dark">
    <div class="full-height" ref="frame" id="sketch"></div>
  </q-page>
</template>
<reference path="../node_modules/@types/p5/global.d.ts" />

<script setup lang="ts">
import { onMounted } from 'vue';
import { useVisulisationStore } from 'src/stores/visulisationStore';
import {Decimal} from 'decimal.js';
import P5 from 'p5';

const store = useVisulisationStore();
let p5:P5;

store.$subscribe((mutation, state) => {
  if (state.animation.play)
    p5.loop();
  else
  {
    p5.noLoop();
    p5.redraw();
  }
})

const verticalPad = 55;
const size = () =>
  window.innerHeight - verticalPad > window.innerWidth
    ? window.innerWidth
    : window.innerHeight - verticalPad;

const radius = () => size() / 2 - 10;

const setup = (p5: P5) => {
  const canvasSize = size() - 3;
  let canvas = p5.createCanvas(canvasSize, canvasSize);
  canvas.parent('sketch');
  p5.noLoop();
};

const draw = (p5: P5) => {
  p5.background(0);
  p5.translate(size() / 2, size() / 2);
  p5.stroke(store.display.colour);
  p5.strokeWeight(store.display.lineWeight);
  p5.noFill();

  drawOuterCircle(p5);
  drawPoints(p5);

  for (let i = 0; i < store.diagram.numberOfPoints; i++) {
    let a = getVector(p5, i, store.diagram.numberOfPoints);
    let b = getVector(p5, i * store.diagram.factor, store.diagram.numberOfPoints);
    p5.line(a.x, a.y, b.x, b.y);
  }

  if (store.animation.pause && store.diagram.factor % 1 == 0) {
    store.animation.play = store.animation.pause = false;
  }

  if (store.animation.play) {
    store.diagram.factor = new Decimal(store.diagram.factor).plus(new Decimal(store.animation.increment)).toNumber();
  }
};

const drawPoints = (p5: P5) => {
  if (!store.display.points) return;
  for (let i = 0; i < store.diagram.numberOfPoints; i++) {
    let a = getVector(p5, i, store.diagram.numberOfPoints);
    i % store.diagram.numberOfPoints == 0
      ? p5.circle(a.x, a.y, 10)
      : p5.circle(a.x, a.y, 3);
  }
};

const drawOuterCircle = (p5: P5) => {
  if (!store.display.outerCircle) return;
  p5.circle(0, 0, radius() * 2);
};

const getVector = (p5: P5, pos: number, points: number) => {
  const angle = p5.map(pos % points, 0, points, 0, p5.TWO_PI);
  const result = P5.Vector.fromAngle(angle - p5.PI / 2);
  result.mult(radius());
  return result;
};

onMounted(() => {
  p5 = new P5(function (p5: P5) {
    p5.setup = () => setup(p5);
    p5.draw = () => draw(p5);
  });
});
</script>

<style>
.dark {
  background-color: black;
}
</style>
