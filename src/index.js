require("normalize.css/normalize.css");
require("./styles/index.scss");

const audio1 = require("./assets/audio/1.mp3");
const audio2 = require("./assets/audio/2.mp3");
const audio3 = require("./assets/audio/3.mp3");
const audio4 = require("./assets/audio/4.mp3");
const audio5 = require("./assets/audio/5.mp3");
const mosquito = require("./assets/audio/mosq.mp3");

import anime from "animejs";
import { getArrayWithNoise, getRandomBetween } from "./utils";

// Audio Player: Mosquitos
const mosquitoAudio = new Plyr("#mosquitoAudio", {});
mosquitoAudio.source = {
  type: 'audio',
  autoplay: true,
  loop: true,
  sources: [
      {
          src: mosquito,
          type: 'audio/mp3',
      }
  ]
};
mosquitoAudio.volume = 0.1;


// Audio Player: Chapters
const chaptersAudio = new Plyr("#chaptersAudio", {});



let mute = false;


// ThreeJS: Mosquitos
let instance;
let uniforms = {
  time: {
    value: 0
  }
};

function createInstance({ geometry, material, multiplier, duration, points }) {
  const attributes = [
    {
      name: "aPositionStart",
      data: points[0],
      size: 3
    },
    {
      name: "aControlPointOne",
      data: points[1],
      size: 3
    },
    {
      name: "aControlPointTwo",
      data: points[2],
      size: 3
    },
    {
      name: "aPositionEnd",
      data: points[3],
      size: 3
    },
    {
      name: "aOffset",
      data: i => [i * ((1 - duration) / (multiplier - 1))],
      size: 1
    }
  ];

  const vertex = `
    attribute vec3 aPositionStart;
    attribute vec3 aControlPointOne;
    attribute vec3 aControlPointTwo;
    attribute vec3 aPositionEnd;
    attribute float aOffset;
    uniform float time;

    float easeInOutSin(float t){
      return (${getRandomBetween(1)} + sin(${Math.PI} * t - ${
    Math.PI
  } / ${getRandomBetween(2)})) / ${getRandomBetween(2)};
    }

    vec4 quatFromAxisAngle(vec3 axis, float angle) {
      float halfAngle = angle * 0.8;
      return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
    }

    vec3 rotateVector(vec4 q, vec3 v) {
      return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }


    void main(){
      float tProgress = easeInOutSin(min(1.0, max(0.0, (time - aOffset)) / ${duration}));
      vec4 quatX = quatFromAxisAngle(vec3(1.0, 0.0, 0.0), -1.0 * tProgress);
      vec4 quatY = quatFromAxisAngle(vec3(0.0, 1.0, 0.0), -5.0 * tProgress);
      vec3 basePosition = rotateVector(quatX, rotateVector(quatY, position));
      vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
      float scale = tProgress * 2.0 - 1.0;
      scale = 1.0 - scale * scale;
      basePosition *= scale;
      gl_Position = basePosition + newPosition;
    }
  `;

  const fragment = [];

  instance = new THREE.Phenomenon({
    attributes,
    uniforms,
    vertex,
    geometry,
    multiplier,
    material,
    fragment
  });

  scene.add(instance.mesh);
  return instance;
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setClearColor(0x212121, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio >= 2 ? 2 : 1);

document.querySelector("#particles").appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 20 * 1, 35 * 1);
camera.lookAt(scene.position);
scene.add(camera);

const ambientLight = new THREE.AmbientLight("#000000", 0.1);
scene.add(ambientLight);

const light = new THREE.SpotLight(0x000000, 1, 80, Math.PI * 0.25, 1, 2);
light.position.set(0, 40, 0);

scene.add(light);
let time = 0;
function createMovingMosquitos() {
  // Reset time to zero
  time = 0;
  // Create the mesh
  createInstance({
    geometry: new THREE.CircleGeometry(0.06, 12, 1),
    material: new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 1,
      color: "#000",
      flatShading: true
    }),
    multiplier: 2000,
    duration: 2.4,
    points: [
      () => getArrayWithNoise([-10, 0, 0], 4),
      () => getArrayWithNoise([-2.5, -10, 0], 4),
      () => getArrayWithNoise([2.5, 10, 0], 4),
      () => getArrayWithNoise([10, 0, 0], 4)
    ]
  });
  // Set mesh opacity to almost invisible
  instance.mesh.material.opacity = 0.1;


  // Start timer that will animate the particles
  uot(p => {
    // Progress the animation
    time = p;
    // Opacity in
    if (p < 0.3) {
      if (instance.mesh.material.opacity >= 1) {
        return;
      } else {
        instance.mesh.material.opacity =
          instance.mesh.material.opacity + instance.mesh.material.opacity / 10;
      }
    }
    // Opacity out
    if (p > 0.5) {
      if (instance.mesh.material.opacity <= 0) {
        return;
      } else {
        instance.mesh.material.opacity = instance.mesh.material.opacity - instance.mesh.material.opacity / 100;
      }
    }
    // remnove mesh and create a new one
    if (p === 1) {
      scene.remove(instance.mesh);
      createMovingMosquitos();
    }
  }, 20000);
}

// First time creating the mosquitos
createMovingMosquitos();
// Start the animation
function animate() {
  requestAnimationFrame(animate);
  uniforms.time.value = time;
  renderer.render(scene, camera);
}
animate();



// Chapters
const screenTop = window.pageYOffset || document.documentElement.scrollTop;
const screenBottom =
  (window.pageYOffset || document.documentElement.scrollTop) +
  window.innerHeight;

