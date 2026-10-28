import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PROCESS } from '../data/works.js'

export default function Process({ animate = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="section process" id="process">
      <div className="shell">
        <div className="section-head section-head--tight">
          <p className="eyebrow">Process · 怎么合作</p>
          <h2>四个阶段，每一段都有可验收的产出。</h2>
          <p className="lede">
            我们不做「先出两稿看看感觉」。第一阶段结束时，双方会签一份判断标准——
            后续所有分歧都拿它来对齐，而不是靠谁声音大。
          </p>
        </div>

        <div className="process__track" ref={ref}>
          <div className="process__line" aria-hidden="true">
            {animate && <motion.span className="process__fill" style={{ width }} />}
          </div>

          <ol className="process__list">
            {PROCESS.map((p, i) => (
              <motion.li
                className="step"
                key={p.step}
                initial={animate ? { opacity: 0, y: 22 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <span className="step__num">{p.step}</span>
                <h3 className="step__title">{p.title}</h3>
                <p className="step__body">{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="process__foot glass">
          <p>
            <b>平均合作周期 8—14 周。</b>
            全流程远程可完成，关键节点（策略对齐、方向评估、交付验收）建议线下或视频会议。
          </p>
          <a className="btn btn--primary" href="#contact">
            从第一阶段的判断标准开始
          </a>
        </div>
      </div>
    </section>
  )
}
