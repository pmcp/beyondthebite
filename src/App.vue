<template>
  <div id="app">
    <!-- <div v-anime="{ rotate: '1turn', backgroundColor: '#FFF', duration: 2000, loop: true }"> test</div> -->
     <canvas></canvas>
      <tests-waypoint style="position:relative;top:1000px" @in="goingIn"></tests-waypoint>
      <input v-model="number">
      <tests-phenomenon :speed="0.0001" :number="number"></tests-phenomenon>
      
      <!-- <tests-phenomenon :speed="0.01" :name="'mos2'"></tests-phenomenon> -->
      
      <Chapter></Chapter>
  </div>
</template>

<script>
import testsWaypoint from "./components/Tests.Waypoint.vue";
import testsPhenomenon from "./components/Tests.Phenomenon.vue";
import Chapter from "./components/Chapter.vue";



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export default {
  name: "app",
  components: {
    testsWaypoint,
    testsPhenomenon,
    Chapter
  },
  data: function() {
    return {
    number: 1000,
    showBubble: false
    }
  },
  methods: {
    goingIn(number){
      console.log('here', {number})
      var count = getRandomInt(100,5000);
      console.log(count)
       this.number = count;
    }
   
  }
};
</script>

<style>

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  /* height: 50000px; */
  background-color: white;
}

.anim {
  position: relative;
  top: 2000px;
}
.anim,
.anim svg {
  width: 100%;
  height: auto;
}
.anim path {
  stroke-width: 0.8;
}

canvas {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
}

.text {
  position: fixed;
  width: 100%;
  text-align: center;
  font-size: 3em;
  padding: 30px;
  background-color: yellow;
  top: 10vh;
}



</style>
