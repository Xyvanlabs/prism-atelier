/** 拼接 public 资源路径，兼容 base './' 的子路径部署 */
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/'
  const clean = String(path || '').replace(/^\/+/, '')
  return `${base}${clean}`.replace(/([^:]\/)\/+/g, '$1')
}
