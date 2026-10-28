import { useRef } from 'react'
import { motion } from 'framer-motion'
import { CAPABILITIES } from '../data/works.js'
import GlassCluster from './GlassCluster.jsx'
import { useInViewOnce, useVisible } from '../lib/hooks.js'

export default function Studio({ tier = 'high', animate = true }) {
  const stageRef = useRef(null)
  const mounted = useInViewOnce(stageRef, '160px')
  const visible = useVisible(stageRef)

  return (
    <section className="section studio" id="studio">
      <div className="shell">
        <div className="studio__grid">
          <div className="studio__copy">
            <p className="eyebrow">Studio · 关于</p>
            <h2>
              我们不擅长说灵感，
              <br />
              但很擅长给判断标准。
            </h2>

            <p className="lede">
              棱镜工作室成立于 2019 年，目前 6 个人：2 个视觉、2 个产品、1 个动效、1 个技术。
              我们只接能用数据复盘的活，所以每条「好看」的意见最后都会被追问一句——
              凭什么？
            </p>

            <p className="studio__note">
              副业是收集玻璃。工作室窗台上摆着 137 块废弃试样，最好的那片来自一个失败的提案。
            </p>

            <ul className="studio__facts">
              <li>
                <b>6</b>
                <span>全职成员</span>
              </li>
              <li>
                <b>2019</b>
                <span>成立年份</span>
              </li>
              <li>
                <b>4</b>
                <span>专业方向</span>
              </li>
              <li>
                <b>137</b>
                <span>玻璃试样</span>
              </li>
            </ul>
          </div>

          <div className="studio__stage glass" ref={stageRef}>
            <div className="studio__stageinner">
              {mounted && tier !== 'low' ? (
                <GlassCluster tier={tier} animate={animate} active={visible} />
              ) : (
                <div className="studio__stagefallback" aria-hidden="true" />
              )}
            </div>
            <p className="studio__caption">
              <span aria-hidden="true">◈</span> 实时渲染的玻璃几何簇 · 滚出视口自动停帧
            </p>
          </div>
        </div>

        <div className="caps">
          {CAPABILITIES.map((c, i) => (
            <motion.article
              className="cap glass"
              key={c.title}
              initial={animate ? { opacity: 0, y: 24 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <header className="cap__head">
                <h3>{c.title}</h3>
                <em>{c.en}</em>
              </header>
              <p className="cap__body">{c.body}</p>
              <ul className="cap__list">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
