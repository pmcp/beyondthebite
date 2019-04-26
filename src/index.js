require("normalize.css/normalize.css");
require("./styles/index.scss");

import updateOnScroll from 'uos';
import anime from "animejs";
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

const roadHeight = document.getElementById("road").clientHeight;
document.body.style.height = roadHeight + 'px';


const wayPoints = [
  {
    id: "One",
    position: 50,
    active: false
  },
  {
    id: "Two",
    position: 80,
    active: false
  }
];

// // Animations using animejs
// function animateIn(chapter) {
//   const targetContainer = "#chapter" + chapter;
//   const targetLines = "#image" + chapter + " .animateLines path";
//   let tl = anime.timeline({});

//   tl.add({
//     targets: targetContainer,
//     translateX: 0,
//     translateY: 10,
//     opacity: 1,
//     duration: 800,
//     easing: "easeOutCubic"
//   })
//     .add(
//       {
//         targets: "#drawing" + chapter +  " path",
//         strokeDashoffset: [anime.setDashoffset, 0],
//         easing: "easeInOutSine",
//         duration: 1500,
//         // delay: function(el, i) { return i * 250 },
//         direction: "alternate",
//         loop: false
//       },
//       0
//     )
//     .add(
//       {
//         targets: targetContainer,
//         strokeDashoffset: [anime.setDashoffset, 0],
//         easing: "easeInOutSine",
//         duration: 1500,
//         // delay: function(el, i) { return i * 250 },
//         direction: "alternate",
//         loop: false
//       },
//       0
//     );
// }

// // Animations using animejs
// function animateOut(chapter) {
//   const targetContainer = "#chapter" + chapter;
//   const targetLines = "#image" + chapter + " .animateLines path";
//   var tl = anime.timeline({
//     easing: "easeOutExpo",
//     duration: 750
//   });

//   tl.add({
//     targets: targetContainer,
//     translateX: 0,
//     translateY: -10,
//     opacity: 0,
//     duration: 2000,
//     easing: "easeOutCubic"
//   });
// }





// // Draw the road svg
// const path = document.querySelector("#road-path");
// const pathLength = path.getTotalLength();
// path.style.strokeDasharray = pathLength + " " + pathLength;
// path.style.strokeDashoffset = pathLength;
// path.getBoundingClientRect();
// console.log()
// document.addEventListener("scroll", function() {
//   let h = document.documentElement,
//     b = document.body,
//     st = "scrollTop",
//     sh = "scrollHeight";
//   // Need to doc this, but this was horrible, document.documentElement.scrollHeight kept changing due to ThreeJS (I think)
//   function getDocHeight() {
//     var D = document;
//     return Math.max(
//       D.body.scrollHeight,
//       D.documentElement.scrollHeight,
//       D.body.offsetHeight,
//       D.documentElement.offsetHeight,
//       D.body.clientHeight,
//       D.documentElement.clientHeight
//     );
//   }

//   let scrollPercentage =
//     (h[st] || b[st]) / ((getDocHeight() || b[sh]) - h.clientHeight);

//   let drawLength = pathLength * scrollPercentage;
//   path.style.strokeDashoffset = pathLength - drawLength;
//   if (scrollPercentage >= 0.99) {
//     path.style.strokeDasharray = "none";
//   } else {
//     path.style.strokeDasharray = pathLength + " " + pathLength;
//   }
//   for (let index = 0; index < wayPoints.length; index++) {
//     let trigger = wayPoints[index].position / 100;

//     // Going In
//     if (
//       trigger + 0 <= scrollPercentage &&
//       scrollPercentage <= trigger + 0.2
//     ) {
      
//       if (wayPoints[index].active) {
        
//       } else {
        
//         wayPoints[index].active = true;
//         // console.log('in', wayPoints[index])
//         animateIn(wayPoints[index].id);
//       }
//     }

//     // Going Out
//     if (scrollPercentage < trigger - 0.2) {
//       if (wayPoints[index].active) {
//         // console.log('out', wayPoints[index])
//         animateOut(wayPoints[index].id);
//         wayPoints[index].active = false;
        
//       } else {
        
//       }
//     }
//   }
// });

// for (let index = 0; index < wayPoints.length; index++) {
//   const el = wayPoints[index];
//   const top = (roadHeight / 100) * el.position;
//   document
//     .getElementById("chapter" + el.id)
//     .style.setProperty("top", top + "px");
// }






var tl = anime.timeline({
  // easing: 'easeOutExpo',
  autoplay: false
  // duration: 70
});



updateOnScroll(0, 1, progress => {
  
  tl.seek(progress * 1000);
  // console.log(progress)
});


tl.add(
  {
    targets: '#road path',
    // translateY: 1000,
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 400,
    delay: 0,
    // delay: anime.random(0, 10),
    loop: false,
    direction: "normal",
    // easing: "easeInOutSine",
    autoplay: false,
    update: function(anim) {
      console.log(anim.progress)
    },
  },
  0
).add(
  {
    targets: '#imageOne path',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 100,
    // delay: '-=200',
    loop: false,
    direction: "normal",
    easing: "easeInOutSine",
    autoplay: false
  },
  '-=300',
)
.add(
  {
    targets: '#road-path2',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 600,
    // delay: anime.random(0, 10),
    loop: false,
    direction: "normal",
    // easing: "easeInOutSine",
    autoplay: false,

  },
  '-=100',
)
.add(
  {
    targets: '#imageTwo path',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 100,
    loop: false,
    direction: "normal",
    easing: "easeInOutSine",
    autoplay: false
  },
  '-=500'
)
. add({
      targets: '#chapterOne',
      translateX: 0,
      translateY: -10,
      opacity: 1,
      duration: 2000,
      easing: "easeOutCubic"
    })
    . add({
      targets: '#chapterOne',
      translateX: 0,
      translateY: -10,
      opacity: 1,
      duration: 2000,
      easing: "easeOutCubic"
    })
    
    ;



// var pathEls = document.querySelectorAll("path");
// for (var i = 0; i < pathEls.length; i++) {
//   var pathEl = pathEls[i];
//   var offset = anime.setDashoffset(pathEl);
//   pathEl.setAttribute("stroke-dashoffset", offset);
//   tl.add(
//     {
//       targets: pathEl,
//       // translateX: 250,
//       strokeDashoffset: [offset, 0],
//       duration: 1000,
//       // delay: anime.random(0, 10),
//       loop: false,
//       direction: "normal",
//       easing: "easeInOutSine",
//       autoplay: false
//     },
//     0
//   );
// }
