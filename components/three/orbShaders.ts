// 3D simplex noise by Ian McEwan / Stefan Gustavson (MIT).
const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uNoiseAmp;
uniform vec3 uPointerDir;
uniform float uBulge;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

attribute float aSeed;

varying vec3 vColor;
varying float vAlpha;

${SIMPLEX_3D}

void main() {
  vec3 dir = normalize(position);

  // Two octaves of slow noise make the surface breathe and ripple.
  float n = snoise(dir * 1.4 + vec3(uTime * 0.18));
  float ripple = snoise(dir * 3.6 - vec3(uTime * 0.32)) * 0.35;
  float field = n + ripple;

  // Bulge where the cursor points.
  float facing = max(dot(dir, uPointerDir), 0.0);
  float bulge = pow(facing, 6.0) * uBulge;

  vec3 displaced = dir * (1.0 + field * uNoiseAmp + bulge);
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  float size = uSize * (0.55 + aSeed * 0.9) * (1.0 + bulge * 2.5);
  gl_PointSize = size * uPixelRatio * (1.0 / -mvPosition.z);

  float t = smoothstep(-0.9, 0.9, field);
  vec3 col = mix(uColorA, uColorB, t);
  col = mix(col, uColorC, smoothstep(0.55, 1.2, field + bulge * 3.0));
  vColor = col;

  // Rim particles read brighter, giving the orb a sense of volume.
  vec3 viewDir = normalize(-mvPosition.xyz);
  vec3 viewNormal = normalize(normalMatrix * dir);
  float rim = 1.0 - abs(dot(viewDir, viewNormal));
  float twinkle = 0.75 + 0.25 * sin(uTime * 2.0 + aSeed * 40.0);
  vAlpha = (0.5 + rim * 0.5) * twinkle;
}
`;

export const pointsVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform vec3 uColor;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;
  p.y += sin(uTime * 0.25 + aSeed * 12.0) * 0.04;
  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize * (0.5 + aSeed) * uPixelRatio * (1.0 / -mvPosition.z);
  vColor = uColor;
  vAlpha = 0.45 + 0.55 * sin(uTime * 1.3 + aSeed * 30.0) * 0.5 + 0.25;
}
`;

export const pointsFragment = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float strength = pow(1.0 - d * 2.0, 1.5);
  gl_FragColor = vec4(vColor, strength * vAlpha * uOpacity);
}
`;
