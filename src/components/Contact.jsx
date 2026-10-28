import { useState } from 'react'
import { motion } from 'framer-motion'

const PROJECT_TYPES = [
  '品牌视觉识别',
  '数字产品 / App',
  '设计系统',
  '动效影像',
  '空间装置 / 展览',
  '其他 / 还没想好',
]

const BUDGETS = ['15 万以下', '15—30 万', '30—60 万', '60 万以上', '按周期长期合作']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function Contact({ animate = true }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    type: PROJECT_TYPES[0],
    budget: BUDGETS[1],
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((e2) => ({ ...e2, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = '请填写称呼，方便我们回信'
    if (!values.email.trim()) next.email = '请填写邮箱'
    else if (!EMAIL_RE.test(values.email.trim())) next.email = '邮箱格式看起来不对'
    if (values.message.trim().length > 0 && values.message.trim().length < 12)
      next.message = '再多写几个字，至少 12 字'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0]
      document.getElementById(`f-${firstKey}`)?.focus()
      return
    }
    // 说明：此处没有后端。接入时把下面这段换成对 /api/contact 的 fetch 即可。
    setStatus('sent')
  }

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__grid">
        <div className="contact__copy">
          <p className="eyebrow">Contact · 聊聊</p>
          <h2>
            说清楚你要解决的问题，
            <br />
            比说清你要什么风格更有用。
          </h2>
          <p className="lede">
            通常 2 个工作日内回信。如果项目不适合我们，会直接说，并推荐更合适的人。
          </p>

          <ul className="contact__list">
            <li>
              <span>邮箱</span>
              <a href="mailto:hello@prism-atelier.example.com">hello@prism-atelier.example.com</a>
            </li>
            <li>
              <span>电话</span>
              <a href="tel:+862100000000">+86 21 0000 0000</a>
            </li>
            <li>
              <span>地址</span>
              <p>上海静安陕西北路 688 号 5F</p>
            </li>
          </ul>
        </div>

        <motion.div
          className="contact__card glass"
          initial={animate ? { opacity: 0, y: 26 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {status === 'sent' ? (
            <div className="form__done" role="status">
              <span className="form__doneicon" aria-hidden="true">✓</span>
              <h3>已收到，谢谢你。</h3>
              <p>
                这是演示表单，数据没有发往任何服务器（此版本没有配置后端接口）。
                真实上线时把 <code>onSubmit</code> 里的提交换成你的 API 即可。
              </p>
              <button type="button" className="btn btn--ghost" onClick={() => setStatus('idle')}>
                再填一次
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="f-name">怎么称呼你</label>
                <input
                  id="f-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={set('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'e-name' : undefined}
                  placeholder="例如：林小姐 / Lin"
                />
                {errors.name && (
                  <p className="field__err" id="e-name">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="f-email">邮箱</label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'e-email' : undefined}
                  placeholder="name@company.com"
                />
                {errors.email && (
                  <p className="field__err" id="e-email">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="f-type">项目类型</label>
                  <select id="f-type" name="type" value={values.type} onChange={set('type')}>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="f-budget">预算区间</label>
                  <select id="f-budget" name="budget" value={values.budget} onChange={set('budget')}>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="f-message">
                  你正在解决的问题 <span className="field__opt">（选填）</span>
                </label>
                <textarea
                  id="f-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'e-message' : 'h-message'}
                  placeholder="一句话也行：现在卡在哪，希望三个月后变成什么样。"
                />
                {errors.message ? (
                  <p className="field__err" id="e-message">
                    {errors.message}
                  </p>
                ) : (
                  <p className="field__hint" id="h-message">
                    不需要写成 brief，我们能从三句话里判断要不要聊。
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn--primary form__submit">
                发送
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <p className="form__note">
                演示版本：表单不会真实发送。上线时接入 <code>/api/contact</code> 并加服务端校验与限流。
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
