import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const LINKS = [
  { href: '#works', label: '作品', en: 'Work' },
  { href: '#studio', label: '工作室', en: 'Studio' },
  { href: '#process', label: '流程', en: 'Process' },
  { href: '#contact', label: '联系', en: 'Contact' },
]

export default function Nav({ animate = true }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 移动端菜单打开时锁定滚动
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a className="skip-link" href="#works">
        跳到作品列表
      </a>

      <motion.div
        className="nav"
        data-scrolled={scrolled}
        initial={animate ? { y: -70, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <div className="nav__bar">
          <a className="nav__brand" href="#top" aria-label="棱镜工作室 首页">
            <span className="nav__mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2 20 18H2L11 2Z" stroke="url(#g1)" strokeWidth="1.6" />
                <path d="M11 2v16M2 18 11 2l9 16" stroke="url(#g1)" strokeWidth="0.9" opacity=".55" />
                <defs>
                  <linearGradient id="g1" x1="2" y1="2" x2="20" y2="18">
                    <stop stopColor="#5b5bf6" />
                    <stop offset="1" stopColor="#12c6b8" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="nav__name">
              <b>PRISM ATELIER</b>
              <i>棱镜工作室</i>
            </span>
          </a>

          <nav className="nav__links" aria-label="主导航">
            {LINKS.map((l) => (
              <a key={l.href} className="nav__link" href={l.href}>
                <span>{l.label}</span>
                <em>{l.en}</em>
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <a className="btn btn--primary nav__cta" href="#contact">
              预约沟通
            </a>
            <button
              type="button"
              className="nav__burger"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? '关闭菜单' : '打开菜单'}
              onClick={() => setOpen((v) => !v)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>

        <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.div>

      {open && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="站点菜单">
          <ul className="mobile-menu__list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  <em>{l.en}</em>
                  <b>{l.label}</b>
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary mobile-menu__cta" href="#contact" onClick={() => setOpen(false)}>
            预约沟通
          </a>
        </div>
      )}
    </>
  )
}
