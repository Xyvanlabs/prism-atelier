import { useEffect, useRef } from 'react'

/**
 * L3 微量 3D：跟随光标的光学高光。
 * 仅在精确指针设备（鼠标）且未开启减少动效时启用；
 * 用 CSS 变量 + transform 驱动，不触发 React 重渲染。
 */
export default function CursorGlow({ enabled = true }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const node = ref.current
    if (!node) return

    let raf = 0
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 2
    let cx = tx
    let cy = ty

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      node.dataset.active = 'true'
    }
    const onLeave = () => {
      node.dataset.active = 'false'
    }

    const tick = () => {
      cx += (tx - cx) * 0.09
      cy += (ty - cy) * 0.09
      node.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return <div className="cursor-glow" ref={ref} aria-hidden="true" />
}
