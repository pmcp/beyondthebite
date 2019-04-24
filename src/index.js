require('normalize.css/normalize.css');
require('./styles/index.scss');

import anime from 'animejs';
// import * as PIXI from 'pixi.js'
// import * as PIXIParticles from 'pixi-particles';

import base from './base.js';
import instance from './instance.js';
const { renderer, scene, camera } = base();
let { mesh, uniforms } = instance(20);
import { getArrayWithNoise, getRandomBetween } from './utils';
import { CompressedTextureLoader } from 'three';

scene.add(mesh);


let progress = -.4;

uot(
  p => {
    progress = p;
    if (p === 1) {

      let mesh2 = instance(200).mesh;
      scene.add(mesh2);
    
    
      const newCameraPosition = getArrayWithNoise([10, 20, 40], 5)    
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

// animate();



// Animations using animejs
function animateIn(chapter) {
  const targetContainer = '#chapter' + chapter;
  const targetLines = '#drawing' + chapter + ' .animateLines path';

  var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
  });

  // Add children
  tl
  .add({
    targets: targetContainer,
    translateX: 10,
    translateY: 10,
    opacity: 1,
    duration: 600,
    easing: 'easeOutCubic',
  })
  .add({
    targets: targetLines,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    // delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: false
  });
}




const roadHeight = document.getElementById('road').clientHeight;



const constTopOne = roadHeight/100*20;
document.getElementById('chapterOne').style.setProperty("top", constTopOne+"px");


const constTopTwo = roadHeight/100*40;
document.getElementById('chapterTwo').style.setProperty("top", constTopTwo+"px");

const constTopThree = roadHeight/100*50;
document.getElementById('chapterThree').style.setProperty("top", constTopThree+"px");





// Animations using animejs
function animateOut(chapter) {
  const targetContainer = '#chapter' + chapter;
  const targetLines = '#drawing' + chapter + ' .animateLines path';

  var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 750
  });
  
  // Add children
  tl
  .add({
    targets: targetContainer,
    translateX: 10,
    translateY: 10,
    opacity: 0,
    duration: 600,
    easing: 'easeOutCubic',
  })
  .add({
    targets: targetLines,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1500,
    // delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: false
  });
  }





let scrollPercentage = 0;
let drawnOne = false;
let drawnTwo = false;
let drawnThree = false;

// Draw the road svg
const path = document.querySelector("#road-path");
const pathLength = path.getTotalLength();
path.style.strokeDasharray = pathLength + " " + pathLength;
path.style.strokeDashoffset = pathLength;
path.getBoundingClientRect();
window.addEventListener("scroll", function(e) {
  let scrollPercentage =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight -
      document.documentElement.clientHeight);
      
  let drawLength = pathLength * (scrollPercentage);
  path.style.strokeDashoffset = pathLength - drawLength;
  if (scrollPercentage >= 0.99) {
    path.style.strokeDasharray = "none";
  } else {
    path.style.strokeDasharray = pathLength + " " + pathLength;
    
  }

  


  if( 0.2 <= scrollPercentage && scrollPercentage <= 0.3) {
    
    if(drawnOne) {
      
      return
    } else {
      drawnOne = true;
      animateIn('One');
      
    }
  }

  if(scrollPercentage <= 0.1) {
    if(drawnOne) {
      animateOut('One')
      drawnOne = false;
      return
    } else {
      
     return
      
    }
  }
  


  if( 0.4 <= scrollPercentage && scrollPercentage < 0.5) {
    
    if(drawnTwo) {
      
      return
    } else {
      drawnTwo = true;
      animateIn('Two');
      
    }
  }

  if(scrollPercentage <= 0.3) {
    if(drawnTwo) {
      animateOut('Two')
      drawnTwo = false;
      return
    } else {
      
     return
      
    }
  }







  if( 0.5 <= scrollPercentage && scrollPercentage < 0.6) {
    
    if(drawnThree) {
      
      return
    } else {
      drawnTwo = true;
      animateIn('Three');
      
    }
  }

  if(scrollPercentage <= 0.4) {
    if(drawnThree) {
      animateOut('Three')
      drawnThree = false;
      return
    } else {
      
     return
      
    }
  }

  


});


// (function(window){

// 	/**
// 	*  Basic example setup
// 	*  @class ParticleExample
// 	*  @constructor
// 	*  @param {String[]} imagePaths The local path to the image source
// 	*  @param {Object} config The emitter configuration
// 	*  @param {null|"path"|"anim"} [type=null] Particle type to create.
// 	*  @param {boolean} [useParticleContainer=false] If a ParticleContainer should be used instead of a Container.
// 	*  @param {boolean} [stepColors=false] If the color settings should be manually stepped.
// 	*/
// 	var ParticleExample = function(imagePaths, config, type, useParticleContainer, stepColors)
// 	{
// 		var canvas = document.getElementById("stage");
// 		// Basic PIXI Setup
// 		var rendererOptions =
// 		{
// 			view: canvas,
// 		};
// 		/*var preMultAlpha = !!options.preMultAlpha;
// 		if(rendererOptions.transparent && !preMultAlpha)
// 			rendererOptions.transparent = "notMultiplied";*/
// 		var stage = new PIXI.Container(),
// 			emitter = null,
// 			renderer = PIXI.autoDetectRenderer(canvas.width, canvas.height, rendererOptions),
// 			bg = null;

// 		var framerate = document.getElementById("framerate");
// 		var particleCount = document.getElementById("particleCount");

// 		// Calculate the current time
// 		var elapsed = Date.now();

// 		var updateId;

// 		// Update function every frame
// 		var update = function(){

// 			// Update the next frame
// 			updateId = requestAnimationFrame(update);

