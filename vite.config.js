/*
 * @Author: zi.yang
 * @Date: 2023-07-04 11:24:27
 * @LastEditors: zi.yang
 * @LastEditTime: 2023-08-06 15:21:45
 * @Description: 
 * @FilePath: /vue-project/vite.config.js
 */
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig((command) => {
  const base = command.mode === 'github' ? '/leafer-drawing-border/' : '/'
  return {
    base,
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
