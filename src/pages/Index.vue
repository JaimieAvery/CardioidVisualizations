<template>
  <q-page  tag="page" class="flex flex-center dark">
    <div class='full-height' ref="frame" id='sketch'>
    </div>
  </q-page>
</template>

<script>
import P5 from "p5";

export default {
  name: 'Index',
  computed: {
    size () {
      let h = window.innerHeight - 52
      let w = window.innerWidth
      if (h>w)
        return w
      else
        return h
    },
    radius () {
      return this.size/2 - 10
    },
    diagramNumberOfPoints () {
      return this.$store.getters.diagramNumberOfPoints
    },
    diagramFactor () {
      return this.$store.getters.diagramFactor
    },
    displayOuterCircle () {
      return this.$store.getters.displayOuterCircle
    },
    displayPoints () {
      return this.$store.getters.displayPoints
    },
    displayColour () {
      return this.$store.getters.displayColour
    },
    displayLineWeight () {
      return this.$store.getters.display_LineWeight
    },
    animationPlay () {
      return this.$store.getters.animationPlay
    },
    animationPosition () {
      return this.$store.getters.animationPosition
    }
  },
  methods: {
    setup(p5) {
      let canvas = p5.createCanvas(this.size - 3, this.size - 3)
      canvas.parent('sketch')
    },    
    draw(p5) {
      p5.background(0);
      p5.translate(this.size/2, this.size/2);
      p5.stroke(this.displayColour);
      p5.strokeWeight(this.displayLineWeight);
      p5.noFill()
      
      this.drawOuterCircle(p5);
      this.drawPoints(p5);
      
      let factor = this.diagramFactor * this.animationPosition
      if (this.animationPlay) {
        this.setAnimationPosition(Math.round((this.animationPosition + this.diagramFactor + Number.EPSILON) * 100) / 100) 
        // fuck you and your decimal arithmetic javascript! 
        // https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
      }
      
      for (let i = 0; i < this.diagramNumberOfPoints; i++) {
          let a = this.getVector(p5, i, this.diagramNumberOfPoints);
          let b = this.getVector(p5, i * factor, this.diagramNumberOfPoints);
          p5.line(a.x, a.y, b.x, b.y);
      }
    },
    drawPoints(p5) {
      if (!this.displayPoints) return;
      for (let i = 0; i < this.diagramNumberOfPoints; i++) {
          let a = this.getVector(p5, i, this.diagramNumberOfPoints);
          i % this.diagramNumberOfPoints == 0 ? p5.circle(a.x, a.y, 10) : p5.circle(a.x, a.y, 3);
      }
    },
    drawOuterCircle(p5) {
      if (!this.displayOuterCircle) return;
      p5.circle(0, 0, this.radius * 2)
    },
    getVector(p5, pos, points) {
      const angle = p5.map(pos % points, 0, points, 0, p5.TWO_PI);
      const result = P5.Vector.fromAngle(angle - p5.PI/2);
      result.mult(this.radius);
      return result;
    },
    setAnimationPosition (value) {
      this.$store.commit('setAnimationPosition', value)
    }
  },
  mounted() {
    let _setup = this.setup;
    let _draw = this.draw;
    new P5(function (p5) {
      p5.setup = _ => _setup(p5)
      p5.draw = _ => _draw(p5)
    });
  }
}
</script>

<style>
.dark{
  background-color: black;
}
</style>