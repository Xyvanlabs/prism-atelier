# Flow 生图清单（12 张作品封面）

> **状态：已全部生成并接入。** 12 张图在 `public/works/`，模型 Nano Banana 2.1，比例 16:9，
> 生成后统一压到 1100px 宽（12 张共 0.44MB）。本文件保留作重新生成的参照。

用途：`prism-atelier/public/works/` 下的作品封面。
操作方式：在 Google Flow 里选择 **图片模式（Nano Banana 2.1）**、比例 **16:9**，逐条粘贴下面的 prompt，生成后下载为对应文件名放进 `public/works/`。

接入方式：无需改任何组件代码。`src/data/works.js` 里每个项目的 `cover` 字段已经是 `works/work-01.jpg` … `works/work-12.jpg`；文件一到位，卡片自动从程序化封面切换为实拍图（加载失败仍会自动回落，不会留空白）。

---

## 统一风格后缀（已包含在每条 prompt 末尾，不必重复粘贴）

> bright high-key light palette, glass and optical refraction, soft long shadows, minimal composition, generous negative space, fine film grain, no text, no logos, no watermarks, 16:9 landscape

**为什么统一**：12 张要挂在一个页面里，风格漂移会让作品墙显得像是拼凑的素材库。拍板原则是「同一束打光、同一种颗粒、同一种留白」。

---

## 01 · `work-01.jpg` — 澄野 CHENGYE（茶饮品牌视觉系统）

palette `#8FD3C7 → #2E7D6E`

```
Editorial portfolio cover art: translucent hand-blown glass tea cups with amber-green tea, strong light refraction and caustic patterns on a pale off-white surface, wisps of steam. Palette: off-white, soft jade green, deep teal shadow. Bright high-key light, soft long shadows, minimal composition, generous negative space, fine film grain. Photorealistic product photography. No text, no logos, no watermarks. 16:9 landscape.
```

## 02 · `work-02.jpg` — 观山 GUANSHAN（民宿品牌重塑）

palette `#B8C6D9 → #3C4E63`

```
Editorial portfolio cover art: abstract layered ridge-line forms made of frosted translucent glass sheets overlapping in depth, misty atmosphere. Palette: pale grey-blue to slate on off-white. Bright high-key light, soft gradient, subtle refraction edges, minimal composition, generous negative space, fine film grain. Hybrid photographic 3D render. No text, no logos, no watermarks. 16:9 landscape.
```

## 03 · `work-03.jpg` — HALO LAB（护肤包装与材质）

palette `#FFD9CE → #E0705A`

```
Editorial portfolio cover art: frosted translucent cosmetic bottles and layered translucent film discs, warm glow, light passing through the films creating soft color shifts. Palette: peach and coral over off-white. Bright high-key light, soft shadows, minimal composition, generous negative space, fine film grain. Photorealistic studio product photography. No text, no logos, no watermarks. 16:9 landscape.
```

## 04 · `work-04.jpg` — 澜舟 Lanzhou（金融 App 体验重构）

palette `#9FB4FF → #3B49B8`

```
Editorial portfolio cover art: floating frosted glass UI panels with abstract bar and line chart shapes arranged in shallow 3D depth, soft shadows beneath. Palette: periwinkle to deep indigo on off-white paper. Clean, precise, premium, bright high-key light, minimal composition, generous negative space, fine film grain. Modern 3D render. No readable text, no logos, no watermarks. 16:9 landscape.
```

## 05 · `work-05.jpg` — Nimbus（协作工具设计系统）

palette `#CBD5F5 → #28304F`

```
Editorial portfolio cover art: a neat grid of frosted white component tiles and translucent cards floating in shallow perspective, subtle grid lines, soft drop shadows. Palette: near-white with lavender-grey and dark navy accents. Systematic, orderly, bright high-key light, minimal, generous negative space, fine film grain. 3D render. No readable text, no logos, no watermarks. 16:9 landscape.
```

