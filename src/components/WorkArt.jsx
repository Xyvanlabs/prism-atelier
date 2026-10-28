import { useState } from 'react'
import { asset } from '../lib/asset.js'

/** 稳定哈希：同一个 id 永远得到同一套图形参数（服务端/客户端一致，不会闪） */
function seedOf(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pick(h, i, min, max) {
  const x = Math.sin(h * 0.0001 + i * 97.31) * 10000
  return min + (x - Math.floor(x)) * (max - min)
}

/**
 * 封面层：AI 生成图 + 程序化抽象主视觉兜底。
 * 没有图片资产时，用项目 palette + 稳定随机种子生成"光斑 / 细环 / 斜纹"三层，
 * 每个项目图形不重复，且不产生任何网络请求。
 */
export default function WorkArt({ work, ratio = 4 / 3, decorative = false }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [a, b] = work.palette
  const h = seedOf(work.id)

  const style = {
    '--a': a,
    '--b': b,
    '--g1x': `${Math.round(pick(h, 1, 8, 88))}%`,
    '--g1y': `${Math.round(pick(h, 2, 6, 70))}%`,
    '--g1r': `${Math.round(pick(h, 3, 42, 78))}%`,
    '--g2x': `${Math.round(pick(h, 4, 10, 92))}%`,
    '--g2y': `${Math.round(pick(h, 5, 30, 96))}%`,
    '--g2r': `${Math.round(pick(h, 6, 30, 62))}%`,
    '--angle': `${Math.round(pick(h, 7, -38, 46))}deg`,
    '--ringx': `${Math.round(pick(h, 8, 6, 94))}%`,
    '--ringy': `${Math.round(pick(h, 9, 4, 96))}%`,
    aspectRatio: String(ratio),
  }

  return (
    <div className="art" style={style} data-decorative={decorative}>
      <span className="art__base" aria-hidden="true" />
      <span className="art__glow art__glow--1" aria-hidden="true" />
      <span className="art__glow art__glow--2" aria-hidden="true" />
      <span className="art__rings" aria-hidden="true" />
      <span className="art__motif" aria-hidden="true" />
      {work.cover && !failed && (
        <img
          className="art__img"
          src={asset(work.cover)}
          alt={decorative ? '' : `${work.title} — ${work.subtitle} 项目主视觉`}
          loading="lazy"
          decoding="async"
          data-loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      <span className="art__sheen" aria-hidden="true" />
      <span className="art__index" aria-hidden="true">
        {work.index}
      </span>
    </div>
  )
}
