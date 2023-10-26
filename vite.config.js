/*
 * @Date: 2023-10-25 15:19:42
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 8082,
    open: true,
    openPage: '/',
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // 全局配置utils.less
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/styles/utils.less"; @import "@/assets/styles/_var.less"; @import "@/assets/styles/mixin.less";`,
      },
    }

  },
})
