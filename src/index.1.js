require("normalize.css/normalize.css");
require("./styles/index.scss");

import updateOnScroll from "uos";
import anime from "animejs";
import { CompressedTextureLoader } from "three";


// import base from "./base.js";
// import instance from "./instance.js";
// const { renderer, scene, camera } = base();
// let { mesh, uniforms } = instance(20);
// import { getArrayWithNoise, getRandomBetween } from "./utils";
// import { CompressedTextureLoader } from "three";

// scene.add(mesh);

// let progress = -0.4;

// uot(
//   p => {
//     progress = p;
//     if (p === 1) {
//       let mesh2 = instance(200).mesh;
//       scene.add(mesh2);

//       const newCameraPosition = getArrayWithNoise([10, 20, 40], 5);
//     }
//   },
//   5000,
//   Infinity
// );

// function animate() {
//   requestAnimationFrame(animate);
//   uniforms.uProgress.value = progress;
//   renderer.render(scene, camera);
// }

// animate();

// const roadHeight = document.getElementById("road").clientHeight;
// document.body.style.height = roadHeight + 'px';





function checkInView(container, element, partial) {

  //Get container properties
  let cTop = container.scrollTop;
  let cBottom = cTop + container.clientHeight;

  //Get element properties
  let eTop = element.offsetTop;
  let eBottom = eTop + element.clientHeight;

  //Check if in view    
  let isTotal = (eTop >= cTop && eBottom <= cBottom);
  let isPartial = partial && (
    (eTop < cTop && eBottom > cTop) ||
    (eBottom > cBottom && eTop < cBottom)
  );

  //Return outcome
  return  (isTotal  || isPartial);
}




const wayPoints = [
  {
    id: "One",
    position: 30,
    active: false
  },
  {
    id: "Two",
    position: 60,
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
const path = document.querySelector("#roadPath");
const pathLength = path.getTotalLength();
console.log(path, pathLength)
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
  for (let index = 0; index < wayPoints.length; index++) {
    let trigger = wayPoints[index].position / 100;

    // // Going In
    // if (
    //   trigger + 0 <= scrollPercentage &&
    //   scrollPercentage <= trigger + 0.2
    // ) {

    //   if (wayPoints[index].active) {

    //   } else {

    //     wayPoints[index].active = true;
    //     console.log('in', wayPoints[index])
    //     animateIn(wayPoints[index].id);
    //     container(wayPoints[index].id);
    //   }
    // }

    // // Going Out
    // if (scrollPercentage < trigger - 0.2) {
    //   if (wayPoints[index].active) {
    //     console.log('out', wayPoints[index])
    //     animateOut(wayPoints[index].id);
    //     wayPoints[index].active = false;

    //   } else {

    //   }
    // }
    

    if( trigger <= scrollPercentage &&
        scrollPercentage <= trigger + 0.2 ) {
          console.log({trigger, scrollPercentage})
          
        }
  }
});










for (let index = 0; index < wayPoints.length; index++) {
  const el = wayPoints[index];
  const top = pathLength / 100 * 0.8 * el.position;
  document
    .getElementById("chapter" + el.id)
    .style.setProperty("top", top + "px");
}

























// var path = document.querySelector('#roadPath');
// var pathLength = path.getTotalLength();

// path.style.strokeDasharray = pathLength + ' ' + pathLength;
// path.style.strokeDashoffset = pathLength;
// path.getBoundingClientRect();
// // When the page scrolls...


// window.addEventListener("scroll", function(e) {
 
//   // What % down is it? 
//   var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    
//   // Length to offset the dashes
//   var drawLength = pathLength * scrollPercentage*0.8;
  
//   // Draw in reverse
//   path.style.strokeDashoffset = pathLength - drawLength;
    
//   // When complete, remove the dash array, otherwise shape isn't quite sharp
//  // Accounts for fuzzy math


 
//   // if (scrollPercentage >= 0.99) {
//   //   path.style.strokeDasharray = "none";

    
//   // } else {
//   //   path.style.strokeDasharray = pathLength + ' ' + pathLength;
//   // }
  
// });