import { motion } from 'framer-motion'
import { STATS } from '../data/works.js'

const KEYWORDS = [
  '品牌视觉识别',
  'Identity System',
  '设计系统',
  'Design System',
  '动效设计',
  'Motion Design',
  'WebGL 实时 3D',
  '光学材料',
  '空间装置',
  '可访问性',
  'Accessibility',
  '生成式视觉',
]

/** 关键词流动条：既是视觉节奏，也是给爬虫看的语义密度锚点 */
export default function Marquee({ animate = true }) {
  const row = [...KEYWORDS, ...KEYWORDS]

  return (
    <section className="ticker" aria-label="服务与技术关键词">
      <div className="ticker__viewport">
        <div className="ticker__track" style={animate ? undefined : { animation: 'none' }}>
          {row.map((k, i) => (
            <span className="ticker__item" key={`${k}-${i}`} aria-hidden={i >= KEYWORDS.length}>
              {k}
              <i aria-hidden="true">◆</i>
            </span>
          ))}
        </div>
      </div>

      <div className="shell">
        <dl className="stats">
          {STATS.map((s, i) => (
            <motion.div
              className="stats__item"
              key={s.label}
              initial={animate ? { opacity: 0, y: 18 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              <dt className="stats__en">{s.en}</dt>
              <dd>
                <span className="stats__value">{s.value}</span>
                <span className="stats__label">{s.label}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
