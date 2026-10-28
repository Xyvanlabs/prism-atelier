import { useEffect, useState } from 'react'

/** 系统是否要求减少动效 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** 通用媒体查询 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * 设备性能分层。
 * 'high'   —— 桌面且有足够内存：跑完整 shader + 2 个 canvas
 * 'medium' —— 移动端但支持 WebGL：shader 降采样、单 canvas
 * 'low'    —— 无 WebGL / 内存过小 / 减少动效：全部静态
 */
export function usePerfTier() {
  const reduced = usePrefersReducedMotion()
  const isSmall = useMediaQuery('(max-width: 860px)')
  const [tier, setTier] = useState('high')

  useEffect(() => {
    const probe = () => {
      if (reduced) return 'low'
      let webgl = false
      try {
        const canvas = document.createElement('canvas')
        webgl = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        )
      } catch {
        webgl = false
      }
      if (!webgl) return 'low'
      const mem = navigator.deviceMemory || navigator.hardwareConcurrency || 4
      if (isSmall || mem <= 4) return 'medium'
      return 'high'
    }
    setTier(probe())
  }, [reduced, isSmall])

  return tier
}

/** 元素是否进入过视口（用于懒挂载 canvas） */
export function useInViewOnce(ref, rootMargin = '200px') {
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (!('IntersectionObserver' in window)) {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [ref, rootMargin])

  return seen
}

/** 元素当前是否在视口内（用于暂停 canvas 渲染循环） */
export function useVisible(ref) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting), {
      threshold: 0,
    })
    io.observe(node)
    return () => io.disconnect()
  }, [ref])

  return visible
}
