# 关键词表与更新节奏

> 位置：`prism-atelier/seo/keywords.md`
> 建立日期：2026-01（首版）
> **重要**：这份表不会自动更新。第 4 节写了更新节奏与执行人；「定期更新关键词」这件事必须由人或定时任务触发，本文件只是把该做的事固化下来。

---

## 1. 关键词分层（按意图，而不是按搜索量排序）

| # | 关键词 | 语言 | 搜索意图 | 竞争度（估） | 当前落地位置 | 备注 |
|---|---|---|---|---|---|---|
| 1 | 设计工作室 | 中 | 商业调查 | 高 | `index.html` title / `Organization.name` / Footer | 大词，靠品牌与外部链接，不指望首页直接吃下 |
| 2 | 品牌视觉识别 | 中 | 商业调查 | 中 | Hero lede / `knowsAbout` / Footer 关键词段 | 主转化词之一 |
| 3 | 视觉识别系统设计 | 中 | 交易 | 中 | JSON-LD `Service` / Footer | 比「VI 设计」更具体的变体 |
| 4 | VI 设计 | 中 | 交易 | 高 | Footer 关键词段 | 行业内口语词，保留但不作为主锚文本 |
| 5 | UI UX 设计 | 中英混 | 商业调查 | 高 | `keywords` / Footer | 两种拼写（UI UX / UI/UX）都覆盖 |
| 6 | 设计系统 / Design System | 中英 | 商业调查 | 中 | 能力卡「数字产品」/ Marquee / `knowsAbout` | 英文版用于接海外询盘 |
| 7 | 品牌动效设计 | 中 | 商业调查 | 中低 | 能力卡「动效影像」/ Marquee | 低竞争高转化，值得做长尾页 |
| 8 | 玻璃拟态设计 / Glassmorphism | 中英 | 信息 | 中 | Marquee / Footer / OG 图 alt | 与站点视觉强相关，技术型流量 |
| 9 | WebGL 实时 3D 网站 | 中 | 信息 | 低 | 能力卡 / FAQ 结构化数据 | 极低竞争，技术客户来源 |
| 10 | 空间光装置 | 中 | 商业调查 | 低 | 能力卡「空间装置」/ Footer | 小众，但客单价最高 |
| 11 | 展览视觉设计 | 中 | 商业调查 | 中低 | 能力卡 / Footer | 与「空间光装置」组成一组 |
| 12 | 导视系统设计 | 中 | 商业调查 | 中低 | 能力卡 / Footer | 常与展览视觉捆绑询价 |
| 13 | 移动端 App 界面设计 | 中 | 交易 | 中高 | Footer 关键词段 | 长尾变体多，建议单独做案例页 |
| 14 | 产品原理动画 | 中 | 商业调查 | 低 | 能力卡 / FAQ | 生物医药、硬件客户会搜 |
| 15 | 生成式视觉 / Generative Visual | 中英 | 信息 | 中 | Marquee / 作品描述 | 话题性词，适合发内容 |
| 16 | 上海设计工作室 | 中 | 本地交易 | 中高 | `PostalAddress` / Footer 服务城市 | 本地 SEO 的关键，配 Google Business Profile |
| 17 | brand identity studio Shanghai | 英 | 商业调查 | 中 | `alternateName` / `areaServed` | 海外询盘入口 |
| 18 | motion design studio | 英 | 商业调查 | 高 | Marquee / `knowsAbout` | 只做英文版的支撑，不强攻 |
| 19 | WebGL portfolio site | 英 | 信息 | 中 | OG alt / Marquee | 技术型自然流量 |
| 20 | 可访问性设计 / WCAG AA | 中英 | 信息 | 低 | 能力卡 / FAQ 结构化数据 | 差异化信任词，很多同行不敢写 |

### 建议补充但本版**未**落地的词（缺内容承载）
- 「品牌升级 案例」类长尾 → 需要每项目一页，当前是单页 + 抽屉，无独立 URL
- 「设计报价 / 设计公司收费标准」→ 需要有价格区间内容页，目前只在 FAQ 里答了区间

---

## 2. 关键词在代码里的落点（改词时改这些地方）

