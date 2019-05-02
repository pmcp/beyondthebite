require("normalize.css/normalize.css");
require("./styles/index.scss");

import anime from "animejs";

import { getArrayWithNoise, getRandomBetween } from "./utils";

// INSTANCE


function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}



// let instance;
// let uniforms = {
//   time: {
//     value: 0
//   }
// };




// function createInstance({ rainbow = false, geometry, material, multiplier, duration, points }) {
  
//   const attributes = [
//     {
//       name: 'aPositionStart',
//       data: points[0],
//       size: 3,
//     },
//     {
//       name: 'aControlPointOne',
//       data: points[1],
//       size: 3,
//     },
//     {
//       name: 'aControlPointTwo',
//       data: points[2],
//       size: 3,
//     },
//     {
//       name: 'aPositionEnd',
//       data: points[3],
//       size: 3,
//     },
//     {
//       name: 'aOffset',
//       data: i => [i * ((1 - duration) / (multiplier - 1))],
//       size: 1,
//     },
//   ];

//   if (rainbow) {
//     attributes.push({
//       name: 'aColor',
//       data: (i, total) => {
//         const color = new THREE.Color();
//         color.setHSL(i / total, 0.6, 0.7);
//         return [color.r, color.g, color.b];
//       },
//       size: 3,
//     });
//   }

//   // const uniforms = {
//   //   time: {
//   //     value: 0,
//   //   },
//   // };

//   const vertex = `
//     attribute vec3 aPositionStart;
//     attribute vec3 aControlPointOne;
//     attribute vec3 aControlPointTwo;
//     attribute vec3 aPositionEnd;
//     attribute float aOffset;
//     uniform float time;
//     ${rainbow ? `attribute vec3 aColor; varying vec3 vColor;` : ``}

//     float easeInOutSin(float t){
//       return (${getRandomBetween(1)} + sin(${Math.PI} * t - ${Math.PI} / ${getRandomBetween(2)})) / ${getRandomBetween(2)};
//     }

//     vec4 quatFromAxisAngle(vec3 axis, float angle) {
//       float halfAngle = angle * 0.8;
//       return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
//     }

//     vec3 rotateVector(vec4 q, vec3 v) {
//       return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
//     }

//     vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
//       return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
//     }


//     void main(){
//       float tProgress = easeInOutSin(min(1.0, max(0.0, (time - aOffset)) / ${duration}));
//       vec4 quatX = quatFromAxisAngle(vec3(1.0, 0.0, 0.0), -1.0 * tProgress);
//       vec4 quatY = quatFromAxisAngle(vec3(0.0, 1.0, 0.0), -5.0 * tProgress);
//       vec3 basePosition = rotateVector(quatX, rotateVector(quatY, position));
//       vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
//       float scale = tProgress * 2.0 - 1.0;
//       scale = 1.0 - scale * scale;
//       basePosition *= scale;
//       gl_Position = basePosition + newPosition;
//       ${rainbow ? `vColor = aColor;` : ``}
//     }
//   `;

//   const fragment = rainbow
//     ? [
//         ['#define PHONG', 'varying vec3 vColor;'],
//         ['vec4( diffuse, opacity )', 'vec4( vColor, opacity )'],
//         ['vec3 totalEmissiveRadiance = emissive;', 'vec3 totalEmissiveRadiance = vColor;'],
//       ]
//     : [];

//   instance = new THREE.Phenomenon({
//     attributes,
//     uniforms,
//     vertex,
//     geometry,
//     multiplier,
//     material,
//     fragment,
//   });

//   scene.add(instance.mesh);
//   return instance;
// }

// const renderer = new THREE.WebGLRenderer({
//   antialias: true,
//   alpha: true
// });

// renderer.setClearColor(0x212121, 0);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio >= 2 ? 2 : 1);

// document.querySelector('#particles').appendChild(renderer.domElement);
// // document.body.appendChild(renderer.domElement);

// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
// camera.position.set(0, 20 * 1, 35 * 1);
// camera.lookAt(scene.position);
// scene.add(camera);

// const ambientLight = new THREE.AmbientLight('#000000', 0.1);
// scene.add(ambientLight);

// const light = new THREE.SpotLight(0x000000, 1, 80, Math.PI * 0.25, 1, 2);
// light.position.set(0, 40, 0);

// scene.add(light);

