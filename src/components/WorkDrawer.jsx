import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WORKS } from '../data/works.js'
import WorkArt from './WorkArt.jsx'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

export default function WorkDrawer({ work, onClose, onSelect, animate = true }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const restoreRef = useRef(null)
  const open = Boolean(work)

  /* 打开/关闭：锁定滚动、移入焦点、关闭时还原焦点 */
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => closeRef.current?.focus(), 80)
    return () => {
      window.clearTimeout(t)
      document.body.style.overflow = prevOverflow
      if (restoreRef.current instanceof HTMLElement) restoreRef.current.focus()
    }
  }, [open])

  /* 键盘：Esc 关闭、Tab 循环、左右箭头切换项目 */
  useEffect(() => {
    if (!open) return
    const idx = WORKS.findIndex((w) => w.id === work.id)

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowRight' && idx < WORKS.length - 1) {
        onSelect(WORKS[idx + 1])
        return
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        onSelect(WORKS[idx - 1])
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return

      const nodes = Array.from(panelRef.current.querySelectorAll(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      )
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, work, onClose, onSelect])

  const idx = work ? WORKS.findIndex((w) => w.id === work.id) : -1
  const prev = idx > 0 ? WORKS[idx - 1] : null
  const next = idx >= 0 && idx < WORKS.length - 1 ? WORKS[idx + 1] : null

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="drawer" role="presentation">
          <motion.div
            className="drawer__scrim"
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={animate ? { opacity: 0 } : undefined}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            className="drawer__panel glass"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            aria-describedby="drawer-desc"
            initial={animate ? { x: '6%', opacity: 0 } : false}
            animate={{ x: 0, opacity: 1 }}
            exit={animate ? { x: '8%', opacity: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="drawer__bar">
              <span className="drawer__index">
                {work.index} / 12
              </span>
              <button
                ref={closeRef}
                type="button"
                className="drawer__close"
                onClick={onClose}
                aria-label="关闭项目详情"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path
                    d="M4 4l10 10M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="drawer__scroll">
              <WorkArt work={work} ratio={16 / 10} />

              <h3 id="drawer-title" className="drawer__title">
                {work.title}
              </h3>
              <p className="drawer__subtitle">{work.subtitle}</p>

              <p className="drawer__desc" id="drawer-desc">
                {work.summary}
              </p>

              <dl className="drawer__meta">
                <div>
                  <dt>客户</dt>
                  <dd>{work.client}</dd>
                </div>
                <div>
                  <dt>年份</dt>
                  <dd>{work.year}</dd>
                </div>
                <div>
                  <dt>方向</dt>
                  <dd>{work.tags.join(' · ')}</dd>
                </div>
              </dl>

              <div className="drawer__block">
                <h4>交付内容</h4>
                <ul className="drawer__chips">
                  {work.deliverables.map((d) => (
                    <li key={d} className="tag">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="drawer__block">
                <h4>结果</h4>
                <p className="drawer__outcome">{work.outcome}</p>
              </div>

              <div className="drawer__block">
                <h4>主色</h4>
                <div className="swatches" aria-label="项目主色板">
                  {work.palette.map((c) => (
                    <span key={c} className="swatch" style={{ background: c }}>
                      <span className="sr-only">{c}</span>
                    </span>
                  ))}
                </div>
              </div>

              <nav className="drawer__nav" aria-label="切换项目">
                <button
                  type="button"
                  onClick={() => prev && onSelect(prev)}
                  disabled={!prev}
                  className="pager__btn"
                >
                  ← {prev ? prev.title : '已是第一个'}
                </button>
                <button
                  type="button"
                  onClick={() => next && onSelect(next)}
                  disabled={!next}
                  className="pager__btn"
                >
                  {next ? next.title : '已是最后一个'} →
                </button>
              </nav>

              <p className="drawer__hint">按 ← → 切换项目，Esc 关闭</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
