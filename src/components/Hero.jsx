import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { useVisible } from '../lib/hooks.js'

/* ============================================================
   L1 重度 3D：全屏折射场（自定义 GLSL）+ 悬浮玻璃棱镜
   —— 只在 Hero 出现，低性能设备整块降级为静态渐变
   ============================================================ */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // 忽略相机投影，直接铺满裁剪空间（视为全屏 quad）
    gl_Position = vec4(position.xy * 2.0, 1.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;
  uniform vec2  uRes;
  uniform float uIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
    float t = uTime * 0.055;

    // 两层低频噪声互推，模拟玻璃内部的缓慢折射流动
    vec2 q = vec2(
      fbm(p * 1.55 + vec2(t, -t * 0.8)),
      fbm(p * 1.55 + vec2(-t * 1.2, t * 0.6) + 5.2)
    );
    float n = fbm(p * 2.1 + q * 1.9 + vec2(0.0, t * 1.7));

    // 宽色散条带：低频、低对比，只负责底色里的光感
    float bands = sin((p.x * 2.2 + n * 3.4 + p.y * 0.8) * 3.14159);
    float sheen = smoothstep(0.12, 1.0, bands * 0.5 + 0.5);

    // 细窄色散光丝：高频 + 高次幂，压成一两个像素宽的亮线
    float streak = sin((p.x * 15.0 - p.y * 5.6 + n * 9.0) * 3.14159);
    // 用低频遮罩把光丝收成簇，否则会变成均匀的窗帘
    float mask = smoothstep(0.42, 0.78, fbm(p * 0.95 + vec2(t * 0.6, -t * 0.45) + 11.3));
    float hair = pow(max(streak, 0.0), 16.0) * mask;

    // 色散调色：三个光学强调色互相渗透
    vec3 cIndigo = vec3(0.357, 0.357, 0.965);
    vec3 cMint   = vec3(0.071, 0.776, 0.722);
    vec3 cCoral  = vec3(1.000, 0.478, 0.349);

    vec3 tint = mix(cIndigo, cMint, smoothstep(0.0, 1.0, q.x));
    tint = mix(tint, cCoral, smoothstep(0.55, 1.0, q.y) * 0.5);

    // 光丝单独配色（紫到橙），不跟着底色走，避免整片发青
    vec3 hairTint = mix(vec3(0.42, 0.45, 0.98), vec3(1.0, 0.62, 0.48), smoothstep(0.2, 0.9, q.y));

    vec3 paper = vec3(0.968, 0.975, 0.995);
    float mixAmt = (0.055 + 0.26 * sheen * n + 0.26 * hair) * uIntensity;
    vec3 col = mix(paper, tint, mixAmt);

    // 跟随指针的柔光斑
    float glow = smoothstep(1.15, 0.0, length(p - (uMouse - 0.5) * vec2(0.9, -0.9)));
    col += tint * glow * 0.13 * uIntensity;
    col = mix(col, hairTint, hair * 0.24);

    // 极细颗粒，消除 8bit 渐变的 banding
    col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.011;

    // 边缘回落到纸面色，保证与页面底色无缝衔接
    col = mix(col, paper, smoothstep(0.55, 1.15, length(p * vec2(0.78, 1.0))) * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`

function RefractionField({ animate }) {
  const material = useRef()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uIntensity: { value: 1 },
    }),
    []
  )

  useFrame((state) => {
    if (!material.current) return
    const u = material.current.uniforms
    u.uTime.value = animate ? state.clock.elapsedTime : 7.4
    u.uRes.value.set(state.size.width, state.size.height)
    // 指针平滑跟随，避免直接跳变
    u.uMouse.value.lerp({ x: (state.pointer.x + 1) / 2, y: (state.pointer.y + 1) / 2 }, 0.04)
  })

  return (
    <mesh renderOrder={-10} frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  )
}

/* 菲涅尔玻璃棱镜：不依赖外部 HDRI，纯数学边缘光，浅底上也干净 */
const PRISM_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const PRISM_FRAG = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vView;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform float uOpacity;

  void main() {
    float f = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 2.2);
    vec3 col = mix(uA, uB, f);
    float alpha = (0.05 + f * 0.62) * uOpacity;
    gl_FragColor = vec4(col, alpha);
  }
`

const PRISM_BASE = [1.02, 0.1, 0]

function GlassPrism({ animate }) {
  const group = useRef()
  const geo = useMemo(() => new THREE.IcosahedronGeometry(0.68, 0), [])
  const edges = useMemo(() => new THREE.EdgesGeometry(geo, 1), [geo])

  const faceUniforms = useMemo(
    () => ({
      uA: { value: new THREE.Color('#eef1ff') },
      uB: { value: new THREE.Color('#7d7dfb') },
      uOpacity: { value: 1 },
    }),
    []
  )
  const edgeUniforms = useMemo(
    () => ({
      uA: { value: new THREE.Color('#8f96ff') },
      uB: { value: new THREE.Color('#12c6b8') },
      uOpacity: { value: 0.9 },
    }),
    []
  )

  useFrame((state, delta) => {
    if (!group.current) return
    const t = animate ? state.clock.elapsedTime : 3.1
    const speed = animate ? 1 : 0
    group.current.rotation.y += delta * 0.16 * speed
    group.current.rotation.x = Math.sin(t * 0.22) * 0.22

    // 指针视差：以基准位为原点偏移，不把棱镜拽回屏幕中央
    const targetX = PRISM_BASE[0] + state.pointer.x * 0.26
    const targetY = PRISM_BASE[1] + state.pointer.y * 0.18
    group.current.position.x += (targetX - group.current.position.x) * 0.05
    group.current.position.y += (targetY - group.current.position.y) * 0.05
  })

  return (
    <group ref={group} position={PRISM_BASE}>
      <mesh geometry={geo}>
        <shaderMaterial
          uniforms={faceUniforms}
          vertexShader={PRISM_VERT}
          fragmentShader={PRISM_FRAG}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.NormalBlending}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <shaderMaterial
          uniforms={edgeUniforms}
          vertexShader={PRISM_VERT}
          fragmentShader={PRISM_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}

/** 高/中性能设备：完整 WebGL 场景 */
function HeroCanvas({ animate, tier, active = true }) {
  return (
    <Canvas
      dpr={[1, tier === 'high' ? 1.75 : 1.25]}
      gl={{ antialias: tier === 'high', alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5], fov: 42 }}
      style={{ position: 'absolute', inset: 0 }}
      frameloop={active ? 'always' : 'demand'}
    >
      <RefractionField animate={animate} />
      <GlassPrism animate={animate} />
    </Canvas>
  )
}

/** 低性能设备 / 减少动效：静态 CSS 渐变，零 GPU 开销 */
function StaticFallback() {
  return (
    <div className="hero__static" aria-hidden="true">
      <span className="hero__static-band" />
      <span className="hero__static-band" />
      <span className="hero__static-band" />
    </div>
  )
}

export default function Hero({
  tier = 'high',
  reducedMotion = false,
  titleLines = ['用光', '重构界面'],
}) {
  const heroRef = useRef(null)
  const visible = useVisible(heroRef)
  const animate = tier !== 'low' && !reducedMotion
  const showCanvas = tier !== 'low'

  return (
    <header className="hero" id="top" ref={heroRef}>
      <div className="hero__stage" aria-hidden="true">
        {showCanvas ? <HeroCanvas animate={animate} tier={tier} active={visible} /> : <StaticFallback />}
        <div className="hero__veil" />
      </div>

      <div className="shell hero__inner">
        <motion.p
          className="eyebrow"
          initial={animate ? { opacity: 0, y: 14 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          PRISM ATELIER · 上海 · 自 2019
        </motion.p>

        <motion.h1
          className="hero__title"
          initial={animate ? { opacity: 0, y: 26 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
        >
          {titleLines.map((line, i) => (
            <span key={line} className="hero__line">
              {line}
              {i === titleLines.length - 1 && <span className="hero__dot">.</span>}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="hero__lede lede"
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
        >
          我们做品牌视觉识别、数字产品与空间光装置。习惯从材料与光的行为出发，而不是从模板出发。
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        >
          <a className="btn btn--primary" href="#works">
            看 12 个精选项目
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a className="btn btn--ghost" href="#contact">
            直接聊项目
          </a>
        </motion.div>

        <motion.div
          className="hero__meta"
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <span className="hero__metaitem">
            <em>6</em> 个市场
          </span>
          <span className="hero__metaitem">
            <em>9</em> 项国际奖项
          </span>
          <span className="hero__metaitem">
            <em>4</em> 个专业方向
          </span>
        </motion.div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>SCROLL</span>
        <i />
      </div>
    </header>
  )
}