## 06 · `work-06.jpg` — 拾光（阅读器 App）

palette `#F0E6D2 → #6E5B44`

```
Editorial portfolio cover art: close-up of thin stacked paper pages fanning with soft depth of field, warm ivory tones, delicate abstract grey typographic marks, single soft light from the left. Calm, quiet, tactile, bright high-key light, minimal composition, generous negative space, fine film grain. Photorealistic macro photography. No readable text, no logos, no watermarks. 16:9 landscape.
```

## 07 · `work-07.jpg` — 潮汐 TIDE（品牌动态图形）

palette `#A8E6FF → #0E5E8C`

```
Editorial portfolio cover art: liquid water surface deforming upward into a wave, iridescent spectrum reflections, frozen motion. Palette: pale cyan and deep ocean with white highlights on off-white. Bright high-key light, crisp caustics, dynamic yet minimal, generous negative space, fine film grain. 3D render. No text, no logos, no watermarks. 16:9 landscape.
```

## 08 · `work-08.jpg` — Aurora Reel（发布会开场影像）

palette `#D6C7FF → #5B3FA8`

```
Editorial portfolio cover art: streaks of light refracted through thick optical glass prisms, elongated caustic beams crossing a pale studio backdrop. Palette: soft violet to deep purple on off-white. Cinematic, elegant, abstract, fine volumetric haze, fine film grain. 3D render. No text, no logos, no watermarks. 16:9 landscape.
```

## 09 · `work-09.jpg` — 微粒 GRANULE（产品原理动画）

palette `#BFEFE3 → #1F6F63`

```
Editorial portfolio cover art: thousands of tiny translucent microspheres suspended in clear gel, backlit, glowing softly, shallow depth of field. Palette: mint to deep green on off-white. Scientific, clean, beautiful, bright high-key light, minimal, generous negative space, fine film grain. 3D render. No text, no logos, no watermarks. 16:9 landscape.
```

## 10 · `work-10.jpg` — 棱镜回廊（玻璃光装置）

palette `#E4E9FF → #4B57B8`

```
Editorial portfolio cover art: a long corridor lined with polarized translucent glass panels casting rainbow refraction bands across a pale concrete floor. Palette: pale lavender-white with indigo refraction. Architectural photography, bright high-key light, minimal, strong perspective, fine film grain. No text, no logos, no watermarks. 16:9 landscape.
```

## 11 · `work-11.jpg` — 无声花园（展览视觉与导视）

palette `#E8EFE6 → #3F5B48`

```
Editorial portfolio cover art: soft shadows of leaves and branches projected on a clean off-white wall with a gentle sage green tint, quiet minimal composition, subtle paper texture. Palette: ivory and muted sage. Serene, contemplative, generous negative space, fine film grain. Photographic. No text, no logos, no watermarks. 16:9 landscape.
```

## 12 · `work-12.jpg` — 城市呼吸（互动屏幕装置）

palette `#CFE8FF → #24507A`

```
Editorial portfolio cover art: a large glowing rectangular panel displaying an abstract breathing light field of soft concentric gradients, mounted against a pale minimal wall, faint reflection on the floor. Palette: pale sky blue to deep blue with white glow. Minimal, futuristic but calm, bright high-key light, fine film grain. 3D render and architectural photo hybrid. No text, no logos, no watermarks. 16:9 landscape.
```

---

## 生成后要做的事

1. 下载的图直接命名为 `work-01.jpg` … `work-12.jpg`，放进 `prism-atelier/public/works/`
2. 告诉我，我跑一次 `npm run build` 并截图核对卡片观感
3. 如果某张效果不理想，只重跑那一条，其余不动

**尺寸建议**：卡片的画布比例是 4:3，`object-fit: cover` 会自动裁切。16:9 够用；若 Flow 允许选 4:3，优先 4:3，能少裁两边。
