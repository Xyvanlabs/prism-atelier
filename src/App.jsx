import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import WorkGallery from './components/WorkGallery.jsx'
import WorkDrawer from './components/WorkDrawer.jsx'
import Studio from './components/Studio.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import { usePerfTier, usePrefersReducedMotion } from './lib/hooks.js'

export default function App() {
  const tier = usePerfTier()
  const reduced = usePrefersReducedMotion()
  const animate = tier !== 'low' && !reduced

  const [activeWork, setActiveWork] = useState(null)

  // 把全局动效状态挂到 body，CSS 侧也能读到（用于关掉 marquee 等纯 CSS 动画）
  useEffect(() => {
    document.body.dataset.static = String(!animate)
    document.body.dataset.tier = tier
  }, [animate, tier])

  return (
    <>
      <CursorGlow enabled={animate} />
      <Nav animate={animate} />

      <main id="main">
        <Hero tier={tier} reducedMotion={!animate} />
        <Marquee animate={animate} />
        <WorkGallery onOpen={setActiveWork} animate={animate} />
        <Studio tier={tier} animate={animate} />
        <Process animate={animate} />
        <Contact animate={animate} />
      </main>

      <Footer />

      <WorkDrawer
        work={activeWork}
        onClose={() => setActiveWork(null)}
        onSelect={setActiveWork}
        animate={animate}
      />
    </>
  )
}
