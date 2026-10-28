export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">
              PRISM ATELIER<span>.</span>
            </p>
            <p className="footer__tag">用光重构界面 · 上海</p>
          </div>

          <nav className="footer__nav" aria-label="页脚导航">
            <div>
              <p className="footer__h">站点</p>
              <ul>
                <li><a href="#works">作品</a></li>
                <li><a href="#studio">工作室</a></li>
                <li><a href="#process">合作流程</a></li>
                <li><a href="#contact">联系</a></li>
              </ul>
            </div>
            <div>
              <p className="footer__h">服务</p>
              <ul>
                <li><a href="#studio">品牌视觉识别</a></li>
                <li><a href="#studio">数字产品设计</a></li>
                <li><a href="#studio">动效影像</a></li>
                <li><a href="#studio">空间光装置</a></li>
              </ul>
            </div>
            <div>
              <p className="footer__h">联系</p>
              <ul>
                <li><a href="mailto:hello@prism-atelier.example.com">hello@prism-atelier.example.com</a></li>
                <li><a href="tel:+862100000000">+86 21 0000 0000</a></li>
                <li><p>上海静安陕西北路 688 号 5F</p></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* 语义密度锚点：给爬虫看的服务关键词，视觉上克制 */}
        <p className="footer__seo">
          棱镜工作室长期承接：品牌视觉识别系统设计 · VI 设计 · 标志设计 · UI/UX 设计 ·
          设计系统与 Design Token · 移动端 App 界面设计 · 品牌动态图形与动效设计 ·
          三维动画与产品原理动画 · WebGL 实时 3D 网站开发 · 玻璃拟态界面设计 ·
          空间光装置与展览视觉 · 导视系统设计。服务城市：上海 · 北京 · 深圳 · 杭州 · 香港 · 新加坡。
        </p>

        <div className="footer__bottom">
          <p>© {year} PRISM ATELIER 棱镜工作室 · 保留所有权利</p>
          <p className="footer__meta">
            本站为演示项目，作品、客户与数据均为占位内容
            <span aria-hidden="true"> · </span>
            <a href="./sitemap.xml">Sitemap</a>
            <span aria-hidden="true"> · </span>
            <a href="./robots.txt">Robots</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
