function getRandomBetween(value) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}

function getArrayWithNoise(array, noise) {
  return array.map(item => item + getRandomBetween(noise));
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const multiplier = 1000;
const begin = 0.4;
const duration = 0.9;

function getRandom(value) {
  const floor = -value;
  return floor + Math.random() * value * 2;
}

const attributes = [
  {
    name: "aPositionStart",
    data: (index, total) => {
      return getArrayWithNoise([-2, 0, 0], 0.4);
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

  {
    name: "aPositionEnd",
    data: (index, total) => {
      // const angle = index * (2 * Math.PI / total);
      // return [Math.cos(angle) + getRandom(2), -2, 0];
      return getArrayWithNoise([2, 0, 0], 0.2);
    },
    size: 4
  },

  {
    name: "aOffset",
    data: i => [i * ((1 - duration) / (multiplier - 1))],
    size: 1
  }
];

const uniforms = {
  uProgress: {
    type: "float",
    value: 0.0
  }
};

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

const fragment = `
  precision mediump float;

  varying vec3 vColor;

  void main(){
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

const renderer = new Phenomenon({
  canvas: document.querySelector("canvas"),
  context: {
    alpha: true,
    antialias: false
  },
  settings: {
    // clearColor: [1, 1, 1, 1],
    position: { x: 0, y: 0, z: 1.2 },
    shouldRender: true
  }
});

renderer.add("starling", {
  attributes,
  multiplier,
  uniforms,
  vertex,
  fragment,
  onSetup: instance => {
    console.log("setup", instance);
  },
  onRender: instance => {
    
    instance.uniforms.uProgress.value += 0.0001;
    if (instance.uniforms.uProgress.value >= 1.2) {
      instance.uniforms.uProgress.value = 0;
    }
  }
});
