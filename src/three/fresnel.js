/* 共用的菲涅尔玻璃着色器：不依赖外部 HDRI，浅色底上依然清澈 */

export const FRESNEL_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

export const FRESNEL_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vView;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform float uOpacity;

  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    vec3 col = mix(uA, uB, f);
    float alpha = (0.12 + f * 0.95) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`

export const PRISM_COLORS = {
  indigo: ['#eef1ff', '#5b5bf6'],
  mint: ['#eafffb', '#12c6b8'],
  coral: ['#fff1ec', '#ff7a59'],
  ink: ['#f3f5fd', '#28304f'],
}
