import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 让构建产物可部署到任意子路径（如 /studio/），不绑定根域
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    // three 单独分包，避免首屏 chunk 过大
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/@react-three')) return 'r3f'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion'
          return undefined
        },
      },
    },
  },
})
