require("normalize.css/normalize.css");
require("./styles/index.scss");

import anime from "animejs";
import base from "./base.js";
import instance from "./instance.js";
const { renderer, scene, camera } = base();
let { mesh, uniforms } = instance(20);
import { getArrayWithNoise, getRandomBetween } from "./utils";
import { CompressedTextureLoader } from "three";

scene.add(mesh);

let progress = -0.4;

uot(
  p => {
    progress = p;
    if (p === 1) {
      let mesh2 = instance(200).mesh;
      scene.add(mesh2);

      const newCameraPosition = getArrayWithNoise([10, 20, 40], 5);
    }
  },
  5000,
  Infinity
);

function animate() {
  requestAnimationFrame(animate);
  uniforms.uProgress.value = progress;
  renderer.render(scene, camera);
}

animate();

const roadHeight = document.getElementById("road").clientHeight;
const wayPoints = [
  {
    id: "One",
    position: 15,
    active: false
  },
  {
    id: "Two",
    position: 30,
    active: false
  }
];

// Animations using animejs
function animateIn(chapter) {
  const targetContainer = "#chapter" + chapter;
  const targetLines = "#image" + chapter + " .animateLines path";
  let tl = anime.timeline({});

  tl.add({
    targets: targetContainer,
    translateX: 0,
    translateY: 10,
    opacity: 1,
    duration: 800,
    easing: "easeOutCubic"
  })
    .add(
      {
        targets: "#drawing" + chapter +  " path",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        // delay: function(el, i) { return i * 250 },
        direction: "alternate",
        loop: false
      },
      0
    )
    .add(
      {
        targets: targetContainer,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 1500,
        // delay: function(el, i) { return i * 250 },
        direction: "alternate",
        loop: false
      },
      0
    );
}

// Animations using animejs
function animateOut(chapter) {
  const targetContainer = "#chapter" + chapter;
  const targetLines = "#image" + chapter + " .animateLines path";
  var tl = anime.timeline({
    easing: "easeOutExpo",
    duration: 750
  });

  tl.add({
    targets: targetContainer,
    translateX: 0,
    translateY: -10,
    opacity: 0,
    duration: 2000,
    easing: "easeOutCubic"
  });
}

// Draw the road svg
const path = document.querySelector("#road-path");
const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength + " " + pathLength;
path.style.strokeDashoffset = pathLength;
path.getBoundingClientRect();

document.addEventListener("scroll", function() {
  let h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  // Need to doc this, but this was horrible, document.documentElement.scrollHeight kept changing due to ThreeJS (I think)
  function getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
  }

  let scrollPercentage =
    (h[st] || b[st]) / ((getDocHeight() || b[sh]) - h.clientHeight);

  let drawLength = pathLength * scrollPercentage;
  path.style.strokeDashoffset = pathLength - drawLength;
  if (scrollPercentage >= 0.99) {
    path.style.strokeDasharray = "none";
  } else {
    path.style.strokeDasharray = pathLength + " " + pathLength;
  }
console.log(scrollPercentage)
  for (let index = 0; index < wayPoints.length; index++) {
    let trigger = wayPoints[index].position / 100;

    // Going In
    if (
      trigger + 0.1 <= scrollPercentage &&
      scrollPercentage <= trigger + 0.2
    ) {
      
      if (wayPoints[index].active) {
        
      } else {
        
        wayPoints[index].active = true;
        console.log('in', wayPoints[index])
        animateIn(wayPoints[index].id);
      }
    }

    // Going Out
    if (scrollPercentage < trigger - 0.2 || scrollPercentage > trigger + 0.4) {
      console.log('out', wayPoints[index])
      if (wayPoints[index].active) {
        animateOut(wayPoints[index].id);
        wayPoints[index].active = false;
        
      } else {
        
      }
    }
  }
});

for (let index = 0; index < wayPoints.length; index++) {
  const el = wayPoints[index];
  const top = (roadHeight / 100) * el.position;
  document
    .getElementById("chapter" + el.id)
    .style.setProperty("top", top + "px");
}


