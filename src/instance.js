import { getArrayWithNoise, getRandomBetween } from './utils';




function createInstance(multiplier) {


console.log(multiplier)
  
const duration = 1.7;
const geometry = new THREE.CircleGeometry(.03);
const material = new THREE.MeshPhongMaterial({
  color: '#000',
  emissive: '#ff6e40',
  flatShading: false,
  shininess: 100,
});

let attributes = [
  {
    name: 'aPositionStart',
    data: () => getArrayWithNoise([10, -10, 0], 2),
    size: 3,
  },
  {
    name: 'aControlPointOne',
    data: () => getArrayWithNoise([20, 20, 20], 5),
    size: 3,
  },
  {
    name: 'aControlPointTwo',
    data: () => getArrayWithNoise([0, 0, 0], 10),
    size: 3,
  },
  {
    name: 'aPositionEnd',
    data: () => getArrayWithNoise([0, 10, 10], 10),
    size: 3,
  },
  {
    name: 'aOffset',
    data: i => [i * ((2 - duration) / (multiplier - 1))],
    size: 1,
  },
  {
    name: 'aColor',
    data: (i, total) => {
      const color = new THREE.Color();      
      return [0, 0, 0];
    },
    size: 3,
  },
];




  let castShadow = true;


  let uniforms = {
    uProgress: {
      value: 0,
    },

  };
  let vertex = `
    attribute vec3 aPositionStart;
    attribute vec3 aControlPointOne;
    attribute vec3 aControlPointTwo;
    attribute vec3 aPositionEnd;
    attribute vec3 aColor;
    attribute float aOffset;
    uniform float uProgress;

    varying vec3 vColor;

    float easeInOutSin(float t){
      return (1.0 + sin(${Math.PI} * t - ${Math.PI} / 2.0)) / 2.0;
    }

    vec4 quatFromAxisAngle(vec3 axis, float angle) {
      float halfAngle = angle * 0.5;
      return vec4(axis.xyz * sin(halfAngle), cos(halfAngle));
    }

    vec3 rotateVector(vec4 q, vec3 v) {
      return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
    }

    vec3 bezier4(vec3 a, vec3 b, vec3 c, vec3 d, float t) {
      return mix(mix(mix(a, b, t), mix(b, c, t), t), mix(mix(b, c, t), mix(c, d, t), t), t);
    }

    void main(){
      float tProgress = easeInOutSin(min(1.0, max(0.0, (uProgress - aOffset)) / ${duration}));
      vec4 quatX = quatFromAxisAngle(vec3(1.0, 0.0, 0.0), -5.0 * tProgress);
      vec4 quatY = quatFromAxisAngle(vec3(0.0, 0.0, 0.0), -5.0 * tProgress);
      vec3 basePosition = rotateVector(quatX, rotateVector(quatY, position));
      vec3 newPosition = bezier4(aPositionStart, aControlPointOne, aControlPointTwo, aPositionEnd, tProgress);
      float scale = tProgress * 2.0 - 1.0;
      scale = 1.0 - scale * scale;
      basePosition *= scale;
      vNormal = rotateVector(quatX, vNormal);
      gl_Position = basePosition + newPosition;
      vColor = aColor;
    }
  `;

  let fragment = [
    ['#define PHONG', 'varying vec3 vColor;'],
    ['vec4( diffuse, opacity )', 'vec4( vColor, opacity )'],
    ['vec3 totalEmissiveRadiance = emissive;', 'vec3 totalEmissiveRadiance = vColor;'],
  ];

  let instance = new THREE.Phenomenon({
    geometry,
    multiplier,
    material,
    castShadow,
    attributes,
    uniforms,
    vertex,
    fragment,
  });

  return instance;
}

export default createInstance;
