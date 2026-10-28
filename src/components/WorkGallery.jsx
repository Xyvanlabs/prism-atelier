import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useSpring } from 'framer-motion'
import { CATEGORIES, WORKS } from '../data/works.js'
import WorkArt from './WorkArt.jsx'

const PAGE_SIZE = 6

/* ------------------------------------------------------------
   卡片：L3 微 3D —— CSS 3D 倾斜 + 跟随指针的折射高光
   不涉及 canvas，因此 100 张卡片也只付合成层开销
   ------------------------------------------------------------ */
function WorkCard({ work, onOpen, tilt, delay = 0 }) {
  const ref = useRef(null)
  const rx = useSpring(0, { stiffness: 170, damping: 18, mass: 0.6 })
  const ry = useSpring(0, { stiffness: 170, damping: 18, mass: 0.6 })
  const sc = useSpring(1, { stiffness: 220, damping: 24 })

  const handleMove = (e) => {
    if (!tilt || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 13)
    rx.set(-py * 11)
    // 高光跟随：直接写 CSS 变量，绕开 React 渲染
    ref.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }

  const reset = () => {
    rx.set(0)
    ry.set(0)
    sc.set(1)
  }

  return (
    <motion.article
      className="card-wrap"
      layout={tilt}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <motion.button
        ref={ref}
        type="button"
        className="card glass"
        style={{ rotateX: rx, rotateY: ry, scale: sc, transformPerspective: 1000 }}
        onPointerMove={handleMove}
        onPointerEnter={() => tilt && sc.set(1.015)}
        onPointerLeave={reset}
        onFocus={reset}
        onClick={() => onOpen(work)}
        aria-label={`查看项目详情：${work.title}，${work.subtitle}，${work.year}`}
      >
        <span className="card__art">
          <WorkArt work={work} ratio={4 / 3} />
          <span className="card__category">{work.tags[0]}</span>
        </span>

        <span className="card__body">
          <span className="card__top">
            <span className="card__title">{work.title}</span>
            <span className="card__year">{work.year}</span>
          </span>
          <span className="card__subtitle">{work.subtitle}</span>
          <span className="card__tags">
            {work.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </span>
          <span className="card__foot">
            <span className="card__more">
              查看项目
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </span>
      </motion.button>
    </motion.article>
  )
}

export default function WorkGallery({ onOpen, animate = true }) {
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () => (category === 'all' ? WORKS : WORKS.filter((w) => w.category === category)),
    [category]
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const changeCategory = (id) => {
    setCategory(id)
    setPage(1)
  }

  const activeLabel = CATEGORIES.find((c) => c.id === category)?.label ?? '全部作品'

  return (
    <section className="section works" id="works">
      <div className="shell">
        <div className="section-head">
          <p className="eyebrow">Selected Work · 2019—2025</p>
          <h2>12 个项目，<br />每一个都能拆开讲三小时。</h2>
          <p className="lede">
            下面这些不是效果图。每个项目的判断标准、失败版本和上线后的数据，我们都能拿出来复盘。
          </p>
        </div>

        <div className="filters" role="group" aria-label="按专业方向筛选作品">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              aria-pressed={category === c.id}
              onClick={() => changeCategory(c.id)}
            >
              <span>{c.label}</span>
              <em>{c.en}</em>
            </button>
          ))}
        </div>

        <p className="works__count" aria-live="polite">
          <span aria-hidden="true">▸</span> 当前显示 {activeLabel} {filtered.length} 个项目
          {pageCount > 1 && `，第 ${safePage} / ${pageCount} 页`}
        </p>

        <motion.ul className="grid" layout={animate}>
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((w, i) => (
              <li key={w.id} className="grid__cell">
                <WorkCard work={w} onOpen={onOpen} tilt={animate} delay={i * 0.05} />
              </li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {pageCount > 1 && (
          <nav className="pager" aria-label="作品分页">
            <button
              type="button"
              className="pager__btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              上一页
            </button>
            <ul className="pager__list">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <li key={n}>
                  <button
                    type="button"
                    className="pager__num"
                    aria-current={safePage === n ? 'page' : undefined}
                    aria-label={`第 ${n} 页`}
                    onClick={() => setPage(n)}
                  >
                    {String(n).padStart(2, '0')}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="pager__btn"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={safePage === pageCount}
            >
              下一页
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
