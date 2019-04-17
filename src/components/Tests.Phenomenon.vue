<template>
  <div>
    <button style="position:relative;z-index:2" @click="removeInstance(number)">ADD</button>
  </div>
</template>

<script>
import Phenomenon from "phenomenon";

function getRandom(value) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}


function getArrayWithNoise(array, noise) {
  return array.map(item => item + getRandom(noise));
}




// Update value for every frame
const step = 0.01;

// Multiplier of the canvas resolution
const devicePixelRatio = window.devicePixelRatio;

// Every uniform must have:
// - Key (used in the shader)
// - Type (what kind of value)
// - Value (based on the type)
const uniforms = {
  uProgress: {
    type: "float",
    value: 0.0
  }
};

function rotateY(matrix, angle) {
  const m = matrix;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const mv0 = m[0];
  const mv4 = m[4];
  const mv8 = m[8];

  m[0] = c * m[0] + s * m[2];
  m[4] = c * m[4] + s * m[6];
  m[8] = c * m[8] + s * m[10];

  m[2] = c * m[2] - s * mv0;
  m[6] = c * m[6] - s * mv4;
  m[10] = c * m[10] - s * mv8;
}

// Boolean to switch transition direction
let forward = true;
let count = 0;

export default {
  props: {
    speed: Number,
    number: Number
  },
  data: () => ({}),

  watch: {
    number: function(val) {
      console.log('watch',{val})
      this.addInstance(val);
    }
  },

  methods: {
    removeInstance() {
      console.log('count', count)
      if (count === 0) return;
      this.phenomenon.remove(count);
      count -= 1;
    },
    addInstance(val) {
      this.removeInstance();
      
      count += 1;
      console.log('adding',{val});
      // The amount of particles that will be created
      const multiplier = val;

      // Percentage of how long every particle will move
      const duration = 0.6;

      // Base start position (center of the cube)
      const start = {
        x: getRandom(1),
        y: getRandom(1),
        z: getRandom(1)
      };

      // Base end position (center of the cube)
      const end = {
        x: getRandom(1),
        y: getRandom(1),
        z: getRandom(1)
      };

      // Every attribute must have:
      // - Name (used in the shader)
      // - Data (returns data for every particle)
      // - Size (amount of variables in the data)
      const attributes = [
        {

          
    name: "aPositionStart",
    data: (index, total) => {
      return getArrayWithNoise([-2, 0, 0], 0);
    },
    size: 1
  },

  {
    name: "aControlPointOne",
    data: (index, total) => {
      return getArrayWithNoise([-0.5, 0.5, 0], 0.8);
    },
    size: 4
  },

  {
    name: "aControlPointTwo",
    data: (index, total) => {
      // return getArrayWithNoise([0.5, -0.5, 0], .2)
      const angle = index * ((2 * Math.PI) / total);
      return [
        Math.cos(angle) + getRandom(1),
        1 + getRandom(0.5),
        Math.sin(angle) + getRandom(1)
      ];
    },
    size: 4
  },
  
  
        //   name: "aPositionStart",
        //   data: () => [
        //     start.x + getRandom(0.1),
        //     start.y + getRandom(0.1),
        //     start.z + getRandom(0.1)
        //   ],
        //   size: 3
        // },

        {
          name: "aPositionEnd",
          data: () => [
            end.x + getRandom(0.1),
            end.y + getRandom(0.1),
            end.z + getRandom(0.1)
          ],
          size: 3
        },

        {
          name: "aColor",
          data: () => [[0,0,0],[1,1,1]],
          size: 3
        },

        {
          name: "aOffset",
          data: i => [i * ((1 - duration) / (multiplier - 1))],
          size: 1
        }
      ];

      // Vertex shader used to calculate the position
      // const vertex = `
      //     attribute vec3 aPositionStart;
      //     attribute vec3 aControlPointOne;
      //     attribute vec3 aControlPointTwo;
      //     attribute vec3 aPositionEnd;
      //     attribute vec3 aPosition;
      //     attribute vec3 aColor;
      //     attribute float aOffset;

      //     uniform float uProgress;
      //     uniform mat4 uProjectionMatrix;
      //     uniform mat4 uModelMatrix;
      //     uniform mat4 uViewMatrix;

      //     varying vec3 vColor;

      //     float easeInOutQuint(float t){
      //       return t < 0.5 ? 16.0 * t * t * t * t * t : 1.0 + 16.0 * (--t) * t * t * t * t;
      //     }

      //     void main(){
      //       float tProgress = easeInOutQuint(min(1.0, max(0.0, (uProgress - aOffset)) / ${duration}));
      //       vec3 newPosition = mix(aPositionStart, aPositionEnd, tProgress);
            
      //       gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(newPosition + aPosition, 1.0);
      //       gl_PointSize = ${devicePixelRatio.toFixed(1)};
      //       vColor = aColor;
      //     }
      //   `;

const vertex = `
  attribute vec3 aPositionStart;
  attribute vec3 aControlPointOne;  
  attribute vec3 aControlPointTwo;  
  attribute vec3 aPositionEnd;  
  attribute vec3 aPosition;  
  attribute vec3 aColor;  
  attribute float aOffset;  

  uniform float uProgress;
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;

  varying vec3 vColor;

  vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
    return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
  }

  void main(){
    float tProgress = min(1.0, max(0.0, (uProgress - aOffset)) / ${duration});
    vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
    gl_PointSize = 1.4;
    gl_Position = uProjectionMatrix * uModelMatrix * uViewMatrix * vec4(newPosition + aPosition, 1.0);
    vColor = aColor;
  }
`;


      // Fragment shader to draw the colored pixels to the canvas
      const fragment = `
          precision mediump float;
          varying vec3 vColor;
          void main(){
            gl_FragColor = vec4(vColor, 1.0);
          }
        `;

      // Add an instance to the renderer
      this.phenomenon.add(count, {
        attributes,
        multiplier,
        vertex,
        fragment
      });
      // }
      // addInstance()
    }
  },

  mounted() {
    // Create the renderer
    this.phenomenon = new Phenomenon({
      settings: {
        devicePixelRatio,
        position: { x: 0, y: 0, z: 3 },
        uniforms,
        onRender: r => {
          
          const { uProgress, uModelMatrix } = r.uniforms;
          uProgress.value += forward ? step : -step;

          if (uProgress.value >= 1) forward = false;
          else if (uProgress.value <= 0) forward = true;

          rotateY(uModelMatrix.value, step * 2);
        }
      }
    });

    // document.querySelector('.add').addEventListener('click', addInstance);
    // document.querySelector('.remove').addEventListener('click', removeInstance);
    this.addInstance();
    // for (let i = 0; i < 20; i += 1) {if (window.CP.shouldStopExecution(0)) break;
    //   addInstance();
    // }window.CP.exitedLoop(0);
  }
};
</script>