// createInstance({
//   geometry: new THREE.CircleGeometry(.03, 12, 1),
//   // material = new THREE.MeshBasicMaterial({
//   //     color: "#000",
//   //     emissive: "#ff6e40",
//   //     flatShading: false,
//   //     shininess: 100
//   //   }),
//   material: new THREE.MeshBasicMaterial({
//     transparent: true,
//     opacity: 1,
//     emissive: '#ff6e40',
//     specular: '#efefef',
//     color: '#000',
//     shininess: 100,
//     flatShading: true,
//   }),
//   multiplier: 2000,
//   duration: 6.4,
//   points: [
//     () => getArrayWithNoise([-10, 0, 0], 4),
//     () => getArrayWithNoise([-2.5, -10, 0], 4),
//     () => getArrayWithNoise([2.5, 10, 0], 4),
//     () => getArrayWithNoise([10, 0, 0], 4),
    
//   ],
// })


// let opacityDown = function(){
  
//   uot(p=>{
    
//     instance.mesh.material.opacity = 1 - p;
//     if (p === 1) {
//       goingDown = false;
//     }
//   },100)
  

// }


// let time = -0.4;
// let goingDown = false;
// uot(
//   p => {
//     time = p;
    
//     if(p > 2 && goingDown === false) {
//       goingDown = true;
//       opacityDown()
      
      
//     }
//     if (p === 1) {
      
//       scene.remove(instance.mesh);
      
//       createInstance({
//         geometry: new THREE.CircleGeometry(.03, 12, 1),
//         material: new THREE.MeshBasicMaterial({
//           transparent: true,
//           opacity: 1,
//           emissive: '#ff6e40',
//           specular: '#efefef',
//           color: '#000',
//           shininess: 100,
//           flatShading: true,
//         }),
//         multiplier: 2000,
//         duration: 6.4,
//         points: [
//           () => getArrayWithNoise([-10, 0, 0], 4),
//           () => getArrayWithNoise([-2.5, -10, 0], 4),
//           () => getArrayWithNoise([2.5, 10, 0], 4),
//           () => getArrayWithNoise([10, 0, 0], 4),
//         ],
//       })
     
//     }
//   },
//   12000,
//   Infinity
// );

// function animate() {
//   requestAnimationFrame(animate);
  
//   uniforms.time.value = time;
//   renderer.render(scene, camera);
// }

// animate();







// SVG Animations
function Drawing(id) {
  this.animation = anime
    .timeline({})
    .add({
      targets: "#" + id + " path.animatedRoad",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 3000,
      easing: "easeInOutSine"
    })
    .add({
      targets: "#" + id + " path.animatedLine",
      delay: function(el, i) { return i * 250 },
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1000,
      
    });
}

let drawings = {};
drawings.drawingOne = new Drawing("drawingOne");
drawings.drawingTwo = new Drawing("drawingTwo");
drawings.drawingThree = new Drawing("drawingThree");
drawings.drawingFour = new Drawing("drawingFour");
drawings.drawingFive = new Drawing("drawingFive");



let screenTop = window.pageYOffset || document.documentElement.scrollTop;
let screenBottom = (window.pageYOffset || document.documentElement.scrollTop) + window.innerHeight; 


// Write this in a way it ties in with the OOF
function drawChapters() {
  let animatedEls = document.querySelectorAll('.animate_svg');
Array.prototype.forEach.call(animatedEls, function(element, index) {
    const rect = element.getBoundingClientRect();
  
    const boxTop = rect.top + screenTop;
    const boxHeight = rect.height;
    const boxBottom = boxTop + boxHeight;
    const ani = drawings[element.id].animation;
    ani.seek(ani.duration * 100);
    if (boxTop > screenTop) {
      // ani.seek(ani.duration * 100);
      if (boxBottom < screenBottom - 200) {
        console.log(1)
        ani.seek(ani.duration * 100);
      } else if (boxTop < screenBottom) {
        
        
        let percent = (screenBottom - boxTop - 500) / boxHeight;
        console.log(percent)
        ani.seek(ani.duration * percent);
      }
    } else if (boxBottom > screenTop) {
      
      let percent = (screenBottom - boxTop - 500) / boxHeight;
      console.log(3, percent)
      ani.seek(ani.duration  * percent);
    }

});

}


drawChapters();

window.addEventListener("scroll", function(e) {
  drawChapters();
  
});
