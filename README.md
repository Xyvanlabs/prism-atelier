# PRISM ATELIER / 棱镜工作室

浅色玻璃拟态 + 实时 WebGL 折射的独立设计工作室作品集站。
**内容全部为占位**：品牌名、客户、项目、数据都是编的，只用于展示设计与技术方案。

## 运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 输出 dist/
npm run preview  # http://localhost:4173
```

Node 18+ 即可（开发机为 v24.14.0 / npm 11.9.0）。

## 已发布 / 怎么让别人看

线上地址：<https://xyvanlabs.github.io/prism-atelier/>（GitHub Pages，公开）

| 方式 | 地址 | 适用 |
|---|---|---|
| 公网 | https://xyvanlabs.github.io/prism-atelier/ | 发给任何人，本机可关机 |
| 局域网 | `npm run preview -- --host 0.0.0.0` → `http://<本机IP>:4173/` | 同 Wi-Fi 快速内测，不外发 |

更新流程：改源码 → `git push` → `.github/workflows/deploy-pages.yml` 自动 `npm ci && npm run build` 并把 `dist/` 发到 Pages（约 1 分钟）。

> 本机 `github.com:443` 直连被阻断，推送需走本地代理：
> `git -c http.proxy=http://127.0.0.1:7890 -c https.proxy=http://127.0.0.1:7890 push`
> （`api.github.com` 与 `gh` 命令不受影响。）

上线前记得把 `index.html` 的 canonical / og:url / JSON-LD、`public/sitemap.xml`、`public/robots.txt` 里的 `prism-atelier.example.com` 换成实际域名——现在这些还是占位值。

## 结构

```
prism-atelier/
├─ index.html                  ← SEO 权威处：meta / OG / JSON-LD / noscript 兜底
├─ public/
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ sitemap.xml
├─ seo/
│  └─ keywords.md              ← 关键词表 + 更新节奏（不会自动更新）
└─ src/
   ├─ data/works.js            ← 单一数据源：12 个项目、能力、流程、统计
   ├─ lib/
   │  ├─ hooks.js              ← 性能分层 / 减少动效 / 视口观察
   │  └─ asset.js              ← 兼容 base './' 的资源路径
   ├─ three/fresnel.js         ← 共用的菲涅尔玻璃着色器
   ├─ styles/
   │  ├─ global.css            ← 设计 token、玻璃材质、按钮、无障碍基础
   │  └─ components.css        ← 各组件样式 + 响应式 + 降级
   └─ components/
      ├─ Hero.jsx              ← L1 重度 3D：全屏折射 shader + 玻璃棱镜
      ├─ GlassCluster.jsx      ← L2 中量 3D：玻璃几何簇（懒挂载 + 停帧）
      ├─ WorkGallery.jsx       ← 作品网格：筛选 / 分页 / 卡片 3D 倾斜（L3）
      ├─ WorkDrawer.jsx        ← 项目详情抽屉：焦点陷阱 + 键盘导航
      ├─ Studio.jsx  Process.jsx  Contact.jsx  Footer.jsx  Nav.jsx
      ├─ Marquee.jsx  WorkArt.jsx  CursorGlow.jsx
      └─ …
```

## 三层 3D 策略（为什么不是"到处塞 canvas"）

| 层级 | 实现 | 位置 | 代价 |
|---|---|---|---|
| L1 重度 | 自定义 GLSL 折射场 + 菲涅尔棱镜 | Hero 全屏 | 1 个 canvas，dpr ≤ 1.75 |
| L2 中量 | 5 个菲涅尔几何体 | 工作室区 | 第 2 个 canvas，进视口才挂载，滚出停帧 |
| L3 微量 | CSS 3D 倾斜 + 指针高光 + 光标光斑 | 卡片 / 抽屉 / 全局 | 无 canvas，纯合成层 |

性能分层见 `src/lib/hooks.js` 的 `usePerfTier()`：
`high` → 双 canvas；`medium`（移动端/低内存）→ 降 dpr 与 antialias；`low`（无 WebGL / prefers-reduced-motion）→ 全部静态。

## 换成真实内容要改的地方

1. `src/data/works.js` —— 项目、能力、流程、统计
2. `index.html` —— title / description / canonical / OG / JSON-LD 里的公司信息与 12 个项目名
3. `src/components/Footer.jsx` —— 邮箱、电话、地址、关键词段
4. `seo/keywords.md` —— 关键词表
5. `public/sitemap.xml` + `public/robots.txt` —— 把 `prism-atelier.example.com` 换成真实域名

## 已知限制

- **表单未接后端**：`Contact.jsx` 的 `onSubmit` 只做前端校验后置成功态，数据不会发送。上线必须接 API 并加服务端校验、频率限制、垃圾提交防护。
- **作品封面图为程序化生成**：`WorkArt.jsx` 用项目 palette 生成渐变 + 折射纹理。`works.js` 里已预留 `cover` 字段，把图片放进 `public/works/` 并填路径即可自动替换（加载失败会自动回落）。
- **单页 SPA**：12 个项目没有独立 URL，不利于逐个收录。需要独立案例页时改路由方案。
- **封面图已接入**：`public/works/work-01.jpg` … `work-12.jpg`，Google Flow（Nano Banana 2.1）生成，统一压到 1100px 宽、共 0.44MB。prompt 见 `flow-prompts.md`，需要换图时重跑对应那一条即可，组件代码不用动。