// 			var now = Date.now();
// 			if (emitter)
// 				emitter.update((now - elapsed) * 0.001);

// 			framerate.innerHTML = (1000 / (now - elapsed)).toFixed(2);

// 			elapsed = now;

// 			if(emitter && particleCount)
// 				particleCount.innerHTML = emitter.particleCount;

// 			// render the stage
// 			renderer.render(stage);
// 		};

// 		// Resize the canvas to the size of the window
// 		window.onresize = function(event) {
// 			canvas.width = window.innerWidth;
// 			canvas.height = window.innerHeight;
// 			renderer.resize(canvas.width, canvas.height);
// 			if(bg)
// 			{
// 				//bg is a 1px by 1px image
// 				bg.scale.x = canvas.width;
// 				bg.scale.y = canvas.height;
// 			}
// 		};
// 		window.onresize();

// 		// Preload the particle images and create PIXI textures from it
// 		var urls, makeTextures = false;
// 		if(imagePaths.spritesheet)
// 			urls = [imagePaths.spritesheet];
// 		else if(imagePaths.textures)
// 			urls = imagePaths.textures.slice();
// 		else
// 		{
// 			urls = imagePaths.slice();
// 			makeTextures = true;
// 		}
// 		urls.push("images/bg.png");
// 		var loader = PIXI.loader;
// 		for(var i = 0; i < urls.length; ++i)
// 			loader.add("img" + i, urls[i]);
// 		loader.load(function()
// 		{
// 			bg = new PIXI.Sprite(PIXI.Texture.fromImage("images/bg.png"));
// 			//bg is a 1px by 1px image
// 			bg.scale.x = canvas.width;
// 			bg.scale.y = canvas.height;
// 			bg.tint = 0x000000;
// 			stage.addChild(bg);
// 			//collect the textures, now that they are all loaded
// 			var art;
// 			if(makeTextures)
// 			{
// 				art = [];
// 				for(var i = 0; i < imagePaths.length; ++i)
// 					art.push(PIXI.Texture.fromImage(imagePaths[i]));
// 			}
// 			else
// 				art = imagePaths.art;
// 			// Create the new emitter and attach it to the stage
// 			var emitterContainer;
// 			if(useParticleContainer)
// 			{
// 				emitterContainer = new PIXI.ParticleContainer();
// 				emitterContainer.setProperties({
// 					scale: true,
// 					position: true,
// 					rotation: true,
// 					uvs: true,
// 					alpha: true
// 				});
// 			}
// 			else
// 				emitterContainer = new PIXI.Container();
// 			stage.addChild(emitterContainer);
// 			window.emitter = emitter = new PIXIParticles.Emitter(
// 				emitterContainer,
// 				art,
// 				config
// 			);
// 			if (stepColors)
// 				emitter.startColor = PIXIParticles.ParticleUtils.createSteppedGradient(config.color.list, stepColors);
// 			if(type == "path")
// 				emitter.particleConstructor = PIXIParticles.PathParticle;
// 			else if(type == "anim")
// 				emitter.particleConstructor = PIXIParticles.AnimatedParticle;

// 			// Center on the stage
//       emitter.updateOwnerPos(window.innerWidth / 2, window.innerHeight / 2);
      
      

// 			// Click on the canvas to trigger
// 			canvas.addEventListener('mouseup', function(e){
// 				if(!emitter) return;
// 				emitter.emit = true;
// 				emitter.resetPositionTracking();
// 				emitter.updateOwnerPos(e.offsetX || e.layerX, e.offsetY || e.layerY);
// 			});

// 			// Start the update
// 			update();

// 			//for testing and debugging
// 			window.destroyEmitter = function()
// 			{
// 				emitter.destroy();
// 				emitter = null;
// 				window.destroyEmitter = null;
// 				//cancelAnimationFrame(updateId);

// 				//reset SpriteRenderer's batching to fully release particles for GC
// 				if (renderer.plugins && renderer.plugins.sprite && renderer.plugins.sprite.sprites)
// 					renderer.plugins.sprite.sprites.length = 0;

// 				renderer.render(stage);
// 			};
// 		});
// 	};

// 	// Assign to global space
// 	window.ParticleExample = ParticleExample;

// }(window));
		
// const myImage = require('./assets/Ellipse.png');
// new ParticleExample(
//   // The image to use
//   [myImage],
// 			// Emitter configuration, edit this to change the look
// 				// of the emitter
// 				{
// 					"alpha": {
// 						"start": 1,
// 						"end": 1
// 					},
// 					"scale": {
// 						"start": 1,
// 						"end": 1,
// 						"minimumScaleMultiplier":0.5
// 					},
// 					"color": {
// 						"start": "ffffff",
// 						"end": "ffffff"
// 					},
// 					"speed": {
// 						"start": 150,
// 						"end": 100
// 					},
// 					"startRotation": {
// 						"min": 0,
// 						"max": 0
// 					},
// 					"rotationSpeed": {
// 						"min": 0,
// 						"max": 20
// 					},
// 					"lifetime": {
// 						"min": 1.8,
// 						"max": 2
// 					},
// 					"blendMode": "normal",
// 					"frequency": 0.1,
// 					"emitterLifetime": 0,
// 					"maxParticles": 500,
// 					"pos": {
// 						"x": getRandomBetween(100),
// 						"y": getRandomBetween(100)
// 					},
// 					"addAtBack": false,
// 					"spawnType": "rect",
// 					"spawnRect": {
// 						"x": 100,
// 						"y": 60,
// 						"w": 900,
// 						"h": 200
// 					},
// 					"extraData":
// 					{
// 						"path":"sin(x/3)*-5"
// 					}
// 				},
// 				//tell the particle example to use PIXI.particles.PathParticle
// 				"path");