| 落点 | 文件 | 说明 |
|---|---|---|
| title / description / keywords | `index.html` | 唯一权威处，改完必须重建 |
| 结构化数据 `knowsAbout` / `makesOffer` | `index.html` 的 JSON-LD | 影响 Google 对「你做什么」的判断 |
| FAQ 问答 | `index.html` 的 `FAQPage` | 内容必须与页面可见文字一致，否则视为作弊 |
| 页脚语义段 | `src/components/Footer.jsx` | 唯一的密集关键词段，视觉上刻意做小做浅 |
| 流动关键词条 | `src/components/Marquee.jsx` | `KEYWORDS` 数组，改这里即可 |
| 能力卡文案 | `src/data/works.js` 的 `CAPABILITIES` | 服务词 + 长尾词的主要承载 |

**规则**：`index.html` 的 keywords 与 Marquee 的数组必须保持同源语义，改一个忘了另一个会造成自我矛盾。

---

## 3. 已实施的技术 SEO 清单

- [x] 唯一 `<h1>`，`h2/h3` 层级不跳级
- [x] `title`（中文 + 英文品牌名互补，≤ 60 字符视觉宽度）
- [x] `meta description` 140 字内，含核心服务词与数字
- [x] `canonical`、`og:url`、`og:locale` + `alternate`
- [x] Open Graph 与 Twitter Card 完整（含 `og:image` 尺寸与 alt）
- [x] JSON-LD `@graph`：`ProfessionalService` + `WebSite` + `ItemList` + `FAQPage`
- [x] `robots.txt` + `sitemap.xml` + `<link rel="sitemap">`
- [x] `lang="zh-CN"`、`<noscript>` 兜底正文（含 h1 与联系方式）
- [x] 语义化标签：`header/main/section/article/nav/footer`、`aria-label` 全覆盖
- [x] 图片 `alt` 具体描述（不是「图片1」）、`loading="lazy"`、`decoding="async"`
- [x] 无第三方字体 / 无外链脚本 → 无渲染阻塞、无 CSP 缺口
- [x] 移动端 `viewport` + `viewport-fit=cover`

### 已知的 SEO 短板（必须承认）
1. **单页 SPA**：12 个项目只在 JS 渲染后出现。Google 能执行 JS，但不保证；Bing 与国内引擎更弱。→ 想让每个项目独立收录，必须拆成独立路由页（Next.js 或 Vite + 预渲染）。
2. **7 个 canvas 之外的实时 3D** 不影响爬虫，但 **LCP 受 three.js（181KB gzip）拖累**，移动端建议把 Hero 降为静态图 + 按需加载 3D。
3. 域名是占位 `prism-atelier.example.com`，未接入 Search Console / 百度站长 / Bing Webmaster。

---

## 4. 更新节奏（谁来做什么）

> 「定期更新 SEO 关键词」无法由站点自动完成。下面是可以被定时任务或人工执行的固定动作。

| 周期 | 动作 | 产出 | 执行方式 |
|---|---|---|---|
| 每 2 周 | 查 Search Console / 百度资源平台的「查询」报告，找**有曝光无点击**的词 | 候选词清单 | 人工，10 分钟 |
| 每 4 周 | 用候选词替换本表第 1 节中「竞争度高且无排名」的 2–3 个词；同步改 `Marquee.jsx` 与 `index.html` | 本文件 + 代码改动 | 人工，30 分钟；建议做成待办任务 |
| 每 4 周 | 检查新出现的行业词（AI 生成界面、空间计算、品牌资产系统化等），加入候选区 | 候选区 | 人工 |
| 每季度 | 复核 FAQ 结构化数据是否仍与页面文字一致（不一致会被降权） | 无 | 人工 |
| 每季度 | 检查 `sitemap.xml` 的 `lastmod` 是否真实（不要为了催收录伪造） | `sitemap.xml` | 人工 |
| 每年 | 全表重做：竞争度、搜索量、意图全部重新评估 | 新版本本文件 | 人工 |

**可以自动化的部分**（需要你确认后再做）：
- 用一个定时任务每周抓一次 Search Console API，把「曝光 > 100 且 CTR < 2%」的词写进 `seo/candidates.md`
- 每次改 `index.html` 后跑一次结构化数据校验（Shcema.org validator 无公开 API，需用 Rich Results Test 手工或 Playwright 脚本）

**不建议自动化的部分**：让模型自己「定期生成关键词」并直接写进页面——会不断引入无搜索量的臆造词，把页面文字稀释成关键词堆砌，属于明确的黑帽边缘操作。

---

## 5. 工具与账号（需要你补的）

- [ ] Google Search Console（验证域名所有权）
- [ ] Bing Webmaster Tools
- [ ] 百度搜索资源平台（国内流量关键）
- [ ] Google Business Profile（「上海设计工作室」本地词的前提）
- [ ] Schema Markup Validator 手工过一遍 `index.html` 的 `@graph`