// SVG Animations
function Drawing(id, audio) {
  this.playing = false;
  this.audio = audio;
  this.id = id;
  this.animation = anime
    .timeline({
      autoplay: false
    })
    .add({
      targets: "#" + id + " path.animatedRoad",
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 50000,
      easing: "easeInOutSine"
    })
    .add({
      targets: "#" + id + " path.animatedLine",
      delay: function(el, i) {
        return i * 250;
      },
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: 1000
    });
  this.inView = false;
  this.element = document.getElementById(id);
  this.rect = this.element.getBoundingClientRect();
}

var drawings = [];
drawings.push(new Drawing("drawingOne", audio1));
drawings.push(new Drawing("drawingTwo", audio2));
drawings.push(new Drawing("drawingThree", audio3));
drawings.push(new Drawing("drawingFour", audio4));
drawings.push(new Drawing("drawingFive", audio5));


// Set the begin durations to zero
function setDurationtoZero() {
  const arrayLength = drawings.length;
  for (let i = 0; i < arrayLength; i++) {
    let element = drawings[i].element;
    const ani = drawings[i].animation;
    ani.seek(0);
    
  }
}
setDurationtoZero()

function playChapterAudio(id) {
  if(mute) {
    // User muted the audio, so do nothing
  } else {
    // stop player
    chaptersAudio.stop()

    // indicate that nothing is playing
    const arrayLength = drawings.length;
    for (let i = 0; i < arrayLength; i++) {
      drawings[i].playing = false;
    }

    // set source with audio from active chapter
    chaptersAudio.source = {
      type: 'audio',
      autoplay: true,
      loop: true,
      sources: [
          {
              src: drawings[id].audio,
              type: 'audio/mp3',
          }
      ]
    };

    // set value of playing for this chapter to true;
    drawings[id].playing = true;
  }
}

// function fadeVolume(modifier, id) {
//   uot(p => {
//     itemaudio.volume = audio.volume + p*modifier;
//     if (p === 1) {
//     }
//   }, 1000);
// }

// loop over chapters and animate the svg paths on scroll
function loopDrawings() {
  const arrayLength = drawings.length;
  for (let i = 0; i < arrayLength; i++) {
    let element = drawings[i].element;
    const rect = element.getBoundingClientRect();
    const boxTop = rect.top + screenTop;
    const boxHeight = rect.height;
    const boxBottom = boxTop + boxHeight;
    const ani = drawings[i].animation;
    if (boxTop > screenTop) {
      if (boxBottom < screenBottom - 0) {
        // ani.seek(ani.duration * 100);
      } else if (boxTop < screenBottom) {
        let percent = (screenBottom - boxTop - 200) / boxHeight;

        if(percent > 0.2 && drawings[i].playing === false) {
          playChapterAudio(i)
        }
        ani.seek(ani.duration * percent);
      }
    } else if (boxBottom > screenTop) {
      let percent = (screenBottom - boxTop - 200) / boxHeight;
      ani.seek(ani.duration * percent);
    }
  }
}

window.addEventListener("scroll", function(e) {
  loopDrawings();
});


// Nav toggle
function toggleNav() {
  const navToggle = document.getElementById("navToggle");
  navToggle.classList.toggle("active");
  const navOverlay = document.getElementById("navOverlay");
  navOverlay.classList.toggle("open");
}
const link = document.getElementById("navToggle");
link.addEventListener("click", toggleNav);


function stopAllBGAudio() {
  if(chaptersAudio.playing) {
    chaptersAudio.stop()
  }
  
  if(mosquitoAudio.playing) {
    mosquitoAudio.stop()
  }
}

// let vimeoPlayer = new Plyr("#vimeoPlayer", {});

let vimeoPlayer;

// const vimeoPlayerID = document.getElementById("vimeoPlayer");
// Video toggle

function toggleVideo(id) {
  console.log(id)

  // Stop all audio
  stopAllBGAudio();
  mute = true;
  


  


  const videoToggle = document.getElementById("videoToggle");
  videoToggle.classList.toggle("active");
  const videoOverlay = document.getElementById("videoOverlay");
  videoOverlay.classList.toggle("open");
  
  if (id === "close" ) {
    vimeoPlayer.destroy();
  } else {
    
  document.getElementById("vimeoPlayer").setAttribute("data-plyr-embed-id", id);
  vimeoPlayer = new Plyr("#vimeoPlayer", {});

    
  
    
  }
}

// Start video
const playButtons = document.querySelectorAll(".chapter__play");
playButtons.forEach(function(elem) {
  elem.addEventListener("click", function() {
    toggleVideo(this.dataset.value);
  });
});

// Stop video
const closeVideo = document.getElementById("videoToggle");
closeVideo.addEventListener("click", function() {
  toggleVideo(this.dataset.value);
});

// Go to chapter from nav
function goToChapter(id) {
  
  toggleNav();
  document.getElementById(id).scrollIntoView({
    behavior: "smooth"
  });
}

const navButtons = document.querySelectorAll(".svg__chapter");
navButtons.forEach(function(elem) {
  elem.addEventListener("click", function() {
    goToChapter(this.dataset.value);
  });
});




function toggleAllBGAudio() {
  chaptersAudio.togglePlay()
  mosquitoAudio.togglePlay()
}



// Stop video



// const audioButtons = document.querySelectorAll(".audio__button");
// audioButtons.forEach(function(elem) {
//   console.log(elem)
//   elem.addEventListener("click", function() {

//     elem.classList.toggle("active");

//   });
// });

const toggleBGAudio = document.getElementById("bgAudioToggle");
toggleBGAudio.addEventListener("click", function() {
  mute = !mute;
  toggleAllBGAudio();

  const audioButtons = document.querySelectorAll(".audio__button");
  audioButtons.forEach(function(elem) {
    elem.classList.toggle("active");
});



});
